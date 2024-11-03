var express = require('express');
var db = require('../utils/db'); // データベース接続の設定をインポート

require('dotenv').config();

var app = express();

// 全ルーム情報の取得
app.get('/api/rooms', function(req, res, next) {
    var sql = 'SELECT * FROM room_master';
    db.query(sql, function(err, results) {
      if (err) return next(err);
      res.status(200).json(results);
    });
  });
  
// 特定ルーム情報の取得
app.get('/api/rooms/:roomId', function(req, res, next) {
    var sql = 'SELECT * FROM room_master WHERE room_id = ?';
    db.query(sql, [req.params.roomId], function(err, results) {
        if (err) return next(err);
        res.status(200).json(results[0] || {}); // 該当がなければ空オブジェクト
    });
  });

  app.post('/api/rooms', function(req, res, next) {
    try {
      var sql = `INSERT INTO ROOM_MASTER(ROOM_NAME) VALUES (?);`;
  
      db.query(sql, 
        [req.body.room_name],
        (err, result) => {
          // エラーが発生した場合は、catch (error)の処理に流す
          if (err) {
            throw new Error(err);
          }
  
        return res.status(200).json({
            result_code: 1,
            message: "ルームが作成されました。"
        });
      });
    } catch (error) {
      // 次の処理へ
      next(error);
    }
  });
  
  module.exports = app;