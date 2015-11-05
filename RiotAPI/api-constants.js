/**
 * @author  Yuto Otaguro
 */
var fs = require('fs');

const apiKey = process.env.apiKey;
const imagePath = 'resources/images/';
const jsonPath = 'resources/data/';

module.exports = {
    apiKey: apiKey,
    currentVersion: '5.21.1',
    champDataURL:   'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?',
    versionsURL:    'https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?',
    jsonFilePath:   './public/' + jsonPath,
    imageFilePath:  './public/' + imagePath,
    imageFilePathJade: '/' + imagePath
};