const express = require('express');
const router = express.Router();

const attractionsController = require('../controllers/attractions.controller');
const attractionsValidator = require('../validators/attractions.vaildators')

router.get('/getattractions', attractionsValidator.getAttractionsValidator,
    attractionsController.getAttractions);

module.exports = router;