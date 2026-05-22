const Column = require('../models/Column');

// Get all columns for a project sorted by order
const getColumns = async (req, res, next) => {
  try {
    const columns = await Column.find({ project: req.params.projectId }).sort('order');
    res.json(columns);
  } catch (error) {
    next(error);
  }
};

// Create a new column in a project
const createColumn = async (req, res, next) => {
  try {
    const { name, projectId } = req.body;
    const lastColumn = await Column.findOne({ project: projectId }).sort('-order');
    const order = lastColumn ? lastColumn.order + 1 : 0;
    const column = await Column.create({ name, project: projectId, order });
    res.status(201).json(column);
  } catch (error) {
    next(error);
  }
};

// Rename a column
const updateColumn = async (req, res, next) => {
  try {
    const column = await Column.findById(req.params.id);
    if (!column) {
      res.status(404);
      return next(new Error('Column not found'));
    }
    column.name = req.body.name || column.name;
    column.color = req.body.color || column.color;
    const updated = await column.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete a column
const deleteColumn = async (req, res, next) => {
  try {
    const column = await Column.findById(req.params.id);
    if (!column) {
      res.status(404);
      return next(new Error('Column not found'));
    }
    await column.deleteOne();
    res.json({ message: 'Column deleted' });
  } catch (error) {
    next(error);
  }
};

// Reorder columns after drag-and-drop → receives array of { id, order }
const reorderColumns = async (req, res, next) => {
  try {
    const { columns } = req.body; // [{ id: '...', order: 0 }, ...]
    const updates = columns.map((col) =>
      Column.findByIdAndUpdate(col.id, { order: col.order })
    );
    await Promise.all(updates);
    res.json({ message: 'Columns reordered' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getColumns, createColumn, updateColumn, deleteColumn, reorderColumns };