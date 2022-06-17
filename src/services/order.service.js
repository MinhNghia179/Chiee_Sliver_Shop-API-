const OrderModel = require('../models/order.model');

const OrderService = {
  getAll: (param,result) => OrderModel.getList(param,result),
  adminGetAll: (result) => OrderModel.adminGetList(result),
  getById: (id,result) => OrderModel.getById(id,result),
  create: (data,result) => OrderModel.createOrder(data,result),
  statisticalOrder: (result) => OrderModel.statisticalOrder(result),
}

module.exports = OrderService;