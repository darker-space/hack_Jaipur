var mongoose = require("mongoose");
var plm = require("passport-local-mongoose");


var userSchema = mongoose.Schema({
    name: String,
    username: String,
    mobNo: String,
    usertype: String,
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    password: String
})

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);