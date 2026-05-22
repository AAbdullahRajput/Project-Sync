const Comment = require('../models/Comment');

// Get all comments for a card
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ card: req.params.cardId })
      .populate('author', 'name avatar')
      .sort('createdAt');
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Post a new comment on a card
const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      card: req.params.cardId,
      author: req.user._id,
    });
    const populated = await comment.populate('author', 'name avatar');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// Edit your own comment → marks isEdited flag true
const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      return next(new Error('Comment not found'));
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to edit this comment'));
    }
    comment.text = req.body.text || comment.text;
    comment.isEdited = true;
    const updated = await comment.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete your own comment
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      return next(new Error('Comment not found'));
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to delete this comment'));
    }
    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getComments, createComment, updateComment, deleteComment };