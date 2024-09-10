const { default: mongoose } = require("mongoose");

const customSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})

const URL = mongoose.model("URL", customSchema)

module.exports = URL