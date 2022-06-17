const BlogModel = require('../models/blog.model');

const BlogService = {
  getAll: (param,result) => BlogModel.getAll(param,result),
  getById: (id, result) => BlogModel.getById(id, result),
  create: (blog, result) => BlogModel.insert(blog, result),
  update: (blog, result) => BlogModel.update(blog, result),
  delete: (id, result) => BlogModel.delete(id, result),
  duplicate: (id, result) => BlogModel.duplicate(id, result),
}

module.exports = BlogService;