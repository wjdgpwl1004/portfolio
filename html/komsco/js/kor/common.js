/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Menu Function
	
	ex)
	var Tmenu_code = "0101";//메뉴코드
	Tmenu_setting(Tmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(str){
	var params = str;
	var code = new Array();	
		
	code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기	
	
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#header #nav"); 
		gnb_obj.blind = $("#nav > #blind"); 
		
	//default
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
	
	gnb_obj.li.ul.mouseenter(function(){
		var idx = $(this).parent().index();
		
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).siblings("a").addClass("on");
		gnb_obj.li.ul.not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		var idx = $(this).parent().parent().parent().index();

		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},300);
		gnb_obj.blind.stop().animate({"height":0+"px"},300);
		
		
		
		if(code[0] > -1){
			var obj = gnb_obj.li.eq(code[0]);
			obj.find(">a").addClass("on");
			
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");

				}
			}
			
		}
	}
	
	function gnb_open(idx){
		$("#header").addClass("on");	
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH -2).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
	}
	
	//Sitemap
	$(".allmenu_btn").click(function(){
		if($("#gnb").is(":hidden")){
			if(!$("#slide_map").is(":hidden")){
				$("body").addClass("fixed");
			}
			return false;
		} else {
			return true;
		}
	});
	
	$("#slide_map .inner .close").click(function(){
		if(!$("#slide_map").is(":hidden")){
			$("body").removeClass("fixed");	
		}
		return false;
	});
	
	//Mobile Menu
	var mob_gnb_obj = $("#slide_map"); 
	mob_gnb_obj.box = mob_gnb_obj.find(">.inner"); 
	mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
	mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
	mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
	mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
	mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
	mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
	mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");

//def
mob_def();
$(window).resize(function(){
	mob_def();	
});	
function mob_def(){
	mob_gnb_obj.box.find("a").removeClass("on");

}

mob_gnb_obj.box.gnb.ul.li.a.click(function(){
	if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
	if($(this).siblings("ul").size() != 0){
		mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
		$(this).toggleClass("on").siblings("ul").slideToggle();
		return false;	
	} else {
		return true;	
	}
});

mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
	if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
	if($(this).siblings("ul").size() != 0){
		mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
		$(this).toggleClass("on").siblings("ul").slideToggle(300);
		return false;	
	} else {
		return true;	
	}
});

	
	

}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Totalsearch Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".search_datail").size() != 0){
		js_totalsearch ();
		
	}
});
function js_totalsearch (){
	var btn = $(".search_btn");	
	var obj = $(".search_datail");	
		obj.close_btn = obj.find(".close_btn"); 
		
	btn.click(function() {
		if(obj.is(":hidden")){
			$(this).addClass("on");
			$("#wrap").addClass("fixed");
			obj.show().stop().animate({"opacity":1},300,"easeOutCubic");	
		}
		return false;	
	});	
	
	obj.close_btn.on("click focusout",function() {
		btn.removeClass("on");
		$("#wrap").removeClass("fixed");
		obj.stop().animate({"opacity":0},300,"easeOutCubic",function(){
			$(this).hide();	
		});
		return false;		
	});	
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Slide Script

	ex)
	null : 옆으로 흐르는 배너 형태
	type_02 : 팝업존 형태
	type_03 : 비쥬얼 형태
	type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_slide").size() != 0){
		slide_AC();
	}
});

function slide_AC(){
	var slide = $(".js_slide");

	for(var i=0; i<slide.size(); i++){
		if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
		else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
		else if(slide.eq(i).hasClass("type_04")) slide_type_04(slide.eq(i));//포토슬라이드
		else slide_type_01(slide.eq(i));//배너
	}
}

function slide_type_01(slide){
	//배너
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 4000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//자동재생
	//slide.btn_play.click();

	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");

			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}

		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");

				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}

}

function slide_type_02(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
		if(slide.li.eq(0).is(":animated")) return false;

		var w = -100;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.li = slide.ul.find(">li");
			slide.li.eq(0).css("left",w+"%");
			slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,function(){
			});

			w = 0;

			slide.nums = slide.li.eq(0).attr("data-count");
		} else {
			slide.li.eq(1).stop().animate({"left":"0"},slide.speeds,function(){
				slide.li.eq(0).appendTo(slide.ul);
				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"<span>/"+slide.li.size()+"</span>");
	}
}

function slide_type_03(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.layout").find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//심볼
	$("<ul></ul>").prependTo(slide.controls);
	for(var i=0; i<slide.li.size(); i++){
		$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
	}
	slide.simbols = slide.controls.find(">ul>li");
	slide.simbols.eq(0).find(">a").addClass("on");

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//버튼 : 심볼
	slide.simbols.find(">a").click(function(){
		if($(this).hasClass("on")) return false;
		var idx = slide.simbols.index($(this).parent());
		slide.li.removeClass('on');
		slide.li.removeClass('off');
		slide.li.eq(idx).addClass('on');
		slide.btn_stop.click();
		movement(idx);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");

		var olds = 0;
		var news = 0;

		if(ty == "right"){
			//다음
			olds = slide.nums;
			news = slide.nums + 1;

			slide.li.removeClass('on');
			slide.li.removeClass('off');
			slide.li.eq(olds).addClass('on');
			if(news >= slide.li.size()) news = 0;
		} else if(ty == "left"){
			//이전
			olds = slide.nums;
			news = slide.nums - 1;

			if(news < 1) news = slide.li.size();
		} else {
			//심볼클릭
			olds = slide.nums;
			news = ty+1;
			if(news >= slide.li.size()) news = 0;
		}

		if(slide.li.eq(news-1).is(":animated")) return false;

		slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
			slide.li.eq(olds-1).css("left","100%");
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.li.eq(news-1).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
		});

		slide.nums = news;

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}

function slide_type_04(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//view
	//slide_view
	var setNum = $(".js_slide").index(slide);
	slide.attr("id","slide_view_"+setNum);
	$('<div class="slide_view_'+setNum+'"><span></span><img src="" alt="" /></div>').insertBefore(slide);
	views(0,$(".slide_view_"+setNum));

	//제어
	if(slide.li.size() < 2){
		slide.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	slide.li.find(">a").click(function(){
		var idx = slide.li.index($(this).parent());
		var cl = $(this).parents(".js_slide").attr("id");

		views(idx,$("."+cl));
		return false;
	});

	//view
	function views(idx,obj){
		var idx = idx;
		var titles = slide.li.eq(idx).find(">a").attr("title");
		var imgs = slide.li.eq(idx).find(">a img")[0].src;
		var alts = slide.li.eq(idx).find(">a img").attr("alt");

		slide.li.find(">a.on").removeClass("on");
		slide.li.eq(idx).find(">a").addClass("on");
		obj.find(" img").attr("src",imgs);
		obj.find(" img").attr("alt",alts);
		if(titles){
			obj.find(" span").html("<strong>"+titles+"</strong>"+alts);
		} else {
			obj.find(" span").html(alts);
		}
		
		if(alts == ""){
			obj.addClass("notitle");
		} else {
			obj.removeClass("notitle");
		}
	}

	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");

			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}

		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	board_js Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".board_js").size() != 0){
		js_boardtab ();	
	}
});
function js_boardtab (){
	var obj = $(".board_js >ul");
		obj.li = obj.find(">li");
		obj.li.a = obj.li.find(">strong >a");
		obj.li.ul = obj.li.find(">ul");
		obj.li.more = obj.li.find(">.more_btn");
	
	obj.li.a.first().addClass("on");
	obj.li.ul.first().css({"display":"block"});
	obj.li.more.first().css({"display":"block"});
		
	obj.li.a.on("click focus",function(){
		var t = $(this);
		boardtab_move (obj,t);	
		return false;
	});
}
function boardtab_move (obj,t){
	obj.li.a.not(t).removeClass("on");	
	obj.li.ul.not(t).hide();
	obj.li.more.not(t).hide();		
	t.addClass("on").parent().siblings("ul, .more_btn").css({"display":"block"});	
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto_tab Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function () {
	
	//set init
	$("#btn_0").addClass("on");
	startTopSlider();
	
	
	$("#ul_btns").find("li").click(function(){
		clearTimeout(intv);
		var idx = $(this).attr("id").split("_")[1];
		$('.tab_view').removeClass('on');
		$('.tab_view').eq(idx).addClass('on');
		setBnr(idx, "#ul_btns > li" , "on" );
		
	});

});

var intv;
var current = 1;
var sIdx = 0;
var sCnt =  2;

function startTopSlider() {
	intv = setTimeout(moveBtn, 3000);
}

function moveBtn() {
	let idx = current++ % sCnt;
	$("#ul_btns").find("li").eq(idx).click();
	$('.tab_view').removeClass('on');
	$('.tab_view').eq(idx).addClass('on');
	intv = setTimeout(moveBtn, 3000);
}

function setBnr(idx, allTab, addCls) {
	$(allTab).removeClass(addCls);
	$(allTab).eq(idx).addClass(addCls);
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	quickBox Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".quickBox").size() != 0){
		quickBox_AC();
	}
});
function quickBox_AC(){
	var gong_u_obj = $(".quickBox");
		gong_u_obj.btn = gong_u_obj.find(".click_area"); 
		gong_u_obj.list = gong_u_obj.find(".view_area");

	gong_u_obj.btn.click(function(){
		if(gong_u_obj.list.is(":animated")) return false;	
		
		if(gong_u_obj.list.is(":hidden")){
			gong_u_obj.btn.addClass("on");
			gong_u_obj.list.fadeIn(200);
		} else {
			gong_u_obj.btn.removeClass("on");
			gong_u_obj.list.fadeOut(200);
		}
		return false;	
	});	
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	좌우 슬라이드 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".business_slide").size() != 0){
		auto_play();
		$('.controls>.prev').on('click',function(){
			stop_play();
			business_move_prev();
		});
		$('.controls>.next').on('click',function(){
			stop_play();
			business_move_next();
		});
	}
});

var sett ="";

function auto_play(){
	clearInterval(sett);
	sett = setInterval(function(){
		business_move_next();
	},3000);	
}

function stop_play(){
	clearInterval(sett);
}

function business_move_prev() {
	var $ul = $('.business_slide ul');
	var $images = $ul.find('>li');
	var $on = $images.filter('.on');
	var idx = $images.index($on);
	var $non = $images.not($on);

	if($on.is(':animated')){
		return false;
	}

	$non.css('left','100%');
	$on.removeClass('on');
	$non.addClass('on');
	$on.stop().animate({'left': '-100%'},1000,'easeInOutQuint', function(){
		$(this).css('left','100%');
	});
	$non.stop().animate({'left':0},1000,'easeInOutQuint', function(){
		
	});

}

function business_move_next() {
	var $ul = $('.business_slide ul');
	var $images = $ul.find('>li');
	var $on = $images.filter('.on');
	var idx = $images.index($on);
	var $non = $images.not($on);
	
	if($on.is(':animated')){
		return false;
	}

	$non.css('left','-100%');
	$on.removeClass('on');
	$non.addClass('on');
	$on.stop().animate({'left': '100%'},1000,'easeInOutQuint',function(){
		$(this).css('left','-100%');
	});
	$non.stop().animate({'left':0},1000,'easeInOutQuint', function(){
	});
}