/** Imports */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/** Importing mongoose user schema */
const User = require("../models/user");

/** Retrieve whole leaderboard */
router.get("/", (req, res, next) => {
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
            res.status(200).json(doc);
        });
});

/** Filtering leaderboard with respect to the specified country. */
router.get("/:country_iso_code", (req, res, next) => {
    const countryCode = req.params.country_iso_code;
    User.find({ country: countryCode })
        .select("rank points display_name country")
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
                console.log(doc);
            } else {
                res.status(400).json({
                    message: "There is no entry with the given country"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
