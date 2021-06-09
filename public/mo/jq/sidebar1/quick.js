   
   
	var $imgWrap;
	var $img;
	
	$(document).ready(function(e){
		
		
		
		$imgWrap=$(".quick_wrap");
		$img=$(".quick_wrap p");
		$(".close").bind("click",onMoving);
		$(".open").bind("click",onMoving2);
		
		$(".cart_up").bind("click",onMoving5);
		$(".cart_down").bind("click",onMoving6);
	
		
	})
		
		
		function onMoving(){
			
			$imgWrap.stop();
			$img.css({opacity:1});
			$img.animate({opacity:0},1000,"easeOutCubic");
			$imgWrap.animate({right:-320},1000); // 화살표가로값을 뺀 컨텐츠 가로값
			$(".close").hide();
			$(".open").show();
			$img
			
		}
		

		
		function onMoving2(){
			
			$imgWrap.stop();
			$img.css({opacity:0});
			$img.animate({opacity:1},1000,"easeOutCubic");
			$imgWrap.animate({right:0},1000);
			$(".open").hide();
			$(".close").show();
			
		}


		function onMoving5(){
			
			$cartWrap.stop();
			$cartWrap.animate({bottom:0},500);
			$(".cart_down").show();
			$(".cart_up").hide();
			
			
		}


		function onMoving6(){
			
			$cartWrap.stop();
			$cartWrap.animate({bottom:-310},500);
			$(".cart_down").hide();
			$(".cart_up").show();
			
		}