const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');

const FavoriteModel = function (favorite) {
  this.user_id    = favorite.user_id,
  this.product_id = favorite.product_id
}

FavoriteModel.count = (param,result) => {
  const {user_id} = param;
  db.query('select count(*) as total from `favorite` where user_id=?',[user_id], (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

FavoriteModel.getList = (param,result) => {
  const {user_id} = param;
  db.query('select * from `favorite`, `product` where user_id=? and favorite.product_id=product.id',[user_id], (err, favorite) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    FavoriteModel.count(param,total => result(resultJson({ results: favorite, total: total }, true, "")));
  })
}

FavoriteModel.addToFavorite = (favorite,result) => {
  let sql = "insert into `favorite` (user_id,product_id) values (?,?)"
  db.query(sql,[favorite.user_id,favorite.product_id], (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson(null, true, ""));
  })
}

FavoriteModel.deleteFavoriteItem = (ids,result) => {
  let user_id = "";
  let product_id = "";
  ids.forEach(element => {
    user_id+=`${element.user_id}, `;
    product_id+=`${element.product_id}, `;
  });
  let sql = "delete from `favorite` where user_id in ("
  +user_id.slice(0,user_id.lastIndexOf(", "))+") and product_id in ("
  +product_id.slice(0,product_id.lastIndexOf(", "))+")"
  db.query(sql, (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson(null, true, ""));
  })
}

module.exports = FavoriteModel;