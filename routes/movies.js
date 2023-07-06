const router = require('express').Router();
const { celebrate } = require('celebrate');
const checkMovieOwner = require('../middlewares/check-movie-owner');
const movieValidator = require('../utils/validators/movieValidator');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(movieValidator.createMovie), createMovie);
router.delete('/:movieId', celebrate(movieValidator.movieID), checkMovieOwner, deleteMovie);

module.exports = router;
