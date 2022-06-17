const AccountModel = require('../models/account.model');
var passwordHash = require('password-hash');
const { resultJson } = require('../utils');
const { MESSAGE_ERROR } = require('../constants/message');

const AccountService = {
  getAll: (param, result) => AccountModel.getAll(param,result),
  getById: (id, result) => AccountModel.getById(id, result),
  updateStatus: (account, result) => AccountModel.updateStatus(account, result),
  updateInfo: (account, result) => AccountModel.updateInfo(account, result),
  resetPassword: (account, result) => {
    account.new_password = passwordHash.generate(account?.password||"");
    AccountModel.updatePassword(account,result)
  },
  updatePassword: (account, result) => {
    try {
      AccountModel.getByUserId(account.id, async user => {
        console.log("minh", user.password)
        if (user === null) {
          result({
            message: MESSAGE_ERROR.ACCOUNT_NOT_EXIST
          });
        }
        else if (passwordHash.verify(account.password, user?.password)) {
          try {
            account.new_password = passwordHash.generate(account?.new_password||"");
            AccountModel.updatePassword(account, result)
          } catch (err) {
            result(resultJson(null,false,err.message));
          }
        } else {
          result(resultJson(null,false,MESSAGE_ERROR.OLD_PASSWORD_WRONG));
        }
      });
    } catch (error) {
      result({
        message: error.message
      });
    }
  }
}

module.exports = AccountService;