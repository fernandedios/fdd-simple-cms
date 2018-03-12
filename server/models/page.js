const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: String,
  desc: String,
  body: String,
  tags: String,
  thumbnail: String,
  image: Array,
  language: String,
  sub: [{
    page: { type: Schema.Types.ObjectId, ref: 'Page' }
  }]
});

module.exports = mongoose.model('Course', PageSchema);
