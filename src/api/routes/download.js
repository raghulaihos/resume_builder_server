const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const downloadController = require('../controllers/download');
const is_auth = require('../middleware/is_auth');

router.get(
    '/download',
    // is_auth,
    downloadController.streamer
)

module.exports = router;