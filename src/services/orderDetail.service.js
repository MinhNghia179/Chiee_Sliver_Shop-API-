const OrderDetailModel = require('../models/orderDetail.model');

const OrderDetailService = {
  getList: (order_id,result) => OrderDetailModel.getListOrderDetailByOrderId(order_id,result),
  getProductBetSelling: (result) => OrderDetailModel.getProductBetSelling(result)
}

module.exports = OrderDetailService;