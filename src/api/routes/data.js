const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const dataController = require('../controllers/data');
const is_auth = require('../middleware/is_auth');


router.post(
    '/submit',
    is_auth,
    dataController.formSubmit
)

// router.post(
//     '/fetch',
//     dataController.dataFetch
// )

module.exports = router;