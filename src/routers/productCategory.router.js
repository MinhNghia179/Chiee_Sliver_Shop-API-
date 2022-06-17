const express = require('express');
const Auth = require('../middleware/auth.middleware');
const ProductCategoryController = require('../controllers/productCategory.controller');

const router = express.Router();

router.get('/product-category', ProductCategoryController.getList);
router.get('/product-category/:id', ProductCategoryController.getById);
router.post('/product-category',Auth.isAuth, ProductCategoryController.create);
router.put('/product-category',Auth.isAuth, ProductCategoryController.update);
router.delete('/product-category/:id',Auth.isAuth, ProductCategoryController.delete);

module.exports = router;