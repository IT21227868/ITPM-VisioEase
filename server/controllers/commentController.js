// controllers/commentController.js

const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');

// Get all comments with replies
const getAllCommentsWithReplies = asyncHandler(async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

// Create a new comment
const createComment = asyncHandler(async (req, res) => {
    const { author, text, profilePhoto } = req.body;
    const comment = await Comment.create({ author, text, profilePhoto });
    res.status(201).json(comment);
});

// Create a new reply to a comment
const createReply = asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;
    const { author, text, profilePhoto } = req.body;
    const reply = { author, text, profilePhoto };

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        comment.replies.push(reply);
        await comment.save();
        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const updateComment = asyncHandler(async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { text } = req.body;

        console.log('Updating comment with ID:', commentId);

        const comment = await Comment.findById(commentId);
        if (!comment) {
            console.log('Comment not found');
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the requester is the author of the comment
        // Ensure req.user is defined and has the username property
        if (req.user && req.user.username && comment.author !== req.user.username) {
            console.log('Unauthorized: User is not the author of the comment');
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.text = text;
        await comment.save();
        console.log('Comment updated successfully');
        return res.status(200).json(comment);
    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const commentId = req.params.commentId;

        console.log('Deleting comment with ID:', commentId);

        // Use findByIdAndDelete to delete the comment directly from the database
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            console.log('Comment not found');
            return res.status(404).json({ message: 'Comment not found' });
        }

        console.log('Comment deleted successfully');
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE route for deleting a reply
const deleteReply = asyncHandler(async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const replyIndex = parseInt(req.params.replyIndex);

        // Find the comment by its ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the reply index is valid
        if (replyIndex < 0 || replyIndex >= comment.replies.length) {
            return res.status(400).json({ message: 'Invalid reply index' });
        }

        // Remove the reply from the comment's replies array
        comment.replies.splice(replyIndex, 1);
        await comment.save();

        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error('Error deleting reply:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = {
    getAllCommentsWithReplies,
    createComment,
    createReply,
    updateComment,
    deleteComment,
    deleteReply,
};
