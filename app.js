const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const userRouter = require("./api/routes/user");
const roomRouter = require("./api/routes/room");
const dateRouter = require("./api/routes/date");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Solve Corse Error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

/////////////////////////////////////

app.use("/user", userRouter);
app.use("/rooms", roomRouter);
app.use("/date", dateRouter);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Its work",
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
