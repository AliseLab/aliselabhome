$( document ).ready( function() {
	
	var align = function() {
		var headerh = $( 'header' ).height();
		$( 'section' ).each( function() {
			var section = $(this);
			var article = section.find( 'article' );
			var h1 = section.find( '> h1 ');
			if ( article.length > 0 && h1.length > 0 ) {
				var sectionh = section.innerHeight();
				var sectionw = section.innerWidth();
				var articleh = article.outerHeight();
				var articlew = article.outerWidth();
				var h1h = h1.outerHeight();
				article.css( {
					left: ( sectionw - articlew ) / 2 + 'px',
					top: ( sectionh - articleh - headerh ) / 2 + h1h + 'px',
				} );
			}
		});
	}
	
	$( window ).on( 'resize', align );
	setTimeout( align, 1 );
	
});
