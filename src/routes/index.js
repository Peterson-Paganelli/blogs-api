const express = require('express');

const routers = express.Router();
const userRouter = require('./user.router.js');

routers.use('/user', userRouter);

module.exports = routers;