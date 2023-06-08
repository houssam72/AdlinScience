const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
  isAdmin: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

module.exports = mongoose.model("Date", dateSchema);
