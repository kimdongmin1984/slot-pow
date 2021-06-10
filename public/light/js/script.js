countUp(7036842,$('._mega_jackpot'));
countUp(1797180,$('._major_jackpot'));
countUp(93974,$('._minor_jackpot'));


function countUp(max,elem){
	let num = 0;
	let timeInterval = max * 0.005;
	setInterval(function(){
		if (max > num) {
			let newNum = Math.round(num+=timeInterval)
			elem.html(numberWithCommas(newNum));
		} else {
			return;
		}
	});
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function randomThunder() {
	$('._thunder_pattern').remove();
	for(let x = 0; x < 30; x++){
		let randPos = getRandomPosition($('._thunder_pattern'));
		$('body').prepend('<img class="_thunder_pattern" src="images/pattern/pattern.png" style="left: '+randPos[0]+'px;top: '+randPos[1]+'px; ">')
	}
	
}


function getRandomPosition(element) {
	var x = document.body.offsetHeight - 304;
	var y = document.body.offsetWidth - 300;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y) + 500;
	if (randomY > document.body.offsetHeight) {
		randomY = document.body.offsetHeight;
	}
	return [randomX,randomY];
}
// randomThunder();

// setInterval(function(){
//  	randomThunder();
// },5000);
let isJackpotDrop = false;
$('._jackpot_dropdown').click(function(){
	if (!isJackpotDrop) {
		$(this).css({
			'transform' : 'rotateX(180deg)',
			'transition' : 'all 0.5s'
		})
		isJackpotDrop = true;
		$('._mobile_jackpot_container ._jackpot_info').css('display' , 'flex');
	} else {
		$(this).css({
			'transform' : 'rotateX(0deg)',
			'transition' : 'all 0.5s'
		})
		isJackpotDrop = false;
		$('._mobile_jackpot_container ._jackpot_info').eq(1).css('display' , 'none');
		$('._mobile_jackpot_container ._jackpot_info').eq(2).css('display' , 'none');
	}
})

$('._sidebar_hotgames').mouseenter(function(){
	$('._sidebar_hotgames').insertBefore().css({
		'top': '-50%',
		'transition': 'all 0.5s',
	})
})

let isNavOpen = false;

$('._nav_button').click(function(){
	if (!isNavOpen) {
		isNavOpen = true;
		$('._sidebar').css({
			'left' : '0',
			'transition' : 'all 0.5s',
	 	})
	 	$('._overlay').show();
	 	$('body').css('overflow' , 'hidden');
	}
})

$('._overlay').click(function(){
		if (isNavOpen) {
			isNavOpen = false;
			$('._sidebar').css({
				'left' : '-100%',
				'transition' : 'all 0.5s',
		 	})
	 		$('._user_sidebar').css({
	 			'right' : '-100%',
	 			'transition' : 'all 0.5s',
	 	 	})


		 	$('._overlay').hide();
		 	$('body').css('overflow-y' , 'scroll');
		}
})
$('._close_side_navigation').click(function(){
	if (isNavOpen) {
		isNavOpen = false;
		$('._sidebar').css({
			'left' : '-100%',
			'transition' : 'all 0.5s',
	 	})
 		$('._user_sidebar').css({
 			'right' : '-100%',
 			'transition' : 'all 0.5s',
 	 	})


	 	$('._overlay').hide();
	 	$('body').css('overflow-y' , 'scroll');
	}
})

$('._user_nav_button').click(function(){
	if (!isNavOpen) {
		isNavOpen = true;
		$('._user_sidebar').css({
			'right' : '0',
			'transition' : 'all 0.5s',
	 	})
	 	$('._overlay').show();
	 	$('body').css('overflow' , 'hidden');
	}
})

$('._login_button').click(function(){
	$('._user_show').css({
		'display' : 'block',
	})

	$('._show_login').css({
		'display' : 'flex',
	})

	
	$('._guest_show').hide();
})


$('._log_out').click(function(){
	$('._user_show').css({
		'display' : 'none',
	})

	$('._show_login').css({
		'display' : 'none',
	})

	$('._guest_show').show();
}) 


$('._openDepositTabs').click(function(){
	$('._deposit_tabs').show();
	$('._withdrawal_tabs').hide();
	$('#WithdrawalAndDepositModal ._menu_tabs_btn').removeClass('active');
	$(this).addClass('active');
})

$('._openWithdrawalTabs').click(function(){
	$('._deposit_tabs').hide();
	$('._withdrawal_tabs').show();
	$('#WithdrawalAndDepositModal ._menu_tabs_btn').removeClass('active');
	$(this).addClass('active');
})



let depositInput = 0;
let withdrawalInput = 0;


function addDepositMoney(val){
	depositInput += val;
	$('._deposit_input').val(numberWithCommas(depositInput) +'원');
}

function resetDeposit(){
	depositInput  = 0;
	$('._deposit_input').val(numberWithCommas(depositInput) +'원');
}


function resetWithdrawal(){
	withdrawalInput  = 0;
	$('._withdrawal_input').val(numberWithCommas(withdrawalInput) +'원');
}
function addWithdrawalMoney(val){
	withdrawalInput += val;
	$('._withdrawal_input').val(numberWithCommas(withdrawalInput) +'원');
}


$('._table_list_content').click(function(){
	$('._table_list_content').removeClass('active');
	if ($(this).next().height() == 0) {
		$(this).addClass('active');		
		$('._table_list_content').next().css({
			'height' : '0',
			'padding' : '0',
		})

		$(this).next().css({
			'height' : 'auto',
			'transition' : 'height 0.8s',
			'padding' : '10px 5px',
		})
	} else {
		$(this).removeClass('active');
		$(this).next().css({
			'height' : '0',
			'transition' : 'height 0.8s',
			'padding' : '0',
		})
	}
})

$('._mypage_content_1').click(function(){
	$('#MypageModal ._menu_tabs_btn').removeClass('active');
	$(this).addClass('active');
	$('._myPageTabs').hide();
	$('._myPage_content_1').show();
})


$('._mypage_content_2').click(function(){
	$('#MypageModal ._menu_tabs_btn').removeClass('active');
	$(this).addClass('active');
	$('._myPageTabs').hide();
	$('._myPage_content_2').show();
})


$('._mypage_content_3').click(function(){
	$('#MypageModal ._menu_tabs_btn').removeClass('active');
	$(this).addClass('active');
	$('._myPageTabs').hide();
	$('._myPage_content_3').show();
})


$('._mypage_content_4').click(function(){
	$('#MypageModal ._menu_tabs_btn').removeClass('active');
	$(this).addClass('active');
	$('._myPageTabs').hide();
	$('._myPage_content_4').show();
})

$('._open_service_write').click(function(){
	$('._service_modal_one').hide();
	$('._service_modal_write').show();
})

$('._service_goBack').click(function(){
	$('._service_modal_one').show();
	$('._service_modal_write').hide();
})

$(window).resize(function(){
	$('._close_side_navigation').click();
})