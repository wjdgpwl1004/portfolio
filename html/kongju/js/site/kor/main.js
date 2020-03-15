$(function(){
	quick_AC();//quick 메뉴
	top_AC();//top버튼	
	gallery_AC();//gallery 슬릭
	tab_AC();//news tab	
	video_AC();	
	//slide_type_03();
	//performance_AC();//performance 슬라이드
});

function quick_AC(){
	var quick = $("#quick");
		quick.btn = quick.find(".quick_tab li a");

	var box = quick.find(".quick_box");
		box.item = box.find(".item");
		box.btn = quick.find(".close a");

	function fn_set(idx){
		box.item.removeClass("on").eq(idx).addClass("on");
		quick.btn.parent().removeClass("on").eq(idx).addClass("on");
		box.btn.addClass("on");
	}
	// fn_set(0);

	quick.btn.on("click", function(){
		var idx = quick.btn.parent().index($(this).parent());
		fn_set(idx);
		return false;
	});

	box.btn.on("click", function(){
		box.item.removeClass("on");
		$(this).removeClass("on");
	});
}

function top_AC(){
	var obj = $("a.topbtn");

	obj.click(function(){
		$("body, html").animate({scrollTop:"0"},400);
		return false;
	});
}


function tab_AC(){
	var tab = $("#news .news-box .right-box .box-tab");
		tab.btn = tab.find("a");

	var box = $("#news .news-box .right-box .box-item");
		box.item = box.find(".item");
		
	function fn_set(idx){
		box.item.hide().eq(idx).show();
		tab.btn.parent().removeClass("on").eq(idx).addClass("on");
	}

	fn_set(0);
	
	tab.btn.on("click", function(){		
		var idx = tab.btn.parent().index($(this).parent());
		fn_set(idx);
		$(".slider-for").slick("setPosition");
		$(".slider-nav").slick("setPosition");
		return false;
	});

	
}

function gallery_AC(){

	$gallery = $(".gallery");	
	$gallery_wrap = $gallery.find(".slider-for");
	$gallery_list = $gallery.find(".slider-nav");

	$gallery_wrap.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.gallery .slider-nav'
	});

	$gallery_list.slick({
	    slidesToShow: 4,
	    slidesToScroll: 1,
	    asNavFor: '.gallery .slider-for',
	    dots: true,
	    centerMode: false,
	    focusOnSelect: true
    });
 
}

function video_AC(){

	$video = $(".video");	
	$video_wrap = $video.find(".slider-for");
	$video_list = $video.find(".slider-nav");

	$video_wrap.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.video .slider-nav'
	});
	$video_list.slick({
	    slidesToShow: 4,
	    slidesToScroll: 1,
	    asNavFor: '.video .slider-for',
	    dots: true,
	    centerMode: false,
	    focusOnSelect: true  
	});
}


// function slide_type_03(slide){
// 	//팝업존
// 	var slide = $(".bannerzone");
// 	slide.titles = slide.find(">.title");
// 	slide.controls = slide.find(">.control");
// 	slide.counts = slide.controls.find(">.count");
// 	slide.btn_left = slide.controls.find(">.btn_left");
// 	slide.btn_right = slide.controls.find(">.btn_right");
// 	slide.btn_play = slide.controls.find(">.btn_play");
// 	slide.btn_stop = slide.controls.find(">.btn_stop");
// 	slide.moves = slide.find(">.move");
// 	slide.ul = slide.moves.find(">ul");
// 	slide.li = slide.ul.find(">li");
// 	slide.a = slide.ul.find(">li>a");
// 	slide.speeds = 500;
// 	slide.autos = "N";
// 	slide.times = "";
// 	slide.times_speeds = 5000;
// 	slide.nums = 1;

// 	//제어
// 	if(slide.li.size() < 2){
// 		slide.controls.remove();
// 		return false;
// 	}

// 	//심볼
// 	$("<ul></ul>").prependTo(slide.controls);
// 	for(var i=0; i<slide.li.size(); i++){
// 		$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
// 	}
// 	slide.simbols = slide.controls.find(">ul>li");
// 	slide.simbols.eq(0).find(">a").addClass("on");

// 	//넘버링
// 	for(var i=0; i<slide.li.size(); i++){
// 		slide.li.eq(i).attr("data-count",(i+1));
// 	}

// 	//총 카운트 적용
// 	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

// 	//버튼 : 다음
// 	slide.btn_right.click(function(){
// 		slide.btn_stop.click();
// 		movement("right");
// 		return false;
// 	});

// 	//버튼 : 이전
// 	slide.btn_left.click(function(){
// 		slide.btn_stop.click();
// 		movement("left");
// 		return false;
// 	});

// 	//버튼 : 재생
// 	slide.btn_play.click(function(){
// 		slide.btn_play.hide();
// 		slide.btn_stop.css("display","inline-block");
// 		slide.autos = "Y";
// 		slide.times = setTimeout(function(){
// 			movement("right");
// 		},slide.times_speeds);
// 		return false;
// 	});

// 	//버튼 : 정지
// 	slide.btn_stop.click(function(){
// 		slide.btn_stop.hide();
// 		slide.btn_play.css("display","inline-block");
// 		slide.autos = "N";
// 		clearTimeout(slide.times);
// 		return false;
// 	});

// 	//버튼 : 심볼
// 	slide.simbols.find(">a").click(function(){
// 		if($(this).hasClass("on")) return false;
// 		var idx = slide.simbols.index($(this).parent());
// 		slide.btn_stop.click();
// 		movement(idx);
// 		return false;
// 	});

// 	//자동재생
// 	slide.btn_play.click();

// 	//animate
// 	function movement(ty){
// 		slide.li = slide.ul.find(">li");

// 		var olds = 0;
// 		var news = 0;

// 		if(ty == "right"){
// 			//다음
// 			olds = slide.nums;
// 			news = slide.nums + 1;
			
			
// 			//alert(news);

// 			//if(news >= slide.li.size()) news = 0;
// 			if(news < slide.li.size()) {
// 				news = news;
// 			} else if (news > slide.li.size()) {
// 				news = 1;
// 			}
// 		} else if(ty == "left"){
// 			//이전
// 			olds = slide.nums;
// 			news = slide.nums - 1;

// 			if(news < 1) news = slide.li.size();
// 		} else {
// 			//심볼클릭
// 			olds = slide.nums;
// 			news = ty+1;
// 			if(news >= slide.li.size()) news = 0;
// 		}

// 		if(slide.li.eq(news-1).is(":animated")) return false;

// 		slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
// 			slide.li.eq(olds-1).css({"left":"100%","display":"none"});
// 			if(slide.autos == "Y"){
// 				slide.times = setTimeout(function(){
// 					movement("right");
// 				},slide.times_speeds);
// 			}
// 		});

// 		slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
// 		});

// 		slide.nums = news;

// 		//총 카운트 적용
// 		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

// 		//심볼
// 		slide.simbols.find(">a.on").removeClass("on");
// 		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
// 	}
// }

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	bannerzone

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	setTimeout(function(){
	
		if($(".bannerzone").size() != 0){
			//setting
			if($(".bannerzone ul li").size() < 1){
				$(".btn_popup").remove();
				$(".bannerzone").remove();	
			} else {
				$(".btn_popup").fadeIn(0);	
			}
			
			//popup_btn
			$(".btn_popup >a").click(function() {
				if($(".bannerzone").is(":animated")) return false;
				
				$(".bannerzone").slideToggle(200);
				$(this).toggleClass("on");
				if(!$(this).hasClass("on")){
					$(this).find(">span").text("닫기");
					$("#header").addClass("banner");
					$(".bannerzone >strong").focus();
				} else {
					$(this).find(">span").text("열기");
					$("#header").removeClass("banner");
				}
	
				return false;	
			});	
				
			//today_check
			if($(".today_check").size() != 0){
				$(".today_check .btn_close").click(function () {
					if($(".today_check input[type='checkbox']").prop("checked")){
						setCookieMobile( "todayCookie", "done" , 1);
						$(".btn_popup").fadeOut(200);
					} else {
						$(".btn_popup >a").addClass("on").find(">span").text("열기");	
					}
					$("#header").removeClass("banner");
					$(".bannerzone").slideUp(200);
					$(".btn_popup >a").focus();
				});
				
				function setCookieMobile ( name, value, expiredays ) {
					var todayDate = new Date();
					todayDate.setDate( todayDate.getDate() + expiredays );
					document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
				}
				function getCookieMobile () {
					var cookiedata = document.cookie;
					
					if (cookiedata.indexOf("todayCookie=done") < 0 ){
						setTimeout(function(){
							$(".bannerzone").slideDown(0);
							$(".btn_popup >a").find(">span").text("닫기");
						},200);
					}
					else {
						$(".bannerzone").remove();
						$(".btn_popup").remove();	
					}
				}
				getCookieMobile();
				
				return false;	
			}		
		}
	
	},0);
});



