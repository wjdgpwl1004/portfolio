/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Top Menu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	Tmenu_setting_new();
});
function Tmenu_setting_new(codes){
	var obj = $("#header");
	var Tmenu = $("#gnb>ul");
		Tmenu.a = Tmenu.find(" a");

	var gnb_obj = $("#gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a"); 

	$('<div id="slide_map"><strong class="slide_map_titles">전체메뉴보기</strong><div class="binds"></div></div>').prependTo($("#wrap"));
	Tmenu.clone(false).appendTo($("#slide_map > .binds"));
	for(var r=0; r<$("#slide_map > .binds>ul>li").size(); r++){
		var lis = $("#slide_map > .binds>ul>li").eq(r);
		lis.addClass("line_"+(r+1));
		if(lis.find(">ul").size() != 0){
			lis.addClass("child");
			for(var i=0; i<lis.find(">ul>li").size(); i++){
				var lis2 = lis.find(">ul>li").eq(i);
				if(lis2.find(">ul").size() != 0){
					lis2.addClass("child");
				}
			}
		}
	}

	var objm = $("#slide_map .binds");
		objm.a = objm.find(" a");

	//objm.find(">ul>li>ul>li>ul").remove();//3뎁스제거
	objm.a.click(function(){
		if($(this).siblings("ul").size() != 0){
			if($(this).siblings("ul").is(":hidden")){
				$(this).siblings("ul").slideDown(200);
				$(this).addClass("on");
			} else {
				$(this).siblings("ul").slideUp(200);
				$(this).removeClass("on");
			}
			return false;
		} else {
			return true;
		}
	});

	setTimeout(function(){
		gnb_def();
	},100);
	
	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
		
	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});

	function gnb_def(){
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find("ul.on").removeClass("on");
	}
	
	function gnb_open(idx){
		gnb_obj.li.find(">a.on").removeClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
	}

}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	전체메뉴 클릭시 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	menu_all_AC();
});

function menu_all_AC(){
	var btn = $(".btn_menu_all");
	var btn_close = $(".btn_menu_all_close");

	btn.click(function(){
		if(!$("body").hasClass("pc")){
			if(!$("body").hasClass("gnb")) $("body").removeClass("search").addClass("gnb");
			return false;
		} else {
			return true;
		}
	});

	btn_close.click(function(){
		if($("body").hasClass("gnb")) $("body").removeClass("gnb");
		if($("body").hasClass("search")) $("body").removeClass("search");
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$("a.print").click(function() { //이벤트 발생시킬 버튼 아이디

		printContents($('#content').html());

		// printElem({ 
		// 	printMode: 'popup',
		// 	pageTitle:'프린트 미리보기', //팝업 타이틀
		// 	printDelay : 1000,
		// 	leaveOpen:false, //인쇄하고도 창을 띄우기(true)/안띄우기(false). Default는 false
		// 	printBodyOptions : {
		// 		classNameToAdd : 'user',
		// 		styleToAdd: 'width:1023px; overflow-x:hidden;'
		// 	}
		// }); 
		return false;
	});
});

function printContents(data) {
	console.log(data);
	var head = $('head').html().replace('<script src="/js/slc/js.js"></script>', '');
	console.log(head);
	var mywindow = window.open('', 'my div', 'height=400,width=600');
	mywindow.document.write('<html><head><title>프린트 미리보기</title>');
	mywindow.document.write(head + '</head><body class="user" style="width:1023px; overflow-x:hidden;"><div id="content">');
	mywindow.document.write(data);
	mywindow.document.write('</div></body></html>');
	mywindow.document.close(); // IE >= 10에 필요
	mywindow.focus(); // necessary for IE >= 10
	setTimeout(function () {
		mywindow.print();
		mywindow.close();
	}, 1000);
	return true;
}

// function printElem(options){	
// 	$('#content').printElement(options); //팝업으로 띄울 영역 Div 아이디
// }


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	탑 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//floatingTop
$(document).ready(function() {
	$( '.top_btn' ).click( function() {
		$( 'html, body' ).animate( { scrollTop : 0 }, 400 );
		return false;
	});

});

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

차트 슬라이드 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".chart_area").size() != 0){
		sceneSlide();
	}
});

function sceneSlide(){
	 var swiper = new Swiper('.swiper-container', {
		slidesPerView: 2,
		// spaceBetween: 30,
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
		 breakpoints: {
		    640: {
		      slidesPerView: 1,
		    //   spaceBetween: 15,
		    }
		  }
		});

}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

 탭 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".notice_wrap").size() != 0){
		toristAC();
	}
	$(window).resize(function(){
		if(!$(".notice_wrap .notice_tab").is(":hidden")){
			toristAC();
		}
	});
});
function toristAC(){
	var obj = $(".notice_wrap");
	obj.tab = obj.find(" .notice_tab>a");
	obj.cont = obj.find(" .tab_cont");


	obj.tab.click(function(){
		var idx = $(this).index();
		obj.tab.removeClass("on");
		$(this).addClass("on");
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");

		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

sitemap Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($("#sitemap").size() != 0){
		$("#gnb >ul").clone(false).appendTo($("#sitemap"));
	}
});









































