const { MESSAGE_ERROR } = require('../constants/message');
const CartModel = require('../models/cart.model');
const { resultJson } = require('../utils');

const CartService = {
  getAll: (param, result) => CartModel.getList(param, result),
  addToCart: (cart, result) => {
    CartModel.checkAddToCart(cart, data => {
      if (data) {
        const findIndex = data.findIndex(element => {
          return element.user_id === cart.user_id 
          && element.product_id === cart.product_id 
          && element.properties === cart.properties;
        });
        if(findIndex !== -1){
          const newCart = data[findIndex];
          newCart.amount = Number(newCart.amount) + Number(cart.amount);
          const properties = JSON.parse(newCart.properties);
          if(newCart.amount > properties.size.amount){
            result(resultJson(null, false, MESSAGE_ERROR.CART_ERROR_AMOUNT));
          }else{
            CartModel.updateCartItem(newCart, result)
          }
          
        }else{
          CartModel.addToCart(cart, result);
        }
      } else {
        CartModel.addToCart(cart, result);
      }
    })

  },
  updateCartItem: (cart, result) => CartModel.updateCartItem(cart, result),
  deleteCartItem: (ids, result) => CartModel.deleteCartItem(ids, result),
}

module.exports = CartService;