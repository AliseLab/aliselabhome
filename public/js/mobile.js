$( document ).ready( function() {
	
	$( 'header .mobile-menu' ).on( 'click', function() {
		var btn = $(this);
		var nav = $( 'header nav' );
		if ( btn.hasClass( 'active' ) ) {
			btn.removeClass( 'active' );
			nav.removeClass( 'mobile-visible' );
		}
		else {
			btn.addClass( 'active' );
			nav.addClass( 'mobile-visible' );
		}
	});
	
	$( 'header a' ).on( 'click', function() {
		var btn = $( 'header .mobile-menu' );
		if ( btn.hasClass( 'active' ) ) {
			btn.removeClass( 'active' );
			$( 'header nav' ).removeClass( 'mobile-visible' );
		}
	});

	var alignheader = function() {
		$( 'header nav' ).css( 'top', $( 'header' ).outerHeight() + 'px' );
	};
	
	$( window ).on( 'resize', alignheader );
	alignheader();
	
});
