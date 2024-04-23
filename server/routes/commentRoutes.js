// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllCommentsWithReplies,
    createComment,
    createReply,
    updateComment,
    deleteComment,
    deleteReply,
} = require('../controllers/commentController');
const { protect } = require('../Middlewares/authMiddleware');

// GET all comments with replies
router.get('/comments', getAllCommentsWithReplies);

// POST create a new comment
router.post('/comments', createComment);

// POST create a new reply to a comment
router.post('/comments/:commentId/replies', createReply);

// PUT update a comment
router.put('/comments/:commentId', updateComment);

// DELETE delete a comment
router.delete('/comments/:commentId', deleteComment);

//Delete reply
router.delete('/comments/:commentId/:index', deleteReply)

module.exports = router;
