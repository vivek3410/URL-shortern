const express = require('express')
const urlShortenRateLimiter = require('../middleware/rate-limit.middleware')
const { body, param } = require('express-validator')
const urlCtrl = require('../controllers/url.controller')

const router = express.Router()

module.exports = router

router.post('/shorten',
    urlShortenRateLimiter,
    [body('originalUrl')
        .isURL({ require_protocol: true, require_tld: true })
        .withMessage("Original url is empty or in valid format")
        .trim(),
    ],
    urlCtrl.shortenUrl
)

router.get('/:shortUrl',
    [
        param('shortUrl')
            .isLength({ min: 1 })
            .withMessage("Short URL code is required")
            .trim()
            .escape()
    ],
    urlCtrl.getOriginalUrl
)

module.exports = router