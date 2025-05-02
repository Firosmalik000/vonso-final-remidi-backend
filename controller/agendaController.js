const Agenda = require('../model/agenda');

const index = async (req, res) => {
  try {
    const data = await Agenda.find().populate('created_by', 'username');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Agenda.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Agenda not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const store = async (req, res) => {
  try {
    const { title, desc, date, icon } = req.body;
    const newItem = new Agenda({ title, desc, date, icon, created_by: req.user.id, created_at: new Date() });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const update = async (req, res) => {
  try {
    const { title, desc, date, icon } = req.body;
    const { id } = req.params;
    const updateItem = await Agenda.findByIdAndUpdate(id, { title, desc, date, icon, updated_at: new Date(), updated_by: req.user.id }, { new: true });
    res.status(201).json({ message: 'Agenda updated successfully', data: updateItem });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Agenda.findByIdAndDelete(id);
    res.status(201).json({ message: 'Agenda deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

module.exports = {
  index,
  store,
  getById,
  destroy,
  update,
};
