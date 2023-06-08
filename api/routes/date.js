const express = require("express");
const checkAuth = require("../middleware/check-auth");
const {
  get_All_Dates,
  create_date,
  delete_date,
} = require("../controllers/date");

const router = express.Router();

router.get("/", get_All_Dates);
router.post("/", checkAuth.checkAuth, create_date);
router.delete("/:dateId", checkAuth.checkAuth, delete_date);

module.exports = router;
