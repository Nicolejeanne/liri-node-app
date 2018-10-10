// Code to read and set any enviroment variables
require("dotenv").config();

// Loads chalk package
let chalk = require('chalk');

// Import key.js file and store as a variable
// let keys = require("keys.js");

// Access Spotify keys
// let spotify = new Spotify(keys.spotify);

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
            let bandResult;
            for (i = 0; i < 5; i++) {
                bandResult = JSON.parse(body)[i];
                console.log(chalk.white.bold(`You can see ${bandQuery} here...`));
                console.log(chalk.red.bold('Name of Venue: ' + bandResult.venue.name));
                console.log(chalk.red.bold('Venue location: ' + bandResult.venue.city));
                console.log(chalk.red.bold('Date of Event: ' + moment(bandResult.datetime).format("MM/DD/YYYY")));
            }
        }
    });
}
// End of Bands In Town Section

// Start of Spotify Section

// Take in `spotify-this-song` command
// `node liri.js spotify-this-song '<song name here>'`
// https://www.npmjs.com/package/node-spotify-api
// Renders 
// Artist(s), 
// The song's name
// Preview link of the song from Spotify 
// The album that the song is from.
// If no song is provided then your program will default to "The Sign" by Ace of Base.

// End of Spotify Section

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
            console.log(chalk.cyan.bold('Movie Title: ' + chalk.white.bold(movieResult.Title)));
            console.log(chalk.cyan.bold('Year released: ' + chalk.white.bold(movieResult.Year)));
            console.log(chalk.cyan.bold('IMDB Rating: ' + chalk.white.bold(movieResult.imdbRating)));
            console.log(chalk.cyan.bold('Country produced: ' + chalk.white.bold(movieResult.Country)));
            console.log(chalk.cyan.bold('Language: ' + chalk.white.bold(movieResult.Language)));
            console.log(chalk.cyan.bold('Plot: ' + chalk.white.bold(movieResult.Plot)));
            console.log(chalk.cyan.bold('Actors: ' + chalk.white.bold(movieResult.Actors)));

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
} else if (userCommand === "do-what-it-says") {
    // Loads fs package
    let fs = require("fs");
    // Reads .txt file, splits at comma, assigns command and query to file components
    fs.readFile("random.txt", "utf-8", function (error, data) {
        let args = data.split(",");
        userCommand = args[0];
        userQuery = args[1];

        // Decides which function to run
        if (userCommand === "concert-this") {
            bandsInTownQuery(userQuery);
        } else if (userCommand === "spotify-this-song") {
            spotifyQuery(userQuery);
        } else if (userCommand === "movie-this") {
            omdbQuery(userQuery);
        } else { console.log("File not recongnized. Please try again.") };
    });
} else {
    console.log("Please enter a command!")
};
