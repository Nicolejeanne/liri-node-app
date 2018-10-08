# liri-node-app
## Node Assignment

I am currently a student in the UT Austin Coding Bootcamp. after spending a few months on client-side development, we are beginning to learn about the back-end. Our week 12 assignment is to create a command line node app that takes in certain parameters and gives back data. It's called LIRI, Language Interpretation and Regognition Interface...a play on SIRI.

### Here is a link to a video demo

* [Link to LIRI app] 

### Setup: To use this app

1. You will need to clone this repository.

2. You will then need to create your own `.env` file to hold your Spotify Client IDs. The Spotify portion of this app will not work unless you do this.

    * In the root folder create a file named `.env`.

    * Add the following to it, replacing the values with your Spotify API keys (no quotes) once you have them:

        #### Spotify API keys

        SPOTIFY_ID=your-spotify-id

        SPOTIFY_SECRET=your-spotify-secret

    * These keys can be found by signing up as a developer on Spotify. Here is how you do that:

        * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

        * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

        * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

        * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values into your `.env` file.

3. You will also need a few Node packages for this all to work. From the root folder for this app in your command line, install the following:

    * Node-Spotify-API
        * Type `npm install node-spotify-api` into your command line. Allow it to finish installing then move on to the next...

    * Request
        * Type `npm install request` into your command line. Allow it to finish installing then move on to the next...

    * Moment
        * Type `npm install moment` into your command line. Allow it to finish installing then move on to the next...

    * DotEnv
        * Type `npm install dotenv` into your command line. Allow it to finish installing then...you're finished!

### Using this app

* This app has four sets of commands that allow you to query different APIs.

1. Bands In Town

    * Allows you to query 'Bands In Town Artists Events API' by typing the following into your command line: 
        
        `node liri.js concert-this <artist/band name here>`
    
    * The app will then give you the following information:
        
        * Name of the venue
        * Venue location
        * Date of the Event

2. Spotify

    * Allows you to query the 'Spotify API' by typing the following into your command line:

        `node liri.js spotify-this-song '<song name here>'`

    * The app will then give you the following information:
        
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from

3. OMDB

     * Allows you to query the 'OMDB API' by typing the following into your command line:

        `node liri.js movie-this '<movie name here>'`

    * The app will then give you the following information:

        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.

4. Do what it says

    * Type this into your command line and try it out:

        `node liri.js do-what-it-says`