/**
 * @author  Yuto Otaguro
 */

"use strict";

var chai = require('chai');
var ChampionData = require('../RiotAPI/champion-data.js');
var ItemData = require('../RiotAPI/item-data.js');
var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;
var expect = chai.expect;
var should = chai.should();

/**
 * Test champion-data.js
 */
describe("Champion Data", function() {
    "use strict";

    it('Data should not be undefined.', function (done) {
        ChampionData.getData(function (championList) {
            championList.should.not.equal(undefined);

            done();
        })
    });

    it('Data should exist for Thresh.', function (done) {

        ChampionData.getData(function (championList) {

            championList['Thresh'].name.should.equal('Thresh');
            championList['Thresh']['spells'].should.not.equal(undefined);

            done();
        });

    });
});

describe("Thumbnail Filepaths", function () {
    "use strict";

    it('Thumbnails filepaths should not be empty.', function (done) {
        ChampionData.getThumbnailPathsForJade(function (thumbPaths) {
            thumbPaths.should.not.equal(undefined);
            (thumbPaths.length).should.not.equal(0);

            done();
        })
    });

    it("resources/images/Thresh.png should exist.", function (done) {
        // This boolean will trigger to true if Thresh has been found.
        var found = false;

        ChampionData.getThumbnailPathsForJade(function (thumbPaths) {
            for (var i = 0; i < thumbPaths.length; ++i) {
                if (thumbPaths[i] === '/resources/images/champions/Thresh.png') {
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
        ChampionData.stripNonLetters("Dr. Mundo").should.equal("DrMundo");

        done();
    });

    it('Thresh', function (done) {
        ChampionData.stripNonLetters('Thresh').should.equal('Thresh');

        done();
    });

    it('Jarvan IV', function (done) {
        ChampionData.stripNonLetters("Jarvan IV").should.equal('JarvanIV');

        done();
    })
});

describe("item-data.js", function() {
    it("Obtain data JSON", function (done) {
        ItemData.getData(11, function (itemList) {
            itemList['1001']['name'].should.be.equal('Boots of Speed');
            expect(itemList['3180']).to.be.undefined;

            done();
        });
    });

    it("getItemData", function (done) {
        ItemData.getItemData(1001, function (data) {

            expect(data).to.not.equal(undefined);
            done();
        });
    });

    it("boots stats", function (done) {
        ItemData.getItemStats(1001, function (stats) {
            expect(stats['move']).to.be.undefined;
            done();
        });
    });

    it("infinity edge stats", function (done ) {
        ItemData.getItemStats(3031, function (stats) {
            expect(stats['crit']).to.exist;
            expect(stats['critincrease']).to.exist;
            done();
        });
    });

    it("bork stats", function (done) {
        ItemData.getItemStats(3153, function (stats) {
            expect(stats['onhitpercentphysical']).to.exist;

            done();
        });
    });

    it("randuin's stats", function (done) {
        ItemData.getItemStats(3143, function (stats) {
            expect(stats).to.exist;

            done();
        });
    });

    it("void staff stats", function (done) {
        ItemData.getItemStats(3135, function (stats) {
            expect(stats['magicpen']).to.exist;

            done();
        });
    });

    it("abyssal scepter stats", function (done) {
        ItemData.getItemStats(3001, function (stats) {
            expect(stats['magicpen']).to.exist;

            done();
        });
    });

    it("muramana stats", function (done) {
        ItemData.getItemStats(3042, function (stats) {
            expect(stats['manatoad']).to.exist;

            expect(stats['mana']).to.exist;

            done();
        });
    });

    it("dominiks stats", function (done) {
        ItemData.getItemStats(3036, function (stats) {
            expect(stats['bonusarmorpen']).to.exist;

            done();
        });
    });
});