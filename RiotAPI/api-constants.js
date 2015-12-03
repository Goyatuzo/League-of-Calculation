/**
 * @author  Yuto Otaguro
 */
var fs = require('fs');

const apiKey = process.env.apiKey;
const imagePath = 'resources/images/';
const jsonPath = 'resources/data/';
const staticEndpoint = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/';
const dataDragonImageEndpoint = 'http://ddragon.leagueoflegends.com/cdn/5.23.1/img/';

module.exports = {
    apiKey: apiKey,
    // API Endpoint constants.
    champDataURL:   staticEndpoint + 'champion?',
    versionsURL:    staticEndpoint + 'versions?',
    itemURL:        staticEndpoint + 'item?',
    // Data Dragon constants.
    champThumbnailURL: dataDragonImageEndpoint + 'champion/',
    itemThumbnailURL: dataDragonImageEndpoint + 'item/',
    // Local JSON file path.
    jsonFilePath:   './public/' + jsonPath,
    // Champion thumbnail paths.
    champThumbnailPath:  './public/' + imagePath + 'champions/',
    champThumbnailPathJade: '/' + imagePath + 'champions/',
    // Item thumbnail paths.
    itemThumbnailPath: dataDragonImageEndpoint + 'item/',
    itemThumbnailPathJade: dataDragonImageEndpoint + 'item/'
};