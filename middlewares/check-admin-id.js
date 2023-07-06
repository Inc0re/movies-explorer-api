const { adminId } = require('../utils/constants');
const { ForbiddenError } = require('../utils/errors');

module.exports = (req, res, next) => {
  if (req.user._id !== adminId) {
    next(new ForbiddenError('Нет прав'));
  } else {
    next();
  }
};
