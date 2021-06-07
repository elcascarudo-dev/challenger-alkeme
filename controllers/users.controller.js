/*****************************************************************************
 * 
 * Importación de librerias
 * 
 */
const logger = require('log4js').getLogger('usuarios');
const { response } = require('express');
const bcrypt = require( 'bcryptjs' );

/*****************************************************************************
 * 
 * Importación de modelos
 * 
 */
const Usuario = require( '../models/users.model' );

/*****************************************************************************
 * 
 * Importación de helpers
 * 
 */
const { generarJWT } = require( '../helpers/jwt.helper' );


/*****************************************************************************
 * 
 * Controlado "listar" usuarios
 * 
 */

const listar = async ( req, res ) => {

  const desde = Number( req.query.desde ) || 0;

  const [ usuarios, total ] = await Promise.all([

    Usuario
            .find( {}, 'nombre mail role img email estado' )
            .skip( desde )
            .limit( 5 ),

    Usuario.countDocuments()
  
  ]);

  res.json({
    ok: true,
    usuarios,
    total
  });

}

/*****************************************************************************
 * 
 * Controlado "crear" usuarios
 * 
 */

const crear = async ( req, res ) => {

  const { 
          email, 
          password 
        } = req.body;

  try {
    // Validamos que el mail no exista en la BBDD
    const existeEmail = await Usuario.findOne( {email} );
    // Si existe  devuelvo mensaje 
    if ( existeEmail ) {
      
      logger.error( `El email: ${ email }, ya existe en la BBDD` );

      return res.status( 400 ).json({
        ok: false,
        msg: 'El usuario ya existe'
      });

    }

    const usuario = new Usuario( req.body );

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // Creo el usuario en la BBDD
    await usuario.save();

    // Generar Token JWT
    const token = await generarJWT( usuario.id );

    // Devuelvo la respuesta
    res.json({
      ok: true,
      usuario,
      token
    });
    
  } catch (error) {
    error500( 'crear', error );
  }


}

/*****************************************************************************
 * 
 * Controlado "actualizar" usuarios
 * 
 */
const actualizar = async ( req, res = response ) => {

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById( uid );

    if( !usuarioDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe usuario con el ID indicado'
      });
    }

    const campos = req.body;

    if( usuarioDB.email === req.body.email ){
      // Si el mail es el mismo que ya tengo lo saco de los campos porque no lo quiero actualizar
      delete campos.email;
    } else {

      // Valido que el mail no exista si es que lo quiero cambiar por otro
      // Validamos que el mail no exista en la BBDD
      const existeEmail = await Usuario.findOne( {email: req.body.email} );
      // Si existe  devuelvo mensaje 
      if ( existeEmail ) {
        
        logger.error( `El email: ${ email }, ya existe en la BBDD` );

        return res.status( 400 ).json({
          ok: false,
          mensaje: `El email: ${ email }, ya existe en la BBDD`
        });
      }


    }

    // Elimino campos que no quiero actualizar
    delete campos.password;
    delete campos.google;

    // Actualizo el usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
    
    res.json({
      ok: true,
      usuario: usuarioActualizado
    });


  } catch (error) {
    logger.error( `usuario - ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'El Email ingresado ya existe'
    });
  }
}

/*****************************************************************************
 * 
 * Controlado "habilitar" usuarios
 * 
 */

const habilitar = async ( req, res = response ) => {

  const uid = req.params.id;

  
  try {
    
    const usuarioDB = await Usuario.findById( uid );
  
    if( !usuarioDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe usuario con el ID indicado'
      });
    }


    usuarioDB.estado = !usuarioDB.estado;
    
    await usuarioDB.save();
    
    res.json({
      ok: true,
      msg: 'Se modifico el usario correctamente'
    });

  } catch (error) {

      logger.error( `eliminar - ${ error }` );
  
      res.status( 500 ).json({
        ok: false,
        msg: 'No se puede bloquear el usuario indicado'
      });

  }

}

/*****************************************************************************
 * 
 * Controlado "eliminar" usuarios
 * 
 */

 const eliminar = async ( req, res = response ) => {

  const uid = req.params.id;

  
  try {
    
    const usuarioDB = await Usuario.findById( uid );
  
    if( !usuarioDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe usuario con el ID indicado'
      });
    }


    await Usuario.findByIdAndDelete( uid );
    
    res.json({
      ok: true,
      msg: `Se elimino el usuario ${ usuarioDB.nombre }`
    });

  } catch (error) {

      logger.error( `eliminar - ${ error }` );
  
      res.status( 500 ).json({
        ok: false,
        msg: 'No se puede bloquear el usuario indicado'
      });

  }

}

// Exportación de los controladores
module.exports = {
  listar,
  crear,
  actualizar,
  eliminar,
  habilitar
}