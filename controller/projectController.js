const Project = require('../model/project');

const index = async (req, res) => {
  try {
    const data = await Project.find().populate('created_by', 'username').populate('programmer', 'username');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Project.findById(id);
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
    const { title, desc, status, programmer, priority } = req.body;
    const newItem = new Project({ title, desc, status, programmer, priority, created_by: req.user.id, created_at: new Date() });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const change = await Project.findByIdAndUpdate(id, { status }, { new: true });

    res.status(201).json(change);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(201).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

module.exports = {
  store,
  changeStatus,
  index,
  getProjectById,
  destroy,
};
