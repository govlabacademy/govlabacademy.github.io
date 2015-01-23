$(document).ready(function() {
	$(document).foundation();

// Fire these scripts if the on small screen
if (screen.width < 960) {

  window.mySwipe = new Swipe(document.getElementById('courses-overview-slider'), {
	  startSlide: 0,
	  speed: 400,
	  continuous: false,
	  disableScroll: false,
	  stopPropagation: false,
	  
	  callback: function(index, elem) {
	  	var pos = mySwipe.getPos();
	  	var tabs = $('.e-course-navigation').children();
	  	var tab = tabs.children();

	  	// Crappiest Code EVER - find another solution for this
	  	if (pos === 0) {
	  		tabs.css('margin-left','0');
	  		tab.removeClass('m-active');
	  		$('.nav-coaching').addClass('m-active'); 
	  	}
	  	
	  	if (pos === 1) {
	  		tabs.css('margin-left','-13%');
	  		tab.removeClass('m-active');
	  		$('.nav-workshops').addClass('m-active'); 
	  	}
	  	
	  	if (pos === 2) {
	  		tabs.css('margin-left','-26%');
	  		tab.removeClass('m-active');
	  		$('.nav-master-courses').addClass('m-active'); 
	  	}

	  	if (pos === 3) {
	  		tabs.css('margin-left','-40%');
	  		tab.removeClass('m-active');
	  		$('.nav-courses').addClass('m-active'); 
	  	}
	  }
	  // transitionEnd: function(index, elem) {}
	});

  $('.nav-coaching').addClass('m-active');

  // Click for Partner Logos
  $('.e-trigger').click(function() {
  	$(this).parent().parent().toggleClass('m-active');
  });

  $('.b-top-navigation').click(function() {
  	// $(this).toggleClass('m-active');
  	console.log('funciona');
  });

  // Off Canvas Menu
  $('.e-mainnav-trigger').click(function() {
  	var trigger = $(this);
  	console.log(trigger);

  	if(trigger.hasClass('m-nav-active')) {
  		trigger.removeClass('m-nav-active');
	  	trigger.parent().parent().parent().removeClass('m-nav-active');	
  	} else {
  		trigger.addClass('m-nav-active');
	  	trigger.parent().parent().parent().addClass('m-nav-active');	
  	}

  });
}

else {
		console.log('desktop');
}


// Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('.b-top-navigation-wrapper').outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// function hasScrolled() {
//     var st = $(this).scrollTop();
    
//     // Make sure they scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;
    
//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         $('.b-top-navigation-wrapper').addClass('m-hidden');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $('header').removeClass('m-hidden');
//         }
//     }
    
//     lastScrollTop = st;
// }

// ISOTOPES CONFIG

var $container = $('.b-card-isotopes');
// init
$container.isotope({
  // options
  itemSelector: '.b-card',
  layoutMode: 'fitRows',
  sortBy: 'category'
});

// ISOTOPES FILTERS

$('.e-filter').click(function() {
	var key = $(this).attr('data-filter');
	console.log(key);
	var filter = '[data-filter*="' + key + '"]';
	var rest = $('.e-filter');

	if (key === 'all') {
		$container.isotope({ filter: '*' });
		rest.removeClass('m-active');
		$(this).addClass('m-active');
	} else {
		$container.isotope({ filter: filter });	
		rest.removeClass('m-active');
		$(this).addClass('m-active');

		console.log(rest);
	}
	
});

$('.e-faq-trigger').click(function() {
	$('.b-faqs').toggleClass('m-active');
});

$('.e-filters-trigger').click(function() {
	var panel = $('.b-filters');

	if (panel.hasClass('m-active')) {
		$('.b-filters').removeClass('m-active');
		$('#overlay').removeClass('m-active');
	} else {
		$('.b-filters').addClass('m-active');
		$('#overlay').addClass('m-active');
	}
});


$('#overlay').click(function() {
	$(this).removeClass('m-active');
	$('.b-filters').removeClass('m-active');
});

// Multiple SwipeJS Galleries
// var swipes = []
// $('.swipe').each(function(i, obj) {
//      swipes[i] = new Swipe(obj);
//  });


 }); // Closes Document.ready