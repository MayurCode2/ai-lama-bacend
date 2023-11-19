// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticate = require('../middleware/authenticate');

// Create Project with Title
router.post('/create', authenticate, projectController.create);

// Add Episode to Project
router.post('/addEpisode/:projectId', authenticate, projectController.addEpisode);

// Update Project
router.put('/update/:projectId', authenticate, projectController.update);

// Delete Project
router.delete('/delete/:projectId', authenticate, projectController.delete);

// Get All Episodes for a Project
router.get('/getAllEpisodes/:projectId', authenticate, projectController.getAllEpisodes);

// Get All Projects
router.get('/getAllProjects', authenticate, projectController.getAllProjects);

// Delete Episode from Project
router.delete('/deleteEpisode/:projectId/:episodeId', authenticate, projectController.deleteEpisode);

module.exports = router;
