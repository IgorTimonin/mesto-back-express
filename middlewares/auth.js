require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let tokenVerefy;

  try {
    tokenVerefy = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    if (tokenVerefy) {
      req.user = tokenVerefy;
    }
  } catch (err) {
    return res.status(401).send({ message: `Неверный токен ${err}` });
  }
  next();
};
