const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
    publicationDate: Date,
    username: String,
    tweetContent: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;