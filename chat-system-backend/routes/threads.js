var express = require('express');
var db = require('../utils/db'); // データベース接続の設定をインポート
const bodyParser = require('body-parser');

require('dotenv').config();

var app = express();
// json形式できたパラメータを変換
app.use(express.json());

app.post('/api/threads', function(req, res, next) {
    try {
      var sql = `INSERT INTO THREAD(parent_message_id) VALUES (?);`;
  
      db.query(sql, 
        [req.body.parent_message_id],
        (err, result) => {
          // エラーが発生した場合は、catch (error)の処理に流す
          if (err) {
            throw new Error(err);
          }
  
        return res.status(200).json({
            result_code: 1,
            message: "スレッドが追加されました。"
        });
      });
    } catch (error) {
      // 次の処理へ
      next(error);
    }
  });
  module.exports = app;