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
const Character = require( '../models/character.model' );
const Movie     = require( '../models/movie.model' );
/*****************************************************************************
 * 
 * Controlado "listar" personages
 * 
 */
const listar = async ( req, res = response ) => {

  let search = {};
  const details = req.params.details;

  /*****************************************************
   * Parametros de busqueda
   *****************************************************/
  if( req.query.name ){
    const nombre  = new RegExp( req.query.name , 'i' );
    search = { name: nombre };
  }

  if( req.query.movie ){
    const pelicula = req.query.movie;
    search = { relation:  pelicula };
  }

  if( req.query.age ){
    const age = Number(req.query.age);
    search = { age };
  }

  /*****************************************************
   * indico si se quieren ver los detalles o no del actor
   *****************************************************/
  if( details === 'details'){
    detalle = 'name img relation';
  } else {
    detalle = 'name img';
  }
  try {
  
  /**********************************************************
   *  Consulto en la colección "character" si se encuentran 
   * coinsidencias
   **********************************************************/
    const [ character, resultados, total ] = await Promise.all([
  
      Character.find( search,  detalle ).populate( 'movie', 'titulo' ), // Busco segun los parametros
      Character.countDocuments( search ),   // Cuantos resultados trajo la busqueda
      Character.countDocuments( )           // Cuantos registros hay en total
  
    ]);

    res.json({
      ok: true,
      total,
      resultados,
      character
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
 * Controlado "listar" personages
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
      const character = Character.findById( _id );

      if( !character ){
        return res.status( 404 ).json({
          ok: false,
          msg: 'No existe personaje con el ID indicado'
        });
      }



    res.json({
      ok: true,
      character
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
    const existCharacter = await Character.findOne( { name } );

    if( existCharacter ){
      logger.debug( `El personaje: ${ name }, ya existe` );

      return res.status( 400 ).json({
        ok: false,
        msg: `El personaje: ${ name }, ya existe`
      });
    }

    /***************************************************************
     *  Guardo el personaje en la BBDD
     ***************************************************************/
    const personaje = new Character( req.body );
    await personaje.save()

    /***************************************************************
     *  Retorno los datos guardados en la BBDD
     ***************************************************************/
    res.json({
      ok: true,
      character: personaje
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
 * Controlado "actualizar" personages
 * 
 */
const actualizar =  async ( req, res = response ) => {

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
    const characterDB = Character.findById( _id );

    if( !characterDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe personaje con el ID indicado'
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


    characterUpDate = await Character.findByIdAndUpdate( _id, campos , { new: true } );

    res.json({
      ok: true,
      character: characterUpDate
    });

    
  } catch (error) {
    logger.error( `actualizar - ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido, contacte al administrador'
    });
  }
}


/*****************************************************************************
 * 
 * Controlado "eliminar" personages
 * 
 */
const eliminar =  async ( req, res = response ) => {

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
    const movieDB =  await Character.findById( _id );
 
    if( !movieDB ){
      logger.warn( `No existe la pelicula con el ID ${ _id }` );  
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe pelicula con el ID indicado'
      });
    }

    /***************************************************************
     *  Busco si existe el ID en la BBDD
     ***************************************************************/
    const characterDB = Character.findById( _id );

    if( !characterDB ){
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe personaje con el ID indicado'
      });
    }
    
    res.json({
      ok: true,
      character: characterUpDate
    });

    
  } catch (error) {
    logger.error( `actualizar - ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Error desconocido, contacte al administrador'
    });
  }


}

module.exports = {
  listar,
  listarDetalle,
  crear,
  actualizar,
  eliminar
}