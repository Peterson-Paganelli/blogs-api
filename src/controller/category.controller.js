const { postCategory } = require('../service/category.service');

const postCategoryController = async (req, res) => {
  const { name } = req.body;
  const data = await postCategory(name);
  if (data.type) return res.status(data.type).json({ message: data.message });
  return res.status(201).json(data);
};

module.exports = {
  postCategoryController,
};