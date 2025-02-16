const mongoose = require("mongoose");
const Listing = require("../models/listings.js")
const listData = require("./data.js");
main().then(()=>{
  console.log("Connection Succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

let initDB = async ()=>{
    await Listing.deleteMany({});
    listData.data = listData.data.map((obj)=>({...obj,owner:'678ed85a3eb34d5c6e06e8b3'}));
    await Listing.insertMany(listData.data);
    console.log("Data was Initilized");
    
}
initDB();