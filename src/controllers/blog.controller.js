const BlogService = require('../services/blog.service');

exports.getList = (req, res) => {
  const param = req.query;
  BlogService.getAll(param,result => {
    res.send(result);
  });
}

exports.getById = (req, res) => {
  const id = req.params.id;
  BlogService.getById(id, result => {
    res.json(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  BlogService.create(data, result => {
    res.json(result);
  });
}

exports.update = (req, res) => {
  const data = req.body;
  BlogService.update(data, result => {
    res.json(result);
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  BlogService.delete(id, result => {
    res.json(result);
  });
}

exports.duplicate = (req, res) => {
  const data = req.body;
  BlogService.duplicate(data.id, result => {
    res.json(result);
  });
}
