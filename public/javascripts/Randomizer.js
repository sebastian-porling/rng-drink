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
                mixer[0] = tmp[0];
            }
        }

        mixer.forEach(function(str){

        });
        console.log(illegal);
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
                spirits[0] = tmp[0];
            }
        }
    }else{
        console.log(err);
    }
});

//Main functions




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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.toString = toString;
exports.test = test;