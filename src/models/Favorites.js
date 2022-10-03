const mongoose = require('mongoose')
// const { Reaction } = require('./Reaction')

const favoritesSchema = new mongoose.Schema({
  favoriteText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  }
}, {
  virtuals: {
  }
})

const Favorites = mongoose.model('Favorite', favoritesSchema)

module.exports = {
  Favorites
}
