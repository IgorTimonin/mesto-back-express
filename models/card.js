const mongoose = require('mongoose');
const { linkRegExPattern } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [
        2,
        'Название должно быть длиннее 2-х символов, сейчас оно {VALUE} символов',
      ],
      maxlength: [
        30,
        'Название должно быть короче 30 символов, сейчас оно {VALUE} символов',
      ],
    },
    link: {
      type: String,
      required: true,
      validate: linkRegExPattern,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'user',
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('card', cardSchema);
