# challenger-alkeme
Challenger alkeme - NodeJS




## Pasos para ejecutar en entorno de desarrollo

1.- Clonar el repositorio

```
git clone https://github.com/elcascarudo-dev/challenger-alkeme.git
```

2.- ingresar al directorio 

```bash
cd challenger-alkeme
```

3.- Copiar el archivo .env_model

```bash
cp .env_model .env
```

4.- Aplicar configuración

| CLAVE                        | VALOR                                                         |
|------------------------------|---------------------------------------------------------------|
| DEBUG_LEVEL                  | Nivel de log para log4js (debug, info, warn, error, critical) |
| PORT                         | Puerto de publicación, por defecto 3000                       |
| DB_CNN                       | Cadena de conexión a BBDD MongDB (ver ejecución en docker )   |
| JWT_SECRET                   | Semilla para la generación del JWT                            |
| SENDGRID_API_KEY             | Api-key generada desde SendGrid                               | 
| SENDGRID_EMAIL_AUTIRITATION  | Email configurado en SendGrid como autorizado                 |

5.- Instalar paquetes

```JavaScript
npm install --prod
```

6.- Ejecutar aplicación

```JavaScript
npm run start:dev
```

## Ejecutar BBDD MongoDB con docker y docker-compose

Se debe tener instalado [docker](https://docker.com)

1.- Ejecutar la siguiente linea en la terminal

```yml
docker run --name mongo-dev -p 27017:27017 -d mongo
```

