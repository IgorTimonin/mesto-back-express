const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  deleteUser,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUserById);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.delete('/:userId', deleteUser);

module.exports = userRouter;
