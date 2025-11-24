// socketService.js
const jwt = require('jsonwebtoken'); // ← ЭТА СТРОКА ОБЯЗАТЕЛЬНА!

let io;

exports.init = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:8000',
        'http://localhost:8000',
        'http://127.0.0.1:8080',
        'http://localhost:8080'
      ],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Middleware: проверка JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Invalid token'));
      socket.userId = decoded.userId;
      next();
    });
  });

  // Обработка подключений
  io.on('connection', (socket) => {
    console.log(`🟢 Пользователь ${socket.userId} подключился к WebSocket`);
    socket.join(`user_${socket.userId}`);

    socket.on('private_message', async (data) => {
      const { to, content, timestamp } = data;

      if (!to || !content || !timestamp) {
        return socket.emit('error', { message: 'Missing required fields' });
      }

      try {
        // TODO: сохранить сообщение в БД
        io.to(`user_${to}`).emit('new_message', {
          from: socket.userId,
          content,
          timestamp
        });

        socket.emit('message_sent', { to, timestamp });
      } catch (err) {
        socket.emit('error', { message: 'Failed to send message' });
        console.error('❌ Ошибка отправки сообщения:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔴 Пользователь ${socket.userId} отключился`);
    });
  });
};

exports.getIO = () => io;