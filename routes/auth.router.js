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

const { 
        crear,
      } = require( '../controllers/users.controller' );

const router = Router();

/*****************************************************************************
 * 
 * Ruta para login
 * 
 */
router.post( '/login',
  [ // Middleware de la ruta
    check( 'email', 'El Email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatori' ).not().isEmpty(),
    validarCampos
  ],
  login
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *      description: Login de usuarios
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: login
 *            description: Login data
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - password
 *              properties:
 *                  email:
 *                      type: string
 *                      example: elcascarudo.dev@gmail.com
 *                  password:
 *                      type: string
 *                      example: 123456
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
/*****************************************************************************
 * 
 * Ruta para registrarce
 * 
 */
router.post( '/register', 
  // en el segundo parametro se colocan lo Middleware correspondientes a la ruta
  [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos // Middleware personalizado
  ], 
  crear 
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *      description: Login de usuarios
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: register
 *            description: Login data
 *            schema:
 *              type: object
 *              required:
 *                 - nombre
 *                 - email
 *                 - password
 *              properties:
 *                  nombre:
 *                      type: string
 *                      example: El Cascarudo
 *                  email:
 *                      type: string
 *                      example: elcascaduro.dev@gmail.com
 *                  password:
 *                      type: string
 *                      example: Password123
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

/*****************************************************************************
 * 
 * Ruta renovar token
 * 
 */
router.get( '/renew', [ validarJWT ], renewToken );

/**
 * @swagger
 * /api/auth/renew:
 *   get:
 *      description: Renovar token
 *      tags:
 *          - auth
 *      parameters:
 *          - in: query
 *            name: token
 *            required: true
 *            description: Token generado del login
 *            schema:
 *              type: string
 *              required:
 *                 - token
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

/*****************************************************************************
 * 
 * Ruta restore password
 * 
 */
router.get( '/restore/password/:email', restorePassword );
/**
 * @swagger
 * /api/auth/restore/password/{email}:
 *   get:
 *      description: Envia nueva contraseña al mail
 *      tags:
 *          - auth
 *      parameters:
 *          - in: path
 *            name: email 
 *            required: true
 *            schema:
 *              type: string
 *              minimum: 8
 *            description: Email del usuario que perdio la contraseña
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

/*****************************************************************************
 * 
 * Exporto las rutas
 * 
 */
module.exports = router;