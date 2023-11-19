// src/models/Project.js
const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  name: String,
  description: String,
  dateTime: {
    type: Date,
    default: Date.now,
  },
  status: Boolean,
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  episodes: [episodeSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
