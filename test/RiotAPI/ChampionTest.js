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
describe("Champion identification tests.", function() {
    "use strict";

    it('Retrieve data from RIOT API.', function (done) {

        champion.getData(function (championList) {

            championList['Thresh'].name.should.equal('Thresh');
            championList['Thresh']['spells'].should.not.equal(undefined);

            done();
        });

    });

});