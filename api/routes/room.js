const express = require("express");

const checkAuth = require("../middleware/check-auth");

const {
  create_room,
  get_rooms,
  get_room_by_id,
} = require("../controllers/room");

const router = express.Router();

router.get("/", checkAuth.checkAuthEhitNextForAllTimes, get_rooms);
router.post("/", checkAuth.checkAuth, create_room);
router.get("/:roomId", checkAuth.checkAuthEhitNextForAllTimes, get_room_by_id);

module.exports = router;
