const route = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const agendaController = require('../controller/agendaController');

route.get('/', verifyToken, agendaController.index);
route.get('/:id', verifyToken, agendaController.getById);
route.post('/', verifyToken, agendaController.store);
route.put('/:id', verifyToken, agendaController.update);
route.delete('/:id', verifyToken, agendaController.destroy);

module.exports = route;
