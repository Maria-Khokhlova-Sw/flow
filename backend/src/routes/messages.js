const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const messageController = require('../controllers/messageController');

router.use(authMiddleware); // защищаем все маршруты

router.post('/', messageController.sendMessage);
router.get('/:chatId', messageController.getMessages);

module.exports = router;