/**
 * @author Yuto Otaguro
 */

var request = require('request');
var api_constants = require('./api-constants');

exports.retrieveJson = function retrieveJson(dataURL, callback) {
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