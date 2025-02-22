const User = require("../models/user")
module.exports.RenderSignup = (req,res)=>{
    res.render("./user/signup.ejs");
}

module.exports.Signup = async(req,res)=>{
    try {
        let {username , email , password } = req.body; 
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");
        });        
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");    
    }        
};

module.exports.randerLoginPage = (req,res)=>{
    res.render("./user/login.ejs");
};
module.exports.SignIn = async(req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    const redirectUrl =res.locals.redirectURL || "/listings"; 
    delete res.locals.redirectURL; // Clean up the session        
    res.redirect(redirectUrl);
};
module.exports.LogOut = (req,res,next)=>{
    req.logout((error)=>{
        if(error){
            return next(error);
        }
        req.flash("success","Logout Successfull!!");
        res.redirect("/listings");
    })
}; 