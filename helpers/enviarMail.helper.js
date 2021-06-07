/*****************************************************************************
 * 
 * Importaciones de paquetes
 * 
 */
const logger = require('log4js').getLogger('enviarMail');
const nodemailer = require('nodemailer');


const enviarMail = (  email, asunto, texto ) => {

  // Retorno una promesa para  manejarlo en las funciones que se invoque
  return new Promise( ( resolve, reject ) => {

    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USS,
            pass: process.env.GMAIL_PSS
        }
    });

    // Definimos el email
    const mailOptions = {
        from: process.env.GMAIL_USS,
        to: email,
        subject: asunto,
        html: texto,
    };


    transporter.sendMail( mailOptions, ( err, info ) => {

      if( err ) {
        // No se pudo enviar el email
        logger.error( err );
        reject( 'No se pudo enviar el mail' );
      } else {
        // Se envio el email correctamente
        logger.debug( info );
        resolve( 'El mail se mando correctemente' );
      }

    });

  });

};

module.exports = { enviarMail }