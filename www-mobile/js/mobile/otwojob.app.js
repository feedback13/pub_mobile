/*
 * Copyright (c) 2017. (주)사람인HR.
 * All rights reserved.
 */

/**
 * app
 * @dependencies :
 jquery
 otwojob.vendor.js
 otwojob.util.js
 *
 */

(function($) {

    /**
     * allMenu
     *
     */
    OTWOJOB.allMenu = function() {

        var wrap = $('.all_menu')
            , openTrigger = $('.gnb_opener')
            , menuContainer = wrap.find('.menu_container')
            , dimmLayer = wrap.find('.dimm_layer')
            , closer = wrap.find('.all_closer')
            , scroller = wrap.find('.scroller_wrap');

        _createScroll();
        _close();
        _open();

        function _createScroll() {

            wrap.show();
            /*scroller.mCustomScrollbar({
                scrollInertia : 500
                , theme:"dark"
            });*/
            wrap.hide();

        }

        function _open() {

            TweenMax.set(menuContainer, { x : '-100%' });

            openTrigger.hammer({ preventDefault : true }).on({
                click : function() {
                    wrap.show();
                    $('html, body').addClass('block');
                    dimmLayer.fadeIn(250);
                    TweenMax.to(menuContainer, 0.3, { x : '0%', ease : Power2.easeOut });
                }
            });
        }

        function _close() {
            closer.hammer({ preventDefault : true }).on({
                click : _closeMotion
            });

            dimmLayer.hammer({ preventDefault : true }).on({
                click : _closeMotion
            });
        }

        function _closeMotion() {
            TweenMax.to(menuContainer, 0.3, { x : '-100%', ease : Power2.easeOut, onComplete : function() {
                    wrap.hide();
                    $('html, body').removeClass('block');
                }});
            dimmLayer.fadeOut(250);
        }
    }

    /**
     * list01
     *
     */
    OTWOJOB.list01 = function() {

        var list = $('.list01');
        var wrap = $('.detail_search_layer')
            , menuContainer = wrap.find('.menu_container')
            , dimmLayer = wrap.find('.dimm_layer');

        _list();

        function _list() {

            list.each(function() {
                var liElem = $(this).children().children('li');

                liElem.each(function(i) {
                    var _this = $(this)
                        , trigger = $(this).children('a')
                        , ul = $(this).children('ul')

                    _this.attr('data-side', ((i%2) == 0) ? false : true);
                    if ( _this.hasClass('full_width') ) _this.attr('data-side','true');

                    if ( ul.length ) {
                        trigger.hammer({ preventDefault : true }).on({
                            click : function() {
                                _removeList();
                                if ( _this.hasClass('on') ) {
                                    _this.removeClass('on');
                                } else {
                                    _createList(_this, ul, _this.attr('data-side'));
                                    liElem.removeClass('on');
                                    _this.addClass('on');
                                }
                            }
                        });
                        trigger.on({
                            click : function() {
                                return false;
                            }
                        });
                    }
                });
            });
        }

        function _createList(parent, elem, side) {
            var newList = $('<li class="sub_menu"><ul></ul></li>');
            var closer = newList.find('ul li');

            newList.find('ul').html(elem.html());

            if ( side == 'true' ) {
                newList.insertAfter(parent);
            } else {
                newList.insertAfter(parent.next());
            }

            newList.show(0, function() {
            });

            newList.find('ul li').click(function(){
                TweenMax.to(menuContainer, 0.3, { x : '100%', ease : Power2.easeOut, onComplete : function() {
                        wrap.hide();
                        $('html, body').removeClass('block');
                    }});
                dimmLayer.fadeOut(250);
                _removeList();
                list.children().children('li').removeClass('on');
            });
        }

        function _removeList() {
            list.find('.sub_menu').hide(0, function() {
                list.find('.sub_menu').remove();
            });
        }
    }

    /**
     * detailSearchLayer
     *
     */
    OTWOJOB.detailSearchLayer = function() {

        var wrap = $('.detail_search_layer')
            , openTrigger = $('.detail_search_opener')
            , menuContainer = wrap.find('.menu_container')
            , titTrigger = wrap.find('.in_tit a')
            , dimmLayer = wrap.find('.dimm_layer')
            , closer = wrap.find('.all_closer')
            , scroller = wrap.find('.scroller_wrap');

        _createScroll();
        _close();
        _open();
        _titToggle();

        function _titToggle() {
            titTrigger.each(function() {
                var titCont = wrap.find('.list01');

                $(this).hammer({ preventDefault : true }).on({
                    click : function() { /* OTWOJOB-650 */
                        if ( $(this).hasClass('on') ) {
                            titCont.show();
                            $(this).removeClass('on');
                        } else {
                            titCont.hide();
                            $(this).addClass('on');
                        }
                    }
                });
            });
        }

        function _createScroll() {

            wrap.show();
            /*scroller.mCustomScrollbar({
                scrollInertia : 500
                , theme:"dark"
            });*/
            wrap.hide();

        }

        function _open() {

            TweenMax.set(menuContainer, { x : '100%' });

            openTrigger.hammer({ preventDefault : true }).on({
                click : function() { /* OTWOJOB-650 */
                    wrap.show();
                    $('html, body').addClass('block');
                    dimmLayer.fadeIn(250);
                    TweenMax.to(menuContainer, 0.3, { x : '0%', ease : Power2.easeOut });
                }
            });
        }

        function _close() {
            closer.hammer({ preventDefault : true }).on({
                click : _closeMotion /* OTWOJOB-650 */
            });

            dimmLayer.hammer({ preventDefault : true }).on({
                click : _closeMotion /* OTWOJOB-650 */
            });
        }

        function _closeMotion() {
            TweenMax.to(menuContainer, 0.3, { x : '100%', ease : Power2.easeOut, onComplete : function() {
                    wrap.hide();
                    $('html, body').removeClass('block');
                }});
            dimmLayer.fadeOut(250);
        }

    }

    /**
     * globalSearch
     *
     */
    OTWOJOB.globalSearch = function() {

        var wrap = $('.gnb')
            , searchWrap = $('.search_wrap')
            , searchTrigger = $('.search_opener');

        _searchControl();

        function _searchControl() {
            searchTrigger.hammer({ prevenDefault : true }).on({
                click : function() { /* OTWOJOB-650 */
                    if ( searchWrap.is(':hidden') ) {
                        searchWrap.slideDown(150, function() {
                            if ( $('.gnb').length ) OTWOJOB.gnbCurrentTop = $('.gnb').offset().top;
                        });
                    } else {
                        searchWrap.slideUp(150, function() {
                            if ( $('.gnb').length ) OTWOJOB.gnbCurrentTop = $('.gnb').offset().top
                        });
                    }
                }
            });
        }

    }

    /**
     * search_bar
     *
     */
    OTWOJOB.search_bar = function() {

        OTWOJOB.gnbCurrentTop = $('.search_bar').length ? $('.search_bar').offset().top : null;

        var wrap = $('.search_bar')
            , content = $('.content')
            , scrollTop = $(window).scrollTop()
            , scroller = null;

        _scroll();

        function _scroll() {
            $(window).on({
                'scroll.header' : function() {
                    scrollTop = $(window).scrollTop();
                    //_setGnbFix();
                }
            });
        }

        function _setGnbFix() {

            if ( scrollTop >= OTWOJOB.gnbCurrentTop ) {
                if ( !wrap.hasClass('fixed') ) {
                    wrap.addClass('fixed');
                    wrap.css({
                        position: 'relative'
                        , left : 0
                        , right : 0
                        , top : 0
                        , display : 'none'
                    });
                    content.css('margin-top','50px');
                }
            } else {
                if ( wrap.hasClass('fixed') ) {
                    wrap.removeClass('fixed');
                    wrap.css({
                        position: 'relative'
                        , display : 'block'
                    });
                    content.css('margin-top','0px');
                }
            }
        }

    }

    /**
     * gnb
     *
     */
    OTWOJOB.gnb = function() {

        OTWOJOB.gnbCurrentTop = $('.gnb').length ? $('.gnb').offset().top : null;

        var wrap = $('.gnb')
            , trigger = wrap.find('.opener')
            , content = $('.content')
            , container = wrap.children('div')
            , scrollTop = $(window).scrollTop()
            , scroller = null;

        _createScroll();
        _open();
        _scroll();

        function _scroll() {
            $(window).on({
                'scroll.gnb' : function() {
                    scrollTop = $(window).scrollTop();
                    _setGnbFix();
                }
            });
        }

        function _setGnbFix() {

            if ( scrollTop > OTWOJOB.gnbCurrentTop ) {
                if ( !wrap.hasClass('fixed') ) {
                    wrap.addClass('fixed');
                    wrap.css({
                        position: 'fixed'
                        , left : 0
                        , right : 0
                        , top : 0
                    });
                    content.css('margin-top','50px');
                }
            } else {
                if ( wrap.hasClass('fixed') ) {
                    wrap.removeClass('fixed');
                    wrap.css({
                        position: 'relative'
                    });
                    content.css('margin-top','0');
                }
            }
        }

        function _open() {

            trigger.hammer({ preventDefault : true }).on({
                click : function() { /* OTWOJOB-650 */
                    if ( container.hasClass('list') ) {
                        container.removeClass('list').addClass('open_menu');
                        trigger.addClass('on');
                        _destroyScroll();
                    } else {
                        container.removeClass('open_menu').addClass('list');
                        trigger.removeClass('on');
                        _createScroll();
                    }
                }
            });
        }

        function _createScroll() {

            var listWidth = 0;
            if(wrap.find('.t_gnb').length) {
                return;
            }
            wrap.find('.list').find('li').each(function() {
                var w = $(this).find('a').width()+15;
                if(wrap.find('.t_gnb').length < 1) {
                    $(this).width(w);
                }
                listWidth += $(this).width() + 10;
            });
            wrap.find('.list').find('ul').width(listWidth+20);

            wrap.find('.list .in_wrap').mCustomScrollbar({
                axis : 'x'
            });

            wrap.find('.list').find('a').each(function(i) {
                var elem = $(this).parent().prev().length ? $(this).parent().prev() : $(this).parent()
                    , thisId = '#' + elem.attr('id');

                if ( $(this).hasClass('on') ) {
                    wrap.find('.list .in_wrap').mCustomScrollbar('scrollTo', thisId, {
                        scrollInertia: 0
                    });
                }

                $(this).hammer({ preventDefault : true }).on({
                    'tap.move' : function() {

                        wrap.find('.list').find('a').removeClass('on');
                        $(this).addClass('on');

                        wrap.find('.list .in_wrap').mCustomScrollbar('scrollTo', thisId, {
                            scrollInertia: 400
                        });
                    }
                });
            });
        }

        function _destroyScroll() {
            wrap.find('.open_menu .in_wrap').mCustomScrollbar('destroy');
            wrap.find('.open_menu .in_wrap').removeAttr('style');
            wrap.find('.open_menu .mCSB_container').removeAttr('style');
            wrap.find('.open_menu ul').removeAttr('style');
            wrap.find('.open_menu li').removeAttr('style');
            wrap.find('.open_menu').find('a').each(function() {
                $(this).hammer().off('tap.move');
                $(this).hammer({ preventDefault : true }).on({
                    'tap.move' : function() {
                        wrap.find('.open_menu').find('a').removeClass('on');
                        $(this).addClass('on');
                    }
                });
            });
        }
    }

    /**
     * orderjob gnb
     *
     */
    OTWOJOB.orderjobgnb = function() {

        OTWOJOB.gnbCurrentTop = $('.gnb.orderjob').length ? $('.gnb.orderjob').offset().top : null;

        var wrap = $('.gnb.orderjob')
            , trigger = wrap.find('.opener')
            , content = $('.content')
            , container = wrap.children('div')
            , scrollTop = $(window).scrollTop()
            , scroller = null;

        _createScroll();
        _open();
        //_scroll();

        function _scroll() {
            $(window).on({
                'scroll.gnb' : function() {
                    scrollTop = $(window).scrollTop();
                    _setGnbFix();
                }
            });
        }

        function _setGnbFix() {

            if ( scrollTop > OTWOJOB.gnbCurrentTop ) {
                if ( !wrap.hasClass('fixed') ) {
                    wrap.addClass('fixed');
                    wrap.css({
                        position: 'fixed'
                        , left : 0
                        , right : 0
                        , top : 0
                    });
                    //content.css('margin-top','50px');
                }
            } else {
                if ( wrap.hasClass('fixed') ) {
                    wrap.removeClass('fixed');
                    wrap.css({
                        position: 'relative'
                    });
                    // content.css('margin-top','0');
                }
            }
        }

        function _open() {

            trigger.hammer({ preventDefault : true }).on({
                click : function() { /* OTWOJOB-650 */
                    if ( container.hasClass('list') ) {
                        container.removeClass('list').addClass('open_menu');
                        trigger.addClass('on');
                        _destroyScroll();
                    } else {
                        container.removeClass('open_menu').addClass('list');
                        trigger.removeClass('on');
                        _createScroll();
                    }
                }
            });
        }

        function _createScroll() {

            var listWidth = 0;
            if(wrap.length && !wrap.hasClass('changed')) {
                wrap.find('.list').find('li').each(function() {
                    var w = $(this).find('a').width()+15;
                    /*if(wrap.find('.t_gnb').length < 1) {
                        $(this).width(w);
                    }*/
                    listWidth += $(this).width();
                });
                //
                if(wrap.find('.t_gnb').length < 1) {
                    wrap.find('.list').find('ul').width(listWidth+10);
                    wrap.addClass('changed');
                }

                wrap.find('.list .in_wrap').mCustomScrollbar({
                    axis : 'x'
                });

                wrap.find('.list').find('a').each(function(i) {
                    var elem = $(this).parent().prev().length ? $(this).parent().prev() : $(this).parent()
                        , thisId = '#' + elem.attr('id');

                    if ( $(this).hasClass('on') ) {
                        wrap.find('.list .in_wrap').mCustomScrollbar('scrollTo', thisId, {
                            scrollInertia: 0
                        });
                    }

                    $(this).hammer({ preventDefault : true }).on({
                        'tap.move' : function() {

                            wrap.find('.list').find('a').removeClass('on');
                            $(this).addClass('on');

                            wrap.find('.list .in_wrap').mCustomScrollbar('scrollTo', thisId, {
                                scrollInertia: 400
                            });
                        }
                    });
                });
            }
        }

        function _destroyScroll() {
            wrap.find('.open_menu .in_wrap').mCustomScrollbar('destroy');
            wrap.find('.open_menu .in_wrap').removeAttr('style');
            wrap.find('.open_menu .mCSB_container').removeAttr('style');
            wrap.find('.open_menu ul').removeAttr('style');
            wrap.find('.open_menu li').removeAttr('style');
            wrap.find('.open_menu').find('a').each(function() {
                $(this).hammer().off('tap.move');
                $(this).hammer({ preventDefault : true }).on({
                    'tap.move' : function() {
                        wrap.find('.open_menu').find('a').removeClass('on');
                        $(this).addClass('on');
                    }
                });
            });
        }
    }

    /**
     * title_bar
     *
     */
    OTWOJOB.title_bar = function() {

        OTWOJOB.gnbCurrentTop = $('.title_bar').length ? $('.title_bar').offset().top : null;

        var wrap = $('.title_bar')
            , content = $('.content')
            , sub_header = $('.sub_header')
            , trigger = wrap.find('.opener')
            , container = wrap.children('div')
            , scrollTop = $(window).scrollTop()
            , scroller = null;

        _scroll();

        function _scroll() {
            $(window).on({
                'scroll.header' : function() {
                    scrollTop = $(window).scrollTop();
                    _setGnbFix();
                }
            });
        }

        function _setGnbFix() {

            if ( scrollTop > OTWOJOB.gnbCurrentTop ) {
                if ( !wrap.hasClass('fixed') ) {
                    wrap.addClass('fixed');
                    wrap.css({
                        position: 'fixed'
                        , left : 0
                        , right : 0
                        , top : 0
                    });
                    content.css('margin-top','50px');
                    if($('.review_total_user').length > 0) {
                        $('.review_total_user').css({position:"fixed",left:0,top:"50px",'z-index':190})
                    }
                }
            } else {
                if ( wrap.hasClass('fixed') ) {
                    wrap.removeClass('fixed');
                    wrap.css({
                        position: 'relative'
                    });
                    if($('.review_total_user').length > 0) {
                        $('.review_total_user').css({position:"relative",left:0,top:0,'z-index':'inherit'})
                    }
                    content.css('margin-top','0');
                }
            }
        }

    }

    /**
     * asideMenu
     *
     */
    OTWOJOB.asideMenu = function() {

        var wrap = $('.aside_menu')
            , btn_top = $('.btn_top')
            , footer = $('.footer')
            , lastScrollTop = $(window).scrollTop();

        scrollEvent();

        function scrollEvent() {
            var st = $(window).scrollTop();
            // if (st > lastScrollTop || st == 0 ){
            // 	wrap.hide();
            // } else {
            // 	wrap.show();

            // }
            // lastScrollTop = st;
            wrap.show();
        }

        $(window).on({
            'scroll.asideMenu' : scrollEvent
        });

        $('.btn_top').on('click', function(){
            $(window).scrollTop(0);
        });
    }

    /**
     * indexSlider
     *
     */
    OTWOJOB.indexSlider = function() {

        var slider = $('.index_slider .flexSlider')
            , indicator = $('.index_slider .indicator button');

        if(slider.find('.slide').length > 1) {
            slider.flexSlider({
                autoSlideTimer : 4000,
                autoSlide : true,
                snapToChildren: true,
                desktopClickDrag: true,
                infiniteSlider : true,
                keyboardControls: false,
                //navPrevSelector : btnPrev,
                //navNextSelector : btnNext
                navSlideSelector : indicator,
                onSlideChange: slideChange,
                onSlideComplete : slideComplete
            });

            slider.find('i').remove();
        }


        function slideChange(args) {
            indicator.removeClass('on');
            indicator.eq(args.currentSlideNumber - 1).addClass('on');
        }

        function slideComplete() {
        }
    }

    /**
     * indexSlider2
     *
     */
    OTWOJOB.indexSlider2 = function() {

        var slider = $('.index_slider02 .flexSlider')
            , slide = $('.index_slider02 .slide')
            , indicator = $('.index_slider02 .indicator button');

        slider.flexSlider({
            autoSlideTimer : 4000,
            autoSlide : true,
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider : true,
            keyboardControls: false,
            //navPrevSelector : btnPrev,
            //navNextSelector : btnNext
            navSlideSelector : indicator,
            onSlideChange: slideChange,
            onSliderLoaded : sliderLoad,
            onSlideComplete : slideComplete
        });

        slider.find('i').remove();

        slideTxtBoxHeight();

        function slideTxtBoxHeight() {
            slide.each(function() {
                $(this).find('.table_wrap').height(slide.eq(0).height() - slide.eq(0).find('img').height());
            });
        }

        function sliderLoad() {
        }

        function slideChange(args) {
            indicator.removeClass('on');
            indicator.eq(args.currentSlideNumber - 1).addClass('on');
        }

        function slideComplete() {
        }
    }

    /**
     * indexSlider3
     *
     */
    OTWOJOB.indexSlider3 = function() {

        var wrap = $('.index_slider_plus')
            , slider = wrap.find('.flexSlider')
            , slide = slider.find('.slide')
            , in_wrap = slider.find('.in_wrap')
            , btnPrev = wrap.find('.ctrl_btn.prev')
            , btnNext = wrap.find('.ctrl_btn.next');

        wrap.height((in_wrap.height() *2) + 31);
        $(window).on({
            'resize.itemSlider01' : function() {
                wrap.removeAttr('style');
                wrap.height((in_wrap.height() *2) + 31);
            }
        });

        slider.flexSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider : true,
            keyboardControls: false,
            navPrevSelector : btnPrev,
            navNextSelector : btnNext,
            //navSlideSelector : indicator,
            onSlideChange: slideChange,
            onSlideComplete : slideComplete
        });

        slider.find('i').remove();

        function slideChange(args) {
        }

        function slideComplete() {
        }

    }

    /**
     * listType2
     *
     */
    OTWOJOB.listType2 = function() {

        $('body').on('click', '.more button', function() {
            var $item = $(this).closest('.item');

            $item.toggleClass('on');
        });

    }

    /**
     * listType2
     *
     */
    OTWOJOB.msgEvent = function() {

        $('body').on('click', '.msg_system_box .sys_inner .btn_event', function() {

            $(this).parents('.sys_inner').toggleClass('on');
        });

    }

    /**
     * tabType1
     *
     */
    OTWOJOB.tabType1 = function() {

        var tabBtn = $('.tab_btn')
            , trigger = tabBtn.find('a')
            , tabCont = $(".tab_content");

        trigger.each(function(i) {
            var target = $($(this).attr('href'));
            // var target = $($(this).attr('data-href')); 이걸로 수정하시면 되요

            $(this).on({
                click : function() {
                    $(this).addClass("on");
                    trigger.not($(this)).removeClass("on");
                    tabCont.not(target).hide();
                    $(target).show();
                }
            });
        });
    }
    OTWOJOB.tabType1_1 = function() {

        var tabBtn = $('.tab_btn02')
            , trigger = tabBtn.find('a')
            , tabCont = $(".tab_content");

        trigger.each(function(i) {
            var target = $($(this).attr('href'));
            // var target = $($(this).attr('data-href')); 이걸로 수정하시면 되요

            $(this).on({
                click : function() {
                    $(this).addClass("on");
                    trigger.not($(this)).removeClass("on");
                    /*tabCont.not(target).hide();
                    $(target).show();*/
                }
            });
        });
    }

    /**
     * tabType2
     *
     */
    OTWOJOB.tabType2 = function() {

        var tabBtn = $('.tab_btn')
            , trigger = tabBtn.find('button')
            , tabCont = $(".tab_content");

        trigger.each(function(i) {
            var target = $($(this).attr('data-href'));

            $(this).on({
                click : function() {
                    $(this).addClass("on");
                    trigger.not($(this)).removeClass("on");
                    tabCont.not(target).hide();
                    $(target).show();
                }
            });
        });
    }

    /**
     * keyboardTab
     *
     */
    OTWOJOB.keyboardTab = function() {

        $("body").on("click", ".keyboard_tab .key_tab button", function(){
            var idx = $(".keyboard_tab .key_tab button").index($(this));
            $(".keyboard_tab .key_tab button").each(function(index){
                if(idx == index){
                    if(!$(this).hasClass("on")){
                        $(this).addClass("on");
                        $(".keyboard_img").find("p").eq(index).addClass("on");
                    }else{
                        $(this).removeClass("on");
                        $(".keyboard_img").find("p").eq(index).removeClass("on");
                    }
                }else{
                    if($(this).hasClass("on")){
                        $(this).removeClass("on");
                        $(".keyboard_img").find("p").eq(index).removeClass("on");
                    }
                    $(this).removeClass("on");
                    $(".keyboard_img").find("p").eq(index).removeClass("on");
                }
            });
        });
    }

    /**
     * footerInfos
     *
     */
    OTWOJOB.footerInfos = function() {
        $('.tab1, .tab2, .tab3').each(function() {
            var _this = $(this);
            var infosBtn = _this.find('.more_infos')
                , infosCont = _this.find('.infos_txt');

            infosBtn.each(function() {
                $(this).on({
                    click : function() {
                        if (!$(this).hasClass('on')) {
                            infosCont.show();
                            $(this).addClass('on');
                        } else {
                            infosCont.hide();
                            $(this).removeClass('on');
                        }
                    }
                });
            });
        });

    }

    /**
     * buttonToggler
     *
     */
    OTWOJOB.buttonToggler = function() {

        var trigger = $('.fn_toggle');

        trigger.each(function() {
            $(this).hammer({ preventDefault : true }).on({
                click : function() {
                    if ( $(this).hasClass('on') ) {
                        $(this).removeClass('on');
                        $(this).find('.off').show();
                        $(this).find('.on').hide();
                    } else {
                        $(this).addClass('on');
                        $(this).find('.off').hide();
                        $(this).find('.on').show();
                    }
                }
            });
        });
    }

    /**
     * horizonScroller1
     *
     */
    OTWOJOB.horizonScroller1 = function() {

        var wraps = $('.horizon_scroller01');
        wraps.each(function() {
            var wrap = $(this);
            var inner = wrap.find('.scroll_inner')
                , innerWidth = 0;

            inner.find('.item').each(function() {
                innerWidth += $(this).outerWidth(true);
            });

            inner.width(innerWidth+10);

            wrap.mCustomScrollbar({
                scrollInertia : 500
                , theme: 'dark'
                , axis : 'x'
            });
        })
    }

    OTWOJOB.horizonScroller2 = function() {

        var wrap = $('.horizon_scroller02')
            , inner = wrap.find('.scroll_inner')
            , innerWidth = 0;

        inner.find('.item').each(function() {
            innerWidth += $(this).outerWidth(true);
        });

        inner.width(innerWidth+10);

        wrap.mCustomScrollbar({
            scrollInertia : 500
            , theme: 'dark'
            , axis : 'x'
        });
    }

    OTWOJOB.horizonScroller3 = function() {

        var wrap = $('.horizon_scroller03')
            , inner = wrap.find('.scroll_inner')
            , innerWidth = 0;

        inner.find('.item').each(function() {
            innerWidth += $(this).outerWidth(true);
        });

        inner.width(innerWidth+10);

        wrap.mCustomScrollbar({
            scrollInertia : 500
            , theme: 'dark'
            , axis : 'x'
        });
    }

    OTWOJOB.horizonScroller4 = function() {
        var swiper = new Swiper('.swiper-container1', {
            slidesPerView: 'auto',
            freeMode: true,
            setWrapperSize: true,
            centeredSlides: false,
            spaceBetween: 0
        });
    }

    OTWOJOB.horizonScroller5 = function() {
        var swiper = new Swiper('.swiper-container2', {
            slidesPerView: 'auto',
            freeMode: true,
            setWrapperSize: true,
            centeredSlides: false,
            loop: false
            //initialSlide: 1*/
        });
    }

    OTWOJOB.horizonScroller6 = function() {
        var swiper = new Swiper('.swiper-container3', {
            slidesPerView: 'auto',
            freeMode: true,
            setWrapperSize: true,
            centeredSlides: false,
            loop: false
            //initialSlide: 1*/
        });
    }

    /**
     * fixedTooltip
     *
     */
    OTWOJOB.fixedTooltip = function() {

        var trigger = $('[data-ftooltip]')
            , tooltipHTML = '<div class="tool_tip01"><span class="arrow"></span><p class="msg"></p><button type="button" class="closer">닫기</button></div>';

        trigger.each(function() {
            var _this = $(this)
                , msg = _this.attr('data-ftooltip')
                , tooltip = $(tooltipHTML);

            tooltip.appendTo('body');
            tooltip.find('.msg').html(msg);

            var left = _this.offset().left + (_this.width()/2)
                , top = _this.offset().top + _this.outerHeight(true);

            tooltip.css({
                left : left
                , top : top
            });

            if ( left + tooltip.outerWidth(true) >= $(window).width() ) {
                tooltip.width(tooltip.outerWidth(true) - 20);
            }

            tooltip.find('.closer').hammer({ preventDefault : true }).on({
                click : function() {
                    tooltip.hide();
                }
            });
        });

    }

    /**
     * orderLayer
     *
     */
    OTWOJOB.orderLayer = function() {

        var trigger = $('.fn_order_trigger')
            , dimm = $('<div class="order_dimm"></div>')
            , orderLayer = $('.order_option_wrap')
            , currentTop = 0;

        dimm.appendTo('body');

        trigger.each(function() {
            var target = $($(this).attr('data-target'));

            $(this).hammer({ preventDefault : true }).on({
                click : function() {

                    currentTop = $(window).scrollTop();

                    // dimm.show();

                    var targetTop = $('.d_tit').offset().top - 60;
                    if($('.hotdeal_countdown').length) {
                        targetTop = $('.hotdeal_countdown').offset().top - 60;
                    }

                    $('html, body').animate({
                        scrollTop : targetTop
                    }, {
                        duration: 250,
                        complete: function() {
                            target.show();
                        }
                    });

                    /*$('.order_dimm').css('position', 'fixed');
					$('.header').each(function() {
						$(this).css("z-index", 999);
					});*/

                    // target.show();

                    $('.fn_order.fixed').hide();
                }
            });
        });

        orderLayer.each(function() {
            var _this = $(this)
                , closer = _this.find('.closer')
                , cancel = _this.find('.cancel');

            closer.hammer({ preventDefault : true }).on({
                click : function() {
                    _closeLayer(_this);
                }
            });

            cancel.hammer({ preventDefault : true }).on({
                click : function() {
                    _closeLayer(_this);
                }
            });
        });

        function _closeLayer(obj) {
            obj.hide();
            dimm.hide();

            $('.select_options').removeClass('on');

            $('html, body').animate({
                scrollTop : currentTop
            }, 250);
            /*$('.header').each(function() {
                $(this).css("z-index", '');
            });*/

            // $('.order_dimm').css('position', '');

            $('.fn_order.fixed').show();
        }
    }

    /**
     * transferCharge
     *
     */
    OTWOJOB.transferCharge = function() {

        var wrap = $('.transfer_charge');
        wrap.each(function() {
            var trigger = $(this).find('input[type=checkbox]')
            var inputText = $(this).find('input[type=text]');
            var field = $(this);

            trigger.on({
                change : function() {
                    if ( $(this).is(':checked') ) {
                        // field.addClass('disabled');
                        inputText.val('');
                        inputText.prop('disabled', true);
                    } else {
                        //field.removeClass('disabled');
                        inputText.prop('disabled', false);
                    }
                }
            });
        });



    }

    /**
     * mypageMenu
     *
     */
    OTWOJOB.mypageMenu = function() {
        var wrap = $('.my_menu')
            , trigger = wrap.children('ul').children('li');

        trigger.each(function(i) {
            var li = $(this)
                , target = li.children('.depth2')
                , a = li.children('a');

            a.on({
                click : function() {
                    if( li.hasClass('on') ){
                        li.removeClass('on');
                        target.stop().slideUp(200);
                    }else{
                        li.addClass('on');
                        target.stop().slideDown(200);
                        trigger.not(li).removeClass('on');
                        trigger.not(li).children('.depth2').stop().slideUp(200);
                    }
                }
            });
        });
    }

    /**
     * selectOptions
     *
     */
    OTWOJOB.selectOptions = function() {

        var wrap = $('.select_options')
            , line = wrap.find('.line')
            , trigger = line.children('.selected')
            , list = trigger.next()

        _setPlaceHolder();
        _binding();

        function _binding() {
            trigger.each(function() {
                var _this = $(this)
                    , thisList = $(this).next('.options')
                    , thisList2 = $(this).next('.options02')
                    , list2Trigger = thisList2.children('li')
                    , mTime = 200;

                _this.hammer({ preventDefault : true }).on({
                    'tap.select' : function() {
                        if ( $(this).hasClass('on') ) {
                            thisList.stop().slideUp(mTime);
                            thisList2.stop().slideUp(mTime);
                            $(this).removeClass('on');
                        } else {
                            thisList.stop().slideDown(mTime);
                            thisList2.stop().slideDown(mTime);
                            $(this).addClass('on');
                        }
                    }
                });

                /*

                thisList.find('input').each(function() {
                    $(this).on({
                        change : function() {
                            if ( $(this).is(':checked') ) {
                                _this.html($(this).next('.txt').html());
                                thisList.stop().slideUp(mTime);
                                _this.removeClass('on');
                            }
                        }
                    });
                });
                */

                list2Trigger.each(function() {
                    var that = $(this)
                        , _a = that.children('a')
                        , _ul = that.children('ul');

                    _a.hammer({ preventDefault : true }).on({
                        click : function() {
                            if ( $(this).hasClass('on') ) {
                                _ul.stop().slideUp(mTime);
                                $(this).removeClass('on');
                            } else {
                                _ul.stop().slideDown(mTime);
                                $(this).addClass('on');
                            }
                        }
                    });

                    _a.on({
                        click : function() {
                            return false;
                        }
                    });

                });


            });
        }

        function _setPlaceHolder() {
            trigger.each(function() {
                $(this).html($(this).attr('data-placeholder'));
            });
        }
    }

    /**
     * tabType
     *
     */
    OTWOJOB.tabType = function() {

        var wrap = $('[class^=tab_type]').not('.notFn');

        wrap.each(function() {
            var li = $(this).find('li')
                , ul = $(this).find('ul, ol')
                , liLength = li.length > 10 ? li.length : '0'+li.length;

            ul.addClass('length' + liLength)
        });

    }

    /**
     * chargeMethod
     *
     */
    OTWOJOB.chargeMethod = function() {

        var wrap = $('.charge_method')
            , trigger = wrap.find('li');

        trigger.each(function() {
            var _this = $(this)
                , a = _this.find('a');

            a.hammer({ preventDefault : true }).on({
                click : function() {
                    trigger.find('a').removeClass('on');
                    $(this).addClass('on');
                }
            });
        });

    }

    /**
     * faqList
     *
     */
    // OTWOJOB.faqList = function() {

    // 	var faqWrap = $('.faq_list01')
    // 		, q = faqWrap.find('dt')
    // 		, a = faqWrap.find('dd');

    // 	q.each(function() {
    // 		var _this = $(this)
    // 			, trigger = _this.children('a')
    // 			, answer = _this.next('dd');

    // 		trigger.hammer({ preventDefault : true }).on({
    // 			tap : function() {
    // 				if ( trigger.hasClass('on') ) {
    // 					trigger.removeClass('on');
    // 					answer.stop().slideUp(200);
    // 				} else {
    // 					q.not(_this).children('a').removeClass('on');
    // 					trigger.addClass('on');

    // 					a.not(answer).stop().slideUp(200);
    // 					answer.stop().slideDown(200);
    // 				}
    // 			}
    // 		});
    // 		trigger.on({
    // 			click : function() {
    // 				return false;
    // 			}
    // 		});
    // 	});

    // }

    /**
     * inputFile
     *
     */
    OTWOJOB.inputFile = function() {

        var wrap = $('.input_file_wrap')
            , text = wrap.find('.t_wrap').find('input')
            , btn = wrap.find('.btn input[type=file]');

        btn.on({
            change : function() {
                text.val($(this).val());
            }
        });

    }

    /**
     * subHeader
     *
     */
    OTWOJOB.subHeader = function() {

        var wrap = $('.sub_header')
            , trigger = wrap.find('.s_tit a')
            , listContainer = wrap.find('.list_container')
            , slider = wrap.find('.flexSlider')
            , slide = slider.find('.slide')
            , controlWrap = wrap.find('.list_control')
            , btnPrev = controlWrap.find('.prev')
            , btnNext = controlWrap.find('.next')
            , total = controlWrap.find('.total')
            , current = controlWrap.find('.current');

        listContainer.show();
        slider.flexSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider : true,
            keyboardControls: false,
            navPrevSelector : btnPrev,
            navNextSelector : btnNext,
            //navSlideSelector : indicator,
            onSlideChange: slideChange,
            onSlideComplete : slideComplete
        });
        listContainer.hide();

        slider.find('i').remove();

        total.html(slide.length);
        current.html('1');

        trigger.hammer({ preventDefault : true }).on({
            click : function() {
                if ( $(this).hasClass('on') ) {
                    $(this).removeClass('on');
                    listContainer.stop().slideUp(150);
                } else {
                    $(this).addClass('on');
                    listContainer.stop().slideDown(150);
                }
            }
        });

        function slideChange(args) {
            current.html(args.currentSlideNumber);
        }

        function slideComplete() {
        }
    }

    /**
     * itemSlider01
     *
     */
    OTWOJOB.itemSlider01 = function() {

        var wrap = $('.item_slider_wrap')
            , slider = wrap.find('.flexSlider')
            , slide = slider.find('.slide')
            , btnPrev = wrap.find('.ctrl_btn.prev')
            , btnNext = wrap.find('.ctrl_btn.next');

        //wrap.height(wrap.height() + 170);

        $(window).on({
            'resize.itemSlider01' : function() {
                wrap.removeAttr('style');
                //wrap.height(wrap.height() + 170);
            }
        });

        slider.flexSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider : true,
            keyboardControls: false,
            navPrevSelector : btnPrev,
            navNextSelector : btnNext,
            //navSlideSelector : indicator,
            onSlideChange: slideChange,
            onSlideComplete : slideComplete
        });

        slider.find('i').remove();

        function slideChange(args) {
        }

        function slideComplete() {
        }

    }

    /**
     * sampleImgE
     *
     */
    OTWOJOB.sampleImgE = function() {

        var wrap = $('.sample_img_area')
            , slider = wrap.find('.flexSlider')
            , slide = slider.find('.slide')
            , btnPrev = wrap.find('.ctrl_btn.prev')
            , btnNext = wrap.find('.ctrl_btn.next');

        wrap.height(wrap.height() );

        slider.flexSlider({
            snapToChildren: true,
            desktopClickDrag: true,
            infiniteSlider : true,
            keyboardControls: false,
            navPrevSelector : btnPrev,
            navNextSelector : btnNext,
            //navSlideSelector : indicator,
            onSlideChange: slideChange,
            onSlideComplete : slideComplete
        });

        slider.find('i').remove();

        function slideChange(args) {
        }

        function slideComplete() {
        }

    }

    /**
     * layerCall
     *
     */
    OTWOJOB.layerCall = function() {

        var trigger = $('.layer_call_trigger');

        trigger.each(function() {
            var _this = $(this)
                , target = $($(this).attr('data-target'))
                , pos = $(this).attr('data-pos')
                , targetTop = _this.offset().top + _this.outerHeight(true) + 5

            if ( pos != undefined ) {
                if ( pos == 'center' ) {
                    target.show();
                    target.find('.in_layer').css({
                        top : '50%'
                        , marginTop : -(target.find('.in_layer').height()/2)
                    });
                    target.hide();
                } else {
                    target.find('.in_layer').css({
                        // top : pos + 'px'
                    });
                }
            } else {
                target.find('.in_layer').css({
                    top : targetTop
                });
            }

            target.find('.closer').hammer({ preventDefault : true }).on({
                click : function() {
                    target.fadeOut(100);
                }
            });

            target.find('.btn_close').hammer({ preventDefault : true }).on({
                click : function() {
                    target.fadeOut(100);
                }
            });

            $(this).hammer({ preventDefault : true }).on({
                click : function() {
                    target.fadeIn(100);
                    if ( pos == undefined ) {
                        $('html, body').animate({
                            scrollTop : targetTop - 20
                        }, 400);
                    } else {
                        var newTop = parseInt(target.find('.in_layer').css('top')) - 10;

                        if ( newTop < 0 ) newTop = 0;

                        $('html, body').animate({
                            scrollTop : newTop
                        }, 400);
                    }
                }
            });

            $(this).on({
                click : function() {
                    return false;
                }
            });
        });
    }

    /**
     * layerClose
     *
     */
    OTWOJOB.layerClose = function() {
        $(".pop_layer").fadeOut(100);
        $(".event_layer").fadeOut(100); /* OTWOJOB-566 */
    }

    /**
     * layerClose
     *
     */
    OTWOJOB.layerCloseExtend = function() {
        $(".pop_layer").fadeOut(100);
        $(".event_layer").fadeOut(100); /* OTWOJOB-566 */
    }

    // /**
    //  * layerOpen
    //  *
    //  */
    // OTWOJOB.layerOpen = function() {
    // 	$(".pop_layer").fadeIn(100);
    // }

    /**
     * tabFunc
     *
     */
    OTWOJOB.tabFunc = function() {

        var tabWrap = $('.fnTab')
            , tabTrigger = tabWrap.find('a')
            , tabCont = $('.' + tabWrap.attr('data-target'));

        tabCont.hide();
        tabCont.first().show();

        tabTrigger.each(function() {
            var target = $($(this).attr('href'));

            $(this).hammer({ preventDefault : true }).on({
                click : function() {
                    tabCont.hide();
                    target.show();

                    tabTrigger.removeClass('on');
                    $(this).addClass('on');
                }
            });

            $(this).on({
                click : function() {
                    return false;
                }
            });
        });

    }

    /**
     * listType08
     *
     */
    OTWOJOB.listType08 = function() {

        var wrap = $('.list_type08')
            , item = wrap.find('.item');

        _bind();

        function _bind() {

            item.each(function() {
                var trigger = $(this).children('.i_tit').find('a')
                    , cont = $(this).children('.item_cont');

                trigger.on({
                    click : function() {
                        if ( $(this).hasClass('on') ) {
                            $(this).removeClass('on');
                            cont.slideDown(200);
                        } else {
                            $(this).addClass('on');
                            cont.slideUp(200);
                        }

                        return false;
                    }
                });
            });
        }

    }

    /**
     * orderCont
     *
     */
    OTWOJOB.orderCont = function() {

        var wrap = $('.order_cont');

        wrap.each(function() {
            var _this = $(this)
                , trigger = _this.find('.toggler')
                , cont = _this.find('.in_cont')

			trigger.on({
				click : function() {
					if ( $(this).hasClass('on') ) {
						$(this).removeClass('on').html('닫기');
						cont.show();
					} else {
						$(this).addClass('on').html('열기');
						cont.hide();
					}
					$('.common_tool_tip').css('z-index', '0').hide();
				}
			});
		});

    }

    /**
     * fnSearchFocus
     *
     */
    OTWOJOB.fnSearchFocus = function() {

        var wrap = $('.search_wrap')
            , input = wrap.find('input')
            , button_e = wrap.find('.search_delete');

        $('.search_wrap .sch_box input').on('keyup', function() {
            if(input.val().length == 0){
                button_e.removeClass('show');
            }else{
                button_e.addClass('show');
            }

        });

    }

    /**
     * msgList
     *
     */
    OTWOJOB.msgList = function() {
        $('body').on('focusin', '.msg_input_wrap textarea[name=content]', function() {
            var wrap = $('.msg_list_wrap')
                , inputWrap = wrap.find('.msg_input_wrap')
                , inputBox = inputWrap.find('.input_wrap')
                , leftArea = inputWrap.find('.btns')
                , normal = leftArea.find('.normal')
                , wider = leftArea.find('.wider')
                , send = wrap.find('.send')
                , textarea = wrap.find('textarea')
                , originWidth = '30px';

            leftArea.css('width', originWidth);
            inputBox.css('marginLeft', originWidth);
            normal.hide();
            wider.show();
        });
        $('body').on('keyup', '.msg_input_wrap textarea[name=content]', function() {
            var wrap = $('.msg_list_wrap')
                , inputWrap = wrap.find('.msg_input_wrap')
                , inputBox = inputWrap.find('.input_wrap')
                , leftArea = inputWrap.find('.btns')
                , normal = leftArea.find('.normal')
                , wider = leftArea.find('.wider')
                , send = wrap.find('.send')
                , textarea = wrap.find('textarea')
                , originWidth = '30px';

            textarea.each(function(){
                if($(this).val().length >= 1){
                    send.css('background-color', '#f9530b').css('border', '1px solid #f9530b');
                }else{
                    send.css('background-color', '#878d96').css('border', '1px solid #878d96');
                }
            });
        });

        $('body').on('click', '.wider', function() {
            var wrap = $('.msg_list_wrap')
                , inputWrap = wrap.find('.msg_input_wrap')
                , inputBox = inputWrap.find('.input_wrap')
                , leftArea = inputWrap.find('.btns')
                , normal = leftArea.find('.normal')
                , wider = leftArea.find('.wider')
                , send = wrap.find('.send')
                , textarea = wrap.find('textarea')
                , originWidth = '30px'
                , wideWidth = inputWrap.hasClass('type01') ? '60px' : ''
                , wideWidth2 = inputWrap.hasClass('type02') ? '90px' : '';

            leftArea.css('width', wideWidth);
            inputBox.css('marginLeft', wideWidth);
            leftArea.css('width', wideWidth2);
            inputBox.css('marginLeft', wideWidth2);
            normal.show();
            wider.hide();
        });
    }

    /**
     * tabMove
     *
     */
    OTWOJOB.tabMove = function() {

        var tabWrap = $('.tab_move')
            , trigger = tabWrap.find('a')
            , TOP = tabWrap.offset().top
            , content = $('.tab_content')
            , currentScrollTop = $(window).scrollTop()

        _tabFix();
        _checkTab();
        _bind();

        $(window).on({
            'scroll.tabMove' : function() {
                currentScrollTop = $(window).scrollTop();
                _tabFix();
            }
        });

        function _tabFix() {
            if ( currentScrollTop >= TOP ) {
                if ( !tabWrap.hasClass('fixed') ) {
                    tabWrap.addClass('fixed');
                }
                _checkTab();
            } else {
                if ( tabWrap.hasClass('fixed') ) {
                    tabWrap.removeClass('fixed');
                }
            }
        }

        function _bind() {
            trigger.each(function(i) {
                $(this).on({
                    click : function() {
                        $('html, body').stop().animate({
                            scrollTop : content.eq(i).offset().top - 38
                        }, 300);
                        return false;
                    }
                });
            });
        }

        function _checkTab() {
            content.each(function(i) {
                var thisTop = $(this).offset().top;
                if ( currentScrollTop+48 >= thisTop ) {
                    trigger.removeClass('on');
                    trigger.eq(i).addClass('on');
                }
            });
        }

    }

    /**
     * searchResult
     *
     */
    OTWOJOB.searchResult = function() {

        var searchWrap = $('._scroll_motion')
            , TOP = searchWrap.offset().top
            , currentScrollTop = $(window).scrollTop()

        _searchFix();
        $(window).on({
            'scroll.searchResult': function () {
                currentScrollTop = $(window).scrollTop();
                _searchFix();
            }
        });

        function _searchFix() {
            if ($('.item_wrap .item').length > 4){
                if (currentScrollTop >= TOP) {
                    if (!searchWrap.hasClass('fixed')) {
                        searchWrap.addClass('fixed');
                        $('.result_info').css('display', 'none');
                    }
                } else {
                    if (searchWrap.hasClass('fixed')) {
                        searchWrap.removeClass('fixed');
                        $('.result_info').css('display', 'block');
                    }
                }
            }
        }
    }

    $("body").on('keydown keyup','textarea.autosize', function () {
        $(this).height(1).height( $(this).prop('scrollHeight')-16 );
    });

    $("body").on('keydown keyup', 'textarea.autosize2', function () {
        $(this).height(1).height( $(this).prop('scrollHeight') ).css('margin-top',-($(this).height()/2) + 4 + 'px');
        $(this).each(function(){
            if($(this).val().length >= 1){
                $('.send_msg').css('border-top', '1px solid #f9530b');
                $('.send_msg button').css('background-color', '#f9530b');
            }else{
                $('.send_msg').css('border-top', '1px solid #878d96');
                $('.send_msg button').css('background-color', '#878d96');
            }
        });
    });
    $('body').on('keyup click','.send_msg button', function(){
        $('.msg_entry_form textarea').height(18).css('margin-top','-5px').css('line-height','18px');
    });

	$(".bg_color01").each(function () {
            if (jQuery.browser.mobile){
                var _this = jQuery(this);
                var oh = outerHeight;
                var hh = $('.header').outerHeight(true);
                var fh = $('footer').outerHeight(true) + 30;
                var bgh = oh - (hh + fh);

                if($( "header" ).length > 0){
                    _this.css('min-height', bgh);
                    if($('.my_nav').length) {
                        _this.css('min-height', bgh - $('.my_nav').outerHeight(true));
					}
                }else{
                    _this.css('min-height', oh - fh);
                }
		}
	});
	if($(".bg_color01").length > 0){
		$("body").css('background','#f2f2f2');
		$(window).scrollTop(0);
	}

    try {
        $("#content").each(function () {
            if (jQuery.browser.mobile){
                var _this = jQuery(this);
                var oh = outerHeight;
                var hh = $('.header').height();
                var fh = $('footer').height();
                var bgh = oh - (hh + fh);

                // _this.css('min-height', bgh);
                // _this.css('min-height', 'calc(100vh - 151px)');
            }
        });
    } catch(e) {
        // console.log('ignore .... ');
    }



    // loadingOpen
    OTWOJOB.loadingOpen = function() {
        $('.loading').show();
    };
    // loadingClose
    OTWOJOB.loadingClose = function() {
        $('.loading').hide();
    };

    // 통합형 간편회원가입용
    OTWOJOB.memberCheck = function() {
        $('label.member').each(function(){
            if($(this).find(':checkbox').is(':checked')){
                $(this).addClass('on');
            }else{
                $(this).removeClass('on');
            }
        })

        $('label.member').click(function(){
            if($(this).children(':checkbox').is(':checked')){
                $(this).addClass('on');
            }else{
                $(this).removeClass('on');
            }
        });
    };

    /* tool-tip */
    OTWOJOB.toolTip = function() {
        $('.tool-tip').each(function() {
            $(this).click(function(){
                tooltip_open(this);
            });
        });


        $('.tool-tip-reverse').click(function(){
            var offset = $(this).offset();
            var myWidth =  $(this).innerWidth();
            var myHeight =  $(this).innerHeight();
            var targetId = $(this).attr('data-tooltip');
            var toolHeight = $('#'+ targetId).innerHeight();
            var PosX = offset.left;
            var PosY = offset.top + myHeight;
            //alert(PosY + '//////////////' +toolHeight + '//////////////' + myHeight);

            $('.common_tool_tip').hide();
            $('#'+ targetId).css({
                'width' 	: $(document).width() - 20 + 'px',
                'top'      : PosY - (toolHeight + myHeight + 18) + 'px',
                'left'     : '10px',
                'position' : 'absolute',
                'z-index'  : '999'
            }).addClass('reverse').show();
            $('#'+ targetId).find('.arrow').css({
                'left'	: PosX + (myWidth/2) - 15 +'px',
                'top'	: toolHeight + 'px'
            })
        });
        $('.tool-tip-open').each(function() {
            var offset = $(this).offset();
            var myWidth =  $(this).innerWidth();
            var myHeight =  $(this).innerHeight();
            var targetId = $(this).attr('data-tooltip');
            var PosX = offset.left;
            var PosY = offset.top + myHeight;

            $('#'+ targetId).css({
                'width' 	: $(document).width() *(2/3) + 'px',
                'top'      : (PosY+2) + 'px',
                'left'     : $(document).width() - $(document).width() *(2/3) - 10 + 'px',
                'position' : 'absolute',
                'z-index'  : '999'
            }).show();
            $('#'+ targetId).find('.arrow').css({
                'left'      : PosX + (myWidth/2) - 15 -($(document).width() - $(document).width() *(2/3) - 20) +'px'
            })
        });
        $('.common_tool_tip').find('.closer').click(function(){
            try {
                $(this).parent().css('z-index', '0').hide();
            } catch(e) {}
            try {
                $(this).parent().parent().css('z-index', '0').hide();
            } catch(e) {}

        });

        $('.common_tool_tip').find('.window_closer').click(function(){
            try {
                $(this).parent().css('z-index', '0').hide();
            } catch(e) {}
        });
    };

    // 구매평 작성
    OTWOJOB.assessment = function() {
        $('.assessment_wrap .icon_check').find('button').unbind('click').click(function (index) {
            $('.assessment_wrap .icon_check').find('button').removeClass('on');
            $(this).addClass('on');
        })
        $('.assessment_wrap .star_grade_m').each(function () {
            $(this).find('button').each(function (index) {
                $(this).unbind('click').click(function() {
                    var per = (index+1) * 20;
                    var target = $(this).parent().find('.percent');

                    target.animate({
                        width: per  + '%',
                    }, 300);
                    target.attr('point', per);
                });
            });
        });
        $('#assessment_detail span').unbind('click').click(function () {
            if ($(this).hasClass('on') === true) {
                $(this).removeClass('on');
            } else {
                $(this).addClass('on');
            }
        });
    }

    // 프로필 판매량 애니메이션
    $(window).load(function(){
        if ($('.row_graph_box dd span em').attr('average')) {
            var totalBoxY = $('.sales_wrap').offset().top;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            if ((totalBoxY - 675) <= scrollY) {
                $('.row_graph_box dd span em').each(function () {
                    if ($(this).attr('average')) {
                        $(this).addClass('_average_comp');
                        var _height =  $(this).attr('average');
                        $(this).animate({
                            height: _height  + '%',
                        }, 300);
                    }
                })
            }
            $(document).bind('scroll', function(){
                var totalBoxY = $('.sales_wrap').offset().top;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                if ((totalBoxY - 675) <= scrollY && !$('.review_total .percent').hasClass('_average_comp')) {
                    $('.row_graph_box dd span em').each(function () {
                        if ($(this).attr('average')) {
                            $(this).addClass('_average_comp');
                            var _height =  $(this).attr('average');
                            $(this).animate({
                                height: _height  + '%',
                            }, 300);
                        }
                    })
                }
            })
        }
    });

    // 리뷰 총평점 애니매이션
    OTWOJOB.review_total_average = function() {
        // 상세 구매자 리뷰 애니메이션
        $(window).load(function(){
            if ($('.review_total .percent').attr('average')) {
                var totalBoxY = $('.review_total').offset().top;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                if ((totalBoxY - 675) <= scrollY) {
                    $('.review_total .percent').each(function () {
                        if ($(this).attr('average')) {
                            $(this).addClass('_average_comp');
                            var _width =  $(this).attr('average');
                            $(this).animate({
                                width: _width  + '%',
                            }, 300);
                        }
                    })
                }
                $(document).bind('scroll', function(){
                    var totalBoxY = $('.review_total').offset().top;
                    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                    if ((totalBoxY - 675) <= scrollY && !$('.review_total .percent').hasClass('_average_comp')) {
                        $('.review_total .percent').each(function () {
                            if ($(this).attr('average')) {
                                $(this).addClass('_average_comp');
                                var _width =  $(this).attr('average');
                                $(this).animate({
                                    width: _width  + '%',
                                }, 300);
                            }
                        })
                    }
                })
            }
        });
    }

    // 판매자 상세 거래메시지 타이틀 고정  <!-- 거래메시지 타이틀 고정 -->
    OTWOJOB.messageTitleFix = function() {
        // 상세 구매자 리뷰 애니메이션
        $(window).load(function() {
            $(document).bind('scroll', function() {
                var messageTitleY = $('.msg_list_wrap').offset().top;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollY >= messageTitleY) {
                    $('.tit_layer_wrap').css({'display': 'block', 'position':'fixed'});
                }else {
                    $('.tit_layer_wrap').css({'display': 'none', 'position':'relative'});
                }
            })
        })
    }

    OTWOJOB.scrollEventListener = function() {
        // var previousScroll = 0;
        if($('.t_gnb').length) {
            $('.t_gnb').parent().css({
                zIndex: '2800',
                backgroundColor: 'transparent',
                boxShadow: 'none'
            });
        }

        var lastPoint = null; //global

        var pScrolls = {tab1: 0, tab2: 0, tab3: 0}
        var previousScroll = 0;
        $(window).scroll(function(event){
            var currentScroll = $(this).scrollTop();

            var wrap = $('.t_gnb');
            var content = $('.content');
            //var target = this.className.split(' ')[0];
            //var previousScroll = pScrolls[target];

            /*  if(currentScroll - previousScroll > 80 || currentScroll - previousScroll < -80) {
                  //pScrolls[target] = currentScroll;
                  return;
              }*/

            if (currentScroll > previousScroll + 5){   // down
                // $('#content').css("min-height", 'calc(100vh - 45px)');
                if($('.aside_menu').css('bottom') == '0px') {
                    $('.aside_menu').animate({
                        bottom: '-55px'
                    }, 200);
                }
                if($('.btn_top').css('display') == 'none') {
                    $('.btn_top').show();
                }

                /*if($('.header').css('top') == '0px') {
                    if($('.header').find('.logo').length) {
                        $('.header').animate({
                            top: '-50px'
                        }, 200);
                    }
                    wrap.animate({top: '0'}, 200, function() {
                        wrap.parent().css('margin-top', '0');
                    });
                    //content.css('margin-top','50px');
                }*/
            }
            else if (currentScroll < previousScroll - 5){  //
                // $('#content').css("min-height", 'calc(100vh - 151px)');
                if ($('.aside_menu').css('bottom') == '-55px') {
                    $('.aside_menu').animate({
                        bottom: '0'
                    }, 200);
                }
                if ($(this).scrollTop() < 70) {
                    $('.btn_top').hide();
                }

                /*if ($('.header').css('top') == '-50px') {
                    if ($('.header').find('.logo').length) {
                        $('.header').animate({
                            top: '0px'
                        }, 200);
                    }
                    wrap.animate({top: '50px'}, 200, function() {
                        wrap.parent().css('margin-top', '50px');
                    });
                    //content.css('margin-top','95px');
                }*/
            }

            previousScroll = currentScroll;
        });

        // $(window).scrollTop(0);
    }

    /**
     * MOBILE MAIN SWIPE SCRIPT
     * */
    OTWOJOB.swipeTabListener = function() {

        var duration = 100;
        var flicking = new eg.Flicking(".content", {
            circular: true,
            threshold: 70,
            defaultIndex: 1,
            duration: duration
        }).on({
            flickEnd : _afterFlicking
            /*moveEnd: endFlicking,
            moveStart: startFlicking,
            change: function(e) {
                console.log('direct change??')
            }*/
        });

        msgSwipe.setMainFlicking(flicking);

        // function startFlicking(e) {
        //     msgSwipe.setDirect(e.direction);
        // }

        // function endFlicking(e) {
        //     if(e.direction != msgSwipe.getDirect()) {
        //         return;
        //     }
        //
        //     var tot_cnt = $('#gnb_list li').length - 1;
        //     if ( tot_cnt > 0) {
        //
        //         var gnb_idx = $('#gnb_list').find('.selected').index();
        //         $('#gnb_list li').removeClass('selected');
        //
        //         if ( e.direction == 'NEXT' ) {
        //             gnb_idx = gnb_idx + 1;
        //             gnb_idx = ( gnb_idx > tot_cnt ) ? 0 : gnb_idx;
        //         } else {
        //             gnb_idx = gnb_idx - 1;
        //             gnb_idx = ( gnb_idx < 0 ) ? tot_cnt : gnb_idx;
        //         }
        //
        //         $('#gnb_list li').eq(gnb_idx).addClass('selected');
        //         $.cookie('latest_tab', gnb_idx, {expires : 1, path: '/'});
        //         try {
        //             // var swipeTarget = gnb_idx - 1;
        //             var swipeTarget = gnb_idx;
        //             /*if(swipeTarget < 0) {
        //                 swipeTarget = 0;
        //             }*/
        //
        //             // console.log(swipeTarget + " ~~~~~~~ " + $('#gnb_list li').eq(swipeTarget).find('a').attr('linkurl'));
        //             msgSwipe.getFlicking().moveTo(swipeTarget);
        //
        //             /*$('t_gnb').find('.list .in_wrap').mCustomScrollbar('scrollTo', $('#gnb_list li').eq(swipeTarget), {
        //                 scrollInertia: 0
        //             });*/
        //         } catch(e) {
        //             console.log(e);
        //             // console.log(gnb_idx);
        //             // console.log($('#gnb_list li').eq(gnb_idx));
        //         }
        //
        //
        //         var curr_idx = $('#currentTabIdx').val();
        //         var make_idx = '';
        //
        //         if ( e.direction == 'NEXT') {
        //             switch ( curr_idx ) {
        //                 case '1': make_idx = 3; $('#currentTabIdx').val('2'); break;
        //                 case '2': make_idx = 1; $('#currentTabIdx').val('3'); break;
        //                 case '3': make_idx = 2; $('#currentTabIdx').val('1'); break;
        //                 default : make_idx = '';
        //             }
        //             gnb_idx = gnb_idx + 1;
        //             gnb_idx = ( gnb_idx > tot_cnt ) ? 0 : gnb_idx;
        //         } else {
        //             switch ( curr_idx ) {
        //                 case '1': make_idx = 2; $('#currentTabIdx').val('3'); break;
        //                 case '2': make_idx = 3; $('#currentTabIdx').val('1'); break;
        //                 case '3': make_idx = 1; $('#currentTabIdx').val('2'); break;
        //                 default : make_idx = '';
        //             }
        //             gnb_idx = gnb_idx - 1;
        //             gnb_idx = ( gnb_idx < 0 ) ? tot_cnt : gnb_idx;
        //         }
        //         $('#content').find('.tab' + make_idx).html('');
        //         if ( make_idx != '' ) {
        //             // console.log('make_idx:' + make_idx + ' | gnb_idx:' + gnb_idx);
        //             callNextPage(make_idx, $('#gnb_list li').eq(gnb_idx).children('a').attr('linkUrl'), true, true);
        //             var target = $('.tab' + $('#currentTabIdx').val()).find('.contents_scroll');
        //             if(target.outerHeight(true) != null && target.outerHeight(true) != undefined) {
        //                 $('#content').height(target.outerHeight(true) + 240);
        //             } else {
        //                 $('#content').height(3000);
        //             }
        //             $(window).scrollTop(0);
        //
        //         }
        //     }
        // }

        function _afterFlicking(e) {
            var tot_cnt = $('#gnb_list li').length - 1;
            if ( tot_cnt > 0) {

                var gnb_idx = $('#gnb_list').find('.selected').index();
                $('#gnb_list li').removeClass('selected');

                if ( e.direction == 2 ) {
                    gnb_idx = gnb_idx + 1;
                    gnb_idx = ( gnb_idx > tot_cnt ) ? 0 : gnb_idx;
                } else {
                    gnb_idx = gnb_idx - 1;
                    gnb_idx = ( gnb_idx < 0 ) ? tot_cnt : gnb_idx;
                }

                $('#gnb_list li').eq(gnb_idx).addClass('selected');
                $.cookie('latest_tab', gnb_idx, {expires : 1, path: '/'});
                try {
                    var swipeTarget = gnb_idx - 1;
                    if(swipeTarget < 0) {
                        swipeTarget = 0;
                    }

                    $('.t_gnb').find('.list .in_wrap').each(function() {
                        $(this).mCustomScrollbar('scrollTo', $('#gnb_list li').eq(swipeTarget), {
                            scrollInertia: 0
                        });
                    });

                } catch(e) {
                    // console.log(gnb_idx);
                    // console.log($('#gnb_list li').eq(gnb_idx));
                }


                var curr_idx = $('#currentTabIdx').val();
                var make_idx = '';

                if ( e.direction == 2 ) {
                    switch ( curr_idx ) {
                        case '1': make_idx = 3; $('#currentTabIdx').val('2'); break;
                        case '2': make_idx = 1; $('#currentTabIdx').val('3'); break;
                        case '3': make_idx = 2; $('#currentTabIdx').val('1'); break;
                        default : make_idx = '';
                    }
                    gnb_idx = gnb_idx + 1;
                    gnb_idx = ( gnb_idx > tot_cnt ) ? 0 : gnb_idx;
                } else {
                    switch ( curr_idx ) {
                        case '1': make_idx = 2; $('#currentTabIdx').val('3'); break;
                        case '2': make_idx = 3; $('#currentTabIdx').val('1'); break;
                        case '3': make_idx = 1; $('#currentTabIdx').val('2'); break;
                        default : make_idx = '';
                    }
                    gnb_idx = gnb_idx - 1;
                    gnb_idx = ( gnb_idx < 0 ) ? tot_cnt : gnb_idx;
                }
                $('#content').find('.tab' + make_idx).html('');
                if ( make_idx != '' ) {
                    // console.log('make_idx:' + make_idx + ' | gnb_idx:' + gnb_idx);
                    callNextPage(make_idx, $('#gnb_list li').eq(gnb_idx).children('a').attr('linkUrl'), true, true, true);
                    var target = $('.tab' + $('#currentTabIdx').val()).find('.contents_scroll');
                    if(target.outerHeight(true) != null && target.outerHeight(true) != undefined) {
                        $('#content').height(target.outerHeight(true) + 240);
                    } else {
                        $('#content').height(3000);
                    }

                    // $(window).scrollTop(0);
                }
            }
        }
    }
})(jQuery);

function memberDivOpen(id) {
    var nId = id;
    $('#' + nId).fadeIn();
}
function memberDivClose(id) {
    var nId = id;
    $('#' + nId).hide();
}

// OTWOJOB-707
// ProgressBarOpen
function progressMove() {
    $(".bar_color").show();
    var elem = document.getElementById("progressBar"),
        width = 0,
        id = setInterval(frame, width);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            progressHide();
        } else {
            width++; // [dev] 증감 계산값만 width에 추가하면 됩니다.
            elem.style.width = width + '%';
            document.getElementById("per_num").innerHTML = width * 1  + '%';
        }
    }
}
// ProgressBarHide
function progressHide() {
    $(".bar_color").hide();
    $("#per_num").hide();
}

function couponLayer(obj) {
    var _this = $(obj)
        , target = $($(obj).attr('data-target'))

    target.show();

    target.find('.closer').hammer({ preventDefault : true }).on({
        click : function() {
            target.fadeOut(100);
        }
    });

    target.find('.btn_close').hammer({ preventDefault : true }).on({
        click : function() {
            target.fadeOut(100);
        }
    });
}

// 메세지 보내기 리사이즈
function msgResize(obj) {
    obj.style.height = (obj.scrollHeight) + "px";
    if (obj.scrollHeight <= 45) {
        obj.style.height = "33px"
    }
};

// 재능상세 댓글 펼침
function reviewOn(t) {
    var _this = t;
    var activeOn = $(_this).parent()
    if (!activeOn.hasClass('on')){
        activeOn.addClass('on');
        activeOn.find('.bigimg').css('display', 'block');
        $(_this).find('.updown_btn').html('닫기 <span></span>');
    }else {
        activeOn.removeClass('on');
        activeOn.find('.bigimg').css('display', 'none');
        $(_this).find('.updown_btn').html('상세보기 <span></span>');
    }
}


var Tutorial = {
    init : function() {
        this.cookieName = 'msg_tutorial';
        var isTutorialView = getCookie(this.cookieName);
        if(isTutorialView != 'view') {
            var html = '';
            html += '<div class="tutorial_main">' +
                '    <div style="position:relative;">' +
                '        <img id="tutorial_image" src="http://images.otwojob.com/image/mobile/temp/message-tutorial-01_2.png">' +
                '        <div id="tutorial_btn">' +
                '            <div id="tutorial_page_1" class="selPage">&nbsp;</div>' +
                '            <div id="tutorial_page_2">&nbsp;</div>' +
                '            <div id="tutorial_page_3">&nbsp;</div>' +
                '            <div id="tutorial_page_4">&nbsp;</div>' +
                '            <div id="tutorial_page_5">&nbsp;</div>' +
                '            <button id="tutorial_btn_next" onclick="Tutorial.next(\'http://images.otwojob.com/image/mobile/temp/message-tutorial\', 2, 5)">Next</button>' +
                '            <button id="tutorial_btn_close" style="display:none;" onclick="Tutorial.close()">오투잡 시작하기</button>' +
                '        </div>' +
                '     </div>' +
                '</div>';

            $('body').append(html);
            $('body').css('height', 'calc(100vh)');
        }
    },
    next : function(url, idx, max) {
        if(idx == max) {
            $('#tutorial_btn_next').css('display', 'none');
            $('#tutorial_btn_close').css('display', '');
        }
        $('#tutorial_btn').children('div').removeClass('selPage');
        $('#tutorial_page_'+idx).addClass('selPage');

        var fileIdx = idx;
        if(idx < 10) {
            fileIdx = '0'+idx;
        }
        $('#tutorial_image').attr('src', url+'-'+fileIdx+'.png');
        $('#tutorial_btn_next').attr('onclick', 'Tutorial.next(\''+url+'\', '+(idx+1)+', '+max+')');
    },
    close: function() {
        $('.tutorial_main').hide();

        $('body').css('height', 'auto');
        setCookie(this.cookieName, 'view', 1);
    }
}

var msgSwipe = {
    init: function() {
        if($(".talk_msg_block").length) {
            $('.talk_msg_block .swipe_block').each(function() {
                $('.talk_msg_block').each(function() {
                    if(!$(this).hasClass('swipe')) {
                        $(this).listSwipe({
                            // The item in the list that has the side actions
                            itemSelector: '.swipe_block',
                            // The width of action button
                            itemActionWidth: 180,
                            // Whether there is an action on the left
                            leftAction: true,
                            // Whether there is an action on the right
                            rightAction: true,
                            // Percent threshold for snapping to position on touch end
                            snapThreshold: 0.4,
                            // Snap animation duration
                            snapDuration: 200,
                            // Close other item actions if a new one is moved
                            closeOnOpen: true,
                            // Number of pixels in the Y-axis before preventing swiping
                            maxYDelta: 80,
                            // Number of pixels in the X-axis before allowing swiping
                            initialXDelta: 45
                        });

                        $(this).addClass('swipe');
                    }
                });
            });
        }
    },
    swipeLeft: function(target) {
        if(!target.hasClass('shaved')) {
            msgSwipe.swipeRightAll();
            var parent = target.parent();
            var btnWidth = parent.children('.background_btn').outerWidth(true);
            target.animate({marginLeft: - (btnWidth)}, 250, function() {
                target.addClass('shaved');
            });
        }
    },
    swipeRight: function(target) {
        if(target.hasClass('shaved')) {
            target.animate({marginLeft: 0}, 250, function() {
                target.removeClass('shaved');
            });
        }
    },
    swipeRightAll: function() {
        $('.talk_msg_block .swipe_block').each(function() {
            msgSwipe.swipeRight($(this));
        });
    },
    setDirect: function(direct) {
        msgSwipe.direct = direct;
    },
    getDirect: function() {
        return msgSwipe.direct;
    },
    setFlicking: function(flicking) {
        msgSwipe.flicking = flicking;
    },
    getFlicking: function() {
        return msgSwipe.flicking;
    },
    setMainFlicking: function(flicking) {
        msgSwipe.mainFlicking = flicking;
    },
    getMainFlicking: function() {
        return msgSwipe.mainFlicking;
    }
}

var customSelectBox = {
    init: function() {
        if($(".custom_selectbox").length) {
            $('.custom_selectbox > button').each(function() {
                $(this).click(function() {
                    var parent = $(this).parent();
                    if(!parent.hasClass('on')) {
                        parent.addClass('on');
                    } else {
                        parent.removeClass('on');
                    }
                });
            });
        }
    },
    clear: function() {
        $('.custom_selectbox').find('li').each(function() {
            $(this).removeClass('selected');
        });
    },
    close: function(target) {
        var parent = target.parent();
        parent.removeClass('on');
    },
    changeMode: function() {
        if($('.additional_opts.selectbox').css('display') == 'none') {
            $('.additional_opts.searchbox').hide();
            $('.additional_opts.searchbox').children('input[type=text]').val('');
            $('.additional_opts.selectbox').css('display', 'inline-block');
        } else if($('.additional_opts.searchbox').css('display') == 'none') {
            $('.additional_opts.selectbox').hide();
            $('.additional_opts.searchbox').css('display', 'inline-block');
        }
    }
}

var calendarBox = {
    init: function () {
        if ($('.input_calendar_absolute').length) {
            var dateToday = new Date();
            var datepicker = $('.input_calendar_absolute');
            var maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 60);

            datepicker.prop('readOnly', true);

            $.datepicker.setDefaults({
                showAnim: "",
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
                minDate: dateToday,
                maxDate: maxDate
            });

            datepicker.datepicker();
        }
    }
}

var sellerCalendar = {
    init: function(disabledDay, holidayArr, saturdayEnabled, sundayEnabled) {
        if($(".full_calendar_inline").length) {
            $.datepicker.setDefaults({
                dateFormat: 'yyyy년 mm월',
                prevText: '이전 달',
                nextText: '다음 달',
                monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                showMonthAfterYear: true,
                yearSuffix: '년'
            });

            var windowWidth = $(window).width();

            $('.full_calendar_inline').css({
                width: '100%',
                minHeight: (windowWidth * 80 / 100) +'px'
            })
            $('.full_calendar_inline').datepicker({
                inline: true,
                altField: '#d',
                onSelect: function(dateText, inst) { return false; },
                beforeShowDay: function(date){
                    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    var dayOfWeek = date.getDay();

                    if(holidayArr.indexOf(string) > -1) {
                        return [true, "holiday"];
                    }

                    var result = (disabledDay.indexOf(string) == -1);
                    if(!saturdayEnabled) {
                        result = (result && (dayOfWeek != 6));
                    }
                    if(!sundayEnabled) {
                        result = (result && (dayOfWeek != 0));
                    }

                    return [result];
                }
            });
        }
    }
}

var lastSubOption = {
    init: function() {
        if($('.last_etc').length) {
            var optionSize = $('.last_etc').find('option').length;
            var targetId = $('.last_etc').attr('id');
            var subText = $('#' + targetId + '_sub_option');
            if((optionSize - 1) == $('.last_etc option').index($('.last_etc option:selected'))) {
                subText.show();
            } else {
                subText.hide();
            }

            $('.last_etc').change(function() {
                if((optionSize - 1) == $('.last_etc option').index($('.last_etc option:selected'))) {
                    subText.show();
                } else {
                    subText.hide();
                }
            });
        }
    }
}

var inputEnabledChk = {
    chk: function(target, isReverse) {
        var t = $(target);
        var toggle = $(target).is(':checked');
        if(isReverse) {toggle = !toggle;}

        var id = t.attr('id');
        var toggleTarget = $('div[data-target="'+id+'"]');

        toggleTarget.find('input').each(function() {
            if(toggle) {
                $(this).prop('disabled', false);
            } else {
                $(this).val('');
                $(this).prop("checked", false); /* by ID */
                $(this).prop('disabled', true);
            }
        });

        toggleTarget.find('select').each(function() {
            if(toggle) {
                $(this).prop('disabled', false);;
            } else {
                $(this).each(function() {
                    var id = $(this).attr('id');
                    $("#" + id + " option:eq(0)").attr('selected', 'selected');
                });
                $(this).prop('disabled', true);;
            }
        });
    }
}

var fullLayer = {
    show: function(name) {
        var target = $('.' + name);
        if(target.length) {
            $('html').css('overflow-y', 'hidden');
            target.find('.btn_close').attr('onclick', 'fullLayer.close("'+name+'")');

            target.show();
            target.animate({
                opacity: 1
            }, 500);
        }
    },
    close: function(name) {
        var target = $('.' + name);
        target.animate({
            opacity: 0
        }, 500, function() {
            target.hide();
        });

        $('html').css('overflow-y', 'auto');
    }
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
            if(datepicker.hasClass('with_week')) {
                var date = new Date(datepicker.datepicker({ dateFormat: 'yy-mm-dd' }).val()),
                    week = new Array('일', '월', '화', '수', '목', '금', '토');
                if (week[date.getDay()]!= undefined) {
                    datepicker.val(datepicker.val() + ' (' + week[date.getDay()] + ')');
                }
            }
        }
    });
}

function showFullImage(target) {
    var img = $(target).children('img').attr('src');
    var mainImage = $('.full_image_layer').find('.main_full_image');
    mainImage.attr('src', img);

    $('.full_image_layer').show();
    var imageHeight = mainImage.outerHeight(true);

    if(imageHeight > $(window).height()) {
        mainImage.addClass('full');
    } else {
        mainImage.removeClass('full');
    }

    fullLayer.show('full_image_layer');
}


var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setUTCHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);

    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

var toggleSubPage = {
    init: function() {
        if($('.content_chk').length) {
            $('.content_chk').each(function() {
                if(this.checked) {
                    toggleSubPage.open(this.id);
                }
            });

            $('.content_chk').change(function() {
                if(this.checked) {
                    toggleSubPage.open(this.id);
                } else {
                    toggleSubPage.close(this.id);
                }
            });
        }
    },
    open: function(title) {
        var target = $('div[title='+title+']');
        target.css('display', 'block');
    },
    close: function(title) {
        var target = $('div[title='+title+']');
        target.css('display', 'none');
    }
}

var commonTab = {
    init: function() {
        if($('.common_tab').length) {
            var tabPosition = $(".common_tab").offset().top;
            var tabTarget = $(".common_tab");

            this.tabPosition = $('.randing_page, .brand_site').children('.visual').eq(0).outerHeight(true) + 50;
            if(this.tabPosition == undefined) {
                this.tabPosition = tabPosition;
            }

            $(window).scroll(function() {
                if($(window).scrollTop() >commonTab.tabPosition - 60) {
                    tabTarget.addClass('fixed');
                } else {
                    tabTarget.removeClass('fixed');
                }

                var trigger= $('.common_tab').children('button');
                $('.common_tab_content').each(function(i) {
                    var thisTop = $(this).offset().top ;
                    if ( $(window).scrollTop() +40> thisTop ) {
                        trigger.removeClass('on');
                        trigger.eq(i).addClass('on');
                    }
                });
            });
        }
    },
    setTabPosition: function() {
        this.tabPosition = $('.randing_page, .brand_site').children('.visual').eq(0).outerHeight(true) + 50;
        if(this.tabPosition == undefined) {
            this.tabPosition = $(".common_tab").offset().top;
        }
        $(".common_tab").css('display', 'inline-block');
    },
    click: function(idx) {
        var target = $('.common_tab_content').eq(idx).find('label').eq(0).offset();
        if(target == undefined) {
            target = $('.common_tab_content').eq(idx).offset();
        }
        $('html, body').stop().animate({
            scrollTop : target.top - $('.common_tab').outerHeight(true) - 40
        });
	},
	transform: function(idx) {
		var target = $('.transform_tab').eq(idx);

		$('.common_tab').children('a').each(function() {
            $(this).removeClass('on');
		});
        $('.common_tab').children('a').eq(idx).addClass('on');

        $('.transform_tab').each(function() {
        	$(this).removeClass('on')
		});
        target.addClass('on');

        var main_offset = $('.randing_page, .brand_site').children('.visual').eq(0).offset().top + $('.randing_page, .brand_site').children('.visual').eq(0).outerHeight(true) - 100;
        $('html, body').stop().animate({
            scrollTop : main_offset
        });
	}
}

function getCurrentPageName() {
    var currentFileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.lastIndexOf("/") + 30);
    if(currentFileName.indexOf('?') > -1) {
        currentFileName = currentFileName.split('?')[0]
    }

    return currentFileName;
}

function showGuidePopup(target) {
    $('.balloon').hide();
    $('#'+target).show();
}

function hideGuidePopup(target) {
    $('#'+target).hide();
}


function showSiteMap() {
    $( ".category_sitemap" ).show();
    $( ".category_sitemap" ).animate({
        top: 0
    }, 200, function() {
        $('html').css('overflow','hidden');
    });
}

function closeSiteMap() {
    var height = $('body').outerHeight(true);
    $( ".category_sitemap" ).animate({
        // top: 'calc(100vh)'
        top: height + 'px'
    }, 200, function() {
        $('html').css('overflow','auto');
        $( ".category_sitemap" ).hide();
    });
}

function toggleCategory(e) {
    var target = $('.category_toggle');
    resetCategoryField('best_categories');

    if(e.className.indexOf('reverse') > -1) {
        target.removeClass('reverse');
        target.find('span').html('접기');

        $('.index01').css('display', 'inline-block');
        $('.index02').css('display', 'inline-block');
        $('.index03').css('display', 'inline-block');
        $('.index04').css('display', 'inline-block');
    } else {
        target.addClass('reverse');
        target.find('span').html('더보기');

        $('.index03').hide();
        $('.index04').hide();
    }

    resizeContent();
}

function resetCategoryField(grid) {
    resetCategoryButton(grid);
    $('.sub_category').hide();
    $('.sub_categories').css('height', '0px');
}

function resetCategoryButton(grid) {
    var idx = 0;
    $('.'+grid).find('.c_button').each(function() {
        var target = (this.id).replace('main_c_', '');
        if($(this).hasClass('rank_b')) {
            target = (this.id).replace('main_b_', '');
        }

        $('#'+this.id).removeAttr('disabled');
        $('#'+this.id).removeClass('selected');
        // $('#'+this.id).find('img').attr('src', '/image/mobile/ico/ic-category-' + target + '.png');
        /*if(!$(this).hasClass('c_all')) {
            $(this).children('i').css({  backgroundPosition: '0 -' + (idx*192) + 'px'});

            idx++;
        }*/

    });
}

function scrollToElement(target) {
    var elem = $('#' + target + '_countdown').parent().parent().parent();
    //elem.addClass('focused');
    $(window).scrollTop(elem.offset().top - 45);
}

$(document).ready(function(){

    toggleSubPage.init();
    if($('#wish_list').length && $('#wish_list').html() == '') {
        $('#wish_list').hide();
        $('.main_links').addClass('empty');
    }

    $('.slick-wrapper').slick({
        autoplay: false, //자동슬라이드 x
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        variableWidth: true,
        infinite: false,
        swipeToSlide: true
    });

    if($('.app_induce').length) {
        var key = "induce_" + (new Date()).getDate();
        var cookie = getCookie(key);

        if(cookie != 'view') {
            showInduceBanner();
        }
    }

    if($('.buy_promotion').length) {
        var key = "buy_promotion_m_" + (new Date()).getDate();
        var cookie = getCookie(key);

        if(cookie != 'view') {
            $('.buy_promotion').css('display', 'inline-block');
        }
    }

    if($('#orderjob_fee_layer').length) {
        var key = "orderjob_fee_layer_" + (new Date()).getDate();
        var cookie = getCookie(key);

        if(cookie != 'view') {
            $('#orderjob_fee_layer').css('display', 'inline-block');
        }
    }



    if($('.list_slide').length && !$('.list_slide').hasClass('mCustomScrollbar')) {
        $('.list_slide').each(function() {
            var listWidth = 0;

            $(this).find('li').each(function() {
                var w = $(this).width();
                $(this).width(w);
                listWidth += $(this).width() + 15;
            });

            $(this).find('ul').width(listWidth);
            $(this).mCustomScrollbar({
                axis : 'x'
            });
        });
    }

    if($('.free_scroll').length && !$('.free_scroll').find('.eg-flick-viewport').length) {
        $('.free_scroll').each(function() {
            var flicking1 = new eg.Flicking(".free_scroll", {
                gap: 10,
                circular: true,
                moveType: "freeScroll"
            });
        });
    }

    try {
        //input 달력 포커스 시 달력폼 노출
        if ( $('.input_calendar').length ) fnCalendalFocus();
    } catch(e) {
        console.log('calendar publishing...');
    }

    setCategoryButton('category_grids');
    openTodayFloatingBanner('open_msg_reservation');
    msgSwipe.init();
    customSelectBox.init();
    // lastSubOption.init();
    calendarBox.init();
    commonTab.init();
    fnSelectbox();
    brandCategory.init();
    try {
        if(bigBanner) {
            bigBanner.restartCycle('.tab2');
        }
    } catch(e) {}

    if($(".randing_page, .brand_site").length) {
        $('header').addClass('block');
        if($('.randing_page, .brand_site').children('.visual').eq(0)) {
            var target = $('.randing_page, .brand_site').children('.visual').eq(0).find('img');
             if(target.outerHeight(true) > 30) {
                $(".common_tab").css('display', 'inline-block');
             } else {
                $('.randing_page, .brand_site').children('.visual').eq(0).find('img').load(function() {
                    commonTab.setTabPosition();
                });
             }
        }
    }
});

function showInduceBanner() {
    $('.app_induce').find('.banner_close').click(function() {
        closeInduceBanner();
    });

    $('.app_induce').find('.app_induce_comment_2').click(function() {
        closeInduceBanner();
    });

    $('html').css('overflow-y', 'hidden');
    $('.app_induce').css('display', 'inline-block');
}

function setPopupCookie(name) {
    var key = name + "_" + (new Date()).getDate();
    setCookie(key, 'view', 1);
}

function closeInduceBanner() {
    $('html').css('overflow-y', 'auto');
    $('.app_induce').css('display', 'none');

    var key = "induce_" + (new Date()).getDate();
    setCookie(key, 'view', 1);
}

function closeTodayBanner(target) {
    var cookieKey = target + "_" + (new Date()).getDate();
    setCookie(cookieKey, 'view', 1);

    $('.' + target).hide();
}

function closeEventBanner(name) {
    var key = name + "_" + (new Date()).getDate();
    setCookie(key, 'view', 1);

    $('.' + name).hide();
}

function closePromotionBanner(name) {
    var cookieKey = name + "_" + (new Date()).getDate();
    setCookie(cookieKey, 'view', 1);

    OTWOJOB.layerClose();
}

function openTodayFloatingBanner(name) {
    if($("." + name).length ) {
        var key = name + "_" + (new Date()).getDate();
        var cookie = getCookie(key);
        if(cookie != 'view') {
            $('.'+ name).css('display', 'inline-block');
        }
    }
}

function openFloatingBanner(name) {
    if($("." + name).length ) {
    	$('.'+ name).css('display', 'inline-block');
    }
}



function setCategoryButton(grids) {

    if($("." + grids).length && !$("." + grids).hasClass('complete')) {
        $("." + grids).each(function() {
            var idx = 0;
            $(this).find('.c_button').each(function() {
                if($(this).find('i').length < 1) {
                    $(this).prepend('<i></i><br>');
                }
            });

            /*$(this).find('.c_button').children('i').each(function() {
                if($(this).parent().hasClass('c_all')) {
                    return true;
                } else {
                    if($(this).parent().hasClass('selected')) {
                        $(this).css({
                            backgroundPosition: '0 -' + (idx*192 + 128) + 'px'
                        });
                    } else {
                        $(this).css({
                            backgroundPosition: '0 -' + (idx*192) + 'px'
                        });
                    }
                    idx++;
				}

            });*/

            if(grids == 'best_categories') {
                /*               $('.category_toggle').removeClass('reverse');
                               $('.category_toggle').find('span').html('접기');*/

                $('.index01').css('display', 'inline-block');
                $('.index02').css('display', 'inline-block');
                $('.index03').css('display', 'inline-block');
                $('.index04').css('display', 'inline-block');

                $(this).find('.sub_category').each(function() {
                    setPagingCategory(this);
                });

                $('.index03').css('display', 'none');
                $('.index04').css('display', 'none');

                // $('.category_toggle').click();
            }

            $(this).find('.c_button').click(function() {
                /*if($(this).hasClass('c_all')) {
                	return true;
                }*/
                var _this = this;
                var target = (this.id).replace('main_c_', '');
                if($(this).hasClass('rank_b')) {
                    target = (this.id).replace('main_b_', '');
                }

                if(!$(this).hasClass('selected')) {
                    resetCategoryButton(grids);
                    // $('#'+this.id).attr('disabled', 'disabled');
                    $(this).addClass('selected');

                    if($(_this).hasClass('c_all')) {
                        $('.sub_category').hide();
                    } else {
                        $('.sub_category').hide();
                        if($(this).hasClass('rank_b')) {
                            $('#sub_b_'+target).css('display', 'inline-block');
                            $('#sub_b_'+target).animate({height: 'auto'}, 500);
                        } else {
                            $('#sub_c_'+target).css('display', 'inline-block');
                            $('#sub_c_'+target).animate({height: 'auto'}, 500);
                        }
                    }
                } else {
                    $(this).removeClass('selected');
                    if($(this).hasClass('rank_b')) {
                        $('#sub_b_'+target).hide();
                        $('#sub_b_'+target).animate({height: '0px'}, 200);
                    } else {
                        $('#sub_c_'+target).hide();
                        $('#sub_c_'+target).animate({height: '0px'}, 200);
                    }
                }

                resizeContent();
            });
        });

        $("." + grids).addClass('complete');
    }

    /*   if($('.category_grid').length) {
           $('.category_grid').each(function() {


               $(this).addClass('complete');
           });
       }*/
}

function setPagingCategory(target) {
    if($(target).children('.sub_paging').children().length > 1) {
        var pagingRow =  '<div class="list_control">' +
            '                <button type="button" class="prev"><img src="//images.otwojob.com/image/mobile/common/ico_subslider_prev.png" alt=""></button>' +
            '                <p class="page_idx">' +
            '                    <span class="current"></span>' +
            '                    <span class="divider">/</span>' +
            '                    <span class="total"></span>' +
            '                </p>' +
            '                <button type="button" class="next"><img src="//images.otwojob.com/image/mobile/common/ico_subslider_next.png" alt=""></button>' +
            '            </div>';

        var idx = 0;
        $(target).children('.sub_paging').children().each(function(t) {
            if($(this).find('b').length > 0) {
                idx = t;
            }
        })

        $(target).append(pagingRow);
        $(target).find('.current').html(idx+1);
        $(target).find('.total').html($(target).find('.sub_paging').children('div').length);

        $('.index01').css('display', 'inline-block');
        $('.index02').css('display', 'inline-block');
        $('.index03').css('display', 'inline-block');
        $('.index04').css('display', 'inline-block');

        var _this = $(target);
        var slider = $(target).children('.sub_paging').bxSlider({
            pager: false,
            controls: false,
            startSlide: idx,
            touchEnabled: false,
            nextSelector: $(this).find(".next"),
            prevSelector: $(this).find('.prev'),
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                _this.find('.current').html(newIndex+1);
            }
        });
        $(target).find(".prev").click(function() {
            slider.goToPrevSlide();
        });
        $(target).find(".next").click(function() {
            slider.goToNextSlide();
        });
    }
    $(target).css({
        opacity: '1',
        display: 'none'
    });
}

function callNextPage(tabIdx, targetLink, isSlide, isCurrentPage, isFlicking) {
    $('#content').find('.tab' + tabIdx).html('');

    $.ajax({
        type: 'GET',
        url: targetLink,
        dataType: 'html',
        cache: false,
        async: true,
        success: function (data) {
            $('#content').find('.tab' + tabIdx).html(data);

            if($('.gnb.orderjob').length) {
                OTWOJOB.orderjobgnb();
            }

            if($('.best_categories').length) {
                setCategoryButton('best_categories');
            }

            // if ( $('footer').length ) OTWOJOB.footerInfos();

            if(tabIdx == parseInt($('#currentTabIdx').val())) {
                var target = $('.tab' + $('#currentTabIdx').val()).find('.contents_scroll');
                var footer = $('.tab' + $('#currentTabIdx').val()).children('.footer').outerHeight(true);
                if(footer == 0) {
                    footer = 200;
                }
                $('#content').height(target.outerHeight(true) + footer + 10);

                if($('#final_image_guide').length) {
                    $('#final_image_guide').load(function() {
                        var footer1 = $('.tab' + $('#currentTabIdx').val()).children('.footer').outerHeight(true);
                        if(footer == 0) {
                            footer1 = 200;
                        }

                        $('#content').height(target.outerHeight(true) + footer1 + 10);
                    });
                }
            }

            //bigBanner.init();
            bigBanner.destroyCycle('.tab'+tabIdx);
            bigBanner.restartCycle('.tab'+tabIdx);

            slideCard.init();
            brandCategory.init();

            if($('.list_slide').length && !$('.list_slide').hasClass('mCustomScrollbar')) {
                $('.list_slide').each(function() {
                    var listWidth = 0;

                    $(this).find('li').each(function() {
                        var w = $(this).width();
                        $(this).width(w);
                        listWidth += $(this).width() + 15;
                    });

                    $(this).find('ul').width(listWidth);
                    $(this).mCustomScrollbar({
                        axis : 'x'
                    });
                });
            }

            if($('.free_scroll').length && !$('.free_scroll').find('.eg-flick-viewport').length) {
                $('.free_scroll').each(function() {
                    var flicking1 = new eg.Flicking(".free_scroll", {
                        gap: 10,
                        circular: true,
                        moveType: "freeScroll"
                    });
                });
            }

            if(!isSlide || isSlide == undefined) {

                $('#content').find('.tab' + tabIdx).hide();
                //$('footer').hide();
                setTimeout(function() {  $('#content').find('.tab' + tabIdx).show();  }, 0.1);
            }

            if(isSlide) {
                try { /* front 단 공통 메소드 */
                    CommonUtil.completeSwipe();
                } catch(e) {}
            }

            if(isCurrentPage) {
                $('.tab' + tabIdx).show();
                var target = $('.tab' + tabIdx).find('.contents_scroll');

                var footer2 = $('.tab' + $('#currentTabIdx').val()).children('.footer').outerHeight(true);
                if(footer == 0) {
                    footer2 = 200;
                }

                $('#content').height(target.outerHeight(true) + footer2 + 10);

                if($('.randing_page, .brand_site').length) {
                    $('.randing_page, .brand_site').find('img').each(function() {
                        $(this).load(function() {
                            resizeContentHeight();
                        });
                    })
                }


                if(isFlicking) {
                    setTimeout(function() {
                        $(window).scrollTop(1);
                        resizeContentHeight();
                    }, 1);
                } else {
                    setTimeout(function() {
                        var scrollTopStr = localStorage.getItem('main_scrollTop');
                        var scrollTop = 1;
                        if(scrollTopStr && $('.tab' + $('#currentTabIdx').val()).find('.contents_table').length) {
                            scrollTop = parseInt(scrollTopStr);
                        } else {
                            localStorage.setItem('main_scrollTop', '1');
                        }
                        $(window).scrollTop(scrollTop);

                        if($('.main_contents .big').length) {
                            $('.main_contents .big').each(function() {
                                mainAds.setSize(this);
                            });
                        }
                    }, 500);
                }

            }
        }
    });
}

function resizeContentHeight(elem) {
    if($('#currentTabIdx').val()) {
        var tabIdx = $('#currentTabIdx').val();
        var target = $('.tab' + tabIdx).find('.contents_scroll');

        // $('#content').height(target.outerHeight(true) + 380);
        if(elem) {
            $('#content').height(target.outerHeight(true) + $(elem).parent().parent().outerHeight(true));
        } else {
            $('#content').height(target.outerHeight(true) + $('.footer').outerHeight(true));
        }
    }
}

function toggleFooterInfos(elem) {
    var target = $(elem);
    var infosCont = target.parent().find('.infos_txt');
    if (!target.hasClass('on')) {
        infosCont.show();
        target.addClass('on');
    } else {
        infosCont.hide();
        target.removeClass('on');
    }

    resizeContentHeight(elem);
}

function resizeContent() {
    var target = $('.tab' + $('#currentTabIdx').val()).find('.item_wrap');
    var isWrap = true;
    if(target == null || target == undefined || target.length < 1) {
        target  = $('.tab' + $('#currentTabIdx').val()).find('.contents_scroll');
        isWrap = false;
    }

    if(target.length < 1) {
        return;
    }

    if(target.outerHeight(true) && target.outerHeight(true) != null) {
        if(isWrap) {
            $('#content').height(target.outerHeight(true) + 550);
        } else {
            $('#content').height(target.outerHeight(true) + 240);
        }

    }
}

function setFoucsRequired(selector) {
    var target = $(selector);
    if(target.length) {
        target.parent().addClass('required');
        target.focus();
    }
}

function closeTooltip(target) {
    $(target).parent().css('z-index', '0').hide();
}

function toggleMessage(target) {
    var parent = $(target).parent();
    if(parent.hasClass('on')) {
        parent.removeClass('on');
    } else {
        parent.addClass('on');
    }
}

function fnSelectbox() {
    $('body').on('change', '.selectbox select', function () {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
    });
}

function tooltip_open(_this) {
    var offset = $(_this).offset();
    var myWidth =  $(_this).innerWidth();
    var myHeight =  $(_this).innerHeight();
    var targetId = $(_this).attr('data-tooltip');
    var gap = $(_this).attr('data-gap');
    var targetWidth = $(_this).attr('data-tooltip-width');
    var PosX = offset.left;
    var PosY = offset.top + myHeight;

    $('.common_tool_tip').hide();

    var position = (PosY+2);
    /*if(gap) {
        position = position - gap;
    }*/

    var left = '10px';
    var right = '';
    var width =  $(document).width() - 20;
    var transform = '';
    if(targetWidth) {
        left = '50%';
        transform = 'translateX(-50%)'
        width = targetWidth;
    }
    if($(_this).hasClass('left')) {
        if(PosX < 10) {
            left = '0px';
        } else {
            left = (PosX - 10) + 'px';
        }
        transform = '';

        if($(window).width() < (parseInt(targetWidth) + parseInt(PosX) - 10)) {
            left = 'initial';
            right = '10px';
        }
    }

    $('#'+ targetId).css({
        'width' 	: width + 'px',
        'top'      : position + 'px',
        'left'     : left,
        'right' : right,
        'transform' : transform,
        'position' : 'absolute',
        'z-index'  : '2321',
    }).show();

    if(targetWidth) {
        if(right == '') {
            $('#'+ targetId).find('.arrow').css({
                'left'      : PosX - ($('#'+ targetId).offset().left) +'px'
            })
        } else {
            $('#'+ targetId).find('.arrow').css({
                'left'      : PosX - ($('#'+ targetId).offset().left - (myWidth / 2) + 5) +'px'
            })
        }
    } else {
        $('#'+ targetId).find('.arrow').css({
            'left'      : PosX + (myWidth/2) - 15 +'px'
        })
    }
}

var commmLayer = {
    show: function(name) {
        $('header').hide();
        $('.content').hide();
        $('footer').hide();
        $(".aside_menu").hide();
        $('.' + name).show();
    },
    close: function(name) {
        $('header').show();
        $('.content').show();
        $('footer').show();
        $(".aside_menu").show();
        $('.' + name).hide();
    }
}

var brandCategory = {
    init: function() {
        var target = $('.category_list');
        target.each(function() {
            var _this = $(this);
            if(_this.length && !_this.hasClass('mCustomScrollbar')) {
                var total = 0;
                _this.find('li').each(function() {
                    var width = $(this).outerWidth(true);
                    total += width;
                });

                if(total > $(window).width()) {
                    _this.children('ul').width(total+10);
                    _this.children('ul').addClass('swipe');
                    _this.mCustomScrollbar({
                        scrollInertia : 500,
                        axis : 'x'
                    });

                    if($('.category_list .in_wrap').children('li.selected').length) {
                        _this.mCustomScrollbar('scrollTo', $('.category_list .in_wrap').children('li.selected').eq(0), {
                            scrollInertia: 500
                        });
                    }


                    var row = '<button class="toggle_list" type="button" onclick="brandCategory.toggle(this)"></button>';
                    _this.prepend(row);
                } else {
                    _this.addClass("full");
                }
            }
        });

    },
    toggle: function(_this) {
        var target = $(_this);
        if(target.hasClass('on')) {
            target.removeClass("on");
            $('.category_full_list').removeClass('on');
            $('.category_full_list').children('ul').empty();
        } else {
            var list = $('.category_list').find('.in_wrap').html();
            $('.category_full_list').children('ul').html(list);

            $('.category_full_list ul li').each(function() {
                var id = $(this).attr('id');
                $(this).attr('id', id + '_sub');
            });

            target.addClass("on");
            $('.category_full_list').addClass('on');
        }
    },
    select: function(idx) {
        $('.category_list .in_wrap').each(function() {
            $(this).children('li').removeClass('selected');
            if(typeof idx == 'string') {
                var target =  $('#category_' + idx);
               if(idx == '') {
                   target =   $(this).children('li').eq(0);
               }

               target.addClass('selected');

                if($(this).hasClass('swipe')) {
                    $('.category_list').mCustomScrollbar('scrollTo', target, {
                        scrollInertia: 500
                    });
                }

                if($('.category_full_list ul li').length) {
                    $('.category_full_list ul li').removeClass('selected');
                    $('#category_' + idx + "_sub").addClass('selected');
                }
            } else {
                $(this).children('li').eq(idx).addClass('selected');

                if($(this).hasClass('swipe')) {
                    $('.category_list').mCustomScrollbar('scrollTo', $(this).children('li').eq(idx), {
                        scrollInertia: 500
                    });
                }

                if($('.category_full_list ul li').length) {
                    $('.category_full_list ul li').removeClass('selected');
                    $('.category_full_list ul li').eq(idx).addClass("selected");
                }
            }
        });
    }
}

var protectionBlock = {
    tab : function(idx) {
        var target = $('.faq_list01').eq(idx);

        $('.sub_tabs').children('button').removeClass('selected');
        $('.sub_tabs').children('button').eq(idx).addClass('selected');

        $('.faq_list01').each(function() {
            $(this).removeClass('on');
        });
        target.addClass('on');
    }
}

var buyOptionBox = {
    init: function() { },
    click: function(target) {
        var parent = target.parent();
        if(parent.hasClass('on')) {
            parent.removeClass('on');
            // target.next().css('position', 'absolute');
            target.next().animate({
                height: 0
            }, 400, function() {
                target.next().hide();
            });

        } else {
            parent.addClass('on');
            target.next().css('height', 'auto');
            target.next().slideDown(400);
            target.next().css("display", 'inline-block');
        }
    },
    close: function(_target) {
        var target = $(_target);
        var parent = target.parent();
        parent.removeClass('on');
        // target.next().css('position', 'absolute');
        target.next().animate({
            height: 0
        }, 400, function() {
            target.next().hide();
        });
    }
}

function openLay(name) {
    if($('#' + name).length) {
        $('#' + name).show();
    } else {
        $('.' + name).show();
    }
}

function openLayExtend(name) {
    if($('#' + name).length) {
        $('#' + name).show();
    } else {
        $('.' + name).show();
    }
}

function layerClose(name) {
    $('.' + name).hide();
}

function toggleNextElement(elem, informs) {
    var target = $(elem).next();
    var className = $(elem).attr('class');
    if($(elem).hasClass('on')) {
        target.slideUp(250);
        $(elem).removeClass('on');
    } else {
        // $('.' + className).removeClass('on');
        // $('.' + informs).slideUp(250);

        target.slideDown(250);
        $(elem).addClass('on');

        setTimeout(function() {

            $('html, body').animate({
                scrollTop : ($(elem).offset().top - 85)
            }, 250);
        }, 300);
    }
}

function moveToElement(target, gap) {
    var offsetTop = $(target).offset().top;
    if(gap) {
        offsetTop = offsetTop + gap;
    }

    $(window).scrollTop(offsetTop);
}