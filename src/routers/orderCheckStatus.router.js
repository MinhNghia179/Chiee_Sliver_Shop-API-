const express = require('express');
const Auth = require('../middleware/auth.middleware');
const OrderCheckStatusController = require('../controllers/orderCheckStatus.controller');

const router = express.Router();

router.get('/order-check-status/:order_id',Auth.isAuth , OrderCheckStatusController.getList);
router.get('/order-status-statistical',Auth.isAuth , OrderCheckStatusController.statisticalStatus);
router.post('/order-check-status',Auth.isAuth , OrderCheckStatusController.create);

module.exports = router;