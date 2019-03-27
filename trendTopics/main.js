var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


// THIS METHOD GET A LIST OF FIRST 50 TRENDS MATCHED
// AND CALL TO GOT DATA
function GetTopTen(array){
    var params = {
        id: '23424747'
    }
    T.get('trends/place', params , gotData);
}

// THIS METHOD SAVE THE PARAMS INTO THE RESULT PARAMS, THE PARAMS NEEDED
// AND CALL SERCHTWEETS WITH RESULT PARAMS AS PARAMETER
function gotData(err, data, response) {
    if(err){
        return console.log("Error en trends", err);
    }else{
        var topNames=[];
        var trends = data[0].trends;
        for(var item in trends){
            topNames.push(trends[item].name);
        }
        topNames.splice(5);
        resultParams=[];
        topNames.forEach(function (element){
            var params1 = {
                q: `${element}`,
                count: '1',
                lang: 'es'
            }
            resultParams.push(params1);
        });
        serchTweets(resultParams);
    }
};

// *************
function serchTweets (params){
    params.forEach( function(param){
        T.get('search/tweets',param,serchTwit);
    });
}
// ***************
function serchTwit(err,data,response){
    if(err){
        return console.log("Error when we are trying to serch tweets: ", err);
    }else{


    }
}

GetTopTen();
