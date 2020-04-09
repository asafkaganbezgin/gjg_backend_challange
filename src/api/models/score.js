const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
    score_worth: { type: Number, require: true },
    user_id: {
        type: String,
        ref: "User",
        require: true
    },
    timestamp: { type: Number, require: true }
});

module.exports = mongoose.model("Score", scoreSchema);
