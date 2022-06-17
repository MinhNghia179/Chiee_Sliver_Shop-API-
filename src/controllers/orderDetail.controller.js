const OrderDetailService = require('../services/orderDetail.service');

exports.getList = (req, res) => {
  const order_id = req.params.order_id;
  OrderDetailService.getList(order_id,result => {
    res.send(result);
  });
}

exports.getProductBetSelling = (req, res) => {
  OrderDetailService.getProductBetSelling(result => {
    res.send(result);
  });
}