// JavaScript Document
$(function () {
    var m;
    $(".main li").hover(function () {
        m = $(this).index();
        $(".main li img").eq(m).animate({ width: "110px", marginTop: "0px" }, 200).animate({ width: "100px", marginTop: "5px" }, 200);
    }, function () {
        m = $(this).index();
        $(".main li img").eq(m).animate({ width: "90px", marginTop: "10px" }, 0);
    });
    var len = $(".main ul li").length;
    //alert(len);
    var wid = 170 * len;
    if (wid <= 850) {
        $(".main ul").css("width", wid + "px");
    }
    else {
        $(".main ul").css("width", 850);
        $(".main-container").css("top", "35%");
    }
});