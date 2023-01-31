const express = require('express');
const { getToken } = require('../auth/validateJWT');

const router = express.Router();

const postController = require('../controller/post.controller');

router.post('/', getToken, postController.createPostController);

module.exports = router;