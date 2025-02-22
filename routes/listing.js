const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listings");
const {listingSchema} = require("../schema.js");
const router =  express.Router();
const {isLoggedIn ,isOwner} = require("../middleware.js")
const listingControllers = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage})

// Check Valiate Schema  for ListingSchema
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body.listing);
    if(error){  
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg); 
    } else {
        next(); 
    }
};

// Privacy&Policy Routes 
router.get("/privacy" , listingControllers.Privacy)

// Terms&Conditions Routes
router.get("/terms" ,listingControllers.TermsConditions)

router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn,upload.single("listings[image]"),validateListing,wrapAsync(listingControllers.insertInDB));

// Create New Listings
router.get("/new",isLoggedIn,(listingControllers.createNewListings));

router.route("/:id")
.put(isLoggedIn,isOwner,upload.single("listings[image]"),validateListing,wrapAsync(listingControllers.Update))
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.distroy))
.get(wrapAsync(listingControllers.show));

// Edit Routes
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.Edit));

module.exports =router;