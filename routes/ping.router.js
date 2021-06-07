/*****************************************************************************
 * 
 * Importaciones de paquetes
 * 
 */
const { Router } = require( 'express' );


/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { 
        ping
      } = require( '../controllers/ping.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 */
// Rutas para los usuarios
router.get( '/', ping );


/*****************************************************************************
 * 
 * Exportar rutas
 * 
 */
module.exports = router;