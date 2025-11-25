const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const sequelize = require("./sequelize");
const User = require("./User");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = "your_jwt_secret_here";

// -------------------------
// JWT
// -------------------------
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email || null,
      wallet_address: user.wallet_address || null,
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

    res.json({
      message: "Login successful",
      user_id: user.id,
      wallet_connected: !!user.wallet_address,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// WALLET REGISTER / LINK
// -------------------------
app.post("/api/auth/register-wallet", async (req, res) => {
  try {
    const { wallet_address, role, user_id } = req.body;

    if (!wallet_address)
      return res.status(400).json({ message: "Wallet address is required" });

    // CASE 1: User already signed up → just link wallet
    if (user_id) {
      const user = await User.findByPk(user_id);

      if (!user)
        return res.status(404).json({ message: "User not found" });

      await user.update({
        wallet_address,
        role: role || user.role,
      });

      const updatedUser = user.toJSON();
      updatedUser.wallet_address = wallet_address;
      updatedUser.role = role || user.role;

      const token = generateToken(updatedUser);

      return res.json({
        message: "Wallet linked successfully",
        user_id,
        token,
      });
    }

    // CASE 2: Wallet login or auto create user
    let user = await User.findOne({ where: { wallet_address } });

    if (!user) {
      user = await User.create({
        wallet_address,
        role: role || "User",
      });

      return res.json({
        message: "Wallet registered successfully",
        user_id: user.id,
        token: generateToken(user),
      });
    }

    return res.json({
      message: "Wallet login successful",
      user_id: user.id,
      token: generateToken(user),
    });

  } catch (err) {
    console.error("Wallet register/login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------------
// GET USER PROFILE
// -------------------------
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
        "wallet_address",
      ],
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ profile: user });
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
