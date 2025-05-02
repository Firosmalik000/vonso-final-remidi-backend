const route = require('express').Router();

const userController = require('../controller/userController');

route.post('/signup', userController.signup);
route.post('/login', userController.login);

module.exports = route;
