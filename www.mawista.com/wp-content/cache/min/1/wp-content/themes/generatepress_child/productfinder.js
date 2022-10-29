jQuery(document).ready(function() {
    let queryParams = window.location.search;
    let searchParams = new URLSearchParams(queryParams);
    searchParams.forEach(function(value, key) {
        let originalValue = value.replaceAll('-', ' ').replaceAll('%2F', '/').replaceAll('%28', '(').replaceAll('%29', ')').replaceAll('%28', '(').replaceAll('%2C', ',').replaceAll('%26', '&');
        if (key === 'step-1') {
            waitForElement('#productfinder').then((elem) => {
                jQuery('#productfinder .start-steps').trigger('click');
                jQuery('#productfinder .productfinder-question.step-1 .productfinder-button[data-search="' + originalValue + '"]').trigger('click')
            })
        } else if (key.includes('step-')) {
            waitForElement('#productfinder .filter-container.active').then((elem) => {
                if (jQuery('#productfinder .filter-container.active .' + key + ' .productfinder-button').hasClass('range-button')) {
                    jQuery('#productfinder .filter-container.active .' + key + ' .slidecontainer .productfinder-slider').val(originalValue);
                    jQuery('#productfinder .filter-container.active .' + key + ' .range-output').text(originalValue);
                    fixSliderColor(jQuery('#productfinder .filter-container.active .' + key + ' .slidecontainer .productfinder-slider'));
                    jQuery('#productfinder .filter-container.active .' + key + ' .productfinder-button.range-button').trigger('click')
                } else {
                    jQuery('#productfinder .filter-container.active .' + key + ' .productfinder-button[data-search="' + originalValue + '"]').trigger('click')
                }
            })
        } else if (key === 'sent') {
            if (value === 'true') {
                jQuery('.productfinder-results').addClass('mail-confirmation')
            }
        }
    });
    jQuery('.pagination').first().addClass('active');
    jQuery('.pagination').first().addClass('start-active');
    jQuery('.start-steps').on('click', function() {
        jQuery('.pagination').first().removeClass('start-active');
        jQuery('.step-1').addClass('active');
        jQuery('.pagination').first().addClass('active');
        jQuery('.start-steps-section').remove()
    });
    jQuery('.range-output').text(jQuery('.productfinder-slider').val());
    jQuery('.productfinder-slider').on('input', function() {
        jQuery('.range-output').text(jQuery(this).val())
    })
    jQuery('.productfinder-slider').on('change', function() {
        jQuery('.range-output').text(jQuery(this).val())
    });
    var classlist = [],
        stepcount = 0,
        ecount = 0,
        steponeval, steptwoval, steptogether, datasearch, search, datasearch2, search2, age, agesearch, path, agesplit, points, price, pricerank, pricearray = [],
        urlpath = '';
    var pathname = window.location.pathname;
    jQuery(document).on('click', '.productfinder-pagination.active', function() {
        if (jQuery(this).hasClass('skip-step')) {
            jQuery(".productfinder-pagination.active").not(".skip-step").last().trigger('click');
            jQuery('.productfinder-pagination').each(function() {
                jQuery(this).removeClass('skip-step')
            });
            return
        }
        if (jQuery(this).hasClass('step-1')) {
            jQuery('.tarif-card').removeClass('hide')
        }
        jQuery('.productfinder-no-results').removeClass('active');
        classlist = jQuery(this).attr('class').split(' ');
        stepcount = classlist[1].split('-')[1];
        if ((urlpath.indexOf('step-' + stepcount)) >= 0) {
            urlpath = urlpath.substring(0, (urlpath.indexOf('step-' + stepcount)) - 1)
        }
        urlpath = urlpath.replace(/ /g, '');
        window.history.pushState("", "", pathname + urlpath);
        if (jQuery('.productfinder-results').hasClass('mail-confirmation')) {
            window.location.href = window.location.origin + pathname + urlpath
        }
        jQuery('#productfinder .popup-wrapper form .ginput_container_textarea .textarea').val(window.location.origin + pathname + urlpath);
        jQuery('#productfinder .popup-wrapper form').attr('action', pathname + urlpath + '&sent=true');
        let totalSteps = jQuery('.pagination.active li').length;
        if (stepcount != jQuery('.productfinder-pagination').length) {
            jQuery('.productfinder-question').removeClass('active');
            jQuery('.productfinder-question.step-' + stepcount).addClass('active');
            jQuery('.productfinder-pagination').removeClass('active');
            jQuery('.productfinder-results').removeClass('active-results');
            for (var i = stepcount; i > 0; i--) {
                jQuery('.productfinder-pagination.step-' + i).addClass('active')
            }
            if (stepcount == 1) {
                for (var i = totalSteps; i > 0; i--) {
                    jQuery('.tarif-card').removeAttr('data-keyinfo' + i)
                }
                jQuery('.tarif-card').removeClass('hide');
                jQuery('.filter-container').removeClass('active');
                jQuery('.pagination').first().addClass('active').siblings('.pagination').removeClass('active')
            }
            jQuery('.productfinder-results .tarif-card').each(function() {
                datasearch2 = jQuery(this).attr('data-filter');
                search2 = jQuery(this).attr('data-keyinfo' + (stepcount - 1));
                for (var i = totalSteps; i >= stepcount; i--) {
                    jQuery('.tarif-card').removeAttr('data-keyinfo' + i)
                }
                if (search2 == undefined) {
                    return !0
                }
                if (datasearch2.indexOf(search2) > -1) {
                    jQuery(this).removeClass('hide').removeClass('.key-' + stepcount)
                }
            });
            fixPaginationLabel();
            filterExceptions()
        }
    });
    jQuery('.productfinder-button').on('click', function() {
        let connector = '&';
        let urlValue = jQuery(this).data('search');
        let step = jQuery(this).parents('.productfinder-question').attr('class').split(' ')[1];
        if (step === 'step-1') {
            connector = '?'
        }
        if (jQuery(this).hasClass('range-button')) {
            urlValue = jQuery(this).parents('.pf-btns').siblings('.slidecontainer').find('.productfinder-slider').val()
        }
        urlpath += connector + jQuery(this).parents('.productfinder-question').attr('class').split(' ')[1] + '=' + urlValue.replaceAll('&', '%26');
        urlpath = urlpath.replace(/ /g, '-').replaceAll('/', '%2F').replaceAll('(', '%28').replaceAll(')', '%29').replaceAll('(', '%28').replaceAll(',', '%2C');
        window.history.pushState("", "", pathname + urlpath);
        jQuery('#productfinder .popup-wrapper form .ginput_container_textarea .textarea').val(window.location.origin + pathname + urlpath);
        jQuery('#productfinder .popup-wrapper form').attr('action', pathname + urlpath + '&sent=true');
        var clickedElement = jQuery(this);
        if (jQuery(this).parents('.productfinder-question').hasClass('step-1')) {
            jQuery('.productfinder-' + jQuery(this).data('search').toLowerCase()).addClass('active');
            jQuery('.pagination-' + jQuery(this).data('search').toLowerCase()).addClass('active').siblings('.pagination').removeClass('active')
        }
        classlist = jQuery('.productfinder-question.active').attr('class').split(' ');
        stepcount = classlist[1].split('-')[1];
        datasearch = jQuery(this).data('search');
        labelStart = '<span class="label-info">' + jQuery(this).data('pagination') + ': </span>';
        labelEnd = '';
        if (datasearch.match(/ *\([^)]*\) */g) != null) {
            labelEnd = '<span class="label-brackets" style="display:none;">' + datasearch.match(/ *\([^)]*\) */g) + '</span>'
        }
        if (labelStart != undefined && labelStart != '') {
            paginationLabel = labelStart + datasearch.replace(/ *\([^)]*\) */g, "") + labelEnd
        } else {
            paginationLabel = datasearch.replace(/ *\([^)]*\) */g, "") + labelEnd
        }
        jQuery('.productfinder-pagination.active.step-' + stepcount + ' .pagination-label').html(paginationLabel);
        jQuery('.cards-container .tarif-card').each(function() {
            var tarficard = jQuery(this);
            if (clickedElement.hasClass('range-button')) {
                age = parseInt(clickedElement.parents('.productfinder-question').find('.range-output').text());
                path = jQuery(clickedElement).parents(".filter-container").attr("class").split(/\s+/)[0].split('-')[1];
                switch (path) {
                    case '学生':
                        path = 'student';
                        break;
                    case '移居海外人士':
                        path = 'expat';
                        break;
                    case '游客':
                        path = 'tourist';
                        break;
                    default:
                        break
                }
                agesearch = jQuery(this).data('age-filter-' + path).split('|');
                let inRange = !1;
                jQuery.each(agesearch, function(i, val) {
                    agesplit = val.split(';')[0].replace(/ /g, '').replace('Jahre', '');
                    if (agesplit.indexOf('-') > -1 && agesplit.split('-')[0] <= age && agesplit.split('-')[1] >= age) {
                        jQuery(tarficard).find('.elementor-icon-box-description').text(agesearch[i].split(';')[1]);
                        inRange = !0;
                        return !1
                    } else if (agesplit.indexOf('-') == -1 && age == agesplit) {
                        jQuery(tarficard).find('.elementor-icon-box-description').text(agesearch[i].split(';')[1]);
                        inRange = !0;
                        return !1
                    }
                });
                if (!inRange) {
                    jQuery(tarficard).addClass('hide key-' + stepcount)
                }
            }
            if (clickedElement.hasClass('range-button')) {
                let label;
                if (labelStart != undefined && labelStart != '') {
                    label = labelStart + clickedElement.parents('.productfinder-question').find('.productfinder-slider').val()
                } else {
                    label = clickedElement.parents('.productfinder-question').find('.productfinder-slider').val()
                }
                jQuery('.productfinder-pagination.active.step-' + stepcount + ' .pagination-label').html(label)
            }
            search = jQuery(this).data('filter');
            if (search == undefined) {
                return
            } else {
                if (search.indexOf(datasearch) == -1) {
                    jQuery(this).addClass('hide key-' + stepcount)
                } else {
                    if (jQuery(this).hasClass('hide')) {
                        return !0
                    }
                    jQuery(this).attr('data-keyinfo' + stepcount, datasearch)
                }
            }
        });
        jQuery('.productfinder-question.step-' + stepcount).removeClass('active');
        stepcount++;
        jQuery('.productfinder-question.step-' + stepcount + ', .productfinder-pagination.step-' + stepcount).addClass('active');
        var tariflength = jQuery('.productfinder-results .tarif-card').length - jQuery('.tarif-card.hide').length;
        fixPaginationLabel();
        filterExceptions();
        if (tariflength <= 0) {
            jQuery('.productfinder-loading').addClass('active');
            jQuery('.productfinder-question').removeClass('active');
            jQuery('.productfinder-question.last-step').addClass('active');
            setTimeout(function() {
                jQuery('.productfinder-loading').removeClass('active');
                ecount = stepcount;
                jQuery('.productfinder-pagination').each(function() {
                    jQuery('.productfinder-pagination.step-' + ecount).addClass('active skip-step');
                    ecount++
                });
                jQuery('.productfinder-question').removeClass('active');
                jQuery('.productfinder-question.last-step').addClass('active');
                jQuery('.productfinder-no-results').addClass('active');
                jQuery('.productfinder-no-results .product-back').addClass('stepback-' + (jQuery('.pagination.active .productfinder-pagination').length - 1))
            }, 1000)
        } else if (stepcount == jQuery('.pagination.active .productfinder-pagination').length) {
            jQuery('.productfinder-loading').addClass('active');
            setTimeout(function() {
                jQuery('.productfinder-loading').removeClass('active');
                jQuery('.productfinder-question.last-step').addClass('active');
                jQuery('.productfinder-results').addClass('active-results');
                jQuery('.productfinder-results .product-back').addClass('stepback-' + (jQuery('.pagination.active .productfinder-pagination').length - 1));
                points = -1;
                price = 0;
                jQuery('.productfinder-results .tarif-card').removeClass('badge');
                jQuery('.productfinder-results .tarif-card').find('.productbadge').remove();
                jQuery('.productfinder-results .tarif-card').each(function() {
                    if (!jQuery(this).hasClass('hide')) {
                        pricerank = parseFloat(jQuery(this).find('.elementor-icon-box-description').text().substring(3).replaceAll(',', '.'));
                        if (pricerank != undefined) {
                            pricearray.push(pricerank)
                        }
                        if (parseInt(jQuery(this).data('point')) > points) {
                            jQuery('.productfinder-results .tarif-card').removeClass('badge');
                            jQuery('.productfinder-results .tarif-card').find('.productbadge').remove();
                            points = parseInt(jQuery(this).data('point'));
                            jQuery(this).addClass('badge');
                            jQuery(this).prepend('<span class="productbadge">Empfohlen</span>')
                        }
                    }
                })
            }, 1000)
        }
    });
    jQuery(document).on('click', '.product-back', function() {
        jQuery('.productfinder-results').removeClass('mail-confirmation');
        var backstep = jQuery(this).attr('class').split(' ');
        let urlParams = window.location.search;
        if (jQuery('.step-' + backstep[1].split('-')[1]).hasClass('skip-step')) {
            jQuery(".productfinder-pagination.active").not(".skip-step").last().trigger('click');
            jQuery('.productfinder-pagination').each(function() {
                jQuery(this).removeClass('skip-step')
            });
            let step = jQuery(".productfinder-pagination.active").not(".skip-step").last().classList()[1];
            let lastIndex = urlParams.lastIndexOf(step) - 1;
            urlpath = urlParams.substring(0, lastIndex);
            window.history.pushState("", "", pathname + urlpath)
        } else {
            jQuery('.step-' + backstep[1].split('-')[1]).trigger('click');
            let step = 'step-' + backstep[1].split('-')[1];
            let lastIndex = urlParams.lastIndexOf(step) - 1;
            urlpath = urlParams.substring(0, lastIndex);
            window.history.pushState("", "", pathname + urlpath)
        }
        fixPaginationLabel();
        filterExceptions();
        jQuery('#productfinder .popup-wrapper form .ginput_container_textarea .textarea').val(window.location.origin + pathname + urlpath);
        jQuery('#productfinder .popup-wrapper form').attr('action', pathname + urlpath + '&sent=true')
    });
    jQuery('.productfinder-select').change(function() {
        var value = jQuery(this).val();
        jQuery(this).parents('.select-container').siblings('.pf-btns').find('.pf-btn').each(function() {
            if (jQuery(this).find('a').attr('data-search').indexOf(value) > -1) {
                jQuery(this).find('a').trigger('click')
            }
        })
        jQuery(this).val('default')
    });
    fixSliderColor(jQuery('.productfinder-slider'));
    jQuery('.productfinder-slider').on('input', function() {
        fixSliderColor(jQuery(this))
    });
    jQuery('.productfinder .send-results').click(function() {
        jQuery('.productfinder .popup-wrapper').addClass('active');
        jQuery('.productfinder').addClass('popup-active');
        jQuery('.productfinder .productfinder-results').addClass('popup-active')
    });
    jQuery('.productfinder .popup-wrapper .popup-close').click(function() {
        jQuery(this).parents('.popup-wrapper').removeClass('active');
        jQuery('.productfinder').removeClass('popup-active');
        jQuery('.productfinder .productfinder-results').removeClass('popup-active')
    })
});

function fixSliderColor(slider) {
    let max = slider.attr('max');
    let min = slider.attr('min');
    let value = parseInt(slider.val());
    let range = max - min;
    let percentage = (value / range) * 100;
    let gradient = 'linear-gradient(to right, #221f28 0%, #221f28 ' + percentage + '%, #fff ' + percentage + '%, #fff 100%)';
    slider.css('background', gradient)
}

function fixPaginationLabel() {
    jQuery('.pagination.active .productfinder-pagination').removeClass('label-active');
    let activePag = jQuery('.pagination.active .productfinder-pagination.active');
    let lastPag = jQuery('.pagination.active .productfinder-pagination.active').last();
    activePag.addClass('label-active');
    lastPag.removeClass('label-active')
}

function filterExceptions() {
    let pagination = jQuery('#productfinder .pagination.active .productfinder-pagination');
    let activeSteps = [];
    pagination.each(function() {
        if (jQuery(this).hasClass('label-active')) {
            let filter = jQuery(this).find('.pagination-label').clone().children().remove().end().text();
            if (jQuery(this).find('.label-brackets').length) {
                filter = filter + jQuery(this).find('.label-brackets').text()
            }
            activeSteps.push(filter)
        }
    });
    let excCards = jQuery('.cards-container .tarif-card').filter(function(i) {
        return jQuery(this).attr('data-exceptions') != ""
    });
    excCards.each(function() {
        let card = jQuery(this);
        let exceptionListString = jQuery(this).data('exceptions').replace(/\r?\n|\r/g, '');
        let exceptionList = exceptionListString.split('|');
        exceptionList.forEach(function(exception) {
            let steps = exception.split(';');
            let isException = !0;
            for (let i = 0; i < steps.length; i++) {
                if (activeSteps[i] != steps[i]) {
                    isException = !1;
                    return !1
                }
            }
            if (isException) {
                card.addClass('hide')
            }
        })
    })
}

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector))
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect()
            }
        });
        observer.observe(document.body, {
            childList: !0,
            subtree: !0
        })
    })
}