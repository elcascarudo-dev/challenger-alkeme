const express = require('express');
const router = express.Router();

//rutas
router.use( '/api/ping',        require( './ping.router' ) );
router.use( '/api/docs',        require( './swagger.router' ) );

router.use( '/api/users',       require( './user.router' ) );
router.use( '/api/auth',        require( './auth.router' ) );
router.use( '/api/search',      require( './search.router' ) );
router.use( '/api/upload',      require( './upload.router' ) );

router.use( '/api/character',   require( './character.router' ) );
router.use( '/api/movie',       require( './movie.router' ) );

module.exports = router;