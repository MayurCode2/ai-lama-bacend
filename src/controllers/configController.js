// src/controllers/configController.js
const Config = require('../models/Config');

const update = async (req, res) => {
  const { general, display } = req.body;
  const userId = req.user.id;

  try {
    let config = await Config.findOne({ userId });

    if (!config) {
      config = new Config({
        general,
        display,
        userId,
      });
    } else {
      config.general = general;
      config.display = display;
    }

    await config.save();

    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const get = async (req, res) => {
  const userId = req.user.id;

  try {
    const config = await Config.findOne({ userId });

    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }

    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  update,
  get,
};
