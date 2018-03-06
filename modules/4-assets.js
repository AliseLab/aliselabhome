exports.run = function( data, next ) {
	
	data.twig = require( 'twig' );
	if ( data.config.debug )
		data.twig.cache( false );
	
	data.app.use( data.express.static( __dirname + '/../public' ) );
	
	data.fs.readdir( './assets/js', (err, js) => {
		data.fs.readdir( './assets/css', (err, css) => {
			
			if ( data.config.debug ) {
				data.app.use( data.express.static( __dirname + '/../assets' ) );
				data.js = js;
				data.css = css;
			}
			else {
				var assets = {
					'app.js' : {
						type: 'js',
						dir: 'js',
						main: 'app.js',
						files: [ '*.js' ],
					},
					'style.css' : {
						type: 'css',
						dir: 'css',
						main: 'style.css',
						files: [ '*.css' ],
					},
				};
				
				var config = {
					rootRoute : '/',
					srcDir : __dirname + '/../assets',
					buildDir : './public',
					process : 'false',
					env: 'production'
				};
				
				data.app.use( require( 'express-asset-manager' )( assets, config ) );
				data.js = [ 'app.js' ];
				data.css = [ 'style.css' ];
			}
			
			next();
		});
	});
	
}
