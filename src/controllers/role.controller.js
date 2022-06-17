const RoleService = require('../services/role.service');

exports.getList = (req, res) => {
  RoleService.getAll(result => {
    res.send(result);
  });
}
