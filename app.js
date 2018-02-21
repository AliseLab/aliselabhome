const express = require( 'express' );
const twig = require( 'twig' );
const app = express();

twig.cache( false );

app.use( express.static( 'public' ) );

app.get( '/', function( request, response ) {
	response.render( 'index.html.twig', {
		'sections': {
	        'about': 'About us',
	        'services': 'Services and prices',
	        'portfolio': 'Portfolio',
	        'reviews': 'Reviews',
	        'questions': 'Questions',
	        'contacts': 'Contacts',
		},
	});
} );

app.listen( 8080, function() {
	console.log( 'listening' )
} );

