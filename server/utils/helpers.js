const crypto = require('crypto')

exports.generateShortId = (length = 7) => {
    return crypto
        .randomBytes(length)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, length)
}