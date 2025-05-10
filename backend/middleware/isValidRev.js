const AppError = require('../utils/AppError')
const { reviewSchema } = require('../schemas')

const isValidRev = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
}

module.exports = isValidRev