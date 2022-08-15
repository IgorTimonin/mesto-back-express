require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let tokenVerefy;

  try {
    tokenVerefy = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    return res.status(401).send({ message: `Неверный токен ${err}` });
  }
  if (tokenVerefy) {
    req.user = tokenVerefy;
  }

  next();
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res.status(401).send({ message: 'Необходима авторизация' });
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(
//       token,
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//     );
//   } catch (err) {
//     return res.status(401).send({ message: 'Неверный токен' });
//   }

//   req.user = payload;

//   next();
// };
