const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router =  express.Router();
const User =  require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const controllerUser = require("../controllers/user.js")

// SignUP Routers
router.route("/signup")
.get(controllerUser.RenderSignup)
.post(wrapAsync(controllerUser.Signup));

// LogIn Router

router.route("/login")
.get (controllerUser.randerLoginPage)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }
),(controllerUser.SignIn)
);

// Log Out Routers 
router.get("/logout",controllerUser.LogOut) 


module.exports = router;