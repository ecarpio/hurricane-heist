$(function(){
	
	$.html5Loader({
			filesToLoad:'js/files.json',
			onBeforeLoad: function(){ console.log('begin') },
			onComplete: function () {
				playLoader()
				console.log("All the assets are loaded!");
			},
			onUpdate: function(percentage ){ 
				console.log(percentage)
				$('.loader-line').width(percentage + '%');

			},
			onMediaError: function(obj, elm){ console.log(obj) }

	});

 
	function playLoader() {
		$('.loader-line-container').fadeOut(200).delay(200).queue( function(hideLoader){
			$('#loader-background').get(0).play()
			$('#loader-background').on('ended',function(){ 
				playTrailer()
			});
			hideLoader();
		});
	}


	function playTrailer() {
		$('#preload').fadeOut(400);
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
		    //$('#home-background').get(0).play();
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
		$('#movieTrailer').get(0).pause();
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