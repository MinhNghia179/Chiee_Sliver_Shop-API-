const db = require('../configs/connect.mysql');
const { ORDER_STATUS } = require('../constants');
const { resultJson } = require('../utils');
const OrderCheckStatusModel = require('./orderCheckStatus.model');
const OrderDetailModel = require('./orderDetail.model');

const OrderModel = function (order) {
  this.id                 = order.id,
  this.user_id            = order.user_id,
  this.recipient_name     = order.recipient_name,
  this.recipient_phone    = order.recipient_phone,
  this.recipient_address  = order.recipient_address,
  this.note               = order.note,
  this.shipping           = order.shipping,
  this.total_payment      = order.total_payment,
  this.order_details      = order.order_details,
  this.order_status       = order.order_status
}

OrderModel.count = (user_id, result) => {
  let sql = 'select count(*) as total from `order` ';
  if(user_id){
    sql+=` where user_id=${user_id}`
  }
  db.query(sql, (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

OrderModel.adminGetList = (result) => {
  db.query('select * from `order` order by id desc', (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    
    mapDataOrder(rows).then(value => {
      OrderModel.count(false, total => result(resultJson({ results: value, total: total }, true, "")));
    }).catch(error => {
      result(resultJson({ results: [], total: 0 }, false, ""))
    });
  })
}

OrderModel.getList = (param, result) => {
  const { user_id } = param;
  db.query('select * from `order` where user_id=? order by id desc', [user_id], (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    mapDataOrder(rows).then(value => {
      OrderModel.count(user_id, total => result(resultJson({ results: value, total: total }, true, "")));
    }).catch(error => {
      result(resultJson({ results: [], total: 0 }, false, ""))
    });
  })
}

OrderModel.getById = (id, result) => {
  db.query('select * from `order` where id=?', [id],  async (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    if(rows.length !== 0){
      let dataResult = {
        ...rows[0],
        order_status: [],
        order_details: []
      };
      try{
        dataResult.order_status = await OrderCheckStatusModel.getListOrderStatus(id);
        dataResult.order_details = await OrderDetailModel.getListOrderDetail(id);
        result(resultJson(dataResult, true, ""));
      }catch(error) {
        console.log(error.message)
        result(resultJson(null, false, ""));
      }
    }else{
      result(resultJson(null, false, ""));
    }
  })
}

OrderModel.createOrder = (order, result) => {
  let sql = 'insert into `order` (user_id, recipient_name, recipient_phone, recipient_address, note, '
    + ' shipping, total_payment) values ( ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [order.user_id, order.recipient_name, order.recipient_phone, order.recipient_address, order.note, order.shipping, order.total_payment],
    (err, dataResult) => {
      if (err) {
        result(resultJson(null, false, err.message))
        return;
      }
      const order_id = dataResult.insertId;
      OrderDetailModel.createOrderDetail(order_id, order.order_details);
      OrderCheckStatusModel.createOrderCheckStatus({ order_id: order_id, status_code: ORDER_STATUS.WAIT_CONFIRM.CODE })
      result(resultJson({ id: order_id }, true, ""));
    })
}

const mapDataOrder = (rows) => {
  return Promise.all((rows || []).map(async (element) => {
    let newOrder = {
      ...element,
      order_status: [],
      order_details: []
    }
    newOrder.order_status = await OrderCheckStatusModel.getListOrderStatus(element.id);
    newOrder.order_details = await OrderDetailModel.getListOrderDetail(element.id);
    return newOrder;
  }))
}


OrderModel.statisticalOrder = (result) =>{
  let sql = "SELECT COUNT(s.created_at) as count, DATE_FORMAT(s.created_at,'%m/%Y') as date ";
  sql+="FROM `order` as o, `ordercheckstatus` as s WHERE o.id = s.order_id and s.status_code = 'WAIT_CONFIRM' ";
  sql+="GROUP BY DATE_FORMAT(s.created_at,'%m/%Y') ";
  sql+="ORDER BY DATE_FORMAT(s.created_at,'%m/%Y') ";

  db.query(sql, (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    const data = rows.length < 6 ? rows : rows.slice(rows.length - 7, 6);
    result(resultJson(data, true, ""));
  })
}


module.exports = OrderModel;