const { User, Thought } = require("../models");

const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
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

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId })
        // .select method to 'remove' Mongoose version number
        // .populate method to 'populate' thoughts and friends array
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!users) {
        return res.status(404).json({ message: "No user found with that ID!" });
      }

      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Find a user by ID and update them
  async updateUser(req, res) {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!users) {
        return res.status(404).json({ message: "No user found with that ID!" });
      }
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user by their ID AND BONUS: delete users' associated thoughts at the same time
  async deleteUser(req, res) {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.userId });

      if (!users) {
        return res.status(404).json({ message: "No user found with that ID!" });
      }
      await Thought.deleteMany({ _id: { $in: users.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
