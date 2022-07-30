const userRouter = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
} = require('../controllers/users');

userRouter.get('/', (req, res) => {
  res.send('Сервер работает')
});
userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/:userId', updateUserProfile);
userRouter.delete('/users/:userId', deleteUser);

module.exports = userRouter;
