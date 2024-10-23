const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    // Thoughts array referencing Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Empty friends arrray self-referencing this User model 
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  }
);

const User = model('User', userSchema);

module.exports = User;
