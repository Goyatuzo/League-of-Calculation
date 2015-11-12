/**
 * @author  Yuto Otaguro
 */
"use strict";

var fs = require('fs');
var api_constants = require('./api-constants');
var mkdirp = require('mkdirp');
var fileFuncs = require('./file-functions');

/**
 * Connect to the RiotAPI and request data; afterwards save it locally onto the server.
 */
exports.requestFromRiot = function requestFromRiot () {
    console.log("Initializing Champion data retrieval.");

    var dataURL = api_constants.champDataURL + 'champData=all&api_key=' + api_constants.apiKey;

    fileFuncs.retrieveAndProcessJson(dataURL, function (raw_body) {
        var bodyJSON = JSON.parse(raw_body);

        _saveData(raw_body);
        _saveThumbnailsFromData(bodyJSON['data']);
    });
};

/**
 * If necessary, the data will be written to the disk. There are two conditions where the data
 * will be stored locally:
 *  * If the file doesn't exist.
 *  * If the versions are different, it means the server has the newer version, so it must be updated.
 *
 * @param raw_body
 * @private
 */
function _saveData(raw_body) {
    var filePath = api_constants.jsonFilePath + 'championData.json';
    var bodyJSON = JSON.parse(raw_body);

    // Check the folder exists.
    fileFuncs.checkFolder(api_constants.jsonFilePath);

    // Read the file to compare the two.
    fs.readFile(filePath, function (file_err, file_data) {

        // If the file couldn't be retrieved, it doesn't exist. So write. Otherwise, check versions.
        if ((file_data === undefined) || (JSON.parse(file_data)['version'] !== bodyJSON['version'])) {
            console.log("Champion data versions don't match. Updating...");
            fs.writeFile(filePath, raw_body, function () {
                console.log("Wrote champion JSON file.");
            });
            console.log('Champion Data successfully saved.');
        }
    });
}

/**
 * Given the input dataJSON file, save the champion thumbnails as they are located and named
 * on the Data Dragon server from RIOT.
 *
 * @param dataJSON
 * @private
 */
function _saveThumbnailsFromData(dataJSON) {
    // Location where the image will be stored.
    var filePath;
    // The name of the thumbnail it's stored as on DDragon.
    var thumbnailName;
    // The URL of the thumbnail.
    var thumbnailURL;

    // Check to see the folder path exists, if not create.
    fileFuncs.checkFolder(api_constants.champThumbnailPath);

    console.log("Saving thumbnail images.");
    for (var champion in dataJSON) {
        if (dataJSON.hasOwnProperty(champion)) {
            thumbnailName = dataJSON[champion]['image']['full'];
            // Construct the URL where the thumbnail is stored.
            thumbnailURL = api_constants.champThumbnailURL + thumbnailName;

            fileFuncs.retrieveAndProcessImage(thumbnailURL, function (fileName, image) {
                filePath = api_constants.champThumbnailPath + fileName;

                fs.writeFile(filePath, image, { encoding: 'binary' }, function (err) {
                    if (err) {
                        console.log("\t" + fileName + " already exists.");
                        return;
                    }

                    console.log("\tThumbnail " + fileName + " was saved.");
                })
            });
        }
    }
}

/**
 * Obtain locally stored champion data for all champions.
 *
 * @param callback
 */
exports.getData = function getData(callback) {
    "use strict";

    // Where the local copy of the API should be stored.
    var filePath = api_constants.jsonFilePath + 'championData.json';

    // Must parse the data as a JSON object, and these variables will store them as such.
    var dataJSON;

    fs.readFile(filePath, function (file_err, file_data) {
        // Parse the file and obtain the JSON only if the file is valid.p
        if (file_data !== undefined) {
            console.log("Parsing local champion static data...");
            dataJSON = JSON.parse(file_data);

            callback(dataJSON['data']);
        }
    });
};

/**
 * Get an array of SORTED paths to thumbnail images for each champion. This is primarily for jade.
 *
 * @param callback
 */
exports.getThumbnailPathsForJade = function getThumbnailPathsForJade(callback) {
    var champion;
    var totalChampions;
    var pathsArray = [];

    this.getData(function (championList) {
        // Save length of championList so we know when pathsArray is complete.
        totalChampions = Object.keys(championList).length;

        for (champion in championList) {
            if (championList.hasOwnProperty(champion)) {
                // The keys in championList are already formatted so no need to process.
                pathsArray.push(api_constants.champThumbnailPathJade + champion + '.png');

                // If all champions have been accounted for, continue to the next step.
                if (pathsArray.length === totalChampions) {
                    // Sort it alphabetically to achieve consistency.
                    callback(pathsArray.sort());
                }
            }
        }
    });
};

/**
 * Given an input of a champion name, strip all non-letters.
 *
 * @param championName
 * @returns {void|string|XML}
 */
exports.stripNonLetters = function stripNonLetters (championName) {
    return championName.replace(/\W/g, '');
};