require('dotenv').config();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUND } = require('../configs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      'Переданы некорректные данные для создания пользователя',
    );
  }
  if (!validator.isEmail(email)) {
    throw new BadRequestError('Неверный формат электронной почты');
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь уже существует');
      }
      return bcrypt.hash(password, SALT_ROUND);
    })
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(({ _id }) => res.send({
          name,
          about,
          avatar,
          email,
          _id,
        }))
        .catch(next);
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ users: user }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError(
          `Пользователь с id: ${req.params.userId} не найден.`,
        );
      }
      if (err.name === 'CastError') {
        throw new BadRequestError('Передан неверный id пользователя');
      }
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError(
          `Пользователь с id: ${req.user._id} не найден.`,
        );
      }
      if (err.name === 'CastError') {
        throw new BadRequestError('Передан неверный id пользователя');
      }
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  if (name || about) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail()
      .then((user) => res.send(user))
      .catch(next);
  }
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (avatar) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail()
      .then((user) => res.send(user))
      .catch(next);
  }
};

module.exports.deleteUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден.');
      }
      return user.remove();
    })
    .then(() => {
      res
        .status(200)
        .send({ message: `Пользователь c id: ${req.params.userId} удалён.` });
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      if (!token) {
        throw new UnauthorizedError('Ошибка создания');
      }
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({ message: 'Успешный вход' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
