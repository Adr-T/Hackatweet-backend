var express = require("express");
var router = express.Router();
require("../models/connection");

const Trend = require("../models/trends");

router.post("/newHashtag", (req, res) => {
    const newHashtag = new Hashtag({
        hashtag: req.body.hashtag,
    });

    newTweet.save().then((data) => {
        res.json({ hashtag: data });
    });
});

router.get("/allHashtags", (req, res) => {
    Hashtag.find().then((data) => {
        res.json([data]);
    });
});

module.exports = router;
