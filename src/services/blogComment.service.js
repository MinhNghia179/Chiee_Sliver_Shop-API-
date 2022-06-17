const BlogCommentModel = require('../models/blogComment.model');

const BlogCommentService = {
  getAllByUserId  : (param,result) => BlogCommentModel.getListByUserId(param,result),
  getAllByBlogId  : (param,result) => BlogCommentModel.getAllByBlogId(param,result),
  create          : (comment, result) => BlogCommentModel.insert(comment, result),
  update          : (comment, result) => BlogCommentModel.update(comment, result),
  updateStatus    : (comment, result) => BlogCommentModel.updateStatus(comment, result),
  delete          : (id, result) => BlogCommentModel.delete(id, result),
}

module.exports = BlogCommentService;