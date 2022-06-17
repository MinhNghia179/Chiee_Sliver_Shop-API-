const db = require('../configs/connect.mysql');
const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../constants/message');
const { resultJson } = require('../utils');

const AccountModel = function (account) {
  this.id           = account.id;
  this.role_code    = account.role_code;
  this.email        = account.email;
  this.password     = account.password;
  this.last_name    = account.last_name;
  this.first_name   = account.first_name;
  this.avatar       = account.avatar;
  this.phone_number = account.phone_number;
  this.address      = account.address;
  this.status       = account.status;
}

AccountModel.login = (email,result) => {
  const sql = 'select * from Account where email=? and status=1';
  db.query(sql, email, (error, users) => {
    if (error) {
      throw error;
    }
    result(users.length !== 0 ? { ...users[0] } : null);
  })
}

AccountModel.checkEmailExist = (email,result)=>{
  const sql = "select count(*) as total from account where email=?"
  db.query(sql, [email],
  (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

AccountModel.register = (account, result) => {
  const sql = "insert into account (role_code,email,password,first_name,last_name,avatar,address,phone_number,status) values (?,?,?,?,?,?,?,?,?)";
  
  AccountModel.checkEmailExist(account.email,(total)=>{
    if(total === 0){
      db.query(sql,[account.role_code,account.email,account.password,account?.first_name,account?.last_name,account?.avatar,account?.address,account?.phone_number,true], 
      (err, data) => {
        if (err) {
          result(resultJson(null, false, MESSAGE_ERROR.REGISTER));
          return;
        }
        result(resultJson(null, true, MESSAGE_SUCCESS.REGISTER))
      })
    }else{
      result(resultJson(null, false, MESSAGE_ERROR.EMAIL_EXIST));
    }
  })
  
}

AccountModel.forgotPassword = (email,result) => {
  const sql = 'select * from Account where email=? and status=1';
  db.query(sql, email, (error, users) => {
    if (error) {
      result(resultJson(null, false, error.message));
    }
    result(resultJson(users.length !== 0 ? { ...users[0] } : null, true, ""));
  })
}

AccountModel.resetPassword = (data,result) => {
  const sql = 'update account set password=? where id=?';
  db.query(sql, [data.password,data.id], (error, rows) => {
    if (error) {
      result(resultJson(null, false, error.message));
    }
    result(resultJson(null, true, ""));
  })
}

module.exports = AccountModel;