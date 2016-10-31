const express = require('express');

const indexRouter = express.Router();
const { igdbSearch } = require('../services/igdb');
const { twitchSearch } = require('../services/twitch')
// This is the route that serves your '/' homepage
indexRouter.get('/', (req, res) => {
  res.render('index');
});

// This route serves your `/login` form
indexRouter.get('/login', (req, res) => {
  res.render('login');
});

// This route serves your `/signup` form
indexRouter.get('/signup', (req, res) => {
  res.render('signup');
});

indexRouter.get('/guest', igdbSearch, twitchSearch,(req, res) => {
  res.render('guest', {
    result : res.result,
    stream : res.twitch,
  });
});
module.exports = indexRouter;
