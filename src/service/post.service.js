const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const { getUserByEmail } = require('./user.Service');
const { createPostValidation, comparison } = require('./validations/createPost');

const getPosts = async () => BlogPost.findAll({ 
  attributes: { exclude: ['user_id'] },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
});

const getPostById = async (postId) => BlogPost.findByPk(postId, { 
  attributes: { exclude: ['user_id'] },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ], 
});

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
  getPosts,
  getPostById,
  createPost,
};