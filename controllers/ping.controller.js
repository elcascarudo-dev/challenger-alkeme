/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const logger = require('log4js').getLogger('ping');


/*********************************************************************
 * 
 *   Respondo pong si el servidor levanto correctamente
 * 
 */
const ping = async ( req, res ) => {
  
  res.json( { ok: true, msg: 'pong' } );

}



// Exportación de los controladores
module.exports = {
  ping
}