/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const logger = require('log4js').getLogger('serach');
const { response } = require('express');

/*****************************************************************************
 * 
 * Importación modelos
 * 
 */
const User = require( '../models/users.model' );


/*****************************************************************************
 * 
 * Controladores
 * 
 */
const global = async ( req, res ) => {

  const buscar = new RegExp( req.params.buscar, 'i' );
  // const regex = new RegExp( buscar, 'i' );
  
  const [ usuarios ] = await Promise.all([
    User.find({ nombre: buscar }),
  ]);

  res.json({
    ok: true,
    usuarios
  });

}

const usuarios = async ( req, res ) => {

  const buscar = new RegExp( req.params.buscar, 'i' );

  const usuarios = await User.find( { nombre: buscar } );

  res.json({
    ok: true,
    usuarios
  });
}


/*****************************************************************************
 * 
 * Exporto los controladores
 * 
 */
module.exports = {
  global,
  usuarios
}