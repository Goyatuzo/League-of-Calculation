var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data.js');
var ItemData = require('./../RiotAPI/item-data.js');
var api_constants = require('./../RiotAPI/api-constants.js');

/**
 * Given a champion name, get the path of the thumbnail. This function
 * will process the champion name so that it's formatted correctly.
 *
 * @param championName
 * @returns {string}
 */
function getChampionThumbnailPath(championName) {
    return api_constants.champThumbnailPathJade + ChampionData.stripNonLetters(championName) + '.png';
}

/**
 * Return the array of all
 *
 * @param itemList
 * @returns {Array}    The file path to the item thumbnail.
 */
function getItemThumbnailPaths(itemList) {
    "use strict";
    return (Object.keys(itemList)).map(function (element) {
        return api_constants.itemThumbnailPathJade + element + '.png';
    })
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
    ChampionData.getData(function (championData) {
        ItemData.getData(11, function (itemData) {
            youData = championData[you];
            enemyData = championData[enemy];

            res.render('builds', {
                youName:        youData['name'],
                enemyName:      enemyData['name'],
                youData:        youData,
                enemyData:      enemyData,
                items:          itemData,
                itemThumbnails: getItemThumbnailPaths(itemData),
                youThumbnail:   getChampionThumbnailPath(you),
                enemyThumbnail: getChampionThumbnailPath(enemy)
            });
        });
    });
});

module.exports = router;
