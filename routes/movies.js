const router = require('express').Router();
const { celebrate } = require('celebrate');

const movieValidator = require('../utils/validators/movieValidator');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(movieValidator.createMovie), createMovie);
router.delete('/:movieId', celebrate(movieValidator.movieID), deleteMovie);

module.exports = router;
