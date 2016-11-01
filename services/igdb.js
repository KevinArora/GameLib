const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

function igdbSearch(req, res, next) {
  const game = req.query.game;
  console.log(game);
  fetch(`https://www.giantbomb.com/api/search?json_callback=JSON_CALLBACK&api_key=${API_KEY}&format=json&resources=game&limit=1&query=${game}`)
  .then(r => r.json())
  .then((data) => {
    res.result = data;
    console.log(data);
    next();
  })
  .catch(err => {
    res.err = err;
    next();
  });
}


module.exports = {
  igdbSearch,
};
