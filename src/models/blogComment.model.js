const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');

const BlogCommentModel = function (blog) {
  this.id = blog.id,
    this.user_id = blog.user_id,
    this.blog_id = blog.blog_id,
    this.content = blog.content,
    this.created_at = blog.created_at,
    this.modified_at = blog.modified_at,
    this.status = blog.status
}
BlogCommentModel.count = (param, result) => {
  const { user_id, status = -1 } = param;
  let sql = "select count(*) as total from `comment` WHERE user_id=? ";
  if (status != -1) {
    sql += " AND status=" + status;
  }

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

BlogCommentModel.countByBlogId = (param, result) => {
  const { blog_id,status = -1  } = param;
  let sql = "select count(*) as total from `comment` WHERE blog_id=? ";

  if(Number(status) !== -1){
    sql+=' and comment.status='+status;
  }

  db.query(sql, [blog_id], (err, data) => {
    if (err) {
      result(0)
      return;
    }
    result(data[0].total);
  })
}

BlogCommentModel.getListByUserId = (param, result) => {
  const { user_id, page, pageSize, status = -1, order_by } = param;
  const currentPage = Number(page);
  const limit = Number(pageSize);
  const offset = currentPage + currentPage === 0 ? 0 : limit;
  let sql = "SELECT * FROM `comment` WHERE  user_id=? ";

  if (status != -1) {
    sql += " AND status=" + status;
  }

  sql += " ORDER BY " + (order_by ? order_by : "id DESC") + " LIMIT ? OFFSET ?"

  db.query(sql, [user_id, limit, offset],
    (err, blog) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      BlogCommentModel.count(param, total => {
        const totalPage = Math.ceil(Number(total) / limit);
        result(resultJson({
          results: blog,
          total: total,
          currentPage: currentPage,
          totalPage: totalPage
        }, true, ""))
      });
    })
}

BlogCommentModel.getAllByBlogId = (param, result) => {
  const { blog_id, status = -1 } = param;
  let sql = "SELECT comment.*, account.first_name as user_first_name, account.last_name as user_last_name, account.avatar as user_avatar "
  +" FROM `comment`, `account` where comment.user_id = account.id and comment.blog_id=? ";
  if(Number(status) !== -1){
    sql+='and comment.status='+status;
  }
  sql+=" ORDER BY comment.created_at DESC"

  db.query(sql, [blog_id],
    (err, rows) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      BlogCommentModel.countByBlogId(param, total => {
        result(resultJson({
          results: rows,
          total: total,
        }, true, ""))
      });
    })
}

BlogCommentModel.insert = (comment, result) => {
  const created_at = new Date();
  let sql = "insert into comment (user_id,blog_id,content,created_at,status) values (?,?,?,?,?)";
  db.query(sql, [comment.user_id, comment.blog_id, comment.content, created_at, true],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: data.insertId }, true, ""));
    });
}

BlogCommentModel.update = (comment, result) => {
  const modified_at = new Date();
  let sql = "update comment set modified_at=?, content=? where id=?";
  db.query(sql, [ modified_at, comment.content, comment.id],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: comment.id }, true, ""));
    })
}

BlogCommentModel.updateStatus = (comment, result) => {
  let sql = "update comment set status=? where id=?";
  db.query(sql, [ comment.status, comment.id],
    (err, data) => {
      if (err) {
        result(resultJson(null, false, err.message));
        return;
      }
      result(resultJson({ id: comment.id }, true, ""));
    })
}

BlogCommentModel.delete = (id, result) => {
  db.query(`delete from comment where id=${id}`, (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: id }, true, ""));
  })
}

BlogCommentModel.getListByBlogId = (id) => {
  return new Promise((res, rej) => {
    db.query("SELECT * FROM `comment` WHERE  blog_id=?", [id], (err, rows) => {
      if (err) {
        res([]);
      }
      res(rows)
    })
  })

}

module.exports = BlogCommentModel;