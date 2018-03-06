exports.run = function( data, next ) {
	
	data.twig = require( 'twig' );
	data.twig.cache( false );
	
	data.fs.readdir( './public/js', (err, js) => {
		data.fs.readdir( './public/css', (err, css) => {
			data.js = js;
			data.css = css;
			data.app.use( data.express.static( __dirname + '/../public' ) );
			next();
		});
	});
	
}
