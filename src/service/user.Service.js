const { generateToken } = require('../auth/validateJWT');
const { User } = require('../models');
const { validateUserJoi } = require('../utils/joi');

const getUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });
const getUserById = (userId) => User.findByPk(userId, { attributes: { exclude: ['password'] } });
const getUserByEmail = (email) => User.findOne({ where: { email } });

const postUser = async ({ displayName, email, password, image }) => {
  const newUser = { displayName, email, password, image };
  const { error } = validateUserJoi(newUser);
  if (error) return { error };

  const userExists = await User.findOne({ where: { email: newUser.email } });
  if (userExists) {
    return { type: 409, message: 'User already registered' };
  }
  
  await User.create(newUser);
  const token = generateToken({ email: newUser.email });
  return { token };
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  postUser,
};