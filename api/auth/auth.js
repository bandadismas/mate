const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'SECRET';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    console.log(req.body);

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
           
    const decodedData = jwt.verify(token, secret);

    req.userId = decodedData?.id;  
 
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized" });
    console.log("Invalid token");
  }
};

module.exports = auth;
