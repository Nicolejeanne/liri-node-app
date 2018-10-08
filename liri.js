// Code to read and set any enviroment variables
require("dotenv").config();

// Import key.js file and store as a variable
let keys = require("keys.js");

// Access Spotify keys
var spotify = new Spotify(keys.spotify);

// Take in `concert-this` command
// `node liri.js concert-this <artist/band name here>`
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// Renders 
    // Name of venue
    // venue location
    // Date of event(use moment to format "MM/DD/YYYY")


// Take in `spotify-this-song` command
// `node liri.js spotify-this-song '<song name here>'`
// https://www.npmjs.com/package/node-spotify-api
// Renders 
    // Artist(s), 
    // The song's name
    // Preview link of the song from Spotify 
    // The album that the song is from.
// If no song is provided then your program will default to "The Sign" by Ace of Base.


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