const cardRouter = require('express').Router();
const { createCard, getCard, deleteCard } = require('../controllers/cards');

cardRouter.post('/cards', createCard);
cardRouter.get('/cards', getCard);
cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;
