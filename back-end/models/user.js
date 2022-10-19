const mongoose = require('mongoose');

const user = mongoose.Schema({
  customId: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Test', user);