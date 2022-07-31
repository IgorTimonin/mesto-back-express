const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError')
        return res
          .status(400)
          .send({message: 'переданы некорректные данные для создания карточки'})
      return res.status(500).send({
        message: `Произошла ошибка создания карточки.`,
      });
    });
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка при получении карточек.`,
      })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError')
        return res.status(404).send({message:  `Запрашиваемая карточка не найдена.`});
      return res.status(500).send({
        message: `Ошибка при удалении карточки ${err.name} ${err.message}`,
      });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(`Лайк поставлен.`))
    .catch((err) =>
      res.status(500).send({
        message: `Ошибка при установке лайка ${err.name} ${err.message}`,
      })
    );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(`Лайк снят.`))
    .catch((err) =>
      res.status(500).send({
        message: `Ошибка при снятии лайка ${err.name} ${err.message}`,
      })
    );
