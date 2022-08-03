module.exports.incorrectData = (res, text) => {
  res.status(400).send({
    message: `Переданы некорректные данные для создания ${text}.`,
  });
};

module.exports.noFoundData = (res, text) => {
  res.status(404).send({
    message: `Не удалось найти ${text} в базе данных.`,
  });
};

module.exports.UnknownError = (res, text) => {
  res.status(500).send({
    message: `Произошла ошибка при создании ${text}.`,
  });
};
