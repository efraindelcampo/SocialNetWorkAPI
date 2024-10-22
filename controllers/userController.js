const { User, Thought } = require('../models');

const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // Create a new user
  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
