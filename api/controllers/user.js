const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.user_Signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length) {
        res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                res.status(201).json({ message: "user created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  err: err,
                });
              });
          }
        });
      }
    });
};

exports.user_Login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user.length) {
        return res.status(404).json({
          message: "Auth failed1",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(404).json({
              message: "Auth failed2",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "30d",
              }
            );
            const exp = jwt.verify(token, process.env.JWT_KEY).exp;
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              exp: exp,
            });
          }
          console.log(user[0].password);
          res.status(404).json({
            message: "Auth failed3",
          });
        });
      }
    })
    .catch(() => {
      return res.status(404).json({
        message: "Auth failed101",
      });
    });
};

exports.user_Delete = (req, res, next) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then(async (user) => {
      if (user[0]._id.toString() == req.userData.userId) {
        await User.deleteOne({ _id: req.params.userId })
          .exec()
          .then((result) => {
            console.log(result);
            if (result.deletedCount) {
              return res.status(200).json({ message: "user deleted" });
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
