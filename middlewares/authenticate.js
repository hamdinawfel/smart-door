require('dotenv').config()
const jwt = require("jsonwebtoken");
var User = require('../models/user');

exports.verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    User.findOne({_id: decodedToken.id }, (err, user) => {
      if (user) {
        req.user = user;
        next();
      }
      else {
        return res.status(401).json({  message: "You are not authenticated!" });
      }
  });
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

exports.verifyAdmin = (req, res, next) => {
    if(req.user.admin === true) {
      return next()
    }
    else{
       return  res.status(403).json({ message: "You are not authorized to perform this operation!" });
    }
}
exports.verifyRoot = (req, res, next) => {
    if(req.user.root === true) {
      return next()
    }
    else{
       return  res.status(403).json({ message: "You are not authorized to perform this operation!" });
    }
}
