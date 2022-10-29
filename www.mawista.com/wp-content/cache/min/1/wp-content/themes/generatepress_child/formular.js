jQuery(document).ready(function() {
    let form = jQuery('.hallesche');
    if ((form.find('.gform_body .gform_page').first().css('display') != 'none') && window.location.hash == '') {
        localStorage.removeItem('results')
    }
    let results = {};
    if (localStorage.getItem('results') !== null) {
        results = JSON.parse(localStorage.getItem('results'))
    }
    let price;
    form.prepend('<div class="price"></div>');
    updateResults();
    fixStartOfInsurance();
    fixGermanAdress();
    if (calcPrice(jQuery('.gfield.tariff-choice input:checked').val(), jQuery('.age-field .large').val())) {
        price = calcPrice(jQuery('.gfield.tariff-choice input:checked').val(), jQuery('.age-field .large').val())
    }
    updatePrice(price)
    form.find('.gfield .ginput_container .gfield_radio .gchoice .gfield-choice-input').click(function() {
        onInput(jQuery(this))
    });
    form.find('.gfield .ginput_container input').on('change', function() {
        onInput(jQuery(this))
    });
    form.find('.gfield .ginput_container input').on('input', function() {
        onInput(jQuery(this))
    });
    form.find('.gfield .ginput_container select').on('input', function() {
        onInput(jQuery(this))
    });
    let pages = form.find('.gform_page');
    pages.each(function() {
        let page = jQuery(this);
        if (page.css('display') != 'none' && (page.hasClass('no-result-page') || page.hasClass('result-page'))) {
            jQuery('.contact-form .price').css('display', 'none');
            jQuery('.contact-form .result-container .price').css('display', '')
        } else if (page.css('display') != 'none') {
            jQuery('.contact-form .price').css('display', '')
        }
    });
    pages.each(function() {
        let page = jQuery(this);
        if (page.css('display') != 'none' && page.hasClass('no-result-page')) {
            jQuery('.contact-form .gf_progressbar_wrapper').css('display', 'none')
        } else if (page.css('display') != 'none') {
            jQuery('.contact-form .gf_progressbar_wrapper').css('display', '')
        }
    });
    pages.each(function() {
        let page = jQuery(this);
        if (page.css('display') != 'none' && page.hasClass('redirect-page')) {
            setTimeout(function() {
                let buttons = page.find('.redirect-button');
                buttons.each(function() {
                    if (jQuery(this).parents('.gfield_html').css('display') != 'none') {
                        let buttonLink = jQuery(this).attr('href');
                        window.location.href = buttonLink
                    }
                })
            }, 3000)
        }
    });
    jQuery(function() {
        jQuery(".date-of-birth .datepicker").on("change", function() {
            var d = $(this).val().substr(0, 2);
            var m = $(this).val().substr(3, 2);
            var y = $(this).val().substr(6, 4);
            var newToDateStart = new Date(y, m - 1, d);
            var today = new Date();
            var birthday = newToDateStart.getFullYear();
            var today2 = today.getFullYear();
            var age2 = today2 - birthday
            jQuery(".age-field .large").val(age2).trigger('change');
            jQuery(".tariff-name .ginput_container :input").trigger('change');
            if (calcPrice(jQuery('.gfield.tariff-choice input:checked').val(), jQuery('.age-field .large').val())) {
                price = calcPrice(jQuery('.gfield.tariff-choice input:checked').val(), jQuery('.age-field .large').val())
            }
            updatePrice(price)
        })
    });
    jQuery('.start-date-input select').on('change', function() {
        localStorage.setItem('selectedyear', this.value);
        var selecteddate = jQuery(this).val();
        jQuery('.start-date').text(jQuery(this).val());
        if (selecteddate.length == 17 || selecteddate.length == 16) {
            var start = new Date($(this).val().substr(12, 16).trim());
            var myyear = start.getFullYear();
            var myday = start.getDate();
            var monthstring = $(this).val().substr(0, 9).trim();
            var finaldate = new Date(myyear - 1, 0)
            var finalyear = finaldate.getFullYear();
            jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
            jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
        } else if (selecteddate.length == 15) {
            var start = new Date($(this).val().substr(11, 15).trim());
            var myyear = start.getFullYear();
            var myday = start.getDate();
            var monthstring = $(this).val().substr(0, 8).trim();
            var finaldate = new Date(myyear - 1, 0)
            var finalyear = finaldate.getFullYear();
            jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
            jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
        } else if (selecteddate.length == 14) {
            var start = new Date($(this).val().substr(10, 14).trim());
            var myyear = start.getFullYear();
            var myday = start.getDate();
            var monthstring = $(this).val().substr(0, 7).trim();
            var finaldate = new Date(myyear - 1, 0)
            var finalyear = finaldate.getFullYear();
            jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
            jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
        } else if (selecteddate.length == 13) {
            var start = new Date($(this).val().substr(8, 12).trim());
            var myyear = start.getFullYear();
            var myday = start.getDate();
            var monthstring = $(this).val().substr(0, 6).trim();
            var finaldate = new Date(myyear - 1, 0)
            var finalyear = finaldate.getFullYear();
            jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
            jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
        } else if (selecteddate.length == 12) {
            var start = new Date($(this).val().substr(8, 12).trim());
            var myyear = start.getFullYear();
            var myday = start.getDate();
            var monthstring = $(this).val().substr(0, 5).trim();
            var finaldate = new Date(myyear - 1, 0)
            var finalyear = finaldate.getFullYear();
            jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
            jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
        } else if (selecteddate.length == 11) {
            var start = new Date($(this).val().substr(7, 11).trim());
            var myyear = start.getFullYear();
            var myday = start.getDate();
            var monthstring = $(this).val().substr(0, 4).trim();
            var finaldate = new Date(myyear - 1, 0)
            var finalyear = finaldate.getFullYear();
            jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
            jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
        }
    });
    writevalues();

    function writevalues() {
        if (localStorage.getItem("selectedyear") != null) {
            var datelocalst = localStorage.getItem('selectedyear');
            jQuery('.start-date-input select').val(datelocalst);
            jQuery('.start-date').text(jQuery('.start-date-input select').val());
            if (datelocalst.length == 17 || datelocalst.length == 16) {
                var start = new Date($('.start-date-input select').val().substr(12, 16).trim());
                var myyear = start.getFullYear();
                var myday = start.getDate();
                var monthstring = $('.start-date-input select').val().substr(0, 9).trim();
                var finaldate = new Date(myyear - 1, 0)
                var finalyear = finaldate.getFullYear();
                jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                localStorage.setItem('since', monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
            } else if (datelocalst.length == 15) {
                var start = new Date($('.start-date-input select').val().substr(11, 15).trim());
                var myyear = start.getFullYear();
                var myday = start.getDate();
                var monthstring = $('.start-date-input select').val().substr(0, 8).trim();
                var finaldate = new Date(myyear - 1, 0)
                var finalyear = finaldate.getFullYear();
                jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                localStorage.setItem('since', monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
            } else if (datelocalst.length == 14) {
                var start = new Date($('.start-date-input select').val().substr(10, 14).trim());
                var myyear = start.getFullYear();
                var myday = start.getDate();
                var monthstring = $('.start-date-input select').val().substr(0, 7).trim();
                var finaldate = new Date(myyear - 1, 0)
                var finalyear = finaldate.getFullYear();
                jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                localStorage.setItem('since', monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
            } else if (datelocalst.length == 13) {
                var start = new Date($('.start-date-input select').val().substr(8, 12).trim());
                var myyear = start.getFullYear();
                var myday = start.getDate();
                var monthstring = $('.start-date-input select').val().substr(0, 6).trim();
                var finaldate = new Date(myyear - 1, 0)
                var finalyear = finaldate.getFullYear();
                jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                localStorage.setItem('since', monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
            } else if (datelocalst.length == 12) {
                var start = new Date($('.start-date-input select').val().substr(8, 12).trim());
                var myyear = start.getFullYear();
                var myday = start.getDate();
                var monthstring = $('.start-date-input select').val().substr(0, 5).trim();
                var finaldate = new Date(myyear - 1, 0)
                var finalyear = finaldate.getFullYear();
                jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                localStorage.setItem('since', monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
            } else if (datelocalst.length == 11) {
                var start = new Date($('.start-date-input select').val().substr(7, 11).trim());
                var myyear = start.getFullYear();
                var myday = start.getDate();
                var monthstring = $('.start-date-input select').val().substr(0, 4).trim();
                var finaldate = new Date(myyear - 1, 0)
                var finalyear = finaldate.getFullYear();
                jQuery('.start-date.year-before').text(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                jQuery('.date-year-before .ginput_container :input').val(monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear);
                localStorage.setItem('since', monthstring + ' ' + ' ' + myday + ',' + ' ' + finalyear)
            }
        }
    }

    function onInput(input) {
        let label = getLabel(input);
        let value = input.val();
        results[label] = value;
        localStorage.setItem('results', JSON.stringify(results));
        updateResults();
        setTimeout(function() {
            jQuery('.gfield .ginput_container input[disabled="disabled"]').each(function() {
                onDisable(jQuery(this))
            });
            jQuery('.gfield .ginput_container select[disabled="disabled"]').each(function() {
                onDisable(jQuery(this))
            })
        }, 200);
        fixGermanAdress()
    }

    function onDisable(input) {
        let label = getLabel(input);
        delete results[label];
        localStorage.setItem('results', JSON.stringify(results));
        updateResults();
        fixGermanAdress()
    }
});

function getLabel(input) {
    let label;
    if (input.parents('.ginput_complex').length) {
        label = input.siblings('label').text();
        return label
    }
    if (input.parents('.gfield').find('.gfield_description').length) {
        label = input.parents('.gfield').find('.gfield_description').text()
    } else if (input.parents('.gfield').find('.gftt-label').length) {
        label = input.parents('.gfield').find('.gftt-label').clone().children().remove().end().text()
    } else {
        label = input.parents('.gfield').find('.gfield_label').clone().children().remove().end().text()
    }
    if (input.parents('.gfield').hasClass('summary-hide')) {
        label = '|' + label + '|'
    }
    return label
}

function updateResults() {
    let results = JSON.parse(localStorage.getItem('results'));
    if (results == null || results == undefined) {
        return
    }
    let resultDiv = jQuery('.contact-form .result-container');
    resultDiv.find('*').remove();
    Object.entries(results).forEach(([key, value]) => {
        if (!resultDiv.find('[data-label="' + key + '"]').length) {
            var adddate = localStorage.getItem('since');
            var status = results["Your status"];
            var selecteddate2 = localStorage.getItem('selectedyear');
            if (key == 'Do you have a German tax ID?') {
                var construct = `<div data-label="${key}"><div class="result-label"><strong>${key}<small style="display:block;">Your tax ID (steuerliche Identifikationsnummer or Steuer-ID) is a unique number automatically assigned and sent to you when you first register in Germany. This is not your tax number (Steuernummer).</small>

			<small style="display:block;">Hallesche Krankenversicherung a.G. will pass on to the tax authorities the amounts of the tax reducing health and compulsory nursing care premiums as well as the necessary personal data of you.</small>

			<small style="display:block;">We ask you to give us the tax ID in order to pass on this data. If you do not provide your tax ID, we are entitled to obtain it from the Federal Central Tax office.</small></strong></div><div class="result-content">${value}</div></div>`
            } else if (key == 'Long-term care insurance') {
                var construct = `<div data-label="${key}"><div class="result-label"><strong>${key}<small style="display:block;">You are currently a language student. The conclusion of an application without compulsory long-term care insurance is only possible with an initially limited residence permit of up to 12 months. Together with the application, you agree to the automatic addition of compulsory long-term care insurance after 12 months since ${adddate} the beginning of the contract. Please contact us if you start your studies before the end of the 12 months, extend your residence permit and need insurance coverage in the compulsory nursing care insurance.</small></strong></div><div class="result-content">${value}</div></div>`
            } else if (key == 'Body weight:') {
                var construct = `<div data-label="${key}"><div class="result-label"><strong>${key}</strong></div><div class="result-content">${value}</div></div>` + `<div data-label="Health information"><div class="result-label"><strong>Health information<br>The following questions are asked by the insurer (Hallesche Krankenversicherung a.G.) to determine the details of your coverage. Please answer the following questions about yourself.It is important that you are aware of the following:<small style="display:block;">By answering the following questions, I agree my health data may be processed, transferred, and used by the underwriting provider Hallesche Krankenversicherung a.G. according to their <a href="https://www.mawista.com/wp-content/uploads/2022/09/VG360e_voll.pdf" target="_blank">health data protection </a> policies. I agree to the terms about the release from confidentiality to the underwriting provider Hallesche Krankenversicherung a.G. My health data may be collected, stored, and shared with third parties only where absolutely necessary by Hallesche Krankenversicherung a.G.
			I confirm and understand according to § 19 Abs. 5 VVG (insurance law) it is important to answer the next set of questions truthfully and not to leave out any information. I understand omitting any relevant detail shall leave the insurer entitled to rescind the contract or to allow for the contract to be canceled retroactively. Additionally, I am aware that the terms of the contract may be adjusted if I was to provide false information. I have taken note of the <a href="https://www.mawista.com/wp-content/uploads/2022/09/VG13e.pdf" target="_blank">information regarding disclosure obligations.</a>.I have read and agree to the terms above.</small></strong></div><div class="result-content"></div></div>`
            } else if (key == 'What is your current health insurance?' && (status == 'Student (BA, MSc, PhD) in Germany <em>(Student Pro Classic)</em>' || status == 'Student (BA, MSc, PhD) in Germany <em>(Student Pro Premium)</em>')) {
                var construct = `<div data-label="${key}"><div class="result-label"><strong>${key}<small style="display:block;">Note on compulsory long-term care insurance Please contact us if you or one of your family members (father/mother/spouse) already has/had a private compulsory long-term care insurance in Germany.</small></strong></div><div class="result-content">${value}</div></div>`
            } else if (key == 'Are you currently living in Germany or will you move to Germany to live there by ?') {
                var construct = `<div data-label="${key}"><div class="result-label"><strong>Are you currently living in Germany or will you move to Germany to live there by ${selecteddate2}?</strong></div><div class="result-content">${value}</div></div>` + `<div data-label="${key}"><div class="result-label"><strong>${key}</strong></div><div class="result-content">${value}</div></div>`
            } else {
                var construct = `<div data-label="${key}"><div class="result-label"><strong>${key}</strong></div><div class="result-content">${value}</div></div>`
            }
            if (key.startsWith('|') && key.endsWith('|')) {
                construct = ''
            }
            resultDiv.append(construct)
        } else {
            if (!(key.startsWith('|') && key.endsWith('|'))) {
                resultDiv.find('[data-label="' + key + '"] .result-label strong').text(key);
                resultDiv.find('[data-label="' + key + '"] .result-content').text(value)
            }
        }
    });
    if (calcPrice(jQuery('.gfield.tariff-choice input:checked').val(), jQuery('.age-field .large').val())) {
        price = calcPrice(jQuery('.gfield.tariff-choice input:checked').val(), jQuery('.age-field .large').val())
    }
}

function calcPrice(tariff, inputAge) {
    if (tariff == null || inputAge == null) {
        return null
    }
    tariff = tariff.toLowerCase();
    let column = 1;
    if (tariff.includes('classic') && (tariff.includes('study collegiate') || tariff.includes('studienkollegiate'))) {
        column = 1
    } else if (tariff.includes('classic') && (tariff.includes('student (ba, msc, phd) in germany <em>(student pro classic)</em>') || tariff.includes('studenten (ba, msc, phd)'))) {
        column = 2
    } else if (tariff.includes('premium') && (tariff.includes('study collegiate') || tariff.includes('studienkollegiate'))) {
        column = 3
    } else if (tariff.includes('premium') && (tariff.includes('student (ba, msc, phd) in germany <em>(student pro premium)</em>') || tariff.includes('studenten (ba, msc, phd)'))) {
        column = 4
    }
    let priceTable = jQuery('.hallesche-preis').text().replace(/\n/g, '').split('|');
    let age = parseInt(inputAge);
    let price = '';
    priceTable.forEach(row => {
        let columns = row.split(';');
        if (columns[0].includes('-')) {
            let range = columns[0].split('-')
            if (range[0] <= age && age <= range[1]) {
                price = columns[column]
            }
        } else {
            if (columns[0] == age) {
                price = columns[column]
            }
        }
    });
    const productnames = ['Student Pro Premium (Hi.Medical L P 500 und Hi.Dental L mit SBS PVN)', 'Student Pro Premium (Hi.Medical L P 500 und Hi.Dental L mit PVN)', 'Student Pro Premium (Hi.Medical L P 500 und Hi.Dental L)', 'Student Pro Classic (Hi.Medical S P500 und Hi.Dental S mit SBS PVN)', 'Student Pro Classic (Hi.Medical S P500 und Hi.Dental S mit PVN)', 'Student Pro Classic (Hi.Medical S P500 und Hi.Dental S)']
    if (tariff.includes('classic') && ((tariff.includes('study collegiate') || tariff.includes('studienkollegiate'))) && (inputAge >= 0 && inputAge <= 70)) {
        jQuery(".tariff-name .ginput_container :input").val(productnames[5])
    } else if (tariff.includes('classic') && ((tariff.includes('student (ba, msc, phd) in germany <em>(student pro classic)</em>') || tariff.includes('studenten (ba, msc, phd)'))) && inputAge >= 38) {
        jQuery(".tariff-name .ginput_container :input").val(productnames[4])
    } else if (tariff.includes('classic') && ((tariff.includes('student (ba, msc, phd) in germany <em>(student pro classic)</em>') || tariff.includes('studenten (ba, msc, phd)'))) && inputAge < 38) {
        jQuery(".tariff-name .ginput_container :input").val(productnames[3])
    } else if (tariff.includes('premium') && ((tariff.includes('study collegiate') || tariff.includes('studienkollegiate'))) && (inputAge >= 0 && inputAge <= 70)) {
        jQuery(".tariff-name .ginput_container :input").val(productnames[2])
    } else if (tariff.includes('premium') && ((tariff.includes('student (ba, msc, phd) in germany <em>(student pro premium)</em>') || tariff.includes('studenten (ba, msc, phd)'))) && inputAge >= 38) {
        jQuery(".tariff-name .ginput_container :input").val(productnames[1])
    } else if (tariff.includes('premium') && ((tariff.includes('student (ba, msc, phd) in germany <em>(student pro premium)</em>') || tariff.includes('studenten (ba, msc, phd)'))) && inputAge < 38) {
        jQuery(".tariff-name .ginput_container :input").val(productnames[0])
    }
    return price
}

function updatePrice(price) {
    var finaltariff = jQuery(".tariff-name .ginput_container :input").val();
    if (price != '' && price != undefined) {
        jQuery('.contact-form .price').html('<strong>Your price:</strong> ' + price + ' monthly')
        jQuery('div[data-label="Your tariff"]').css('display', 'none');
        jQuery('.contact-form .result-container .price').remove();
        jQuery('.contact-form .result-container').append(`<div data-label="Your tariff"><div class="result-label"><strong>Your tariff</strong></div><div class="result-content">${finaltariff}</div></div>`);
        jQuery('.contact-form .result-container').append(`<div data-label="Price"><div class="result-label"><strong>Your Price</strong></div><div class="result-content">${price}</div></div>`);
        var trimmedPrice = jQuery.trim(price);
        jQuery('.tariff-price :input').val(trimmedPrice)
    } else {
        jQuery('.contact-form .price').html('')
    }
}
jQuery('.start-date-input select').on('change', function() {
    jQuery('.start-date').text(this.value)
});

function fixStartOfInsurance() {
    let select = jQuery('.contact-form .start-of-insurance .gfield_select')
    select.find('option').not('.gf_placeholder').remove();
    select.find('option.gf_placeholder').attr('disabled', 'disabled');
    let today = new Date();
    let startDate;
    if (today.getDay() == 1) {
        startDate = today
    } else {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    }
    for (let i = 0; i < 12; i++) {
        let date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
        select.append(`<option value="${date.toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric' })}">${date.toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric' })}</option>`)
    }
}

function fixGermanAdress() {
    let select = jQuery('.contact-form .germany-selected .address_country select');
    select.find('option').not('[value="Deutschland"], [value="Germany"]').remove();
    select.find('option[value="Deutschland"], [value="Germany"]').attr('selected', 'selected');
    if (select.find('option[value="Deutschland"]').length) {
        select.val('Deutschland')
    } else {
        select.val('Germany')
    }
}
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("toggle-active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none"
        } else {
            panel.style.display = "block"
        }
    })
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}
jQuery(document).ready(function() {});
jQuery(document).ready(function() {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? !0 : decodeURIComponent(sParameterName[1])
            }
        }
        return !1
    };
    var taf = getUrlParameter('tariff');
    if (taf == 'student-pro-classic' || taf == 'student-pro-premium') {
        jQuery(".tariff-choice").addClass(taf)
    }
})