const express = require('express');
const Auth = require('../middleware/auth.middleware');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

router.get('/product', ProductController.getList);
router.get('/product/:id', ProductController.getById);
router.get('/product-best-selling', ProductController.getAllBestSellingProduct);
router.get('/product-new', ProductController.getAllNewProduct);
router.post('/product',Auth.isAuth, ProductController.create);
router.put('/product',Auth.isAuth, ProductController.update);
router.delete('/product/:id',Auth.isAuth, ProductController.delete);
router.post('/product/duplicate',Auth.isAuth, ProductController.duplicate);

module.exports = router;