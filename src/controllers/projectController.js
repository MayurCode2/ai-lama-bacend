// src/controllers/projectController.js
const Project = require('../models/Project');

const create = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const project = new Project({
      title,
      userId,
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addEpisode = async (req, res) => {
  const { name, description, status } = req.body;
  const userId = req.user.id;
  const projectId = req.params.projectId;

  try {
    let project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const episode = {
      name,
      description,
      status,
    };

    project.episodes.push(episode);
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const update = async (req, res) => {
  const { title, episodes } = req.body;
  const userId = req.user.id;
  const projectId = req.params.projectId;

  try {
    let project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title;
    project.episodes = episodes;
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;

  try {
    let project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllEpisodes = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;

  try {
    let project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const episodes = project.episodes;
    res.json(episodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllProjects = async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteEpisode = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;
  const episodeId = req.params.episodeId;

  try {
    let project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.episodes = project.episodes.filter((episode) => episode._id.toString() !== episodeId);
    await project.save();

    res.json({ message: 'Episode deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  create,
  addEpisode,
  update,
  delete: deleteProject,
  getAllEpisodes,
  getAllProjects,
  deleteEpisode,
};
