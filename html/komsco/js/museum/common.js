/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Slider Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".slider").size() != 0){
		slide_AC();
		js_tab ();
	}
});
function slide_AC(){
	var slide = $(".slider");

	for(var i=0; i<slide.size(); i++){
		js_slide(slide.eq(i));
	}
}
function js_slide(slide){
	var slide = slide;
		slide.prev = slide.find(">.controls >.prev");
		slide.next = slide.find(">.controls >.next");
		slide.move = slide.find(">.move>ul"); 
		slide.move.li = slide.move.find(">li"); 
	
	if(slide.hasClass("ty1")){
		if(slide.move.li.size() <= 8){
			slide.prev.remove();
			slide.next.remove();
		}	
	} else if (slide.hasClass("ty2")){
		if(slide.move.li.size() <= 4){
			slide.prev.remove();
			slide.next.remove();
		}
	}
		
	slide.prev.click(function(){
		if(slide.hasClass("ty1")){
			for (var i=0; i<8; i++) {
				slide.move.find(">li:last").prependTo(slide.move);
			}	
		} else if (slide.hasClass("ty2")){
			for (var i=0; i<4; i++) {
				slide.move.find(">li:last").prependTo(slide.move);
			}
		}
		slide.move.css({"left":-(slide.move.parent().width() + 24)});
		slide.move.stop().animate({"left": 0},700,"easeInOutExpo");

		return false;	
	});	
	
	slide.next.click(function(){
		slide.move.stop().animate({"left":-(slide.move.parent().width() + 24)},700 ,"easeInOutExpo",function(){
			if(slide.hasClass("ty1")){
				for (var i=0; i<8; i++) {
					slide.move.find(">li:eq(0)").appendTo(slide.move);
				}	
			} else if (slide.hasClass("ty2")){
				for (var i=0; i<4; i++) {
					slide.move.find(">li:eq(0)").appendTo(slide.move);
				}
			}
			slide.move.css({"left":0});
		});
		
		return false;	
	});	
}
function js_tab (){
	var tab = $(".tab_link");
		tab.a = tab.find(">a"); 
		
	tab.a.click(function(){
		tab.a.not($(this)).removeClass("on");
		$(this).addClass("on");	
		$(this).parent().siblings(".slider").hide();
		$(this).parent().siblings(".slider"+$(this).attr("href")).show();
	
		return false;	
	});	
}
