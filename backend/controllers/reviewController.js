const Review = require('../models/review')
const Campground = require('../models/campground')

const createReview = async (req, res, next) => {
    try {
        const { id } = req.params
        const newCamp = await Campground.findById(id)
        const review = new Review(req.body.review)
        review.author = req.user._id
        newCamp.review.push(review)
        await newCamp.save()
        await review.save()
        const newCampPop = await Campground.findById(id)
            .populate({
                path: 'review',
                populate: { path: 'author' }
            })
            .populate('author');
        res.status(200).send(newCampPop)
    }
    catch (e) {
        next(e)
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const { id, idRev } = req.params;
        await Review.findByIdAndDelete(idRev)
        await Campground.findByIdAndUpdate(id, { $pull: { review: idRev } })
        const remainCamp = await Campground.findById(id)
            .populate({
                path: 'review',
                populate: { path: 'author' }
            })
            .populate('author');
        res.status(200).send(remainCamp)
    } catch (e) {
        next(e)
    }
}

module.exports = { createReview, deleteReview }