const ProductService = require('../services/product.service');

exports.getList = (req, res) => {
  const param = req.query;
  ProductService.getAll(param,result => {
    res.send(result);
  });
}

exports.getById = (req, res) => {
  const id = req.params.id;
  ProductService.getById(id, result => {
    res.json(result);
  });
}

exports.getAllBestSellingProduct = (req, res) => {
  ProductService.getAllBestSellingProduct(result => {
    res.json(result);
  });
}

exports.getAllNewProduct = (req, res) => {
  ProductService.getAllNewProduct(result => {
    res.json(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  ProductService.create(data, result => {
    res.json(result);
  });
}

exports.update = (req, res) => {
  const data = req.body;
  ProductService.update(data, result => {
    res.json(result);
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  ProductService.delete(id, result => {
    res.json(result);
  });
}

exports.duplicate = (req, res) => {
  const data = req.body;
  ProductService.duplicate(data.id, result => {
    res.json(result);
  });
}
