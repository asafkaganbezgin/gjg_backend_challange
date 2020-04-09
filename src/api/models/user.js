const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId },
    display_name: { type: String, require: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    country: { type: String, require: true }
});

module.exports = mongoose.model("User", userSchema);
