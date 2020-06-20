var mongoose = require("mongoose");
var commentSchema = require("./commentSchema.js");
var supplySchema = require("./supplySchema.js");


var hospitalSchema = mongoose.Schema({
    regNo: String,
    name: String,
    picture: String,
    description: String,
    address: String,

    totalDoc: Number,
    availDoc: Number,
    doctorArr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    totalBed: Number,
    availBed: Number,
    cost: Number,

    isCorona: { type: String, default: "No" },

    facility: [String],

    comment: [commentSchema],
    commentNo: { type: Number, default: 0 },

    ratingArr: [String],
    rating: { type: Number, default: 0 },

    demand: [supplySchema],


    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("hospital", hospitalSchema);