var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data');

var champion = new ChampionData();

/* GET home page. */
router.get('/', function(req, res) {
    champion.getThumbnailPathsForJade(function (imagePaths) {
        "use strict";
        res.render('index', {
            imagePaths: imagePaths
        });
    });
});

module.exports = router;
