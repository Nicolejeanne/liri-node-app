// Code to read and set any enviroment variables
require("dotenv").config();

// Import key.js file and store as a variable
// let keys = require("keys.js");

// Access Spotify keys
// var spotify = new Spotify(keys.spotify);

// Create variable for user command
let userCommand = process.argv[2];

// Create variable for user query
let userQuery = process.argv[3];

// Bands In Town
let request = require('request');
// Send Bands In Town Request
request('https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML.
});

// Take in `concert-this` command
// `node liri.js concert-this <artist/band name here>`
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// Renders 
    // Name of venue
    // venue location
    // Date of event(use moment to format "MM/DD/YYYY")

// Spotify

// Take in `spotify-this-song` command
// `node liri.js spotify-this-song '<song name here>'`
// https://www.npmjs.com/package/node-spotify-api
// Renders 
    // Artist(s), 
    // The song's name
    // Preview link of the song from Spotify 
    // The album that the song is from.
// If no song is provided then your program will default to "The Sign" by Ace of Base.

// Start of OMDB Section
let omdbQuery = function(movieQuery) {

    // Load request npm package
    let requestMovie = require("request");

    // If userQuery is blank, display default of Mr. Nobody
    if (movieQuery === "") {
        movieQuery = "mr.nobody";
    }

// OMDB request
requestMovie("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json&apikey=trilogy", function(error, response, body) {
  if (error) {
      console.log('error:', error); // Print the error if one occurred
  } else if (!error && response.statusCode === 200) { 
    console.log('Title of the movie: ' + JSON.parse(body).Title);
    console.log('Year the movie came out: ' + JSON.parse(body).Year);
    console.log('IMDB Rating of the movie: ' + JSON.parse(body).imdbRating);
    console.log('Country where the movie was produced: ' + JSON.parse(body).Country);
    console.log('Language of the movie: ' + JSON.parse(body).Language);
    console.log('Plot of the movie: ' + JSON.parse(body).Plot);
    console.log('Actors in the movie: ' + JSON.parse(body).Actors);

    // Loop through ratings array for Rotten Tomatoes Rating
    for ( let i = 0; i<JSON.parse(body).Ratings.length; i++) {
        if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
            console.log('Rotten Tomatoes Rating of the movie: ' + JSON.parse(body).Ratings[i].Value);
        };
    } 
}
});
}
// End of OMDB Section

// Take in `movie-this` command
// `node liri.js movie-this '<movie name here>'`
// Renders 
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// Use API key trilogy

// Take in `do-what-it-says` command
// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    // Edit the text in random.txt to test out the feature for movie-this and my-tweets

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// Make sure you append each command you run to the `log.txt` file.

// App direction from user input
 if (userCommand === "concert-this") {
     bandQuery(userQuery);
 } else if (userCommand === "spotify-this-song") {
    spotifyQuery(userQuery);
 } else if (userCommand === "movie-this") {
     omdbQuery(userQuery);
 } else {
     console.log("Please enter a command!")
 };