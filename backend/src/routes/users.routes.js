const express = require("express");
const User = require("../models/user.model");
const authorize = require("../middleware/authorize");
const passport = require("passport");
const protectRoute = passport.authenticate("jwt", { session: false });

const router = express.Router();

// GET /users - Fetch all users (Admin only)
router.get("/", protectRoute, authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
