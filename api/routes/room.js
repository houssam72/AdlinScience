const express = require("express");

const {
  create_room,
  get_rooms,
  get_room_by_id,
} = require("../controllers/room");

const router = express.Router();

router.get("/", get_rooms);
router.post("/", create_room);
router.get("/:roomId", get_room_by_id);

module.exports = router;
