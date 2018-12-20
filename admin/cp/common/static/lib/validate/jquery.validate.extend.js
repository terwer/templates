///////////////////////////////////////////////////////////////
/*这里是JQuery验证扩展*/
/*2014-06-13 修改 By 唐有炜*/
//jQuery默认实现的验证有
//(1)required:true               必输字段
//(2)remote:"check.ashx"          使用ajax方法调用check.php验证输入值
//(3)email:true                  必须输入正确格式的电子邮件
//(4)url:true                    必须输入正确格式的网址
//(5)date:true                   必须输入正确格式的日期
//(6)dateISO:true                必须输入正确格式的日期(ISO)，例如：2009-06-23，1998/01/22 只验证格式，不验证有效性
//(7)number:true                 必须输入合法的数字(负数，小数)
//(8)digits:true                 必须输入整数
//(9)creditcard:                 必须输入合法的信用卡号
//(10)equalTo:"#field"           输入值必须和#field相同
//(11)accept:                    输入拥有合法后缀名的字符串（上传文件的后缀）
//(12)maxlength:5                输入长度最多是5的字符串(汉字算一个字符)
//(13)minlength:10               输入长度最小是10的字符串(汉字算一个字符)
//(14)rangelength:[5,10]         输入长度必须介于 5 和 10 之间的字符串")(汉字算一个字符)
//(15)range:[5,10]               输入值必须介于 5 和 10 之间
//(16)max:5                      输入值不能大于5
//(17)min:10                     输入值不能小于10

///////////////////////////////////////////////////////////////////////////////////////////
//下面是自定义扩展
$(function () {
    //验证手机号
    jQuery.validator.addMethod("phone", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        }
        var reg = /^1[3|4|5|8|9]\d{9}$/;
        return reg.test(value);
    }, "手机号格式错误!");

    //验证电话号码
    jQuery.validator.addMethod("tel", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        }
        var reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
        return reg.test(value);
    }, "电话号码格式错误!");

    //验证手机号码（包括170）
    jQuery.validator.addMethod("mobile", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        }
        var reg = /^1[3578]\d{9}$/;
        return reg.test(value);
    }, "电话号码格式错误!");

    //验证手机和电话号码
    jQuery.validator.addMethod("mobileTelephome", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        }
        var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        if (pattern.test(value)) {
            return true;
        } else {
            return false;
        }
    }, "请输入正确的手机或电话号码!");


    //只允许输入汉字以外的字符
    jQuery.validator.addMethod("noCHS", function (value, element) {
        return !(/^[\u4E00-\u9FA0]+$/.test(value));
    }, "不能包含中文字符!");


    //只允许输入汉字以外的字符
    jQuery.validator.addMethod("idcard", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        }
        return isChinaIDCard(value);
    }, "身份证号码格式错误！");


});



//==================================================
//身份证验证=================================
//身份证验证函数

function isChinaIDCard(StrNo) {
    StrNo = StrNo.toString();
    if (StrNo.length == 18) {
        var a, b, c;
        if (!isInteger(StrNo.substr(0, 17))) {
            return false;
        }
        a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
        a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
        a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
        a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
        a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
        a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
        b = a % 11;

        if (b == 2)   //最后一位为校验位  
        {
            c = StrNo.substr(17, 1).toUpperCase(); //转为大写X  
        } else {
            c = parseInt(StrNo.substr(17, 1));
        }

        switch (b) {
            case 0:
                if (c != 1) {
                    return false;
                }
                break;
            case 1:
                if (c != 0) {
                    return false;
                }
                break;
            case 2:
                if (c != "X") {
                    return false;
                }
                break;
            case 3:
                if (c != 9) {
                    return false;
                }
                break;
            case 4:
                if (c != 8) {
                    return false;
                }
                break;
            case 5:
                if (c != 7) {
                    return false;
                }
                break;
            case 6:
                if (c != 6) {
                    return false;
                }
                break;
            case 7:
                if (c != 5) {
                    return false;
                }
                break;
            case 8:
                if (c != 4) {
                    return false;
                }
                break;
            case 9:
                if (c != 3) {
                    return false;
                }
                break;
            case 10:
                if (c != 2) {
                    return false;
                }
        }
    } else   //15位身份证号  
    {
        if (!isInteger(StrNo)) {
            return false;
        }
    }

    switch (StrNo.length) {
        case 15:
            if (isValidDate("19" + StrNo.substr(6, 2), StrNo.substr(8, 2), StrNo.substr(10, 2))) {
                return true;
            } else {
                return false;
            }
        case 18:
            if (isValidDate(StrNo.substr(6, 4), StrNo.substr(10, 2), StrNo.substr(12, 2))) {
                return true;
            } else {
                return false;
            }
    }
    return false;
}

function isValidDate(iY, iM, iD) {
    var a = new Date(iY, iM - 1, iD);
    var y = a.getFullYear();
    var m = a.getMonth();
    var d = a.getDate();
    if (y != iY || (m + 1) != iM || d != iD) {
        return false;
    }
    return true;
}

function isInteger(str) {
    if (/[^\d]+$/.test(str)) {
        return false;
    }
    return true;
}


function IDUpdate(StrNo) {

    if (!isChinaIDCard(StrNo)) {
        return false;
    }
    if (StrNo.length == 15) {
        var a, b, c;
        StrNo = StrNo.substr(0, 6) + "19" + StrNo.substr(6, 9);
        a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
        a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
        a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
        a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
        a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
        a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
        b = a % 11;

        switch (b) {
            case 0:
                {
                    StrNo = StrNo + "1";
                }
                break;
            case 1:
                {
                    StrNo = StrNo + "0";
                }
                break;
            case 2:
                {
                    StrNo = StrNo + "X";
                }
                break;
            case 3:
                {
                    StrNo = StrNo + "9";
                }
                break;
            case 4:
                {
                    StrNo = StrNo + "8";
                }
                break;
            case 5:
                {
                    StrNo = StrNo + "7";
                }
                break;
            case 6:
                {
                    StrNo = StrNo + "6";
                }
                break;
            case 7:
                {
                    StrNo = StrNo + "5";
                }
                break;
            case 8:
                {
                    StrNo = StrNo + "4";
                }
                break;
            case 9:
                {
                    StrNo = StrNo + "3";
                }
                break;
            case 10:
                {
                    StrNo = StrNo + "3";
                }
        }
    }
    return StrNo;
}
//=================================================================

//==================================================
//错误提示样式统一使用poshytip ,并根据class自动初始化表单验证
//ThinkWang 2015-04-18
$(function () {
    $.validator.setDefaults({
        focusInvalid: false,
        errorPlacement: function (error, element) {
            var errorMsg = error[0].innerHTML;
            var elementName = element[0].name;
            $("#" + elementName).formtip(errorMsg);
        },
        success: function (element) {
            var elem = $(element)[0].htmlFor;
            $("#" + elem).poshytip('disable');
            $("#" + elem).poshytip('destroy');
            $("#" + elem).removeClass("error").addClass("success");
        }
    });
    $("form.validate-form").validate(); //表单验证初始化
});

//生成随机数：
rnd.today = new Date();
rnd.seed = rnd.today.getTime();
function rnd() {
    rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
    return rnd.seed / (233280.0);
}
function rand(number) {
    return Math.ceil(rnd() * number);
}

//--------------------------------------------数字验证--------------------------------------------
//说明：只能是数字
//用法：control：控件id，text：提示文本，pDigitNums：小数位数(数字或者null)
function isOnlyNum(control, text, pDigitNums) {
    if (control.value == null) control = document.getElementById(control);
    if (control.value != '' || control.value != null) {
        if (isNaN(control.value)) {
            alert('输入的' + text + '不是数字,请重新输入!');
            control.value = "";
            control.focus();
            return false;
        }
        else {
            if (pDigitNums != null) {
                var arr = control.value.split('.');
                var vTxt = '为数字';
                if (arr.length == 2) {
                    switch (parseInt(pDigitNums)) {
                        case 0:
                            vTxt = '为整数';
                            break;
                        case 1:
                            vTxt = '有一位小数';
                            break;
                        case 2:
                            vTxt = '有两位小数';
                            break;

                    }
                    if (parseInt(arr[1].length) > parseInt(pDigitNums)) {
                        alert(text + '只能' + vTxt + ',请重新输入！');
                        control.value = "";
                        control.focus();
                        return false;
                    }
                }
            }
        }
    }
    control = null; text = null; pDigitNums = null; arr = null; vTxt = null;
}
//--------------------------------------------通用的验证数字范围验证-------------------------------
//数字范围验证(1:不为空，2：是数字，3：范围)(在用)
//参数说明：control：控件名称，lowValue：最小值，highValue:最大值，提示的控件名称
//如果没有最小值和最大值则不验证范围
//例：checkNum1(dia_b61,10,100,'收缩压')，checkNum1(dia_b61,'','','收缩压')
function checkNum1(control, lowValue, highValue, name) {
    if (control.value == "") {
        if (lowValue != "" && highValue != "") {
            alert('请输入' + name + '(' + lowValue + '～' + highValue + ')!');
        }
        else {
            alert('请输入' + name + '!');
        }
        control.focus();
        return false;
    }
    else if (isNaN(control.value)) {
        if (lowValue != "" && highValue != "") {
            alert('输入的' + name + '不是数字,请重新输入(' + lowValue + '～' + highValue + ')!');
        }
        else {
            alert('输入的' + name + '不是数字,请重新输入！');
        }
        control.value = "";
        control.focus();
        return false;
    }
    if (lowValue != "" && highValue != "")//有上下限范围
    {
        if (parseFloat(control.value) < parseFloat(lowValue) || parseFloat(control.value) > parseFloat(highValue)) {
            alert(name + '应该在' + lowValue + '和' + highValue + '之间！');
            control.value = "";
            control.focus();
            return false;
        }
    }
    else if (lowValue != "" && highValue == "")//只有下限没有上限
    {
        if (parseFloat(control.value) < parseFloat(lowValue)) {
            alert(name + '应该大于或等于' + lowValue + ' ！');
            control.value = "";
            control.focus();
            return false;
        }
    }
    else if (lowValue == "" && highValue != "")//只有上限没有下限
    {
        if (parseFloat(control.value) < parseFloat(lowValue) || parseFloat(control.value) > parseFloat(highValue)) {
            alert(name + '应该小于或等于' + highValue + ' ！');
            control.value = "";
            control.focus();
            return false;
        }
    }
    control = null; lowValue = null; highValue = null; name = null;
}
//数字范围验证(1：是数字，2：范围)(在用)
//参数说明：control：控件名称，lowValue：最小值，highValue:最大值，提示的控件名称
//适用于对非必填数字且有范围的控件的验证
//如果没有最小值和最大值则不验证范围
//例：checkNum2(dia_b61,10,100,'收缩压')，checkNum2(dia_b61,'','','收缩压')
function checkNum2(control, lowValue, highValue, name) {
    if (control.value != "") {
        if (isNaN(control.value)) {
            alert('输入的' + name + '不是数字！');
            control.value = "";
            control.focus();
            return false;
        }
        if (lowValue != "" && highValue != "")//有上下限范围
        {
            if (parseFloat(control.value) < parseFloat(lowValue) || parseFloat(control.value) > parseFloat(highValue)) {
                alert(name + '应该在' + lowValue + '和' + highValue + '之间！');
                control.value = "";
                control.focus();
                return false;
            }
        }
        else if (lowValue != "" && highValue == "")//只有下限没有上限
        {
            if (parseFloat(control.value) < parseFloat(lowValue)) {
                alert(name + '应该大于或等于' + lowValue + ' ！');
                control.value = "";
                control.focus();
                return false;
            }
        }
        else if (lowValue == "" && highValue != "")//只有上限没有下限
        {
            if (parseFloat(control.value) < parseFloat(lowValue) || parseFloat(control.value) > parseFloat(highValue)) {
                alert(name + '应该小于或等于' + highValue + ' ！');
                control.value = "";
                control.focus();
                return false;
            }
        }
    }
    control = null; lowValue = null; highValue = null; name = null;
}
//--------------------------------------------数字验证--------------------------------------------
//--------------------------------------------年份验证--------------------------------------------
//年份验证(1:不为空，2：是年份，3：范围(范围可选))(在用)
//参数说明：control：控件名称，lowValue：最小值，highValue:最大值，提示的控件名称
//如果没有最小值和最大值则不验证范围
//例：checkYear1(dia_b61,2000,2007,'IGR')，checkYear1(dia_b61,'','','IGR')
function checkYear1(control, lowValue, highValue, name) {
    if (control.value == "") {
        if (lowValue != "" && highValue != "") {
            alert('请输入' + name + '的年份(' + lowValue + '～' + highValue + ')!');
        }
        else {
            alert('请输入' + name + '的年份!');
        }
        control.focus();
        return false;
    }
    else if (isNaN(control.value) || control.value.length != 4) {
        alert('输入的年份不正确,请重新输入！');
        control.value = "";
        control.focus();
        return false;
    }
    if (lowValue != "" && highValue != "")//有上下限范围
    {
        if (parseInt(control.value) < parseInt(lowValue) || parseInt(control.value) > parseInt(highValue)) {
            alert(name + '的年份应该在' + lowValue + '和' + highValue + '之间！');
            control.value = "";
            control.focus();
            return false;
        }
    }
    else if (lowValue != "" && highValue == "")//只有下限没有上限
    {
        if (control.value < lowValue) {
            alert(name + '的年份应该大于或等于' + lowValue + ' ！');
            control.value = "";
            control.focus();
            return false;
        }
    }
    else if (lowValue == "" && highValue != "")//只有上限没有下限
    {
        if (control.value < lowValue || control.value > highValue) {
            alert(name + '的年份应该小于或等于' + highValue + ' ！');
            control.value = "";
            control.focus();
            return false;
        }
    }
    control = null; lowValue = null; highValue = null; name = null;
}
//年份验证(1：是年份，3：范围(范围可选))(在用)
//参数说明：control：控件名称，lowValue：最小值，highValue:最大值，提示的控件名称
//如果没有最小值和最大值则不验证范围
//例：checkYear2(dia_b61,2000,2007,'IGR')，checkYear2(dia_b61,'','','IGR')
function checkYear2(control, lowValue, highValue, name) {
    if (control.value != "") {
        if (isNaN(control.value) || control.value.length != 4) {
            alert('输入的年份不正确,请重新输入！');
            control.value = "";
            control.focus();
            return false;
        }
        if (lowValue != "" && highValue != "")//有上下限范围
        {
            if (parseInt(control.value) < parseInt(lowValue) || parseInt(control.value) > parseInt(highValue)) {
                alert(name + '的年份应该在' + lowValue + '和' + highValue + '之间！');
                control.value = "";
                control.focus();
                return false;
            }
        }
        else if (lowValue != "" && highValue == "")//只有下限没有上限
        {
            if (control.value < lowValue) {
                alert(name + '的年份应该大于或等于' + lowValue + ' ！');
                control.value = "";
                control.focus();
                return false;
            }
        }
        else if (lowValue == "" && highValue != "")//只有上限没有下限
        {
            if (control.value < lowValue || control.value > highValue) {
                alert(name + '的年份应该小于或等于' + highValue + ' ！');
                control.value = "";
                control.focus();
                return false;
            }
        }
    }
    control = null; lowValue = null; highValue = null; name = null;
}
//--------------------------------------------年份验证--------------------------------------------
//--------------------------------------------比较两个日期大小,比较日期Date-----------------------
//1：不为空，2：小于当前日期(在用)
//参数说明：control：控件名称，lowDate：最小日期，highDate:最大日期，提示的控件名称
//返回值:bool，如果date1大于或等于date2返回true,否则返回false
//例：compareDate('1988-12-13','1987-2-10') 返回true
function compareDate(DateOne, DateTwo) {
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
    var vFlag = false;
    if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
        vFlag = true;
    }
    DateOne = null; DateTwo = null; OneMonth = null; OneDay = null; OneYear = null; TwoMonth = null; TwoDay = null; TwoYear = null;
    return vFlag;
}
//--------------------------------------------年份验证--------------------------------------------
//--------------------------------------------比较两个日期大小,比较日期Date-----------------------
//1：不为空，2：小于当前日期(在用)
//参数说明：control：控件名称，lowDate：最小日期，highDate:最大日期，提示的控件名称
//返回值:int，如果date1大于date2返回1,等于返回0,否则返回-1
//例：compareDatEequal('1988-12-13','1987-2-10') 返回1
function compareDatEequal(DateOne, DateTwo) {
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
    var vReturn = -1;
    if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) == Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
        vReturn = 0;
    }
    else {
        if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
            vReturn = 1;
        }
    }
    DateOne = null; DateTwo = null; OneMonth = null; OneDay = null; OneYear = null; TwoMonth = null; TwoDay = null; TwoYear = null;
    return vReturn;
}
/*举例：
alert(compareDate('2004-12-01','2004-05-02'));
目前知支持年－月－日这样的格式*/
//--------------------------------------------比较两个日期大小
//--------------------------------------------小于当前日期
//1：不为空，2：小于当前日期(在用)
//参数说明：control：控件名称，lowDate：最小日期，highDate:最大日期，提示的控件名称
//如果没有最小值和最大值则不验证范围
//例：LessThanNow1(control,lowDate,text)
function LessThanNow1(control, lowDate, highValue, text) {
    var nowDate = new Date();
    var yy = nowDate.getFullYear();
    var mm = nowDate.getMonth() + 1;
    var dd = nowDate.getDate();
    var array = control.value.split('-');
    if (control.value == "") {
        alert('请输入' + text + '！');
        control.focus();
        return false;
    }
    if (parseFloat(array[0]) > parseFloat(yy)) {
        alert(text + '不能大于当前日期！');
        control.focus();
        return false;
    }
    else if (parseFloat(array[0]) == parseFloat(yy) && parseFloat(array[1]) > parseFloat(mm)) {
        alert(text + '不能大于当前日期！');
        control.focus();
        return false;
    }
    else if (parseFloat(array[0]) == parseFloat(yy) && parseFloat(array[1]) == parseFloat(mm) && parseFloat(array[2]) > parseFloat(dd)) {
        alert(text + '不能大于当前日期！');
        control.focus();
        return false;
    }
    control = null; lowDate = null; highValue = null; text = null; nowDate = null; yy = null; mm = null; dd = null; array = null;
}
//--------------------------------------------小于当前日期,比较日期Date-----------------
//----------------------------------控制复选框全选或不选----------
//checkAll('chkBoxListDia_b1',true)
function checkAll(control, bool) {
    var myForm, objRadio;
    myForm = document.forms[0];
    for (var i = 0; i < myForm.length; i++) {
        if (myForm.elements[i].type == "checkbox") {
            objRadio = myForm.elements[i];
            if (objRadio.name.indexOf(control) > -1) {
                if (bool != null) objRadio.checked = bool;
                else objRadio.checked = !objRadio.checked;
            }
        }
    }
    control = null; bool = null; myForm = null; objRadio = null; i = null;
}
//--------------------------------------------控制复选框全选或不选CheckBoxList----------------------------
//--------------------------------------------文本框验证TextBox-------------------------------------------
//说明：判断文本框内容是否为空
//参数：pControl：控件名称，pText：要提示的文本内容,pEditable:文本框是否可编辑,默认为可编辑
//例:isTextNull('txtDia_f2','姓名',false)请选择姓名
function isTextNull(pControl, pText, pEditable) {
    if (document.getElementById(pControl).value == '')//为空返回真
    {
        if (pEditable || pEditable == undefined)//可编辑或者没有值
        {
            alert('请输入' + pText);
            document.getElementById(pControl).focus();
            document.getElementById(pControl).select();
            return true
        }
        else {
            alert('请选择' + pText);
            document.getElementById(pControl).focus();
            document.getElementById(pControl).select();
            return true;
        }
    }
    pControl = null; pText = null; pEditable = null;
    return false; //不为空返回假
}
//说明：判断文本框内容是否为空
//参数：control：控件名称，text：要提示的文本内容
//例:isTextBoxNull('txtDia_f2',text)
function isTextBoxNull(pControl, text) {
    //    var control=document.getElementById(pControl);
    control = pControl;
    if (control.value == "") {
        alert(text);
        control.focus();
        control.select();
        return false;
    }
    pControl = null; text = null; control = null;
    return true;
}
//文本框可得到焦点，但是不可输入，可用Backspace键删除
function selectTextBox(pControl, pAllowDelete) {
    var arr = new Array(46, 106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222)
    for (var i = 48; i <= 57; i++)//大键盘数字控制
    {
        arr.push(i);
    }
    for (var i = 96; i <= 105; i++)//小键盘数字控制
    {
        arr.push(i);
    }
    for (var i = 65; i <= 90; i++)//字母
    {
        arr.push(i);
    }
    for (var i = 0; i < arr.length; i++) {
        if (event.keyCode == arr[i]) {
            event.returnValue = false;
            return false;
            break;
        }
    }
    if (event.keyCode == 8)//=-
    {
        if (pAllowDelete || pAllowDelete == undefined) {
            if (pControl.value != '') {
                pControl.value = '';
            }
        }
        else {
            event.returnValue = false;
            return false;
        }
    }
    pControl = null; arr = null; i = null;
}
//--------------------------------------------文本框验证
//--------------------------------------------TextBox--------------------------------------------
//--------------------------------------------RadioButtonList--------------------------------------------
//--------------------------------------------单选框验证
//1：判是否选择了单选框中的一个radio
//参数：control:控件的客户端ID,text:提示文本
//返回值：如果没有选择返回false
//例：isRadioChecked(document.getElementsByName('rBtnListIs_Aberrance'),'是否发生转型')
function isRadioChecked(control, text) {
    var flagrblIs_Aberrance = '0';
    for (var i = 0; i < control.length; i++) {
        if (control[i].checked) {
            flagrblIs_Aberrance = '1';
            break;
        }
    }
    if (flagrblIs_Aberrance == '0') {
        alert('请选择' + text);
        try { control[1].focus(); } catch (err) { }
        return false;
    }
    try { control = null; text = null; flagrblIs_Aberrance = null; i = null; } catch (err) { }
    return true;
}
//判一个RadioButtonList是否选中
//例：isRadioChecked2(document.getElementsByName('rBtnListIs_Aberrance'));
function isRadioChecked2(control) {
    var flagrblIs_Aberrance = '0';
    for (var i = 0; i < control.length; i++) {
        if (control[i].checked) {
            flagrblIs_Aberrance = '1';
            break;
        }
    }
    if (flagrblIs_Aberrance == '0') {
        return false;
    }
    try { control = null; flagrblIs_Aberrance = null; i = null; } catch (err) { }
    return true;
}
//--------------------------------------------单选框验证
//说明：清空单选框的值(可用)
//例:clearRadioButtonListValue(document.getElementsByName('rBtnListIs_Aberrance'))
function clearRadioButtonListValue(control) {
    for (var i = 0; i < control.length; i++) {
        control[i].checked = false;
    }
    control = null;
}
//说明：清空复选框的值(可用)
//pControlID:复选框名称
//pNum:有几个选项
//例:clearCheckBoxListValue('ckbCurrent',6);
function clearCheckBoxListValue(pControlID, pNum) {
    var vPingName = '';
    for (var i = 0; i < pNum; i++) {
        vPingName = pControlID + '_' + i.toString();
        if (document.getElementById(vPingName) != null) {
            document.getElementById(vPingName).checked = false;
        }
    }
    pControlID = null; pNum = null; vPingName = null; i = null;
}
//说明：根据传来的 RadioButtonList对象和value值，选中RadioButtonList的一个项的值(可用)
//例：checkedRadioButtonList(document.getElementsByName('rblSex'),1)
function checkedRadioButtonList(pControl, pValue) {
    for (var i = 1; i < pControl.length; i++) {
        if (pValue == pControl[i].value) {
            pControl[i].checked = true;
            break;
        }
    }
    pControlID = null; pValue = null; i = null;
}
//说明：获取选中项的RadioButtonList值(在用)
//例子：getRadioButtonListValue(document.getElementsByName(pControl));
function getRadioButtonListValue(controls) {
    var controlValue = '';
    for (var i = 0; i < controls.length; i++) {
        if (controls[i].checked) {
            controlValue = controls[i].value;
            break;
        }
    }
    controls = null;
    return controlValue;
}
//说明:将光标定位在一组RadioButton的第一个可用的RadioButton上
//用法:setRadioFocus(document.getElementByName('RBL'))
function setRadioFocus(pControls) {
    var currentElementValues = '';
    for (var iValue = 0; iValue < pControls.length; iValue++) {
        if (pControls.item(iValue).disabled == false)//只有该控件可用才执行
        {
            pControls.item(iValue).focus();
            break;
        }
    }
    pControls = null; currentElementValues = null; iValue = null;
}
//判断输入值是否为数值
function isNum(control) {
    if (isNaN(control.value)) {
        alert('请输入数值');
        return false;
    }
    control = null;
}
//--------------------------------------------去除空格函数trim--------------------------------------------
function trim(strMain) {
    if (strMain == null)
    { return ""; }
    strMain = strMain + "";
    var str1 = strMain;
    for (var i = 0; i <= str1.length - 1; i++) {
        var mychar = str1.charAt(i);
        if ((mychar != " ") && (mychar != "　" && mychar != "\r" && mychar != "\n"))
            break;
    }
    str1 = str1.substring(i, str1.length);
    for (var i = str1.length - 1; i > 0; i--) {
        var mychar = str1.charAt(i);
        if ((mychar != " ") && (mychar != "　") && mychar != "\r" && mychar != "\n")
            break;
    }
    str1 = str1.substring(0, i + 1);
    try { strMain = null; i = null; mychar = null; } catch (err) { }
    return str1;
}
//--------------------------------------------去除空格函数trim--------------------------------------------
//--------------------------------------------身份证
//--------------------------------------------身份证验证函数
//controlID:控件ID,pNull:是否必输项,true:必输项,false或null表示非必输项

//isIdCardNo(txtIDCard)
var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
function isIdCardNo(pValue) {
    if (pValue == '') return;
    idcard = pValue.toUpperCase();
    var Errors = new Array("验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    var jiaoyan = true; //校验输入的格式是否正确
    idcard_array = idcard.split("");
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (letters.indexOf(idcard_array[0]) > -1) {
        alert(Errors[3]);
        return false;
    }
    //地区检验 
    if (area[parseInt(idcard.substr(0, 2))] == null) {
        alert(Errors[4]);
        return false;
    }
    //身份号码位数及格式检验 
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性 
            }
            else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性 
            }
            if (ereg.test(idcard)) {
                return true;
            }
            else {
                alert(Errors[2]);
                return false;
            }
            break;
        case 18:
            //18位身份号码检测 
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 

            for (var i = 0; i <= 16; i++) {
                if (isNaN(idcard_array[i])) {
                    jiaoyan = false;
                    break;
                }
            }
            if (jiaoyan == false) {
                alert(Errors[3]);
                return false;
            }
            if (isNaN(idcard_array[17])) {
                if ("XxAa".indexOf(idcard_array[17]) == -1) {
                    alert(Errors[3]);
                    return false;
                }
            }
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式 
            }
            else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式 
            }
            if (ereg.test(idcard)) {//测试出生日期的合法性 
                //计算校验位 
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                + parseInt(idcard_array[7]) * 1
                + parseInt(idcard_array[8]) * 6
                + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1); //判断校验位 
                if (M == idcard_array[17]) {
                    return true; //检测ID的校验位 
                }
                else {
                    var c;
                    if (Y == 2) {//最后一位为校验位 
                        c = pValue.substr(17, 1).toUpperCase(); //转为大写X  
                    }
                    else {
                        c = parseInt(pValue.substr(17, 1));
                    }
                    switch (Y) {
                        case 0:
                            if (c != 1) {
                                alert("身份证号码校验位错:最后一位应该为:1");
                                return false;
                            }
                            break;
                        case 1:
                            if (c != 0) {
                                alert("身份证号码校验位错:最后一位应该为:0");
                                return false;
                            }
                            break;
                        case 2:
                            if (c != "X") {
                                alert("身份证号码校验位错:最后一位应该为:X");
                                return false;
                            }
                            break;
                        case 3:
                            if (c != 9) {
                                alert("身份证号码校验位错:最后一位应该为:9");
                                return false;
                            }
                            break;
                        case 4:
                            if (c != 8) {
                                alert("身份证号码校验位错:最后一位应该为:8");
                                return false;
                            }
                            break;
                        case 5:
                            if (c != 7) {
                                alert("身份证号码校验位错:最后一位应该为:7");
                                return false;
                            }
                            break;
                        case 6:
                            if (c != 6) {
                                alert("身份证号码校验位错:最后一位应该为:6");
                                return false;
                            }
                            break;
                        case 7:
                            if (c != 5) {
                                alert("身份证号码校验位错:最后一位应该为:5");
                                return false;
                            }
                            break;
                        case 8:
                            if (c != 4) {
                                alert("身份证号码校验位错:最后一位应该为:4");
                                return false;
                            }
                            break;
                        case 9:
                            if (c != 3) {
                                alert("身份证号码校验位错:最后一位应该为:3");
                                return false;
                            }
                            break;
                        case 10:
                            if (c != 2) {
                                alert("身份证号码校验位错:最后一位应该为:2");
                                return false
                            }
                    }
                    alert(Errors[3]);
                    return false;
                }
            }
            else {
                alert(Errors[2]);
                return false;
            }
            break;
        default:
            alert(Errors[1]);
            return false;
            break;
    }
    pValue = null; Errors = null; area = null; idcard = null; Y = null; JYM = null; S = null; M = null; idcard_array = null; jiaoyan = null; letters = null; c = null;
}
//验证身份证是否正确
function IsIdentityCard(sId) {
    sId = document.getElementById(sId).value;
    var iSum = 0
    var info = ""
    var state = true;
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        state = false;
    }
    sId = sId.replace(/x$/i, "a");
    if (area[parseInt(sId.substr(0, 2))] == null) {
        state = false;
    }
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        state = false;
    }

    for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    }
    if (iSum % 11 != 1) {
        state = false;
    }
    return state;
}
//15位身份证转18位
function convertIDCard(pIDCard) {
    var rtnValue;
    var str1 = '1,0,X,9,8,7,6,5,4,3,2';
    var strJiaoYan = str1.split(',');
    var str2 = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1';
    var intQuan = str2.split(',');
    var strTemp;
    var intTemp = 0;
    if (pIDCard == null || pIDCard.length != 15) {
        rtnValue = pIDCard;
    }
    else {
        strTemp = pIDCard.substring(0, 6) + "19" + pIDCard.substring(6);
        for (var i = 0; i < strTemp.length; i++) {
            intTemp = parseInt(intTemp) + parseInt(strTemp.substring(i, i + 1)) * intQuan[i];
        }
        intTemp = intTemp % 11;
        rtnValue = strTemp + strJiaoYan[intTemp];
    }
    pIDCard = null; str1 = null; strJiaoYan = null; str2 = null; intQuan = null; strTemp = null; intTemp = null;
    return rtnValue.toUpperCase();
}
//根据身份证出身年份计算年龄
function getAge(pIDCard) {
    if (pIDCard.length != 0 && (pIDCard.length == 15 || pIDCard.length == 18)) {
        if (pIDCard.length == 15) {
            pIDCard = convertIDCard(pIDCard);
        }
        var ageYear = pIDCard.substring(6, 10);
        var nowDate = new Date();
        var yy = nowDate.getFullYear();
        var age = yy - ageYear;
        ageYear = null; nowDate = null; yy = null;
        return age;
    }
    return "";
}
//得到身份证的生日
//如果是15位，这里会自动转换成18位
function getBirthday(pIDCard) {
    if (pIDCard.length == 15) {
        pIDCard = convertIDCard(pIDCard);
    }
    return pIDCard.substring(6, 10) + '-' + pIDCard.substring(10, 12) + '-' + pIDCard.substring(12, 14);
}
function getBirthday(pIDCard, bIrthday) {
    var number = pIDCard.value;
    if (number != "") {
        if (number.length == 15) {
            number = convertIDCard(number);
        }
        $("#" + bIrthday).val(number.substring(6, 10) + '-' + number.substring(10, 12) + '-' + number.substring(12, 14));
    }
}
//得到身份证的性别
//如果是15位，这里会自动转换成18位
function getSex(pIDCard) {
    if (pIDCard.length == 15) {
        pIDCard = convertIDCard(pIDCard);
    }
    var sex = parseInt(pIDCard.substring(16, 17)) % 2 == 1 ? "男" : "女";
    return sex;
}
function cidInfo(sId) {
    var iSum = 0
    var info = ""
    if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "Error:非法地区";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "Error:非法生日";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    if (iSum % 11 != 1) return "Error:非法证号";
    iSum = null; info = null;
    return aCity[parseInt(sId.substr(0, 2))] + "," + sBirthday + "," + (sId.substr(16, 1) % 2 ? "男" : "女")
}
//--------------------------------------------身份证验证函数

//--------------------------------------------只能为偶数--------------------------------------------
//是否是偶数
//参数:pControl:控件名称
//返回值:true:是偶数,false:不是偶数
function isEven(value) {
    if (value % 2 == 0) {
        return true;
    }
    else {
        return false;
    }
}
//--------------------------------------------Elements--------------------------------------------
//以下都是关于界面元素的操作
//寻找指定元素的下一个元素
//只要不到最后一个元素就会寻找下一个元素
function findNextControl(pControl) {
    var e = document.forms[0].elements;
    var control;
    var currentIndex;
    var rtnValue;
    for (var i = 0; i < e.length; i++) {
        control = e.item(i);
        if (control.id == pControl.id) {
            if (i < e.length)//是否最后一个
            {
                currentIndex = i + 1;
                rtnValue = e.item(currentIndex);
                break;
            }
        }
    }
    pControl = null; e = null; control = null; currentIndex = null;
    return rtnValue;
}
//--------------------------------------------Elements--------------------------------------------
//------------------只能输入数字
function onlyNum() {
    var arr = new Array(46, 106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222)
    if (event.shiftKey || event.altKey || event.ctrlKey) {
        event.returnValue = false;
        return false;
    }
    for (var i = 65; i <= 90; i++)//字母
    {
        arr.push(i);
    }
    for (var i = 0; i < arr.length; i++) {
        if (event.keyCode == arr[i]) {
            event.returnValue = false;
            return false;
            break;
        }
    }
    arr = null; i = null;
}
function onlyNum2(pControl, pDigit, pMinValue, pMaxValue) {
    //alert(event.keyCode);
    var arr = new Array(46, 106, 107, 109, 111, 186, 187, 188, 189, 191, 192, 219, 220, 221, 222)
    if (event.shiftKey || event.altKey || event.ctrlKey) {
        pControl.focus();
        event.returnValue = false;
        return false;
    }
    for (var i = 65; i <= 90; i++)//字母
    {
        arr.push(i);
    }
    for (var i = 0; i < arr.length; i++) {
        if (event.keyCode == arr[i]) {
            pControl.focus();
            event.returnValue = false;
            return false;
            break;
        }
    }
    if (pControl.value.substr(0, 1) == '0' && pControl.value.length == 1) {
        switch (event.keyCode) {
            case 110:
            case 190:
                break;
            default:
                pControl.focus();
                event.returnValue = false;
                return false;
                break;
        }
    }
    pControl = null; pDigit = null; pMinValue = null; pMaxValue = null; arr = null; i = null;
}
//去空格函数
function trim(text) {
    while (text.substr(text.length - 1, 1) == ' ') text = text.substr(0, text.length - 1);
    while (text.substr(0, 1) == ' ') text = text.substr(1);
    return text;
}
//函数名：chksafe
//功能介绍：检查是否含有"'",'\\',"/"
//参数说明：要检查的字符串
//返回值：0：是  1：不是
function ChkSafe(b) {
    a = document.getElementById(b).value
    fibdn = new Array("'", "\\", ";", "/");
    i = fibdn.length;
    j = a.length;
    for (ii = 0; ii < i; ii++) {
        for (jj = 0; jj < j; jj++) {
            temp1 = a.charAt(jj);
            temp2 = fibdn[ii];
            if (temp1 == temp2) {
                alert('在输入的内容的第' + (jj + 1) + '位发现非法字符' + temp1)
                document.getElementById(b).select()
                return 0
            }
        }
    }
    try { b = null; a = null; fibdn = null; i = null; j = null; ii = null; jj = null; temp1 = null; temp2 = null; } catch (err) { }
    return 1;
}
//函数名：ChkNum
//功能介绍：检查是否含有非数字字符
//参数说明：要检查的字符串
//返回值：0：不是  1：是
function ChkNum(b) {
    NUM = document.getElementById(b).value
    var i, j, strTemp;
    strTemp = "0123456789";
    if (NUM.length == 0)
        return 0
    for (i = 0; i < NUM.length; i++) {
        j = strTemp.indexOf(NUM.charAt(i));
        if ((j == -1) && (NUM.charAt(i) != ".")) {
            if (!((i == 0) && (NUM.charAt(i) == "-"))) {
                alert('在输入的内容的第' + (i + 1) + '位发现不是数字' + NUM.charAt(i))
                document.getElementById(b).select()
                event.returnValue = false;
                return 0
            }
            //说明有字符不是数字
            // alert('aa')
            //return 0;
        }
    }
    strTemp = ".";
    c = 0
    for (i = 0; i < NUM.length; i++) {
        j = strTemp.indexOf(NUM.charAt(i));
        if (j != -1) {
            //说明有字符不是数字
            c = c + 1
            //return 0;
        }
        if (c > 1) {
            alert('小数点的数量超过了1个')
            document.getElementById(b).select()
            event.returnValue = false;
            return 0;
        }
    }
    if (NUM.charAt(0) == '.') {
        alert('首字符不能为小数点')
        event.returnValue = false;
    }
    if (NUM.charAt(NUM.length - 1) == '.') {
        alert('末尾自负不能为小数点')
        event.returnValue = false;
        document.getElementById(b).select()
        return 0;
    }
    //说明是数字
    try { b = null; NUM = null; strTemp = null; i = null; j = null; c = null; } catch (err) { }
    return 1;
}

//函数名：check_input
//功能介绍：根据字符内容检测传入内容是否为数字、是否含有非法字符、是否为日期
function check_input(objname, check_type) {
    if (check_type.charAt(0) == '1') {
        ChkNum((objname))
    }
    if (check_type.charAt(1) == '1') {
        ChkSafe((objname))
    }
    if (check_type.charAt(2) == '1') {
        ChkDate((objname))
    }
    objname = null; check_type = null;
}
//时间转换 将YY-MM-DD格式的时间转转换 为一个Javascript DateTime对象返回
function ConvertDate(nt) {
    var month = nt.substring(nt.indexOf('-') + 1, nt.lastIndexOf('-'));
    var year = nt.substring(0, nt.indexOf('-'));
    var date = nt.substring(nt.lastIndexOf('-') + 1, nt.length);
    var nowDate = new Date(month + "/" + date + "/" + year);
    month = null; year = null; date = null; nt = null;
    return nowDate;
}
//检测日期是否合法
function fnCheckDate(strDate) {
    var strCheckDate = strDate + "";     //进一步确认哪来判断的肯定是一串字符串
    if (strCheckDate == "") return false;        //空字符串,不是合法的日期字符串，返回false
    //判断传进来的数据是那种格式写成日期
    var intIndex = -1;         //利用正则表达式，查找字符串中是否包含某个字符，没找到为-1,否则为 （0 - String.length - 1）
    var arrDate;          //分别存储年月日
    var regExpInfo = /\./;        //正则表达式，匹配第一个出现 "."的位置 
    //在这里，我之所以不使用replace函数把所有的"."和"/"换成"-",然后分别存储年月日，是因为用户有可能输入 2001/3-2,就判断不出它是不合法日期了
    intIndex = strCheckDate.search(regExpInfo);   //查找是否含有 "."
    if (intIndex == -1)         //不包含  
    {
        regExpInfo = /-/;
        intIndex = strCheckDate.search(regExpInfo);
        if (intIndex == -1) {
            regExpInfo = /\//;       //查找是否含有 "/"
            intIndex = strCheckDate.search(regExpInfo);
            if (intIndex == -1) {
                arrDate = new Array();  //只包含年或格式为20010307
                if (strCheckDate.length == 4) {
                    arrDate[0] = strCheckDate;
                    window.alert(arrDate[0]);
                }
                else if (strCheckDate.length == 6) {
                    arrDate[0] = strCheckDate.substring(0, 4);
                    arrDate[1] = strCheckDate.substring(4, 6);

                }
                else if (strCheckDate.length == 8) {
                    arrDate[0] = strCheckDate.substring(0, 4);
                    arrDate[1] = strCheckDate.substring(4, 6);
                    arrDate[2] = strCheckDate.substring(6, 8);

                }
                else {
                    return false;
                }
            }
            else {
                arrDate = strCheckDate.split("/");  //2001/3/7 型
            }
        }
        else {
            arrDate = strCheckDate.split("-");   //2001-3-7 型
        }
    }
    else {
        arrDate = strCheckDate.split(".");    //2001.3.7 型
    }

    if (arrDate.length > 3)        //如果分离出来的项超过3，除了年月日还有其它的，不合法日期，返回false
    {
        return false;
    }
    else if (arrDate.length > 0) {
        //判断年是否合法
        if (fnIsIntNum(arrDate[0]))   //是正整数
        {
            if (parseInt(arrDate[0]) < 1 || parseInt(arrDate[0]) > 9999)  //年范围为1 - 9999
            {
                return false;
            }
        }
        else {
            return false;     //年不是正整数，错误
        }
        //判断月是否合法
        if (arrDate.length > 1) {
            if (fnIsIntNum(arrDate[1]))  //是正整数
            {
                if (parseInt(arrDate[1]) < 1 || parseInt(arrDate[1]) > 12) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        //判断日是否合法
        if (arrDate.length > 2) {
            if (fnIsIntNum(arrDate[2]))  //是正整数
            {
                var intDayCount = fnComputerDay(parseInt(arrDate[0]), parseInt(arrDate[1]));
                if (intDayCount < parseInt(arrDate[2])) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    try { strDate = null; strCheckDate = null; intIndex = null; arrDate = null; regExpInfo = null; intDayCount = null; } catch (err) { }
    return true;
}
//**********************************************************************************************************
//判断一个数是否为正整数
//参数：strNum ---- 需要判断的字符串
//返回值：true ---- 整数 false ---- 非整数
function fnIsIntNum(strNum) {
    var strCheckNum = strNum + "";
    if (strCheckNum.length == 2)         //月、日去0
        if (strCheckNum.substr(0, 1) == "0")
            strCheckNum = strCheckNum.substr(1, 1);
    //alert(strCheckNum);   
    if (strCheckNum.length < 1)         //空字符串
        return false;
    else if (isNaN(strCheckNum))         //不是数值
        return false;
    else if (parseInt(strCheckNum) < 1)       //不是正数
        return false;
    else if (parseFloat(strCheckNum) > parseInt(strCheckNum)) //不是整数 
        return false;
    strNum = null; strCheckNum = null;
    return true;
}
//**********************************************************************************************************
//功能：判断intYear年intMonth月的天数
//返回值：intYear年intMonth月的天数
function fnComputerDay(intYear, intMonth) {
    var dtmDate = new Date(intYear, intMonth, -1);
    var intDay = dtmDate.getDate() + 1;
    intYear = null; intMonth = null; dtmDate = null;
    return intDay;
}
//去空格函数
function lTrim(str) {
    if (str.charAt(0) == " ") {
        str = str.slice(1);
        str = lTrim(str); //递归调用 
    }
    return str;
}
function rTrim(str) {
    var iLength;
    iLength = str.length;
    if (str.charAt(iLength - 1) == " ") {
        str = str.slice(0, iLength - 1);
        str = rTrim(str); //递归调用
    }
    iLength = null;
    return str;
}
function trim(str) {
    return lTrim(rTrim(str));
}
//获取时间间隔天(年/月时/分秒)数
function dateDiff(interval, date1, date2) {
    var objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 };
    interval = interval.toUpperCase();
    var dt1 = Date.parse(date1.replace(/-/g, '/'));
    var dt2 = Date.parse(date2.replace(/-/g, '/'));
    try {
        return Math.round((dt2 - dt1) / eval('(objInterval.' + interval + ')'));
    }
    catch (e) {
        return e.message;
    }
}
/*******************************/
//通用方法 Begin
/*******************************/
//获取QueryStirng
function GetQueryString(name) {
    if (name == "") {
        return "";
    }
    name = name.toLowerCase();
    if (window.location.href.indexOf("?") == -1) {
        return "";
    }
    var url = window.location.href;
    if (window.location.href.indexOf('#') != "-1") {
        url = window.location.href.substr(0, window.location.href.indexOf('#'));
    }
    url = url.substr(url.indexOf("?") + 1, url.length - url.indexOf("?"))
    if (url == "") {
        return;
    }
    var arr = url.split("&");
    if (arr.length > 0) {
        var item;
        for (var i = 0; i < arr.length; i++) {
            item = arr[i].split("=");
            if (item[0].toLowerCase() == name) {
                return item[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}

//获取Cookie
function GetCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0].indexOf(objName) > -1) return unescape(temp[1]);
    }
    return "";
}

//保存Cookie
function AddCookie(objName, objValue, objHours) {//添加cookie
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//获取系统时间
function GetSystemDate() {
    return new Date(Date.parse(GetSystemDateString().replace(/-/g, "/")));
}
function compareTwoDate(lowDate, highDate) {
    low = $("#" + lowDate).val();
    high = $("#" + highDate).val();
    if (low != "" && high != "") {
        if (compareDate(low, high)) {
            alert("开始时间不能大于结束时间");
            $("#" + lowDate).val("");
            return;
        }
    }
}
//获取当前日期
function GetCurrentDateString() {
    return new Date().format("yyyy-MM-dd");
}
function jsonDateFormat(jsonDate) {//json日期格式转换为正常格式
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    } catch (ex) {
        return "";
    }
}
//时间格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds() // millisecond  
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//根据生日获取年龄
function GetAgeByBirthday(Birthday) {
    var BirthdayYear = Birthday.substr(0, 4);
    var ServerDateYear = GetSystemDate().getYear();
    return ServerDateYear - parseInt(BirthdayYear);
}

//根据身份证出身年份计算年龄
function GetAgeByIdentity(IdentityNo) {
    if (IdentityNo.length == 15 || IdentityNo.length == 18) {
        if (IdentityNo.length == 15) {
            IdentityNo = convertIDCard(pIDCard);
        }
        var BirthdayYear = IdentityNo.substring(6, 10);
        var ServerDateYear = GetSystemDate().getYear();
        return ServerDateYear - parseInt(BirthdayYear);
    }
    return "";
}

//动态添加日期控件JS
function AppendWdatePicker() {
    if (typeof (hasWdatePicker) == "undefined") {
        var headlist = document.getElementsByTagName("script");
        hasWdatePicker = false;
        for (var i = 0; i < headlist.length; i++) {
            if (headlist[i].src.indexOf("WdatePicker.js") > -1) {
                hasWdatePicker = true;
            }
        }
        if (!hasWdatePicker) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = GetRootUrl() + "JS/My97DatePicker/WdatePicker.js";
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}

/*******************************/
//通用方法 End
/*******************************/
//=================================================================