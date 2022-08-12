const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorCatcher } = require('./middlewares/errorCatcher');

const { PORT = 3000 } = process.env;
const app = express();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { err404 } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);

// app.use(auth);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('/*', (req, res) => {
  res.status(err404).send({ message: 'Упс! Такой страницы не существует' });
});
app.use((err, req, res, next) => {
  // errorCatcher(err, res);
  // console.log('Ответ получен');
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
});
app.listen(PORT);
