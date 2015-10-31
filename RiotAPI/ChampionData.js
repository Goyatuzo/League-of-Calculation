/**
 * @author  Yuto Otaguro
 */

var request = require('request');
var fs = require('fs');

// @TODO: Utilize DataManager.js to handle the saving and reading of files for me.

function ChampionData() {
    "use strict";

    /**
     * Load the api key from the file called api-key.txt under public/resources.
     */
    this.api_key = fs.readFileSync('RiotAPI/api-key.txt');

    /**
     * Obtain the data for all of the champions.
     *
     * @param callback
     */
    ChampionData.prototype.getIdentifiers = function(callback) {
        "use strict";
        var url = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=' + this.api_key;
        var bodyJSON;
        var dataJSON;

        // First get the champion data from Riot.
        request(url, function(error, response, body) {
            // If an error is thrown, load the json file that already exists
            if (error) {
                fs.readFile('public/resources/championIdentifier.json', function (err, data) {
                    if (err) throw err;

                    dataJSON = JSON.parse(data);

                    console.log("Error retrieving identifiers. Will use local data.");
                    callback(dataJSON['data']);
                });
            } else {
                // Convert the body data to JSON.
                bodyJSON = JSON.parse(body);

                // On a successful request, first save it on the server, then invoke callback.
                fs.readFile('public/resources/championIdentifier.json', function (err, data) {
                    if (err) throw err;

                    dataJSON = JSON.parse(data);
                    /*
                     Compare the body's version to the data's version. If they're not the same,
                     store the new body version into the server because we want the newest version.
                      */
                    if (data['version'] != body['version']) {
                        fs.writeFile('public/resources/championIdentifier.json', body);
                    }
                });
                // Now finally initiate the callback.
                callback(bodyJSON['data']);
            }
        });
    }
}

module.exports = ChampionData;