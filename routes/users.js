/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express      = require('express');
const { createUser }    = require('../models/user.js');
const { authenticate }   = require('../lib/auth');
const { igdbSearch } = require('../services/igdb');
const { twitchSearch } = require('../services/twitch');
const { getFavorites, saveFavorite, deleteFavorites } = require('../models/favorites');
const { saveToDB } = require('../models/history');

const usersRouter  = express.Router();
// dummy object
let streams = [
  {
    _id: 23538846688,
    game: 'Music',
    viewers: 993,
    video_height: 1080,
    average_fps: 30.753968254,
    delay: 0,
    created_at: '2016-10-30T19:11:08Z',
    is_playlist: false,
    preview: {
      small: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_monstercat-80x45.jpg',
      medium: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_monstercat-320x180.jpg',
      large: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_monstercat-640x360.jpg',
      template: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_monstercat-{width}x{height}.jpg',
    },
    channel: {
      mature: false,
      partner: false,
      status: 'Monstercat FM - 24/7 VOD Friendly Music Stream - live.monstercat.com',
      broadcaster_language: 'en',
      display_name: 'Monstercat',
      game: 'Music',
      language: 'en',
      _id: 27446517,
      name: 'monstercat',
      created_at: '2012-01-15T03:18:08Z',
      updated_at: '2016-10-31T15:00:24Z',
      delay: null,
      logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/monstercat-profile_image-72a449ee382a5425-300x300.png',
      banner: null,
      video_banner: 'https://static-cdn.jtvnw.net/jtv_user_pictures/monstercat-channel_offline_image-b6ef3a2311a916fe-1920x1080.jpeg',
      background: null,
      profile_banner: 'https://static-cdn.jtvnw.net/jtv_user_pictures/monstercat-profile_banner-7766be3dbeed162b-480.jpeg',
      profile_banner_background_color: null,
      url: 'https://www.twitch.tv/monstercat',
      views: 13589162,
      followers: 0,
      _links: {
        self: 'https://api.twitch.tv/kraken/channels/monstercat',
        follows: 'https://api.twitch.tv/kraken/channels/monstercat/follows',
        commercial: 'https://api.twitch.tv/kraken/channels/monstercat/commercial',
        stream_key: 'https://api.twitch.tv/kraken/channels/monstercat/stream_key',
        chat: 'https://api.twitch.tv/kraken/chat/monstercat',
        features: 'https://api.twitch.tv/kraken/channels/monstercat/features',
        subscriptions: 'https://api.twitch.tv/kraken/channels/monstercat/subscriptions',
        editors: 'https://api.twitch.tv/kraken/channels/monstercat/editors',
        teams: 'https://api.twitch.tv/kraken/channels/monstercat/teams',
        videos: 'https://api.twitch.tv/kraken/channels/monstercat/videos',
      },
    },
    _links: {
      self: 'https://api.twitch.tv/kraken/streams/monstercat',
    },
  }];
/**
 * Creates a new user by handling the POST request from a form with action `/users`
 * It uses the createUser middleware from the user model
 */
usersRouter.post('/', createUser, (req, res) => {
  res.redirect('/');
});

/**
 * Takes the user to its profile by handling any GET request to `/users/profile`
 * It redirects to /login when attempted to be reached by a non logged in user
 * It is "protected" by the authenticate middleware from the auth library
 */
usersRouter.get('/profile', authenticate, igdbSearch, twitchSearch, saveToDB, getFavorites, (req, res) => {
  res.render('users/profile', {
    user: res.user,
    result: res.result,
    stream: res.twitch || null,
    favorites: res.favorites || [],
  });
});
usersRouter.post('/profile', saveFavorite, (req, res) => {
  res.redirect('/users/profile');
});

usersRouter.delete('/profile/:id', deleteFavorites, (req, res) => {
  res.redirect('/users/profile');
});
// usersRouter.get('/favorites', getFavorites, (req, res) => {
//   res.render('users/profile', {


//   });
// });

module.exports = usersRouter;
