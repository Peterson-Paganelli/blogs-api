const { User } = require('../models');

const getUserById = (userId) => User.findByPk(userId);
const getUserByEmail = (email) => User.findOne({ where: { email } });

module.exports = {
  getUserById,
  getUserByEmail,
};