jQuery(document).ready(function() {
    jQuery('.wpml-ls-current-language').prependTo(jQuery('.wpml-ls-current-language').parent());
    jQuery('.wpml-ls-current-language a').on('click', function(e) {
        e.preventDefault()
    });
    if (jQuery('.scrollbar').length > 0) {
        jQuery('.scrollbar').css('top', jQuery('div[data-elementor-type=header]').height())
    }
    jQuery("#flyout-share-btn").click(function() {
        jQuery("#flyout").addClass("active");
        jQuery("#flyout").addClass("active-share");
        jQuery("#flyout").removeClass("active-phone")
    });
    jQuery("#flyout-phone-btn-desktop").click(function() {
        jQuery("#flyout").addClass("active");
        jQuery("#flyout").addClass("active-phone");
        jQuery("#flyout").removeClass("active-share")
    });
    jQuery("#flyout-closer, #page").click(function() {
        jQuery("#flyout").removeClass("active");
        jQuery("#flyout").removeClass("active-share");
        jQuery("#flyout").removeClass("active-phone")
    });
    jQuery('.page-id-164 .featured .post-carousel-categories, .page-id-4557 .featured .post-carousel-categories').insertAfter('.featured .eael-entry-wrapper .eael-entry-header');
    jQuery('[class*="tab-trigger-"]').click(function() {
        if (!jQuery(this).hasClass('active')) {
            jQuery(this).addClass('active').siblings().removeClass('active');
            jQuery.each(jQuery(this).attr('class').split(' '), function(index, value) {
                if (value.indexOf('tab-trigger-') >= 0) {
                    console.log(value[value.length - 1]);
                    jQuery('[class*="tab-content-' + value[value.length - 1] + '"]').addClass('active').siblings().removeClass('active');
                    return !1
                }
            })
        }
    });
    jQuery('.opener p a').on('click', function() {
        jQuery('header').hide(1).delay(1500).show(1)
    });
    beantragen = jQuery('.single-tariffs .opener .elementor-widget-button').clone();
    jQuery('.menu-container nav').append(beantragen);
    jQuery(".tarif-card").click(function() {
        if (jQuery(this).hasClass("active")) {
            jQuery(this).removeClass("active")
        } else {
            jQuery(".tarif-card").removeClass("active");
            jQuery(this).addClass("active")
        }
    });
    jQuery(".layer-content").hover(function() {
        jQuery(".layered-card").removeClass("active-layered-card-1 active-layered-card-2 active-layered-card-3 active-stacked-1 active-stacked-2 active-stacked-3");
        var ActiveLayer = jQuery(this).attr('id');
        jQuery(".layered-card").addClass('active-' + ActiveLayer)
    });
    jQuery(".stacked-content").hover(function() {
        jQuery(".layered-card").removeClass("active-layered-card-1 active-layered-card-2 active-layered-card-3 active-stacked-1 active-stacked-2 active-stacked-3");
        var ActiveStack = jQuery(this).attr('id');
        jQuery(".layered-card").addClass('active-' + ActiveStack)
    });
    if (window.location.href.indexOf("/en/") > -1) {
        jQuery(".shariff-button.facebook .share_text").text("Share");
        jQuery(".shariff-button.whatsapp .share_text").text("Share");
        jQuery(".shariff-button.twitter .share_text").text("tweet");
        jQuery(".shariff-button.weibo .share_text").text("Share")
    } else if (window.location.href.indexOf("/es/") > -1) {
        jQuery(".shariff-button.facebook .share_text").text("Comparte");
        jQuery(".shariff-button.whatsapp .share_text").text("Comparte");
        jQuery(".shariff-button.twitter .share_text").text("tweet");
        jQuery(".shariff-button.weibo .share_text").text("Comparte")
    } else if (window.location.href.indexOf("/cn/") > -1) {
        jQuery(".shariff-button.facebook .share_text").text("分享");
        jQuery(".shariff-button.whatsapp .share_text").text("分享");
        jQuery(".shariff-button.twitter .share_text").text("鸣叫");
        jQuery(".shariff-button.weibo .share_text").text("分享")
    } else {}
    if (jQuery(".sticky-stop")[0]) {
        if (jQuery(window).height() > jQuery('.sticky-stop').offset().top) {
            jQuery(".sticky-tariff").css('display', 'none')
        } else {
            jQuery(".sticky-tariff").css('display', 'block')
        }
    }
    jQuery(window).bind("scroll", function() {
        if (jQuery(".sticky-stop")[0]) {
            if (jQuery(window).height() > jQuery('.sticky-stop').offset().top) {
                jQuery(".sticky-tariff").css('display', 'none')
            }
            if (jQuery(this).scrollTop() > -1) {
                jQuery(".sticky-tariff").css('display', 'block');
                checkOffset()
            } else {
                jQuery(".sticky-tariff").css('display', 'none')
            }
        }
    });

    function checkOffset() {
        if (jQuery('.sticky-tariff')[0]) {
            if (jQuery('.sticky-tariff').offset().top + jQuery('.sticky-tariff').height() >= jQuery('.sticky-stop').offset().top) {
                jQuery('.sticky-tariff').css('display', 'none')
            }
            if (jQuery(window).scrollTop() + jQuery(window).height() < jQuery('.sticky-stop').offset().top) {
                jQuery('.sticky-tariff').css('display', 'block')
            }
        }
    }
});
var svg, text;
jQuery('.filter-btn').on('click', function() {
    svg = jQuery(this).find('svg').clone();
    text = jQuery(this).find('.elementor-icon-list-text').clone();
    if (jQuery(this).parents().hasClass('step-1')) {
        jQuery('.pf-pagination-1').empty();
        jQuery('.pf-pagination-1').addClass('selected');
        jQuery('.pf-pagination-2').addClass('active');
        jQuery('.pf-pagination-1').append(svg);
        jQuery('.pf-pagination-1').append(text)
    }
    if (jQuery(this).parents().hasClass('step-2')) {
        jQuery('.pf-pagination-2').empty();
        jQuery('.pf-pagination-2').addClass('selected');
        jQuery('.pf-pagination-3').addClass('active');
        jQuery('.pf-pagination-2').append(svg);
        jQuery('.pf-pagination-2').append(text)
    }
    if (jQuery(this).parents().hasClass('step-3')) {
        jQuery('.pf-pagination-3').empty();
        jQuery('.pf-pagination-3').addClass('selected');
        jQuery('.pf-pagination-3').append(svg);
        jQuery('.pf-pagination-3').append(text)
    }
})
jQuery('.pf-pagination-line div').on('click', function() {
    if (jQuery(this).hasClass('pf-pagination-1')) {
        jQuery('.pf-pagination-line div').removeClass('active');
        jQuery('.pf-pagination-line div').removeClass('selected');
        jQuery('.pf-pagination-1').addClass('active')
        jQuery('.site').removeClass('in-step-2');
        jQuery('.site').removeClass('in-step-3');
        jQuery('.pf-pagination-1').empty();
        jQuery('.pf-pagination-2').empty();
        jQuery('.pf-pagination-3').empty();
        jQuery('.card ').show()
    }
    if (jQuery(this).hasClass('pf-pagination-2')) {
        jQuery('.pf-pagination-3').removeClass('active');
        jQuery('.pf-pagination-3').removeClass('selected');
        jQuery('.pf-pagination-2').removeClass('selected');
        if (jQuery('.site').hasClass('in-step-3')) {
            jQuery('.site').removeClass('in-step-3');
            jQuery('.pf-pagination-2').empty();
            jQuery('.pf-pagination-3').empty()
        }
    }
});
jQuery(document).on('click', '.filter-btn', function() {
    jQuery.each(jQuery(this).attr('class').split(' '), function(index, value) {
        if (value.indexOf('filter-') >= 0 && value.indexOf('filter-btn') != 0) {
            jQuery('.card').each(function() {
                jQuery(this).not('[class*="result-' + value.split('-')[1] + '"]').hide()
            });
            return !1
        }
    })
});
let footer = jQuery('.footer');
let openerCard = jQuery('.opener-card');
let openerTop;
if (jQuery('.single-tariffs').length) {
    openerTop = openerCard.outerHeight(!0) + openerCard.offset().top + 50
}
if (jQuery(window).scrollTop() === 0) {
    jQuery('.elementor-location-header').removeClass('sticky-nav')
} else if (jQuery('.single-tariffs').length && jQuery(window).scrollTop() + jQuery(window).height() > openerTop) {
    jQuery('.elementor-location-header').addClass('sticky-scroll-nav');
    jQuery('.elementor-location-header').addClass('sticky-nav')
} else {
    jQuery('.elementor-location-header').addClass('sticky-nav');
    jQuery('.elementor-location-header').removeClass('sticky-scroll-nav')
}
if (jQuery('.single-tariffs').length && jQuery(window).scrollTop() + jQuery(window).height() > footer.offset().top) {
    jQuery('.elementor-location-header').removeClass('sticky-scroll-nav')
}
jQuery(document).scroll(function() {
    if (jQuery(window).scrollTop() === 0) {
        jQuery('.elementor-location-header').removeClass('sticky-nav')
    } else if (jQuery('.single-tariffs').length && jQuery(window).scrollTop() + jQuery(window).height() > openerTop) {
        jQuery('.elementor-location-header').addClass('sticky-scroll-nav');
        if (jQuery(window).scrollTop() + jQuery(window).height() > footer.offset().top) {
            jQuery('.elementor-location-header').removeClass('sticky-scroll-nav')
        }
    } else {
        jQuery('.elementor-location-header').addClass('sticky-nav');
        jQuery('.elementor-location-header').removeClass('sticky-scroll-nav')
    }
});
jQuery(document).on('change', '.upload-feld .ginput_container_fileupload input.medium', function() {
    if (jQuery(this).parent().siblings('.input-content').length > 0) jQuery(this).parent().siblings('.input-content').remove();
    jQuery(this).parent().after('<div class="input-content"><small>x</small><i>' + jQuery(this).get(0).files[0].name + '</i></div>')
});
jQuery(document).on('click', '.upload-feld .input-content small', function() {
    jQuery(this).parent().siblings('.ginput_container_fileupload').children('input.medium').val('');
    jQuery(this).parent().remove()
});
jQuery(document).ready(viewfunction);
jQuery(window).on('resize', viewfunction);

function viewfunction() {
    if (jQuery('.fullpage-wrapper').length > 0) {
        if (window.innerWidth < 768) {
            fullpage_api.setResponsive(!0)
        } else {
            fullpage_api.setResponsive(!0)
        }
    }
}
jQuery('.elementor-nav-menu > li').on('click', function() {
    console.log('asdasd');
    jQuery(this).siblings().find('.sub-menu').hide();
    jQuery(this).siblings().find('a').removeClass('highlighted')
});
jQuery(window).load(function() {
    jQuery('.productfinder .fp-slide[data-anchor="start"] .elementor-button').on('click', function() {
        jQuery('.productfinder .fp-slide[data-anchor="step-1"]').addClass('active');
        jQuery('.productfinder .fp-slide[data-anchor="start"]').removeClass('active');
        jQuery('.productfinder .fp-slidesContainer').css("transform", "translate3d(-1920px, 0px, 0px)")
    });
    jQuery('.step-2 .filter-btn').on('click', function() {
        jQuery('#page').removeClass('in-step-2');
        jQuery('#page').toggleClass('in-step-3')
    })
});
jQuery(window).load(function() {
    jQuery('.visual').on('click', function(e) {
        if (jQuery(e.target).parents('.see-more-function').hasClass('see-more-function') || jQuery(e.target).parents('.show-more').hasClass('show-more')) {} else {
            jQuery(this).removeClass('expanded')
        }
    });
    jQuery('.see-more-function .show-more').on('click', function() {
        jQuery(this).parents('.visual').toggleClass('expanded');
        jQuery('.page').addClass('overlay-active')
    });
    jQuery('.visual.expanded .elementor-col-50:not(.see-more-function)').on('click', function() {
        jQuery('.page').removeClass('overlay-active');
        jQuery(this).parents('.visual').removeClass('expanded')
    });
    jQuery('.see-more-function .close-btn').on('click', function(e) {
        jQuery('.page').removeClass('overlay-active')
    })
});
jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();
    if (scroll >= 1) {
        jQuery('.page').removeClass('overlay-active')
    }
});
jQuery(window).load(function() {
    jQuery('.show-all-function .toggle-button').on('click', function() {
        jQuery(this).parents('.show-all-function').toggleClass('all');
        jQuery(this).parents('.faq').toggleClass('toggled')
    })
});
jQuery(window).load(function() {
    jQuery('.elementor-tab-title').on('click', function() {
        jQuery('.eael-accordion-list').removeClass('list-active');
        jQuery(this).parent().addClass('list-active')
    })
});
jQuery(window).load(function() {
    jQuery('header .elementor-widget-search-form .fa-search').on('click', function() {
        jQuery('.page').addClass('search-active');
        jQuery('.single').addClass('search-active')
    })
});
jQuery(window).load(function() {
    jQuery('.elementor-search-form__container').on('click', function(e) {
        if (!jQuery(e.target).hasClass('elementor-search-form__input') && jQuery(e.target).parents('.elementor-search-form__input').length == 0) {
            jQuery('.search-active').removeClass('search-active')
        }
    })
});
var $collection = jQuery("#main .elementor-section").not('.header, .tarif-card, .productfinder-question, .productfinder-no-results, .tariff-grid, .tab-content-1, .tab-content-2, .tab-content-3, .tab-content-4, .tab-content-5, .tab-content-6');
jQuery(window).scroll(function() {
    $collection.each(function() {
        var top_of_element = jQuery(this).offset().top;
        var bottom_of_element = jQuery(this).offset().top + jQuery(this).outerHeight();
        var bottom_of_screen = jQuery(window).scrollTop() + jQuery(window).innerHeight();
        var top_of_screen = jQuery(window).scrollTop();
        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
            jQuery(this).addClass('inview');
            jQuery('.inview').removeClass('active');
            jQuery('.inview').first().addClass('active')
        } else {
            jQuery(this).removeClass('inview')
        }
    })
    var str = jQuery('.inview.active').css('backgroundColor');
    var vals = str.substring(str.indexOf('(') + 1, str.length - 1).split(', ');
    var o = Math.round(((parseInt(vals[0]) * 299) + (parseInt(vals[1]) * 587) + (parseInt(vals[2]) * 114)) / 1000);
    if (jQuery('.inview.active').hasClass('dark-section') && jQuery('.fp-section').length == 0 || jQuery('.inview.active').hasClass('dark-section-mobile') && jQuery(window).width() < 768 || jQuery('.inview.active').hasClass('dark-section-desktop') && jQuery(window).width() > 1023) {
        jQuery('body').addClass('light-header')
    } else {
        jQuery('body').removeClass('light-header')
    }
});
setTimeout(function() {
    jQuery('section').first().addClass('inview active');
    if (jQuery('.inview.active').hasClass('dark-section') && jQuery('.fp-section').length == 0 || jQuery('.inview.active').hasClass('dark-section-mobile') && jQuery(window).width() < 768 || jQuery('.inview.active').hasClass('dark-section-desktop') && jQuery(window).width() > 1023) {
        jQuery('body').addClass('light-header')
    } else {
        jQuery('body').removeClass('light-header')
    }
}, 1000);
jQuery(window).resize(function() {
    if (jQuery('.inview.active').hasClass('dark-section') && jQuery('.fp-section').length == 0 || jQuery('.inview.active').hasClass('dark-section-mobile') && jQuery(window).width() < 768 || jQuery('.inview.active').hasClass('dark-section-desktop') && jQuery(window).width() > 1023) {
        jQuery('body').addClass('light-header')
    } else {
        jQuery('body').removeClass('light-header')
    }
});
jQuery(document).on('wheel', function() {
    if (window.location.href.indexOf("internationale-studenten") > -1) {
        setTimeout(function() {
            if (jQuery('.fp-section').hasClass('fp-completely') && jQuery('.fp-completely').hasClass('dark-section') || jQuery('.fp-section').hasClass('fp-completely') && jQuery('.fp-completely').hasClass('dark-section-mobile')) {
                jQuery('body').addClass('light-header')
            } else {
                jQuery('body').removeClass('light-header')
            }
        }, 1600)
    }
});
jQuery(".prevent-click").click(function(event) {
    event.preventDefault()
});
jQuery(document).ready(function() {
    jQuery('#content .elementor-section-wrap').first().append('<a class="scroll-to-top hidden"></a>');
    let scrollTopBtn = jQuery('.scroll-to-top');
    let scrollContainer = jQuery('body');
    let footerContainer = jQuery('.footer');
    let openerContainer = jQuery('#content .elementor-section-wrap > section:first-of-type').first();
    let openerOffset = openerContainer.height() - 100;
    const scrollBtn = () => {
        if (jQuery(window).width() < 768) {
            if (jQuery(window).scrollTop() + jQuery(window).height() > footerContainer.offset().top) {
                scrollTopBtn.removeClass("hidden")
            } else {
                scrollTopBtn.addClass("hidden")
            }
        } else {
            if (jQuery(window).scrollTop() > openerOffset) {
                scrollTopBtn.removeClass("hidden")
            } else {
                scrollTopBtn.addClass("hidden")
            }
        }
    }
    const scrollToTop = () => {
        document.body.scrollIntoView({
            behavior: "smooth",
        })
    };
    jQuery(window).on('scroll', function() {
        scrollBtn()
    });
    scrollTopBtn.click(function() {
        scrollToTop()
    });
    jQuery(window).on('resize', function() {
        scrollBtn()
    });
    scrollBtn()
})