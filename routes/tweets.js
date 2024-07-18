var express = require("express");
var router = express.Router();
require("../models/connection");

var moment = require("moment");

const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

router.post("/newTweet", (req, res) => {
    if (!checkBody(req.body, ["tweetContent"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }

    const newTweet = new Tweet({
        creator: req.body.creator,
        tweetContent: req.body.tweetContent,
        publicationDate: moment(Date.now()).format("YYYY-MM-DD HH:mm"),
        likes: req.body.likes,
    });

    newTweet.save().then((data) => {
        res.json({ tweet: data });
    });
});

router.post("/updateTweet", (req, res) => {
    Tweet.updateOne({ _id: req.body._id }, { likes: req.body.likes }).then(
        (data) => {
            Tweet.find().then((data) => {
                if (data) {
                    res.json({ result: true, tweet: data });
                } else {
                    res.json({
                        result: false,
                        error: "Tweet not found you damn fool !",
                    });
                }
            });
        }
    );
});

router.get("/getAllTweet", (req, res) => {
    Tweet.find().then((data) => {
        res.json({ tweets: data });
    });
});

router.get("/delTweet", (req, res) => {
    Tweet.deleteOne({_id: req.body._id}).then((data) => {
        if (data.deletedCount > 0) {
            Tweet.find().then((data) => {
                res.json({ result: true,  data });
            });
        } else {
            res.json({ result: false, error: "You gonna get cancelled" });
        }
    });
});

module.exports = router;
