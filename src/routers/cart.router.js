const express = require('express');
const Auth = require('../middleware/auth.middleware');
const CartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/cart',Auth.isAuth , CartController.getList);
router.post('/cart',Auth.isAuth , CartController.addToCart);
router.put('/cart',Auth.isAuth , CartController.updateCartItem);
router.delete('/cart',Auth.isAuth , CartController.deleteCartItem);

module.exports = router;