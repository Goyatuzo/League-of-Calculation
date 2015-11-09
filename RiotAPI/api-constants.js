/**
 * @author  Yuto Otaguro
 */
var fs = require('fs');

const apiKey = process.env.apiKey;
const imagePath = 'resources/images/';
const jsonPath = 'resources/data/';
const staticEndpoint = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/';

module.exports = {
    apiKey: apiKey,
    currentVersion: '5.21.1',
    champDataURL:   staticEndpoint + 'champion?',
    versionsURL:    staticEndpoint + 'versions?',
    jsonFilePath:   './public/' + jsonPath,
    champThumbnailPath:  './public/' + imagePath + 'champions/',
    champThumbnailPathJade: '/' + imagePath + 'champions/'
};