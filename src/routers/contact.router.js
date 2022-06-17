const express = require('express');
const Auth = require('../middleware/auth.middleware');
const ContactController = require('../controllers/contact.controller');

const router = express.Router();

router.get('/contact',Auth.isAuth, ContactController.getAll);
router.post('/contact', ContactController.create);
router.put('/contact',Auth.isAuth, ContactController.update);
router.delete('/contact/:id',Auth.isAuth, ContactController.delete);

module.exports = router;