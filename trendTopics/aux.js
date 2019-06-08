var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
const paramTrend = {id: '23424747'}


function serchTweets(result, callback){
    callback(result);
}
function searchTweets(params, callback){
    callback(params);
}
function sendTweets(result, callback){
    callback(result);
}

var gotData = function (err, data, response) {
    if(err){
        return console.log("Error en trends", err);
    }else{
        gotDataX(data);
    }
};
var gotDataX = function (data){
    var topNames=[];
    var trends = data[0].trends;
    for(var item in trends){
        topNames.push(trends[item].name);
    }
    topNames.splice(5);
    resultParams=[];
    topNames.forEach(pushParam);
    serchTweets(resultParams, serch);
}
var pushParam = function (element){
    var params1 = {
        q: `${element}`,
        count: '1',
        lang: 'es'
    }
    resultParams.push(params1);
}
var serch = function(params){
    params.forEach(returnTweets);
}
var getTweets = function (param){
    T.get('search/tweets',param,returnTweets)
}
var returnTweets = function (err,data,response){
    if(err){
        return console.log("Error en trends", err);
    }else{
        sendTweets(data, send);
    }
}
var send = function (data){
    if(!data.statuses[0] == ''){
        var text = data.statuses[0].text;
        var created_at = data.statuses[0].created_at;
        var name = data.statuses[0].user.name;
        json = {
            "text": text,
            "date": created_at,
            "name": name
        }

    // llamar otra function pero estoy dentro del loop
    console.log(json);
    }
}


T.get('trends/place', paramTrend , gotData);
