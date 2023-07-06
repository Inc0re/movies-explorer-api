/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const { login, createUser, logOut } = require('./controllers/users');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const userValidator = require('./utils/validators/userValidator');
const auth = require('./middlewares/auth');
const checkAdminId = require('./middlewares/check-admin-id');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoDBpath, corsOrigins } = require('./utils/constants');

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

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

// Unprotected routes
app.post('/signin', celebrate(userValidator.createOrLogin), login);
app.post('/signup', celebrate(userValidator.createOrLogin), createUser);

// Logout
app.get('/logout', logOut);

// Protected routes
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
// Crash test app
app.get('/crash', auth, checkAdminId, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
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
