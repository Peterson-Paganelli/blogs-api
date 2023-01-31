const { createPost } = require('../service/post.service');

const createPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const data = await createPost(req.user, title, content, categoryIds);
  if (data.type) return res.status(data.type).json({ message: data.message });
  return res.status(201).json(data);
};

module.exports = {
  createPostController,
};