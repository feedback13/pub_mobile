/**
 * exec
 * @dependencies :
		jquery
		otwojob.vendor.js
		otwojob.util.js
		otwojob.app.js
 *
 */

(function($){

	// gnb
	if ( $('.gnb').length ) OTWOJOB.gnb();

	// title_bar
	if ( $('.title_bar').length ) OTWOJOB.title_bar();

	// fnSearchFocus
	if ( $('.search_wrap').length ) OTWOJOB.fnSearchFocus();

	// all_menu
	if ( $('.all_menu').length ) OTWOJOB.allMenu();

	// list01
	if ( $('.list01').length ) OTWOJOB.list01();

	// detailSearchLayer
	if ( $('.detail_search_layer').length ) OTWOJOB.detailSearchLayer();

	// globalSearch
	if ( $('.search_opener').length ) OTWOJOB.globalSearch();

	// search_bar
	if ( $('.search_bar').length ) OTWOJOB.search_bar();

	// indexSlider
	if ( $('.index_slider').length ) OTWOJOB.indexSlider();

	// indexSlider3
	if ( $('.index_slider_plus').length ) OTWOJOB.indexSlider3();

	// subHeader
	if ( $('.sub_header').length ) OTWOJOB.subHeader();

	// list_type2
	if ( $('.list_type02').length ) OTWOJOB.listType2();

	// sampleImgE
	if ( $('.sample_img_area').length ) OTWOJOB.sampleImgE();

	// asideMenu
	if ( $('.aside_menu').length ) OTWOJOB.asideMenu();

	// tabType1
	if ( $('.tab_btn').length ) OTWOJOB.tabType1();
    if ( $('.tab_btn02').length ) OTWOJOB.tabType1_1();

	// tabType2
	if ( $('.tab_btn').length ) OTWOJOB.tabType2();

	// buttonToggler
	if ( $('.fn_toggle').length ) OTWOJOB.buttonToggler();

	// horizonScroller1
	if ( $('.horizon_scroller01').length ) OTWOJOB.horizonScroller1();

    // horizonScroller2
    if ( $('.horizon_scroller02').length ) OTWOJOB.horizonScroller2();

    // horizonScroller3
    if ( $('.horizon_scroller03').length ) OTWOJOB.horizonScroller3();

    // horizonScroller4
    if ( $('.horizon_scroller04').length ) OTWOJOB.horizonScroller4();

	// horizonScroller5
    if ( $('.horizon_scroller05').length ) OTWOJOB.horizonScroller5();

    // horizonScroller6
    if ( $('.horizon_scroller06').length ) OTWOJOB.horizonScroller6();

	// fixedTolltip
	if ( $('[data-ftooltip]').length) OTWOJOB.fixedTooltip();

    // fixedTolltip
    if ( $('.tool-tip').length || $('.tool-tip-reverse').length || $('.tool-tip-open').length) OTWOJOB.toolTip();

	// orderLayer
	if ( $('.fn_order_trigger').length ) OTWOJOB.orderLayer();

	// footerInfos
	if ( $('.footer').length ) OTWOJOB.footerInfos();

	// transferCharge
	if ( $('.transfer_charge').length ) OTWOJOB.transferCharge();

	// mypageMenu
	if ( $('.my_menu').length ) OTWOJOB.mypageMenu();

	// selectOptions
	if ( $('.select_options').length ) OTWOJOB.selectOptions();

	// tabType
	if ( $('[class^=tab_type]').length ) OTWOJOB.tabType();

	// chargeMethod
	if ( $('.charge_method').length ) OTWOJOB.chargeMethod();

	// faqList
	// if ( $('.faq_list01').length ) OTWOJOB.faqList();

	// inputFile
	if ( $('.input_file_wrap').length ) OTWOJOB.inputFile();

	// itemSlider01
	if ( $('.item_slider_wrap').length ) OTWOJOB.itemSlider01();

	// layerCall
	if ( $('.layer_call_trigger').length ) OTWOJOB.layerCall();

	// tabFunc
	if ( $('.fnTab').length ) OTWOJOB.tabFunc();

	// listType08
	if ( $('.list_type08').length ) OTWOJOB.listType08();

	// orderCont
	if ( $('.order_cont').length ) OTWOJOB.orderCont();

	// msgList
	if ( $('.msg_list_wrap').length ) OTWOJOB.msgList();

	// tabMove
	if ( $('.tab_move').length ) OTWOJOB.tabMove();

	//searchResult
    // if ( $('.search_result').length ) OTWOJOB.searchResult();

	// msgEvent
	if ( $('.msg_system_box').length ) OTWOJOB.msgEvent();

	//keyboardTab
	if ( $('.keyboard_tab').length ) OTWOJOB.keyboardTab();

		//eventflag
	if ( $('.aside_btn').length ) OTWOJOB.eventflag();

	// Window Load
	$(window).on({
		'load.otwojob' : function() {

			// indexSlider2
			if ( $('.index_slider02').length ) OTWOJOB.indexSlider2();
		}
	});

	//layerPopup
	if ( $('.pop_layer2').length ) OTWOJOB.layerPopup.init();
	if ( $('.pop_layer3').length ) OTWOJOB.layerPopup2.init();

	//// 통합형 간편회원가입용
    if ( $('label.member').length ) OTWOJOB.memberCheck();

    // 구매평작성
    if ( $('.assessment_wrap').length ) OTWOJOB.assessment();
    // 리뷰 총평점 애니매이션
    if ( $('.review_total').length ) OTWOJOB.review_total_average();

    if ( $('.tit_layer_wrap').length ) OTWOJOB.messageTitleFix();  <!-- 거래메시지 타이틀 고정 -->

	if($('.aside_menu').length ) OTWOJOB.scrollEventListener();

	try {
        if($('.content').length && $('.content').find('.tab2').length ) OTWOJOB.swipeTabListener();
    } catch(e) {
	    // console.log('is Publish Page');
    }


    //OTWOJOB.disableNegativeTouchScroll();

})(jQuery);

