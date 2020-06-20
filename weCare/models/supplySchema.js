var mongoose = require("mongoose");

var supplySchema = new mongoose.Schema({
    name: String,
    qualityTested: { type: String, default: "No" },
    quantity: { type: Number, default: 0 }
});

module.exports = supplySchema;