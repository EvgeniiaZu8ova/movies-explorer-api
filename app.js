require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');

const {
  portVar, mongoConfig, corsConfig, signupJoiObj, signinJoiObj,
} = require('./utils/utils');

const { handleFinalErrors } = require('./utils/errors-handler');

const { PORT = portVar } = process.env;

const { createUser, login, logout } = require('./controllers/users');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const SearchError = require('./errors/search-err');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', mongoConfig);

const app = express();

app.use(cors(corsConfig));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({ body: signupJoiObj }), createUser);
app.post('/signin', celebrate({ body: signinJoiObj }), login);
app.post('/signout', auth, logout);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use('*', auth, () => {
  throw new SearchError('Страницы по запрашиваемому адресу не существует');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  handleFinalErrors(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
