const ProductReviewModel = require('../models/productReview.model');

const ProductReviewService = {
  getAll: (param,result) => ProductReviewModel.getList(param,result),
  createReview: (data,result) => ProductReviewModel.createReview(data,result),
  updateStatus:(data,result) => ProductReviewModel.updateStatus(data,result)
}

module.exports = ProductReviewService;