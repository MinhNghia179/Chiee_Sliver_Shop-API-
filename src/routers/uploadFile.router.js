const express = require('express');
const Auth = require('../middleware/auth.middleware');
const uploadFileController = require('../controllers/uploadFile.controller');

const router = express.Router();

router.post('/upload',Auth.isAuth,uploadFileController.uploadFile);

module.exports = router;