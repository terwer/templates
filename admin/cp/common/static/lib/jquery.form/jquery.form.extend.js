$(function () {
    //根据class，自动初始化ajax表单 ThinkWang 2015-04-18
    $("form.ajax-form").each(function () {
        $(this).ajaxForm({ success: eval($(this).attr("ajax-callback")) });
    });
});
