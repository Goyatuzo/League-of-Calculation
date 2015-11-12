/**
 * @author  Yuto Otaguro
 */
"use strict";

var fs = require('fs');
var api_constants = require('./api-constants');
var mkdirp = require('mkdirp');
var fileFuncs = require('./file-functions');

exports.requestFromRiot = function requestFromRiot (mapNumber) {
    console.log("Initializing item data retrieval.");

    var dataURL = api_constants.itemURL + 'itemListData=all&api_key=' + api_constants.apiKey;

    fileFuncs.retrieveAndProcessJson(dataURL, function (raw_body) {
        var bodyJSON = JSON.parse(raw_body);
        var dataJSON = bodyJSON['data'];
        _saveData(raw_body);

        var itemFilter = [
            'Furor',
            'Alacrity',
            'Captain',
            'Homeguard',
            'Distortion',
            'Totem',
            'Lens',
            'Scrying Orb',
            'Farsight Orb',
            'Ward',
            'Biscuit',
            'Potion'
        ];

        dataJSON = _filterItemsByMap(mapNumber, dataJSON);
        dataJSON = _filterItemsByName(itemFilter, dataJSON);
        _saveImages(dataJSON);
    });
};

/**
 * Save rawData onto disk.
 *
 * @param rawData
 * @private
 */
function _saveData(rawData) {
    var filePath = api_constants.jsonFilePath + 'itemData.json';

    // First check to see the file path is valid.
    fileFuncs.checkFolder(api_constants.jsonFilePath);

    // Then write the data into the file.
    fs.writeFile(filePath, rawData, function () {
        console.log("Wrote item JSON file.");
    });
}

/**
 * Based on the dataJSON input, obtain the images from Data Dragon and save them locally to
 * make retrieval simpler in the future.
 *
 * @param dataJSON
 * @private
 */
function _saveImages(dataJSON) {
    var filePath;
    var itemKey;
    var item;

    var imageURL;
    var imageName;

    // Check to see the destination folder exists, and create if it doesn't.
    fileFuncs.checkFolder(api_constants.itemThumbnailPath);

    // For each item in the item JSON, save the thumbnail.
    for (itemKey in dataJSON) {
        if (dataJSON.hasOwnProperty(itemKey)) {
            item = dataJSON[itemKey];

            // The image are saved as #{id}.png
            imageName = item['id'] + '.png';

            imageURL = api_constants.itemThumbnailURL + imageName;

            // Retrieve the file from the API.
            fileFuncs.retrieveAndProcessImage(imageURL, function (fileName, image) {
                filePath = api_constants.itemThumbnailPath + fileName;

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
exports.getData = function getData(mapNumber, callback) {
    "use strict";

    // Where the local copy of the API should be stored.
    var filePath = api_constants.jsonFilePath + 'itemData.json';

    // Must parse the data as a JSON object, and these variables will store them as such.
    var dataJSON;

    fs.readFile(filePath, function (file_err, file_data) {
        // Parse the file and obtain the JSON only if the file is valid.p
        if (file_data !== undefined) {
            console.log("Parsing local champion static data...");
            dataJSON = JSON.parse(file_data)['data'];

            var itemFilter = [
                'Furor',
                'Alacrity',
                'Captain',
                'Homeguard',
                'Distortion',
                'Totem',
                'Lens',
                'Scrying Orb',
                'Farsight Orb',
                'Ward',
                'Biscuit',
                'Potion'
            ];

            dataJSON = _filterItemsByMap(mapNumber, dataJSON);
            dataJSON = _filterItemsByName(itemFilter, dataJSON);

            callback(dataJSON);
        }
    });
};

function _filterItemsByMap(mapNumber, itemList) {
    var itemId;
    var item;

    for (itemId in itemList) {
        if (itemList.hasOwnProperty(itemId)) {
            item = itemList[itemId];

            // Check map number here. If it's not available, remove that item.
            if (!item['maps'][mapNumber]) {
                delete itemList[itemId];
            }
        }
    }

    return itemList;
}

function _filterItemsByName(blacklist, itemList) {
    var itemId;
    var item;

    for (itemId in itemList) {
        if (itemList.hasOwnProperty(itemId)) {
            item = itemList[itemId];

            for (var i = 0; i < blacklist.length; ++i) {
                if (item['name'].indexOf(blacklist[i]) !== -1) {
                    delete itemList[itemId];
                }
            }
        }
    }

    return itemList
}

/**
 * Allow callback on a specific item number.
 *
 * @param itemNumber
 * @param callback
 */
exports.getItemData = function getItemData(itemNumber, callback) {
    "use strict";
    this.getData(function (championList) {
        callback(championList[itemNumber]);
    });
};

/**
 * Get an array of SORTED paths to thumbnail images for each champion. This is primarily for jade.
 *
 * @param callback
 */
exports.getThumbnailPathsForJade = function getThumbnailPathsForJade(callback) {
    var item;
    var totalItem;
    var pathsArray = [];

    this.getData(function (itemList) {
        // Save length of championList so we know when pathsArray is complete.
        totalItem = Object.keys(itemList).length;

        for (item in itemList) {
            if (itemList.hasOwnProperty(item)) {
                // The keys in championList are already formatted so no need to process.
                pathsArray.push(api_constants.champThumbnailPathJade + item + '.png');

                // If all champions have been accounted for, continue to the next step.
                if (pathsArray.length === totalItem) {
                    // Sort it alphabetically to achieve consistency.
                    callback(pathsArray.sort());
                }
            }
        }
    });
};