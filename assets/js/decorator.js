$( document ).ready( function() {
	var odd = false;
	$( 'section' ).each( function() {
		odd = !odd;
		if ( odd )
			$(this).addClass( 'odd' );
	});
});	
