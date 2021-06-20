/*****************************************************************************
 * 
 * Importación de librerias
 * 
 */
const logger = require('log4js').getLogger('bbdd');
const mongoose = require('mongoose');


/*****************************************************************************
 * 
 * Parametros de configuración MongoDB
 * 
 */
const configuraciones = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

/*****************************************************************************
 * 
 * Conexxión a la BBDD
 * 
 */
const dbConection = async() => {

  try {
    await mongoose.connect( process.env.DB_CNN, configuraciones );
    logger.debug( 'Conectados a la BBDD' );
  } catch ( error ) {
    logger.error( `Error al conectarse a la BBDD: ${ error }` );
    throw new Error( 'Error al conectar a la BBDD' );
  }

}

module.exports = {
  dbConection
}