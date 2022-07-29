const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, likes, owner, createdAt } = req.body;

  Card.create({ name, link, likes, owner, createdAt })
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: 'Произошла ошибка создания карточки' })
    );
};
