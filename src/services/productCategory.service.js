const ProductCategoryModel = require('../models/productCategory.model');

const ProductCategoryService = {
  getAll: result => ProductCategoryModel.getAll(result),
  getById: (id, result) => ProductCategoryModel.getById(id, result),
  create: (productCategory, result) => ProductCategoryModel.insert(productCategory, result),
  update: (productCategory, result) => ProductCategoryModel.update(productCategory, result),
  delete: (id, result) => ProductCategoryModel.delete(id, result),
}

module.exports = ProductCategoryService;