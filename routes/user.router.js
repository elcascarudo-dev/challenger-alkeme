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
const { validarCampos } = require( '../middleware/validar-campos.middleware' );
const { validarJWT } = require( '../middleware/validar-jwt.middleware' );

/*****************************************************************************
 * 
 * Controladores
 * 
 */
const { 
        listar,
        actualizar,
        eliminar
      } = require( '../controllers/users.controller' );


const router = Router();

/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/users
 * 
 */
router.get( '/', validarJWT, listar );
/**
 * @swagger
 * /api/users:
 *   get:
 *      description: Listar todo los usuarios
 *      tags:
 *          - users
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

router.put( '/:id', 
  // en el segundo parametro se colocan lo Middleware correspondientes a la ruta
  [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos // Middleware personalizado
  ], 
  actualizar 
);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *      description: Eliminar usuario
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: users
 *            description: Actualizar datos
 *            required: false
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - nombre
 *              properties:
 *                  email:
 *                      type: string
 *                      example: elcascarudo.dev@gmail.com
 *                  nombre:
 *                      type: string
 *                      example: El Cascarudo
 *          - in: path
 *            name: id 
 *            required: true
 *            schema:
 *              type: string
 *              minimum: 1
 *            description: ID del usuario a actualizar
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


router.delete( '/:id', validarJWT, eliminar );

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *      description: Actualizar Usuario
 *      tags:
 *          - users
 *      parameters:
 *          - in: path
 *            name: id   # Note the name is the same as in the path
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: ID del usuario a eliminar
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
 * Exporto las rutas
 * 
 */
module.exports = router;