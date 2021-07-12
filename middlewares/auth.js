const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');

const { JWT_SECRET = 'secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new AuthError('Необходима авторизация');
    next(error);
  }

  req.user = payload;

  next();
};
