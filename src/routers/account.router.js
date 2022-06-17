const express = require('express');
const Auth = require('../middleware/auth.middleware');
const AccountController = require('../controllers/account.controller');

const router = express.Router();

router.get('/accounts',Auth.isAuth, AccountController.getList);
router.get('/accounts/:id',Auth.isAuth, AccountController.getById);
router.put('/accounts/update-status',Auth.isAuth, AccountController.updateStatus);
router.put('/accounts/update-info',Auth.isAuth, AccountController.updateInfo);
router.put('/accounts/update-password',Auth.isAuth, AccountController.updatePassword);
router.put('/accounts/reset-password',Auth.isAuth, AccountController.resetPassword);

module.exports = router;