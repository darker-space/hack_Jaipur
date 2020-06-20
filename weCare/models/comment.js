var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    content: String,
    authorName: String,
    authorType: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);