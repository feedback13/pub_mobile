$(document).ready(function () {
    calendarBox.init();
    writerBox.init();
    orderjobToggle.init();
    scrollTabs.init();
    inputBoxSet.init();
    customSelectBox.init();
    secretCheck.init();
});

var orderjobToggle = {
    init: function () {
        if ($('.orderjob_sub_content').length) {
            if ($('.orderjob_sub_content > .toggle_btn').hasClass('down')) {
                $('.orderjob_sub_content').css('border-bottom', '1px solid #eaeaea');

                $('.orderjob_sub_content').find('.sub_informs').each(function () {
                    $(this).hide();
                });
                $('.orderjob_sub_content').css('border-bottom', '1px solid #eaeaea');
            } else {
                $('.orderjob_sub_content').find('.sub_informs').each(function () {
                    $(this).css('display', 'inline-block');
                });
                $('.orderjob_sub_content').css('border-bottom', 'none');
                $('.orderjob_sub_content').find('.sub_informs').each(function () {
                    $(this).css('display', 'inline-block');
                });
                $('.orderjob_sub_content').css('border-bottom', 'none');
                $('.orderjob_sub_content > .toggle_btn').removeClass('down');
            }

            $('.orderjob_sub_content > .toggle_btn').click(function () {
                if ($(this).hasClass('down')) {
                    $('.orderjob_sub_content').find('.sub_informs').each(function () {
                        $(this).css('display', 'inline-block');
                    });
                    $('.orderjob_sub_content').css('border-bottom', 'none');
                    $(this).removeClass('down');
                } else {
                    $('.orderjob_sub_content').find('.sub_informs').each(function () {
                        $(this).hide();
                    });
                    $('.orderjob_sub_content').css('border-bottom', '1px solid #eaeaea');
                    $(this).addClass('down');
                }
            });
        }
    }
}


var arraySetField = {
    init: function () {
    },
    fieldClick: function () {
        $('.array_sets').children('.array_input').focus();
    },
    removeArray: function (target, uuid) {
        var sets = $(target).parent();
        $(target).remove();

        sets.find('input[type=hidden]').val(JSON.stringify(this.getArrayList(sets)));
    },
    keydownEvent: function (target, event) {
        /*var keyID = (event.which) ? event.which : event.keyCode;
        if(keyID == 13 || keyID == 32 || keyID == 188) {
            if(!UTIL.isBlank($(target).val())) {
                var arr = this.getArrayList($(target).parent());
                arr.push($(target).val());
                $(target).parent().find('input[type=hidden]').val(JSON.stringify(arr));

                $(target).before(this.setArrayBlock($(target).val()));
                event.target.value = '';
            }

            return false;
        }*/
    },
    keyupEvent: function (target, event) {
        var str = target.value;
        var lastChar = str.substr(str.length - 1);
        if (lastChar == ',' || lastChar == ' ') {
            if (!UTIL.isBlank($(target).val())) {
                var arr = this.getArrayList($(target).parent())
                var resultValue = ($(target).val()).slice(0, -1);
                arr.push(resultValue);
                $(target).parent().find('input[type=hidden]').val(JSON.stringify(arr));

                $(target).before(this.setArrayBlock(resultValue));
                event.target.value = '';
            }

            return false;
        }

        /*var keyID = (event.which) ? event.which : event.keyCode;
        if(keyID == 13 || keyID == 32 || keyID == 188) {
            event.target.value = '';
        }*/
    },
    getArrayList: function (sets) {
        var arr = [];
        if (sets.find('span').length) {
            sets.find('span').each(function () {
                arr.push($(this).text());
            });
        }

        return arr;
    },
    setArrayBlock: function (url) {
        var uuid = UTIL.guid();
        var row = '<span id="' + uuid + '">' + url + '<button type="button" onclick="arraySetField.removeArray(this.parentElement, \'' + uuid + '\')"><img src="https://images.otwojob.com/image/mobile/orderjob/btn-close-black-16-px.png"></button></span>';
        return row;
    }
}

var calendarBox = {
    init: function () {
        if ($('.input_calendar').length) {
            var dateToday = new Date();
            var datepicker = $('.input_calendar');
            var maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 60);

            datepicker.prop('readOnly', true);

            $.datepicker.setDefaults({
                showAnim: "",
                dateFormat: 'yy년 mm월 dd일',
                prevText: '이전 달',
                nextText: '다음 달',
                monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                showMonthAfterYear: true,
                yearSuffix: '년',
                minDate: dateToday,
                maxDate: maxDate
            });

            datepicker.datepicker();
        }
    }
}

var writerBox = {
    init: function () {
        if ($('.reply_brief').length) {
            $('.reply_brief').children('input[type=text]').click(function () {
                $('.reply_brief').hide();
                $('.reply_writer').css("display", 'inline-block');
                $('.reply_writer').find('textarea').focus();
            });
        }

        this.etcMenu();
    },
    emptyAlert: function () {
        alert('메시지를 입력해주세요.');
    },
    etcMenu: function () {
        $(window).click(function (e) {
            try{
                if (e.target.className != 'etc_btn' && e.target.parentElement.className != 'etc_menu') {
                    $('.etc_menu_field').hide();
                }
            } catch(e) {}
        });
    },
    showEtcMenu: function (target) {
        var menu = $(target).parent().find('.etc_menu_field');
        if (menu.css("display") == 'none') {
            $('.etc_menu_field').hide();
            menu.css('display', 'inline-block');
        } else {
            menu.hide();
        }
    }
}

var inputBoxSet = {
    init: function () {
        if ($('.input_field').find('input[type=number], input[type=text], textarea').length) {

            $('.input_field').find('input[type=number], input[type=text], textarea').focusout(function () {
                if ($(this).val() != '') {
                    $(this).addClass('fixed');
                } else {
                    $(this).removeClass('fixed');
                }
            });
        }
    }
}

var UTIL = {
    isBlank: function (str) {
        return (!str || /^\s*$/.test(str));
    },
    guid: function () {
        function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    viewKorean: function (num_value) {
        if (isNaN(num_value) == true)
            return "";

        // 1 ~ 9 한글 표시
        var arrNumberWord = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구");
        // 10, 100, 100 자리수 한글 표시
        var arrDigitWord = new Array("", "십", "백", "천");
        // 만단위 한글 표시
        var arrManWord = new Array("", "만", "억", "조");

        var num_length = num_value.length;

        var han_value = "";
        var man_count = 0;      // 만단위 0이 아닌 금액 카운트.

        for (var i = 0; i < num_value.length; i++) {
            // 1단위의 문자로 표시.. (0은 제외)
            var strTextWord = arrNumberWord[num_value.charAt(i)];

            // 0이 아닌경우만, 십/백/천 표시
            if (strTextWord != "") {
                man_count++;
                strTextWord += arrDigitWord[(num_length - (i + 1)) % 4];
            }
            // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
            if (man_count != 0 && (num_length - (i + 1)) % 4 == 0) {
                man_count = 0;
                strTextWord = strTextWord + arrManWord[(num_length - (i + 1)) / 4];
            }
            han_value += strTextWord;
        }

        return han_value;
    }
}


var scrollTabs = {
    init: function () {
        if ($('.scroll_tabs').length) {
            this.tabWrap = $('.scroll_tabs')
                , this.trigger = this.tabWrap.find('a')
                , this.TOP = this.tabWrap.offset().top
                , this.content = $('.tab_content')
                , this.currentScrollTop = $(window).scrollTop();

            this._tabFix();
            this._checkTab();
            this._bind();

            $(window).on({
                'scroll.tabMove': function () {
                    scrollTabs.currentScrollTop = $(window).scrollTop();
                    scrollTabs._tabFix();
                }
            });
        }

    },
    _tabFix: function () {
        if($('.pledge_form').css('display') != 'none') {
            return;
        }

        if (this.currentScrollTop >= this.TOP) {
            if (!this.tabWrap.hasClass('fixed')) {
                this.tabWrap.addClass('fixed');
            }
            this._checkTab();
        } else {
            if (this.tabWrap.hasClass('fixed')) {
                this.tabWrap.removeClass('fixed');
            }
        }
    },
    _checkTab: function () {
        this.content.each(function (i) {
            var thisTop = $(this).offset().top;
            if (scrollTabs.currentScrollTop + 78 >= thisTop) {
                scrollTabs.trigger.removeClass('on');
                scrollTabs.trigger.eq(i).addClass('on');
            }
        });
    },
    _bind: function () {
        var content = this.content;
        this.trigger.each(function (i) {
            $(this).on({
                click: function () {
                    $('html, body').stop().animate({
                        scrollTop: content.eq(i).offset().top - 73
                    }, 300);
                    return false;
                }
            });
        });
    }
}

var customSelectBox = {
    init: function () {
        this.addClickEvent($('.custom_selectbox'));
    },
    showAllCategory: function (target) {
        target.children('.select_header').removeClass('selected');
        target.find('.answer_radio').each(function () {
            $(this).css('display', 'inline-block');
        });
    },
    addNewClickEvent: function (targetId) {
        customSelectBox.addClickEvent($('#' + targetId));
    },

    addClickEvent: function (target) {
        if (target.length) {
            target.each(function () {
                var sBox = $(this);
                var isChecked = false;
                sBox.find('.answer_radio').each(function () {
                    isChecked = $(this).children('input[type=radio]').is(':checked');
                    if (isChecked) {
                        return false;
                    }
                });

                if (isChecked) {
                    sBox.find('.answer_radio').each(function () {
                        if (!$(this).children('input[type=radio]').is(':checked')) {
                            $(this).hide();
                        }
                    });
                }

                sBox.find('input[type=radio]').each(function() {
                   if(!$(this).hasClass('clickevent')) {
                       $(this).click(function () {
                           if (sBox.children('.select_header').hasClass('selected')) {
                               customSelectBox.showAllCategory(sBox);
                           } else {
                               sBox.children('.select_header').addClass('selected');
                               sBox.find('.answer_radio').each(function () {
                                   if (!$(this).find('input[type=radio]').is(':checked')) {
                                       $(this).hide();
                                   }
                               });
                           }
                       });
                       $(this).addClass('clickevent');
                   }
                });

                sBox.children('.select_header').click(function () {
                    if ($(this).hasClass('selected')) {
                        customSelectBox.showAllCategory(sBox);
                    }
                });
            });
        }
    }
}

var secretCheck = {
    init: function () {
        /*if($('input[name="secret_pledge"]').length) {
           $('input[name="secret_pledge"]').change(function() {
               if($(this).is(':checked')) {
                    secretCheck.showPledgeForm();
               }
            });
        }*/
    },
    showPledgeForm: function () {
        $('header').hide();
        $('header').css('height', 0);
        $('.scroll_tabs').hide();
        $('.orderjob_container').hide();
        $('.aside_menu').hide();

        // $('html').scrollTop(0
        //$('html').css('overflow-y', 'hidden');

        // $('footer').css('position', 'fixed');
        $('footer').css('display', 'none');
        $('.pledge_form').css("display", 'inline-block');
        setTimeout(function() {
            $('html, body').animate({
                scrollTop : 0
            }, {
                duration: 250
            });
        }, 100);
    },
    closePledgeForm: function () {
        if($('.scroll_tabs').length) {
            $('header').css('height', '');
        } else {
            $('header').css('height', 'auto');
        }
        $('header').show();
        $('.scroll_tabs').show();
        $('.orderjob_container').css('display', 'inline-block')
        $('.aside_menu').show();

        $('footer').css('display', '');
        // $('footer').css('position', 'relative');

        //$('html').css('overflow-y', 'auto');
        $('.pledge_form').hide();
        $(window).scrollTop($('input[name="ndaAgree"]').offset().top - 80);
    },
    cancelPledgeForm: function () {
        $('input[name="ndaAgree"]').removeAttr("checked");
        $('input[name="ndaAgree"]').val('N');
        secretCheck.closePledgeForm();
    },

}

