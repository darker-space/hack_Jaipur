var mongoose = require("mongoose");

var supplySchema = new mongoose.Schema({
    name: String,
    email: String,
    type: String, // sale or demand
    qualityTested: { type: String, default: "No" },
    quantity: { type: Number, default: 0 },
    specification: String,

    author: String,
    author_id: String,
    phoneNo: String
});

module.exports = mongoose.model("Supply", supplySchema);