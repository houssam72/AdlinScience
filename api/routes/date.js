const express = require("express");
const { get_All_Dates, create_date } = require("../controllers/date");

const router = express.Router();

router.get("/", get_All_Dates);
router.post("/", create_date);

module.exports = router;
