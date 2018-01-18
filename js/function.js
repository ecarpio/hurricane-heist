$(function(){
	console.log('test')
	
	$('.intro-animate').removeClass('start').delay(800).queue(function(next){
	    $(this).addClass("end");
	    next();
	});
})