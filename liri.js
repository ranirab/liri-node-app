var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var choice = process.argv[2];
var query = process.argv[3];

var switchFunction = function (choice) {

  switch (choice) {
    case "spotify-this-song":
      if (!query) {
        query = "the sign";
      }
      spotify.search({
        type: 'track',
        query: query
      }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        };
        if (query = "the sign") {
          var item;
          for (var i = 0; i < data.tracks.items.length; i++) {
            for (var j = 0; j < data.tracks.items[i].album.artists.length; j++) {
              if (data.tracks.items[i].album.artists[j].name == "Ace of Base") {
                console.log("Artist(s):  " + data.tracks.items[i].album.artists[j].name);
                item = data.tracks.items[i];
              };
            }
          }
          console.log("Song's name:  " + item.name);
          console.log("Preview Link:  " + item.preview_url);
          console.log("Album:  " + item.album.name);
        } else {
          for (var i = 0; i < data.tracks.items.length; i++) {
            for (var j = 0; j < data.tracks.items[i].album.artists.length; j++) {
              console.log("Artist(s):  " + data.tracks.items[i].album.artists[j].name)
            };
            console.log("Song's name:  " + data.tracks.items[i].name);
            console.log("Preview Link:  " + data.tracks.items[i].preview_url);
            console.log("Album:  " + data.tracks.items[i].album.name);
          }
        }
      });
      break;
    case "my-tweets":
      var params = {
        screen_name: 'nodejs'
      };
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
          for (var i = 0; i < tweets[i].length; i++) {

            console.log(tweets[i].created_at);
          }
        }
      });

      break;
    case "movie-this":
      if (!query) {
        query = "Mr. Nobody"
      };
      request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // // * Title of the movie.
          console.log("Title is: " + JSON.parse(body).Title);
          // // * Year the movie came out.
          console.log("Year released was: " + JSON.parse(body).Year);
          // // * IMDB Rating of the movie.
          console.log("imdbRating is: " + JSON.parse(body).imdbRating);
          // //// * Rotten Tomatoes Rating of the movie.
          console.log("Rating from Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
          // // * Country where the movie was produced.
          console.log("Country where movie was produced:  " + JSON.parse(body).Country);
          // //  * Language of the movie.
          console.log("Language of movie: " + JSON.parse(body).Language);
          // //  * Plot of the movie.
          console.log("Plot of movie is: " + JSON.parse(body).Plot);
          // //   * Actors in the movie.
          console.log("Actors are: " + JSON.parse(body).Actors);

        }
      });
      break;
    case "do-what-it-says":
      fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
          return console.log(error);
        };
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        query = dataArr[1];
        switchFunction(dataArr[0]);
      });
      break;
  };
};
switchFunction(choice);