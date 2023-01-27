require('dotenv/config');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../service/user.Service');

const secret = process.env.JWT_SECRET || 'password123';

const validate = (email, password) => email && password;

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!validate(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' }); 
  }
  const token = jwt.sign(email, secret);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};