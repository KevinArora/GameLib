const router = require('express').Router();

const { igdbSearch } = require('../services/igdb');
const { twitchSearch } = require('../services/twitch')
router.get('/', igdbSearch, twitchSearch,(req, res) => {
  res.render('index', {
    result : res.result,
    stream : res.twitch,
  });



});

module.exports = router;
