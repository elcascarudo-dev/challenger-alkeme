const { Schema, model } = require( 'mongoose' );

const GenreSchema = Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  img: {
    type: String
  },
  relation: [{
    type: Schema.Types.ObjectId
  }]
});

module.exports = model( 'Genre', GenreSchema );