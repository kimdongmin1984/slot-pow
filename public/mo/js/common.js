// JavaScript Document

function ToggleMainBoard(e) {
    var t = $(e).data("value");
    "mainNoticeList" == t ? ($(".eventTab").removeClass("active"), $(e).addClass("active"), $("#mainEventList").hide(), $("#" + t).show()) : "mainEventList" == t && ($(".noticeTab").removeClass("active"), $(e).addClass("active"), $("#mainNoticeList").hide(), $("#" + t).show())
}

function ToggleMainRealtime(e) {
    var t = $(e).data("value");
    "mainDepositList" == t ? ($(".withdrawTab").removeClass("active"), $(e).addClass("active"), $("#mainWithdrawList").hide(), $("#" + t).show()) : "mainWithdrawList" == t && ($(".depositTab").removeClass("active"), $(e).addClass("active"), $("#mainDepositList").hide(), $("#" + t).show())
}

$(document).ready(function () {
	$("#mainDepositData").newsTicker({
		row_height: 15,
		max_rows: 2,
		speed: 600,
		direction: "up",
		duration: 3e3,
		autostart: 1,
		pauseOnHover: 0
	})
	
	$("#mainWithdrawData").newsTicker({
		row_height: 15,
		max_rows: 2,
		speed: 600,
		direction: "up",
		duration: 3e3,
		autostart: 1,
		pauseOnHover: 0
	});
});