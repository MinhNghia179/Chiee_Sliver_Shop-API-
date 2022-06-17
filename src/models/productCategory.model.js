const db = require('../configs/connect.mysql');
const { MESSAGE_ERROR } = require('../constants/message');
const { resultJson } = require('../utils');

const ProductCategoryModel = function (ProductCategory) {
  this.id = ProductCategory.id;
  this.name = ProductCategory.name;
  this.code = ProductCategory.code;
  this.thumbnail = ProductCategory.thumbnail;
  this.status = ProductCategory.status;
}

ProductCategoryModel.count = result => {
  db.query('select count(*) as total from productcategory', (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

ProductCategoryModel.getAll = result => {
  db.query('select * from productcategory', (err, productCategory) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    ProductCategoryModel.count(total => result(resultJson({ results: productCategory, total: total }, true, "")));
  })
}

ProductCategoryModel.getById = (id, result) => {
  db.query(`select * from productcategory where id=${id}`, (err, ProductCategory) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson(ProductCategory.length !== 0 ? ProductCategory[0] : {}, true, ""))
  })
}

ProductCategoryModel.insert = (productCategory, result) => {
  db.query(`insert into productcategory (name,code,thumbnail,status) values (?, ?, ?, ?)`,
    [productCategory.name, productCategory?.code, productCategory?.thumbnail, productCategory.status], (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: data.insertId }, true, ""));
    })
}

ProductCategoryModel.update = (productCategory, result) => {
  db.query(`update productcategory set name=?, code=?, thumbnail=?, status=?  where id= ?`,
    [productCategory.name, productCategory.code, productCategory?.thumbnail, productCategory.status, productCategory.id || -1],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: productCategory.id }, true, ""));
    })
}

ProductCategoryModel.delete = (id, result) => {
  db.query(`delete from productcategory where id=${id}`, (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: id }, true, ""));
  })
}

module.exports = ProductCategoryModel;