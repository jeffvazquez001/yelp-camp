const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware.js');
const campgrounds = require('../controllers/campgrounds.js');
//multer middleware encode the file upload to an object
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});
//MVC model views Controller to organize better the routes
//controllers the main login rendering views

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'),(req,res) => {
    //     //req.files is for upload array, req,file is for upload.single
    //     console.log(req.body,req.files);
    //     res.send('it worked');
    // })

//shows the user the new form
router.get('/new',isLoggedIn, campgrounds.renderNewForm);


router.route('/:id')
        .get(catchAsync(campgrounds.showCampground))
        .put(isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
        .delete(isAuthor, catchAsync(campgrounds.deleteCampground))


//gets edit form
router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;