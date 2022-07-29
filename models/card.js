const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  like: [{
    type: ObjectId
  }],
  createdAt: {
    type: Date,
  },
});
module.exports = mongoose.model("card", cardSchema);
