const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    tweetContent: String,
    publicationDate: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
