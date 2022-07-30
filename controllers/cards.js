const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, likes, owner = user._id, createdAt } = req.body;

  Card.create({ name, link, likes, owner, createdAt })
    .then((card) => res.send({ card }))
    .catch((err) =>
      res.status(500).send({ message: 'Произошла ошибка создания карточки' })
    );
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ cards }))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка при получении карточек.`,
      })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(`Карточка ${req.params.userId} удалена.`))
    .catch((err) =>
      res.status(500).send({
        message: `Ошибка при удалении карточки ${err.name} ${err.message}`,
      })
    );
};
