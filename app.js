const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const cardRouter = require("./routes/cards");
const userRouter = require("./routes/users");
const mongoose = require("mongoose");
// console.log(mongoose.connection.readyState); //logs 0
// mongoose.connection.on('connecting', () => {
//   console.log('connecting');
//   console.log(mongoose.connection.readyState); //logs 2
// });
// mongoose.connection.on('connected', () => {
//   console.log('connected');
//   console.log(mongoose.connection.readyState); //logs 1
// });
// mongoose.connection.on('disconnecting', () => {
//   console.log('disconnecting');
//   console.log(mongoose.connection.readyState); // logs 3
// });
// mongoose.connection.on('disconnected', () => {
//   console.log('disconnected');
//   console.log(mongoose.connection.readyState); //logs 0
// });
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
});

app.use(express.json())
app.use("/", userRouter);
app.use("/", cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
