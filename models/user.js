const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  // User email
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат почты',
    },
  },
  // User password
  password: {
    type: String,
    required: true,
    select: false,
  },
  // User name
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  // Admin flag
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
}

function checkAdminFlag(id) {
  return this.findById(id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return user.isAdmin;
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;
userSchema.statics.checkAdminFlag = checkAdminFlag;

module.exports = mongoose.model('user', userSchema);
