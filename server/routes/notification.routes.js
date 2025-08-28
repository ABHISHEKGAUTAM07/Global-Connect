const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createNotification,
  getUserNotifications,
  markAsRead
} = require('../controllers/notification.controller');

// Create
router.post('/', auth, createNotification);

// Get all for user
router.get('/', auth, getUserNotifications);

// Mark read
router.put('/:id/read', auth, markAsRead);

module.exports = router;
