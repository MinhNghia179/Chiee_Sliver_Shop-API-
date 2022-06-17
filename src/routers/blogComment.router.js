const express = require('express');
const Auth = require('../middleware/auth.middleware');
const BlogCommentController = require('../controllers/blogComment.controller');

const router = express.Router();

router.get('/blog-comment-by-user', BlogCommentController.getListByUserId);
router.get('/blog-comment-by-blog', BlogCommentController.getListByBlogId);
router.post('/blog-comment',Auth.isAuth, BlogCommentController.create);
router.put('/blog-comment',Auth.isAuth, BlogCommentController.update);
router.put('/comment-update-status',Auth.isAuth, BlogCommentController.updateStatus);
router.delete('/blog-comment/:id',Auth.isAuth, BlogCommentController.delete);

module.exports = router;