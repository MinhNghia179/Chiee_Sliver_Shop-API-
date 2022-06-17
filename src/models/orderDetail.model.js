const db = require('../configs/connect.mysql');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../constants/message');
const { resultJson } = require('../utils');
const ProductReviewModel = require('./productReview.model');

const OrderDetailModel = function (orderDetail) {
  this.id = orderDetail.id,
    this.order_id = orderDetail.order_id,
    this.product_id = orderDetail.product_id,
    this.product_name = orderDetail.product_name,
    this.product_price = orderDetail.product_price,
    this.product_quantity = orderDetail.product_quantity,
    this.image = orderDetail.image,
    this.properties = orderDetail.properties,
    this.product_review = orderDetail.product_review
}

OrderDetailModel.getListOrderDetailByOrderId = (order_id, result) => {
  db.query('select * from `OrderDetail` where order_id=?', [order_id], (err, orderDetail) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson({ results: orderDetail, total: 0 }, true, ""))
  })
}

OrderDetailModel.createOrderDetail = (order_id, data) => {
  let sql = 'insert into `OrderDetail` (order_id,product_id,product_name,'
    + 'product_price,product_quantity,image,properties) values ';
  data.map(item => {
    sql += `(${order_id},${item.product_id},'${item.product_name}',${item.product_price},${item.product_quantity},'${item.image}','${item.properties}'), `;
  });
  sql = sql.trim();
  sql = sql.replace(/,$/, '');
  db.query(sql, (err, dataResult) => {
    if (err) {
      //result(resultJson(null, false, err.message))
      return;
    }
    // result(dataResult);
  })
}

const mapDataProductReview = (rows) => {
  return Promise.all((rows || []).map(async item => {
    let result = {
      ...item,
      product_review: {}
    }
    result.product_review = await ProductReviewModel.getProductReviewByOrderDetailId(item.id);
    return result;
  }))
}

OrderDetailModel.getListOrderDetail = (order_id) => {
  const sql = 'select * from `OrderDetail` where order_id=?';
  return new Promise((resolve, reject) => {
    db.query(sql, [order_id], (err, rows) => {
      if (err) {
        reject([])
      }

      mapDataProductReview(rows).then(value => {
        resolve(value);
      })
    })
  })
}

OrderDetailModel.getProductBetSelling = (result) => {
  let sql = "SELECT COUNT(od.product_id) as total ,od.product_name, od.image FROM `orderdetail` as od GROUP BY od.product_id ORDER BY total LIMIT 10";
  db.query(sql, (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson(rows, true, ""))
  })
}

module.exports = OrderDetailModel;