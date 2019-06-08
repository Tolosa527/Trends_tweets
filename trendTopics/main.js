var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


// THIS METHOD GET A LIST OF FIRST 50 TRENDS MATCHED
// AND CALL TO GOT DATA
function GetTopTen(){
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
        topNames.splice(1);
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
        console.log("Error en serchTwit: " + err);
    }
    else{
        if(!data.statuses[0]){
            var request = {
                "status": false
            }
        }else{
            var text = data.statuses[0].text;
            var created_at = data.statuses[0].created_at;
            var name = data.statuses[0].user.name;
            var request = {
                "text": text,
                "date": created_at,
                "name": name,
                "status": true
            }
            // llamar otra function pero estoy dentro del loop
            //console.log(data.statuses[0]);
        }
        console.log(JSON.stringify(request));
    }
}
GetTopTen();
