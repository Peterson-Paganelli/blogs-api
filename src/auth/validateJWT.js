const jwt = require('jsonwebtoken');
require('dotenv/config');

const { getUserById } = require('../service/user.Service');

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

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, password);
    const user = await getUserById(decoded.data.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  validateJWT,
  generateToken,
};