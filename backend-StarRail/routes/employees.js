const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Employee = require("../models/employees");

router.get("/", (req, res) => {
    res.send("Welcome to the admin panel!");
  });
// Admins Register Handle
router.post("/register-admin", async (req, res) => {
  const { username, password } = req.body;
  const errors = [];
  if (!username || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  try {
    const existingEmployee = await Employee.findOne({ username: username });
    if (existingEmployee) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({
      username,
      password: hashedPassword,
      isAdmin: true,
    });
    await newEmployee.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
