// Code to read and set any enviroment variables
require("dotenv").config();

// Loads chalk package
let chalk = require('chalk');

// Load request npm package
let requestMovie = require("request");

// Load request npm package
let requestBand = require('request');

// Load moment package
let moment = require('moment');

// Loads fs package
let fs = require("fs");

// Load Spotify package
let Spotify = require('node-spotify-api');

// Import key.js file and store as a variable
let keys = require("./keys.js");

// Access Spotify keys
let spotify = new Spotify(keys.spotify);

// Create variable for user command
let userCommand = process.argv[2];

// Create variable for user query
let userQuery = process.argv.slice(3).join(" ");

// Start of Bands In Town Section
let bandsInTownQuery = function (bandQuery) {

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
                console.log(chalk.white.bold('You can see ' + bandQuery + ' here...')); // Lead in statement
                console.log(chalk.red.bold('Name of Venue: ' + bandResult.venue.name)); // Name of the venue
                console.log(chalk.red.bold('Venue location: ' + bandResult.venue.city)); // Venue location
                console.log(chalk.red.bold('Date of Event: ' + moment(bandResult.datetime).format("MM/DD/YYYY"))); // Date of the Event (use moment to format this as "MM/DD/YYYY")
            }
        }
    });
}
// End of Bands In Town Section

// Start of Spotify Section
let spotifyQuery = function (songQuery) {
     if (songQuery === '') {
         songQuery = "the sign ace of base";
     }

    // Search
    spotify.search({ type: 'track', query: songQuery, limit: 5 }, function (error, data) {
        if (error) {
            console.log("Error occured: " + error); // Print the error if one occurred
        } else if (!error) {
            // console.log(data);
            console.log(chalk.yellow("Artist: " + chalk.bgMagenta(data.tracks.items[0].artists[0].name))); // Artist(s)
            console.log(chalk.yellow("Song: " + chalk.bgMagenta(data.tracks.items[0].name))); // The song's name
            console.log(chalk.yellow("Album: " + chalk.bgMagenta(data.tracks.items[0].album.name))); // The album that the song is from
            console.log(chalk.yellow("Spotify link: " + chalk.bgMagenta(data.tracks.items[0].preview_url))); // Preview link of the song from Spotify
        }
    });
}
// End of Spotify Section

// Start of OMDB Section
let omdbQuery = function (movieQuery) {

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
            console.log(chalk.cyan.bold('Movie Title: ' + chalk.white.bold(movieResult.Title))); // Title of the movie
            console.log(chalk.cyan.bold('Year released: ' + chalk.white.bold(movieResult.Year))); // Year the movie came out
            console.log(chalk.cyan.bold('IMDB Rating: ' + chalk.white.bold(movieResult.imdbRating))); // IMDB Rating of the movie
            console.log(chalk.cyan.bold('Country produced: ' + chalk.white.bold(movieResult.Country))); // Country where the movie was produced
            console.log(chalk.cyan.bold('Language: ' + chalk.white.bold(movieResult.Language))); // Language of the movie
            console.log(chalk.cyan.bold('Plot: ' + chalk.white.bold(movieResult.Plot))); // Plot of the movie
            console.log(chalk.cyan.bold('Actors: ' + chalk.white.bold(movieResult.Actors))); // Actors in the movie

            // Loop through 'Ratings' array for Rotten Tomatoes Rating
            for (let i = 0; i < movieResult.Ratings.length; i++) {
                if (movieResult.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log(chalk.cyan.bold('Rotten Tomatoes Rating of the movie: ' + chalk.white.bold(movieResult.Ratings[i].Value))); // Rotten Tomatoes Rating of the movie
                };
            }
        }
    });
}
// End of OMDB Section


// App direction from user input
if (userCommand === "concert-this") {
    bandsInTownQuery(userQuery);
} else if (userCommand === "spotify-this-song") {
    spotifyQuery(userQuery);
} else if (userCommand === "movie-this") {
    omdbQuery(userQuery);
} else if (userCommand === "do-what-it-says") {
    // Start do-what-it-says functionality
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
    // End do-what-it-says
} else {
    console.log("Please enter a command!")
};

