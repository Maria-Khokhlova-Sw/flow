// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const db = require('./config/db');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080'
  ]
}));
app.use(morgan('dev'));
app.use(express.json());

// Подключение к БД
db.connect();

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Обработка 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Общий обработчик ошибок
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: { message: err.message } });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  require('./services/socketService').init(server);
});