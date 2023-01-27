const { postUser } = require('../service/user.Service');

const postUserController = async (req, res) => {
  const { error, token, type, message } = await postUser(req.body);
  if (error) return res.status(400).json({ message: error.message });
  if (type) return res.status(type).json({ message });
  return res.status(201).json({ token });
};

module.exports = {
  postUserController,
};