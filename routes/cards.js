const cardRouter = require('express').Router();
const { celebrate, errors } = require('celebrate');
const {
  idValidator,
  createCardValidator,
} = require('../middlewares/dataValidation');
const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.post('/', celebrate(createCardValidator), createCard);
cardRouter.get('/', getCard);
cardRouter.delete('/:cardId', celebrate(idValidator), deleteCard);
cardRouter.put('/:cardId/likes', celebrate(idValidator), likeCard);
cardRouter.delete('/:cardId/likes', celebrate(idValidator), dislikeCard);
errors();
module.exports = cardRouter;
