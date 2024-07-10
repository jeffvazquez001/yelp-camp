const express = require('express')
const router = express.Router({mergeParams: true});
//models
const Review = require('../models/review.js')
const Campground = require('../models/campground');
const review = require('../controllers/reviews.js')
//middleware
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware.js')

//to create a review
router.post('/',isLoggedIn,validateReview, catchAsync(review.createReview))
//to delete a review
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router;