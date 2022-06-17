const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');

router.post('/login', Auth.login);
router.post('/register', Auth.register);
router.post('/forgot-password', Auth.forgotPassword);
router.post('/reset-password', Auth.resetPassword);
router.post('/check-token-reset-password', Auth.checkTokenResetPassword);

module.exports = router;