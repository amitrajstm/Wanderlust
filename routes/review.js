const express = require("express");
const router =  express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviweSchema} = require("../schema.js");
const Review = require("../models/reviews");
const Listing = require("../models/listings");
const {isLoggedIn,isReviewAuthor} = require("../middleware.js")

const constrolleReview = require("../controllers/review.js");


// Check Valiate Schema  for ReviewSchema
const validateReview = (req, res, next) => {
    let {error} = reviweSchema.validate(req.body.listing);
    if(error){  
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg); 
    } else {
        next(); 
    }
};

router.post("/" ,isLoggedIn,validateReview,wrapAsync(constrolleReview.createNewReview)); 
// Delete Data for Reviews Routes
router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor,wrapAsync(constrolleReview.distoyReview));
module.exports = router;