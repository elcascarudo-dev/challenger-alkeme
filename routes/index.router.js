const express = require('express');
const router = express.Router();

//rutas
router.use( '/api/ping',        require( './ping.router' ) );

router.use( '/api/users',       require( './user.router' ) );
router.use( '/api/login',       require( './auth.router' ) );
router.use( '/api/search',      require( './search.router' ) );
router.use( '/api/upload',      require( './upload.router' ) );

module.exports = router;