require('dotenv').config();

const SECRET_KEY_DEV = 'secret-key';

const {
  PORT = 4000, NODE_ENV = 'development', JWT_SECRET = SECRET_KEY_DEV,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const cookieConfig = {
  maxAge: 3600000,
  httpOnly: true,
  sameSite: true,
};

const corsConfig = {
  origin: true,
  exposedHeaders: '*',
  credentials: true,
};

module.exports = {
  SECRET_KEY_DEV,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  mongoConfig,
  cookieConfig,
  corsConfig,
};
