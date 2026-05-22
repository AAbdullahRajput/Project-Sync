const Card = require('../models/Card');

// Get all cards in a column sorted by order
const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({
      column: req.params.columnId,
      isArchived: false,
    })
      .sort('order')
      .populate('assignees', 'name avatar');
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

// Create a new card in a column
const createCard = async (req, res, next) => {
  try {
    const { title, columnId, projectId } = req.body;
    const lastCard = await Card.findOne({ column: columnId }).sort('-order');
    const order = lastCard ? lastCard.order + 1 : 0;
    const card = await Card.create({
      title,
      column: columnId,
      project: projectId,
      order,
    });
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};

// Get single card with full details
const getCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id).populate('assignees', 'name avatar email');
    if (!card) {
      res.status(404);
      return next(new Error('Card not found'));
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
};

// Update card fields (title, description, priority, assignees, labels, checklist, dueDate)
const updateCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      res.status(404);
      return next(new Error('Card not found'));
    }
    const fields = ['title', 'description', 'priority', 'assignees', 'labels', 'checklist', 'dueDate'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) card[field] = req.body[field];
    });
    const updated = await card.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete a card
const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      res.status(404);
      return next(new Error('Card not found'));
    }
    await card.deleteOne();
    res.json({ message: 'Card deleted' });
  } catch (error) {
    next(error);
  }
};

// Move card to a different column and update its order
const moveCard = async (req, res, next) => {
  try {
    const { columnId, order } = req.body;
    const card = await Card.findById(req.params.id);
    if (!card) {
      res.status(404);
      return next(new Error('Card not found'));
    }
    card.column = columnId;
    card.order = order;
    const updated = await card.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCards, createCard, getCardById, updateCard, deleteCard, moveCard };