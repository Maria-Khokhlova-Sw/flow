const Message = require('../models/Message');
const { getIO } = require('../services/socketService');

// Вспомогательная функция: получить или создать чат между двумя пользователями
async function getOrCreateDirectChat(user1Id, user2Id) {
  const db = require('../config/db');

  const minId = Math.min(user1Id, user2Id);
  const maxId = Math.max(user1Id, user2Id);
  const chatId = `${minId}_${maxId}`;

  // Попытка найти существующий чат
  let result = await db.query(
    'SELECT id FROM chats WHERE id = $1',
    [chatId]
  );

  if (result.rows.length > 0) {
    return result.rows[0].id;
  }

  // Создаём чат
  await db.query(
    'INSERT INTO chats (id, type) VALUES ($1, $2)',
    [chatId, 'direct']
  );

  // Добавляем участников
  await db.query(
    'INSERT INTO chat_participants (chat_id, user_id) VALUES ($1, $2), ($1, $3)',
    [chatId, user1Id, user2Id]
  );

  return chatId;
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