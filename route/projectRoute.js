const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const projectController = require('../controller/projectController');

router.get('/', verifyToken, projectController.index);
router.get('/:id', verifyToken, projectController.getProjectById);
router.post('/', verifyToken, projectController.store);
router.put('/:id', verifyToken, projectController.changeStatus);
// router.put('/project/:id', projectController.updateProject);
router.delete('/:id', verifyToken, projectController.destroy);

module.exports = router;
