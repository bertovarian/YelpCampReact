const AppError = require('../utils/AppError');
const { campgroundSchema } = require('../schemas');
const { cloudinary } = require('../cloudinary')

const isValidCamp = async (req, res, next) => {
    console.log('REQ BODY IN VALIDATION AREA ===>', req.body);
    console.log('NEW IMAGES IN VALIDATION AREA===>', req?.body?.newImagesCount);
    console.log('REQ FILES IN VALIDATION AREA ===>', req.files);
    console.log('THESE ARE THE DELETED IMAGES ===>', req?.body?.deletedImages?.split(","));
    const { error } = campgroundSchema.validate(req.body);

    if (error) {
        // Delete newly uploaded images if validation fails
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                await cloudinary.uploader.destroy(file.filename); // Delete image by public ID
            }
        }
        const msg = error.details.map(ele => ele.message).join(',');
        return next(new AppError(msg, 400));
    } else {
        next();
    }
};

module.exports = isValidCamp;