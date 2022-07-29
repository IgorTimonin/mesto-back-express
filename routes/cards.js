const cardRouter = require('express').Router();
const { createCard } = require('../controllers/cards');

cardRouter.post('/', createCard);

module.exports = cardRouter;
