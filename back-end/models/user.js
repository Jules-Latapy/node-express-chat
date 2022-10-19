const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  nbMessage: { type: Number, required: true}
});

module.exports = mongoose.model('User', userSchema);