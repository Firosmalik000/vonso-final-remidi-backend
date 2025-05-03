const User = require('../model/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashPassword, role: 'user' });
    await user.save();

    res.status(201).json({ message: 'User created successfully', data: user });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }
    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const logOut = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful. ' });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const index = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const store = async (req, res) => {
  try {
    const { username, email, password, role, id } = req.body;
    if (id) {
      const updateItem = await User.findByIdAndUpdate(id, { username, email, password, role });
      res.status(201).json({ message: 'User updated successfully', data: updateItem });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newItem = new User({ username, email, password: hashPassword, role });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Internal server error : ${err.message}` });
  }
};

module.exports = { signup, login, index, logOut, store, destroy };
