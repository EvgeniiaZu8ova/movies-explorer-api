const { Joi } = require('celebrate');

const linkRegex = /https?:\/\/(www\.)?([\w\-]{1,}\.)([\w\.~:\/\?#\[\]@!\$&'\(\)\*\+,;=\-]{2,})#?/;

const messages = {
  userSearch: 'Пользователь по указанному _id не найден.',
  userUpdate: 'Переданы некорректные данные при обновлении профиля.',
  movieSearch: 'Фильм с указанным _id не найден.',
  movieDelete: 'Вы не можете удалять чужие фильмы.',
  movieCreate: 'Переданы некорректные данные при добавлении фильма.',
};

const updateUserJoiObj = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
});

const createMovieJoiObj = Joi.object().keys({
  country: Joi.string().required().min(2).max(30),
  director: Joi.string().required().min(2).max(30),
  duration: Joi.number().required(),
  year: Joi.string().required().min(4).max(4),
  description: Joi.string().required().min(1),
  image: Joi.string().required().pattern(linkRegex),
  trailer: Joi.string().required().pattern(linkRegex),
  nameRU: Joi.string().required().min(2).max(30),
  nameEN: Joi.string().required().min(2).max(30),
  thumbnail: Joi.string().required().pattern(linkRegex),
});

const findMovieJoiObj = Joi.object().keys({
  movieId: Joi.string().length(24).hex(),
});

module.exports = {
  linkRegex,
  messages,
  updateUserJoiObj,
  createMovieJoiObj,
  findMovieJoiObj,
};
