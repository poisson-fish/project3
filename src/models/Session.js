const mongoose = require('mongoose')

const sessionsSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  user:{
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    expires: '1m',
    default: Date.now
  }
}, {
  virtuals: {
    isExpired: {
        get () {
          return this.createdAt < this.expires
        }
      }
  }
})

const Sessions = mongoose.model('Session', sessionsSchema)

module.exports = {
  Sessions
}
