const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:3000/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get('/', (req, res) => {
  res.send('Привет, юзер');
})
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});