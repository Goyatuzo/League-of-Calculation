/**
 * @author  Yuto Otaguro
 */

var request = require('request');
var fs = require('fs');
var api_constants = require('./api-constants');

function ChampionData() {
    "use strict";

    console.log("Initializing Champion data retrieval.");

    var dataURL = api_constants.champDataURL + 'champData=all' + '&api_key=' + api_constants.apiKey;

    /**
     * Get champion data.
     */
    request(dataURL, function (req_err, req_res) {
        var bodyJSON = JSON.parse(req_res['body']);    // JSON from the API.

        // If the request brought nothing useful, just exit.
        if (req_res['body'] === undefined || bodyJSON['status'] !== undefined) {
            console.log("Couldn't connect to /champions.");
            return;
        }

        console.log("Connected to /champions.");

        // Save the JSON locally.
        ChampionData.prototype._saveData(req_res['body']);
        // Save the thumbnails locally.
        ChampionData.prototype._saveThumbnailsFromData(bodyJSON['data']);
    });

    /**
     * If necessary, the data will be written to the disk. There are two conditions where the data
     * will be stored locally:
     *  * If the file doesn't exist.
     *  * If the versions are different, it means the server has the newer version, so it must be updated.
     *
     * @param raw_body
     * @private
     */
    ChampionData.prototype._saveData = function (raw_body) {
        var filePath = api_constants.jsonFilePath + 'championData.json';
        var bodyJSON = JSON.parse(raw_body);
        // Read the file to compare the two.
        fs.readFile(filePath, function (file_err, file_data) {

            // If the file couldn't be retrieved, it doesn't exist. So write. Otherwise, check versions.
            if ((file_data === undefined) || (JSON.parse(file_data)['version'] !== bodyJSON['version'])) {
                console.log("Champion data versions don't match. Updating...");
                fs.writeFileSync(filePath, raw_body);
                console.log('Champion Data successfully saved.');
            }
        });
    };

    /**
     * Given the input dataJSON file, save the champion thumbnails as they are located and named
     * on the Data Dragon server from RIOT.
     *
     * @param dataJSON
     * @private
     */
    ChampionData.prototype._saveThumbnailsFromData = function (dataJSON) {
        // Location where the image will be stored.
        var filePath;
        // The name of the thumbnail it's stored as on DDragon.
        var thumbnailName;
        // The URL of the thumbnail.
        var thumbnailURL;
        // Temp variable to hold the path of the champion on the request.

        console.log("Saving thumbnail images.");
        for (var champion in dataJSON) {
            if (dataJSON.hasOwnProperty(champion)) {
                thumbnailName = dataJSON[champion]['image']['full'];
                // Construct the URL where the thumbnail is stored.
                thumbnailURL = 'http://ddragon.leagueoflegends.com/cdn/' + api_constants.currentVersion +
                    '/img/champion/' + thumbnailName;

                // Try to get the image data.
                request(thumbnailURL, {encoding: 'binary'}, function (req_err, req_res) {
                    // Since async thread could be at a different location in code, make temp.
                    var pathArray = (req_res['request']['uri']['path']).split('/');

                    // The entire path is converted to an array, and we only need the last element.
                    var fileName = pathArray[pathArray.length - 1];
                    filePath = api_constants.imageFilePath + fileName;

                    fs.writeFile(filePath, req_res.body, 'binary', function (err) {
                        if (err) console.log("There was a problem saving a thumbnail.");

                        console.log("\tThumbnail " + fileName + " was saved.");
                    });
                });
            }
        }
    };

    /**
     * Obtain locally stored champion data for all champions.
     *
     * @param callback
     */
    ChampionData.prototype.getData = function(callback) {
        "use strict";

        // Where the local copy of the API should be stored.
        var filePath = api_constants.jsonFilePath + 'championData.json';

        // Must parse the data as a JSON object, and these variables will store them as such.
        var dataJSON;

        fs.readFile(filePath, function (file_err, file_data) {
            // Parse the file and obtain the JSON only if the file is valid.
            if (file_data !== undefined) {
                console.log("Parsing local champion static data...");
                dataJSON = JSON.parse(file_data);

                callback(dataJSON['data']);
            }
        });
    };

    ChampionData.prototype.getImageOf = function (champion_name, callback) {
        // Remove all symbols and spaces.
        champion_name = champion_name.replace(/[\s!\?\.']/g, "");

        // The filepath where the image should be stored.
        var filePath = api_constants.imageFilePath + champion_name + '.png';

        fs.readFile(filePath, {encoding: 'binary'}, function(err, image) {
            if (err) callback(undefined);
            else callback(image);
        });
    }
}

module.exports = ChampionData;