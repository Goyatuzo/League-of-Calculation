/**
 * @author  Yuto Otaguro
 */

"use strict";

var chai = require('chai');
var ChampionData = require('../RiotAPI/champion-data.js');
var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

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

    it('Get Ekko-specific data.', function (done) {
        champion.getChampionData('Ekko', function (data) {

            // data should now be Ekko's entry.
            data.name.should.equal('Ekko');

            done();
        });
    });
});

describe("Thumbnail Filepaths", function () {
    "use strict";

    it('Thumbnails filepaths should not be empty.', function (done) {
        champion.getThumbnailPathsForJade(function (thumbPaths) {
            thumbPaths.should.not.equal(undefined);
            (thumbPaths.length).should.not.equal(0);

            done();
        })
    });

    it("resources/images/Thresh.png should exist.", function (done) {
        // This boolean will trigger to true if Thresh has been found.
        var found = false;

        champion.getThumbnailPathsForJade(function (thumbPaths) {
            for (var i = 0; i < thumbPaths.length; ++i) {
                if (thumbPaths[i] === '/resources/images/Thresh.png') {
                    found = true;
                }
            }

            found.should.be.equal(true);

            done();
        })
    })
});

describe('Test for champion names being properly changed.', function () {
    it('Dr. Mundo', function (done) {
        champion.stripNonLetters("Dr. Mundo").should.equal("DrMundo");

        done();
    });

    it('Thresh', function (done) {
        champion.stripNonLetters('Thresh').should.equal('Thresh');

        done();
    });

    it('Jarvan IV', function (done) {
        champion.stripNonLetters("Jarvan IV").should.equal('JarvanIV');

        done();
    })
});

///**
// * Since I use this test a lot in the image section, just made a method for it.
// *
// * @param champion_name
// * @param done
// */
//function imageTest(champion_name, done) {
//    champion.getThumbnailOf(champion_name, function (data) {
//        data.should.not.equal(undefined);
//
//        done();
//    })
//}
//
//describe("Champion Thumbnail Images", function() {
//    it('Jarvan IV (Test spaces)', function (done) {
//        imageTest("Jarvan IV", done);
//    });
//    it ("Kog'Maw (Test apostrophe)", function (done) {
//        imageTest("Kog'Maw", done);
//    });
//
//    it ("Dr. Mundo (Test space and period)", function (done) {
//        imageTest("Dr. Mundo", done);
//    });
//
//    it ("All thumbnails", function (done) {
//        this.timeout(100000);
//        champion.getAllThumbnails(function (result) {
//            // It shouldn't be undefined.
//            result.should.not.equal(undefined);
//
//            // Nor should its length be 0.
//            (result.length).should.not.equal(0);
//
//            done();
//        });
//    });
//});