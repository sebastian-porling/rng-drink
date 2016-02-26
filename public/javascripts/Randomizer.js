/**
 * Created by steve_000 on 2016-02-23.
 */

//Init
var mixer,
    illegal = {},
    spirits,
    extra = [ 'Lime', 'Citron' ],
    fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, '../resources/groggvirke.txt'),
    filePath2 = path.join(__dirname, '../resources/sprit.txt');


fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err){
        //console.log('received data: ' + data);
        mixer = data.split(/\r\n|\n/);

        for(var i = 0; i < mixer.length; i++){
            if(mixer[i].indexOf("#") != -1){
                var tmp = mixer[i].split("#");

                illegal[tmp[0]] = tmp[1];
                mixer[i] = tmp[0];
            }
        }

        mixer.forEach(function(str){

        });

        //console.log(illegal);
    }else{
        console.log(err);
    }
});

fs.readFile(filePath2, {encoding: 'utf-8'}, function(err,data){
    if (!err){
        //console.log('received data: ' + data);
        spirits = data.split(/\r\n|\n/);
        for(var i = 0; i < spirits.length; i++){
            if(spirits[i].indexOf("#") != -1){
                var tmp = spirits[i].split("#");

                illegal[tmp[0]] = tmp[1];
                spirits[i] = tmp[0];
            }
        }
    }else{
        console.log(err);
    }
});

//Main functions
var drink = function(size, res){
    var drink = {};

    drink["alcohol"] = size;
    drink["spirits"] = getSpirits(size);

    console.log("Spirit");
    console.log(drink["spirits"]);

    drink["mixers"] = getMixers(size, drink["spirits"]);

    console.log("mixer" );
    console.log(drink["mixers"]);

    drink["extra"] = getExtra(drink["spirits"], drink["mixers"]);

    console.log("extra");
    console.log(drink["extra"]);
    console.log("Done");
    if(res)
        res.send(drink);
    else
        return drink;
}

var cocktail = function(size, res){
    var cocktail = {};

    cocktail["alcohol"] = size;
    cocktail["spirits"] = getSpirits(size);
    cocktail["extra"] = getExtra(cocktail["spirits"]);

    if(res)
        res.send(cocktail);
    else
        return cocktail;
}

// Main help functions
function getSpirits(size){
    var liquor = [];
    console.log(size + "cl");

    // Size of the drink
    while(size > 0){

        var s;
        // Randomize a spirit
        while(true) {
            s = randomSpirit();
            if(!checkListIllegal(liquor, s, 1)){
                break;
            }
        }

        // Randomize how much of the spirit we gonna take
        var amount = getRandomInt(1, parseInt(size)+1);

        console.log("Adding spirit: " + s);
        console.log(liquor);
        liquor = addToList(liquor, s, amount);

        // Reduce how much spirit left
        size = size - amount;
    }
    console.log("Done with liquor");
    return liquor;
}

function getMixers(size, spirit){
    var mix = [];

    size =  Math.round(parseInt(size)/2);
    console.log(size + " mixers at most");

    var i = 0;
    // The higher amount of spirits increases chances for mixers
    // The more mixers it already contains, the less chance will it be for a new one
    while((getRandomInt(0, 1000)%(6-size + i) == 0|| i == 0) && i < size){
        var m;

        while(true) {
            m = randomMixer();
            if(!checkListIllegal(spirit, m, 1) && !checkListIllegal(mix, m) && !checkIfExist(mix,m)){
                break;
            }
        }

        mix = mix.concat([m]);
        i +=1;
    }

    return mix;
}

function getExtra(liquor, mixers){

    if(checkListIllegal(liquor, "Citron", 1))
        return undefined;


    if(mixers) {
        if(checkListIllegal(mixers, "Citron"))
            return undefined;
    }


    var extra = [];
    // 1 of 3 chances to add lime or lemon
    if(getRandomInt(0,1000)%3 == 0){
        extra = randomExtra();
    }
    return extra;
}

// Test functions
var test = function(res){
    var str = randomMixer() + " with " + randomSpirit();

    res.send(str);
}

var toString = function(){
    var keyvalues = {};
    keyvalues["Mixer"] = mixer;
    keyvalues["Spirits"] = spirits;
    keyvalues["Illegal"] = illegal;

    return keyvalues;
}


// Help functions
function randomSpirit(){
    var i = getRandomInt(0, spirits.length);

    return spirits[i];
}

function randomMixer(){
    var i = getRandomInt(0, mixer.length);

    return mixer[i];
}

function randomExtra(){
    var i = getRandomInt(0, extra.length);

    return extra[i];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkIfExist(list, check){
    if(list.length > 0) {
        list.forEach(function (mixer) {
            if (mixer === check) {
                return true;
            }
        });
    }
    return false;
}

function addToList(list, check, amount){
    for(var i = 0; i < list.length; i++){
        if(list[i].name === check) {
            console.log("Found match");
            list[i].amount += amount;
            return list;
        }
    }

    return list.concat([{name:check, amount:amount}]);
}

function checkListIllegal(list, check, spirit){
    if(spirit) {
        list.forEach(function (s) {
            if(checkIllegal(s.name,check))
                return true;
        });
    }else {
        list.forEach(function (m) {
            if(checkIllegal(m,check))
                return true;
        });
    }

    return false;
}

function checkIllegal(first, check){
    if(illegal[first] != undefined && illegal[first].indexOf(check) != -1){
        return true;
    }

    return false;
}


exports.toString = toString;
exports.test = test;
exports.drink = drink;
exports.cocktail = cocktail;