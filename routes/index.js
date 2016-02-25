var express = require('express');
var router = express.Router(),
    history = "";

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
  var str = "\<div\>" +  "History:" + "\</div\>";
  str += history;
  res.send(str);
});

router.get('/drink/:amount', function(req, res, next){

  var drink = randomizer.drink(req.params.amount);
  var str = "\<div\>" +  "Liquor: " + drink.alcohol + " cl" + "\</div\>";
  drink.spirits.forEach(function(spirit){
    str += "\<div\>" + spirit.amount + "cl" + " " + spirit.name  + "\</div\>";
  });
  str +=  "\<div\>" + "_" + "\</div\>";
  str +=  "\<div\>" +  "Mixers:" + "\</div\>";

  drink.mixers.forEach(function(mixer){
    str += "\<div\>" + mixer + "\</div\>";
  });
  console.log("extra " + drink.extra);
  if(drink.extra != undefined && drink.extra.length > 0) {
    str +=  "\<div\>" + "_" + "\</div\>";
    str += "\<div\>" + "Extra:" + "\</div\>";

    str += "\<div\>" + drink.extra + "\</div\>";

  }

  res.send(str);

  history +=  "\<hr\>";
  history += "\<div\>" + "Drink:" + "\</div\>";;
  history += str;
});

router.get('/cocktail/:amount', function(req, res, next){
  var drink = randomizer.cocktail(req.params.amount);

  var str = "\<div\>" +  "Liquor:" + drink.alcohol + " cl" + "\</div\>";
  drink.spirits.forEach(function(spirit){
    str += "\<div\>" + spirit.amount + "cl" + " " + spirit.name  + "\</div\>";
  });

  if(drink.extra != undefined && drink.extra.length > 0) {
    str +=  "\<div\>" + "_" + "\</div\>";
    str += "\<div\>" + "Extra:" + "\</div\>";

    str += "\<div\>" + drink.extra + "\</div\>";

  }

  res.send(str);
  history +=  "\<hr\>";
  history += "\<div\>" + "Cocktail:" + "\</div\>";;
  history += str;
});

module.exports = router;
