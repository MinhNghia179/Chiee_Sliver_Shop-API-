const express = require('express');
const Auth = require('../middleware/auth.middleware');
const OrderDetailController = require('../controllers/orderDetail.controller');

const router = express.Router();

router.get('/order-detail/:order_id',Auth.isAuth , OrderDetailController.getList);
router.get('/statistical-product-best-selling',Auth.isAuth , OrderDetailController.getProductBetSelling);

module.exports = router;