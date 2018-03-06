exports.run = function( data, next ) {
	
	var Config = require( '../config.js' );
	data.config = Config.config;

	next();
}
