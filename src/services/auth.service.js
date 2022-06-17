const JWT = require('../configs/jwt');
const AuthModel = require('../models/auth.model');
var passwordHash = require('password-hash');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../constants/message');

const AuthService = {
  forgotPassword: (email, result) => AuthModel.forgotPassword(email, result),
  resetPassword: (data, result) => {
    data.password = passwordHash.generate(data?.password || "");
    AuthModel.resetPassword(data, result)
  },
  register: (account, result) => {
    account.password = passwordHash.generate(account?.password);
    AuthModel.register(account, result)
  },
  login: (account, result) => {
    try {
      AuthModel.login(account.email, async user => {
        if (user === null) {
          result({
            message: MESSAGE_ERROR.ACCOUNT_NOT_EXIST
          });
        }
        else if (passwordHash.verify(account.password, user?.password)) {
          try {
            const token = await JWT.make(account);
            result({
              user: {
                ...user,
                password: null
              },
              message: MESSAGE_SUCCESS.LOGIN_SUCCESS,
              access_token: token
            });
          } catch (err) {
            result({
              message: err.message
            });
          }
        } else {
          result({
            message: MESSAGE_ERROR.WRONG_PASSWORD
          });
        }
      });
    } catch (error) {
      result({
        message: error.message
      });
    }
  }
}

module.exports = AuthService;