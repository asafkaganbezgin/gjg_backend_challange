/** Imports */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/** Importing user score schema */
const User = require("../models/user");

/** Posting a user score */
router.post("/submit", async (req, res, next) => {
    let currentPoints;
    await User.findOne({ user_id: req.body.user_id }, function(err, user) {})
        .exec()
        .then(doc => {
            currentPoints = doc.points;
            console.log(currentPoints);
            console.log(req.body.score_worth);
        })
        .catch(err => {
            res.status(500).json({
                message: "User not found"
            });
        });
    await User.updateOne(
        { user_id: req.body.user_id },
        { points: currentPoints + req.body.score_worth }
    )
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Points updated"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Couldn't update points"
            });
        });
    User.find()
        .lean()
        .sort("-points")
        .select("rank points display_name country")
        .exec((err, doc) => {
            for (var i = 0; i < doc.length; i++) {
                User.updateOne(
                    { display_name: doc[i].display_name },
                    { rank: i + 1 }
                )
                    .lean()
                    .exec();
            }
        });
});

module.exports = router;
