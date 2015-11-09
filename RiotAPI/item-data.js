/**
 * @author  Yuto Otaguro
 */
"use strict";

var fs = require('fs');
var api_constants = require('./api-constants');
var mkdirp = require('mkdirp');
var fileFuncs = require('./file-functions');

exports.requestFromRiot = function requestFromRiot () {
    console.log("Initializing item data retrieval.");

    var dataURL = api_constants.itemURL + 'itemListData=all&api_key=' + api_constants.apiKey;

    fileFuncs.retrieveAndProcessJson(dataURL, function (raw_body) {
        var bodyJSON = JSON.parse(raw_body);
        _saveData(raw_body);
        _saveImages(bodyJSON['data'])
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

                // Use 'wx' so it doesn't write if it already exists. Minor optimization.
                fs.writeFile(filePath, image, { data: 'binary', flag: 'wx' }, function (err) {
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