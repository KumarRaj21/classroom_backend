const mongoose = require("mongoose");

const connect = async () => {
    await mongoose.connect("mongodb+srv://kumarrajakonna8:Konnakumar@cluster0.fsua1.mongodb.net/").then(()=>{
        console.log("connected");
    }).catch((err)=>{
       console.log(err);  
    })
};

connect()
