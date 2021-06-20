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
        crear,
        actualizar
      } = require( '../controllers/character.controller' );


/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/character
 * 
 */

const router = Router();


router.get( '/', listar );
/**
 * @swagger
 * /api/character:
 *   get:
 *      description: Listar Personajes
 *      tags:
 *          - character
 *      parameters:
 *          - in: query
 *            name: token
 *            required: true
 *            schema:
 *              type: string
 *            description: Token generado del login
 * 
 *          - in: query
 *            name: name
 *            required: false
 *            schema:
 *              type: string
 *            description: Nombre del personaje
 * 
 *          - in: query
 *            name: age
 *            required: false
 *            schema:
 *              type: int
 *            description: Edad del actor
 * 
 *          - in: query
 *            name: movie
 *            required: false
 *            schema:
 *              type: string
 *            description: Id de la pelicula
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

 router.get( '/:id', listar );
 /**
  * @swagger
  * /api/character/{id}:
  *   get:
  *      description: Listar Personajes
  *      tags:
  *          - character
  *      parameters:
  *          - in: path
  *            name: id 
  *            required: true
  *            schema:
  *              type: integer
  *              minimum: 1
  *            description: ID del personaje a actualizar
  *          - in: query
  *            name: token
  *            required: true
  *            schema:
  *              type: string
  *            description: Token generado del login
  *
  *      responses:
  *          '200':
  *              description: Resource added successfully
  *          '500':
  *              description: Internal server error
  *          '400':
  *              description: Bad request
  */

router.post( '/', crear );
/**
 * @swagger
 * /api/character:
 *   post:
 *      description: Crear Personajes
 *      tags:
 *          - character
 *      parameters:
 *          - in: body
 *            name: character
 *            description: Crear nuevo personaje
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - age
 *                 - peso
 *                 - history
 *              properties:
 *                  name:
 *                      type: string
 *                      example: El Cascarudo
 *                      required: true
 *                  age:
 *                      type: int
 *                      example: 37
 *                  peso:
 *                      type: int
 *                      example: 55
 *                  history:
 *                      type: string
 *                      example: Buscando nuevos horizontes en el mundo de sistemas
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

router.put( '/:id', [ validarJWT ], actualizar );
/**
 * @swagger
 * /api/character/{id}:
 *   put:
 *      description: Crear Personajes
 *      tags:
 *          - character
 *      parameters:
 *          - in: path
 *            name: id 
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: ID del personaje a actualizar
 *          - in: body
 *            name: character
 *            description: Crear nuevo personaje
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - age
 *                 - peso
 *                 - history
 *                 - relation
 *              properties:
 *                  name:
 *                      type: string
 *                      example: El Cascarudo
 *                  age:
 *                      type: int
 *                      example: 37
 *                  peso:
 *                      type: int
 *                      example: 55
 *                  history:
 *                      type: string
 *                      example: Buscando nuevos horizontes en el mundo de sistemas
 *                  relation:
 *                      type: string
 *                      example: ID de la serie o pelicula a relacionar con el personaje
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