const { Decimal128 } = require('mongodb');
const { Double } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = Schema({
  name: String,
  position: String,
  auctionPrice: Number,
  totalPoints: Number,
  average: Number,
  bio: String,
  otherLeagueDraftValue: Number,
});

const Model = mongoose.model('Player', playerSchema, 'players');

module.exports = Model;
