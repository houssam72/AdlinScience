const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const checkAuth = require("../middleware/check-auth");

const User = require("../models/user");
const { user_Signup, user_Login, user_Delete } = require("../controllers/user");

const router = express.Router();

router.post("/signUp", user_Signup);

router.post("/login", user_Login);

router.delete("/:userId", checkAuth, user_Delete);

module.exports = router;
