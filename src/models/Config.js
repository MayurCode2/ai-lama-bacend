// src/models/Config.js
const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
  chatboatName: String,
  welcomeMessage: String,
  inputPlaceholder: String,
});

const displaySchema = new mongoose.Schema({
  primaryColor: String,
  fontColor: String,
  fontSize: String,
  chatHeight: String,
  chatIconSize: String,
  positionOnScreen: String,
  distanceFromBottom: String,
  horizontalDistance: String,
});

const configSchema = new mongoose.Schema({
  general: generalSchema,
  display: displaySchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
