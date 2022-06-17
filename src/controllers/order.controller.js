const OrderService = require('../services/order.service');

exports.getList = (req, res) => {
  const param = req.query;
  OrderService.getAll(param,result => {
    res.send(result);
  });
}

exports.adminGetList = (req, res) => {
  OrderService.adminGetAll(result => {
    res.send(result);
  });
}

exports.getById = (req, res) => {
  const id = req.params.id;
  OrderService.getById(id,result => {
    res.send(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  OrderService.create(data,result => {
    res.send(result);
  });
}

exports.statisticalOrder = (req, res) => {
  OrderService.statisticalOrder(result => {
    res.send(result);
  });
}
