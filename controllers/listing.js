const Listing = require("../models/listings");


module.exports.index = (async(req,res)=>{
    const allListings = await Listing.find();
    res.render("./listing/index.ejs",{allListings});
});


module.exports.insertInDB = async(req,res)=>{ 
    let url = req.file.path;
    let filename = req.file.filename;
    const newListings = new Listing(req.body.listings);
    newListings.owner = req.user._id;
    newListings.image = {url,filename}
    await newListings.save(); 
    req.flash("success","New Listing Created!")   
    res.redirect("/listings");
}

module.exports.Edit = async(req,res)=>{
    let {id} = req.params;
    let show =await Listing.findById(id);
    if(!show){
        req.flash("error","Listing you requested for doen't Exist!")
        res.redirect("/listings")
    }
    let originalImage= show.image.url;
    originalImage = originalImage.replace("/upload","/upload/ar_1.0,c_fill,h_100,w_200/bo_2px_solid_lightblue")
    res.render("./listing/edit.ejs",{show,originalImage });
}
module.exports.Update = async(req,res)=>{ 
    let {id} = req.params;
    let show =await Listing.findByIdAndUpdate(id ,{...req.body.listings});
    if(typeof req.file !=="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        show.image = {url,filename};
        await show.save();
    }
    req.flash("success","Listing Updated!");   
    if(!show){
        req.flash("error","Listing you requested for doen't Exist!");
        res.redirect("/listings");
    }
    res.redirect(`/listings/${id}`);
}

module.exports.distroy = async(req,res)=>{
    let {id} = req.params;
    const deletes = await Listing.findByIdAndDelete(id);
    console.log(deletes);
    req.flash("success","Listing Deleted!");   
    res.redirect("/listings");
}

module.exports.show = async(req,res)=>{
    let {id} = req.params;
    let show = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!show){
        req.flash("error","Listing you requested for doen't Exist!");
        res.redirect("/listings");
    }
    res.render("./listing/show.ejs",{show});
};

module.exports.createNewListings = (req,res)=>{
    res.render("./listing/new.ejs");
}
module.exports.Privacy = (req,res)=>{
    res.render("./listing/privacy.ejs");
};
module.exports.TermsConditions = (req,res)=>{
    res.render("./listing/terms.ejs");
}