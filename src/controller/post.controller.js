const { createPost, getPosts } = require('../service/post.service');

const getAllPostsController = async (_req, res) => {
  const result = await getPosts();
  return res.status(200).json(result);
};

const createPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const data = await createPost(req.user, title, content, categoryIds);
  if (data.type) return res.status(data.type).json({ message: data.message });
  return res.status(201).json(data);
};

module.exports = {
  getAllPostsController,
  createPostController,
};