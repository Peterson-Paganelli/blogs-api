const { postCategory, getCategories } = require('../service/category.service');

const getCategoryController = async (_req, res) => {
  const result = await getCategories();
  return res.status(200).json(result);
};

const postCategoryController = async (req, res) => {
  const { name } = req.body;
  const data = await postCategory(name);
  if (data.type) return res.status(data.type).json({ message: data.message });
  return res.status(201).json(data);
};

module.exports = {
  getCategoryController,
  postCategoryController,
};