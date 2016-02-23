/**
 * Created by steve_000 on 2016-02-23.
 */

//Init
var mixer,
    illegal = {},
    spirits,
    extra = [ 'lime', 'citron' ],
    fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, '../resources/groggvirke.txt'),
    filePath2 = path.join(__dirname, '../resources/sprit.txt');


fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err){
        //console.log('received data: ' + data);
        mixer = data.split('\r\n');

        for(var i = 0; i < mixer.length; i++){
            if(mixer[i].indexOf("#") != -1){
                var tmp = mixer[i].split("#");

                illegal[tmp[0]] = tmp[1].split(" ");
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
        spirits = data.split('\r\n');
        for(var i = 0; i < spirits.length; i++){
            if(spirits[i].indexOf("#") != -1){
                var tmp = spirits[i].split("#");

                illegal[tmp[0]] = tmp[1].split(" ");
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

    drink["spirits"] = getSpirits(size);
    drink["mixers"] = getMixers(size);
    drink["extra"] = getExtra(drink["spirits"], drink["mixers"]);

    res.send(drink);
}

var cocktail = function(size, res){
    var cocktail = {};
    cocktail["spirits"] = getSpirits(size);
    cocktail["extra"] = getExtra();
    res.send(drink);
}

// Main help functions
function getSpirits(size){
    var spirits = [];
    console.log(size + "cl");

    // Size of the drink
    while(size > 0){

        var spirit = {};

        // Randomize a spirit
        spirit["name"] = randomSpirit();


        // Randomize how much of the spirit we gonna take
        var amount = getRandomInt(1, parseInt(size)+1);
        spirit["amount"] = amount;

        // Add new spirit to spirit list
        spirits = spirits.concat([spirit]);

        // Reduce how much spirit left
        size = size - amount;
    }
    return spirits;
}

function getMixers(size){
    var mixers = [];

    size =  Math.round(parseInt(size)/2);
    console.log(size + " mixers at most");

    var i = 0;
    // The higher amount of spirits increases chances for mixers
    // The more mixers it already contains, the less chance will it be for a new one
    while((getRandomInt(0, 1000)%(5-size + i) == 0|| i == 0) && i < size){
        mixers = mixers.concat([randomMixer()]);
        i +=1;
    }

    return mixers;
}

function getExtra(spirits, mixers){
    var i;
    for(i = 0; i < spirits.length; i++){
        if(illegal[spirits[i].name] != null){
            console.log("Contains milk don't add extra");
            return;

        }
    }
    for(i = 0; i < mixers.length; i++){
        if(illegal[mixers[i]] != null){
            console.log("Contains milk don't add extra");
            return;

        }
    }


    var extra = [];
    // 1 of 5 chances to add lime or lemon
    if(getRandomInt(0,1000)%5 == 0){
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

exports.toString = toString;
exports.test = test;
exports.drink = drink;
exports.cocktail = cocktail;