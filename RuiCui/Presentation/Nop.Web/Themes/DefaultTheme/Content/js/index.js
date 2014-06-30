Foboy.namespace("app.formatter, app.recharge"), Foboy.app.formatter = { getTrimString: function (a, b) { var c = a; return c = c.split(b).join("") }, getCaret: function (a) { var b = $(a)[0]; if ("number" == typeof b.selectionStart) return { begin: b.selectionStart, end: b.selectionEnd }; var c = document.selection.createRange(); if (c && c.parentElement() === b) { var d = b.createTextRange(), e = b.createTextRange(), f = b.value.length; return d.moveToBookmark(c.getBookmark()), e.collapse(!1), d.compareEndPoints("StartToEnd", e) > -1 ? { begin: f, end: f } : { begin: -d.moveStart("character", -f), end: -d.moveEnd("character", -f) } } return { begin: 0, end: 0 } }, setCaret: function (a, b) { var c = $(a)[0]; if (c.setSelectionRange) c.focus(), c.setSelectionRange(b, b); else if (c.createTextRange) { var d = c.createTextRange(); d.collapse(!0), d.moveStart("character", b), d.moveEnd("character", b), d.select() } }, getSumTotal: function (a, b) { var c = 0; if (0 > b) return 0; b = b < a.length ? b : a.length - 1; for (var d = 0; b + 1 > d; d++) c += a[d]; return c }, formatString: function (a, b) { var c, d, e, f, g = this; c = a.val(), e = g.getTrimString(c, b.separatorSymbol), f = b.separatorSymbol.length; for (var h = 0; h < b.formatPattern.length - 1; h++) d = g.getSumTotal(b.formatPattern, h), e.length >= d + h * f && (e = [e.slice(0, d + f * h), e.slice(d + f * h)].join(b.separatorSymbol)); a.val(e) }, init: function (a, b) { var c, d, e, f, g, h, i, j = this, k = $(a); if (0 === k.length) return k; if (k.length > 1) return k.each(function () { j.init($(this), b) }), this; c = { elmType: "input", formatType: "mobile", formatPattern: [3, 4, 4], stringLength: 11, separatorSymbol: "-" }, d = $.extend({}, c, b), f = d.separatorSymbol.length, e = (d.formatPattern.length - 1) * f, g = function (a) { var b = "undefined" != typeof navigator ? navigator.userAgent : null, c = /iphone/i.test(b); return 8 === a || 46 === a || c && 127 === a }, h = function (a) { var b = { 35: "end", 36: "home", 37: "leftarrow", 38: "uparrow", 39: "rightarrow", 40: "downarrow" }; return b[a] }, i = function (a) { return a.ctrlKey || a.altKey || a.metaKey }; var l = {}; k.on({ keydown: function (a) { if (l = j.getCaret($(this)), l.pos = l.begin, !g(a.which) && !h(a.which) && !i(a)) { l.pos = l.begin + 1; for (var b = 0; b < d.formatPattern.length - 1; b += 1) (l.pos === j.getSumTotal(d.formatPattern, b) + f * b || l.pos === j.getSumTotal(d.formatPattern, b) + f * b + 1) && (l.pos += f) } }, keyup: function (a) { var b = $(this).val(); b.length > d.stringLength + e && ($(this).val(b.substring(0, d.stringLength + e)), j.setCaret($(this), l.pos)), g(a.which) || h(a.which) || i(a) || (j.formatString($(this), d), j.setCaret($(this), l.pos)) }, paste: function () { var a = $(this).val(); a.length > d.stringLength + e && $(this).val(a.substring(0, d.stringLength + e)), j.formatString($(this), d) } }) } }, Foboy.app.recharge = { init: function (a) { function b(a) { var b; return a.length > 1 ? a.each(function () { var a = $(this).attr("checked"); "undefined" != typeof a && a !== !1 && (b = $(this).val()) }) : b = a.val(), b } function c(a) { return Foboy.app.formatter.getTrimString(a, "-") } function d(a) { a === !1 ? m.removeClass("disabled").removeAttr("disabled").val("立即充值") : m.addClass("disabled").attr("disabled", "disabled").val("立即充值") } function e(a) { var b = /^1[3|4|5|8]\d{9}$/; return "" === a || "undefined" == typeof a ? (j.addClass("recharge-tip-error").html("请输入手机号码！").show(), !1) : b.test(a) ? !0 : (j.addClass("recharge-tip-error").html("请输入正确的手机号码！").show(), !1) } function f(a) { var b = /^1[3|4|5|8]\d{9}$/; return b.test(a) ? !0 : void 0 } function g(a, b) { window.location.href = Foboy.GLOBAL_CONFIG.orderSite + "/recharge/submit?mobile=" + a + "&pervalue=" + b } function h(a, b) { var e = Foboy.GLOBAL_CONFIG.orderSite + "/recharge/checkout"; m.val("数据加载中…"), $.ajax({ type: "get", url: e, data: "mobile=" + a + "&pervalue=" + b, dataType: "jsonp", jsonp: "jsonpcallback", success: function (a) { if (a.boolean) { l.html("<span>" + a.sellprice + "</span>元"); var b = j.html(); b !== a.recharge_info && j.html(a.recharge_info), d(!1), a.preferential.boolean && j.html(a.preferential.message), m.on("click", function (a) { if (a.preventDefault(), void 0 === $(this).attr("disabled") || "" === $(this).attr("disabled")) { var b, d = c(i.val()); k.is("select") ? b = k.children("option:selected").val() : k.each(function () { void 0 !== $(this).attr("checked") && "" !== $(this).attr("checked") && (b = $(this).val()) }), g(d, b) } }) } else a.message ? (j.html(a.message).show(), d(!0)) : j.html("维护中…") } }) } var i, j, k, l, m, n, o, p, q; i = a.elmTel, j = a.elmTips, k = a.elmAmount, l = a.elmPrice, m = a.elmSubmit, n = { amount30: "29.55", amount50: "49.2", amount100: "98.4" }, o = function (a) { var b = "undefined" != typeof navigator ? navigator.userAgent : null, c = /iphone/i.test(b); return 8 === a || 46 === a || c && 127 === a }, p = function (a) { var b = { 35: "end", 36: "home", 37: "leftarrow", 38: "uparrow", 39: "rightarrow", 40: "downarrow" }; return b[a] }, q = function (a) { return a.ctrlKey || a.altKey || a.metaKey }, i.on({ focus: function () { j.text("").hide() }, propertychange: function (a) { if (!o(a.which) && !p(a.which) && !q(a)) { var e = c($(this).val()), g = c(b(k)); f(e) ? h(e, g) : d(e.length > 0 ? !1 : !0) } }, input: function (a) { if (!o(a.which) && !p(a.which) && !q(a)) { var e = c($(this).val()), g = c(b(k)); f(e) ? h(e, g) : d(e.length > 0 ? !1 : !0) } } }), k.on("change", function () { var a, f = c(i.val()), g = c(b(k)); e(f) ? h(f, g) : (a = $(this).is("select") ? n[$(this).children("option:selected").attr("id")] : n[$(this).attr("id")], l.html("<span>" + a + "</span>元起"), d(!0)) }), m.closest("form").on("submit", function (a) { var b, f = c(i.val()); k.is("select") ? b = k.children("option:selected").val() : k.each(function () { void 0 !== $(this).attr("checked") && "" !== $(this).attr("checked") && (b = $(this).val()) }), e(f) ? (a.preventDefault(), g(f, b)) : (a.preventDefault(), d(!0)) }) } };; (function () { !function ($, window, document) { var Plugin, defaults, pluginName; return pluginName = "xmSlide", defaults = { width: 940, height: 528, responsiveWidth: 960, start: 1, navigation: { active: !0, effect: "slide" }, pagination: { active: !0, effect: "slide" }, play: { active: !1, effect: "slide", interval: 5e3, auto: !1, swap: !0, pauseOnHover: !1, restartDelay: 2500 }, effect: { slide: { speed: 500 }, fade: { speed: 300, crossfade: !0 } }, callback: { loaded: function () { }, start: function () { }, complete: function () { } } }, Plugin = function () { function Plugin(element, options) { this.element = element, this.options = $.extend(!0, {}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init() } return Plugin }(), Plugin.prototype.init = function () { var $element, nextButton, pagination, playButton, prevButton, stopButton, isOnlyOne, _this = this; return $element = $(this.element), (isOnlyOne = $element.find("img").length > 1 ? !1 : !0) ? !1 : (this.data = $.data(this), $.data(this, "animating", !1), $.data(this, "total", $element.children().not(".xm-slider-navigation", $element).length), $.data(this, "current", this.options.start - 1), $.data(this, "vendorPrefix", this._getVendorPrefix()), "undefined" != typeof TouchEvent && ($.data(this, "touch", !0), this.options.effect.slide.speed = this.options.effect.slide.speed / 2), $element.css({ overflow: "hidden" }), $element.slidesContainer = $element.children().not(".xm-slider-navigation", $element).wrapAll("<div class='xm-slider-container'>", $element).parent().css({ overflow: "hidden", position: "relative" }), $(".xm-slider-container", $element).wrapInner("<div class='xm-slider-control'>", $element).children(), $(".xm-slider-control", $element).css({ position: "relative", left: 0 }), $(".xm-slider-control", $element).children().addClass("xm-slider-slide").css({ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 0, display: "none", webkitBackfaceVisibility: "hidden" }), $.each($(".xm-slider-control", $element).children(), function (i) { var $slide; return $slide = $(this), $slide.attr("xm-slider-index", i) }), this.data.touch && ($(".xm-slider-control", $element).on("touchstart", function (e) { return _this._touchstart(e) }), $(".xm-slider-control", $element).on("touchmove", function (e) { return _this._touchmove(e) }), $(".xm-slider-control", $element).on("touchend", function (e) { return _this._touchend(e) })), $element.fadeIn(0), $element.find("img").each(window.devicePixelRatio < 1.5 ? function () { $(this).attr("data-src-orig", $(this).attr("src")) } : function () { var srcset = $(this).attr("srcset"); srcset && srcset.split(" 2x")[0] && $(this).attr("data-src-orig", srcset.split(" 2x")[0]).removeAttr("srcset") }), this.update(), this.data.touch && this._setuptouch(), $(".xm-slider-control", $element).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function () { return $(this).css({ zIndex: 10 }) }), this.options.navigation.active && !isOnlyOne && (prevButton = $("<a>", { "class": "xm-slider-previous xm-slider-navigation icon-slides icon-slides-prev", href: "#", title: "Previous", text: "Previous" }).appendTo($element), nextButton = $("<a>", { "class": "xm-slider-next xm-slider-navigation icon-slides icon-slides-next", href: "#", title: "Next", text: "Next" }).appendTo($element)), $(".xm-slider-next", $element).click(function (e) { return e.preventDefault(), _this.stop(!0), _this.next(_this.options.navigation.effect) }), $(".xm-slider-previous", $element).click(function (e) { return e.preventDefault(), _this.stop(!0), _this.previous(_this.options.navigation.effect) }), this.options.play.active && (playButton = $("<a>", { "class": "xm-slider-play xm-slider-navigation", href: "#", title: "Play", text: "Play" }).appendTo($element), stopButton = $("<a>", { "class": "xm-slider-stop xm-slider-navigation", href: "#", title: "Stop", text: "Stop" }).appendTo($element), playButton.click(function (e) { return e.preventDefault(), _this.play(!0) }), stopButton.click(function (e) { return e.preventDefault(), _this.stop(!0) }), this.options.play.swap && stopButton.css({ display: "none" })), this.options.pagination.active && (pagination = $("<ul>", { "class": "xm-slider-pagination" }).appendTo($element), $.each(new Array(this.data.total), function (i) { var paginationItem, paginationLink; return paginationItem = $("<li>", { "class": "xm-slider-pagination-item" }).appendTo(pagination), paginationLink = $("<a>", { href: "#", "data-xm-slider-item": i, html: i + 1 }).appendTo(paginationItem), paginationLink.click(function (e) { return e.preventDefault(), _this.stop(!0), _this.goto(1 * $(e.currentTarget).attr("data-xm-slider-item") + 1) }) })), $(window).bind("resize", function () { return _this.update() }), this._setActive(), this.options.play.auto && !isOnlyOne && this.play(), this.options.callback.loaded(this.options.start)) }, Plugin.prototype._setActive = function (number) { var $element, current; return $element = $(this.element), this.data = $.data(this), current = number > -1 ? number : this.data.current, $(".active", $element).removeClass("active"), $(".xm-slider-pagination li:eq(" + current + ") a", $element).addClass("active") }, Plugin.prototype.update = function () { var $element, height, width; return $element = $(this.element), width = $element.width(), this.options.width = width, height = this.options.height, width <= this.options.responsiveWidth && $element.find("img").each(window.devicePixelRatio < 1.5 ? function () { $(this).attr("data-src-r") && $(this).attr("src", $(this).attr("data-src-r")) } : function () { $(this).attr("data-src-r-2x") ? $(this).attr({ src: $(this).attr("data-src-r-2x") }) : $(this).attr("data-src-r") && $(this).attr("src", $(this).attr("data-src-r")) }), width > this.options.responsiveWidth && $element.find("img").each(function () { $(this).attr({ src: $(this).attr("data-src-orig") }) }), $(".xm-slider-control, .xm-slider-container", $element).css({ width: width, height: height }) }, Plugin.prototype.next = function (effect) { var $element; return $element = $(this.element), this.data = $.data(this), $.data(this, "direction", "next"), void 0 === effect && (effect = this.options.navigation.effect), "fade" === effect ? this._fade() : this._slide() }, Plugin.prototype.previous = function (effect) { var $element; return $element = $(this.element), this.data = $.data(this), $.data(this, "direction", "previous"), void 0 === effect && (effect = this.options.navigation.effect), "fade" === effect ? this._fade() : this._slide() }, Plugin.prototype.goto = function (number) { var $element, effect; if ($element = $(this.element), this.data = $.data(this), void 0 === effect && (effect = this.options.pagination.effect), number > this.data.total ? number = this.data.total : 1 > number && (number = 1), "number" == typeof number) return "fade" === effect ? this._fade(number) : this._slide(number); if ("string" == typeof number) { if ("first" === number) return "fade" === effect ? this._fade(0) : this._slide(0); if ("last" === number) return "fade" === effect ? this._fade(this.data.total) : this._slide(this.data.total) } }, Plugin.prototype._setuptouch = function () { var $element, next, previous, slidesControl; return $element = $(this.element), this.data = $.data(this), slidesControl = $(".xm-slider-control", $element), next = this.data.current + 1, previous = this.data.current - 1, 0 > previous && (previous = this.data.total - 1), next > this.data.total - 1 && (next = 0), slidesControl.children(":eq(" + next + ")").css({ display: "block", left: "100%" }), slidesControl.children(":eq(" + previous + ")").css({ display: "block", left: "-100%" }) }, Plugin.prototype._touchstart = function (e) { var $element, touches; return $element = $(this.element), this.data = $.data(this), touches = e.originalEvent.touches[0], this._setuptouch(), $.data(this, "touchtimer", Number(new Date)), $.data(this, "touchstartx", touches.pageX), $.data(this, "touchstarty", touches.pageY), e.stopPropagation() }, Plugin.prototype._touchend = function (e) { var $element, duration, prefix, slidesControl, timing, touches, transform, _this = this; return $element = $(this.element), this.data = $.data(this), touches = e.originalEvent.touches[0], slidesControl = $(".xm-slider-control", $element), slidesControl.position().left > .5 * this.options.width || slidesControl.position().left > .1 * this.options.width && Number(new Date) - this.data.touchtimer < 250 ? ($.data(this, "direction", "previous"), this._slide()) : slidesControl.position().left < -(.5 * this.options.width) || slidesControl.position().left < -(.1 * this.options.width) && Number(new Date) - this.data.touchtimer < 250 ? ($.data(this, "direction", "next"), this._slide()) : (prefix = this.data.vendorPrefix, transform = prefix + "Transform", duration = prefix + "TransitionDuration", timing = prefix + "TransitionTimingFunction", slidesControl[0].style[transform] = "translateX(0px)", slidesControl[0].style[duration] = .85 * this.options.effect.slide.speed + "ms"), slidesControl.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () { return prefix = _this.data.vendorPrefix, transform = prefix + "Transform", duration = prefix + "TransitionDuration", timing = prefix + "TransitionTimingFunction", slidesControl[0].style[transform] = "", slidesControl[0].style[duration] = "", slidesControl[0].style[timing] = "" }), e.stopPropagation() }, Plugin.prototype._touchmove = function (e) { var $element, prefix, slidesControl, touches, transform; return $element = $(this.element), this.data = $.data(this), touches = e.originalEvent.touches[0], prefix = this.data.vendorPrefix, slidesControl = $(".xm-slider-control", $element), transform = prefix + "Transform", $.data(this, "scrolling", Math.abs(touches.pageX - this.data.touchstartx) < Math.abs(touches.pageY - this.data.touchstarty)), this.data.animating || this.data.scrolling || (e.preventDefault(), this._setuptouch(), slidesControl[0].style[transform] = "translateX(" + (touches.pageX - this.data.touchstartx) + "px)"), e.stopPropagation() }, Plugin.prototype.play = function (next) { var $element, currentSlide, slidesContainer, _this = this; return $element = $(this.element), this.data = $.data(this), !this.data.playInterval && (next && (currentSlide = this.data.current, this.data.direction = "next", "fade" === this.options.play.effect ? this._fade() : this._slide()), $.data(this, "playInterval", setInterval(function () { return currentSlide = _this.data.current, _this.data.direction = "next", "fade" === _this.options.play.effect ? _this._fade() : _this._slide() }, this.options.play.interval)), slidesContainer = $($element), this.options.play.pauseOnHover && (slidesContainer.unbind(), slidesContainer.bind("mouseenter", function () { return $(".xm-slider-navigation", $element).show(), _this.stop() }), slidesContainer.bind("mouseleave", function () { return $(".xm-slider-navigation", $element).hide(), _this.play() })), $.data(this, "playing", !0), $(".xm-slider-play", $element).addClass("xm-slider-playing"), this.options.play.swap) ? ($(".xm-slider-play", $element).hide(), $(".xm-slider-stop", $element).show()) : void 0 }, Plugin.prototype.stop = function (clicked) { var $element; return $element = $(this.element), this.data = $.data(this), clearInterval(this.data.playInterval), this.options.play.pauseOnHover && clicked && $(".xm-slider-container", $element).unbind(), $.data(this, "playInterval", null), $.data(this, "playing", !1), $(".xm-slider-play", $element).removeClass("xm-slider-playing"), this.options.play.swap ? ($(".xm-slider-stop", $element).hide(), $(".xm-slider-play", $element).show()) : void 0 }, Plugin.prototype._slide = function (number) { var $element, currentSlide, direction, duration, next, prefix, slidesControl, timing, transform, value, _this = this; return $element = $(this.element), this.data = $.data(this), this.data.animating || number === this.data.current + 1 ? void 0 : ($.data(this, "animating", !0), currentSlide = this.data.current, number > -1 ? (number -= 1, value = number > currentSlide ? 1 : -1, direction = number > currentSlide ? -this.options.width : this.options.width, next = number) : (value = "next" === this.data.direction ? 1 : -1, direction = "next" === this.data.direction ? -this.options.width : this.options.width, next = currentSlide + value), -1 === next && (next = this.data.total - 1), next === this.data.total && (next = 0), this._setActive(next), slidesControl = $(".xm-slider-control", $element), number > -1 && slidesControl.children(":not(:eq(" + currentSlide + "))").css({ display: "none", left: 0, zIndex: 0 }), slidesControl.children(":eq(" + next + ")").css({ display: "block", left: value * this.options.width, zIndex: 10 }), this.options.callback.start(currentSlide + 1), this.data.vendorPrefix ? (prefix = this.data.vendorPrefix, transform = prefix + "Transform", duration = prefix + "TransitionDuration", timing = prefix + "TransitionTimingFunction", slidesControl[0].style[transform] = "translateX(" + direction + "px)", slidesControl[0].style[duration] = this.options.effect.slide.speed + "ms", slidesControl.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () { return slidesControl[0].style[transform] = "", slidesControl[0].style[duration] = "", slidesControl.children(":eq(" + next + ")").css({ left: 0 }), slidesControl.children(":eq(" + currentSlide + ")").css({ display: "none", left: 0, zIndex: 0 }), $.data(_this, "current", next), $.data(_this, "animating", !1), slidesControl.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"), slidesControl.children(":not(:eq(" + next + "))").css({ display: "none", left: 0, zIndex: 0 }), _this.data.touch && _this._setuptouch(), _this.options.callback.complete(next + 1) })) : slidesControl.stop().animate({ left: direction }, this.options.effect.slide.speed, function () { return slidesControl.css({ left: 0 }), slidesControl.children(":eq(" + next + ")").css({ left: 0 }), slidesControl.children(":eq(" + currentSlide + ")").css({ display: "none", left: 0, zIndex: 0 }, $.data(_this, "current", next), $.data(_this, "animating", !1), _this.options.callback.complete(next + 1)) })) }, Plugin.prototype._fade = function (number) { var $element, currentSlide, next, slidesControl, value, _this = this; return $element = $(this.element), this.data = $.data(this), this.data.animating || number === this.data.current + 1 ? void 0 : ($.data(this, "animating", !0), currentSlide = this.data.current, number ? (number -= 1, value = number > currentSlide ? 1 : -1, next = number) : (value = "next" === this.data.direction ? 1 : -1, next = currentSlide + value), -1 === next && (next = this.data.total - 1), next === this.data.total && (next = 0), this._setActive(next), slidesControl = $(".xm-slider-control", $element), slidesControl.children(":eq(" + next + ")").css({ display: "none", left: 0, zIndex: 10 }), this.options.callback.start(currentSlide + 1), this.options.effect.fade.crossfade ? (slidesControl.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed), slidesControl.children(":eq(" + next + ")").stop().fadeIn(this.options.effect.fade.speed, function () { return slidesControl.children(":eq(" + next + ")").css({ zIndex: 0 }), $.data(_this, "animating", !1), $.data(_this, "current", next), _this.options.callback.complete(next + 1) })) : slidesControl.children(":eq(" + currentSlide + ")").stop().fadeOut(this.options.effect.fade.speed, function () { return slidesControl.children(":eq(" + next + ")").stop().fadeIn(_this.options.effect.fade.speed, function () { return slidesControl.children(":eq(" + next + ")").css({ zIndex: 10 }) }), $.data(_this, "animating", !1), $.data(_this, "current", next), _this.options.callback.complete(next + 1) })) }, Plugin.prototype._getVendorPrefix = function () { var body, i, style, transition, vendor; for (body = document.body || document.documentElement, style = body.style, transition = "transition", vendor = ["Moz", "Webkit", "Khtml", "O", "ms"], transition = transition.charAt(0).toUpperCase() + transition.substr(1), i = 0; i < vendor.length;) { if ("string" == typeof style[vendor[i] + transition]) return vendor[i]; i++ } return !1 }, $.fn[pluginName] = function (options) { return this.each(function () { return $.data(this, "plugin_" + pluginName) ? void 0 : $.data(this, "plugin_" + pluginName, new Plugin(this, options)) }) } }(jQuery, window, document) }).call(this);; Foboy.namespace("mhome"), Foboy.mhome = { commentedGoods: function () { var cidStr, $commentedGoods = $(".J_commentedGoods"); if (0 === isCommentOpen) return !1; for (var i = 0, lens = $commentedGoods.length; lens > i; i += 1) cidStr = 0 === i ? $commentedGoods.eq(i).attr("data-cid") : cidStr + "-" + $commentedGoods.eq(i).attr("data-cid"); $.ajax({ type: "GET", url: Foboy.GLOBAL_CONFIG.wwwSite + "/comment/total/id/" + cidStr, dataType: "jsonp", jsonpCallback: "commentTotal", cache: !0, success: function (data) { if (0 === data.errorno) for (var i in data.totalArr) if (data.totalArr.hasOwnProperty(i)) { var $goods = $('[data-cid="' + i + '"]'); if ($goods.length) { var html = '<span class="icon-stat icon-stat-' + data.totalArr[i].star + '"></span>'; 0 !== data.totalArr[i].total && (html += '<span class="sep">|</span>' + data.totalArr[i].total + "人评价"), $goods.find(".item-meta").html(html) } } } }) }, secKillGoods: function () { return 0 === isSekillOpen ? !1 : void $.ajax({ type: "GET", url: Foboy.GLOBAL_CONFIG.wwwSite + "/misc/getsekillinfo", dataType: "jsonp", jsonpCallback: "sekillInfo", cache: !0, success: function (data) { var html; 0 === data.errorno && (html = 0 === data.is_seckill ? '<a href="http://10.mi.com/#shopspecialbox" target="_blank"><span class="item-info"><span class="item-title">' + data.goods_name + '</span><span class="item-price">' + data.shop_price + "元 <del>" + data.market_price + '元</del></span><span class="item-desc">还有更多特价商品</span><span class="item-thumb"><img src="' + data.image + '?width=100&height=100" srcset="' + data.image + '?width=200&height=200 2x" alt="" /></span><span class="item-flag"><span class="icon-flag">特价商品</span></span></a>' : '<a href="http://10.mi.com/" target="_blank"><span class="item-info"><span class="item-title">' + data.goods_name + '</span><span class="item-price">' + data.shop_price + "元 <del>" + data.market_price + '元</del></span><span class="item-desc">上午十点 开始秒杀</span><span class="item-thumb"><img src="' + data.image + '?width=100&height=100" srcset="' + data.image + '?width=200&height=200 2x" alt="" /></span><span class="item-flag"><span class="icon-flag">特价秒杀</span></span></a>', $("#J_secKillGoods").html(html).find("a").attr("onclick", "_msq.push(['trackEvent','CN-WW-HP-AD-2', '', '2']);_hmt.push(['_trackEvent','首页', '首页_specia_2','首页_specia_2_http://10.mi.com/']);")) } }) } }, jQuery(function ($) { if ($("#J_homeSlider").xmSlide({ width: 992, height: 420, responsiveWidth: 744, navigation: { effect: "fade" }, effect: { fade: { speed: 400 } }, play: { effect: "fade", interval: 5e3, auto: !0, pauseOnHover: !0, restartDelay: 2500 } }), Foboy.app.carousel.init($(".J_starGoodsCarousel"), { itemSelector: ".xm-star-goods-item" }), Foboy.app.recharge.init({ elmTel: $("#rechargeTel"), elmTips: $("#rechargeTips"), elmAmount: $("#rechargeAmount"), elmPrice: $("#rechargePrice"), elmSubmit: $("#rechargeBtn") }), Foboy.app.formatter.init($("#rechargeTel"), null), Foboy.app.selector.init($("#rechargeAmount"), {}), Foboy.mhome.commentedGoods(), Foboy.mhome.secKillGoods(), Foboy.app.lazyLoad(), Foboy.app.analytics([".xm-slider-container", ".home-hd-show", ".xm-star-goods-list", ".home-new-goods .brick-list", ".home-hot-goods .brick-list", ".board-section", ".home-commented-goods .xm-commented-goods-list", ".home-saleoff-goods-list", ".home-duokan-goods .xm-commented-goods-list", ".home-miui-goods .xm-commented-goods-list", ".news-section", ".channel-list", ".list-service"], { position: ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "NEWS", "specia", "service"], mstPage: "HP", mstArea: "AD", mstPosition: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "", ""], isMst: !0 }), Foboy.app.analytics([".site-topbar", ".open-buy-info", ".site-logo", ".cart-section", ".footer-links", ".footer-info"], { position: ["A", "顶部链接", "logo", "A", "about", "footer"], BDurl: !1 }), -1 === window.location.href.indexOf("index.php")) { var userLanguage = Foboy.app.cookie("userLanguage"), browserLanguage = window.navigator.language || window.navigator.userLanguage; browserLanguage = browserLanguage.toLowerCase(), "zh-tw" === userLanguage ? window.location.href = "" : "zh-hk" === userLanguage ? window.location.href = "" : "zh-sg" === userLanguage ? window.location.href = "" : "en-us" === userLanguage ? window.location.href = "http://www.mi.com/en/" : "zh-cn" !== userLanguage && ("zh-tw" === browserLanguage ? (Foboy.app.cookie("browserLanguage", "zh-tw", { expires: 365, path: "/" }), window.location.href = "/misites/redirect/") : "zh-hk" === browserLanguage ? (Foboy.app.cookie("browserLanguage", "zh-hk", { expires: 365, path: "/" }), window.location.href = "/misites/redirect/") : "zh-sg" === browserLanguage ? (Foboy.app.cookie("browserLanguage", "zh-sg", { expires: 365, path: "/" }), window.location.href = "/misites/redirect/") : "zh-cn" !== browserLanguage && $.ajax({ dataType: "JSONP", url: "http://region.www.xiaomi.com/x_s_n_m_z_h_s_region.json", jsonpCallback: "redirectcallback", success: function (data) { "SG" === data.code ? (Foboy.app.cookie("browserLanguage", "zh-sg", { expires: 365, path: "/" }), window.location.href = "/misites/redirect/") : "MY" === data.code ? (Foboy.app.cookie("browserLanguage", "en-my", { expires: 365, path: "/" }), window.location.href = "/misites/redirect/") : "CN" !== data.code && "HK" !== data.code && "TW" !== data.code && (Foboy.app.cookie("browserLanguage", "en-us", { expires: 365, path: "/" }), window.location.href = "/en/") } })) } });