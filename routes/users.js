const router = require('express').Router();
const { celebrate } = require('celebrate');
const userValidator = require('../utils/validators/userValidator');
const checkAdminFlag = require('../middlewares/check-admin-flag');
const {
  getUsers,
  getUserById,
  getUserByMe,
  updateUser,
} = require('../controllers/users');

router.get('/', checkAdminFlag, getUsers); // for admin only
router.get('/me', celebrate(userValidator.userID), getUserByMe);
router.get('/:id', checkAdminFlag, celebrate(userValidator.userID), getUserById);
router.patch('/me', celebrate(userValidator.updateUser), updateUser);

module.exports = router;
