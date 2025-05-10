const AppError = require('../utils/AppError');
const { cloudinary } = require('../cloudinary/index')

const imgCountPost = async (req, res, next) => {
    if (req.files && req.files.length > 6) {
        for (const file of req.files) {
            await cloudinary.uploader.destroy(file.filename); // Delete image by public ID
        }
        return next(new AppError('You can only upload a maximum of 6 images.', 400));
    }
    next();
};

module.exports = imgCountPost