(function($) {

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

        //_scroll();

        function _scroll() {
            $(window).on({
                'scroll.header' : function() {
                    scrollTop = $(window).scrollTop();
                    _setGnbFix();
                }
            });
        }

        function _setGnbFix() {

            if ( scrollTop >= OTWOJOB.gnbCurrentTop ) {
                if ( !wrap.hasClass('fixed') ) {
                    wrap.addClass('fixed');
                    wrap.css({
                        position: 'fixed'
                        , left : 0
                        , right : 0
                        , top : 0
                        , display : 'none'
                    });
                    // content.css('margin-top','50px');
                }
            } else {
                if ( wrap.hasClass('fixed') ) {
                    wrap.removeClass('fixed');
                    wrap.css({
                        position: 'relative'
                        , display : 'block'
                    });
                    // content.css('margin-top','0px');
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
        // _createFlicking();
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
                    // content.css('margin-top','50px');
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

        function _createFlicking() {
            if(!wrap.find('.t_gnb').length) {
                _createScroll();
                return;
            }

            wrap.each(function() {
                var wrap1 = $(this);
                var listWidth = 0;
                wrap1.find('.list').find('li').each(function() {
                    var w = $(this).find('a').width();
                    listWidth += $(this).outerWidth(true) + 2;
                    $(this).find('a').width(w + 1);
                });

                var totalWidth = listWidth;
                if($(window).width() < totalWidth) {
                    // $(".t_gnb #gnb_list").width(totalWidth);
                    var flicking2 = new eg.Flicking(".t_gnb #gnb_list", {
                        bound: true,
                        moveType: "freeScroll",
                        circular: false
                    });

                    msgSwipe.setFlicking(flicking2);
                } else {
                    $('.t_gnb').find('.list').find('ul').addClass('full');
                }
            });
        }

        function _createScroll() {

            wrap.each(function() {
                var isTgnb = false;
                if(wrap.find('.t_gnb').length) {
                    isTgnb = true;
                }
               var wrap1 = $(this);
                var listWidth = 0;
                wrap1.find('.list').find('li').each(function() {
                    var w = $(this).find('a').width();
                    if(wrap1.find('.t_gnb').length < 1) {
                        // $(this).width(w);
                    }
                    listWidth += $(this).outerWidth(true) + 2;

                });

                var totalWidth = listWidth;
                if($(window).width() < totalWidth) {
                    wrap1.find('.list').find('ul').width(totalWidth);
                    wrap1.find('.list .in_wrap').mCustomScrollbar({
                        axis : 'x'
                    });
                    wrap1.find('.list').find('a').each(function(i) {
                        var elem = $(this).parent().prev().length ? $(this).parent().prev() : $(this).parent()
                            , thisId = '#' + elem.attr('id');

                        if ( $(this).hasClass('on') ) {
                            wrap1.find('.list .in_wrap').mCustomScrollbar('scrollTo', thisId, {
                                scrollInertia: 0
                            });
                        }

                        $(this).hammer({ preventDefault : true }).on({
                            'tap.move' : function() {

                                wrap1.find('.list').find('a').removeClass('on');
                                $(this).addClass('on');

                                wrap1.find('.list .in_wrap').mCustomScrollbar('scrollTo', thisId, {
                                    scrollInertia: 400
                                });
                            }
                        });
                    });
                } else {
                   /* var gap = $(window).width() - totalWidth;
                    var elemCount = wrap1.find('.list').find('li').length;
                    var elemMargin = gap / elemCount;
                    wrap1.find('.list').find('li').each(function() {
                        // $(this).width(w);
                        $(this).css('margin', '0 ' + (elemMargin/1.5) + 'px');
                    });

                    wrap1.find('.list').find('ul').css('width', 'calc(150vw)');*/
                    $('.t_gnb').find('.list').find('ul').addClass('full');
                }


                // wrap1.find('.list').css('opacity', '1');
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
                    // content.css('margin-top','50px');
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
                    // content.css('margin-top','0');
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
             if (st > lastScrollTop || st == 0 ){
             	wrap.hide();
             } else {
             	wrap.show();

             }
             lastScrollTop = st;
            wrap.show();
        }

        $(window).on({
            'scroll.asideMenu' : scrollEvent
        });

        $('.btn_top').on('click', function(){
            $(window).scrollTop(0);
            $('.aside_menu').animate({
                bottom: '0'
            }, 100);
            $(this).hide();
        });
    }


    OTWOJOB.disableNegativeTouchScroll = function() {
        var initialY = null;
        var nodeStack = [];
        var $window = $(window);

        $window.bind('touchstart', function(e) {
            initialY = e.originalEvent.pageY;
            nodeStack = $(e.target).parents().andSelf().get().reverse();
            nodeStack = nodeStack.map(function(node) {
                return $(node);
            });
        });

        $window.bind('touchend touchcancel', function(e) {
            initialY = null;
            nodeStack = [];
        });

        $window.bind('touchmove', function(e) {

            if (!initialY) {
                e.preventDefault();
            }

            var direction = e.originalEvent.pageY - initialY;

            for (var i = 0; i < nodeStack.length; i +=1) {
                var $node = nodeStack[i];
                var nodeHeight = $node.height();
                var scrollHeight = $node[0].scrollHeight - 2;
                var nodeScrollTop = $node.scrollTop();

                if (scrollHeight > nodeHeight) {
                    // the user is dragging the content up, and the element is already scrolled down a bit.
                    var allowedUp = direction > 0 && nodeScrollTop > 0;

                    // the user is dragging the content down, and the element is up a bit.
                    var allowedDown = direction < 0 && nodeScrollTop < scrollHeight - nodeHeight;

                    if (allowedUp || allowedDown) {
                        return;
                    }
                }
            }

            // disable drag
            e.preventDefault();
        });
    }
})(jQuery);

$(document).ready(function(){
    // bigBanner.init();

    if($('.contents_slide').length) {
        $('.contents_slide').each(function() {
            var listWidth = 0;

            $(this).find('li').each(function() {
                var w = $(this).find('a').width()+15;
                $(this).width(w);
                listWidth += $(this).width();
            });

            $(this).find('ul').width(listWidth);
            $(this).mCustomScrollbar({
                axis : 'x'
            });
        });
    }

    // $("html, body").css({overflow:'hidden'}).bind('touchmove'); //브라우져에 터치를 막아 스크롤을 막는 코드
    $(window).scrollTop(0);

    if(!$(".best_categories").hasClass('complete')) {
        rankingCategory.initCategory('best_categories ');
    }

    if($('.gnb.fixed').length) {
        // $('.md_recommend').css('display', 'inline-block');
        $('.content').css('margin-top', '95px');
    }

    detailHeader.init();
    detailTabBar.init();
    togglePage.init();
    mainAds.init();
});

var bigBanner = {
    init: function() {
        var bannerWrap = $('.main_big_banners');
        if(bannerWrap.length) {
            bannerWrap.each(function() {
               var _this = $(this);
                if(_this.find('.big_banner').length > 1) {
                    _this.find('.main_big_banner_nav').find('span').html('1 / ' + _this.find('.big_banner').length);
                    var duration = _this.find('.main_big_banner').attr('flicking-speed');
                    var width = 'calc(100vw)';
                    var height = 'calc(50vw)';
                    var display = 'inline-block';
                    if(_this.hasClass('c_img')) {
                        width = '100%';
                        height = 'calc(100vw * 262 / 360)';
                        display = 'table';
                    }

                    _this.find('.main_big_banner').css({
                        width: width,
                        display: display,
                        height: height
                    });

                    _this.find('.big_banner').each(function() {
                       var aTag = $(this).children('a');
                       if(aTag.hasClass("vertical_image") || aTag.hasClass("horizontal_image")) {
                           var imageUrl = aTag.children('img').attr('src');
                           var row = '<span style="background-image: url(\''+imageUrl+'\');"></span>';
                           aTag.prepend(row);
                       }
                    });

                    try {
                        var targetId = _this.find('.main_big_banner').attr('id');
                        var flicking = new eg.Flicking('#' + targetId, {
                            circular: true,
                            defaultIndex: 0,
                            duration: parseInt(duration)
                        }).on({
                            // moveEnd: optionhandler
                            flickEnd: bannerOptionhandler
                        });;

                        var timeout = parseInt(_this.find('.main_big_banner').attr('flicking-timeout'));
                        if(this.bannerCycle != undefined) {
                            this.destroyCycle();
                        }

                        if(!_this.hasClass('c_img')) {
                            // flicking.addPlugins(new eg.Flicking.plugins.AutoPlay(timeout, "NEXT"));

                            /*this.bannerCycle = setInterval(function() {
                                flicking.next();
                            }, timeout);*/
                        }
                    } catch(e) {
                        console.error(e);
                    }
                } else {
                    _this.find('.main_big_banner_nav').hide();
                }
            });
        }
    },
    restartCycle: function(target) {
        if(this.banners == undefined) {
            this.banners = {
                '.tab1': undefined,
                '.tab2': undefined,
                '.tab3': undefined
            };
        }

        var bannerWrap = $(target).find('.main_big_banners');
        if(bannerWrap.length) {
            bannerWrap.each(function() {
                var _this = $(this);
                if(_this.find('.big_banner').length > 1) {
                    _this.find('.main_big_banner_nav').find('span').html('1 / ' + _this.find('.big_banner').length);
                    var duration = _this.find('.main_big_banner').attr('flicking-speed');
                    _this.find('.main_big_banner').css({
                        width: 'calc(100vw)',
                        display: 'inline-block',
                        height: 'calc(50vw)'
                    })

                    try {
                        var targetId = _this.find('.main_big_banner').attr('id');
                        //$('#' + targetId).destroy();
                        bigBanner.flicking = new eg.Flicking('#' + targetId, {
                            circular: true,
                            defaultIndex: 0,
                            duration: parseInt(duration)
                        }).on({
                            //moveEnd: optionhandler
                             flickEnd: bannerOptionhandler
                        });;

                        var timeout = parseInt(_this.find('.main_big_banner').attr('flicking-timeout'));

                        if(bigBanner.banners[targetId] != true) {
/*                            flicking.addPlugins(new eg.Flicking.plugins.AutoPlay(timeout, "NEXT"));*/
                            bigBanner.intervals = setInterval(function() {
                                bigBanner.flicking.next();
                            }, timeout);

                            bigBanner.banners[targetId] = true;
                        }
                    } catch(e) {
                        // console.log('flicking catch');
                    }
                } else {
                    _this.find('.main_big_banner_nav').hide();
                }
            });

        } else {
            bigBanner.destroyCycle();
        }

    },
    destroyCycle: function(target) {
        try {
            var key = 'otwojob_main_big_banner';
            var tab = $(".tab" + $('#currentTabIdx').val());
            if(tab.find('#' + key).length < 1) {
                clearInterval(bigBanner.intervals);
                bigBanner.banners[key] = false;
                $('#otwojob_main_big_banner').destroy();
            }
        } catch(e) {}
    },
    destroyPlugin: function() {
        try {
            if(bigBanner.flicking) {
                bigBanner.flicking.removePlugins()
            }
        } catch(e) {console.error(e)}
    }
}

var mainAds = {
    init: function() {
        mainAds.onAnimation = false;

        if($('.main_contents .big').length) {
            $('.main_contents .big').each(function() {
                mainAds.setSize(this);
            });
        }

        $(window).scroll(function() {
            if($('.main_contents .big').length) {
                $('.main_contents .big').each(function() {
                    mainAds.setSize(this);
                });
            }

            if($('.contents_table').length) {
                var tableHeight = 0;
                $('.contents_table td[rowspan="2"]').each(function() {
                    tableHeight += $(this).outerHeight(true);
                });

                if(($('.contents_table').offset().top - $(window).scrollTop()) < 275 && ($('.contents_table').offset().top - $(window).scrollTop()) > 75) {
                    if(!mainAds.onAnimation) {
                        mainAds.onAnimation = true;
                        mainAds.anim = setTimeout(function() {
                            $('.contents_table td[rowspan="2"]').each(function() {
                                $(this).find('.image').addClass('rightSlider');
                            });
                        }, 1000);
                    }
                } else {
                    if(($('.contents_table').offset().top - $(window).scrollTop()) >= (225+tableHeight)||($('.contents_table').offset().top - $(window).scrollTop()) < (275 - tableHeight)) {
                        mainAds.onAnimation = false;
                        $('.contents_table td[rowspan="2"]').each(function() {
                            $(this).find('.image').removeClass('rightSlider');
                        });
                        clearTimeout(mainAds.anim);
                    }
                }

                if(mainAds.scrTop) {
                    clearTimeout(mainAds.scrTop);
                }

                mainAds.scrTop = setTimeout(function() {
                    localStorage.setItem("main_scrollTop", $(window).scrollTop());
                }, 100);
            }
        });
    },
    setSize: function(_this) {
        if(($(_this).find('.image').offset().top - $(window).scrollTop()) < 305) {
            if(($(_this).find('.image').offset().top - $(window).scrollTop()) > 205) {
                var gap = 205 - ($(_this).find('.image').offset().top - $(window).scrollTop());
                var value = 1.1 + (gap * 0.001);
                $(_this).find('img').css('transform', 'translateY(-50%) scale('+value+')');
            }
        } else {
            $(_this).find('img').css('transform', '');
        }
    }
}

var slideCard = {
    init: function() {
        if($('.contents_slide').length && !$('.contents_slide').hasClass('mCustomScrollbar')) {
            $('.contents_slide').each(function() {
                var listWidth = 0;

                $(this).find('li').each(function() {
                    var w = $(this).find('a').width()+20;
                    // $(this).width(w);

                    listWidth += $(this).width();
                });

                $(this).find('ul').width(listWidth);
                $(this).mCustomScrollbar({
                    axis : 'x'
                });
            });
        }

    }
}

var rankingCategory = {
    open : function(idx) {
        var btn = $('#main_b_'+idx);
        var parent = btn.parent();
        if(parent.hasClass('index03') || parent.hasClass('index04')) {
            $('.index01').css('display', 'none');
            $('.index02').css('display', 'none');
            $('.index03').css('display', 'inline-block');
            $('.index04').css('display', 'inline-block');

/*            $('.category_toggle').removeClass('reverse');
            $('.category_toggle').find('span').html('접기');*/
        }
        // if(btn.children('i').css('background-position-y')) {
            resetCategoryButton('best_categories');

            btn.addClass('selected');
            // var positionY = parseInt(btn.children('i').css('background-position-y').replace('px', ''));
            // btn.children('i').css('background-position', '0 ' + (positionY-64) + 'px');

            $('#sub_b_'+idx).css('display', 'inline-block');
            $('#sub_b_'+idx).animate({height: 'auto'}, 500);
        // }

        resizeContent();
        //btn.click();
    },
    reset : function() {
        $('.best_categories').removeClass('complete');
        setCategoryButton('best_categories');
    },
    initCategory: function(idx) {
        this.reset();

        $('.best_categories').find('.sub_category').each(function() {
            if($(this).children('.sub_paging').children().length > 1) {
                setPagingCategory(this);
            }

            $(this).css({
                opacity: '1',
                display: 'none'
            });

        });

        var num = idx;
        if(idx.length > 2) {
            num = idx.substring(0, 2);
        }

        this.open(num);
    }
}

var orderjobCategory = {
    open : function() {
        var target = $('.orderjob_categories');
        target.css('display', 'inline-block');
        target.animate({
            top: 0
        }, 200, function() {
            $('html').css('overflow-y','hidden');
        });
    },
    close : function() {
        var target = $('.orderjob_categories');
        var deviceHeight = $(window).height();
        target.animate({
            top: deviceHeight
        }, 200, function() {
            target.hide();
            $('html').css('overflow-y','auto');
        });
    },
    openCategoryList: function(idx) {

        var target = $('.orderjob_sub_category_'+idx);
        if(target.css('display') == 'none') {
            this.clearCategoryList();
            $('.orderjob_category_'+idx).addClass('on');
            target.css({
                display: 'inline-block'
            });
        } else {
            $('.orderjob_category_'+idx).removeClass('on');
            target.css({
                display: 'none'
            });
        }
    },
    clearCategoryList: function() {
        var targets = $(".category_list").children('.sub_category');

        $(".category_list").children('button').each(function() {
           $(this).removeClass('on');
        });

        targets.each(function() {
            $(this).hide();
        });
    }
}


var titleButton = {
    click : function() {
        this.wrap = $('.gnb');
        this.trigger = this.wrap.find('.opener');
        this.dimmLayer = $('.dimm_layer');
        this.container = this.wrap.children('#gnb').children('div');
        this.btnTItle = $('.btn_title');

        if(this.wrap) {
            if ( this.container.hasClass('list') ) {
                this.openMenu();
            } else {
                this.closeMenu();
            }
        }
    },
    openMenu: function() {
        this.dimmLayer.fadeIn(250);
        $('html').css("overflow-y", 'hidden')

        this.btnTItle.addClass('open');
        this.container.removeClass('list').addClass('open_menu');
        this.trigger.addClass('on');
        titleButton._destroyScroll();
    },
    closeMenu: function() {
        this.dimmLayer.fadeOut(250);
        $('html').css("overflow-y", 'auto');

        this.btnTItle.removeClass('open');
        this.container.removeClass('open_menu').addClass('list');
        this.trigger.removeClass('on');
        titleButton._createScroll();
    },
    _createScroll: function() {
        var listWidth = 0;
        var wrap = $('.gnb');

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
    },
    _destroyScroll: function() {
        var wrap = $('.gnb')

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

var detailSearch = {
    show: function() {
/*        $('header').hide();
        $('.content').hide();
        $('.gnb').hide();
        $('aside').hide();
        $('footer').hide();*/

        $('html').css('overflow-y', 'hidden');
        $('.detail_layer').css('display', 'inline-block');
    },
    close: function() {
        $('html').css('overflow-y', 'auto');
        $('.detail_layer').hide();

        /*$('header').show();
        $('.content').show();*/
        /*$('.gnb').find('li').each(function() {
            if($(this).find('a').hasClass('on')) {
                $('.gnb').find('.list .in_wrap').mCustomScrollbar("scrollTo", "#" + $(this).attr('id'),{
                    scrollInertia:10
                });
            }
        });*/
        /*$('.gnb').css('display', 'inline-block');
        $('aside').show();
        $('footer').show();*/
    }
}

var detailHeader = {
    init: function() {
        if($('.header').hasClass('transparent')) {
            var telIconDate = new Date(2019, 7 - 1, 28, 0, 0, 0);
            if($(".btn_cover_detail.talk").length && !$(".btn_cover_detail.talk").hasClass('new') && telIconDate > (new Date()) && $(".btn_cover_detail.talk").find('span').length) {
                $(".btn_cover_detail.orange").addClass("new");
            }

            var row = '<header class="header" id="second_detail_header" style="opacity: 0.001; border-bottom: 1px solid #eaeaea;">';
            row += $('.header.transparent').html();
            row += '</header>';

            $('.header.transparent').after(row);

            $(window).scroll(function() {
                if($(window).scrollTop() == 0) {
                    $('#second_detail_header').css('opacity', 0.001);
                } else if($(window).scrollTop() > 0 && $(window).scrollTop() < 130) {
                    var opacity = $(window).scrollTop() / 130;

                    $('#second_detail_header').css('opacity', opacity);
                } else {
                    $('#second_detail_header').css('opacity', 1);
                }

                if($(".btn_cover_detail.orange").length && ($(".btn_cover_detail.orange").html()).indexOf('톡톡') > -1) {
                    if($(window).scrollTop() > 130) {
                        $('.btn_cover_detail.orange ').removeClass('talk_bubble');
                    } else {
                        if(!$(".btn_cover_detail.orange").hasClass('talk_bubble')) {
                            $('.btn_cover_detail.orange ').addClass('talk_bubble');
                        }
                    }
                }
            });

            $('.discount').each(function() {
               var value = $(this).text();
               $(this).html(value.replace(/(\s*)/g, ""));
            });
        }

        if($('.career_info').length) {
            var height = 0;
            $('.career_info').children().each(function() {
               height += $(this).outerHeight(true);
            });

            $('.career_info').css('max-height', (height + 5) + 'px');
        }

        if($('.top_btn').length) {
            $('.top_btn').each(function() {
                $(this).click(function() {
                    var id = $(this).attr('id');
                    if($(this).hasClass('on')) {
                        $(this).removeClass('on');
                        $('div[for='+id+']').hide();
                    } else {
                        $(this).addClass('on');
                        $('div[for='+id+']').css('display', 'inline-block');
                    }
                });
            });
        }
    }
}

var detailChart = {
    init: function() {
        google.charts.load('current', {'packages':['corechart']});
    },
    drawChart: function(data, target, multiAxis) {
        google.charts.setOnLoadCallback(function() {
            var leftLength = 10;
            var maxLength = 1;
            for(var i = 1 ; i < data.length ; i++) {
                var d = data[i];
                var axisValue = d[1];
                if(axisValue == undefined) {
                    continue;
                }
                var numDigit = (axisValue.toString()).length;
                if(maxLength >= numDigit) {
                    continue;
                }
                maxLength = numDigit;
                if(numDigit > 1) {
                    leftLength = 20 + (numDigit * 5);
                }
            }

            var options = {
                chartArea:{left:leftLength,right:5, top:20, bottom: 40,width:"100%",height:"100%"},
                legend:{
                    position: 'bottom',
                    alignment: 'end',
                    textStyle: {color: '#999', fontSize: 12}
                },
                title: '',
                width: ($(window).outerWidth(true) - 20), height: 200,
                seriesType: 'bars',
                vAxes:
                    {
                        0: {
                            textStyle: {fontSize: 10, color: '#999'},
                            gridlines: {color: '#eaeaea', count: 2}
                        }
                    }
                ,
                hAxis: {
                    textStyle: {fontSize: 10, color: '#666'}
                },
                // series: {1: {type: "bars",targetAxisIndex:1}},
                colors: ['#94bce4', '#d7e2ed']
            };

            if(multiAxis) {
                var rightLength2 = 20;
                var maxLength2 = 1;
                for(var i = 1 ; i < data.length ; i++) {
                    var d = data[i];
                    var axisValue = d[2];
                    if(axisValue == undefined) {
                        continue;
                    }
                    var numDigit = (axisValue.toString()).length;
                    if(maxLength2 >= numDigit) {
                        continue;
                    }
                    maxLength2 = numDigit;
                    if(numDigit > 3) {
                        rightLength2 = 10 + (numDigit * 6);
                    }
                }

                options.chartArea = {left:leftLength,right:rightLength2, top:20, bottom: 40,width:"90%",height:"100%"},
                options.vAxes = {
                    0: {
                        textStyle: {fontSize: 10, color: '#999'},
                        gridlines: {color: '#eaeaea', count: 2}
                    },
                    1: {
                        textStyle: {fontSize: 10, color: '#999'},
                        gridlines: {color: '#eaeaea', count: 0}
                    }
                }
                options.series = {1: {type: "bars",targetAxisIndex:1}};
            } else {
                options.legend= 'none'
            }

            var series = new google.visualization.arrayToDataTable(data);
            var chart = new google.visualization.ComboChart($(target)[0]);
            chart.draw(series, options);
        });
    }
}

var detailTabBar = {
    init: function() {
        if($('.nav_tab_content').length) {
            $('.nav_tab_content').each(function(t) {
                if(t > 0 && !$(this).hasClass('no_hide')) {
                    $(this).hide();
                }
            });

            // $('.nav_tab_content').eq(1).hide();

            $('.etc_fixed_btn.fn_top').click(function() {
                $('html, body').stop().animate({
                    scrollTop : 0
                }, 450);
            });
        }
        if($('.nav_tab').length) {
            var tabOffset =  $('.nav_tab').offset().top;
            detailTabBar.tabOffset = tabOffset;

            $(window).scroll(function() {
                if(($(window).scrollTop() + 12) >  detailTabBar.tabOffset) {
                    $('.nav_tab').addClass('fixed');
                    if(!$('.nav_tab_content').hasClass('no_hide')) {
                        $('.nav_tab_content').css('margin-top', '40px');
                    }
                } else {
                    if($('.nav_tab').hasClass('fixed')) {
                        $('.nav_tab').removeClass('fixed');
                        $('.nav_tab_content').css('margin-top', '');
                    }
                }
            });
        }
    },
    click: function(idx) {
        if(!$('nav_tab').hasClass('no_hide')) {
            detailTabBar.reset();
            detailTabBar.show(idx);
        }

        $('html, body').stop().animate({
            scrollTop : $('.nav_tab_content').eq(idx).offset().top - $('.nav_tab').outerHeight(true) - 50
        }, 450);
        $('.nav_tab').children('button').eq(idx).addClass('on');
    },
    reset: function() {
        $('.nav_tab').children('button').removeClass("on");

        $('.nav_tab_content').each(function() {
            if(!$(this).hasClass('no_hide')) {
                $(this).hide();
            }
        });
    },
    show: function(idx) {
        $('.nav_tab_content').eq(idx).css('display', 'inline-block');
    }
}

var togglePage = {
    init: function() {
        if($(".toggle_page").length) {
            $(".toggle_page").click(function() {
                var parent = $(this).parent();
                if(parent.hasClass('hide')) {
                    parent.children().each(function() {
                        $(this).css('display', '');
                    });

                    parent.removeClass('hide');
                } else {
                    parent.children().each(function() {
                        $(this).hide();
                        parent.children('.toggle_page').css('display', '');
                        parent.children('.tit').css('display', '');
                    });
                    parent.addClass('hide');
                }
            });
        }
    }
}

var detailImageToggle = {
    click: function(_this) {
        var target = $(_this);
        var parent = target.parent();
        if(target.hasClass('on')) {
            target.removeClass("on");
            parent.css({
               background: 'none'
            });
        } else {
            target.addClass("on");
            parent.css({
                background: ''
            });
        }

        var tabPosition = $(".nav_tab").offset().top;
        detailTabBar.tabOffset= tabPosition;
    }
}

function bannerOptionhandler(e) {
    try {
        var targetId = e.currentTarget.$wrapper.id;
        var parent = $('#' + targetId).parent();
        var html = $('.main_big_banner_nav').find('span').html();
        if(html) {
            var totalPage = html.split('/')[1];
            parent.find('.main_big_banner_nav').find('span').html((e.no+1) + " /" +  totalPage);
            // parent.find('.main_big_banner_nav').find('span').html((e.no+1) + html.substring(1, html.length));
        } else {
            bigBanner.destroyCycle();
        }
    } catch(e) {
        console.log('main Page disabled')
    }
}

function showBigBannerSet(targetId) {
    var targets = $('#'+ targetId).find('.big_banner');
    var divTarget = $(".event_banner_set").html();
    if(divTarget == undefined) {
        divTarget = '<button type="button" onclick="closeBigBannerSet()" class="event_banner_close"><img src="//images.otwojob.com/image/mobile/common/btn-banner-close.png"></button>';
    }
    var row =
        '<div class="event_banner_set" id="event_banner_set">' +
        divTarget;
        // '    <button type="button" onclick="closeBigBannerSet()" class="event_banner_close"><img src="/image/mobile/common/btn-banner-close.png"></button>';

    var arr = [];
    targets.each(function() {
        var src = $(this).find('img').attr('src');
        if(arr.indexOf(src) < 0) {
            row += '<div class="event_banner_div">' +
                '      <a href="'+$(this).find('a').attr('href')+'" onclick="'+$(this).find('a').attr('onclick')+'"  class="main_banner_zone"><img src="'+$(this).find('img').attr('src')+'"></a>' +
                '    </div>';
            arr.push(src);
        }
    });

    $('body').append(row);
    $('#event_banner_set').show();
    $( "#event_banner_set" ).animate({
        top: 0
    }, 200, function() {
        $('html').css('overflow','hidden');
        $('.event_banner_close').show();
    });
}

function closeBigBannerSet() {
    $('.event_banner_close').hide();

    var height = $(window).height();
    $( "#event_banner_set" ).animate({
        top: height
    }, 200, function() {
        $('html').css('overflow','auto');
        // $('.event_banner_set').find('.event_banner_div').remove();
        $('#event_banner_set').remove();
    });
}

function showBookmarkEdit() {
    $('.menu_container').hide();
    $('.bookmark_categories').show();
}

function closeBookmarkEdit() {
    $('.bookmark_categories').hide();
    $('.menu_container').show();
}

function showAllCategory() {
    $('.all_menu').hide();
    $('.all_closer').click();

    // $('html').css('overflow','hidden');
    $('.category_sitemap').css('top', '0px');
    $('.category_sitemap').show();
}

function toggleOrderSelect(ele) {
    var target = $(ele).parent();
    if(target.hasClass('on')) {
        target.removeClass('on');
    } else {
        target.addClass('on');
    }
}