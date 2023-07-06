const { Joi } = require('celebrate');
const { urlTemplate } = require('../constants');

module.exports = {
  movieID: {
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  },
  createMovie: {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlTemplate),
      trailer: Joi.string().required().pattern(urlTemplate),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(urlTemplate),
      movieId: Joi.number().required(),
    }),
  },
};
