const { Category } = require('../models');

const getCategories = async () => Category.findAll();
const getCategoryById = async (id) => Category.findByPk(id);

const postCategory = async (name) => {
  if (!name) {
    return { type: 400, message: '"name" is required' };
  }
  await Category.create({ name });
  const result = await Category.findOne({ where: { name } });
  return result;
};

module.exports = {
  getCategories,
  getCategoryById,
  postCategory,
};