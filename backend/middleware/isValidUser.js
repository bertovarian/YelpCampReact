const AppError = require('../utils/AppError')
const { userSchema } = require('../schemas')

const isValidUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return next(new AppError(msg, 400))
    } else {
        next();
    }
}

module.exports = isValidUser