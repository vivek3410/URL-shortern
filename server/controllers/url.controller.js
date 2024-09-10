const { validationResult } = require("express-validator");
const { generateShortId } = require("../utils/helpers");
const URL = require('../models/url.model');
const client = require("../config/redis");

const urlCtrl = {
    shortenUrl,
    getOriginalUrl
}

module.exports = urlCtrl
async function shortenUrl(req, res) {
    try {
        console.log(req.body);
        const errors = validationResult(req.body)
        if (!errors.isEmpty()) {
            console.log("error");
            let err = errors.array();
            return res.status(400).json({ errors: err[0].msg })
        }

        const { originalUrl } = req.body;
        const shortUrl = generateShortId()

        const existingUrl = await URL.findOne({ shortUrl })

        if (existingUrl) {
            return res.status(400).json({ message: "Short URL already exists." })
        }

        let url = new URL({
            originalUrl,
            shortUrl
        })

        await url.save()
        await client.setEx(shortUrl, 3600, originalUrl); //Store the original url in Redis

        res.status(201).json({ shortUrl })
    } catch (e) {
        console.error(e)

        res.status(500).json({ message: "Server error: ", error: e.message })
    }
}

async function getOriginalUrl(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = errors.array()
            return res.status(400).json({ errors: err[0].msg })
        }

        const { shortUrl } = req.body;

        const cachedUrl = await client.get(shortUrl);

        if (cachedUrl) {
            return res.status(201).json({ originalUrl: cachedUrl })
        }

        const url = await URL.findOne({ shortUrl })
        if (url) {
            await client.setEx(shortUrl, 3600, url.originalUrl)
            return res.status(201).json({ originalUrl: url.originalUrl })
        } else {
            return res.status(404).json({ message: "Shortened URL not found." })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error", error: e.message })
    }
}