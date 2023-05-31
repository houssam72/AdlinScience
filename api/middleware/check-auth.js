const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
