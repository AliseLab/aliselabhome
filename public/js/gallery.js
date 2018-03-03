$( document ).ready( function() {
	
	$( '.gallery' ).each( function() {
		var gallery = $(this);
		
		var preview = $(this).find( '> .preview' );
		var list = $(this).find( '> .list' );
		
		if ( preview.length && list.length ) {
			
			preview.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				speed: 300,
				asNavFor: '.list',
			});
			
			list.slick({
				infinite: true,
				speed: 300,
				centerMode: true,
				variableWidth: true,
				focusOnSelect: true,
				edgeFriction: 0,
				autoplay: true,
				autoplaySpeed: 3000,
				asNavFor: '.preview',
			});
			
		}
		
	});
	
});
