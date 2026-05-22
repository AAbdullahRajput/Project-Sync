const express = require('express');
const router = express.Router();
const {
  getCards,
  createCard,
  getCardById,
  updateCard,
  deleteCard,
  moveCard,
} = require('../controllers/cardController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/:columnId', getCards);
router.post('/', createCard);
router.route('/:id').get(getCardById).put(updateCard).delete(deleteCard);
router.put('/:id/move', moveCard);

module.exports = router;