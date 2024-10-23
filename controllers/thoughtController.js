const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);

      const users = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughts._id } },
        { new: true }
      );

      if (!users) {
        return res
          .status(404)
          .json({ message: "Thought created, but no user with that ID!" });
      }

      res.json({ message: "Thought created!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get single thought by ID
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thoughts) {
        return res.status(404).json({ message: "No thought found with that ID!" });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Find a thought by ID and update it
  async updateThought(req, res) {
    const thoughts = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thoughts) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thoughts);

    console.log(err);
    res.status(500).json(err);
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thoughts) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
