const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const cardRouter = require("./routes/cardRouter");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mestodb")

app.use("/", userRouter);
app.use("/", cardRouter);

app.get('/', (req, res) => {
  res.send('Привет, юзер');
})
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
