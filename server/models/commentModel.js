// models/Comment.js

const mongoose = require('mongoose');

// Define the schema for a reply
const replySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
}, { _id: false }); // Disable generating _id for replies

// Define the schema for a comment
const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  replies: [replySchema] // Array of replies
});

// Create a model for the Comment schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
