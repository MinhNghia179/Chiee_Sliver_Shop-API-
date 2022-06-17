const JWT = require('../configs/jwt');
const { MESSAGE_ERROR } = require('../constants/message');
const { resultJson } = require('../utils');

const isAuth = async (req, res, next) => {
  const _token = (req.headers.authorization || '').replace("Bearer ","");
  if (_token) {
    try {
      const authData = await JWT.check(_token);
      req.auth = authData;
      next();
    } catch (err) {
      return res.send(resultJson(null, false, err.message));
    }
  } else {
    return res.send(resultJson(null, false, MESSAGE_ERROR.NOT_LOGIN));
  }
}

module.exports = { isAuth: isAuth };