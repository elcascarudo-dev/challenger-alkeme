const { Schema, model } = require( 'mongoose' );

const MovieSchema = Schema({
  img: {
    type: String
  },
  title: {
    type: String,
    require: true,
    unique: true
  },
  type: {
    type: String,
    require: true
  },
  at_date: {
    type: Date,
    require: true
  },
  calificacion: {
    type: Number,
    require: true
  }
});

module.exports = model( 'Movie', MovieSchema );