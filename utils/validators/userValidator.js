const { Joi } = require('celebrate');

module.exports = {
  createOrLogin: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(35),
      name: Joi.string().min(2).max(30),
    }),
  },
  updateUser: {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  },
  userID: {
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  },
};
