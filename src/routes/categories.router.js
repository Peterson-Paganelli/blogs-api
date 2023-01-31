const express = require('express');
const { getToken } = require('../auth/validateJWT');

const router = express.Router();

const categoryController = require('../controller/category.controller');

router.post('/', getToken, categoryController.postCategoryController);
router.get('/', getToken, categoryController.getCategoryController);

module.exports = router;
