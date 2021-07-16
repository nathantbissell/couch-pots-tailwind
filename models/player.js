const { Decimal128 } = require("mongodb");
const { Double } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = Schema({
  name: String,
  position: String,
  auctionPrice: Number,
  totalPoints: Number,
  average: Decimal128,
  bio: String,
  otherLeagueDraftValue: Decimal128,
});

const Model = mongoose.model("Player", playerSchema, "players");

module.exports = Model;
