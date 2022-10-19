const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  userCustomId: { type: String, required: true },
  hour: { type: String, required: true },
  messageText: { type: String, required: true }

});

module.exports = mongoose.model('message', messageSchema);