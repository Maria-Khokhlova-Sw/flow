const db = require('../config/db');

class Message {
  constructor(chatId, senderId, content) {
    this.chatId = chatId;
    this.senderId = senderId;
    this.content = content;
  }

  static async create(message) {
    const query = `
      INSERT INTO messages (chat_id, sender_id, content, timestamp)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, chat_id, sender_id, content, timestamp
    `;
    const values = [message.chatId, message.senderId, message.content];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByChat(chatId, limit = 50) {
    const query = `
      SELECT m.id, m.sender_id, m.content, m.timestamp, u.email as sender_email
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.chat_id = $1
      ORDER BY m.timestamp DESC
      LIMIT $2
    `;
    const result = await db.query(query, [chatId, limit]);
    return result.rows.reverse(); // от старых к новым
  }
}

module.exports = Message;