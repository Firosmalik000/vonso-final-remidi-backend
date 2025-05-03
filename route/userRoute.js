const route = require('express').Router();

const userController = require('../controller/userController');

route.post('/signup', userController.signup);
route.post('/login', userController.login);
route.post('/logout', userController.logOut);
route.get('/', userController.index);
route.post('/add', userController.store);
route.delete('/:id', userController.destroy);

module.exports = route;
