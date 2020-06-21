var mongoose = require("mongoose");

var supplySchema = new mongoose.Schema({
    name: String,
    type: String, // sale or demand
    qualityTested: { type: String, default: "No" },
    quantity: { type: Number, default: 0 },
    specification: String
});

module.exports = mongoose.model("Supply", supplySchema);