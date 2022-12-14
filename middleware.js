const {campgroundSchema,reviewSchema} = require('./schemas.js');
const ExpressError = require('./utilities/ExpressError');
const Campground = require('./models/campground');//Campground model
const Review = require('./models/review');

module.exports.isLoggedIn = (req,res,next) => {
  // console.log("REQ.USER...", req.user);
    if(!req.isAuthenticated()) {
    //  console.log(req.path,req.originalUrl);
     req.session.returnTo  = req.originalUrl;
      req.flash('error','you must be signed in');
      return res.redirect('/login');
      }
      next();
}

//validating campground
module.exports.validateCampground = (req, res, next) => {
  const {error} = campgroundSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg , 400)
  }  else {
      next();
  }
}

//isAuthor
module.exports.isAuthor = async(req, res, next) => {
 const { id } = req.params;
const campground = await Campground.findById(id);
if(!campground.author.equals(req.user._id)) {
 req.flash('error','you dont have permission to do that');
return res.redirect(`/campgrounds/${id}`);
}
next();
}

//isReviewAuthor
module.exports.isReviewAuthor = async(req, res, next) => {
  const { id, reviewId } = req.params;
 const review = await Review.findById(reviewId);
 if (!review.author.equals(req.user._id)) {
  req.flash('error','you dont have permission to do that');
 return res.redirect(`/campgrounds/${id}`);
 }
 next();
 }

//validating review
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg , 400)
  }    else {
      next();
  }
}
 
