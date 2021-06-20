const logger = require('log4js').getLogger('sendgrid - helper');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const enviarEmail = async ( email, msg ) => {
  
  const body = {
    to: email,
    from: process.env.SENDGRID_EMAIL_AUTIRITATION, // Use the email address or domain you verified above
    subject: msg.title,
    //text: 'and easy to do anywhere, even with Node.js',
    html: msg.body,
  };


  try {
    await sgMail.send( body );
    logger.debug( `Se envio email a ${ email }` );
  } catch (error) {
    
    logger.error( error );

    if (error.response) {
      logger.error( error.response.body );
    }
  }
};

module.exports = { enviarEmail }