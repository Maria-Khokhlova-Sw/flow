const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

router.use(authMiddleware);
router.get('/', chatController.getChats);

module.exports = router;