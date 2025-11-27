const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Op } = require("sequelize");
require("dotenv").config(); 

const sequelize = require("./sequelize");
const User = require("./User");
const UserWallet = require("./UserWalle")

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

// -------------------------
// AUTH MIDDLEWARE
// -------------------------
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

// -------------------------
// USER SIGNUP (FORM)
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

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user_id: newUser.id,
    });
  } catch (err) {
    console.error("Register error:", err);
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

    const token = generateToken(user);

    // Fetch the active wallet only
    const activeWallet = await UserWallet.findOne({
      where: { user_id: user.id, is_active: true }, // or userId / isActive depending on model
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
    const { address } = req.body;
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
      // Just reactivate it
      userWallet.is_active = true;
      await userWallet.save();
    } else {
      // Create a new wallet record
      userWallet = await UserWallet.create({
        user_id: req.user.id,
        address,
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
app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "full_name", "bio", "twitter", "instagram", "website"],
      include: [
        {
          model: UserWallet,
          attributes: ["id", "address", "is_active"],
        },
      ],
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });


    res.json({ profile: user.toJSON() });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// UPDATE PROFILE
// -------------------------
app.put("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const { full_name, bio, twitter, instagram, website } = req.body;

    await User.update(
      { full_name, bio, twitter, instagram, website },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
