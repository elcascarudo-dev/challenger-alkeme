/**
 * Rutas para subir archivos
 * 
 * /api/upload
 */

/*****************************************************************************
 * 
 * Importación de paquetes
 * 
 */
 const { Router } = require( 'express' );
 const expressFileUpload = require( 'express-fileupload' );

/*****************************************************************************
 * 
 * Middleware
 * 
 */
 const { validarJWT } = require( '../middleware/validar-jwt.middleware' );
 
/*****************************************************************************
 * 
 * Importación de controladores
 * 
 */
 const  { 
          uploadPhoto, 
          viewPhoto 
        } = require( '../controllers/upload.controller' );
 


 const router = Router();
 // Paquete para subir archivos por medio de ExpressJS
 router.use( expressFileUpload() );


/*****************************************************************************
 * 
 * Rutas
 * 
 */
 router.put( '/foto/:type/:id', validarJWT, uploadPhoto );
/**
 * @swagger
 * /api/upload/foto/{type}/{id}:
 *   put:
 *      description: Listar detalles Pelicula
 *      tags:
 *          - upload
 *      parameters:
 *          - in: path
 *            name: type
 *            required: true
 *            schema:
 *              type: string
 *            description: Tipos( profile, movie (para series o peliculas), genre, character )
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
 *          - in: formData
 *            name: imagen
 *            type: file
 *            description: Imagen a subir.
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

 router.get( '/foto/:type/:image', viewPhoto );
 /**
 * @swagger
 * /api/upload/foto/{type}/{image}:
 *   get:
 *      description: Listar detalles Pelicula
 *      tags:
 *          - upload
 *      parameters:
 *          - in: path
 *            name: type
 *            required: true
 *            schema:
 *              type: string
 *            description: Tipos( profile, movie (para series o peliculas), genre, character )
 *          - in: path
 *            name: image
 *            required: true
 *            schema:
 *              type: string
 *            description: Imagen a mostrar
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
 * Exportar rutas
 * 
 */
 module.exports = router;