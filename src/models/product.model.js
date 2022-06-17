const db = require('../configs/connect.mysql');
const { MESSAGE_ERROR } = require('../constants/message');
const { resultJson } = require('../utils');
const uploadImageBase64 = require('../utils/uploadFile');

const ProductModel = function (product) {
  this.id = product.id;
  this.category_id = product.category_id;
  this.name = product.name;
  this.price = product.price;
  this.promotion_price = product.promotion_price;
  this.promotion_time_start = product.promotion_time_start;
  this.promotion_time_end = product.promotion_time_end;
  this.list_image = product.list_image;
  this.short_description = product.short_description;
  this.description = product.description;
  this.created_at = product.created_at;
  this.created_by = product.created_by;
  this.modified_at = product.modified_at;
  this.modified_by = product.modified_by;
  this.properties = product.properties;
  this.status = product.status;
};

ProductModel.count = (query, category_id, status, result) => {
  let sql =
    "select count(*) as total from product WHERE name  LIKE '%" +
    (query ? query : '') +
    "%' ";
  if (category_id > 0) {
    sql += ' AND category_id=' + category_id;
  }
  if (status != -1) {
    sql += ' AND status=' + status;
  }

  db.query(sql, (err, data) => {
    if (err) {
      result(0);
      return;
    }
    result(data[0].total);
  });
};

ProductModel.getAll = (param, result) => {
  const { page, pageSize, query, category_id, status, order_by } = param;
  const currentPage = Number(page);
  const limit = Number(pageSize);
  const offset = currentPage * limit;
  let sql =
    "SELECT * FROM product WHERE name LIKE '%" + (query ? query : '') + "%' ";

  if (category_id > 0) {
    sql += ' AND category_id=' + category_id;
  }
  if (status != -1) {
    sql += ' AND status=' + status;
  }

  sql += ' ORDER BY ' + (order_by ? order_by : 'id DESC') + ' LIMIT ? OFFSET ?';

  db.query(sql, [limit, offset], (err, product) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    ProductModel.count(query, category_id, status, (total) => {
      const totalPage = Math.ceil(Number(total) / limit);
      result(
        resultJson(
          {
            results: product,
            total: total,
            currentPage: currentPage,
            totalPage: totalPage,
          },
          true,
          ''
        )
      );
    });
  });
};

ProductModel.getById = (id, result) => {
  db.query(`select * from product where id=${id}`, (err, product) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    let dataResult = product.length !== 0 ? product[0] : {};
    getListProductReviewByProductId(id).then((value) => {
      dataResult.product_reviews = value;
      result(resultJson(dataResult, true, ''));
    });
  });
};

const getListProductReviewByProductId = (productId) => {
  return new Promise((res, rej) => {
    let sql =
      'select productreviews.*, account.avatar,account.first_name,account.last_name  from productreviews,account ' +
      ' where productreviews.user_id = account.id and productreviews.status=1 and productreviews.product_id=' +
      productId;
    db.query(sql, (err, rows) => {
      if (err) {
        rej(err);
      }
      res(rows);
    });
  });
};

ProductModel.getAllBestSellingProduct = (result) => {
  db.query(`select * from product order by created_at limit 8`, (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ results: rows, total: rows.length }, true, ''));
  });
};

ProductModel.getAllNewProduct = (result) => {
  db.query(
    `select * from product order by created_at desc limit 8`,
    (err, rows) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ results: rows, total: rows.length }, true, ''));
    }
  );
};

ProductModel.insert = (product, result) => {
  const created_at = new Date();
  let sql =
    'insert into product (category_id,name,price,' +
    'promotion_price,promotion_time_start,promotion_time_end,' +
    'list_image,short_description,description,created_at,created_by,' +
    'properties,status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [
      product.category_id,
      product.name,
      product.price,
      product?.promotion_price,
      product?.promotion_time_start,
      product?.promotion_time_end,
      product?.list_image,
      product?.short_description,
      product?.description,
      created_at,
      product.created_by,
      product?.properties,
      product.status,
    ],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: data.insertId }, true, ''));
    }
  );
};

ProductModel.update = (product, result) => {
  const modified_at = new Date();
  let sql =
    'update product set category_id=?, name=?, price=?, ' +
    'promotion_price=?, promotion_time_start=?, promotion_time_end=?, ' +
    'list_image=?, short_description=?, description=?, modified_at=?, modified_by=?, ' +
    'properties=?, status=? where id=?';
  db.query(
    sql,
    [
      product.category_id,
      product.name,
      product.price,
      product?.promotion_price,
      product?.promotion_time_start,
      product?.promotion_time_end,
      product?.list_image,
      product?.short_description,
      product?.description,
      modified_at,
      product.modified_by,
      product?.properties,
      product.status,
      product.id,
    ],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: product.id }, true, ''));
    }
  );
};

ProductModel.delete = (id, result) => {
  db.query(`delete from product where id=${id}`, (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: id }, true, ''));
  });
};

ProductModel.duplicate = (id, result) => {
  db.query(`select * from product where id=${id}`, (err, product) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    if (product.length !== 0) {
      ProductModel.insert(product[0], result);
    } else {
      result(resultJson(null, false, err.message));
    }
  });
};

module.exports = ProductModel;
