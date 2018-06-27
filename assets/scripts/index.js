$(document).ready(function(){

    $('.x-reviews-slider').slick({
        nextArrow: $('.x-reviews-next-button'),
        prevArrow: $('.x-reviews-previous-button'),
        infinite: false,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 651,
            settings: {
                dots: true,
                arrows: false,
                customPaging: function(slick, index) {
                    return  '<div class="slick-dot-div" data-slick-index="' + index + '"></div>';
                },
            }
        }]
    });

    if ($(document).width() < 450) {
        $('.x-benefits-slider').slick({
            infinite: false,
            adaptiveHeight: true,
            dots: true,
            arrows: false,
            customPaging: function(slick, index) {
                return  '<div class="slick-dot-div" data-slick-index="' + index + '"></div>';
            },
        });
    }

    if ($(document).width() < 400) {
        $('.x-lastorders-slider').slick({
            infinite: false,
            adaptiveHeight: true,
            dots: true,
            arrows: false,
            customPaging: function(slick, index) {
                return  '<div class="slick-dot-div" data-slick-index="' + index + '"></div>';
            },
        });
    }

    $(".x-go-to-calc").on('click', function(e) {
        var href = $(this).attr("href");

        if (href && (href.substring(0, 1) === '#')) {
            var position = $(href).offset().top;

            $("body, html").animate({
                scrollTop: position
            });
        }
    });
});
