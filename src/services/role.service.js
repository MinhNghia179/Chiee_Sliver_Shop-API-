const RoleModel = require('../models/role.model');

const RoleService = {
  getAll: result => RoleModel.getAll(result),
}

module.exports = RoleService;