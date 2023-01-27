const express = require('express');

const router = express.Router();

const userController = require('../controller/user.controller');

router.post('/', userController.postUserController);

module.exports = router;