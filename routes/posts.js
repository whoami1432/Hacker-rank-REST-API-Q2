const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.post('/', postsController.create);
router.get('/', postsController.get);
router.delete('/:id', postsController.common);
router.put('/:id', postsController.common);
router.patch('/:id', postsController.common);
router.get('/:id', postsController.getid);

module.exports = router;
