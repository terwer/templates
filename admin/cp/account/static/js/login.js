//*账户登录JS函数
//*作者：唐有炜
//*时间：2015年04月10日


$(function () {
    //记住密码
    //remember();

    //表单验证
    validate_form();

    //登录
    do_login();

});

//表单验证
function validate_form() {
    //表单验证
    $("#loginForm").validate({
        rules: {
            userName: {
                rangelength: [5, 20]
            },
            userPassword: {
                rangelength: [6, 20]
            }
        },
        messages: {
            userName: {
                required: "用户名不能为空！",
                rangelength: "用户名6-20位"
            },
            userPassword: {
                required: "密码不能为空！",
                rangelength: "密码长度必须在6-20之间"
            }
        },
        focusInvalid: false,
        errorPlacement: function(error, element) {
            var errorMsg = error[0].innerHTML;
            var elementName = element[0].name;
            $("#" + elementName).formtip(errorMsg);
        },
        success: function(element) {
            var elem = $(element)[0].htmlFor;
            $("#" + elem).poshytip('disable');
            $("#" + elem).poshytip('destroy');
            $("#" + elem).removeClass("error").addClass("success");
        }
    });
}


//记住密码
function remember() {
    if ($.cookie("remember") == "true") {
        $("#remember").attr("checked", true);
    } else {
        $("#remember").attr("checked", false);
    }
}

//登录提交
function do_login() {
    $("#userName").click(function() {
        $("#login-tips").removeClass("show-block").addClass("hide");
    });
    $("#userPassword").click(function() {
        $("#login-tips").removeClass("show-block").addClass("hide");
    });

    $("#btnSubmit").click(function() {
        //集成jquery validate   
        if (!$("#loginForm").valid()) {
            $("#login-tips").text("用户名或密码错误！").removeClass("hide").addClass("show-block");
            return false;
        } else {
            submit_login();
            return false;
        }
    });
}

function submit_login() {
    var userName = $.trim($("#userName").val());
    var userPassword = $.trim($("#userPassword").val());
    
    var url = "/api/AdminApi/Login";

    var clientIp = get_client_ip();
    var clientPlace = encodeURI(get_client_place());
    var remember = $.trim($("#remember").prop("checked"));

    //初始化消息提示框 
    var d = dialog({
        title: '温馨提示',
        content: '消息内容'
    });
    $.ajax({
        type: "POST",
        url: url,
        data: { userName: userName, userPassword: userPassword, remember: remember, clientIp: clientIp, clientPlace: clientPlace },
        dataType: "json",
        beforeSend: function () {
            d.content("<div class=\"loading\">验证加载中，请稍后...</div>");
            d.showModal();
        },
        complete: function () {
            //d.close().remove();
        },
        success: function (data) {
            //$("#login-tips").text(data.Msg).removeClass("hide").addClass("show-block");
            if (data.ResultType == 3) { //登录成功
                d.content("<div class=\"loading\">正在登录中，请稍后...</div>");
                d.close().remove();
                location.href = data.Data;
            } else {
                d.content("<div class=\"loading\">" + data.Message + "</div>");
            }
        },
        error: function () {
            $("#login-tips").text("网络连接错误！").removeClass("hide").addClass("show-block");
            d.content("<div class=\"loading\">网络连接错误！</div>");
            setTimeout(function () {
                d.close().remove();
            }, 2000);
        }
    });
}

//获取客户端ip
//注意：必须引用 <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script> 
function get_client_ip() {
    var client_ip = "127.0.0.1";
    //防止网络错误
    if ("undefined" != typeof returnCitySN) {
        client_ip = returnCitySN["cip"];
    }
    //var client_place = returnCitySN["cname"];
    //alert(client_ip+" "+client_place);
    return client_ip;
}

function get_client_place() {
    var client_place = "网络错误，定位失败";
    //防止网络错误
    if ("undefined" != typeof returnCitySN) {
        client_place = returnCitySN["cname"];
    }
    //alert(client_place);
    return client_place;
}
