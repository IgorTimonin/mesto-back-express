const { Joi } = require('celebrate');

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
    avatar: Joi.string().pattern(
      /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i,
    ),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.createCardValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(
      /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i,
    ),
  }),
};

module.exports.idValidator = {
  body: Joi.string()
    .required()
    .pattern(/^[a-f\d]{24}$/i),
};
