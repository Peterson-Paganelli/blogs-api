const postValidation = (title, content) => {
  if (!title || !content) {
      return { type: 400, message: 'Some required fields are missing' };
  }
};

const comparison = (resultIds, categoryIds) => {
  if (resultIds.length !== categoryIds.length) {
      return { type: 400, message: 'one or more "categoryIds" not found' };
  }
};

module.exports = {
  postValidation,
  comparison,
};