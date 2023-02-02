const { createPost, getPosts, 
  getPostById, updatePost } = require('../service/post.service');

const getAllPostsController = async (_req, res) => {
  const result = await getPosts();
  return res.status(200).json(result);
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await getPostById(id);
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(result);
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const data = await updatePost(req.user, id, title, content);
  if (data.type) return res.status(data.type).json({ message: data.message });
  return res.status(200).json(data);
};

const createPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const data = await createPost(req.user, title, content, categoryIds);
  if (data.type) return res.status(data.type).json({ message: data.message });
  return res.status(201).json(data);
};

module.exports = {
  getPostByIdController,
  getAllPostsController,
  updatePostController,
  createPostController,
};