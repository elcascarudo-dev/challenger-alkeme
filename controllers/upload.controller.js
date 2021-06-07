/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const fs = require( 'fs' );
const path = require( 'path' );
const logger = require('log4js').getLogger('upload');
const { v4: uuidv4 } = require('uuid');

/*****************************************************************************
 * 
 * Modelo
 * 
 */
const Usuario = require( '../models/users.model' );

/*****************************************************************************
 * 
 * Cargar imagenes
 * 
 * El parametro "tipo" es obligatorio y debe:
 * -> ticket
 * -> perfil
 * 
 */
const subirFoto = async ( req, res ) => {

  const uid  = req.params.id;
  const tipo = req.params.tipo;

  // Valido si se envio algun archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msh: 'No hay imagen para poder subir'
    });
  }

  // Valido que el tipo sea el permitido
  const tipoPermitido = [ 'perfil', 'ticket' ];
  
  if ( !tipoPermitido.includes( tipo ) ) {
    return res.status(400).json({
      ok: false,
      msh: `Los tipos permitidos son ${ tipoPermitido.join( ', ' ) }`
    });
  }

  // Procesar Imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split('.');
  const extencionArchio = nombreCortado[ nombreCortado.length - 1 ];
  
  const extencionesValidas = [ 'png', 'jpg', 'jpeg', 'gif', 'JPG' ];

  if ( !extencionesValidas.includes( extencionArchio ) ) {
    return res.status(400).json({
      ok: false,
      msh: 'No es una extención permitida'
    });
  }
  //Nombre de archivo unico
  const nombreArchivo = `${ uuidv4() }.${ extencionArchio }`;
  // Path para guardar imagen
  const path = `./uploads/${ tipo }/${ nombreArchivo }`;

  // Muevo la imagen al directorio seleccionado
  file.mv( path, (err) => {
  
    if (err){
      logger.error( `Error al mover la imagen al servidor: ${ err }` );

      return res.status(500).json({
        ok: false,
        msh: 'Error al mover la imagen'
      });
    }
    
  });


  switch ( tipo ) {
    //---------------------------------------------------------
    // Actualizar imagen perfil
    case 'perfil':
        try {
      
          const usuarioDB = await Usuario.findById( {_id: uid} );
      
          if( fs.existsSync( `./uploads/perfil/${ usuarioDB.img }` ) ){
            // Borro la imagen del path
            fs.unlinkSync( `./uploads/perfil/${ usuarioDB.img }` );
          }
          // Agrego la nueva imagen
          usuarioDB.img = nombreArchivo;
          // Actualizo la BBDD
          const usrActualizado = await usuarioDB.save(); //Usuario.findByIdAndUpdate( {_id: uid}, usuarioDB, { new: true } );
      
          res.json({
            ok: true,
            usuario: usrActualizado
          });
      
        } catch (error) {
          logger.error( error );
      
          return res.status(500).json({
            ok: false,
            msh: 'Ocurrio un error'
          });
        }
      break;
  
    default:
      break;
  }

}



/*********************************************************************************************
 * 
 * Ver fotos
 * 
 */

const verFotos = async ( req, res ) => {

  const imagen = req.params.imagen;
  const tipo   = req.params.tipo;

  // Busco la imagen que mando por los parametros
  const pathFoto = path.join( __dirname, `../uploads/${ tipo }/${ imagen }` );
  // Imagen por defecto cuando no hay imagen 
  const noImage = path.join( __dirname, `../uploads/no-image.png` );

  // Devuelvo la imagen que corresponda
  if( fs.existsSync( pathFoto ) ){
    res.sendFile( pathFoto );
  } else {
    res.sendFile( noImage );
  }


}


module.exports = {
  subirFoto,
  verFotos
}