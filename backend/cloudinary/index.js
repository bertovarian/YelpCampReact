const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const AppError = require('../utils/AppError')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCampReact',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 1920, height: 1080, crop: 'limit' },
            { quality: 'auto' }, // Automatically adjust quality
            { fetch_format: 'auto' } // Automatically adjust format (e.g., WebP)
        ]
    }
});

const uploadFile = (req, res, next) => {
    const uploadProcess = upload.single('picture');

    uploadProcess(req, res, err => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err, 500));
        } else if (err) {
            return next(new AppError(err, 500));
        }
        next();
    });
};

module.exports = {
    cloudinary,
    storage,
    uploadFile
}