const { BlogPost } = require('../../models');
const { getUserByEmail } = require('../user.Service');

const validateUserPost = async (id, email) => {
  const blogPost = await BlogPost.findByPk(id);
  const user = await getUserByEmail(email);
  if (user.id !== blogPost.userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
};

module.exports = validateUserPost;