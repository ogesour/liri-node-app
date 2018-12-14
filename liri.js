var dot = require("dotenv").config();
var fs = require('fs');
var moment = require('moment');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request =  require('request');
var userCommand = process.argv[2];
var userChoice = process.argv[3];
var spotify = new Spotify(keys.spotify); 



switch(userCommand){
    case 'movie-this':{
        movie();
        break;
    }
    case 'concert-this':{
        concert();
        break;
    }
    case 'spotify-this-song':{
        songify();
        break;
    }
    default:
    console.log("Check yo spelling: spotify-this-song or movie-this or concert-this")
}





function movie(){
    if ( !userChoice ){
        userChoice = 'The Room';
    }

    request('http://www.omdbapi.com/?t=' + userChoice + '&apikey=48e12f1f', function(err, response, body){
    // console.log('error:', err); 
    // console.log('statusCode:', response && response.statusCode); 
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    });

}

function concert(){
    request("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id= c71104e0c553f4e62c94fe5483a5f38c", function(err,response, body){
        if(!err && response.statusCode === 200){
            // console.log(response.statusCode);
            console.log(JSON.parse(body));
            
            
            for (var i = 0; i < JSON.parse(body).length; i++){
                var date = JSON.parse(body)[i].datetime;

                console.log('Band: ' + JSON.parse(body)[i].lineup[0]);
                console.log('Location: ' + JSON.parse(body)[i].venue.name);
                console.log('City: ' + JSON.parse(body)[i].venue.city);
                
                console.log('Date: ' + moment(date).format('MM/DD/YYYY') );
                console.log('===========================')
            }
            
        }
    });
}

function songify(){
    if(!userChoice){
        userChoice = 'Let it Snow';
    }
    
    spotify.search({ type: 'track', query: userChoice, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var songData = data.tracks.items;
      console.log("Artist: " + songData[0].artists[0].name); 
      console.log("Song: " + songData[0].name); 
      console.log("Link: " + songData[0].album.external_urls.spotify); 
      console.log("Album: " + songData[0].album.name); 

    });
}

