const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const noteController = require('../controller/noteController');

router.get('/', verifyToken, noteController.index);
router.get('/:id', verifyToken, noteController.getById);
router.post('/', verifyToken, noteController.store);
router.put('/:id', verifyToken, noteController.update);
router.delete('/:id', verifyToken, noteController.destroy);

module.exports = router;
