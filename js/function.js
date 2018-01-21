$(function(){
	console.log('test')
	
	// Animate website components in
	$('.intro-animate').removeClass('start').delay(800).queue(function(next){
	    $(this).addClass('end');
	    $('#home-background').get(0).play();
	    next();
	});


	// Show footer overlay and hide
	$('.footer-overlay').delay(5000).queue(function(hideFooter){
		$(this).addClass('hide')
		hideFooter();
	})

	// Main Navigation
	$('.main-nav a').on('click', function(){
		$('.main-nav a').removeClass('active');
		$('.sub-page').removeClass('active');
		$(this).addClass('active');
		$('#home-background').get(0).load();
	
		if( $(this).hasClass('active')) {
			var activePage = $(this).data('nav');
			$('.sub-page.'+ activePage).addClass('active');
				
		} else if (!$(this).hasClass('active')) {
			$('#home-background').get(0).play();
		}


	})



})