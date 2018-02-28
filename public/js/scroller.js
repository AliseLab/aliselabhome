$( document ).ready( function() {
	
	var clicked = false;
	
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
		$( '.languages a' ).each( function() {
			var href = $(this).attr( 'href' );
			var strpos = href.indexOf( '#' );
			if ( strpos >= 0 )
				href = href.substring( 0, strpos );
			$(this).attr( 'href', href + window.location.hash );
		});
	};
	
	$( window ).bind( 'hashchange', checkhash);
	setTimeout( checkhash, 1 );
	
});
