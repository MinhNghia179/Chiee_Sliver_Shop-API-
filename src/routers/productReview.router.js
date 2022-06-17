const express = require('express');
const Auth = require('../middleware/auth.middleware');
const ProductReviewController = require('../controllers/productReview.controller');

const router = express.Router();

router.get('/product-reviews',Auth.isAuth , ProductReviewController.getList);
router.post('/product-reviews', Auth.isAuth , ProductReviewController.createReview);
router.put('/product-reviews', Auth.isAuth , ProductReviewController.updateStatus);

module.exports = router;