/**
 * @author  Yuto Otaguro
 */
var fs = require('fs');

const apiKey = fs.readFileSync('./../RiotAPI/api-key.txt');

module.exports = {
    apiKey: apiKey,
    currentVersion: '5.22.1',
    champDataURL:   'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?',
    versionsURL:    'https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?',
    jsonFilePath:   '../public/resources/data/',
    imageFilePath:  '../public/resources/images/'
};