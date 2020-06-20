var mongoose = require("mongoose");
var commentSchema = require("./commentSchema.js")

var hospitalSchema = mongoose.Schema({
    name: String,
    picture: String,
    content: String,
    authorName: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    doctorNo: Number,
    comment: [commentSchema],
    commentNo: { type: Number, default: 0 },
    likes: [String],
    likesNo: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("hospital", hospitalSchema);