const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const { getUserByEmail } = require('./user.Service');
const { postValidation, comparison } = require('./validations/createPost');

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

const updatePost = async (email, id, title, content) => { 
  const error = postValidation(title, content);
  if (error) return error;
  const user = await getUserByEmail(email);
  const blogPost = await BlogPost.findByPk(id);
  if (user.id !== blogPost.userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  await BlogPost.update({ title, content }, { where: { id } });
  const result = await getPostById(id);
  return result;
};

const createPost = async (email, title, content, categoryIds) => {
  const error = postValidation(title, content, categoryIds);
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
  updatePost,
  createPost,
};