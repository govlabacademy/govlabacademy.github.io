$(document).ready(function() {
  $(document).foundation();

  var db = null;

  // if (location.hostname == 'domain.com') {
  //     db = new Firebase('https://production.firebaseio.com/');

  // } else {
      db = new Firebase('https://academy-dev.firebaseio.com/');
  // }

  db.child('project').once('value', function(snapshot) {
    var bit = false;

    for (var oid in snapshot.val()) {
      var obj = snapshot.val()[oid],
          qry = getQuery('oid'),
          $a = $('<a/>'),
          i;

      if (obj.gallery.length && obj.gallery[0] != 0) {
        $a.css('background-image', 'url(' + obj.gallery[0] + ')');
      }

      $a.attr('title', obj.title);
      $a.attr('href', '?oid=' + oid);
      $a.addClass('e-project-thumb');

      $('.e-thumb-container').append($a);

      if (oid == qry || (!qry && !bit)) {
        bit = true;

        $('.e-project-title').text(obj.title);
        $('.e-project-tagline').text(obj.tagline);
        $('.e-project-status').addClass('m-' + obj.status);
        $('.e-project-description').text(obj.description);
        $('.twitter-link').attr('href', obj.twitter);
        $('.facebook-link').attr('href', obj.facebook);
        $('.envelope-link').attr('href', obj.email);
        $('.youtube-link').attr('href', obj.youtube);
        $('.website-link').attr('href', obj.website);
        $('.github-link').attr('href', obj.github);
        $('.e-location p').text(obj.location);

        if (obj.gallery.length && obj.gallery[0] != 0) {
          $('.e-project-banner').css('background-image', 'url(' + obj.gallery[0] + ')');

          for (i = 0; i < obj.gallery.length; i++) {
            var $img = $('<img/>');

            $img.attr('src', obj.gallery[i]);
            $img.addClass('js-image-gallery-item');

            $('.e-image-gallery').append($img);
          }
        }

        if (obj.news.length && obj.news[0] != 0) {
          for (i = 0; i < obj.news.length; i++) {
            var $p = $('<p/> '),
                $span = $('<span/> ');

            $span.addClass('e-pub-date').text(obj.news[i].date);
            $p.addClass('e-news-item').text(obj.news[i].publication);
            $p.addClass('e-news-item').append($span);

            $('.e-news h3').after($p);
          }
        }

        if (obj.team.length && obj.team[0] != 0) {
          for (i = 0; i < obj.team.length; i++) {
            var $div1 = $('<div/>'),
                $div2 = $('<div/>'),
                $div3 = $('<div/>');

            $div1.addClass('e-team-pic');
            $div1.css('background-image', 'url(' + obj.team[i].image + ')');
            $div2.text(obj.team[i].name);
            $div2.addClass('e-team-name');
            $div3.append($div1);
            $div3.append($div2);

            $('.e-team h4').after($div3);
          }
        }
      }
    }
  });


  $('.nav-coaching').addClass('m-active');

  // Click for Partner Logos
  $('.e-trigger').click(function() {
    $(this).parent().parent().toggleClass('m-active');
  });

  // $('.b-top-navigation').click(function() {
  //  $(this).toggleClass('m-active');
  // });

  // Off Canvas Menu
  $('.e-mainnav-trigger').click(function() {
    var trigger = $(this);
    // console.log(trigger);

    if(trigger.hasClass('m-nav-active')) {
      trigger.removeClass('m-nav-active');
      trigger.parent().parent().parent().removeClass('m-nav-active');
    } else {
      trigger.addClass('m-nav-active');
      trigger.parent().parent().parent().addClass('m-nav-active');
    }
  });

  $('.b-upcoming-courses li').each(function() {
    var start = new Date($(this).find('.e-course-date').data('date')),
        today = new Date(new Date().toJSON().slice(0,10));

    if (start < today) {
      $(this).prependTo('.b-past-courses ul');
    }
  });


  // ISOTOPES for Project Gallery
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
    }
  });


  $container = $('.b-library-isotopes');
  // init
  $container.isotope({
    // options
    itemSelector: '.b-library-item',
    layoutMode: 'fitRows',
    sortBy: 'category'
  });

  // ISOTOPES FILTERS

  // $('.e-filter').click(function() {
  //  var key = $(this).attr('data-filter');
  //  console.log(key);
  //  var filter = '[data-filter*="' + key + '"]';
  //  var rest = $('.e-filter');

  //  if (key === 'all') {
  //    $container.isotope({ filter: '*' });
  //    rest.removeClass('m-active');
  //    $(this).addClass('m-active');
  //  } else {
  //    $container.isotope({ filter: filter });
  //    rest.removeClass('m-active');
  //    $(this).addClass('m-active');

  //    console.log(rest);
  //  }

  // });

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
    $(this).removeClass('m-active b-lightbox');
    $(this).children('.js-image-gallery-item').remove();
    $('.b-filters').removeClass('m-active');
  });

  // RSS from Digest
  $('#digest-container').rssfeed('http://thegovlab.org/govlab-digest/feed/',
  {
    limit: 5,
    linktarget: '_blank'
  });

// Multiple SwipeJS Galleries
// var swipes = []
// $('.swipe').each(function(i, obj) {
//      swipes[i] = new Swipe(obj);
//  });

// Modal for Project Gallery - Image Gallery
$('.js-image-gallery-item').click(function() {
  var clone = $(this).clone();
  $('#overlay').append(clone).addClass('m-active b-lightbox');
});

}); // Closes Document.ready





function getQuery(param) {
    var query = location.search.substr(1),
        result = false;

    query.split('&').forEach(function(part) {
        var item = part.split('=');

        if (item[0] == param) {
            result = decodeURIComponent(item[1]);

            if (result.slice(-1) == '/') {
                result = result.slice(0, -1);
            }
        }
    });

    return result;
}
