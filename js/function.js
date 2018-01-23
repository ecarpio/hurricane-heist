$(function(){
	console.log('test')
	
	// Start Intro Animations
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

	// Start Trailer Logo Animations
	function trailerAnimate() {
		$('.trailer-logo').removeClass('start').delay(800).queue(function(next){
		    $(this).addClass('end');
		    next();
		});
	}
		// Spawn Movie Modal
	$('#movieTrailerModal').modal('show');

	// Play Trailer on Modal Show
	$('#movieTrailerModal').on('shown.bs.modal', function () {
		console.log('show')
		trailerAnimate()
	    $('#movieTrailer').get(0).play();
	});

	// On Trailer End
	$('#movieTrailer').on('ended',function(){
      $('#movieTrailerModal').modal('hide');
      startIntro()
  	});

	// On Trailer Modal Close
	$("#movieTrailerModal").on('hidden.bs.modal', function () {
		$('.trailer-logo').removeClass('end').addClass('start');
		$('#movieTrailer').get(0).load();
	    startIntro()
	});

	// Watch Trailer Button
	$('#watchTrailer').on('click', function(){
		$('#movieTrailerModal').modal('show');
	})


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
				
		} 

		if (!$('.sub-page').hasClass('active')) {
			$('#home-background').get(0).play();
		}
	})



})