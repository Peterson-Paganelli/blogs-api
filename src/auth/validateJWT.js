const jwt = require('jsonwebtoken');
require('dotenv/config');

const password = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, password, jwtConfig);
  } catch (error) {
    throw new Error('TOKEN NOT WORKING!!!');
  }
};

const getToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = jwt.verify(authorization, password);
    if (payload.message) return res.status(401).json({ message: 'Expired or invalid token' });
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}; 

module.exports = {
  generateToken,
  getToken,
};