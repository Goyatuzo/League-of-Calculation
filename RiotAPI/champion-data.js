/**
 * @author  Yuto Otaguro
 */

var request = require('request');
var fs = require('fs');
var api_constants = require('./api-constants');

// @TODO: Utilize DataManager.js to handle the saving and reading of files for me.

function ChampionData() {
    "use strict";

    /**
     * Obtain the data for all of the champions.
     *
     * @param callback
     */
    ChampionData.prototype.getIdentifiers = function(callback) {
        "use strict";

        // The endpoint URL to obtain the information.
        var url = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=' + api_constants.apiKey;
        // Where the local copy of the API should be stored.
        var filePath = api_constants.jsonFilePath + 'championIdentifier.json';

        // Must parse the data as a JSON object, and these variables will store them as such.
        var bodyJSON;
        var dataJSON;

        // First get the champion data from Riot.
        request(url, function(req_err, req_res, req_body) {
            fs.readFile(filePath, function (file_err, file_data) {
                // If the file doesn't exist, pray to got the API works and save as a file.
                if (file_data === undefined) {
                    console.log("File didn't exist, so creating it.");
                    fs.writeFile(filePath, req_body);
                }

                console.log("Parsing local champion static data...");
                // Parse the file and obtain the JSON only if the file is valid.
                if (dataJSON !== undefined) {
                    dataJSON = JSON.parse(file_data);
                }

                // If the request throws an error, use the contents of the file.
                if (req_err) {
                    console.log('Request to Champion Static Data failed.');
                    callback(dataJSON);
                } else {
                    // Parse the request body as JSON.
                    bodyJSON = JSON.parse(req_body);

                    // If the versions don't match up, then save the request on the server.
                    if (dataJSON !== undefined && (bodyJSON['version'] != dataJSON['version'])) {
                        fs.writeFile(filePath, req_body);
                    }

                    callback(bodyJSON['data']);
                }
            });
        });
    }
}

module.exports = ChampionData;