const jwt = require('jsonwebtoken')
const User = require('../models/user')
const AppError = require('../utils/AppError')

const isLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return next(new AppError('Authorization token required', 401));
    }
    const token = authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id }).select('_id')
    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return next(new AppError('Your session has expired. Please log in again.', 401));
    }
    next(e)
  }
}

module.exports = isLoggedIn