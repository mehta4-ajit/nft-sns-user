const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const sequelize = require("./sequelize");
const User = require("./User");
const UserWallet = require("./UserWalle")

const { sendVerificationEmail } = require("./emailService");

// -------------------------
// MULTER CONFIG
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads", "profiles");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile_${req.user.id}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// -------------------------
// JWT
// -------------------------
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email || null,
      role: user.role || "User",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// authMiddleware (add this)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log('[authMiddleware] decoded token:', decoded); // <--- add
    next();
  } catch (err) {
    console.error('[authMiddleware] token verify error:', err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// -------------------------
// HELPERS
// -------------------------
function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// -------------------------
// USER SIGNUP (WITH EMAIL OTP)
// -------------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const code = generate6DigitCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      verificationCode: code,
      verificationExpires: expires,
    });

    try {
      await sendVerificationEmail(email, code);
    } catch (err) {
      console.error("Email send error:", err);
      return res.status(500).json({
        message: "Failed to send verification email. Try resend later.",
      });
    }

    return res.status(201).json({
      message: "Account created. Verification code sent.",
      user_id: newUser.id,
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// VERIFY EMAIL OTP
// -------------------------
app.post("/api/auth/verify-email", async (req, res) => {
  try {
    const { user_id, code } = req.body;

    if (!user_id || !code)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Incorrect code" });

    if (new Date() > user.verificationExpires)
      return res.status(400).json({ message: "Code expired" });

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/auth/resend-otp", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id)
      return res.status(400).json({ message: "User ID is required" });

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    const code = generate6DigitCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = code;
    user.verificationExpires = expires;
    await user.save();

    await sendVerificationEmail(user.email, code);

    res.json({ message: "Verification code resent" });

  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// -------------------------
// LOGIN
// -------------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    // BLOCK LOGIN IF EMAIL NOT VERIFIED
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified",
        verification_required: true,
        user_id: user.id,
      });
    }

    const token = generateToken(user);

    const activeWallet = await UserWallet.findOne({
      where: { user_id: user.id, is_active: true },
      attributes: ["id", "address", "is_active"],
    });

    res.json({
      message: "Login successful",
      user_id: user.id,
      token,
      active_wallet: activeWallet || null,
      wallet_connected: !!activeWallet,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Wallet Connect

app.post("/api/wallet/add", authMiddleware, async (req, res) => {
  try {
    const { address, balance } = req.body;
    if (!address) return res.status(400).json({ message: "Wallet address required" });

    // Check if wallet exists for ANY user
    const walletTaken = await UserWallet.findOne({ where: { address } });
    if (walletTaken && walletTaken.user_id !== req.user.id) {
      return res.status(400).json({ message: "This wallet is linked to another user" });
    }

    // Check if same user has this wallet already
    let userWallet = await UserWallet.findOne({
      where: { user_id: req.user.id, address },
    });

    if (userWallet) {
      // Reactivate it and update info
      userWallet.is_active = true;
      userWallet.balance = balance;
      await userWallet.save();
    } else {
      // Create a new wallet record
      userWallet = await UserWallet.create({
        user_id: req.user.id,
        address,
        balance,
        is_active: true,
      });
    }

    // Set all other wallets of this user to inactive
    await UserWallet.update(
      { is_active: false },
      { where: { user_id: req.user.id, id: { [Op.ne]: userWallet.id } } }
    );

    res.json({ message: "Wallet linked successfully", wallet: userWallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// DISCONNECT ACTIVE WALLET
// -------------------------
app.patch("/api/wallet/disconnect", authMiddleware, async (req, res) => {
  try {
    await UserWallet.update(
      { is_active: false },
      { where: { user_id: req.user.id, is_active: true } }
    );

    res.json({ message: "Wallet disconnected successfully" });
  } catch (err) {
    console.error("Disconnect wallet error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// -------------------------
// GET USER PROFILE
// -------------------------
// -------------------------
// GET USER PROFILE (WITH WALLET BALANCE)
// -------------------------
app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    console.log('[GET /api/user/profile] req.user:', req.user);

    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "full_name",
        "bio",
        "twitter",
        "instagram",
        "website",
        "profileImage",
      ],
      include: [
        {
          model: UserWallet,
          attributes: ["id", "address", "is_active", "balance"], // <- added balance
        },
      ],
    });

    console.log('[GET /api/user/profile] found user:', !!user);

    if (!user) return res.status(404).json({ message: "User not found" });

    let profile = user.toJSON();

    // Prefix profileImage with server URL if it exists
    if (profile.profileImage) {
      profile.profileImage = `${req.protocol}://${req.get("host")}${profile.profileImage}`;
    }

    // Optional: only return the active wallet info
    const activeWallet = profile.UserWallets?.find(w => w.is_active) || null;
    profile.activeWallet = activeWallet;

    res.json({ profile });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// -------------------------
// UPDATE USER PROFILE (WITH IMAGE)
// -------------------------
app.put(
  "/api/user/profile",
  authMiddleware,
  upload.single("profileImage"), // must match frontend field name
  async (req, res) => {
    try {
      const { full_name, bio, twitter, instagram, website } = req.body;

      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Update profile fields
      user.full_name = full_name || user.full_name;
      user.bio = bio || user.bio;
      user.twitter = twitter || user.twitter;
      user.instagram = instagram || user.instagram;
      user.website = website || user.website;

      // If file uploaded, save path
      if (req.file) {
        const fileUrl = `/uploads/profiles/${req.file.filename}`;
        user.profileImage = fileUrl;
      }

      await user.save();

      // Return full URL to frontend
      let profileImageUrl = user.profileImage
        ? `${req.protocol}://${req.get("host")}${user.profileImage}`
        : null;

      res.json({
        message: "Profile updated successfully",
        profileImage: profileImageUrl,
      });

    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// -------------------------
// SERVE UPLOADED FILES
// -------------------------
app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "uploads", "profiles"))
);
// -------------------------
// START SERVER & SYNC DB
// -------------------------
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB Sync Error:", err);
  });
