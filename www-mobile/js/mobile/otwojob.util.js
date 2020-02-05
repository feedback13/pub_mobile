/**
 * util
 * @dependencies :
		jquery
		otwojob.vendor.js
 *
 */

/**
 * OTWOJOB 전역 객체
 *
*/
OTWOJOB = {};

(function($) {

	'use strict'

	/**
	 * 쿠기 기능
	 *
	 */
	OTWOJOB.cookie = function() {};

	OTWOJOB.cookie.prototype = {

		/**
		 * 쿠키 생성
		 *
		 */
		set : function(name,value,days) {
			try {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			} catch(e) {
			}
		}

		/**
		 * 인스턴트 쿠키 생성. 브라우저가 실행되고 있는 동만만 유지됨.
		 *
		 */
		, setInstant : function(name, value) {
			try {
				document.cookie = name + "=" + escape(value) + "; path=/;";
			} catch(e) {
			}
		}

		/**
		 * cookie 값 읽어오기
		 *
		 */
		, get : function(name) {
			try {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			} catch(e) {
			}
		}

		/**
		 * cookie 값 지우기
		 *
		 */
		, remove : function(name) {
			try {
				OTWOJOB.cookie.set(name,"",-1);
			} catch(e) {
			}
		}
	}

	/**
	 * mobile check function
	 *
	 */
	OTWOJOB.isMobile = function() {
		try {
			return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dATe|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)))
		} catch(e) {
		}
	};

	/**
	 * 디자인 셀렉트
	 *
	*/
	OTWOJOB.designSelect = function(opts) {

		try {

			var options = {
					target : opts.target
					, duration : 0.2
					, scrollInit : false
					, control : $(opts.target).hasAttr('data-control') ? true : false
					, addClass : opts.addClass ? opts.addClass : ''
				}

			$(options.target).each(function(originIndex) {

				var origin = $(this);

				// remove if module exist
				if ( origin.prev('.uiDesignSelect-wrap').length ) origin.prev('.uiDesignSelect-wrap').remove();

				var originOption = origin.find('option')
					, originDisplay = origin.attr('data-display') ? origin.attr('data-display') : 'inline-block'
					, originDisabled = origin.hasAttr('disabled') ? true : false
					, originWidth = origin.attr('data-width') ? origin.attr('data-width') : null
					, originSelected = originOption.filter(':selected')
					, currentIdx = originSelected.index()
					, select = $('<div class="uiDesignSelect-wrap uiDesignSelect' + (originIndex+1) + ' ' + opts.addClass + '"></div>')
					, optionListWrap = $('<div class="uiDesignSelect-optionList"></div>').appendTo(select)
					, optionList = $('<div class="uiDesignSelect-ul"></div>').appendTo(optionListWrap);

				if ( originWidth === 'full' ) {
					originWidth = origin.parent().width();
				} else if ( origin.attr('data-width') != undefined ) {
					 originWidth = parseInt(origin.attr('data-width'), 10);
				}

				if ( options.control ) {

					var selected = $('<strong class="uiDesignSelect-selected"><button type="button" class="uiDesignSelect-prev"></button><a href="#" class="uiDesignSelect-trigger"><span class="uiDesignSelect-text">' + originSelected.html() + '</span><i class="uiDesignSelect-ico"></i></a><button type="button" class="uiDesignSelect-next"></button></strong>').prependTo(select)
						, btnPrev = selected.find('.uiDesignSelect-prev')
						, btnNext = selected.find('.uiDesignSelect-next');

				} else {
					var selected = $('<strong class="uiDesignSelect-selected"><a href="#" class="uiDesignSelect-trigger"><span class="uiDesignSelect-text">' + originSelected.html() + '</span><i class="uiDesignSelect-ico"></i></a></strong>').prependTo(select)
				}

				if ( originDisabled ) {
					select.addClass('disabled');
				}

				select.css({
					'zIndex' : 30-originIndex
					, 'display' : originDisplay
				});

				origin.addClass('uiOriginSelect uiOriginSelect'+(originIndex+1));
				originOption.each(function(i) {
					var thisHTML = $(this).html();
					$('<div class="uiDesignSelect-li"><a href="#" class="uiDesignSelect-listTrigger">' + thisHTML + '</a></div>').appendTo(optionList);
				});

				select.insertBefore(origin);

				optionListWrap.show().css('position','relative');

				// set Var
				var selectTrigger = selected.find('.uiDesignSelect-trigger')
					, selectedTriggerText = selectTrigger.find('.uiDesignSelect-text')
					, selectedIco = selectTrigger.find('.uiDesignSelect-ico')
					, optionLI = optionListWrap.find('.uiDesignSelect-li')
					, optionTrigger = optionList.find('.uiDesignSelect-listTrigger')
					, optionListWrapHeight = optionListWrap.outerHeight(true)
					, optionListWrapWidth = optionListWrap.outerWidth(true) + selectedIco.width();

				if ( originWidth != null ) {
					optionListWrapWidth = originWidth;
					optionListWrap.width(originWidth);
				}

				// scroll Init
				if ( options.scrollInit ) {
					optionListWrap.mCustomScrollbar({

					});
				}

				optionTrigger.css({
					width : optionListWrapWidth - 2
				});
				selected.css({
					width : optionListWrapWidth + parseInt(selectTrigger.css('border-left-width')) + parseInt(selectTrigger.css('border-right-width'))
				});

				optionTrigger.eq(currentIdx).addClass('uiSelect-active');

				// check slideUp or slideDown
				//checkUpDown();

				// height to 0
				optionListWrap.height(0).css('position','absolute');

				// binding
				if ( !originDisabled ) {
					selectTrigger.on({
						click : function() {
							if ( optionListWrap.hasClass('uiSelect-state-open') ) {
								_hide();
							} else {
								_allHide();
								_show();
							}
							return false;
						}
					});
				}

				if ( options.control ) {
					btnPrev.on({
						click : function() {
							currentIdx -= 1;
							if ( currentIdx < 0 ) currentIdx = optionTrigger.length - 1;

							selectedTriggerText.text(optionTrigger.eq(currentIdx).html());
							_update();
						}
					});

					btnNext.on({
						click : function() {
							currentIdx += 1;
							if ( currentIdx >= optionTrigger.length ) currentIdx = 0;

							selectedTriggerText.text(optionTrigger.eq(currentIdx).html());
							_update();
						}
					});
				}

				optionTrigger.each(function(i) {
					$(this).on({
						click : function() {
							var _this = $(this)
								, thisText = _this.html();

							setTimeout(function() {
								selectedTriggerText.text(thisText);
							}, (options.duration*1000)/2);

							currentIdx = i;

							_hide();
							_update();

							return false;
						}
					});
				});

				$(document).on({
					click : function() {

						var e = e || window.event
							, target = $(e.target);

						if ( !target.parents('.uiDesignSelect-wrap').length ) {
							_hide();
						}
					}
				});

				// check slideUp or slideDown
				function checkUpDown() {
					var bodyHeight = $('body').height()
						, posY = select.offset().top
						, selectHeight = select.height() + optionListWrap.height() + 20;

					if ( bodyHeight < posY + selectHeight ) {
						select.addClass('upSlide');
					}
				}

				// show optionList
				function _show() {
					TweenMax.to(optionListWrap, options.duration, { height : optionListWrapHeight, ease : Power2.easeOut });
					optionListWrap.addClass('uiSelect-state-open');
					selected.addClass('uiSelect-state-open');
				}

				// other select hide
				function _allHide() {
					var otherSelect = $('.uiDesignSelect-wrap').not(select);

					otherSelect.each(function() {
						var thisList = $(this).find('.uiDesignSelect-optionList')
							, thisSelected = $(this).find('.uiDesignSelect-selected');

						TweenMax.to(thisList, options.duration, { height : 0, ease : Power2.easeOut });
						thisSelected.removeClass('uiSelect-state-open');
						thisList.removeClass('uiSelect-state-open');
					});
				}

				// hide optionList
				function _hide() {
					TweenMax.to(optionListWrap, options.duration, { height : 0, ease : Power2.easeOut });
					optionListWrap.removeClass('uiSelect-state-open');
					selected.removeClass('uiSelect-state-open');
				}

				// update to Origin
				function _update() {
					optionTrigger.removeClass('uiSelect-active');
					optionTrigger.eq(currentIdx).addClass('uiSelect-active');
					originOption.removeAttr('selected');
					originOption.eq(currentIdx).attr('selected','selected');
					origin.change();
				}

			});

		} catch(e) {
		}

	};

	/**
	 * jquery 오브젝트로의 스타일을 받아와 객체로 반환한다.
	 *
	 */
	$.fn.getStyleObject = function(){
		try {
			var dom = this.get(0);
			var style;
			var returns = {};
			if(window.getComputedStyle){
				var camelize = function(a,b){
					return b.toUpperCase();
				};
				style = window.getComputedStyle(dom, null);
				for(var i = 0, l = style.length; i < l; i++){
					var prop = style[i];
					var camel = prop.replace(/\-([a-z])/g, camelize);
					var val = style.getPropertyValue(prop);
					returns[camel] = val;
				};
				return returns;
			};
			if(style = dom.currentStyle){
				for(var prop in style){
					returns[prop] = style[prop];
				};
				return returns;
			};
			return this.css();
		} catch(e) {
		}
	};

	/**
	 * 스타일을 카피한다.
	 *
	 */
	$.fn.copyCSS = function(source){
		try {
			var styles = $(source).getStyleObject();
			this.css(styles);
		} catch(e) {}
	}

	/**
	 * hasAttr
	 *
	 */
	$.fn.hasAttr = function(name) {
		try {
			return this.attr(name) !== undefined;
		} catch(e) {
		}
	};

})(jQuery);