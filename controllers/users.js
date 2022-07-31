const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        user,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError')
        return res
          .status(400)
          .send({
            message: 'переданы некорректные данные для создания пользователя',
          });
      return res.status(500).send({
        message: `Произошла ошибка создания пользователя.`,
      });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ users: user }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка при получении списка пользователей.`,
      })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError')
        return res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден.' });
      return res.status(500).send({
        message: `Произошла неизвестная ошибка при поиске пользователя`,
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
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError')
          return res
            .status(400)
            .send(
              'переданы некорректные данные для обновления данных пользователя'
            );
        return res.status(500).send({
          message: `Произошла ошибка обновления данных пользователя.`,
        });
      });
  } else {
    return res
      .status(400)
      .send({
        message: `переданы некорректные данные для обновления данных пользователя`,
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
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError')
          return res
            .status(400)
            .send(
              'переданы некорректные данные для обновления аватара пользователя'
            );
        return res.status(500).send({
          message: `Произошла ошибка обновления аватара пользователя.`,
        });
      });
  } else {
    return res
      .status(400)
      .send({
        message:
          'переданы некорректные данные для обновления данных пользователя',
      });
  }
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => res.send(`Пользователь c id: ${req.params.userId} удалён.`))
    .catch((err) => {
      if (err.name === 'CastError')
        return res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден.' });
      return res.status(500).send({
        message: `Ошибка при удалении пользователя`,
      });
    });
};
