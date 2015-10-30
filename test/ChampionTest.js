/**
 * @author  Yuto Otaguro
 */

"use strict";

var chai = require('chai');
var ChampionData = require('../RiotAPI/ChampionData.js');

var champion = new ChampionData();

var expect = chai.expect;
var should = chai.should();

/**
 * Test ChampionData.js
 */
describe("Champion identification tests.", function() {
    "use strict";
    it('Retrieve JSON data of champions.', function(done) {
        champion.getIdentifiers(function(championList) {
            expect(championList).to.not.equal('undefined');
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