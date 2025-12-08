// IMPORTS
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);


// Import cron starter
const startSnsCron = require("./snsCron"); // adjust path if needed

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const https = require("https");
// MODELS
const sequelize = require("./sequelize");
const User = require("./User");
const UserWallet = require("./UserWalle");
const Item = require("./Item");
const Event = require("./Event");
const Settings = require("./Setting");
const ItemSns = require("./ItemSns");
const { v4: uuidv4 } = require("uuid");
const Sns = require("./Sns");
const { sendVerificationEmail } = require("./emailService");
const SnsForm = require("./sns_form");



// EXPRESS APP
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// JWT TOKEN
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "User",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ==========================
// AUTH MIDDLEWARE
// ==========================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ==========================
// MULTER — PROFILE UPLOAD
// ==========================
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads/profiles");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile_${req.user.id}_${Date.now()}${ext}`);
  },
});

const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext))
      return cb(new Error("Only images allowed"));
    cb(null, true);
  },
});

// ==========================
// MULTER — ITEM UPLOAD
// ==========================
const uploadItem = multer({
  dest: path.join(__dirname, "uploads/tmp_items"),
  limits: { fileSize: 500 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    const allowed = [".png", ".jpg", ".jpeg", ".mp4", ".mov"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext))
      return cb(new Error("Only PNG/JPG/MP4/MOV allowed"));
    cb(null, true);
  },
});

// ==========================
// HELPER — GENERATE OTP
// ==========================
function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ==========================
// REGISTER
// ==========================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const code = generate6DigitCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      full_name,
      email,
      password: hashed,
      role,
      isVerified: false,
      verificationCode: code,
      verificationExpires: expires,
    });

    await sendVerificationEmail(email, code);

    res.status(201).json({
      message: "Account created. OTP sent.",
      user_id: user.id,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// VERIFY EMAIL
// ==========================
app.post("/api/auth/verify-email", async (req, res) => {
  try {
    const { user_id, code } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) return res.json({ message: "Already verified" });

    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });

    if (new Date() > user.verificationExpires)
      return res.status(400).json({ message: "Code expired" });

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpires = null;
    await user.save();

    res.json({ message: "Email verified" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// RESEND OTP
// ==========================
app.post("/api/auth/resend-otp", async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = generate6DigitCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = code;
    user.verificationExpires = expires;
    await user.save();

    await sendVerificationEmail(user.email, code);

    res.json({ message: "OTP resent" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// LOGIN
// ==========================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({
        message: "Email not verified",
        verification_required: true,
        user_id: user.id,
      });

    const token = generateToken(user);

    const activeWallet = await UserWallet.findOne({
      where: { user_id: user.id, is_active: true },
      attributes: ["id", "address", "balance"],
    });

    res.json({
      message: "Login successful",
      token,
      user_id: user.id,
      wallet_connected: !!activeWallet,
      active_wallet: activeWallet,
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// ADD WALLET
// ==========================
app.post("/api/wallet/add", authMiddleware, async (req, res) => {
  try {
    const { address, balance } = req.body;

    if (!address)
      return res.status(400).json({ message: "Wallet address required" });

    // If wallet already linked to someone else
    const exists = await UserWallet.findOne({ where: { address } });
    if (exists && exists.user_id !== req.user.id)
      return res.status(400).json({ message: "Wallet linked to another user" });

    let wallet = await UserWallet.findOne({
      where: { user_id: req.user.id, address },
    });

    if (wallet) {
      wallet.is_active = true;
      wallet.balance = balance;
      await wallet.save();
    } else {
      wallet = await UserWallet.create({
        user_id: req.user.id,
        address,
        balance,
        is_active: true,
      });
    }

    await UserWallet.update(
      { is_active: false },
      { where: { user_id: req.user.id, id: { [Op.ne]: wallet.id } } }
    );

    res.json({ message: "Wallet linked", wallet });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// DISCONNECT WALLET
// ==========================
app.patch("/api/wallet/disconnect", authMiddleware, async (req, res) => {
  try {
    await UserWallet.update(
      { is_active: false },
      { where: { user_id: req.user.id, is_active: true } }
    );
    res.json({ message: "Wallet disconnected" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// GET USER PROFILE
// ==========================
app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
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
          attributes: ["id", "address", "balance", "is_active"],
        },
      ],
    });

    if (!user) return res.status(404).json({ message: "Not found" });

    const data = user.toJSON();

    if (data.profileImage) {
      data.profileImage = `${req.protocol}://${req.get("host")}${data.profileImage}`;
    }

    data.activeWallet = data.UserWallets?.find(w => w.is_active) || null;

    res.json({ profile: data });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// UPDATE PROFILE + IMAGE
// ==========================
app.put(
  "/api/user/profile",
  authMiddleware,
  uploadProfile.single("profileImage"),
  async (req, res) => {
    try {
      const { full_name, bio, twitter, instagram, website } = req.body;

      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.full_name = full_name || user.full_name;
      user.bio = bio || user.bio;
      user.twitter = twitter || user.twitter;
      user.instagram = instagram || user.instagram;
      user.website = website || user.website;

      if (req.file) {
        user.profileImage = `/uploads/profiles/${req.file.filename}`;
      }

      await user.save();

      res.json({
        message: "Profile updated",
        profileImage: user.profileImage
          ? `${req.protocol}://${req.get("host")}${user.profileImage}`
          : null,
      });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ==========================
// GET EVENTS
// ==========================
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["createdat", "DESC"]],
    });
    res.json({ events });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ==========================
// GET ACTIVE SNS PLATFORMS
// ==========================
app.get("/api/sns", async (req, res) => {
  try {
    const platforms = await Sns.findAll({
      where: { status: 1 },
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      total: platforms.length,
      platforms,
    });

  } catch (err) {
    console.error("SNS Fetch Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/// ==========================
// DYNAMIC IPFS ITEM UPLOAD
// ==========================
app.post("/api/upload-item-file", authMiddleware, uploadItem.single("file"), async (req, res) => {
  try {
    // 1️⃣ Must have a file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 2️⃣ Load max file size from DB
    const setting = await Settings.findOne({
      where: { setting_key: "MAX_FILE_SIZE_MB" },
    });

    let maxSizeMB = 10; // fallback
    if (setting?.setting_value) {
      const parsed = parseInt(setting.setting_value);
      if (!isNaN(parsed) && parsed > 0) maxSizeMB = parsed;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;

    // 3️⃣ Check actual size
    if (req.file.size > maxBytes) {
      fs.unlinkSync(req.file.path); // delete temp file
      return res.status(400).json({ error: `File too large. Limit: ${maxSizeMB}MB` });
    }

    // 4️⃣ Send file to Pinata
    const fileStream = fs.createReadStream(req.file.path);
    const options = {
      pinataMetadata: {
        name: req.file.originalname,
        keyvalues: { uploadedBy: req.user.id.toString() },
      },
      pinataOptions: { cidVersion: 1 },
    };

    const result = await pinata.pinFileToIPFS(fileStream, options);
    const fileUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;

    // 5️⃣ Save in DB
    const item = await Item.create({
      user_id: req.user.id,                    // ✅ use authenticated user
      name: req.body.title || req.file.originalname,
      description: req.body.description || null,
      url_storage: fileUrl,
      url_thumbnail: null,
      status: 0,
      event_id: req.body.event_id || null,     // still dynamic from frontend
    });

    // 6️⃣ Cleanup local temp file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      item_id: item.id,
      fileUrl,
    });

  } catch (err) {
    console.error("IPFS Upload Error:", err);
    if (req.file?.path) fs.unlinkSync(req.file.path); // cleanup
    res.status(500).json({ error: "IPFS upload failed" });
  }
});


// ==========================
// ADD SNS TO ITEM
// ==========================
app.post("/api/item/sns/add", authMiddleware, async (req, res) => {
  try {
    const { item_id, sns, handle, url } = req.body;

    // -------------------------------------
    // VALIDATION
    // -------------------------------------
    if (!item_id)
      return res.status(400).json({ message: "item_id is required" });

    if (!sns || !Array.isArray(sns) || sns.length === 0)
      return res.status(400).json({ message: "sns must be a non-empty array" });

    // Check item exists and belongs to user (optional but recommended)
    const item = await Item.findOne({
      where: { id: item_id },
      // where: { id: item_id, user_id: req.user.id },
    });

    if (!item)
      return res.status(404).json({ message: "Item not found or unauthorized" });

    // -------------------------------------
    // INSERT SNS ROWS
    // -------------------------------------
    const createdRows = [];

    for (const snsKind of sns) {
      const row = await ItemSns.create({
        item_id,
        sns_kind: snsKind,
        handle: handle || "default_handle",
        url: url || null,
        uuid: uuidv4(),
        status: 0,          // Workflow starts at 'waiting'
        status_str: "waiting"
      });

      createdRows.push(row);
    }

    // -------------------------------------
    // RESPONSE
    // -------------------------------------
    return res.status(201).json({
      message: "SNS added successfully",
      inserted: createdRows,
    });
  } catch (err) {
    console.error("SNS ADD ERROR:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ==========================
// STATIC FILE SERVING
// ==========================
app.use("/uploads/profiles", express.static(path.join(__dirname, "uploads/profiles")));
app.use("/uploads/items", express.static(path.join(__dirname, "uploads/items")));


// GET all SNS form fields, optionally filter by sns_kind
app.get("/api/sns-form", async (req, res) => {
  try {
    const { sns_kind } = req.query;

    const where = sns_kind ? { sns_kind } : {};

    const forms = await SnsForm.findAll({ where });

    res.json({
      success: true,
      total: forms.length,
      forms,
    });
  } catch (err) {
    console.error("SNS Form Fetch Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// ==========================
// UPDATE ITEM METADATA
// ==========================
app.post("/api/update-item-metadata", authMiddleware, async (req, res) => {
  try {
    const { item_id, title, description, category, tags, royalty, event_id } = req.body;

    // 1️⃣ Validate required fields
    if (!item_id) return res.status(400).json({ error: "item_id is required" });

    // 2️⃣ Check if item exists and belongs to user
    const item = await Item.findOne({ where: { id: item_id } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.user_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this item" });
    }

    // 3️⃣ Update item metadata
    await Item.update(
      {
        name: title || item.name,
        description: description || item.description,
        category: category || null,
        tags: tags || null,
        royalty: royalty || null,
        event_id: event_id || item.event_id,
      },
      { where: { id: item_id } }
    );

    res.json({
      success: true,
      message: "NFT metadata updated successfully",
      item_id,
    });

  } catch (err) {
    console.error("Metadata Update Error:", err);
    res.status(500).json({ error: "Failed to update metadata" });
  }
});

// ==========================
// START SERVER
// ==========================

// SSL certificate files
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/api.mintio.shop/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/api.mintio.shop/fullchain.pem"),
};

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");

    // Start HTTPS Express server
    https.createServer(options, app).listen(PORT, () => {
      console.log(`🔐 HTTPS Server running on port ${PORT}`);

      // Start cron jobs
      startSnsCron();
      console.log("SNS cron jobs started...");
    });
  })
  .catch((err) => {
    console.error("DB Sync Error:", err);
  });
