const Campground = require('../models/campground');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const { cloudinary } = require('../cloudinary')


const imgCountEdit = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the campground ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid ID format', 400));
        }

        // Find the campground
        const camping = await Campground.findById(id);
        if (!camping) {
            return next(new AppError('Campground not found to update', 404));
        }

        // Parse deleted images from the request body
        const deletedImages = req.body.deletedImages ? req.body.deletedImages.split(",") : [];

        // Calculate the remaining images after deletion
        const remainingImages = camping.image.filter(img => !deletedImages.includes(img.filename));

        // Check the number of new images in the request
        const newImagesCount = req.files ? req.files.length : 0;

        // Calculate the total number of images
        const totalImages = remainingImages.length + newImagesCount;

        // Enforce the 6-image limit
        console.log('Total images:', totalImages);
        if (totalImages > 6) {
            // Delete the newly uploaded images from Cloudinary to prevent unnecessary storage
            for (const file of req.files) {
                await cloudinary.uploader.destroy(file.filename);
            }
            return next(new AppError('You can only have a maximum of 6 images per campground.', 400));
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = imgCountEdit;


