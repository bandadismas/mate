const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
           
    const decodedData = jwt.verify(token, secret);

    req.userId = decodedData?.id;  
 
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
