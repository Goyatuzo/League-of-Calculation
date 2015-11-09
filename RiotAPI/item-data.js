/**
 * @author  Yuto Otaguro
 */

var request = require('request');
var mkdirp = require('mkdirp');
var api_constants = require('./api-constants');
var fs = require('fs');

function ItemData() {
    "use strict";

    ItemData.prototype.requestFromRiot = function () {
        console.log("Initializing item data retrieval.");

        var dataURL = api_constants.itemURL + 'itemListData=all&' + api_constants.apiKey;
    };

    ItemData.prototype._saveData = function(rawData) {

    };
}

module.exports = ItemData;