const express = require("express");
const checkAuth = require("../middleware/check-auth");

const { user_Signup, user_Login, user_Delete } = require("../controllers/user");

const router = express.Router();

router.post("/signUp", user_Signup);

router.post("/login", user_Login);

router.delete("/:userId", checkAuth, user_Delete);

module.exports = router;
