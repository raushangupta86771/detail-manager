const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/mongodb+srv://raushan4442:passraus4344@cluster0.zawznjn.mongodb.net/detailmanager?retryWrites=true&w=majority?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to Mongo successfully......");
    })
}

module.exports = connectToMongo;
