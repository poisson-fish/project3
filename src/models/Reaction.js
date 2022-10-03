const mongoose = require('mongoose')

const Reaction = new mongoose.Schema({
  reactionId: {
    type: mongoose.ObjectId,
    alias: '_id'
  },
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = {
  Reaction
}
