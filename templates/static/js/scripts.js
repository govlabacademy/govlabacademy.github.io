$(document).ready(function() {
	$(document).foundation();

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

  // RSS from Digest
  $('#digest-container').rssfeed('http://thegovlab.org/govlab-digest/feed/', 
  	{ 
  		limit: 5,
  		linktarget: '_blank'
  	});

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