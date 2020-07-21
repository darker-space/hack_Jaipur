var mongoose = require("mongoose");

var URI = "mongodb+srv://aakash:aakash@wecaredatabase.61czq.mongodb.net/weCareDatabase?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected...");
}

module.exports = connectDB;