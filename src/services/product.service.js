const ProductModel = require('../models/product.model');

const ProductService = {
  getAll: (param, result) => ProductModel.getAll(param, result),
  getById: (id, result) => ProductModel.getById(id, result),
  getAllBestSellingProduct: (result) =>
    ProductModel.getAllBestSellingProduct(result),
  getAllNewProduct: (result) => ProductModel.getAllNewProduct(result),
  create: (product, result) => ProductModel.insert(product, result),
  update: (product, result) => ProductModel.update(product, result),
  delete: (id, result) => ProductModel.delete(id, result),
  duplicate: (id, result) => ProductModel.duplicate(id, result),
};

module.exports = ProductService;
