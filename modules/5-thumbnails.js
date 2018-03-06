exports.run = function( data, next ) {
	
	var createthumbnails = function( srcpath, dstpath, next ) {
		data.fs.readdir( srcpath, (err, files ) => {
			var todo = files.length;
			var donext = function() {
				todo--;
				if ( !todo )
					next();
			}
			files.forEach( file => {
				if ( !data.fs.existsSync( dstpath + '/' + file ) ) { 
					console.log( 'creating preview for ' + srcpath + '/' + file );
					exec( 'convert ' + srcpath + '/' + file + ' -resize x168 ' + dstpath + '/' + file, ( err, stdout, stderr ) => {
						if ( err ) {
							console.log( stderr );
							data.fs.unlink( dstpath + '/' + file, () => {} );
						}
						donext();
					} );
				}
				else
					donext();
			});
		});
	}

	createthumbnails( './public/portfolio/images', './public/portfolio/preview', function() {
		data.fs.readdir( './public/portfolio/images', ( err, portfolio_images ) => {
			data.portfolio_images = portfolio_images;
			next();
		});
	});
	
}