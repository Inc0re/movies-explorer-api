/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const { login, createUser, logOut } = require('./controllers/users');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
const checkAdminFlag = require('./middlewares/check-admin-flag');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const userValidator = require('./utils/validators/userValidator');
const { mongoDBpath, corsOrigins } = require('./utils/constants');
const { NotFoundError } = require('./utils/errors');
const apiStartPage = require('./utils/api-start-page');

const { PORT = 3000 } = process.env;
const app = express();

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  }),
);

app.use(helmet());

// Rate limiter
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(mongoDBpath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Request logger
app.use(requestLogger);

// API start page
app.get('/', (req, res) => {
  res.send(apiStartPage);
});

// Unprotected routes
app.post('/signin', celebrate(userValidator.createOrLogin), login);
app.post('/signup', celebrate(userValidator.createOrLogin), createUser);

// Logout
app.get('/logout', logOut);

// Protected routes
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
// Crash test app
app.get('/crash', auth, checkAdminFlag, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// Error logger
app.use(errorLogger);

// Celebrate errors
app.use(errors());

// Handle errors
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
