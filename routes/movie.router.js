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
 const  {
          crear,
          listar,
          listarDetalle,
          actualizar,
          eliminar
        } = require( '../controllers/movie.controller' );


/*****************************************************************************
 * 
 * Rutas
 * 
 * /api/movie
 * 
 */

const router = Router();

router.post( '/', [ validarJWT ], crear );
/**
 * @swagger
 * /api/movie:
 *   post:
 *      description: Crear Personajes
 *      tags:
 *          - movie
 *      parameters:
 *          - in: body
 *            name: Crear
 *            description: Crear nuevo personaje
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - type
 *                - at_date
 *                - calificacion
 *              properties:
 *                  title:
 *                      type: string
 *                      example: El Cascarudo
 *                      required: true
 *                  type:
 *                      type: string
 *                      example: movie / serie
 *                      required: true
 *                  at_date:
 *                      type: date
 *                      example: 2021/06/17
 *                      required: true
 *                  calificacion:
 *                      type: integer
 *                      example: 1 - 5
 *                      required: true
 *          - in: query
 *            name: token
 *            required: true
 *            description: Token generado del login
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

 router.get( '/:id', [ validarJWT ], listarDetalle );
/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *      description: Listar detalles Pelicula
 *      tags:
 *          - movie
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID pelicula
 *          - in: query
 *            name: token
 *            required: true
 *            schema:
 *              type: string
 *            description: Token generado del login
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get( '/', [ validarJWT ], listar );
/**
 * @swagger
 * /api/movie:
 *   get:
 *      description: Listar Peliculas
 *      tags:
 *          - movie
 *      parameters:
 *          - in: query
 *            name: token
 *            required: true
 *            schema:
 *              type: string
 *            description: Token generado del login
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
 * /api/movie/{id}:
 *   put:
 *      description: Actualizar detalles Pelicula
 *      tags:
 *          - movie
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID pelicula
 *          - in: query
 *            name: token
 *            required: true
 *            schema:
 *              type: string
 *            description: Token generado del login
 *          - in: body
 *            name: movie
 *            description: Actualizar pelicula
 *            schema:
 *              type: object
 *              required:
 *                 - title
 *                 - type
 *                 - at_dat
 *                 - calificacion
 *              properties:
 *                  title:
 *                      type: string
 *                      example: El Cascarudo
 *                  type:
 *                      type: string
 *                      example: pelicula o serie
 *                  at_date:
 *                      type: string
 *                      example: 2021-06-19
 *                  calificacion:
 *                      type: number
 *                      example: 5
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

 router.delete( '/:id', [ validarJWT ], eliminar );
 /**
  * @swagger
  * /api/movie/{id}:
  *   delete:
  *      description: Listar detalles Pelicula
  *      tags:
  *          - movie
  *      parameters:
  *          - in: path
  *            name: id
  *            required: true
  *            schema:
  *              type: string
  *            description: ID pelicula
  *          - in: query
  *            name: token
  *            required: true
  *            schema:
  *              type: string
  *            description: Token generado del login
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