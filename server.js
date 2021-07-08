const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cors = require("cors");
const app = express();
app.use(express.json());

const playerRoutes = require("./routes/player_routes");
app.use(playerRoutes);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

var connectionString =
  "mongodb+srv://admin:admin123@couchpots.q4sd4.mongodb.net/player-names?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
