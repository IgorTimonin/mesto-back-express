const validator = require('validator');
const bcrypt = require('bcrypt');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { SALT_ROUND } = require('../configs');
const User = require('../models/user');
const { err400, err404, err409, err500 } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const { errorCatcher } = require('../middlewares/errorCatcher');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      'Переданы некорректные данные для создания пользователя'
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
        .then(({ _id }) => res.send({ name, about, avatar, email, _id }))
        .catch(next);
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ users: user }))
    .catch(() =>
      res.status(err500).send({
        message: 'Произошла ошибка при получении списка пользователей.',
      })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(err404).send({
          message: `Пользователь с id: ${req.params.userId} не найден.`,
        });
      }
      if (err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Передан неверный id пользователя' });
      }
      return res.status(err500).send({
        message: 'Произошла ошибка при получении данных пользователя.',
      });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  if (name || about) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    )
      .orFail()
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(err400).send({
            message:
              'Переданы некорректные данные для обновления информации о пользователе',
          });
        }
        if (err.name === 'DocumentNotFoundError') {
          return res
            .status(err404)
            .send({ message: `Пользователь с id: ${req.user._id} не найден.` });
        }
        return res.status(err500).send({
          message: 'Произошла ошибка при обновлении данных пользователя.',
        });
      });
  }
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (avatar) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    )
      .orFail()
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(err400).send({
            message:
              'Переданы некорректные данные для обновления аватара пользователя',
          });
        }
        if (err.name === 'DocumentNotFoundError') {
          return res.status(err404).send({
            message: `Пользователь с id: ${req.user._id} не найден.`,
          });
        }
        return res.status(err500).send({
          message: 'Произошла ошибка при обновлении аватара пользователя.',
        });
      });
  }
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .orFail()
    .then(() =>
      res.send({ message: `Пользователь c id: ${req.params.userId} удалён.` })
    )
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(err404)
          .send({ message: 'Запрашиваемый пользователь не найден.' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(err404).send({
          message: `Пользователь с id: ${req.user._id} не найден.`,
        });
      }
      return res.status(err500).send({
        message: 'Ошибка при удалении пользователя',
      });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      console.log('Создаю токен')
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 7,
          httpOnly: true,
        })
        .status(200)
        .send({ message: 'Успешный вход' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
