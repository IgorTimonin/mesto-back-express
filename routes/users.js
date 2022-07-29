const userRouter = require('express').Router();
const { createUser } = require('../controllers/users');

userRouter.post('users', createUser);
userRouter.get('users', );

module.exports = userRouter;
