// 布局脚本
/*====================================
 *底层页面布局部分js代码实现
 *作者：黄栾
====================================*/
	//页面加载完成时
    $(function () {
        //检测IE
        if ('undefined' == typeof(document.body.style.maxHeight)){
            window.location.href = 'ie6update.html';
        }
		navresize();
    });
	
	//页面尺寸改变时
    $(window).resize(function () {
        navresize();
    });
    //页面搜索框隐藏
    function showgsearch() {
        if ($("#btnShow")[0].innerText == "开启高级搜索") {
            $(".gsearch").show();
            $("#btnShow").removeClass("btn-info");
            $("#btnShow")[0].innerText= "关闭高级搜索";
            $("#btnShow").addClass("btn-warning");
        } else {
            $(".gsearch").hide();
            $("#btnShow")[0].innerText= "开启高级搜索";
            $("#btnShow").addClass("btn-info");
            $("#btnShow").removeClass("btn-warning");
        }
    }
    //通用页面收缩隐藏
    function T_show(btn, obj) {
        if ($(btn)[0].innerHTML == "+展开") {
            $("#"+obj).show();
            $(btn)[0].innerHTML = "-收缩";
        } else {
            $("#"+obj).hide();
            $(btn)[0].innerHTML = "+展开";
        }
    }
	 //导航菜单显示和隐藏
    function navresize() {
        var xx = $(window).height() - 70;
        $("#mainPanel").css("height", xx);
        var docWidth = $(document).width();
        if (docWidth < 1300) {
            $(".header .header-box .nav li").css("padding", "0px 10px");
            $(".nav-right").hide();
            $(".navbar-nav").hide();
        } else {
            $(".header .header-box .nav li").css("padding", "0px 20px");
            $(".nav-right").show();
            $(".navbar-nav").show();
        }
    }
	
	//测试提示部分
	function ceshi()
	{
		alert("当前只写了【设置】【客户】两个应用页面，其他随后进行调整！")
	}
		
	//鼠标经过显示全部已安装应用
	$(function () {
	    $(".current-app").mouseenter(function () {
	        $(".quick_apps").animate({ top: "0" }, 300);
	    });
	    $(".quick_apps").mouseleave(function () {
	        $(this).animate({ top: "-140px" }, 300, function () { $(".current-nav").fadeIn(0); });
	    });
	    var n;
	    $(".quick_apps li").hover(function () {
	        n = $(this).index();
	        $(".quick_apps li img").eq(n).animate({ width: "70px", paddingTop: "0px" }, 200).animate({ width: "60px", paddingTop: "5px" }, 200);
	    }, function () {
	        n = $(this).index();
	        $(".quick_apps li img").eq(n).animate({ width: "50px", paddingTop: "10px" }, 0);
	    });
	});