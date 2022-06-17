const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');
const BlogCommentModel = require('./blogComment.model');

const BlogModel = function (blog) {
  this.id                = blog.id,
  this.name              = blog.name,
  this.thumbnail         = blog.thumbnail,
  this.short_description = blog.short_description,
  this.content           = blog.content,
  this.created_at        = blog.created_at,
  this.created_by        = blog.created_by,
  this.modified_at       = blog.modified_at,
  this.modified_by       = blog.modified_by,
  this.status            = blog.status,
  this.comments          = blog.comments
}

BlogModel.count = (query,status,result) => {
  let sql = "select count(*) as total from blog WHERE name  LIKE '%"+(query ? query : "")+"%' ";
  if(status != -1){
    sql += " AND status="+status;
  }

  db.query(sql, (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

BlogModel.getAll = (param, result) => {
  const {page,pageSize,query,status = -1,order_by} = param;
  const currentPage = Number(page);
  const limit = Number(pageSize);
  const offset = currentPage + currentPage === 0 ? 0 : limit;
  let sql = "SELECT * FROM blog WHERE name LIKE '%"+(query ? query : "")+"%' ";

  if(status != -1){
    sql += " AND status="+status;
  }
  
  sql += " ORDER BY "+(order_by ? order_by : "id DESC")+" LIMIT ? OFFSET ?"

  db.query(sql, [limit,offset], 
  (err, blog) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    BlogModel.count(query,status,total => {
      const totalPage = Math.ceil(Number(total)/limit);
      result(resultJson({
        results: blog,
        total: total,
        currentPage:currentPage,
        totalPage:totalPage
      }, true, ""))
    });
  })
}

BlogModel.getById = (id, result) => {
  db.query(`select * from blog where id=${id}`, (err, blog) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }

    let dataResult = blog.length !== 0 ? blog[0] : {};

    BlogCommentModel.getListByBlogId(dataResult?.id || 0).then(value => {
      dataResult.comments = value;
      result(resultJson(dataResult, true, ""))
    })
  })
}

BlogModel.insert = (blog, result) => {
  const created_at = new Date();
  let sql = "insert into blog (name,thumbnail,short_description,content,created_at,created_by,status) "+
  " values (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql,[blog.name,blog.thumbnail,blog.short_description,blog.content,created_at,blog.created_by,blog.status], 
    (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: data.insertId }, true, ""));
  })
}

BlogModel.update = (blog, result) => {
  const modified_at = new Date();
  let sql = "update blog set name=?, thumbnail=?, short_description=?, content=?, modified_at=?, modified_by=?, status=? where id=?";
  db.query(sql,[blog.name,blog.thumbnail,blog.short_description,blog.content,modified_at,blog.modified_by,blog.status,blog.id],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: blog.id }, true, ""));
    })
}

BlogModel.delete = (id, result) => {
  db.query(`delete from blog where id=${id}`, (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: id }, true, ""));
  })
}

BlogModel.duplicate = (id, result) => {
  db.query(`select * from blog where id=${id}`, (err, blog) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    if(blog.length !== 0){
      BlogModel.insert( blog[0],result)
    }else{
      result(resultJson(null, false, err.message));
    }
  })
}

module.exports = BlogModel;