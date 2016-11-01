const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');

const DB_CONNECTION = 'mongodb://localhost:27017/games';

function saveToDB (req, res, next) {
  const insertObj = {
    searchTerm: req.body.game,
    gameResults: res.results,
    twitchResults: res.twitch,
    userId: req.session.userId,
  }

  getDB().then((db) => {
    db.collection('history')
    .insert(insertObj, (insertErr, result) => {
      if (insertErr) next(insertErr);

      res.insertResult = result;
      db.close();
      next();
    })
  })
}

module.exports = {
  saveToDB,
}
