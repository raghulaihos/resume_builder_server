const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const dataController = require('../controllers/user_data');

router.post(
    '/submit',
    dataController.formSubmit
)

router.post(
    '/fetch',
    dataController.dataFetch
)

module.exports = router;