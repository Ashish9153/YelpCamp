const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload= multer({ storage });
const Campground = require('../models/campground');//Campground model






//making campground
router.get('/', catchAsync(campgrounds.index));

//making new campgrounds
router.get('/new', isLoggedIn, campgrounds.renderNewForm);


//posting the above new get route to be submitted
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// router.post('/', upload.array('image'), (req,res) => {
//  console.log(req.body, req.files);
//  res.send('it worked');
// });

//for show route
router.get('/:id', catchAsync(campgrounds.showCampground));


// to edit the form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

//post route for editied form
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

//delete route 
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;