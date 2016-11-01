const fetch = require('node-fetch');


function twitchSearch(req, res, next) {
  const game = req.query.game;
  console.log(game)
  fetch(`https://api.twitch.tv/kraken/search/streams?q=${game}&limit=100&offset=0&client_id=${API_ID}`)
  .then(r => r.json())
  .then((data) => {
    res.twitch = data;
    console.log(data)
    next();
  })
  .catch(err => {
    res.err = err;
    next();
  });
}


module.exports = {
  twitchSearch,
};
