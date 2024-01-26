const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const User = require("../models/users");


// Users Register Handle

router.get("/", (req, res) => {
  res.send("Welcome to the user panel!");
});
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      errors.push({ msg: "Username is already registered" });
      return res.status(400).json({ errors: errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: false,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!req.body.username) {
      res.json({ success: false, message: "Username was not given" });
    } else if (!req.body.password) {
      res.json({ success: false, message: "Password was not given" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Authentication successful, send JSON response
      if (req.user.isAdmin) {
        res.json({ message: "Admin login successful", isAdmin: true });
      } else {
        res.json({ message: "User login successful", isAdmin: false });
      }
    });
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  res.status(201).json({ message: "Logout successful" });
});

module.exports = router;
