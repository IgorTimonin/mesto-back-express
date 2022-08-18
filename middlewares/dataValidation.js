const { Joi } = require('celebrate');
const { linkRegExPattern } = require('../utils/constants');

module.exports.loginUserValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.createUserValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegExPattern),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.updateUserValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.updateUserAvatarValidator = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExPattern),
  }),
};

module.exports.createCardValidator = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegExPattern),
  }),
};

module.exports.userIdValidator = {
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .min(24)
      .max(24)
      .pattern(/^[a-f\d]{24}$/i),
  }),
};

module.exports.cardIdValidator = {
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .min(24)
      .max(24)
      .pattern(/^[a-f\d]{24}$/i),
  }),
};
