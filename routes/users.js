const userRouter = require('express').Router();
const { celebrate, errors } = require('celebrate');
const {
  idValidator,
  updateUserValidator,
  updateUserAvatarValidator,
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
userRouter.patch('/me', celebrate(updateUserValidator), updateUserProfile);
userRouter.patch(
  '/me/avatar',
  celebrate(updateUserAvatarValidator),
  updateUserAvatar,
);
userRouter.delete('/:userId', celebrate(idValidator), deleteUser);
errors();
module.exports = userRouter;
