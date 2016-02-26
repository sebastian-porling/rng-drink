var express = require('express');
var router = express.Router(),
    history = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html', {root: __dirname });
});

router.get('/test', function(req, res, next){
  randomizer.test(res);
});

router.get('/toString', function(req, res, next){
  res.send(randomizer.toString());
});

router.get('/history', function(req, res, next){
  res.send(history);
});

router.get('/drink/:amount', function(req, res, next){

  var drink = randomizer.drink(req.params.amount);
  res.send(drink);

  history = history.concat([drink]);
});

router.get('/cocktail/:amount', function(req, res, next){
  var drink = randomizer.cocktail(req.params.amount);

  res.send(drink);

  history = history.concat([drink]);
});

router.get('/history', function(req, res, next){

  res.send(history);
});

module.exports = router;
