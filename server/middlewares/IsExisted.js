const jwt = require("jsonwebtoken");

const IsExisted = async function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({ error: "no data" });
    }
  } else {
    return res.status(403).json({ error: "no" });
  }
};

module.exports = IsExisted;
