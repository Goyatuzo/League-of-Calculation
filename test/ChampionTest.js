/**
 * @author  Yuto Otaguro
 */

"use strict";

var chai = require('chai');
var ChampionData = require('../RiotAPI/champion-data.js');

var champion = new ChampionData();

var expect = chai.expect;
var should = chai.should();

/**
 * Test champion-data.js
 */
describe("Champion identification tests.", function() {
    "use strict";
    it('Retrieve JSON data of champions.', function(done) {
        champion.getIdentifiers(function(championList) {
            expect(championList).to.not.equal(undefined);
            // Once the data has been retrieved and it's not null, the function is completed.
            done();
        });
    });

    it('Make sure Thresh is indeed Thresh.', function (done) {
        champion.getIdentifiers(function(championList) {
            championList['Thresh'].name.should.equal('Thresh');

            done();
        });
    });
});