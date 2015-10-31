/**
 * @author  Yuto Otaguro
 */
var fs = require('fs');

const apiKey = fs.readFileSync('RiotAPI/api-key.txt');

module.exports = {
    apiKey: apiKey,
    jsonFilePath: 'public/resources/data/',
    imageFilePath: 'public/resources/data/'
};