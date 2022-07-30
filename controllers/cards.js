const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    // .then((err) => {
    //   const ERROR_CODE = 400;
    //   if (err.name === 'ValidationError') return res
    //     .status(ERROR_CODE)
    //     .send('переданы некорректные данные для создания карточки');
    // })
    .catch((err) =>
      res.status(500).send({
        message: `Произошла ошибка создания карточки.`,
      })
    );
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
    .then((card) => res.send(`Карточка удалена.`))
    .catch((err) =>
      res.status(500).send({
        message: `Ошибка при удалении карточки ${err.name} ${err.message}`,
      })
    );
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
        message: `Ошибка при лайке карточки ${err.name} ${err.message}`,
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
        message: `Ошибка при дизлайке карточки ${err.name} ${err.message}`,
      })
    );
