const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        user,
      })
    )
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка добавления пользователя.`,
      })
    );
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
    .then((user) => res.send({ user }))
    .catch((err) =>
      res.status(500).send({
        message: `Запрашиваемый пользователь не найден.`,
      })
    );
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about} = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({ user }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Произошла ошибка обновления данных пользователя' })
    );
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => res.send(`Пользователь ${req.params.userId} удалён.`))
    .catch((err) =>
      res.status(500).send({
        message: `Ошибка при удалении пользователя ${err.name} ${err.message}`,
      })
    );
};
