const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    length: 100,
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: null,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
