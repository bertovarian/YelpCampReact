const Campground = require('../models/campground')
const mongoose = require('mongoose');
const AppError = require('../utils/AppError')
const { cloudinary } = require('../cloudinary')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

const createCamp = async (req, res, next) => {
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.location,
            limit: 1
        }).send()
        if (geoData.body.features.length === 0) {
            return next(new AppError('Location not found, insert correct one!!', 404))
        }

        const camping = new Campground(req.body)
        console.log('MAPBOX TOKEN ===>', mapBoxToken)
        console.log('REQ BODY ===>', req.body)
        console.log('REQ FILES ===>', req.files)
        console.log('REQ USER ===>', req.user)
        camping.author = req.user._id
        camping.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
        camping.geometry = geoData.body.features[0].geometry
        await camping.save()
        res.status(200).send(camping)
    } catch (e) {
        next(e)
    }
}

const getAllCamp = async (req, res, next) => {
    try {
        const campings = await Campground.find({})
        res.status(200).send(campings)
    } catch (e) {
        next(e)
    }
}

const getOneCamp = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid ID format', 400));
        }
        const camping = await Campground.findById(id)
            .populate({
                path: 'review',
                populate: { path: 'author' }
            })
            .populate('author');
        if (!camping) {
            return next(new AppError('Camping not Found', 404))
        }
        res.status(200).send(camping)
    } catch (e) {
        next(e)
    }
}

const updateCamp = async (req, res, next) => {
    try {
        const { id } = req.params;
        const geoData = await geocoder.forwardGeocode({
            query: req.body.location,
            limit: 1
        }).send()
        if (geoData.body.features.length === 0) {
            return next(new AppError('Location not found, insert correct one!!', 404))
        }

        // Find the campground
        const camping = await Campground.findById(id);

        // Updates the location
        camping.geometry = geoData.body.features[0].geometry

        // Parse deleted images from the request body
        const deletedImages = req.body.deletedImages ? req.body.deletedImages.split(",") : [];

        // Calculate the remaining images after deletion
        const remainingImages = camping.image.filter(img => !deletedImages.includes(img.filename));

        // Add new images from the request
        const newImages = req.files.map(ele => ({ url: ele.path, filename: ele.filename }));

        // Update the campground with new images
        camping.image = [...remainingImages, ...newImages];
        await camping.save();

        // Delete images from Cloudinary if specified
        for (let filename of deletedImages) {
            await cloudinary.uploader.destroy(filename);
        }

        // Update other campground fields
        await camping.updateOne(req.body, { runValidators: true });

        res.status(200).send(camping);
    } catch (e) {
        next(e);
    }
};

const deleteCamp = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid ID format', 400));
        }
        const camping = await Campground.findByIdAndDelete(id)
        if (!camping) {
            return next(new AppError('Camping not Found to erase', 404))
        }
        for (let ele of camping.image) {
            await cloudinary.uploader.destroy(ele.filename);
        }
        res.status(200).send(camping)
    } catch (e) {
        next(e)
    }
}


module.exports = { createCamp, getAllCamp, getOneCamp, updateCamp, deleteCamp }