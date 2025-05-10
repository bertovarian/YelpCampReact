//const AppError = require('../utils/AppError');
const express = require('express');
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn');
const isCampAuthor = require('../middleware/isCampAuthor');
const isValidCamp = require('../middleware/isValidCamp');
const imgCountEdit = require('../middleware/imgCountEdit');
const imgCountPost = require('../middleware/imgCountPost');
const { createCamp, getAllCamp, getOneCamp, updateCamp, deleteCamp }
    = require('../controllers/campController');
const multer = require('multer')
//const { cloudinary } = require('../cloudinary/index')
const { storage } = require('../cloudinary/index');
const upload = multer({
    storage,
    limits: { fileSize: 5000000 } // 5MB limit photo size
});


// **********************************
// CREATE - creates a new campground
// **********************************
router.post('/', isLoggedIn, upload.array('image'), imgCountPost, isValidCamp, createCamp)

// **********************************
// INDEX - all the campgrounds
// **********************************
router.get('/', getAllCamp)

// **********************************
// SHOW - show a specific campground
// **********************************
router.get('/:id', getOneCamp)

// **********************************
// UPDATE - update one of the campgrounds
// **********************************
router.patch('/:id', isLoggedIn, isCampAuthor, upload.array('image'), imgCountEdit, isValidCamp, updateCamp)

// **********************************
// DELETE - destroys a specific campground
// **********************************
router.delete('/:id', isLoggedIn, isCampAuthor, deleteCamp)

module.exports = router
