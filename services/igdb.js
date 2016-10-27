const fetch = require('node-fetch');

const API_URL = 'https://itunes.apple.com/search?';


function itunesSearch(req, res, next) {

  fetch(`${API_URL}term=${req.body.searchTerm}&entity=album&medium=music`)
  .then(r => r.json())
  .then((data) => {
    res.result = data.results;
    next();
  })
  .catch(err => {
    res.err = err;
    next();
  });
}


module.exports = {
  itunesSearch,
};
