const express = require('express');
const { getToken } = require('../auth/validateJWT');

const router = express.Router();

const postController = require('../controller/post.controller');

router.post('/', getToken, postController.createPostController);
router.get('/:id', getToken, postController.getPostByIdController);
router.get('/', getToken, postController.getAllPostsController);
router.put('/:id', getToken, postController.updatePostController);

module.exports = router;