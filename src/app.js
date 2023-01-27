const express = require('express');
const loginController = require('./controller/login');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.post('/login', loginController.login);
app.use(routes);
module.exports = app;
