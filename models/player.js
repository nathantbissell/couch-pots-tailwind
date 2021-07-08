const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = Schema({
  name: String,
  position: String,
});

const Model = mongoose.model("Player", playerSchema, "testing");

module.exports = Model;
