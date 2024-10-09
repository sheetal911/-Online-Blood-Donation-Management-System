const express = require('express');
const router = express.Router();
const requirementController = require('../controllers/requirementController');
const isLoggedIn = require('../controllers/middleware');

router.get('/', requirementController.requirements);
router.post('/create',isLoggedIn, requirementController.createRequirement);

module.exports = router;
