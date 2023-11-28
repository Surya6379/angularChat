const express = require('express');

const routing = express.Router();
const tracker = require('../Controller/tracker');


routing.get('/users/:email',tracker.getDetails);

routing.post('/users',tracker.registerUser);

routing.post('/userLogin',tracker.loginUser);

routing.get('/movies',tracker.getMovies);

routing.get('/movies/:moviesId',tracker.getMovieDetails);

routing.post('/book',tracker.bookings)


// post api for bookMovie
routing.post('/bookMovie',tracker.bookMovie)

//get api for fetchy details fo0r booked movies
routing.get('/bookMovie/:bookingId/:useremail',tracker.getBookMovieDetails)

routing.get('/bookMovie/:useremail',tracker.getBookMovieDetailsById)

module.exports = routing;