const db = require('../configs/connect.mysql');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../constants/message');
const { resultJson } = require('../utils');
const uploadImageBase64 = require('../utils/uploadFile');

const AccountModel = function (account) {
  this.id           = account.id;
  this.role_code    = account.role_code;
  this.email        = account.email;
  this.password     = account.password;
  this.last_name    = account.last_name;
  this.first_name   = account.file_name;
  this.address      = account.address;
  this.avatar       = account.avatar;
  this.phone_number = account.phone_number;
  this.permission   = account.permission;
  this.status       = account.status;
}


AccountModel.count = result => {
  db.query('select count(*) as total from account', (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

AccountModel.getAll = (param,result) => {
  const {id,role_code} = param;
  let sql = 'SELECT `id`,`role_code`,`email`,`last_name`,`first_name`,`avatar`,`address`,`phone_number`,`status`,role.name as `role_name` ';
      sql+= ` FROM account,role WHERE account.role_code=role.code `;
  if(role_code){
    sql += ' AND account.role_code='+role_code
  }

  sql+=' ORDER BY id DESC';

  db.query(sql, 
  (err, account) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson({ results: account, total: 0 },true,""));
  })
}

AccountModel.getById = (id, result) => {
  let sql = "select `id`,`role_code`,`email`,`last_name`,`first_name`,`avatar`,`address`,`phone_number`,`status`,role.name as `role_name`"
  +" from account,role where account.role_code=role.code and id=?";
  db.query(sql,[id], (err, account) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson(account.length !== 0 ? account[0] : {},true,""));
  })
}

AccountModel.getByUserId = (id, result) => {
  let sql = "select * from account where id=?";
  db.query(sql,[id], (err, account) => {
    if (err) {
      result(null);
      return;
    }
    result(account.length !== 0 ? account[0] : null);
  })
}

AccountModel.updateStatus = (account, result) => {
  db.query(`update account set status=? where id=?`,
  [account.status,account.id],
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: account.id }, true, ""));
  })
}

AccountModel.updateInfo = (account,result) => {
  db.query(`update account set last_name=?,first_name=?,address=?,avatar=?,phone_number=?,role_code=? where id=?`,
  [account?.last_name,account?.first_name,account?.address,account?.avatar,account?.phone_number,account.role_code,account.id],
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: account.id }, true, ""));
  })
}

AccountModel.updatePassword = (account,result) => {
  db.query(`update account set password=? where id=?`,
  [account.new_password,account.id],
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: account.id }, true, MESSAGE_SUCCESS.UPDATE_PASSWORD));
  })
}


module.exports = AccountModel;