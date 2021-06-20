const { Schema, model } = require( 'mongoose' );


const CharacterSchema = Schema({

  img: {
    type: String
  },
  name: {
    type: String,
    require: true,
    unique: true
  },
  age: {
    type: Number
  },
  peso: {
    type: Number
  },
  history: {
    type: String
  },
  relation: [{
    type: Schema.Types.ObjectId
  }],
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = model( 'Character', CharacterSchema );