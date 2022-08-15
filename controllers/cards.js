const Card = require('../models/card');
const { err400, err404, err500 } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');

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

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      return card.remove();
    })
    .then(() => {
      res
        .status(200)
        .send({ message: `Карточка c id: ${req.params.cardId} удалёна.` });
    })
    .catch(next);

  //   Card.findByIdAndRemove(req.params.cardId)
  //     .orFail()
  //     .then((card) => {
  //       res.send(card);
  //     })
  //     .catch((err) => {
  //       if (err && err.name === 'CastError') {
  //         return res
  //           .status(err400)
  //           .send({ message: 'Передан неверный id карточки' });
  //       }
  //       if (err.name === 'DocumentNotFoundError') {
  //         return res
  //           .status(err404)
  //           .send({ message: 'Запрашиваемая карточка не найдена.' });
  //       }
  //       return res
  //         .status(err500)
  //         .send({ message: 'Произошла ошибка при удалении карточки.' });
  //     });
  // };
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
