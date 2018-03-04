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
				autoplay: false,
				autoplaySpeed: 5000,
				asNavFor: '.preview',
			});
			
			preview.on( 'mousedown', function() {
				return false;
			});

			var clicked = false;
			
			preview.find( 'a' ).each( function() {
				var a = $(this);
				a.on( 'click', function() {
					var lastclicked = clicked;
					clicked = false;
					return lastclicked;
				});
				var img = a.find( 'img' );
				img.on( 'click', function() {
					console.log( 'CLICK' );
					clicked = true;
				});
			});
			
			
			/*var updatepreviewdimensions = function() {
				preview.find( 'a' ).each( function() {
					var a = $(this);
					a.css({
						display: 'inline',
						height: 'auto',
						width: 'auto',
					});
					var img = a.find( 'img' );
					a.css({
						height: img.height() + 'px',
						width: img.width() + 'px',
						display: 'block',
					});
				});
			};
			
			$( window ).on( 'resize', function() {
				updatepreviewdimensions();
			});
			updatepreviewdimensions();*/
		}
		
	});
	
});
