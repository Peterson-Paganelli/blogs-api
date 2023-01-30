const express = require('express');

const routers = express.Router();
const userRouter = require('./user.router.js');
const categoryRouter = require('./categories.router.js');

routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);

module.exports = routers;