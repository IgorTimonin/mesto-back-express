const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
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
      default: 'Исследователь',
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
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [
        8,
        'Пароль должен быть длиннее 8-ми символов, сейчас его длина {VALUE} символов',
      ],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
