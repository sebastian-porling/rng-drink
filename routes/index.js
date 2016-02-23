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

router.get('/drink/:cl', function(req, res, next){

});

router.get('/cocktail/:cl', function(req, res, next){

});

module.exports = router;
