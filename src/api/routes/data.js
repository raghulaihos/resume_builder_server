const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const dataController = require('../controllers/data');
const is_auth = require('../middleware/is_auth');


router.post(
    '/form_submit',
    dataController.form_submit
);

router.get(
    '/submit',
    is_auth,
    dataController.formSubmit
);

router.get(
    '/fetch',
    dataController.dataFetch
);

router.get(
    '/tester',
    dataController.tester
);


module.exports = router;