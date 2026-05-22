const Comment = require('../models/Comment');

// Get all comments for a card
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ card: req.params.cardId })
      .populate('author', 'name avatar')
      .sort('createdAt');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post a new comment on a card
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      card: req.params.cardId,
      author: req.user._id,
    });
    const populated = await comment.populate('author', 'name avatar');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit your own comment → marks isEdited flag true
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this comment' });
    }
    comment.text = req.body.text || comment.text;
    comment.isEdited = true;
    const updated = await comment.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete your own comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getComments, createComment, updateComment, deleteComment };