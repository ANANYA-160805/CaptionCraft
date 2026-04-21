const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL )

    .then(() => {
        console.log("connected to database");
    })
    .catch(err=>{
        console.log("error connecting to database", err);
    })
}

module.exports=connectDB;
