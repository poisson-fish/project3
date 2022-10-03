const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  },
  favorites: [mongoose.ObjectId]
}, {
  virtuals: {
    favoriteCount: {
      get () {
        return this.favorites.length
      }
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
