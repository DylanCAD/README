const mongoose = require('mongoose')
const PhotoSchema = new mongoose.Schema({
  titre: String,
});

module.exports = PhotoSchema;