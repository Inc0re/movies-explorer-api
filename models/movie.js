const mongoose = require('mongoose');
const validator = require('validator');

const isUrl = {
  validator: (v) => validator.isURL(v),
  message: 'Неверный формат ссылки',
};

const movieSchema = new mongoose.Schema({
  // Movie country
  country: {
    type: String,
    required: true,
  },
  // Movie director
  director: {
    type: String,
    required: true,
  },
  // Movie duration
  duration: {
    type: Number,
    required: true,
  },
  // Movie year
  year: {
    type: String,
    required: true,
  },
  // Movie description
  description: {
    type: String,
    required: true,
  },
  // Movie image
  image: {
    type: String,
    required: true,
    validate: isUrl,
  },
  // Movie trailer link
  trailerLink: {
    type: String,
    required: true,
    validate: isUrl,
  },
  // Movie thumbnail
  thumbnail: {
    type: String,
    required: true,
    validate: isUrl,
  },
  // Movie owner
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // Movie movieId
  movieId: {
    type: Number,
    required: true,
  },
  // Movie nameRU
  nameRU: {
    type: String,
    required: true,
  },
  // Movie nameEN
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
