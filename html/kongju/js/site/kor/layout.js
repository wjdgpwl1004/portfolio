

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_langs Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".language").size() != 0){
		js_langs ();
	}
});
function js_langs (){
	var obj = $(".language");	
		obj.btn = obj.find(">.btn_toggle");
		obj.list = obj.find(">ul");
		obj.list.li = obj.list.find(">li");
	
	$("<em class='hidden'>열기</em>").appendTo(obj.btn);	
	
	obj.btn.click(function(){
		if(obj.list.is(":animated")) return false;
		$(this).toggleClass("on").siblings("ul").slideToggle(300);
		if($(this).hasClass("on")){
			$(this).find(">em").text("닫기");
		} else {
			$(this).find(">em").text("열기");
		}
		return false;	
	});
	
	obj.on("mouseleave",function() {
		$(this).find(">.btn_toggle").removeClass("on")
		$(this).find(">ul").slideUp(300);
		obj.btn.find(">em").text("열기");
		return false;
	});
	
	obj.list.li.last().find(">a").on("focusout",function() {
		$(this).parent().parent().siblings("a").removeClass("on")
		$(this).parent().parent().slideUp(300);
		obj.btn.find(">em").text("열기");
		return false;
	});	
}



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
	
	//PC	  
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.tit= gnb_obj.li.find(".gnbtit");
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
	
	$("#nav").mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
		
	gnb_obj.li.a.on("mouseenter focus",function(){
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
		$("#header .header_go").hide();
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
		$("#header .header_go").show();
		$("#header").addClass("on");	
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");
		gnb_obj.li.find(">.gnbtit.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">.gnbtit").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
	}
	
	var cloneSiteLink = $(".site_link").clone(false);

	//slide_map
	$('<div id="slide_map"><span class="slide_blind"></span><div class="inner"><div class="mobile_top"><span>전체메뉴</span><a href="#close" class="close">닫기</a></div><div class="binds"></div></div></div>').prependTo($("#wrap"));
	$("#nav > #gnb").find(">ul").clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('<div class="toputil"></div>').prependTo($("#slide_map >.inner > .binds"));
	cloneSiteLink.appendTo($("#slide_map >.inner > .binds >.toputil"));
	$('.join .login_areas').clone(false).appendTo(cloneSiteLink);

	$('<ul class="join"></ul>').appendTo($("#slide_map >.inner > .binds >.toputil"));
	$('.join .homes').clone(false).appendTo($("#slide_map >.inner > .binds >.toputil .join"));
	$('.join .language').clone(false).appendTo($("#slide_map >.inner > .binds >.toputil .join"));
	$('#slide_map .join .language').find('a span').text('LANGUAGES');
	


	
	var $searchBtn = $(".user #header .search_btn");
	$(".allmenu_btn").click(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			$("body").addClass("fixed");
			$(this).toggleClass("on");
			if($(this).hasClass("on")){
				if($searchBtn.hasClass("on")){
					//$searchBtn.click();
				}
			} else {
				$("body").removeClass("fixed");		
			}
			return false;
		} else {
			$(this).removeClass("on");
			return true;
		}
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
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.find(">a");
	
	mob_gnb_obj.find(".link >.btn_popup").remove();
	
	mob_gnb_obj.box.gnb.ul.li.each(function(){
		//$('<a href="#" class="btn_toggle">열기</a>').prependTo($(this));
	});	
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("arrow");	
		}	
	});
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("arrow");	
		}	
	});
	
	mob_def();
	$(window).resize(function(){
		mob_def();	
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-right":0});
		}
	});	
	function mob_def(){
		mob_gnb_obj.hide();
		mob_gnb_obj.box.find("a").removeClass("on");
		mob_gnb_obj.box.gnb.ul.li.ul.hide();
		
		if($("body#main").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.eq(0).find(">a").addClass("on");
			mob_gnb_obj.box.gnb.ul.li.eq(0).find(">ul").show();
		}
		
		if(code[0] >= 0){
			var obj = mob_gnb_obj.box.gnb.ul.find(">li.sub"+code[0]);
			obj.find(">a").addClass("on");
			obj.find(">a.btn_toggle").text("닫기");
			if(code[1] >= 0){
				var obj = obj.find(">ul").find(">li.sub"+code[0]+"_"+code[1]);
				obj.parent().css({"display":"block"});
				obj.find(">a").addClass("on");
				if(code[2] >= 0){
					var obj = obj.find(">ul").find(">li.sub"+code[0]+"_"+code[1]+"_"+code[2]);
					obj.parent().css({"display":"block"});
					obj.find(">a").addClass("on");
					if(code[3] >= 0){
						var obj = obj.find(">ul").find(">li.sub"+code[0]+"_"+code[1]+"_"+code[2]+"_"+code[3]);
						obj.parent().css({"display":"block"});
						obj.find(">a").addClass("on");
					}
				}
			}
		}
	}
	
	$(".allmenu_btn").click(function() {		
		
		$(".toputil_control .btns").hide();
		$("body").addClass("fixed");
		$("#slide_map").fadeIn(300).focus();
		if(!$(".js_mobile_check").is(":hidden")){
			//MOBILE
			$("#slide_map .inner").stop().delay(0).animate({"margin-right":0},300);	
		}
		return false;
	});
	
	mob_gnb_obj.find(".close").click(function() {
		$(".toputil_control .btns").show();
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").stop().animate({"margin-right":-$("#slide_map .inner").innerWidth()},300,function(){
				mob_gnb_obj.fadeOut();
				$("body").removeClass("fixed");			
			});	
		} else {
			$("body").removeClass("fixed");
			$(".allmenu_btn").focus();			
		}
		return false;	
	});
	
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).hasClass("on")) return false;	
		
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("ul").fadeOut(200);
			$(this).toggleClass("on").siblings("ul").fadeToggle(200);
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
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			return false;	
		} else {
			return true;	
		}
	});
	
	mob_gnb_obj.box.gnb.ul.li.find(">.btn_toggle").click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		
		if($(this).hasClass("on")){
			//$(this).removeClass("on").text("열기");	
		} else {
			//$(this).addClass("on").text("닫기");			
		}
		$(this).siblings("ul").slideToggle(300);
		
		return false;	
	});
	
	mob_gnb_obj.box.find(">.all_open").click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;

		if(!$(this).hasClass("on")){
			$(this).text("사이트맵 전체닫기").addClass("on");
			mob_gnb_obj.box.gnb.ul.li.find(">.btn_toggle").addClass("on").text("닫기");
			mob_gnb_obj.box.gnb.ul.li.ul.slideDown(300);		
		} else {
			$(this).text("사이트맵 전체열기").removeClass("on");	
			mob_gnb_obj.box.gnb.ul.li.find(">.btn_toggle").removeClass("on").text("열기");
			mob_gnb_obj.box.gnb.ul.li.ul.slideUp(300);			
		}

		return false;	
	});
}
	
	

		
	
	
	/*
	$('<div id="slide_map"><span class="slide_blind"></span><div class="inner"><div class="mobile_top"><span>전체메뉴</span><a href="#close" class="close">닫기</a></div><div class="binds"></div></div></div>').prependTo($("#wrap"));
	$("#nav > #gnb").find(">ul").clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('<div class="toputil"></div>').prependTo($("#slide_map >.inner > .binds"));
	cloneSiteLink.appendTo($("#slide_map >.inner > .binds >.toputil"));
	$('.join .login_areas').clone(false).appendTo(cloneSiteLink);

	$('<ul class="join"></ul>').appendTo($("#slide_map >.inner > .binds >.toputil"));
	$('.join .homes').clone(false).appendTo($("#slide_map >.inner > .binds >.toputil .join"));
	$('.join .language').clone(false).appendTo($("#slide_map >.inner > .binds >.toputil .join"));
	$('#slide_map .join .language').find('a span').text('LANGUAGES');
	
	var $searchBtn = $(".user #header .search_btn");
	$(".allmenu_btn").click(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			$("body").addClass("fixed");
			$(this).toggleClass("on");
			if($(this).hasClass("on")){
				if($searchBtn.hasClass("on")){
					$searchBtn.click();
				}
			} else {
				$("body").removeClass("fixed");		
			}
			return false;
		} else {
			$(this).removeClass("on");
			return true;
		}
	});
	
	$("#slide_map .slide_blind").click(function(){
		mob_close();
	});

	$("#slide_map .close").click(function(){
		mob_close();
	});

	function mob_close(){
		if(!$("#slide_map").is(":hidden")){
			$("body").removeClass("fixed");	
			$(".allmenu_btn").removeClass("on");
		}
		return false;
	}


	
	
	mob_def();
	$(window).resize(function(){
		mob_def();	
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-right":0});
		}
	});
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");
		mob_gnb_obj.box.gnb.ul.li.find(">a").siblings("ul").hide();
		var obj;
		if(code[0] > -1){
			obj = mob_gnb_obj.box.gnb.ul.li.eq(code[0]);
			obj.find(">a").addClass("on");
	
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.parent().css({"display":"block"});
				obj.find(">a").addClass("on");
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.parent().css({"display":"block"});
					obj.find(">a").addClass("on");
				}
			}
			
		}else{
			obj = mob_gnb_obj.box.gnb.ul.li.eq(0);
			obj.find(">a").addClass("on").siblings("ul").fadeIn(300);
		}

	}
	
	
	$(".allmenu_btn").click(function() {
		$("#nav .mobile_btns").hide();
		$("#slide_map").fadeIn(300).focus();
		if(!$(".js_mobile_check").is(":hidden")){
			//MOBILE
			$("#slide_map .inner").stop().delay(0).animate({"margin-right":0},300);	
		} else {
			//PC
				
		}
		
		return false;
	});
	mob_gnb_obj.find(".btn_close").click(function() {
		$("#nav .mobile_btns").show();
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").stop().animate({"margin-right":-$("#slide_map .inner").innerWidth()},300,function(){
				mob_gnb_obj.fadeOut(300);	
			});	
		} else {
			$(".allmenu_btn").focus();			
		}
		return false;	
	});
	
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("ul").hide();
			$(this).addClass("on").siblings("ul").fadeIn(300);
			return false;	
		} else {
			return true;	
		}
	});

	for(var i=0; i<mob_gnb_obj.box.gnb.ul.li.ul.li.size(); i++){
		if(mob_gnb_obj.box.gnb.ul.li.ul.li.eq(i).find(">ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.eq(i).find(">a").addClass("child");
		}
	}
	
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
}*/

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Totalsearch Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	//if($(".search_datail").size() != 0){
		js_search();
	//}
});

function js_search(){
	$(".search_btn").click(function() {
		if($(".search_datail").css("display") == "none"){
			//alert('b');
		} else {
			//alert('a');
			
		}
	});	
	$(".search_btn2").click(function() {
		$(".search_btn2").addClass("on");
		$(".search_datail").show().stop().animate({"opacity":1},300,"easeOutCubic");	
		if ($(".user #header .allmenu_btn").hasClass('on')) {
			$(".user #header .allmenu_btn").click();
		}
		return false;
	});	
	$(".search_datail .close_btn").click(function() {
		$(".search_btn").removeClass("on");
		$(".search_btn2").removeClass("on");
		$(".search_datail").hide().stop().animate({"opacity":0},300,"easeOutCubic",function(){
			$(this).hide();	
			$(".search_btn").focus();
			$(".search_btn2").focus();
		});
		return false;	
	});
		
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

relate_site Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".relate_site").size() != 0){
		js_relate ();
	}
});
function js_relate (){
	var obj = $(".relate_site >li"); 
	
	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">a"); 
			t.ul = t.find(">ul"); 
			t.ul.li = t.ul.find(">li"); 
		$("<em class='hidden'>열기</em>").appendTo(t.btn);		
			
		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;
			
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			if($(this).hasClass("on")){
				$(this).find(">em").text("닫기");
			} else {
				$(this).find(">em").text("열기");
			}
			return false;
		});
		t.on("mouseleave",function() {
			$(this).find(">a").removeAttr("class");
			$(this).find(">ul").slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
		
		t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});		
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

familyBtn_loc Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function() {
	var familyBtn_loc
	$(".slide_quick .family_btn button").attr('title','숨김');
	$(".slide_quick .family_btn button").click(function(){
		familyBtn_loc = $(this).parent().index();
		if($(this).hasClass('on')){ 
			$(".slide_quick .family_btn button").removeClass('on');
			$(".slide_quick .obj").removeClass('on');
			$(".slide_quick .family_btn button").attr('title','숨김');
		}else{
			$(".slide_quick .family_btn button").removeClass('on');
			$(this).addClass('on');
			$(".slide_quick .obj").removeClass('on');
			$(".slide_quick .obj").eq(familyBtn_loc).addClass('on');
			$(".slide_quick .family_btn button").eq(familyBtn_loc).attr('title','열림');
		}
	});
  });





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

schedule__icon Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function(){
	schedule__icon();
	$(window).resize(function(){schedule__icon();});
	$("#schedule").on("click", function() {
		$(this).find(".move").hide().stop().animate({"opacity":0},300,"easeOutCubic");	
	});     
});


function schedule__icon (){
	var window_w = $(window).width();
	if(window_w < 768){
		 $("#schedule .move").removeAttr("style");
	}else{
		  $("#schedule .move").hide().stop().animate({"opacity":0},300,"easeOutCubic");	
	}
}



