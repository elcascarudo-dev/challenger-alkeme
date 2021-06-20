/*****************************************************************************
 * 
 * Importación de librerias
 * 
 */
 const logger = require('log4js').getLogger('movie');
 const { response } = require('express');
 const mongoose = require('mongoose');

 /*****************************************************************************
 * 
 * Importación de modelos
 * 
 */
const Movie     = require( '../models/movie.model');
const Character = require( '../models/character.model' );

/*****************************************************************************
 * 
 * Controlado "crear" pelicula
 * 
 */
const crear = async ( req, res = response ) => {

  const { title, type } = req.body;


  try {

    /*************************************************************
     *    Valido que la pelicula que voy a crear es Unica
     * se trabaja en este punto para evitar el error en el
     * "catch"
     *************************************************************/
    const existeMovie = await Movie.find( { title } );

    if( !existeMovie ){
      logger.debug( `La pelicula: ${ title }, ya existe` );

      return res.status( 400 ).json({
        ok: false,
        msg: `La pelicula: ${ title }, ya existe`
      });
    }

    

    /***************************************************************
     *  Valores permitidos para la calificación
     ***************************************************************/
    const numPermitidos = [ 1, 2, 3, 4, 5 ];
    if( !numPermitidos.includes( req.body.calificacion ) ){
      return res.status(400).json({
        ok: false,
        msh: 'La calidicación debe ser un número entre 1 y 5'
      });
    }

    /***************************************************************
     *  Tipos permitidos
     ***************************************************************/
    const typePermitidos = [ 'movie', 'serie' ];
    if( !typePermitidos.includes( type ) ){
      return res.status(400).json({
        ok: false,
        msh: `Los tipos permitidos son ${ typePermitidos.join( ' y ' ) }`
      });
    }

    

    /***************************************************************
     *  Guardo la pelicula en la BBDD
     ***************************************************************/
    const pelicula = new Movie( req.body );
    await pelicula.save();

    /***************************************************************
     *  Retorno los datos guardados en la BBDD
     ***************************************************************/
     res.json({
      ok: true,
      movie: pelicula
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
 * Controlado "listar" pelicula
 * 
 */
const listar = async ( req, res = response ) => {

  try {
    
      /************************************************************
       * Trae el listado de todas las peliculas
       ************************************************************/
    
      const [ movies, total ] = await Promise.all([
    
        Movie.find( {}, 'img title at_date' ),
        Movie.countDocuments()
    
      ]);

      res.json({
        ok: true,
        total,
        movies
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
 * Controlado "listar detalles" pelicula
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
      logger.warn( `No existe la pelicula con el ID ${ _id }` );  
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe pelicula con el ID indicado'
      });
    }
    
  /************************************************************
   * Trae el detalle de los actores de la pelicula
   ************************************************************/

    const [ movie, characters ] = await Promise.all([

      Movie.findById( _id ),
      Character.find( { relation: _id }, 'name' )

    ]);

    res.json({
      ok: true,
      movie,
      characters
    });
    
  } catch (error) {
    logger.error( `listarDetalle - ${ error }` );    
    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido comuniquese con el administradro'
    });
  }
}

/*****************************************************************************
 * 
 * Controlado "actualizar" pelicula
 * 
 */
const actualizar = async ( req, res = response ) => {

  const _id = req.params.id;
  logger.debug( `Id Ingresado ${ _id } para actualizar` );

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
    logger.debug( `Validando si existe la pelicula con ID ${ _id }` );
    const movieDB = Movie.findById( _id );

    if( !movieDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe pelicula con el ID indicado'
      });
    }

  /***************************************************************
   *  Valores permitidos para la calificación
   ***************************************************************/
    const numPermitidos = [ 1, 2, 3, 4, 5 ];
    if( !numPermitidos.includes( req.body.calificacion ) ){
      return res.status(400).json({
        ok: false,
        msh: 'La calidicación debe ser un número entre 1 y 5'
      });
    }

    /***************************************************************
     *  Tipos permitidos
     ***************************************************************/
    const typePermitidos = [ 'movie', 'serie' ];
    if( !typePermitidos.includes( req.body.type ) ){
      return res.status(400).json({
        ok: false,
        msh: `Los tipos permitidos son ${ typePermitidos.join( ' y ' ) }`
      });
    }

    /***************************************************************
     *  Convierto en fecha el parametro at_date
     ***************************************************************/
    const movie = {
      ...req.body,
      at_date: new Date( Date.parse( req.body.at_date ))
    }


    /***************************************************************
     *  Actualizo la pelicula
     ***************************************************************/
    logger.debug( `Actualizando la pelicula con ID ${ _id }` );
    const movieUpdate = await Movie.findByIdAndUpdate( _id, movie, { new: true } );

    res.json({
      ok: true,
      movie: movieUpdate
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
 * Controlado "eliminar" pelicula
 * 
 */
const eliminar = async ( req, res = response ) => {
  
  const _id = req.params.id;
  logger.debug( `Id Ingresado ${ _id } para eliminar` );

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
      logger.warn( `No existe la pelicula con el ID ${ _id }` );  
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe pelicula con el ID indicado'
      });
    }

    await Movie.findByIdAndDelete( _id );

    res.json({
      ok: true,
      msg: 'Se elimino correctamente la pelicula',
      movie: movieDB
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