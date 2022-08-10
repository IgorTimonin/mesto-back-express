const validator = require('validator');
const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../configs');
const User = require('../models/user');
const { err400, err404, err409, err500 } = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email && !password) {
    return res.status(err400).send({
      message: 'Переданы некорректные данные для создания пользователя',
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(err400).send({
      message: 'Неверный формат электронной почты',
    });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(err409).send({
          message: 'Пользователь с такой почтой уже существует',
        });
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
      }).then(({ _id }) => res.send({ email, _id }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(err400).send({
          message: 'Переданы некорректные данные для создания пользователя',
        });
      }
      return res.status(err500).send({
        message: `Произошла ошибка создания пользователя. ${err}`,
      });
    });
  // if (err) {
  // (err.name === 'ReferenceError') {
  //     return res.status(err400).send({
  //       message: 'Переданы некорректные данные для создания пользователя',
  //     });
  //   }
  //   return res.status(err500).send({
  //     message: 'Произошла ошибка создания пользователя.',
  //   });
  // }
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

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({email})
//     .orFail()
//     .then(() => {}

//     )
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res
//           .status(err404)
//           .send({
//             message: `Пользователь c почтой: ${req.params.email} не найден.`,
//           });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(err404).send({
//           message: `Пользователь с id: ${req.user._id} не найден.`,
//         });
//       }
//       return res.status(err500).send({
//         message: 'Ошибка при удалении пользователя',
//       });
//     });
// };
