const mongoose = require("mongoose");
const Room = require("../models/room");

const AddIsAdminToDates = (dates, userId) => {
  return dates.map((date) => {
    if (date.userId == userId) {
      date.isAdmin = true;
    } else {
      date.isAdmin = false;
    }
    return date;
  });
};

exports.create_room = (req, res, next) => {
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    equipements: req.body.equipements,
    capacity: req.body.capacity,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    color: req.body.color,
    img: req.body.img,
  });

  room
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Room stored",
        obj: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_rooms = (req, res, next) => {
  Room.find()
    .select()
    .populate("dates")
    .exec()
    .then((docs) => {
      if (docs) {
        const response = docs.map((doc) => {
          return {
            id: doc._id,
            name: doc.name,
            description: doc.description,
            capacity: doc.capacity,
            equipements: doc.equipements,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            date: AddIsAdminToDates(doc.dates, req.userData.userId),
            color: doc.color,
            img: doc.img,
          };
        });
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.get_room_by_id = (req, res, next) => {
  const id = req.params.roomId;
  Room.findById(id)
    .select()
    .populate("dates")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          name: doc.name,
          description: doc.description,
          capacity: doc.capacity,
          equipements: doc.equipements,
          date: AddIsAdminToDates(doc.dates, req.userData.userId),
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          color: doc.color,
          img: doc.img,
        });
      } else {
        res.status(500).json({ error: err });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Find by Id a room in a dbb is KO(No valid entry found for provided Id",
      });
    });
};
