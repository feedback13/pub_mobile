var optionBoxPaging = {
    init : function () {
        this.f1 =  new eg.Flicking(".option_paging").on({
            flickEnd: optionhandler
        });
        $('.option_box').hide();
        $('.option_box').css('opacity', '1');
    },
    moveTo : function(idx) {
        this.f1.moveTo(idx);
    }
}

function optionhandler(e) {
    $('.option_paging_btn').removeAttr('disabled');
    $('#option_pagin_btn_'+e.no).attr('disabled', 'disabled');

}

$(document).ready(function () {
    if ($('.message_box') && messageInfo){
        messageInfo.init();
    }
/*    if ($('.btn_option') && optionControll){
         optionControll.init();
    }*/
    if ($('.btn_search') && searchControll){
        searchControll.init();
    }

    $('.content').scroll(function() {
        // var heightGap = $(document).height() - $('.content').height();
        var heightGap = $('.content').children().height() - $(document).height();
        if ((heightGap - $('.content').scrollTop() ) <= 101 && $('.bottom_box').css('display') != 'none') {
            $('.bottom_box').css('display', 'none');
        }

        if ((heightGap - $('.content').scrollTop()) > 101 && $('.bottom_box').css('display') == 'none') {
            $('.bottom_box').css('display', 'block');
        }
    });

    $('#messageContent').click(function() {
        var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
        if(IS_IOS) {
            // IOS 의 경우 Keyboard Hide 처리
            document.activeElement.blur();
        }
    });

    var _originalSize = $(window).width() + $(window).height();
    $(window).resize(function(){
        if($(window).width() + $(window).height() != _originalSize){
            var heightGap = $('.content').children().height() - $(document).height();
            if ((heightGap - $('.content').scrollTop() ) <= 214) {
                moveToBottomScroll();
            }
        }
    });

    if($('textarea').length) {
        $("textarea").on('keydown keyup', function () {
            if(!$(this).hasClass('textarea_edit')) {
                $(this).height(1).height( $(this).prop('scrollHeight') );
                $('.footer').css('bottom', ($('.message_input').outerHeight(true) - 38) + 'px');
            }


        });
    }


    if($('.content').hasClass('type02')) {
        $('.bottom_box').addClass('type02');
    }

/*    if($(".sticker_btn").length) {
        $(".sticker_btn").on('click', function() {
            var _this = $(this);
            if(_this.hasClass('on')) {
                $('.message_wrap').css('padding-bottom', '');
                $(".sticker_list").css('display', '');
                $(".sticker_box").css('display', 'none');
                _this.removeClass('on');
            } else {
                $('.message_wrap').css('padding-bottom', '210px');
                $(".sticker_list").css('display', 'inline-block');
                _this.addClass('on');
            }
        });
    }*/

    if($('.option_paging').length) {
        optionBoxPaging.init();
    }
    fnSelectbox();
    floating.init();
    try {
        //input 달력 포커스 시 달력폼 노출
        if ( $('.input_calendar').length ) fnCalendalFocus();
    } catch(e) {
        console.log('calendar publishing...');
    }

    $('.coupon_closer').click(function(){
        $(this).parent('.common_tooltip').css('z-index', '0').hide();
    });

    $('.scrollbar-inner').scroll(function() {
        $('.common_tooltip').hide();
    });

    $('.full_layer_pop').each(function() {
        var maxheight = $(window).height() - 100;
        if($(this).find('.tab_area').length) {
            maxheight = maxheight- $(this).find('.tab_area').outerHeight(true);
        }

       $(this).find('.scrollbar-inner').css('max-height', maxheight + 'px');
    });
});

(function($) {
    var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
    var IS_SAFARI = /Version\/[\d\.]+\s(Mobile\/[A-Za-z0-9\.]+\s)?(?=Safari)/.test(navigator.userAgent) && /Chrome\/[\d\.]+\sSafari\/[\d\.]+$/.test(navigator.userAgent);
    var IS_CHROME = ((navigator.userAgent.toLowerCase()).indexOf('chrome') > -1);

    $.fn.nodoubletapzoom = function() {
        if (IS_IOS)
            $(this).bind('touchstart', function preventZoom(e) {
                var t2 = e.timeStamp
                    , t1 = $(this).data('lastTouch') || t2
                    , dt = t2 - t1
                    , fingers = e.originalEvent.touches.length;
                $(this).data('lastTouch', t2);
                if (!dt || dt > 500 || fingers > 1) return; // not double-tap

                e.preventDefault(); // double tap - prevent the zoom
                // also synthesize click events we just swallowed up
                $(this).trigger('click').trigger('click');
            });
    };

    if(IS_IOS || IS_SAFARI) {
        $('body').height(window.innerHeight);
        $('body').css('height', window.innerHeight + 'px');
    }

    if(!IS_IOS && (navigator.userAgent.toLowerCase()).indexOf('chrome') > -1) {
        $('body').css('height', 'calc(100vh - 4em)');
    }

    try {
        if(isApp) {
            $('body').css('height', 'calc(100vh)');
        }
    } catch(e) {

    }


    var appKeywords = ['samsung', 'naver', 'nate'];
    $(appKeywords).each(function(t) {
       if((navigator.userAgent.toLowerCase()).indexOf(appKeywords[t]) > -1) {
           $('body').css('height', 'calc(100vh)');
       }
    });

})(jQuery);

var messageInfo = {
    init : function () {
        this.target = $('.message_box');

        this.target.each(function () {
            if($(this).find('.txt_info')){
                this.parentTarget = $(this).parent();
                this.txtBox = $(this).find('.txt');
                this.infoBox =  $(this).find('.txt_info');
                this.txtBoxWidth =  this.txtBox.outerWidth(true);

                messageInfo.posInfoBox(this.txtBoxWidth, this.infoBox, this.parentTarget);
            }
        })
    },
    posInfoBox : function (txtBoxWidth, infoBox, parentTarget) {
        var parentTarget = parentTarget;
        var txtBoxWidth = txtBoxWidth;
        var infoBox = infoBox;

        if (parentTarget.is('.recipient')){
            infoBox.css({
                             display : 'block',
                             left : (txtBoxWidth + 8) + 'px'
                         })
        }else{
            infoBox.css({
                             display : 'block',
                             right : (txtBoxWidth + 8) + 'px'
                         })
        }

    }
};

var stickerBox = {
    openList: function() {
        $('.floating_main').hide();
        $('.content').css('bottom', '318px');
        $(".sticker_list").css('display', 'inline-block');
        $(".sticker_btn").addClass('on');
        $('.empty_field').addClass('on');
        $('.bottom_box').addClass('on');
    },
    closeList: function() {
        $('.floating_main').css('display', 'inline-block');
        $('.content').css('bottom', '');
        $('.sticker_list > .scrollbar-inner ').scrollTop(0);
        $(".sticker_list").css('display', '');
        $(".sticker_box").css('display', 'none');
        $(".sticker_btn").removeClass('on');
        $('.empty_field').removeClass('on');
        $('.bottom_box').removeClass('on');
    },
    openBox: function() {
        $('.sticker_box').css("display", 'inline-block');
    },
    closeBox: function() {
        $('.sticker_box').hide();
    }
}
/*

var optionControll = {
    init : function () {
        this.target = $('.btn_option');
        this.targetBtn = this.target.find('button');
        this.active = false;

        this.targetBtn.on('click', function () {
            optionControll.clickEvent();
        })
    },
    clickEvent : function () {
        var value = this.active;
        this.target = $('.option_box');

        var optionBox = $('.option_box ul li');
        var target = optionBox.find('div');

        target.css({
            left: '33px',
            width: '48px',
            height: '48px',
            zIndex: '3'
        });

        if (value == false){
            this.targetBtn.addClass('on');
            this.target.show();
            this.active = true;
        }else {
            this.targetBtn.removeClass('on');
            this.target.hide();
            this.active = false;
        }
    },
    changeInactive: function() {
        this.active = false;
    }
};
*/

var searchControll = {
    init : function () {
        this.openButton = $('.header').find('.btn_search');
        this.closeButton = $('.header').find('.btn_close');
        this.defaltHeader = $('.defalt_area');
        this.searchHeader = $('.search_area');

        this.openButton.on('click', function () {
           searchControll.openSearchHeader();
        });
        this.closeButton.on('click', function () {
           searchControll.closeSearchHeader();
        });
    },
    openSearchHeader : function () {
        this.defaltHeader.hide();
        this.searchHeader.show();
        $('.message_foot').hide();
        $('.message_search_controll').show();
        $('.search_area').find('input').focus();
    },
    closeSearchHeader : function () {
        this.defaltHeader.show();
        this.searchHeader.hide();
        $('.message_foot').show();
        $('.message_search_controll').hide();
    }
};

var layerPop = {
    init : function (layerName, op) {
        this.targetLayer = $('.' + layerName);
        this.ovarlay = $('#ovarlay_popup');
        this.dim = '<div class="dim"></div>';
        var op = op;

        if (op == '') {
            layerPop.openLayer();
        }else if (op == 'full') {
            layerPop.openFullLayer();
        }else {
            return false;
        }
    },
    openLayer : function () {
        var top = ( $(window).height() - this.targetLayer.height()) / 2;
        var calcTop = 'calc(50% - '+(this.targetLayer.height()/2)+'px)';
        if(top > 0) {
            this.targetLayer.css({'top' : calcTop + ''});
        } else {
            this.targetLayer.css({'top' : '0px'});
            // this.targetLayer.css({'top' : '20%'});
        }

        $('body').append(this.dim);
        $('html, body').css('overflow-y', 'hidden');
        this.targetLayer.show();
    },
    closeLayer : function (target) {
        var target = $('.' + target);
        $('.dim').remove();
        $('html, body').css('overflow-y', 'auto');
        target.hide();
    },
    openFullLayer : function () {
/*        $('.header').hide();
        $('.content').hide();
        $('.footer').hide();*/
        this.ovarlay.show();
        this.targetLayer.show();
    },
    closeFullLayer : function (target) {
        $('.floating_main').css('display', 'inline-block');
        $('.common_tooltip ').hide();

        var target = $('.' + target);
/*        $('.header').show();
        $('.content').show();
        $('.footer').show();*/
        $('#ovarlay_popup').hide();
        target.hide();
    }
}

var floating = {
    init: function() {
        if($('.floating_main').length) {
            var floating = $('.floating_main');
            var inform = floating.html();
            if($.trim(inform) == '') {
                floating.addClass('hide');
                $('.bottom_box').addClass('type03');
            }
        }

    }
}

function scrollToTarget(targetId, isNew) {
    try {
        var targetTop = $('#' + targetId).position().top + 50;
        if(isNew) {
            $('.content').scrollTop(targetTop + 50);
        } else {
            $('.content').scrollTop(targetTop);
        }
    } catch(e) {
        console.log('targetid not found, ' + targetId);
    }
}

// 타겟ID, Bounce 횟수, Bounce 높이, Bounce 주기
function bounceMessage(targetId, times, distance, speed) {
    for(i = 0; i < times; i++) {
        $('#'+targetId).animate({top: '-='+distance + 'px'},speed)
            .animate({top: '+='+ distance + 'px'},speed);
    }
}

function toggleLayer(layer, isLast) {
    var target = $(layer).next();
    var height =$(layer).outerHeight(true);
        $('.common_tooltip').hide();
    if(target.css('display') == 'none') {
        $('.option_input_box.border_b').each(function(t) {
            $(this).css('display', 'none');
        });

        target.slideDown("slow", function() {
        });

        var index = $(layer).index() / 2;
        var sumHeight = 0;
        $('.full_layer_pop:visible').find('.com_pad02 ').each(function(t) {
            console.log($(this).index());
            if(t > index - 1) {
                return false;
            }
            sumHeight += $(this).outerHeight(true);
        });

        //$('.scrollbar-inner').scrollTop(sumHeight);
        $('.scrollbar-inner').animate({
            scrollTop: sumHeight
        }, 500);

    } else {
        target.slideUp('slow');
    }
}

function toggleLastLayer() {
/*    setTimeout(function() {
        console.log($(".scrollbar-inner").outerHeight(true));
        $('.scrollbar-inner').scrollTop(99999);
    }, 1000);*/

}

function toggleMessage(_this) {
    var target = $(_this).parent();
    if(target.hasClass('full')) {
        target.removeClass('full');
    } else {
        target.addClass("full");
    }
}

function moveToBottomScroll() {
    $('.content').scrollTop($('.message_wrap').height());

    if($('.recent_box').css('display') != 'none') {
        $('.recent_box').css('display', 'none');
    }

    if($('.bottom_box').css('display') != 'none') {
        $('.bottom_box').css('display', 'none');
    }
}

function inViewport(targetId) {
    var $ele = $('#'+targetId);
    if($ele) {
        var lBound = $('.content').scrollTop(),
            uBound = lBound + $(window).height(),
            top = $ele[0].offsetTop,
            bottom = top + $ele.outerHeight(true);

        return (top > lBound && top < uBound)
            || (bottom > lBound && bottom < uBound)
            || (lBound >= top && lBound <= bottom)
            || (uBound >= top && uBound <= bottom);
    } else {
        return false;
    }
}

function closeOptionControl() {

    var target = $('.option_box');
    var targetBtn = $('.btn_option').find('button');

    targetBtn.removeClass('on');
    target.hide();
    // optionControll.changeInactive();
    resetMessageInput();
}

function resetMessageInput() {
    $('textarea').css('height', 'auto');
    $('.footer').css('bottom', '8px');
}

function setSticker(target) {
    var src = $(target).children('img').attr('src');
    $('.sticker_box img').attr('src', src);
    $('.sticker_box').css("display", 'inline-block');
}


function fnSelectbox() {
    $('body').on('change', '.selectbox select', function () {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
    });
}

function fnCalendalFocus() {
    var datepicker = $('.input_calendar');
    var minDate;
    datepicker.prop('readOnly', true);
    if(datepicker.hasClass('only_after')) {
        minDate = new Date();
    } else {
        minDate = new Date(1970, 0, 1, 0, 0, 0);
    }

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
    });

    datepicker.datepicker({
        minDate: minDate,
        onClose: function(e) {
            var date = new Date(datepicker.datepicker({ dateFormat: 'yy-mm-dd' }).val()),
                week = new Array('일', '월', '화', '수', '목', '금', '토');
            if (week[date.getDay()]!= undefined) {
                datepicker.val(datepicker.val() + ' (' + week[date.getDay()] + ')');
            }
        }
    });
}

function setToggle(_this) {
    var target = $(_this);
    if(target.hasClass('on')) {
        target.removeClass("on");
    } else {
        target.addClass("on");
    }
}


function dataToolTip_nonPosition(obj) {
    var offset = $(obj).offset();
    var myWidth = $(obj).width();
    var myHeight = $(obj).height();
    var targetId = $(obj).attr('data-tooltip');
    var targetWidth = $(obj).attr('data-tooltip-width');
    var toolHeight = $('#'+ targetId).innerHeight();
    var PosX = offset.left - (targetWidth / 2 - myWidth / 2);
    var PosY = offset.top + myHeight - 110 ;
    $('.common_tooltip').css('z-index', '0').hide();

    $('#' + targetId).css({
        'width': targetWidth,
        'z-index': '199'
    }).show();
}

function dataToolTip (obj) {

    var offset = $(obj).offset();
    var myWidth = $(obj).width();
    var myHeight = $(obj).height();
    var targetId = $(obj).attr('data-tooltip');
    var targetWidth = $(obj).attr('data-tooltip-width');
    var toolHeight = $('#'+ targetId).innerHeight();
    var PosX = offset.left - (targetWidth / 2 - myWidth / 2);
    var PosY = offset.top + myHeight + 10 ;
    $('.common_tooltip').css('z-index', '0').hide();

    $('#' + targetId).css({
        'width': targetWidth,
        'top':PosY+ 'px',
        'left': PosX + 'px',
        'position': 'absolute',
        'z-index': '1199'
    }).show();

    if (PosX < 0) {
        $('#' + targetId).css('left', '10px');
        $('#' + targetId + ' .tooltip_arr').css('left', offset.left - 5);
    } else {
        $('#' + targetId + ' .tooltip_arr').css('left', '50%');
    }
}

function dataToolTip_reverse (obj) {

    var offset = $(obj).offset();
    var myWidth =  $(obj).width();
    var myHeight =  $(obj).height();
    var targetId = $(obj).attr('data-tooltip');
    var targetWidth = $(obj).attr('data-tooltip-width');
    var toolHeight = $('#'+ targetId).innerHeight();
    var PosX = offset.left - (targetWidth/2 - myWidth/2);
    var PosY = offset.top + myHeight - 110;
    $('.common_tooltip').css('z-index', '0').hide();

    $('#'+ targetId).css({
        'width' : targetWidth,
        'top'       : PosY -(toolHeight + myHeight) + 'px',
        'left'      : PosX + 'px',
        'position'   : 'absolute',
        'z-index'   : '199'
    }).addClass('reverse').show()
    if (PosX < 0) {
        $('#' + targetId).css('left', '0px');
        $('#' + targetId + ' .tooltip_arr').css({
            'left': offset.left + 5,
            'top': toolHeight -1 + 'px'
        });
    }else{
        $('#' + targetId + ' .tooltip_arr').css({
            'left': '50%',
            'top': toolHeight -1 + 'px'
        });
    }
}

var UTIL = {
    comma: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}