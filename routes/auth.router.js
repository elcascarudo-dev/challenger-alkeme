/*****************************************************************************
 * Ruta usuarios
 * 
 * /api/login
 */

/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

/*****************************************************************************
 * 
 * Middlewares
 * 
 */
const { validarJWT } = require( '../middleware/validar-jwt.middleware' );
const { validarCampos } = require('../middleware/validar-campos.middleware');

/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { login, 
        renewToken, 
        restorePassword 
      } = require( '../controllers/auth.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Ruta para login
 * 
 */
router.post( '/',
  [ // Middleware de la ruta
    check( 'email', 'El Email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatori' ).not().isEmpty(),
    validarCampos
  ],
  login
);

/*****************************************************************************
 * 
 * Ruta renovar token
 * 
 */
router.get( '/renew', [ validarJWT ], renewToken );

/*****************************************************************************
 * 
 * Ruta cambio de contraseña
 * 
 */
router.post( '/restorePassword', restorePassword );

/*****************************************************************************
 * 
 * Exporto las rutas
 * 
 */
module.exports = router;