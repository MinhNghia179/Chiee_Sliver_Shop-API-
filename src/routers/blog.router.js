const express = require('express');
const Auth = require('../middleware/auth.middleware');
const BlogController = require('../controllers/blog.controller');

const router = express.Router();

router.get('/blog', BlogController.getList);
router.get('/blog/:id', BlogController.getById);
router.post('/blog',Auth.isAuth, BlogController.create);
router.put('/blog',Auth.isAuth, BlogController.update);
router.delete('/blog/:id',Auth.isAuth, BlogController.delete);
router.post('/blog/duplicate',Auth.isAuth, BlogController.duplicate);

module.exports = router;