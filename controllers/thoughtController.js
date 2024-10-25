const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-__v");
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a single thought by ID
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID!" });
      }

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
        return res.status(404).json({
          message: "Thought created, but no user found with that ID!",
        });
      }

      res.json({ message: "Thought created!" });
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
      return res
        .status(404)
        .json({ message: "No thought found with that ID!" });
    }

    res.json(thoughts);

    console.log(err);
    res.status(500).json(err);
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID!" });
      }

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID!" });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID!" });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
