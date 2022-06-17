const BlogCommentService = require('../services/blogComment.service');

exports.getListByUserId = (req, res) => {
  const param = req.query;
  BlogCommentService.getAllByUserId(param,result => {
    res.send(result);
  });
}

exports.getListByBlogId = (req, res) => {
  const param = req.query;
  BlogCommentService.getAllByBlogId(param,result => {
    res.send(result);
  });
}

exports.create = (req, res) => {
  const data = req.body;
  BlogCommentService.create(data, result => {
    res.json(result);
  });
}

exports.update = (req, res) => {
  const data = req.body;
  BlogCommentService.update(data, result => {
    res.json(result);
  });
}


exports.updateStatus = (req, res) => {
  const data = req.body;
  BlogCommentService.updateStatus(data, result => {
    res.json(result);
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  BlogCommentService.delete(id, result => {
    res.json(result);
  });
}
