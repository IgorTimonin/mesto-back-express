const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62e52d8393af282fd8ba0dc8',
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/*', ((req, res) => {
  res.status(404).send({ message: 'Упс! Такой страницы не существует' });
}));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
