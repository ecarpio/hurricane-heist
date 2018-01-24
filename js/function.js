$(function(){

	var loaderAnimation = $("#html5Loader").LoaderAnimation({
		onComplete:function(){
			console.log("preloader animation completed!");
		}
	});

	$.html5Loader({
			filesToLoad:'../js/files.json',
			onBeforeLoad: function(){ console.log('begin') },
			onComplete: function () {
				playTrailer();
				console.log("All the assets are loaded!");
			},
			onUpdate: loaderAnimation.update,
			onMediaError: function(){ console.log('error') },
			forceMediaPreload: 'true'
	});


	function playTrailer() {
		$('#movieTrailerModal').modal('show');
	}
	

	// Hide Footer Credit
	function showFooterCredit() {
		$('.footer-overlay').removeClass('hide');
	};

	// Hide Footer Credit
	function hideFooterCredit() {
		$('.footer-overlay').delay(3000).queue( function(hideFooter){
			$(this).addClass('hide')
			hideFooter();
		})
	}	

	
	// Start Intro Animations
	function startIntro() {
		// Animate website components in
		$('.intro-animate').removeClass('start').delay(800).queue(function(next){
		    $(this).addClass('end');
		    $('#home-background').get(0).play();
		    $('.footer-overlay').removeClass('hide')
		    animateBlurbs();
		    next();
		});
		hideFooterCredit();	
	}	

	function animateBlurbs() {
		$('.ff-blurb').addClass('end').delay(400).queue(function(next){
			$('.movie-blurb').addClass('end').delay(2500).queue(function(){
				$('#makeitrain').addClass('end')
			});
		})
	}

	$('#credits').on('click', function(){
		showFooterCredit();
		hideFooterCredit()
	})


	// Start Trailer Logo Animations
	function trailerAnimate() {
		$('.trailer-logo').removeClass('start').delay(800).queue(function(next){
		    $(this).addClass('end');
		    next();
		});
	}
	

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

		if (!$('.synopsis').hasClass('active')) {
			$('#synopsis-background').get(0).load();
		} else {
			$('#synopsis-background').get(0).play();
		}


	})



})