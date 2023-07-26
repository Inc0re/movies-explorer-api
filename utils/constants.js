require('dotenv').config();

const {
  JWT_SECRET = 'super-secret-key',
  DB_PATH = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  badRequestError: 400,
  notFoundError: 404,
  forbiddenError: 403,
  conflictError: 409,
  serverError: 500,
  unauthorizedError: 401,
  createdStatus: 201,
  mongoDuplicateKeyError: 11000,
  saltRounds: 10,
  jwtSecret: JWT_SECRET,
  urlTemplate: /(https?:\/\/)(www\.)?([a-z\d-]+\.)+([a-z]{2,6})(\/[A-Za-z\d\-._~:/?#[\]@!$&'()*+,;=]+)*\/?$/,
  mongoDBpath: DB_PATH,
  corsOrigins: [
    'http://localhost:3000',
    '*', // !!! replace with production domain
  ],
};
