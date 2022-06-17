const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');

const OrderCheckStatusModel = function (orderCheckStatus) {
  this.order_id = orderCheckStatus.order_id,
    this.status_code = orderCheckStatus.status_code,
    this.created_at = orderCheckStatus.created_at
}

OrderCheckStatusModel.getList = (order_id, result) => {
  db.query('select * from `ordercheckstatus` where order_id=? order by created_at desc', [order_id], (err, orderCheckStatus) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson({ results: orderCheckStatus, total: 0 }, true, ""));
  })
}

OrderCheckStatusModel.createOrderCheckStatus = (orderCheckStatus, result) => {
  const created_at = new Date();
  let sql = 'insert into `ordercheckstatus` (order_id,status_code,created_at) values ( ?, ?, ?)';

  db.query(sql, [orderCheckStatus.order_id, orderCheckStatus.status_code, created_at],
    (err, dataResult) => {
      if (result) {
        if (err) {
          result(resultJson(null, false, err.message))
          return;
        }
        result(resultJson({ id: dataResult.insertId }, true, ""));
      }
    })
}


OrderCheckStatusModel.getListOrderStatus = (order_id) => {
  const sql = 'select * from `ordercheckstatus` where order_id=? order by created_at desc';
  return new Promise((resolve, reject) => {
    db.query(sql, [order_id], (err, rows) => {
      if (err) {
        reject([])
      }
      resolve(Object.values(JSON.parse(JSON.stringify(rows))))
    })
  })
}

OrderCheckStatusModel.statisticalStatus = (result) =>{
  let sql = "SELECT COUNT(s.name) as total, s.name as name ";
  sql+= "FROM `ordercheckstatus` as cs, `orderstatus` as s ";
  sql+= "WHERE cs.status_code = s.code ";
  sql+= "GROUP BY s.name ";
  sql+= "ORDER BY s.numerical_order";

  db.query(sql, (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }

    result(resultJson(rows, true, ""));
  })
}

module.exports = OrderCheckStatusModel;