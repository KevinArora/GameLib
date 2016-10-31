const fetch = require('node-fetch');

const API_URL = 'https://api.twitch.tv/kraken/search/streams?q=Pokemon&limit=100&offset=0&client_id=siajlizz3jbodyg2a3fss07ycc2c9rg';


function twitchSearch(req, res, next) {
const game = req.query.game;
console.log(game)
  fetch(`https://api.twitch.tv/kraken/search/streams?q=${game}&limit=100&offset=0&client_id=siajlizz3jbodyg2a3fss07ycc2c9rg`)
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
