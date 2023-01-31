const express = require('express');
const { getToken } = require('../auth/validateJWT');

const router = express.Router();

const postController = require('../controller/post.controller');

router.post('/', getToken, postController.createPostController);
router.get('/', getToken, postController.getAllPostsController);

module.exports = router;