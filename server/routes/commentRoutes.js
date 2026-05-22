const express = require('express');
const router = express.Router();
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/:cardId').get(getComments).post(createComment);
router.route('/:id').put(updateComment).delete(deleteComment);

module.exports = router;