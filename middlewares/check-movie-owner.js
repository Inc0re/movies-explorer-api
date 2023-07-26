const Movie = require('../models/movie');
const User = require('../models/user');
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
      } else if (movie.owner.toString() !== req.user._id) {
        User.checkAdminFlag(req.user._id)
          .then((isAdmin) => {
            if (isAdmin) {
              next();
            } else {
              next(new ForbiddenError('Нет прав на удаление'));
            }
          }).catch(next);
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
