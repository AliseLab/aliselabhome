$( document ).ready( function() {
	
	var clicked = false;
	
	$( '.switcher' ).each( function() {
		var switcher = $(this);
		switcher.on( 'click', 'a', function() {
			switcher.find( 'a' ).removeClass( 'active' );
			$(this).addClass( 'active' );
		});
	});
	
	$( 'nav' ).on( 'click', 'a', function() {
		clicked = true;
	});
	
	var checkhash = function() {
		if ( !clicked )
		{
			var menu = $( 'a[href="' + window.location.hash + '"]' );
			if ( menu.length > 0 )
				menu.click();
			else {
				$( 'a[href="#home"]' ).click();
				$( window ).scrollTop( 0 );
			}
		}
		clicked = false;
	};
	
	$( window ).bind( 'hashchange', checkhash);
	checkhash();
	
	var odd = false;
	$( 'section' ).each( function() {
		odd = !odd;
		if ( odd )
			$(this).addClass( 'odd' );
	});
	
	$( 'section.portfolio a' ).each( function() {
		var a = $(this);
		var href = a.attr( 'href' );
		var img = $('<img/>');
		img.attr( 'src', href.replace( /portfolio/, '/portfolio/preview/' ) );
		img.appendTo( a );
		a.attr( 'target', '_blank' );
	});
	
});
