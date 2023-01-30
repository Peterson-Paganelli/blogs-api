const express = require('express');
const { getToken } = require('../auth/validateJWT');

const router = express.Router();

const categoryController = require('../controller/category.controller');

router.post('/', getToken, categoryController.postCategoryController);

module.exports = router;
