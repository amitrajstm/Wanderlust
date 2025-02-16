if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
let ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const app = express();

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js"); 
const userRouter = require("./routes/user.js");
const { error } = require("console");

const port = 8080;
app.engine("ejs", ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const ATLAS_DB_URL = process.env.ATLAS_URL;

main().then(()=>{
    console.log("Connections Successful with DB");
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect(ATLAS_DB_URL);
}

const store = MongoStore.create({
    mongoUrl: ATLAS_DB_URL,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 3600, // Reduces session update frequency
});
store.on("error", (err) => {
    console.log("ERROR in Mongo Session Store:", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires :Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge : 7 * 24 * 60 * 60 *1000,
        httpOnly:true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/" , userRouter);

app.get("/",(req,res)=>{
    res.redirect("/listings");
});
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"The page you're looking for doesn't exist."));
});
  
app.use((err,req,res,next)=>{

    let {statusCode = 500 , message = "Somethig went wrong!"} = err;
    res.status(statusCode).render("./listing/AllErrors.ejs",{statusCode,message});
    
});

// Sever Connections 
app.listen(port,()=>{
    console.log(`Sever is Listing on port : ${port}`);
})
