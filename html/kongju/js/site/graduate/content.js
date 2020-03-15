

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
	$('<div id="slide_map"><span class="slide_blind"></span><div class="inner"><div class="mobile_top"><a href="#close" class="close">닫기</a></div><div class="binds"></div></div></div>').prependTo($("#wrap"));
	$("#nav > #gnb").find(">ul").clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('<div class="toputil"></div>').prependTo($("#slide_map >.inner > .binds"));
	cloneSiteLink.appendTo($("#slide_map >.inner > .binds >.toputil"));
	$('.join .login_areas').clone(false).appendTo(cloneSiteLink);
	$('.join .homes').clone(false).prependTo(cloneSiteLink);
	
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
	
	// mob_gnb_obj.box.gnb.ul.li.ul.li.a.each(function(){
	// 	var i = $(this);
		
	// 	if(i.siblings("ul").size() != 0){
	// 		i.addClass("arrow");	
	// 	}	
	// });
	
	
	mob_def();
	// $(window).resize(function(){
	// 	mob_def();	
	// });	
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
	var btn = $("#header .search_btn, #header .search_btn2");	
	var obj = $(".search_datail");	
		obj.close_btn = obj.find(".close_btn"); 
	var $bugerBtn = $(".user #header .allmenu_btn");	
	
	btn.click(function() {
		if(obj.is(":hidden")){
			btn.addClass("on");
			obj.show().stop().animate({"opacity":1},300,"easeOutCubic");	
			if ($bugerBtn.hasClass('on')) {
				$bugerBtn.click();
			}
		} else {
			obj.close_btn.click();
		}
		
		return false;	
	});	
	
	obj.close_btn.on("click focusout",function() {
		btn.removeClass("on");
		obj.stop().animate({"opacity":0},300,"easeOutCubic",function(){
			$(this).hide();	
			btn.focus();
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

학과현황

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".sec_03").size() != 0){
		imgChange ();
	}
});

function imgChange() {
	var $list = $('.sec_03 .layout div.sec03_wrap ul li a');
	var $imgList = $('.img_area ul li'); 
	var $prevImg = null;

	$list.on("mouseover", function(){
		var idx = $(this).parent().index();
		$imgList.eq(idx+1).find(' img').fadeIn(300);
		$prevImg = $imgList.eq(idx+1).find(' img');
	});

	$list.on("mouseleave", function(){
		$prevImg.fadeOut(300);
		$imgList.eq(0).find(' img').fadeIn(300);
	});
}


