// Code to read and set any enviroment variables
require("dotenv").config();

// Import key.js file and store as a variable
// let keys = require("keys.js");

// Access Spotify keys
// var spotify = new Spotify(keys.spotify);

// Create variable for user command
let userCommand = process.argv[2];

// Create variable for user query
let userQuery = process.argv.slice(3).join(" ");

// Start of Bands In Town Section
let bandsInTownQuery = function (bandQuery) {

    // Load request npm package
    let requestBand = require('request');

    // Load moment package
    let moment = require('moment');

    // If userQuery is blank, display default of Mr. Nobody
    if (bandQuery === "") {
        console.log("Please choose a band or artist!");
    }
    // Send Bands In Town Request
    requestBand('https://rest.bandsintown.com/artists/' + bandQuery + '/events?app_id=codingbootcamp', function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        } else if (!error && response.statusCode === 200) {
            let bandResult = JSON.parse(body)[0];
            console.log(`You can see ${bandQuery} here...`);
            console.log('Name of Venue: ' + bandResult.venue.name);
            console.log('Venue location: ' + bandResult.venue.city);
            console.log('Date of Event: ' + moment(bandResult.datetime).format("MM/DD/YYYY"));
        }
    });
}
// End of Bands In Town Section

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
let omdbQuery = function (movieQuery) {

    // Load request npm package
    let requestMovie = require("request");

    // If userQuery is blank, display default of Mr. Nobody
    if (movieQuery === "") {
        movieQuery = "mr.nobody";
    }

    // OMDB request
    requestMovie("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json&apikey=trilogy", function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        } else if (!error && response.statusCode === 200) {
            let movieResult = JSON.parse(body);
            console.log('Title of the movie: ' + movieResult.Title);
            console.log('Year the movie came out: ' + movieResult.Year);
            console.log('IMDB Rating of the movie: ' + movieResult.imdbRating);
            console.log('Country where the movie was produced: ' + movieResult.Country);
            console.log('Language of the movie: ' + movieResult.Language);
            console.log('Plot of the movie: ' + movieResult.Plot);
            console.log('Actors in the movie: ' + movieResult.Actors);

            // Loop through 'Ratings' array for Rotten Tomatoes Rating
            for (let i = 0; i < movieResult.Ratings.length; i++) {
                if (movieResult.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log('Rotten Tomatoes Rating of the movie: ' + movieResult.Ratings[i].Value);
                };
            }
        }
    });
}
// End of OMDB Section


// Take in `do-what-it-says` command
// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
// Edit the text in random.txt to test out the feature for movie-this and my-tweets

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// Make sure you append each command you run to the `log.txt` file.

// App direction from user input

if (userCommand === "concert-this") {
    bandsInTownQuery(userQuery);
} else if (userCommand === "spotify-this-song") {
    spotifyQuery(userQuery);
} else if (userCommand === "movie-this") {
    omdbQuery(userQuery);
} else {
    console.log("Please enter a command!")
};
