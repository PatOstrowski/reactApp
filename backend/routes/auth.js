const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" }); // Zwracamy JSON z błędem
    }
    user = new User({ name, email, password });
    await user.save();

    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.json(req.session.user); // Sukces - zwracamy dane użytkownika
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.json(req.session.user); // Sukces - zwracamy dane użytkownika
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET Logout (zgodnie z Twoim starym kodem)
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.json({ message: "Wylogowano" }); // Zwracamy informację o wylogowaniu
  });
});

module.exports = router;
