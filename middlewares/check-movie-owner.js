const Movie = require('../models/movie');
// !!! temp admin id
const { adminId } = require('../utils/constants');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors');

module.exports = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(`Нет карточки с id ${req.params.movieId}`));
      } else if (
        movie.owner.toString() !== req.user._id
        && req.user._id !== adminId // !!! temp admin id
      ) {
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
