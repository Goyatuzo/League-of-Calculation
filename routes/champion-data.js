var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data');

var champion = new ChampionData();

/* This file will be located at /champion/:champion */
router.get('/:championName', function(req, res) {
    "use strict";

    // Obtain the champion to be queried.
    var champName = req.params['championName'];

    champion.getChampionData(champName, function (data) {
        res.json(data);
    })
});

module.exports = router;