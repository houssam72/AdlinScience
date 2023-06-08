const jwt = require("jsonwebtoken");

checkAuthEhitNextForAllTimes = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        req.userData = false;
        next();
      } else {
        req.userData = decoded;
        next();
      }
    });
  } catch (err) {
    req.userData = false;
    next();
  }
};

checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: "Token Invalid",
        });
      }
      req.userData = decoded;
      next();
    });
  } catch {
    return res.status(404).json({
      message: "Auth failed54",
    });
  }
};

module.exports = {
  checkAuth: checkAuth,
  checkAuthEhitNextForAllTimes,
};
