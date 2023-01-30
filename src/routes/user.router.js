const express = require('express');
const { getToken } = require('../auth/validateJWT');

const router = express.Router();

const userController = require('../controller/user.controller');

router.post('/', userController.postUserController);
router.get('/:id', getToken, userController.getUserByIdController);
router.get('/', getToken, userController.getUserController);
module.exports = router;