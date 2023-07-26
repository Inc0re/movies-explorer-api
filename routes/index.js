const router = require('express').Router();
const { celebrate } = require('celebrate');
const userValidator = require('../utils/validators/userValidator');
const { NotFoundError } = require('../utils/errors');
const apiStartPage = require('../utils/api-start-page');
const auth = require('../middlewares/auth');
const checkAdminFlag = require('../middlewares/check-admin-flag');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, logOut, createUser } = require('../controllers/users');

// API start page
router.get('/', (req, res) => {
  res.send(apiStartPage);
});

// Unprotected routes
router.post('/signin', celebrate(userValidator.createOrLogin), login);
router.post('/signup', celebrate(userValidator.createOrLogin), createUser);

// Logout
router.get('/logout', logOut);

// Protected routes
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

// Crash test app
router.get('/crash', auth, checkAdminFlag, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// 404
router.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
