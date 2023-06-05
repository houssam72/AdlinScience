const mongoose = require("mongoose");

const SubObjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  equipements: { type: [SubObjectSchema], default: [] },
  dates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Date" }],
  description: { type: String, required: true },
  capacity: { type: String, required: true },
  color: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  img: { type: Number, required: true },
});

module.exports = mongoose.model("Room", roomSchema);
