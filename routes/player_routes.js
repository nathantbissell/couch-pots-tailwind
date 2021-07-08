const express = require("express");
const router = express.Router();
const Player = require("../models/player");

// Player.create({ name: "Matt Ryan", position: "QB" }, function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

// Player.find({}, function (err, data) {
//   console.log("player find function in player_routes");
//   console.log(err, data, data.length);
// });

router.get("/players", (req, res) => {
  Player.find()
    .then((players) => {
      // `players` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return players.map((player) => player.toObject());
    })
    // respond with status 200 and JSON of the players
    .then((players) => res.status(200).json({ players: players }))
    // if an error occurs, pass it to the handler
    .catch((err) => handle(err, res));
});

module.exports = router;
