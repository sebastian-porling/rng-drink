var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next){
  randomizer.test(res);
});

router.get('/toString', function(req, res, next){
  res.send(randomizer.toString());
});

router.get('/drink/:amount', function(req, res, next){
  randomizer.drink(req.params.amount, res);
});

router.get('/cocktail/:amount', function(req, res, next){
  randomizer.cocktail(req.params.amount, res);
});

module.exports = router;
