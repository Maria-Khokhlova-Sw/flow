const db = require('../config/db');

exports.getChats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // SQL-запрос: получаем чаты с последним сообщением и статусом собеседника
    const query = `
      SELECT DISTINCT ON (m.chat_id)
        m.chat_id,
        CASE
          WHEN m.sender_id = $1 THEN
            CAST(SPLIT_PART(m.chat_id, '_', 2) AS INTEGER)
          ELSE
            CAST(SPLIT_PART(m.chat_id, '_', 1) AS INTEGER)
        END AS partner_id,
        u.email AS partner_email,
        u.status AS partner_status,
        m.content AS last_message,
        m.timestamp AS last_message_at
      FROM messages m
      JOIN users u ON u.id = (
        CASE
          WHEN m.sender_id = $1 THEN
            CAST(SPLIT_PART(m.chat_id, '_', 2) AS INTEGER)
          ELSE
            CAST(SPLIT_PART(m.chat_id, '_', 1) AS INTEGER)
        END
      )
      WHERE m.chat_id LIKE ($1 || '_%') OR m.chat_id LIKE ('%_' || $1)
        AND m.chat_id ~ '^[0-9]+_[0-9]+$'
      ORDER BY m.chat_id, m.timestamp DESC;
    `;

    const result = await db.query(query, [userId]);

    const chats = result.rows.map(row => ({
      chatId: row.chat_id,
      partner: {
        id: row.partner_id,
        email: row.partner_email,
        status: row.partner_status
      },
      lastMessage: row.last_message,
      lastMessageAt: row.last_message_at.toISOString()
    }));

    res.json(chats);
  } catch (err) {
    console.error('Ошибка получения чатов:', err);
    next(err);
  }
};