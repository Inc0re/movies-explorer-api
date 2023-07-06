const Movie = require('../models/movie');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors');

// !!! temp admin id
const adminID = '64a68a1abaed3cc1784d7a9a';

module.exports = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(`Нет карточки с id ${req.params.movieId}`));
        // !!! temp admin id
      } else if (movie.owner.toString() !== req.user._id && req.user._id !== adminID) {
        next(new ForbiddenError('Нет прав на удаление'));
      } else {
        next();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный id карточки ${req.params.movieId}`));
      } else {
        next(err);
      }
    });
};
