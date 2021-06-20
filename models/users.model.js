const { Schema, model } = require( 'mongoose' );

const UserSchema = Schema({

  nombre: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    require: true,
    default: 'USER_ROLE'
  },
  estado: {
    type: Boolean,
    default: true
  }

});

UserSchema.method( 'toJSON', function() {
  // Quito los campos "__v, _id, password"
  const { __v, _id, password, ...object } = this.toObject();
  // Cambio el _id por uid y lo agrego al objeto, solo a modo visual
  object.uid = _id;
  return object;
});


module.exports = model( 'User', UserSchema );