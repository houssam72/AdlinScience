const mongoose = require("mongoose");
const Date = require("../models/date");
const Room = require("../models/room");

exports.get_All_Dates = (req, res, next) => {
  Date.find()
    .select()
    .exec()
    .then((docs) => {
      if (docs) {
        res.status(200).json({ docs });
      }
    });
};

exports.create_date = async (req, res, next) => {
  let roomFinded = false;
  await Room.findById(req.body.roomId).then((room) => {
    if (!room) {
      res.status(404).json({
        message: "Room not found",
      });
    } else {
      roomFinded = true;
    }
  });

  if (roomFinded) {
    const date = new Date({
      _id: new mongoose.Types.ObjectId(),
      roomId: req.body.roomId,
      userId: req.userData.userId,
      start: req.body.start,
      end: req.body.end,
    });

    date
      .save()
      .then((result) => {
        Room.updateOne({ _id: result.roomId }, { $push: { dates: result._id } })
          .exec()
          .then((result2) => {
            if (result2.modifiedCount) {
              return res.status(201).json({
                _id: result._id,
                roomId: result.roomId,
                start: result.start,
                end: result.end,
              });
            }
            res.status(500).json({
              error: "Error",
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          error: "Error",
        });
      });
  }
};

exports.delete_date = (req, res, next) => {
  Date.find({ _id: req.params.dateId })
    .exec()
    .then(async (date) => {
      if (date[0].userId.toString() == req.userData.userId) {
        await Date.deleteOne({ _id: req.params.dateId })
          .exec()
          .then((result) => {
            if (result.deletedCount) {
              return res.status(200).json({ message: "date deleted" });
            } else {
              return res.status(500).json({ message: "Failed" });
            }
          });
      } else {
        return res.status(500).json({ message: "You can't delete" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
};