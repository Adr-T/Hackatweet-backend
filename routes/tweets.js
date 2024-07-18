var express = require("express");
var router = express.Router();
require("../models/connection");

const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

router.post("/postTweet", (req, res) => {
    if (!checkBody(req.body, ["username", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }

    const newTweet = new Tweet({
        username: req.body.username,
        tweetContent: req.body.tweetContent,
        publicationDate: moment(Date.now).format("YYYY-MM-DD HH:mm"),
    });

    newTweet.save().then((data) => {
        res.json({ tweet: data });
    });
});

router.post("/updateTweet", (req, res) => {
    Tweet.findById(req.body._id).then((data) => {
        if (data) {
            res.json({ result: true, tweetContent: data.tweetContent });
        } else {
            res.json({
                result: false,
                error: "Tweet not found you damn fool !",
            });
        }
    });
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
