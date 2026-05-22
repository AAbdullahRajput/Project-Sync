const express = require('express');
const router = express.Router();
const {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
  reorderColumns,
} = require('../controllers/columnController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/:projectId', getColumns);
router.post('/', createColumn);
router.put('/reorder', reorderColumns); // must be before /:id
router.route('/:id').put(updateColumn).delete(deleteColumn);

module.exports = router;