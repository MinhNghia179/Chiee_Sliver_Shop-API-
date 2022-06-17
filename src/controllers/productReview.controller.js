const ProductReviewService = require('../services/productReview.service');

exports.getList = (req, res) => {
  const param = req.query;
  ProductReviewService.getAll(param,result => {
    res.send(result);
  });
}

exports.createReview = (req,res) => {
  const data = req.body;
  ProductReviewService.createReview(data, result => {
    res.json(result);
  });
}

exports.updateStatus = (req,res) => {
  const data = req.body;
  ProductReviewService.updateStatus(data, result => {
    res.json(result);
  });
}
