const Card = require('../models/card');
const { err400, err404, err500 } = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(err400).send({
          message: 'переданы некорректные данные для создания карточки',
        });
      }
      return res.status(err500).send({
        message: 'Произошла ошибка создания карточки.',
      });
    });
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() =>
      res
        .status(err500)
        .send({ message: 'Произошла ошибка при получении карточек.' })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Передан неверный id карточки' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(err404)
          .send({ message: 'Запрашиваемая карточка не найдена.' });
      }
      return res
        .status(err500)
        .send({ message: 'Произошла ошибка при удалении карточки.' });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Передан неверный id карточки' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(err404)
          .send({ message: 'Запрашиваемая карточка не найдена.' });
      }
      return res
        .status(err500)
        .send({ message: 'Произошла ошибка при постановке лайка.' });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Передан неверный id карточки' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(err404)
          .send({ message: 'Запрашиваемая карточка не найдена.' });
      }
      return res
        .status(err500)
        .send({ message: 'Произошла ошибка при снятии лайка.' });
    });
