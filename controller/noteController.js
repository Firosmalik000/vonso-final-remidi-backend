const Note = require('../model/note');

const index = async (req, res) => {
  try {
    const data = await Note.find().populate('created_by', 'username');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Note.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};
const store = async (req, res) => {
  try {
    const { note } = req.body;
    const newItem = new Note({ note, created_by: req.user.id, created_at: new Date() });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const update = async (req, res) => {
  try {
    const { note } = req.body;
    const { id } = req.params;
    const updateItem = await Note.findByIdAndUpdate(id, { note, updated_at: new Date() }, { new: true });
    res.status(201).json({ message: 'Note updated successfully', data: updateItem });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(201).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

module.exports = {
  store,
  index,
  getById,
  destroy,
  update,
};
