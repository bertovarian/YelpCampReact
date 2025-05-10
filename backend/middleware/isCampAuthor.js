const AppError = require('../utils/AppError')
const mongoose = require('mongoose');
const Campground = require('../models/campground')

const isCampAuthor = async (req, res, next) => {
    console.log('REQ BODY IN CAMP AUTHOR===>', req.body)
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid ID format', 400));
    }
    const camp = await Campground.findById(id)
    if (!camp) {
        return next(new AppError('Camping not found', 400));
    }
    if (!req.user._id.equals(camp.author)) {
        return next(new AppError('Sorry you are not an author of the camping', 401))
    }
    next()
}

module.exports = isCampAuthor