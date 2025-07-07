const db = require("../models");
const { User, Profile } = db;

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body, { include: ["profile"] });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: ["profile", "posts"] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
