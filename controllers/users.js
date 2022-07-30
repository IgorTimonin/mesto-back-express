const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send(
        {
        data: user
        }
      )
    )
    .catch((err) =>
      res
        .status(500)
        .send({
          message: `Произошла ошибка добавления пользователя. Ошибка: ${err.name} ${err.message}`,
        })
    );
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка при получении списка пользователей Ошибка: ${err.name} ${err.message}`,
      })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ message: `Запрашиваемый пользователь не найден Ошибка: ${err.name} ${err.message}` })
    );
  };

module.exports.updateUserProfile = (req, res) => {
  res.send({
    message: 'Скоро здесь будет функция обновления updateUserProfile',
  });
}

module.exports.deleteUser = (req, res) => {
  res.send({
    message: 'Скоро здесь будет функция обновления deleteUser',
  });
};

// module.exports.updateUserProfile = (req, res) => {
//   // const { name, about, avatar } = req.body;
// };