const { Joi } = require('celebrate');

const linkRegExPattern = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i;

module.exports.loginUserValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports.createUserValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
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

module.exports.idValidator = {
  params: Joi.object().keys({
    userId: Joi.string()
      .min(24)
      .max(24)
      .pattern(/^[a-f\d]{24}$/i),
    cardId: Joi.string()
      .min(24)
      .max(24)
      .pattern(/^[a-f\d]{24}$/i),
  }),
  // .pattern(/^[a-f\d]{24}$/i),
};
