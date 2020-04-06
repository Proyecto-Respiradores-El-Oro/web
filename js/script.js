$(function() {

    "use strict";


    /*-----------------------------------
     * STICKY MENU - HEADER
     *-----------------------------------*/

    var timer;
    window.onscroll = function(event) {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(toggleHeaderFloating);
    };

    function toggleHeaderFloating() {
        // does cause layout/reflow: https://git.io/vQCMn
        if (window.scrollY > 80) {
            document.body.classList.add('sticky');
        } else {
            document.body.classList.remove('sticky');
        }
    }


    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    /*-----------------------------------
     * PARALLAX
     *-----------------------------------*/
    $('[data-parallax]').parallax();

    /*-----------------------------------
     * ON SCROLL ANIMATION
     *-----------------------------------*/
    var scrollAnimate = $('body').data('scroll-animation');
    if (scrollAnimate === true) {
        new WOW({
            boxClass: 'reveal',
            mobile: false
        }).init()
    }


    /*-----------------------------------
     * ONE PAGE NAV - SMOOTH SCROLLING
     *-----------------------------------*/

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 40
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#site-nav');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.navbar').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.navbar').removeClass('menu-is-open');
    })



    /*-----------------------------------
     * ISOTOPE PORTFOLIO FILTERING
     *-----------------------------------*/

    if ($.fn.isotope) {
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    }

    // filter items on button click
    var $filterGroup = $('.filter-group');
    $filterGroup.on('click', 'a', function(e) {
        e.preventDefault();
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $filterGroup.find('.active').removeClass('active');
        $(this).addClass('active');
    });


    /*-----------------------------------
     * Lazy Load
     *-----------------------------------*/
    var $lazyloadDiv = $('.lazyload');
    if ($lazyloadDiv.length && $.fn.unveil) {
        $lazyloadDiv.unveil(200);
    }

    /*-----------------------------------
     * ISOTOPE PORTFOLIO FILTERING
     *-----------------------------------*/
    function countToInit() {
        var $counterDiv = $('.counter');
        if ($counterDiv.length && $.fn.countTo) {
            $('.counter').countTo({
                refreshInterval: 10,
                speed: 1000
            });
        }
    }
    // Init counter when section is visible
    var $counterSection = $('#counter');
    if ($counterSection.length && $.fn.waypoint) {
        $counterSection.waypoint(countToInit, { 
        	offset: '100%', 
        	triggerOnce: true 
        });
    }

    /*-----------------------------------
     * Magnific Popup
     *-----------------------------------*/
    var $portfolioGrid = $('.portfolio-grid');
    if ($portfolioGrid.length && $.fn.magnificPopup) {
        $portfolioGrid.magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    var $videoPlay = $('.video-play');
    if ($videoPlay.length && $.fn.magnificPopup) {
        $videoPlay.magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    youtube: {
                        src: '//www.youtube.com/embed/%id%?autoplay=1&modestbranding=1&controls=1&showinfo=0&rel=0' // URL that will be set as a source for iframe.
                    }
                }
            }
        });
    }

    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonials = $('.testimonials');
    if ($testimonials.length && $.fn.owlCarousel) {
        $testimonials.owlCarousel({
            items: 1
        });
    }

    var $partnerlogos = $('.partner-logos');
    if ($partnerlogos.length && $.fn.owlCarousel) {
        $partnerlogos.owlCarousel({
            items: 5,
            margin: 85,
            autoWidth: true,
            dots: false,
            nav: false,
            center: true,
            autoplay: true,
            loop: true
        });
    }

    /*-----------------------------------
     * SWIPER SLIDER
     *-----------------------------------*/ 
     if ($('.swiper-container').length) {
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            parallax: true,
            speed: 1500,
            paginationClickable: true,
            //pagination
            pagination: '.swiper-pagination-white',
            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                767: {
                    speed: 600
                }
            }
        })
    }
   

    /*-----------------------------------
     * VIDEO FALLBACK
     *-----------------------------------*/
    function fallback(video) {
        var img = video.querySelector('img');
        if (img)
            video.parentNode.replaceChild(img, video);
    }

});
/*End Fn*/