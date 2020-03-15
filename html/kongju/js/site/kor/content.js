/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	header fixed Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#header").size() != 0){
		$(window).scroll(function() {
			//js_header ();
		});			
	}	
});
function js_header (){
	if($(".js_mobile_check").is(":hidden")){
		if($("#header").offset().top  > 100){
			$("#header").addClass("on");
		} else {
			$("#header").removeClass("on");	
		}		
	} else {
		$("#header").removeClass("on");		
	}	
}



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
	var Tmenu = $("#header #gnb");
		Tmenu.ul = Tmenu.find(">ul");
		Tmenu.ul.li = Tmenu.ul.find(">li");
		Tmenu.ul.li.a = Tmenu.ul.li.find(">a");
		Tmenu.ul.li.ul = Tmenu.ul.li.find(">ul");
		Tmenu.ul.li.ul.li = Tmenu.ul.li.ul.find(">li");
		Tmenu.ul.li.ul.li.a = Tmenu.ul.li.ul.li.find(">a");
		Tmenu.ul.li.ul.li.ul = Tmenu.ul.li.ul.li.find(">ul");
		Tmenu.ul.li.ul.li.ul.li = Tmenu.ul.li.ul.li.ul.find(">li");
		Tmenu.ul.li.ul.li.ul.li.a = Tmenu.ul.li.ul.li.ul.li.find(">a");
		Tmenu.blind = Tmenu.find(">#blind");
		Tmenu.intervals = "";
	
	Tmenu.ul.li.each(function(e){
		$(this).addClass("num"+(e+1));			
		$('<strong class="tmenu_ti"><span>'+$(this).find(">a >span").text()+'</span>대전광역시 동구청 홈페이지에 <br />오신것을 환영합니다.</strong>').insertAfter($(this).find(">a"));
	});
	$("<span class='bar'></span>").appendTo(Tmenu);
	$("<span class='blind'></span>").appendTo(Tmenu);
	
	setTimeout(function(){
		Tmenu_def(Tmenu,code);
	},100);

	Tmenu.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent());	
		Tmenu_open(Tmenu,idx);
	});

	Tmenu.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent().parent().parent());
		
		Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},0,function(){$(this).hide();	});
		Tmenu.ul.li.eq(idx).find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
		Tmenu.find(">.bar").show().stop().animate({"opacity":1,"left":($(this).parent().parent().siblings("a").find(">span").offset().left + ($(this).parent().parent().siblings("a").find(">span").innerWidth()/2)) +"px","width":($(this).parent().parent().siblings("a").find(">span").innerWidth()/2)+"px"},300);
		Tmenu.ul.li.a.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">a").addClass("on");
	});

	Tmenu.ul.mouseleave(function(){
		Tmenu.intervals = setTimeout(function(){
			Tmenu_def(Tmenu,code);
		},500);
	});

	Tmenu.ul.mouseenter(function(){
		clearTimeout(Tmenu.intervals);
	});

	Tmenu.ul.find(">li:last >ul >li").last().find(">a").on("focusout",function(){
		Tmenu.intervals = setTimeout(function(){
			Tmenu_def(Tmenu,code);
		},500);
	});
	
	//slide_map
	$('<div id="slide_map"><div class="inner"><div class="binds"></div><a href="#" class="close">닫기</a></div></div>').prependTo($("#wrap"));
	Tmenu.find(">ul").clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('<div class="toputil"></div>').prependTo($("#slide_map >.inner > .binds"));
		
	$(".allmenu_btn").click(function(){
		if($(".js_menu").is(":hidden")){
			if(!$("#slide_map").is(":hidden")){
				if(!$(this).hasClass("on")){
					$("body").addClass("fixed");
				}		
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

	mob_def();
	$(window).resize(function(){
		mob_def();	
	});	
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");
		mob_gnb_obj.box.gnb.ul.li.find(">a").siblings("ul").hide();
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
//PC Open
function Tmenu_open(Tmenu,code){
	if(code == 0) code = "0";
	idx = code;
	
	var obj = Tmenu.ul.li.eq(idx);
	if(obj.find(">ul").is(":animated")) return false;
	
	Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},0,function(){$(this).hide();});
	obj.find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
	Tmenu.find(">.bar").show().stop().animate({"opacity":1,"left":(obj.find(">a >span").offset().left + (obj.find(">a >span").innerWidth()/2)) +"px","width":(obj.find(">a >span").innerWidth()/2)+"px","margin-left":-(obj.find(">a >span").innerWidth()/2)+"px","padding-left":(obj.find(">a >span").innerWidth()/2)+"px"},300);
	Tmenu.find(">.blind").fadeIn(300);
	Tmenu.ul.li.a.removeClass("on");
	obj.find(">a").addClass("on");
	
	if(Tmenu.hasClass("type_01")){
		Tmenu.ul.li.ul.not(":hidden").stop().animate({"opacity":0},100,function(){$(this).hide();});
		obj.find(">ul").show().stop().animate({"opacity":1},100);
		Tmenu.ul.stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);	
		Tmenu.stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);
		Tmenu.blind.show().stop().animate({"height":obj.find(">ul").innerHeight()},300);	
	} else if (Tmenu.hasClass("type_02")){
		Tmenu.maxH = 0;
		for(var i=0; i<Tmenu.ul.li.size(); i++){
			Tmenu.maxH = Math.max(Tmenu.maxH,Tmenu.ul.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		Tmenu.ul.li.ul.innerHeight(Tmenu.maxH).show().stop().animate({"opacity":1},0);
		Tmenu.ul.stop().animate({"height":(Tmenu.maxH + Tmenu.ul.li.a.innerHeight()) +"px"},300);
		Tmenu.stop().animate({"height":(Tmenu.maxH + Tmenu.ul.li.a.innerHeight()) +"px"},300);
		Tmenu.blind.show().stop().animate({"height":Tmenu.maxH +"px"},300);	
	} else if (Tmenu.hasClass("type_03")){
		Tmenu.ul.li.ul.not(":hidden").stop().animate({"opacity":0},100,function(){$(this).hide();});
		obj.find(">ul").show().stop().animate({"opacity":1},100);
	}
}
//PC Setting
function Tmenu_def(Tmenu,code){
	Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},300,function(){$(this).hide();});
	Tmenu.find(">.bar").stop().animate({"opacity":0,"width":0+"px","margin-left":0+"px","padding-left":0+"px"},300,function(){$(this).hide();});
	Tmenu.find(">.blind").fadeOut(300);
	Tmenu.ul.li.find("a.on").removeClass("on");
	Tmenu.ul.li.ul.stop().animate({"opacity":0},300,function(){$(this).hide();});
	Tmenu.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
	Tmenu.ul.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
	Tmenu.blind.stop().animate({"height":0},300,function(){$(this).hide();});
	
	if(code[0] > -1){
		var obj = Tmenu.ul.find(">li.sub0"+code[0]);
		obj.find(">a").addClass("on");
		
		if(obj.find(">a").hasClass("on")){
			Tmenu.find(">.bar").show().stop().animate({"opacity":1,"left":(obj.find(">a >span").offset().left + (obj.find(">a >span").innerWidth()/2)) +"px","width":(obj.find(">a >span").innerWidth()/2)+"px","margin-left":-(obj.find(">a >span").innerWidth()/2)+"px","padding-left":(obj.find(">a >span").innerWidth()/2)+"px"},300);
		}	
		if(code[1] > -1){
			obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]);
			obj.find(">a").addClass("on");
			if(code[2] > -1){
				obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]);
				obj.find(">a").addClass("on");
				if(code[3] > -1){
					obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]+"_0"+code[3]);
					obj.find(">a").addClass("on");
				}
			}
		}
	}
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






