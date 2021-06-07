// Levanta las variables de entorno del archivo .env
require( 'dotenv' ).config();

//Importación de terceros
const logger = require('log4js').getLogger();
const express = require( 'express' );
const cors = require('cors');

// Importación propias
const { dbConection } = require( './database/config' );

// Nivel de Debug
logger.level = process.env.DEBUG_LEVEL;

//Crear servicor Express
const app = express();
// Cors origin
app.use( cors() );
// Lectura y parseo del Body
app.use( express.json() );

// Conexión a la BBDD
dbConection();

//rutas
app.use( '/', require( './routes/index.router' ) );

// Expongo el api-rest
app.listen( process.env.PORT, () => {
  logger.debug( `Corriendo en el puerto ${ process.env.PORT }` );
});