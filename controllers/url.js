const shortid = require('shortid');
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body.longurl;
    // console.log(body);
    if (!body) {
        return res.json({ error: 'url is required' });
    }
    try {

        const existed = await URL.findOne({ redirectURL: body });

        if (existed) {
            const shortId = existed.shortID;
            if (shortId) {
                res.json({ id: shortId });
            } else {
                res.status(404).send('Entry not found');
            }
        } else {
            const shortId = shortid.generate();
            await URL.create({
                shortID: shortId,
                redirectURL: body,
            });
            return res.json({ id: shortId });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function redirect(req, res) {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOne({ shortID: shortId });

        if (entry) {
            await entry.save();
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('Entry not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    handleGenerateNewShortURL,
    redirect
};
