const userRouter = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  deleteUser,
} = require('../controllers/users');

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.delete('/:userId', deleteUser);

module.exports = userRouter;
