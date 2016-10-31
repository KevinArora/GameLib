const fetch = require('node-fetch');

const API_URL = 'https://www.giantbomb.com/api/search?json_callback=JSON_CALLBACK&api_key=${API_KEY}&format=jsonp&resources=game&limit=1&query=';


function igdbSearch(req, res, next) {
const game = req.query.game;
console.log(game)
  fetch(`https://www.giantbomb.com/api/search?json_callback=JSON_CALLBACK&api_key=ecf2a23ade0df5e6eb1a0e29ee29e0f1738c9553&format=json&resources=game&limit=1&query=${game}`)
  .then(r => r.json())
  .then((data) => {
    res.result = data;
    console.log(data)
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



