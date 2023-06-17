const express = require('express');
const { handleGenerateNewShortURL, redirect } = require("../controllers/url");

const router = express.Router();

router.post('/data', handleGenerateNewShortURL);

router.get('/:shortId',redirect);

module.exports = router;