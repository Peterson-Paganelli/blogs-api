const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../models');
const { getUserByEmail } = require('./user.Service');
const { createPostValidation, comparison } = require('./validations/createPost');

const createPost = async (email, title, content, categoryIds) => {
  const error = createPostValidation(title, content, categoryIds);
  const { id } = await getUserByEmail(email);
  if (error) return error;
  const resultIds = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  const compar = comparison(resultIds, categoryIds);
  if (compar) return compar;

  const payload = {
    title,
    content,
    userId: id,
    updated: new Date(),
    published: new Date(),
  };

  const result = await BlogPost.create(payload);
  const postCategories = categoryIds.map((idToInsert) => ({ postId: result.id, 
    categoryId: idToInsert }));

  await PostCategory.bulkCreate(postCategories);

  return result;
};

module.exports = {
  createPost,
};