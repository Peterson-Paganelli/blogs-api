const { postUser, getUsers, getUserById } = require('../service/user.Service');

const postUserController = async (req, res) => {
  const { error, token, type, message } = await postUser(req.body);
  if (error) return res.status(400).json({ message: error.message });
  if (type) return res.status(type).json({ message });
  return res.status(201).json({ token });
};

const getUserController = async (_req, res) => {
  const result = await getUsers();
  return res.status(200).json(result);
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await getUserById(id);
  if (!result) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(result);
};

module.exports = {
  postUserController,
  getUserController,
  getUserByIdController,
};