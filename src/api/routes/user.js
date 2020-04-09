/** Imports */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/** Importing mongoose user schema */
const User = require("../models/user");

const globalVariables = require("../../app");

/** Retrieve whole user list */
router.get("/", (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        });
});

/** Posting a user to database */
router.post("/create", (req, res, next) => {
    User.find({ display_name: req.body.display_name }).exec((err, doc) => {
        if (doc.length === 0) {
            const user = new User({
                user_id: new mongoose.Types.ObjectId(),
                display_name: req.body.display_name,
                points: req.body.points,
                rank: req.body.rank,
                country: req.body.country
            });
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Handling POST request to /user"
                    });
                })
                .catch(err => console.log(err));
        } else {
            res.status(500).json({
                message: "The user already exist"
            });
        }
    });
});

/** Retrieve a user with respect to the given id */
router.get("/profile/:userID", (req, res, next) => {
    const id = req.params.userID;
    User.find({ user_id: id })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
                console.log(doc);
            } else {
                res.status(404).json({
                    message: "There is no user with the given ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
