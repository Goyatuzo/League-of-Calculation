var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data.js');
var api_constants = require('./../RiotAPI/api-constants.js');
var champion = new ChampionData();

/**
 * Given a champion name, get the path of the thumbnail. This function
 * will process the champion name so that it's formatted correctly.
 *
 * @param championName
 * @returns {string}
 */
function getThumbnailPath(championName) {
    return api_constants.imageFilePathJade + champion.stripNonLetters(championName) + '.png';
}

/* GET users listing. */
router.get('/:yourChamp/:enemyChamp', function(req, res) {
    "use strict";
    var you = req.params['yourChamp'];
    var enemy = req.params['enemyChamp'];
    var youData;
    var enemyData;

    /*
     Get the champion's thumbnail path and champion data.
     */
    champion.getData(function (championData) {
        youData = championData[you];
        enemyData = championData[enemy];

        res.render('builds', {
            youName:        youData['name'],
            enemyName:      enemyData['name'],
            youData:        youData,
            enemyData:      enemyData,
            youThumbnail:   getThumbnailPath(you),
            enemyThumbnail: getThumbnailPath(enemy)
        });
    });
});

module.exports = router;
