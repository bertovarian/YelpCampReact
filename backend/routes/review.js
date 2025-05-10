const express = require('express');
const router = express.Router({ mergeParams: true })
const isLoggedIn = require('../middleware/isLoggedIn.js');
const isRevAuthor = require('../middleware/isRevAuthor.js')
const isValidRev = require('../middleware/isValidRev.js');
const { createReview, deleteReview } = require('../controllers/reviewController.js');

// **********************************
// CREATE REVIEW - creates a new review
// **********************************
router.post('/', isLoggedIn, isValidRev, createReview)

// **********************************
// DELETE REVIEW - deletes a review
// **********************************
router.delete('/:idRev', isLoggedIn, isRevAuthor, deleteReview)

module.exports = router

