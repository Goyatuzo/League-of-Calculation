var express = require('express');
var router = express.Router();
var ChampionData = require('./../RiotAPI/champion-data');

var champs = new ChampionData();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
