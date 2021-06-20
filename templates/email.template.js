const templateWelcome = ( email, password ) => {

  return {
    title: 'Bienvenido al Challenge de NodeJS para Alkemy',
    body: `
        Gracias por registrarte en esta magnifica aplicación de Series Y Peliculas <br><br> 
        A continuación te dejamos tus datos de acceso: <br>
        <b>Usuasio:</b> ${ email } <br>
        <b>Contraseña:</b> ${ password } <br><br><br>
        Ya podes comenzar a disfrutar`
  }


}

const templateRestorePassword = ( password ) => {
  return {
    title: 'LLego tu nueva contraseña',
    body: `
        Al cambiar tu contraseña no tiene tiempo de caducidad por lo que la podes cambiar desde tu perfil cuando quieras nuevamente: <br><br> 
        Tu nueva contraseña es: <br>
        <b>Contraseña:</b> ${ password } <br><br><br>
        Ya podes comenzar a disfrutar`
  }
}

module.exports =  { 
                    templateWelcome,
                    templateRestorePassword
                   }