var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data');

/* GET home page. */
router.get('/', function(req, res) {
    ChampionData.getThumbnailPathsForJade(function (imagePaths) {
        "use strict";
        res.render('index', {
            imagePaths: imagePaths
        });
    });
});

module.exports = router;
