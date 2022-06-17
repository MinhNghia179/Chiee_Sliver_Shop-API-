
const AuthService = require('../services/auth.service');
const JWT = require('../configs/jwt');
const { URL_USER } = require('../constants');
const { sendEmailForgotPassword } = require('../utils/sendEmail');

exports.login = (req, res) => {
  const user = req.body;
  AuthService.login(user, result => {
    res.send(result);
  })
};

exports.register = (req, res) => {
  const user = req.body;
  AuthService.register(user, result => {
    res.send(result);
  })
}

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  AuthService.forgotPassword(email,async result => {
    try{
      const time = '3m';
      const token = await JWT.make(result.data,time);
      let url = `${URL_USER}/reset-password/${token}_${result.data.id}`;
      sendEmailForgotPassword(email,url)
      res.send({status:true,message:''});
    }catch(error){
      res.send({status:false,message:error.message});
    }
  })
}

exports.resetPassword = (req, res) => {
  const data = req.body;
  AuthService.resetPassword(data, result => {
    res.send(result);
  })
}
exports.checkTokenResetPassword = (req, res) => {
  const { token } = req.body;
  JWT.check(token).then(data => {
    res.send({status:true,message:''});
  }).catch(error => {
    res.send({status:false,message:error.message});
  })
}


