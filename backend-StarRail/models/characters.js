const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  image: String,
  text:String,
});

module.exports = mongoose.model("characters", cardSchema);