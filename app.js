const Express = require( 'express' );
const Locale = require( 'express-locale' );
const Translate = require('express-translate');
const Twig = require( 'twig' );
const Fs = require( 'fs' );

const SiteConfig = require( './config.js' );

var app = Express();
var locale = Locale();
var translate = new Translate({
	escapeHtml: false,
});
var config = SiteConfig.config;

Twig.cache( false );

var languages = {};
var messages = {};
Fs.readdir( './messages', (err, files) => {
	files.forEach( file => {
		if ( file.substring( file.length - 3 ) == '.js' ) {
			var lang = file.substring( 0, file.length - 3 );
			var msg = require( './messages/' + file );
			languages[ lang ] = msg.label;
			messages[ lang ] = msg.trans;
		}
	});

	translate.addLanguages( messages );
	
	app.use( Express.static( 'public' ) );
	app.use( locale );
	
	var set_locale = function ( req, res, next ) {
		var selected_language = config.site.default_language;
		var lang = req.url.substring( 1 );
		if ( lang.length > 0 ) {
			if ( languages[ lang ] )
				selected_language = lang;
			req.locale.toString = function() {
				return selected_language;
			}
		}
		next();
	}
	app.use( set_locale );
	
	app.use( translate.middleware() );
	
	var render_func = function( req, res ) {
		res.render( 'index.html.twig', {
			'languages' : languages,
			'language' : req.locale.toString(),
			'config' : config,
		});
	}
	app.get( '/', function( req, res ) {
		var selected_language = config.site.default_language;
		var to_try = [];
		to_try = to_try.concat([
			req.locale.toString(),
			req.locale.language,
		]);
		to_try.some( lang => {
			if ( languages[ lang ] ) {
				selected_language = lang;
				return true;
			}
			return false;
			
		});
		res.redirect( '/' + selected_language );
	});
	
	for ( lang in languages ) {
		app.get( '/' + lang, render_func );
	}
	
	app.listen( config.server.port, function() {
		console.log( 'listening on ' + config.server.port )
	} );

	app.post( '/contact', function( req, res ) {
		console.log( res );
	});
	
});

