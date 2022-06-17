const express = require('express');
const Auth = require('../middleware/auth.middleware');
const OrderController = require('../controllers/order.controller');

const router = express.Router();

router.get('/order',Auth.isAuth , OrderController.getList);
router.get('/admin/order',Auth.isAuth , OrderController.adminGetList);
router.get('/order/:id',Auth.isAuth , OrderController.getById);
router.post('/order',Auth.isAuth , OrderController.create);
router.get('/order-statistical',Auth.isAuth , OrderController.statisticalOrder);

module.exports = router;