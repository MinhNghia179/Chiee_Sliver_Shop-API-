const mysql = require('mysql');

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mt_shop'
});

connect.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = connect;