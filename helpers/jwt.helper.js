/*****************************************************************************
 * 
 * Importaciones de paquetes
 * 
 */
const logger = require('log4js').getLogger('jwt');
const jwt = require( 'jsonwebtoken' );


const generarJWT = ( uid ) => {

  return new Promise( ( resolve, reject ) => {
    //Contendo que quiero enviar en el payload
    const payload = {
      uid
    }
  
    //Genero el JWT
    jwt.sign( payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    }, ( err, token ) => {

      if (err) {
       logger.error( `generaeJWT - ${ err }` ); 
       reject( 'No se pudo generar el JWT' );
      } else {
        logger.debug( token );
        resolve( token );
      }
  
    });

  });

}

module.exports = {
  generarJWT
}