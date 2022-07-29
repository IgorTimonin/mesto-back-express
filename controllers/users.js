const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Произошла ошибка добавления пользователя' })
    );
};

module.exports.getAllUsers = (req, res) => {
  // const { name, about, avatar } = req.body;

  User.get({})
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Произошла ошибка при получении списка пользователей' })
    );
};
