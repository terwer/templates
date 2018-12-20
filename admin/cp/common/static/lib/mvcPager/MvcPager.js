﻿/*
MvcPager分页组件客户端jQuey插件修改版  15-05-12 by terwer
Copyright:2013-2015 CPlusCloud团队 All Rights Reasered.
*/
(function (n) {
    function f(n) {
        this.wrapper = n
    }
    function o(n, t) {
        if (t !== null && t !== undefined) for (var i = 0; i < t.length; i++) n.push({
            name: t[i].name,
            value: t[i].value
        })
    }
    function u(t) {
        var f = window.location.hash.substring(1),
			r, i, u;
        if (n.trim(f) != "") for (r = f.split("&"), i = 0; i < r.length; i++) if (u = r[i].split("="), u[0].toString().toLowerCase() === t.toString().toLowerCase()) return parseInt(u[1]) || 1;
        return 0
    }
    function t(t, i) {
        var r = window.location.hash.substring(1),
			u, f;
        n.trim(r) == "" ? window.location.hash = t + "=" + i : (u = new RegExp(t + "=[^&]*", "i"), u.test(r) ? (f = r.replace(u, t + "=" + i), window.location.hash = f) : window.location.hash += "&" + t + "=" + i)
    }
    function i(t, i) {
        for (var r = window, u = (t || "").split(".") ; r && u.length;) r = r[u.shift()];
        if (typeof r == "function") return r;
        if (n.trim(t).toLowerCase().indexOf("function") == 0) return new Function("return (" + t + ").apply(this,arguments);");
        i.push(t);
        try {
            return Function.constructor.apply(null, i)
        } catch (f) {
            alert("Error:\r\n" + t + "\r\nis not a valid callback function")
        }
    }
    function e(n) {
        var t, i, r;
        window.event ? (t = n.keyCode, i = n.srcElement) : n.which && (t = n.which, i = n.target), r = [8, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105], t !== null && r.indexOf(t) < 0 && (t == 13 && i != null && i.click(), n.preventDefault ? n.preventDefault() : event.returnValue = !1)
    }
    function r(i) {
        var r = n(i).closest("[data-mvcpager=true]"),
			h = r.data("maxpages"),
			c = r.data("invalidpageerrmsg"),
			l = r.data("outrangeerrmsg"),
			f = r.data("firstpage"),
			a = r.data("urlformat"),
			e = r.data("pageparameter"),
			v = r.data("ajax"),
			u = 0,
			o = r.find("select[data-pageindexbox=true],input:text[data-pageindexbox=true]"),
			s;
        if (o.length > 0 && (u = o.val()), s = new RegExp("^\\s*(\\d+)\\s*$"), s.test(u)) {
            if (RegExp.$1 < 1 || RegExp.$1 > h) {
                alert(l);
                return
            }
        } else {
            alert(c);
            return
        }
        v ? t(e, u) : self.location.href = typeof f != "undefined" && f !== !1 && u == "1" ? f : decodeURI(a).replace("__" + e + "__", u)
    }
    n.fn.initMvcPagers = function () {
        return this.each(function () {
            new f(this).init()
        })
    }, f.prototype = {
        wrapper: null,
        url: null,
        pageIndexName: null,
        updateTarget: null,
        onBegin: null,
        onComplete: null,
        onFailure: null,
        onSuccess: null,
        httpMethod: null,
        confirm: null,
        loadingElementId: null,
        loadingDuration: 0,
        partialLoading: null,
        currentPage: null,
        dataFormId: null,
        isFirstLoad: !0,
        initIndex: null,
        allowReload: !1,
        searchCriteria: null,
        init: function () {
            var i = n(this.wrapper),
				l = i.data("ajax") || !1,
				h = i.data("pageparameter"),
				o, s, f, c;
            if (this.pageIndexName = h, l) {
                this.updateTarget = i.data("ajax-update"), this.onBegin = i.data("ajax-begin"), this.onComplete = i.data("ajax-complete"), this.onFailure = i.data("ajax-failure"), this.onSuccess = i.data("ajax-success"), this.confirm = i.data("ajax-confirm") || undefined, this.httpMethod = i.data("ajax-method") || "GET", this.loadingElementId = i.data("ajax-loading") || undefined, this.dataFormId = i.data("ajax-dataformid") || undefined, this.loadingDuration = i.data("ajax-loading-duration") || 0, this.partialLoading = i.data("ajax-partialloading") || !1, this.currentPage = i.data("ajax-currentpage") || 1, this.url = i.data("urlformat"), this.initIndex = this.currentPage, o = "[data-mvcpager=true]", s = u(h), s != this.currentPage && s > 0 && this.loadData(s, {
                    type: this.httpMethod,
                    data: []
                }), this.dataFormId !== undefined && (f = this, c = n(f.dataFormId).data("ajax") || !1, n(f.dataFormId).submit(function (i) {
                    f.searchCriteria = n(f.dataFormId).serializeArray(), c ? f.currentPage !== 1 ? (f.currentPage = 1, t(f.pageIndexName, -1)) : f.allowReload = !0 : (f.allowReload = !0, f.currentPage === 1 ? f.loadData(1, {
                        type: f.httpMethod,
                        data: []
                    }) : (t(f.pageIndexName, 1), f.currentPage = 1), i.preventDefault())
                })), this.initHashChange();
                n(this.updateTarget).on("click", o + " a[data-pageindex]", function (i) {
                    var r = n(this).data("pageindex");
                    i.preventDefault(), t(h, r)
                });
                n(this.updateTarget).on("keydown", o + " input:text", function () {
                    e(event)
                });
                n(this.updateTarget).on("click", o + " input[type=button][data-submitbutton=true]", function () {
                    r(this)
                });
                n(this.updateTarget).on("change", o + " select[data-autosubmit=true],input:text[data-autosubmit=true]", function () {
                    r(this)
                })
            } else jQuery("input:text", this.wrapper).keydown(function (n) {
                e(n)
            }), jQuery("input[type=button][data-submitbutton=true]", this.wrapper).click(function () {
                r(i)
            }), jQuery("select[data-autosubmit=true],input:text[data-autosubmit=true]", this.wrapper).change(function () {
                r(i)
            })
        },
        initHashChange: function () {
            var r = document.documentMode,
				t = this,
				i;
            "onhashchange" in window && (r === undefined || r > 7) ? n(window).bind("hashchange", function () {
                var n = u(t.pageIndexName);
                n === 0 && (n = t.initIndex), t.loadData(n, {
                    type: t.httpMethod,
                    data: []
                })
            }) : (i = window.location.hash, setInterval(function () {
                if (window.location.hash != i) {
                    i = window.location.hash;
                    var n = u(t.pageIndexName);
                    n === 0 && (n = t.initIndex), t.loadData(n, {
                        type: t.httpMethod,
                        data: []
                    })
                }
            }, 200))
        },
        loadData: function (t, r) {
            var u = this,
				f;
            t !== -1 && (t !== 0 || !u.isFirstLoad) && (t != u.currentPage || u.allowReload) && (!u.confirm || window.confirm(u.confirm)) && (n.extend(r, {
                url: this.url.replace("__" + u.pageIndexName + "__", t),
                beforeSend: function (t) {
                    var f = r.type.toUpperCase(),
						e;
                    return f === "GET" || f === "POST" || t.setRequestHeader("X-HTTP-Method-Override", f), e = i(u.onBegin, ["xhr"]).apply(this, arguments), e !== !1 && u.loadingElementId !== undefined && n(u.loadingElementId).show(u.loadingDuration), e
                },
                complete: function () {
                    u.loadingElementId !== undefined && n(u.loadingElementId).hide(u.loadingDuration), i(u.onComplete, ["xhr", "status"]).apply(this, arguments)
                },
                success: function (r) {
                    u.partialLoading ? n(u.updateTarget).html(n(u.updateTarget, r).html()) : n(u.updateTarget).html(r), u.currentPage = t, u.isFirstLoad = !1, i(u.onSuccess, ["data", "status", "xhr"]).apply(this, arguments)
                },
                error: i(u.onFailure, ["xhr", "status", "error"])
            }), u.dataFormId !== undefined && o(r.data, u.searchCriteria), r.data.push({
                name: "X-Requested-With",
                value: "XMLHttpRequest"
            }), f = r.type.toUpperCase(), f === "GET" || f === "POST" || (r.type = "POST", r.data.push({
                name: "X-HTTP-Method-Override",
                value: f
            })), n.ajax(r))
        }
    }
})(jQuery), $(function () {
    $("[data-mvcpager=true]").initMvcPagers()
});