$( document ).ready( function() {
	
	$( 'section.portfolio a' ).each( function() {
		var a = $(this);
		var href = a.attr( 'href' );
		var img = $('<img/>');
		img.attr( 'src', href.replace( /portfolio/, '/portfolio/preview/' ) );
		img.appendTo( a );
		a.attr( 'target', '_blank' );
	});
	
});
