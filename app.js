const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const cardRouter = require("./routes/cards");
const userRouter = require("./routes/users");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
});

app.use(express.json())
app.use("/", userRouter);
app.use("/", cardRouter);
app.use((req, res, next) => {
  req.user = {
    _id: '62e52d8393af282fd8ba0dc8',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
