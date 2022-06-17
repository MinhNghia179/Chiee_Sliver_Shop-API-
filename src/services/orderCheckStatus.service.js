const OrderCheckStatusModel = require('../models/orderCheckStatus.model');

const ProductReviewService = {
  getAll: (order_id,result) => OrderCheckStatusModel.getList(order_id,result),
  create: (data,result) => OrderCheckStatusModel.createOrderCheckStatus(data,result),
  statisticalStatus: (result) => OrderCheckStatusModel.statisticalStatus(result),
}

module.exports = ProductReviewService;