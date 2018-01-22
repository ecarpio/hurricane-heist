$(function(){
	console.log('test')
	
	function startIntro() {

		// Animate website components in
		$('.intro-animate').removeClass('start').delay(800).queue(function(next){
		    $(this).addClass('end');
		    $('#home-background').get(0).play();
		    $('.footer-overlay').removeClass('hide')
		    next();
		});


		// Show footer overlay and hide
		$('.footer-overlay').delay(4000).queue(function(hideFooter){
			$(this).addClass('hide')
			hideFooter();
		})

	}	


	$('#movieTrailerModal').modal('show');

	$('#movieTrailer').on('ended',function(){
      $('#movieTrailerModal').modal('hide');
      startIntro()
  });


	// Close Menu

	function closeMenu() {
		$('.navbar-collapse').removeClass('show')
	}

	$( window ).resize(function() {
	  closeMenu();
	});



	

	// Main Navigation
	$('.main-nav a').on('click', function(){
		closeMenu();
		$('.main-nav a').removeClass('active');
		$('.sub-page').removeClass('active');
		$(this).addClass('active');
		$('#home-background').get(0).load();
	
		if( $(this).hasClass('active')) {
			var activePage = $(this).data('nav');
			$('.sub-page.'+ activePage).addClass('active');
				
		} else if (!$('.sub-page').hasClass('active')) {
			$('#home-background').get(0).play();
		}


	})



})