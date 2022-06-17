const OrderCheckStatusService = require('../services/orderCheckStatus.service');

exports.getList = (req, res) => {
  const order_id = req.params.order_id;
  OrderCheckStatusService.getAll(order_id,result => {
    res.send(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  OrderCheckStatusService.create(data,result => {
    res.send(result);
  });
}

exports.statisticalStatus = (req, res) => {
  OrderCheckStatusService.statisticalStatus(result => {
    res.send(result);
  });
}
