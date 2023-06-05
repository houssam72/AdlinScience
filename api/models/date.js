const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

module.exports = mongoose.model("Date", dateSchema);
