$( document ).ready( function() {
	
	var align = function() {
		var headerh = $( 'header' ).height();
		$( 'section' ).each( function() {
			var section = $(this);
			var article = section.find( 'article' );
			if ( article.length > 0 ) {
				var sectionh = section.innerHeight();
				var sectionw = section.innerWidth();
				var articleh = article.outerHeight();
				var articlew = article.outerWidth();
				article.css( {
					left: ( sectionw - articlew ) / 2 + 'px',
					top: ( sectionh - articleh ) / 2 - headerh + 'px',
				} );
			}
		});
	}
	
	$( window ).on( 'resize', align );
	setTimeout( align, 1 );
	
});
