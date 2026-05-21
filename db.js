const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "sistema_estoque",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();
