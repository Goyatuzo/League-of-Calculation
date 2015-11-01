/**
 * @author  Yuto Otaguro
 */

"use strict";

var chai = require('chai');
var ChampionData = require('../../RiotAPI/champion-data.js');

var champion = new ChampionData();

var expect = chai.expect;
var should = chai.should();

/**
 * Test champion-data.js
 */
describe("Champion Data", function() {
    "use strict";

    it('Data should not be undefined.', function (done) {
        champion.getData(function (championList) {
            championList.should.not.equal(undefined);

            done();
        })
    });

    it('Data should exist for Thresh.', function (done) {

        champion.getData(function (championList) {

            championList['Thresh'].name.should.equal('Thresh');
            championList['Thresh']['spells'].should.not.equal(undefined);

            done();
        });

    });
});

/**
 * Since I use this test a lot in the image section, just made a method for it.
 *
 * @param champion_name
 * @param done
 */
function imageTest(champion_name, done) {
    champion.getImageOf(champion_name, function (data) {
        data.should.not.equal(undefined);

        done();
    })
}

describe("Champion Thumbnail Images", function() {
    it('Jarvan IV (Test spaces)', function (done) {
        imageTest("Jarvan IV", done);
    });
    it ("Kog'Maw (Test apostrophe)", function (done) {
        imageTest("Kog'Maw", done);
    });

    it ("Dr. Mundo (Test space and period)", function (done) {
        imageTest("Dr. Mundo", done);
    });
});