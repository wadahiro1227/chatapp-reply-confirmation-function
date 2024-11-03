var express = require('express');
var db = require('../utils/db'); // データベース接続の設定をインポート
const bodyParser = require('body-parser');

require('dotenv').config();

var app = express();
// json形式できたパラメータを変換
app.use(express.json());

/**
 * メッセージ登録API
 * 
 * フロントで下記のように記載して呼び出し (ユーザID:1 → ユーザID:2 に送信したメッセージを登録)
 * ※ src\components\Chat.tsx の handleSend を参照
 * const response = await fetch('http://localhost:3001/api/messages', {
 *     method: 'POST',
 *     headers: {
 *         'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify({
 *         sendUserId: 1, // 送信元ユーザID
 *         toUserId: 2,   // 送信先ユーザID
 *         messages: '送信されたメッセージ',
 *     }),
 * });
 */
app.post('/api/messages', function(req, res, next) {
  try {
    var sql = `INSERT INTO MESSAGES(BODY, ROOM_ID, TO_USER_ID, SEND_USER_ID, THREAD_ID, SEEN, IS_SENT, SEND_TIME)
     VALUES (?, ?, ?, ?, ?, false, false, CURRENT_TIMESTAMP);`;
    // フロントエンドの "messages" プロパティを使うように変更
    const {messages, room_id, to_user_id, send_user_id, thread_id } = req.body;

    // BODYの値が空でないことを確認
    if (!messages || messages.trim() === "") {
      return res.status(400).json({
        result_code: 0,
        message: "メッセージ本文が空です。"
      });
    }
    db.query(sql, 
      [messages, room_id, to_user_id, send_user_id, thread_id],
      (err, result) => {
        // エラーが発生した場合は、catch (error)の処理に流す
        if (err) {
          throw new Error(err);
        }

      return res.status(200).json({
          result_code: 1,
          message: "message saved successfully"
      });
    });
  } catch (error) {
    // 次の処理へ
    next(error);
  }
});

module.exports = app;
