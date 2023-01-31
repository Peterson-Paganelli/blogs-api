const express = require('express');

const routers = express.Router();
const userRouter = require('./user.router.js');
const categoryRouter = require('./categories.router.js');
const postRouter = require('./blogPost.router');

routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);
routers.use('/post', postRouter);

module.exports = routers;