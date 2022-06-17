const express = require('express');
const RoleController = require('../controllers/role.controller');

const router = express.Router();

router.get('/roles', RoleController.getList);

module.exports = router;