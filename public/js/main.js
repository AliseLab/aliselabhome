$( document ).ready( function() {
	
	var clicked = false;
	
	$( '.switcher' ).each( function() {
		var switcher = $(this);
		switcher.on( 'click', 'a', function() {
			switcher.find( 'a' ).removeClass( 'active' );
			$(this).addClass( 'active' );
		});
	});
	
	var scrolling_to = null;
	
	$( 'body' ).on( 'click', 'a', function() {
		var href = $(this).attr( 'href' );
		if ( href.substring( 0, 1 ) == '#' ) {
			var target = $( href );
			if ( target.length > 0 ) {
				var target_id = target.attr( 'id' );
				if ( scrolling_to != target_id ) {
					scrolling_to = target_id;
					target.attr( 'id', '' );
					clicked = true;
					window.location.hash = href;
					target.attr( 'id', target_id );
					$( 'html' ).stop().animate( {
						scrollTop: target.offset().top,
					}, 400, function() {
						scrolling_to = null;
					} );
				}
			}
			return false;
		}
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
