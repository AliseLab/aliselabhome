const Express = require( 'express' );
const Locale = require( 'express-locale' );
const Translate = require('express-translate');
const Twig = require( 'twig' );
const Fs = require( 'fs' );
const { exec } = require( 'child_process' );

const SiteConfig = require( './config.js' );

var app = Express();
var locale = Locale();
var translate = new Translate({
	escapeHtml: false,
});
var config = SiteConfig.config;

Twig.cache( false );

var createthumbnails = function( srcpath, dstpath, next ) {
	Fs.readdir( srcpath, (err, files ) => {
		var todo = files.length;
		var donext = function() {
			todo--;
			if ( !todo )
				next();
		}
		files.forEach( file => {
			if ( !Fs.existsSync( dstpath + '/' + file ) ) { 
				console.log( 'creating preview for ' + srcpath + '/' + file );
				exec( 'convert ' + srcpath + '/' + file + ' -resize 300x168^ ' + dstpath + '/' + file, ( err, stdout, stderr ) => {
					if ( err ) {
						console.log( stderr );
						Fs.unlink( dstpath + '/' + file, () => {} );
					}
					donext();
				} );
			}
			else
				donext();
		});
	});
}

createthumbnails( './public/portfolio/images', './public/portfolio/preview', function() {

	Fs.readdir( './public/portfolio/images', ( err, portfolio_images ) => {
	
		var languages = {};
		var messages = {};
		Fs.readdir( './messages', (err, files) => {
			Fs.readdir( './public/js', (err, js) => {
				Fs.readdir( './public/css', (err, css) => {
					
					files.forEach( file => {
						if ( file.substring( file.length - 3 ) == '.js' ) {
							var lang = file.substring( 0, file.length - 3 );
							var msg = require( './messages/' + file );
							languages[ lang ] = msg.label;
							messages[ lang ] = msg.trans;
						}
					});
				
					translate.addLanguages( messages );
					
					app.use( Express.static( __dirname + '/public' ) );
					app.use( locale );
					
					var set_locale = function ( req, res, next ) {
						var selected_language = config.site.default_language;
						var lang = req.url.substring( 1 );
						var i = lang.indexOf( '?' );
						if ( i >= 0 )
							lang = lang.substring( 0, i );
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
							'mailresult' : req.query.mailresult,
							'js' : js,
							'css' : css,
							'portfolio_images' : portfolio_images,
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
				
					var BodyParser = require( 'body-parser' );
					app.use( BodyParser.urlencoded( {
						extended: false,
					} ));
					
					app.post( '/contact', function( req, res ) {
						
						var nodemailer = require( 'nodemailer' );
						var transporter = nodemailer.createTransport( config.mail.transport );
						
						var title = 'Aliselab contact from ' + req.body.email;
						
						Twig.renderFile( './views/mail.html.twig', {
							title: title,
							data: req.body
						}, ( err, html ) => {
							
							var data = html;
							
							var mailOptions = {
								from: req.body.email,
								to: config.mail.destination,
								subject: title,
								html: data,
							};
							
							transporter.sendMail( mailOptions, function( error, info ) {
								url = '/' + req.body.lang + '?mailresult=';
								if ( error ) {
									console.log( error );
									url += 'error';
								} else {
									console.log( 'Email sent: ' + info.response );
									url += 'success';
								}
								url += '#contacts';
								res.redirect( url );
							}); 
							
						});
						
					});
				});
			});
		});
	});
});

