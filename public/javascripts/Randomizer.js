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
    drink["extra"] = getExtra();

    res.send(drink);
};

var cocktail = function(size, res){
    var cocktail = {};
    cocktail["spirits"] = getSpirits(size);
    cocktail["extra"] = getExtra();
    res.send(drink);
};


function getSpirits(size){
    var spirits = [];
    console.log(size + "cl");
    while(size > 0){
        var spirit = {};
        spirit["name"] = randomSpirit();
        var amount = getRandomInt(1, parseInt(size)+1);
        spirit["amount"] = amount;
        spirits = spirits.concat([spirit]);
        size = size - amount;
    }
    return spirits;
};

function getMixers(size){
    var mixers = [];
    size =  Math.round(parseInt(size)/2);
    console.log(size + " mixers");
    var i = 0;
    while(getRandomInt(10-size, 30+i) < 20 || i == 0){
        mixers = mixers.concat([randomMixer()]);
        i += 5;
    }

    return mixers;
};

function getExtra(){
    var extra = [];
    if(getRandomInt(0,100)%5 == 0){
        extra = randomExtra();
    }
    return extra;
};


// Test functions
var test = function(res){
    var str = randomMixer() + " with " + randomSpirit();

    res.send(str);
};

var toString = function(){
    var keyvalues = {};
    keyvalues["Mixer"] = mixer;
    keyvalues["Spirits"] = spirits;
    keyvalues["Illegal"] = illegal;

    return keyvalues;
};


// Help functions
function randomSpirit(){
    var i = getRandomInt(0, spirits.length);

    return spirits[i];
};

function randomMixer(){
    var i = getRandomInt(0, mixer.length);

    return mixer[i];
};

function randomExtra(){
    var i = getRandomInt(0, extra.length);

    return extra[i];
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

exports.toString = toString;
exports.test = test;
exports.drink = drink;
exports.cocktail = cocktail;