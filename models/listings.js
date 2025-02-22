const mongoose = require("mongoose");
const { types, ref, required } = require("joi");
const { listingSchema } = require("../schema");
const Review = require("./reviews.js");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title:{
        type : String,
        required: true,
        trim: true,
    },
    description :{
        type : String,
        required: true,
    },
    image:{
        url:String,   
        filename:String,
    },
    price : {
        type : Number,
        required: true,
        min : 1,
    },
    location :{
        type : String,
        required: true
    },
    country:{
        type:String,
        required:true,
    }, 
    reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});
// Correct the middleware
ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;