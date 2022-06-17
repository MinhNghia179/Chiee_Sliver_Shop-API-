const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');
const sql = require('sql-query');
const { MESSAGE_SUCCESS } = require('../constants/message');

const CartModel = function (cart) {
  (this.id = cart.id),
    (this.user_id = cart.user_id),
    (this.product_id = cart.product_id),
    (this.amount = cart.amount),
    (this.properties = cart.properties);
};

CartModel.count = (param, result) => {
  const { user_id } = param;
  db.query(
    'select count(*) as total from `cart` where user_id=?',
    [user_id],
    (err, data) => {
      if (err) {
        result(0);
        return;
      }
      result(data[0].total);
    }
  );
};

CartModel.getList = (param, result) => {
  const { user_id } = param;
  db.query(
    'select *, cart.id as id_cart, cart.properties as properties_cart,product.id as id_product, product.properties as properties_product  from cart, product where cart.user_id=? and cart.product_id=product.id',
    [user_id],
    (err, carts) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      const cartFormat = carts.map((item) => {
        let product = {
          ...item,
          properties: item.properties_product,
          id: item.id_product,
        };
        delete product.user_id;
        delete product.product_id;
        delete product.amount;
        delete product.properties_cart;

        return {
          id: item.id_cart,
          user_id: item.user_id,
          product_id: item.product_id,
          amount: item.amount,
          properties: JSON.parse(item.properties_cart),
          product: product,
        };
      });
      CartModel.count(param, (total) =>
        result(resultJson({ results: cartFormat, total: total }, true, ''))
      );
    }
  );
};

CartModel.checkAddToCart = (cart, result) => {
  let sql = 'select * from `cart` where user_id=? and product_id=?';
  db.query(sql, [cart.user_id, cart.product_id], (err, data) => {
    if (err) {
      result(null);
      return;
    }
    result(data);
  });
};

CartModel.addToCart = (cart, result) => {
  let sql =
    'insert into `cart` (user_id,product_id,amount,properties) values (?,?,?,?)';
  db.query(
    sql,
    [cart.user_id, cart.product_id, cart.amount, cart.properties],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson(null, true, MESSAGE_SUCCESS.ADD_TO_CART));
    }
  );
};

CartModel.updateCartItem = (cart, result) => {
  let sql = 'update `cart` set amount=? where id=?';
  db.query(sql, [cart.amount, cart.id], (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson(null, true, ''));
  });
};

CartModel.deleteCartItem = (ids, result) => {
  let sql = 'delete from `cart` where id in (' + ids.toString() + ')';
  console.log;
  db.query(sql, (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson(null, true, ''));
  });
};

module.exports = CartModel;
