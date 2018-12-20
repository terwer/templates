//根据项目的需要，将BootGrid的一些默认参数进行修改 ThinkWang 2015-04-21
$.fn.bootgrid.setting = {
    ajax: true,
    selection: true,
    multiSelect: true,
    rowSelect: false,
    keepSelection: false,
    rowCount: [10, 30, 50],
    labels: {
        all: "all", //checkbox全选的值
        search: "请输入关键字",
        loading: "加载中...",
        noResults: "对不起，暂无符合条件的记录！",
        refresh: "刷新",
        infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
    },
    formatters: {
        "YesOrNo": function (colum, row) {
            var str = "";
            if (row[colum.id])
                str = "<span style=\"color:green\">是</span>";
            else
                str = "<span style=\"color:red\">否</span>";
            return str;
        },
        "Sex": function (colum, row) {
            var str = "";
            if (row[colum.id]==1)
                str = "男";
            else
                str = "女";
            return str;
        }
    }
};
       
//BootGrid自定义头部按钮提示 ThinkWang 2015-04-21
$("table[data-toggle='bootgrid']")
    .on("loaded.rs.jquery.bootgrid", function (e) {
        //按钮提示
        $('.tip').tooltip({ placement: "bottom" });
        //按钮气泡
        $('.pop').popover({ html: true, trigger: "hover" });

    });
