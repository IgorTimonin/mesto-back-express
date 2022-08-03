const { err400, err404, err500 } = require('./constants');

module.exports.incorrectDataFor = (res, textAction, textObj) => {
  res.status(err400).send({
    message: `Переданы некорректные данные для ${textAction} ${textObj}.`,
  });
};

module.exports.noFoundData = (res, id, text) => {
  res.status(err404).send({
    message: `${text} c ${id} не найдена.`,
  });
};

module.exports.UnknownError = (res, textAction, textObj) => {
  res.status(err500).send({
    message: `Произошла ошибка при ${textAction} ${textObj}.`,
  });
};
