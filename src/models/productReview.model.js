const db = require('../configs/connect.mysql');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../constants/message');
const { resultJson } = require('../utils');

const ProductReviewModel = function (productReview) {
  this.id          = productReview.id,
  this.user_id     = productReview.user_id,
  this.product_id  = productReview.product_id,
  this.rate        = productReview.rate,
  this.comment     = productReview.comment,
  this.created_at  = productReview.created_at,
  this.status      = productReview.status
}

ProductReviewModel.count = (param,result) => {
  const {product_id} = param;
  db.query('select count(*) as total from productreviews where product_id=?',
  [product_id], 
  (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

ProductReviewModel.getList = (param,result) => {
  const {product_id} = param;
  let sql = "SELECT productreviews.*, account.avatar,account.first_name,account.last_name "
  +"FROM productreviews, account  "
  + "WHERE productreviews.user_id = account.id and product_id=?"
  db.query(sql,
  [product_id], 
  (err, productReview) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    ProductReviewModel.count(param,total => result(resultJson({ results: productReview, total: total }, true, "")));
  })
}

ProductReviewModel.createReview = (productReview,result) =>  {
  const created_at = new Date();
  db.query(`insert into productreviews (user_id,product_id, order_detail_id, rate,comment,created_at,status) values (?,?,?,?,?,?,?)`,
  [productReview.user_id, productReview.product_id,productReview.order_detail_id, productReview.rate,productReview.comment,created_at,true], 
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: data.insertId }, true, ""));
  })
}

ProductReviewModel.updateStatus = (productReview,result) => {
  db.query(`update productreviews set status=? where id=?`,
  [productReview.status, productReview.id],
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ user_id: productReview.user_id,product_id:productReview.product_id }, true, ""));
  })
}

ProductReviewModel.getProductReviewByOrderDetailId = (order_detail_id) => {
  const sql = `select * from productreviews where order_detail_id=${order_detail_id}`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if (err) {
        reject({})
      }
      resolve(JSON.parse(JSON.stringify(rows.length !== 0 ? rows[0] : {})))
    })
  })
}

module.exports = ProductReviewModel;