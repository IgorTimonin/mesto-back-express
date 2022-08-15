const userRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const {
  idValidator,
} = require('../middlewares/dataValidation');
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  deleteUser,
  getMe,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', celebrate(idValidator), getMe);
userRouter.get('/:userId', celebrate(idValidator), getUserById);
userRouter.patch('/me', celebrate(idValidator), updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.delete('/:userId', celebrate(idValidator), deleteUser);

module.exports = userRouter;
