/**
 * @author Yuto Otaguro
 */

var request = require('request');
var api_constants = require('./api-constants');

/**
 * Retrieve the JSON response from dataURL and process it further via callback function(s).
 *
 * @param dataURL
 * @param callback
 */
exports.retrieveAndProcessJson = function retrieveAndProcessJson(dataURL, callback) {
    "use strict";
    request(dataURL, function (req_err, req_res) {
        // Try to parse the JSON.
        var bodyJSON = JSON.parse(req_res['body']);

        // If the parsing failed or the retrieval failed, connection failed.
        if (req_res['body'] === undefined || bodyJSON['status'] !== undefined) {
            console.log("Couldn't connect to " + dataURL);

            // Basic debugging that could quickly be solved.
            if (api_constants.apiKey === undefined) {
                console.log("Are you sure you have your API key in your environment variable?");
            }

            return;
        }

        // Otherwise output the success.
        console.log("Connected to " + dataURL);

        // Callback.
        callback(req_res['body']);
    });
};

/**
 * Retrieve the image data at the end of imageURL and further process it via callback function.
 *
 * @param imageURL
 * @param callback
 */
exports.retrieveAndProcessImage = function retrieveAndProcessImage(imageURL, callback) {
    "use strict";
    request(imageURL, {encoding: 'binary'}, function (req_err, req_res) {
        // Extract the image name by looking at the very end of the path.
        var pathArray = (req_res['request']['uri']['path']).split('/');
        var imageName = pathArray[pathArray.length - 1];

        callback(imageName, req_res['body']);
    });
};