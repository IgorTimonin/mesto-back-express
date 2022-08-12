const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const { err400, err404, err409, err500 } = require('../utils/constants');

module.exports.errorCatcher = (err, res) => {
  console.log(err.name);
  if (err.name === 'TypeError') {
    throw new BadRequestError(
      'Переданы некорректные данные для создания пользователя',
    );
  }
  if (err.name === 'ValidationError') {
    return res.status(err400).send({
      message: `${err.errors.name.properties.message}`,
    });
  }
  if (err.name === 'DocumentNotFoundError') {
    // throw new NotFoundError();
    return err;
  }
  console.log('Этой ошибки нет в списке');
};
