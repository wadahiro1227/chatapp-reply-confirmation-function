const mysql = require('mysql2');

// .envファイルから環境変数を取得(process.env.定義名)
require('dotenv').config();

// データベース接続の設定
const connection = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error("設定値:", process.env);
    console.error("データベース接続エラー:", err);
    return;
  }
  console.info("データベース接続成功");
});

connection.on("error", (err) => {
  console.error(err);
});


module.exports = connection;