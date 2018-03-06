$( document ).ready( function() {
	
	var reviews = $( 'section.reviews' );
	reviews.find( 'iframe' ).each( function() {
		var width = $( this ).attr( 'width' );
		var height = $( this ).attr( 'height' );
		$( this )
			.css({
				'max-width': '100%',
				'width': width + 'px',
				'height': height + 'px',
			})
			.attr( 'data-ratio', width / height )
			.removeAttr( 'width' )
			.removeAttr( 'height' )
		;
	});
	
});
