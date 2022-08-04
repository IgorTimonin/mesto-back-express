const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [
        2,
        'Имя должно быть длиннее 2-х символов, сейчас оно {VALUE} символов',
      ],
      maxlength: [
        30,
        'Имя должно быть короче 30 символов, сейчас оно {VALUE} символов',
      ],
    },
    about: {
      type: String,
      required: true,
      minlength: [
        2,
        'Описание должно быть длиннее 2-х символов, сейчас оно {VALUE} символов',
      ],
      maxlength: [
        30,
        'Описание должно быть короче 30 символов, сейчас оно {VALUE} символов',
      ],
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('user', userSchema);
