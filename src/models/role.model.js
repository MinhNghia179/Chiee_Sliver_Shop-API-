const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');

const RoleModel = function (role) {
  this.code  = role.code;
  this.name  = role.name;
}

RoleModel.getAll = (result) => {
  const sql = 'select * from role';
  db.query(sql, (error, roles) => {
    if (error) {
      result(resultJson(null, false, error.message));
    }
    result(resultJson({ results: roles }, true, ""));
  })
}


module.exports = RoleModel;