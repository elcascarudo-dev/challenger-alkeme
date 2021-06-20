/*****************************************************************************
 * 
 * Importación de librerias
 * 
 */
const logger = require('log4js').getLogger('character');
const { response } = require('express');
const mongoose = require('mongoose');

/*****************************************************************************
 * 
 * Importación de modelos
 * 
 */
const Genre = require( '../models/genre.model' );
const Movie = require( '../models/movie.model' );

/*****************************************************************************
 * 
 * Controlado "crear" personages
 * 
 */
 const crear = async ( req, res = response ) => {

  const { name } = req.body;


  try {

    /*************************************************************
     *    Valido que el usuario que voy a crear es Unico
     * se trabaja en este punto para evitar el error en el
     * "catch"
     *************************************************************/
    const existGenGenre = await Genre.findOne( { name } );

    if( existGenGenre ){
      logger.debug( `El genero: ${ name }, ya existe` );

      return res.status( 400 ).json({
        ok: false,
        msg: `El genero: ${ name }, ya existe`
      });
    }

    /***************************************************************
     *  Guardo el genero en la BBDD
     ***************************************************************/
    const genero = new Genre( req.body );
    await genero.save()

    /***************************************************************
     *  Retorno los datos guardados en la BBDD
     ***************************************************************/
    res.json({
      ok: true,
      character: genero
    });
    
  } catch (error) {
    logger.error( `crear - ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido, contacte al administrador'
    });
  }
} 

/*****************************************************************************
 * 
 * Controlado "listar" genero
 * 
 */
 const listar = async ( req, res = response ) => {

  try {
    
      /************************************************************
       * Trae el listado de todas los generos
       ************************************************************/
    
      const [ genre, total ] = await Promise.all([
    
        Genre.find( {}, 'name img' ),
        Genre.countDocuments()
    
      ]);

      res.json({
        ok: true,
        total,
        genre
      });



  } catch (error) {
    logger.error( `listar - ${ error }` );    
    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido comuniquese con el administradro'
    });
  }






}

/*****************************************************************************
 * 
 * Controlado "listar detalles" genero
 * 
 */
 const listarDetalle = async ( req, res = response ) => {

  const _id = req.params.id;
  logger.debug( `Id Ingresado ${ _id }` );

  if( !mongoose.Types.ObjectId.isValid( _id ) ){
    logger.warn( `El ID ${ _id } no tiene un formato valido` );
    return res.json({
      ok: false,
      msg: `El ID ${ _id } no tiene un formato valido`
    });
  }

  try {

    /***************************************************************
     *  Busco si existe el ID en la BBDD
     ***************************************************************/
    logger.debug( `validando ID ${ _id }` ); 
    const movieDB =  await Movie.findById( _id );
 
    if( !movieDB ){
      logger.warn( `No existe genero con el ID ${ _id }` );  
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe genero con el ID indicado'
      });
    }

      /************************************************************
       * Trae el listado de todas los generos
       ************************************************************/
    
      const genreDB = await Genre.findById( _id );

      res.json({
        ok: true,
        genre: genreDB
      });



  } catch (error) {
    logger.error( `listar - ${ error }` );    
    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido comuniquese con el administradro'
    });
  }

}

/*****************************************************************************
 * 
 * Controlado "actualizar" genero
 * 
 */
const actualizar = async ( req, res = response ) => {
  
  const body = req.body;
  const _id = req.params.id;
  logger.debug( `Id Ingresado ${ _id } para actualizar genero` );

  if( !mongoose.Types.ObjectId.isValid( _id ) ){
    logger.warn( `El ID ${ _id } no tiene un formato valido` );
    return res.json({
      ok: false,
      msg: `El ID ${ _id } no tiene un formato valido`
    });
  }

  try {

    
    /***************************************************************
     *  Busco si existe el ID en la BBDD
     ***************************************************************/
    logger.debug( `Validando si existe el genero con ID ${ _id }` );
    const genreDB = Genre.findById( _id );

    if( !genreDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe genero con el ID indicado'
      });
    }


    /********************************************************************
     *  Valido si viene en el body el campo "realtion"
     * - si viene: construyo el update para que se inserte como array
     * - si no viene: mando el cuerpo del body como viene
     ********************************************************************/
     if( req.body.relation ){
      const relation = req.body.relation;

      /******************************************************************
       * Valido si la pelicuala a relacionar existe
       ******************************************************************/
      const movieDB = Movie.findById( { _id: relation } );
      if( !movieDB ){
        return res.status( 404 ).json({
          ok: false,
          msg: 'No existe pelicula con el ID indicado'
        });
      }

      /******************************************************************
       * Armo el arreglo para insertar en la BBDD
       ******************************************************************/
      delete req.body.relation;
      campos = {
        ...req.body,
        "$push": { relation } // Inserto valores como array
      }

    } else {
      campos = req.body
    }

    /***************************************************************
     *  Actualizo la genero
     ***************************************************************/
    logger.debug( `Actualizando la genero con ID ${ _id }` );
    const genreUpdate = await Genre.findByIdAndUpdate( _id, campos, { new: true } );

    res.json({
      ok: true,
      genre: genreUpdate
    });


    
  } catch (error) {
    logger.error( `actualizar - ${ error }` );    
    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido comuniquese con el administradro'
    });
  }
}

/*****************************************************************************
 * 
 * Controlado "eliminar" genero
 * 
 */
 const eliminar = async ( req, res = response ) => {
  
  const _id = req.params.id;
  logger.debug( `Id Ingresado ${ _id } para eliminar genero` );

  if( !mongoose.Types.ObjectId.isValid( _id ) ){
    logger.warn( `El ID ${ _id } no tiene un formato valido` );
    return res.json({
      ok: false,
      msg: `El ID ${ _id } no tiene un formato valido`
    });
  }

  try {
    /***************************************************************
     *  Busco si existe el ID en la BBDD
     ***************************************************************/
    logger.debug( `validando ID ${ _id }` ); 
    const genreDB =  await Genre.findById( _id );
  
    if( !genreDB ){
      logger.warn( `No existe la genero con el ID ${ _id }` );  
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe genero con el ID indicado'
      });
    }

    await Genre.findByIdAndDelete( _id );

    res.json({
      ok: true,
      msg: 'Se elimino correctamente el genero',
      genre: genreDB
    });
    
  } catch (error) {
    logger.error( `actualizar - ${ error }` );    
    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido comuniquese con el administradro'
    });
  }


}



/*****************************************************************************
 * 
 * Exporto los controladores
 * 
 */
module.exports = {
  crear,
  listar,
  listarDetalle,
  actualizar,
  eliminar
}