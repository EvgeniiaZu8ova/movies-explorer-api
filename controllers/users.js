const User = require('../models/user');

const SearchError = require('../errors/search-err');
const DataError = require('../errors/data-err');

const { messages } = require('../utils/utils');

const { userSearch, userUpdate } = messages;

async function getUserInfo(req, res, next) {
  const id = req.user._id;
  let user;

  try {
    user = await User.findById(id);

    if (!user) {
      throw new SearchError(userSearch);
    }

    res.send(user);
  } catch (e) {
    next(e);
  }
}

async function updateUser(req, res, next) {
  const id = req.user._id;
  const { name, email } = req.body;
  let user;

  try {
    user = await User.findByIdAndUpdate(
      id, { name, email }, {
        new: true,
        runValidators: true,
        upsert: false,
      },
    );

    if (!user) {
      throw new SearchError(userSearch);
    }

    res.send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const error = new DataError(userUpdate);
      next(error);
    }
    next(e);
  }
}

module.exports = {
  getUserInfo,
  updateUser,
};
