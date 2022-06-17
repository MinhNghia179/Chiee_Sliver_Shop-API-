const AccountService = require('../services/account.service');

exports.getList = (req, res) => {
  const param = req.query;
  AccountService.getAll(param,result => {
    res.send(result);
  });
}

exports.getById = (req, res) => {
  const id = req.params.id;
  AccountService.getById(id,result => {
    res.send(result);
  });
}

exports.updateStatus = (req, res) => {
  const account = req.body;
  AccountService.updateStatus(account,result => {
    res.send(result);
  });
}

exports.updateInfo = (req, res) => {
  const account = req.body;
  AccountService.updateInfo(account,result => {
    res.send(result);
  });
}

exports.updatePassword = (req, res) => {
  const account = req.body;
  AccountService.updatePassword(account,result => {
    res.send(result);
  });
}

exports.resetPassword = (req, res) => {
  const account = req.body;
  AccountService.resetPassword(account,result => {
    res.send(result);
  });
}