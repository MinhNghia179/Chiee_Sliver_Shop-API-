const db = require('../configs/connect.mysql');
const { resultJson } = require('../utils');
const { sendEmailContact } = require('../utils/sendEmail');

const ContactModel = function (contact) {
  this.id          = contact.id,
  this.name        = contact.name,
  this.email       = contact.email,
  this.subject     = contact.subject,
  this.message     = contact.message,
  this.created_at  = contact.created_at,
  this.status      = contact.status
}

ContactModel.getAll = (result) => {
  let sql = "select * from `contact` order by created_at desc"
  db.query(sql,
  (err, rows) => {
    if (err) {
      result(resultJson(null, false, err.message))
      return;
    }
    result(resultJson({ results: rows, total: rows.length }, true, ""));
  })
}

ContactModel.create = (contact,result) =>  {
  const created_at = new Date();
  db.query('insert into `contact` (name,email,subject,message,created_at,status) values (?,?,?,?,?,?)',
  [contact.name,contact.email,contact.subject,contact.message,created_at,false], 
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    sendEmailContact(contact.email);
    result(resultJson({ id: data.insertId }, true, ""));
  })
}

ContactModel.updateStatus = (contact,result) =>  {
  const { id } = contact;
  const sql = 'update `contact` set status=1 where id='+id;
  db.query(sql, 
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: id }, true, ""));
  })
}

ContactModel.delete = (id,result) =>  {
  const sql = 'delete from `contact` where id='+id;
  db.query(sql, 
  (err, data) => {
    if (err) {
      result(resultJson(null, false, err.message));
      return;
    }
    result(resultJson({ id: id }, true, ""));
  })
}

module.exports = ContactModel;