const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const searchController = require('../controllers/search');
const is_auth = require('../middleware/is_auth');


router.get('/test', is_auth, searchController.search);
router.get('/', searchController.welcome);

module.exports = router; 