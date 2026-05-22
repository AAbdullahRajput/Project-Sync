const Card = require('../models/Card');

// Get all cards in a column sorted by order
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({
      column: req.params.columnId,
      isArchived: false,
    })
      .sort('order')
      .populate('assignees', 'name avatar');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new card in a column
const createCard = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Get single card with full details
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate('assignees', 'name avatar email');
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update card fields (title, description, priority, assignees, labels, checklist, dueDate)
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    const fields = ['title', 'description', 'priority', 'assignees', 'labels', 'checklist', 'dueDate'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) card[field] = req.body[field];
    });
    const updated = await card.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a card
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    await card.deleteOne();
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move card to a different column and update its order
const moveCard = async (req, res) => {
  try {
    const { columnId, order } = req.body;
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    card.column = columnId;
    card.order = order;
    const updated = await card.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCards, createCard, getCardById, updateCard, deleteCard, moveCard };