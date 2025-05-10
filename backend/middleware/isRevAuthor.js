const AppError = require('../utils/AppError')
const Review = require('../models/review')
const Campground = require('../models/campground')
const mongoose = require('mongoose');

const isRevAuthor = async (req, res, next) => {
    try {
        const { id, idRev } = req.params
        if (!mongoose.Types.ObjectId.isValid(idRev) || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid ID format', 400));
        }
        const review = await Review.findById(idRev)
        const camp = await Campground.findById(id)
        if (!camp) {
            return next(new AppError('Camping not found', 400));
        }
        if (!review) {
            return next(new AppError('Review not found', 400));
        }
        if (!req.user._id.equals(review.author)) {
            return next(new AppError('You are not the review author', 401))
        }
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = isRevAuthor