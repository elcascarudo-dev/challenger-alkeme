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
         listarDetalle,
         crear,
         actualizar
       } = require( '../controllers/genre.controller' );
 
 
 /*****************************************************************************
  * 
  * Rutas
  * 
  * /api/genre
  * 
  */
 
 const router = Router();
 
 
 router.get( '/', listar );
 /**
  * @swagger
  * /api/genre:
  *   get:
  *      description: Listar Personajes
  *      tags:
  *          - genre
  *      parameters:
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
  * /api/genre:
  *   post:
  *      description: Crear Personajes
  *      tags:
  *          - genre
  *      parameters:
  *          - in: body
  *            name: genre
  *            description: Crear nuevo personaje
  *            schema:
  *              type: object
  *              required:
  *                 - name
  *                 - relation
  *              properties:
  *                  name:
  *                      type: string
  *                      example: Cataclismo
  *                      required: true
  *                  relatino:
  *                      type: string
  *                      example: ID pelicula
  *                      required: true
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
  * /api/genre/{id}:
  *   put:
  *      description: Crear Personajes
  *      tags:
  *          - genre
  *      parameters:
  *          - in: path
  *            name: id 
  *            required: true
  *            schema:
  *              type: integer
  *              minimum: 1
  *            description: ID del personaje a actualizar
  *          - in: body
  *            name: genre
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