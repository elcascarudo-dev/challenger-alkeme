/*****************************************************************************
 * 
 * Importaciones de paquetes
 * 
 */
const { Router } = require( 'express' );
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = Router();

 /*****************************************************************************
  * 
  * Rutas
  * 
  */
  const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
      info: {
        title: 'Challenge NodeJS',
        description: "API documentation",
        contact: {
          name: "elcascarudo.dev@gmail.com",
        },
        servers: ["http://localhost:3000/"],
      },
    }),
    apis: ['../index.js', './routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOption);
  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
 
 /*****************************************************************************
  * 
  * Exportar rutas
  * 
  */
 module.exports = router;