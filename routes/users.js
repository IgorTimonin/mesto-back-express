const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  deleteUser,
  getMe,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getMe);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.delete('/:userId', deleteUser);

module.exports = userRouter;
