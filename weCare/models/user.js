var mongoose = require("mongoose");
var supplySchema = require("./supplySchema.js");

var plm = require("passport-local-mongoose");


var userSchema = mongoose.Schema({
    name: String,
    username: String, //email
    password: String,

    userType: { type: String, default: "patient" }, //doctor, patient, supplier,hospital owner

    //if hospital ownwer
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },

    //if supplier
    demand: [supplySchema],

    //if doctor
    age: Number,
    gender: String,
    specialist: String,
    qualification: [String],
    experience: Number,
    achievement: String


})

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);