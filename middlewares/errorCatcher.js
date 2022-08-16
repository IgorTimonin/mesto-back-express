const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const InternalServerError = require('../errors/InternalServerError');
const { err400, err404 } = require('../utils/constants');

module.exports.errorCatcher = (err, res) => {
  if (err.name === 'TypeError') {
    throw new BadRequestError('Переданы некорректные данные');
  }
  if (err.name === 'CastError') {
    return res.status(err400).send({ message: 'Передан неверный id карточки' });
  }
  if (err.name === 'ValidationError') {
    return res.status(err400).send({
      message: `${err.errors.name.properties.message}`,
    });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(err404).send({
      message: 'Запрашиваемая информация не найдена',
    });
  }
  if (err.code === 11000) {
    throw new ConflictError('Переданые данные уже есть в базе');
  }
  return new InternalServerError('На сервере произошла неизвестная ошибка');
};
