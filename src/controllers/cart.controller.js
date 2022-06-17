const CartService = require('../services/cart.service');

exports.getList = (req, res) => {
  const param = req.query;
  CartService.getAll(param,result => {
    res.send(result);
  });
}

exports.addToCart = (req, res) => {
  const data = req.body;
  CartService.addToCart(data,result => {
    res.send(result);
  });
}

exports.updateCartItem = (req, res) => {
  const data = req.body;
  CartService.updateCartItem(data,result => {
    res.send(result);
  });
}

exports.deleteCartItem = (req, res) => {
  const {ids} = req.body;
  CartService.deleteCartItem(ids,result => {
    res.send(result);
  });
}
