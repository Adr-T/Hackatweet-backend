const mongoose = require("mongoose");

const trendSchema = mongoose.Schema({
    hashtag : [String]
});

const Tweet = mongoose.model("trends", trendSchema);

module.exports = Trend;