/**
 * @author  Yuto Otaguro
 */

function DataManager() {
    "use strict";

    /**
     * Helper function to save certain data at a certain location, and output a message
     * when the saving was successful.
     *
     * @param filePath          The path the filename should be saved at. Should include the filename.
     * @param data              The data that will be saved at the filePath.
     * @param success_message   The message that should be returned when the save is successful.
     * @private
     */
    DataManager.prototype._saveDataAs = function (filePath, data, success_message) {
        fs.writeFile(filePath, data, function (err) {
            if (err) throw err;

            console.log(success_message);
        })
    };

    /**
     * Save a JSON file as the fileName on the server.
     *
     * @param fileName
     * @param json
     */
    DataManager.prototype.saveJsonAs = function (fileName, json) {
        var filePath = 'public/resources/data/' + fileName;
        var msg = 'JSON saved at: ' + filePath;
        DataManager.prototype._saveDataAs(filePath, json, msg);
    };

    /**
     * Save an image file as fileName on the server.
     *
     * @param fileName
     * @param image
     */
    DataManager.prototype.saveImagesAs = function (fileName, image) {
        var filePath = 'public/resources/images/' + fileName;
        var msg = 'Image saved at: ' + filePath;
        DataManager.prototype._saveDataAs(filePath, image, msg);
    }
}

modules.exports = DataManager;