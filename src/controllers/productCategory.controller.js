const ProductCategoryService = require('../services/productCategory.service');

exports.getList = (req, res) => {
  ProductCategoryService.getAll(result => {
    res.send(result);
  });
}

exports.getById = (req, res) => {
  const id = req.params.id;
  ProductCategoryService.getById(id, result => {
    res.json(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  ProductCategoryService.create(data, result => {
    res.json(result);
  });
}

exports.update = (req, res) => {
  const data = req.body;
  ProductCategoryService.update(data, result => {
    res.json(result);
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  ProductCategoryService.delete(id, result => {
    res.json(result);
  });
}
