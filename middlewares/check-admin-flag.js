const { ForbiddenError } = require('../utils/errors');
const User = require('../models/user');

module.exports = (req, res, next) => {
  User.checkAdminFlag(req.user._id)
    .then((isAdmin) => {
      if (!isAdmin) {
        next(new ForbiddenError('Нет прав'));
      } else {
        next();
      }
    })
    .catch(next);
};
