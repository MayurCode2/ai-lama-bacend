// src/routes/configRoutes.js
const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');
const authenticate = require('../middleware/authenticate');

// Create or Update Config
router.post('/update', authenticate, configController.update);

// Get Config
router.get('/get', authenticate, configController.get);

module.exports = router;
