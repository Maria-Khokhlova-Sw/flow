const Message = require('../models/Message');
const { getIO } = require('../services/socketService');

// Вспомогательная функция: получить или создать чат между двумя пользователями
async function getOrCreateDirectChat(user1Id, user2Id) {
  const db = require('../config/db');
  
  // Упорядочиваем ID, чтобы чат был один и тот же: (1,2) = (2,1)
  const [minId, maxId] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id];
  const chatIdKey = `${minId}_${maxId}`;

  // Проверяем, есть ли уже такой чат
  let chat = await db.query(
    `SELECT id FROM chats WHERE type = 'direct' AND id::text = $1`,
    [chatIdKey]
  );

  if (chat.rows.length === 0) {
    // Создаём чат с ID = "min_max"
    const res = await db.query(
      `INSERT INTO chats (id, type) VALUES ($1::text::integer, 'direct') RETURNING id`,
      [chatIdKey]
    );
    // Добавляем участников
    await db.query(
      `INSERT INTO chat_participants (chat_id, user_id) VALUES ($1, $2), ($1, $3)`,
      [res.rows[0].id, user1Id, user2Id]
    );
    return res.rows[0].id;
  }

  return chat.rows[0].id;
}

exports.sendMessage = async (req, res, next) => {
  try {
    const { to, content } = req.body;
    const senderId = req.user.id; // ← будет установлен middleware

    if (!to || !content) {
      return res.status(400).json({ error: 'Получатель и сообщение обязательны' });
    }

    // Получаем или создаём чат
    const chatId = await getOrCreateDirectChat(senderId, to);

    // Сохраняем сообщение
    const message = await Message.create({
      chatId,
      senderId,
      content
    });

    // Отправляем через WebSocket
    const io = getIO();
    if (io) {
      io.to(`user_${to}`).emit('new_message', {
        id: message.id,
        chatId,
        from: senderId,
        content: message.content,
        timestamp: message.timestamp.toISOString()
      });
    }

    res.status(201).json({
      id: message.id,
      chatId,
      from: senderId,
      content: message.content,
      timestamp: message.timestamp.toISOString()
    });
  } catch (err) {
    console.error('Ошибка отправки сообщения:', err);
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.findByChat(chatId, 100);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};