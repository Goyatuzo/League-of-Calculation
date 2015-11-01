var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data');

var champion = new ChampionData();

/* GET home page. */
router.get('/', function(req, res) {
  champion.getImageOf("Dr. Mundo");
  res.render('index', { title: 'Express' });
});

module.exports = router;
