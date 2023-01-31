const createPostValidation = (title, content, categoryIds) => {
  if (!title || !content || !categoryIds) {
      return { type: 400, message: 'Some required fields are missing' };
  }
};

const comparison = (resultIds, categoryIds) => {
  if (resultIds.length !== categoryIds.length) {
      return { type: 400, message: 'one or more "categoryIds" not found' };
  }
};

module.exports = {
  createPostValidation,
  comparison,
};