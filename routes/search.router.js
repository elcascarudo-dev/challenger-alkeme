/*****************************************************************************
 * 
 * Importaciones de paquetes
 * 
 */
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

/*****************************************************************************
 * 
 * Middleware
 * 
 */
const { validarJWT } = require( '../middleware/validar-jwt.middleware' );

/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { 
      global,
      usuarios,
      } = require( '../controllers/search.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/search
 * 
 */
router.get( '/global/:buscar', validarJWT, global );
router.get( '/usuarios/:buscar', validarJWT, usuarios );


/*****************************************************************************
 * 
 * Exportar Rutas
 * 
 */
module.exports = router;