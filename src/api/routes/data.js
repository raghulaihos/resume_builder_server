const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const dataController = require('../controllers/data');
const is_auth = require('../middleware/is_auth');


router.post(
    '/form_submit',
    is_auth,
    dataController.form_submit
);

router.get(
    '/submit',
    // is_auth,
    dataController.formSubmit
);

router.get(
    '/fetch',
    // is_auth,
    dataController.dataFetch
);



module.exports = router;