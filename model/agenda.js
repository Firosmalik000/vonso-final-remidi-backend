const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    length: 100,
  },
  desc: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  icon: {
    type: String,
    required: false,
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

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports = Agenda;
