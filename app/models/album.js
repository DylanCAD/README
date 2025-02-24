const mongoose = require('mongoose');
const PhotoSchema  = require('./photo');

const AlbumSchema  = new mongoose.Schema({
  titre: String,
  photos: [PhotoSchema]
}, {
  collection: 'albums',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
});

module.exports = AlbumSchema