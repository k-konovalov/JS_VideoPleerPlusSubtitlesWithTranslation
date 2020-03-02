/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e) {
    "use strict";
    e(function() {
        e.support.transition = function() {
            var e = function() {
                var e = document.createElement("bootstrap"), t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                }, n;
                for (n in t)
                    if (e.style[n] !== undefined)
                        return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]'
      , n = function(n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function(t) {
        function s() {
            i.trigger("closed").remove()
        }
        var n = e(this), r = n.attr("data-target"), i;
        r || (r = n.attr("href"),
        r = r && r.replace(/.*(?=#[^\s]*$)/, "")),
        i = e(r),
        t && t.preventDefault(),
        i.length || (i = n.hasClass("alert") ? n : n.parent()),
        i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())
            return;
        i.removeClass("in"),
        e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }
    ;
    var r = e.fn.alert;
    e.fn.alert = function(t) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("alert");
            i || r.data("alert", i = new n(this)),
            typeof t == "string" && i[t].call(r)
        })
    }
    ,
    e.fn.alert.Constructor = n,
    e.fn.alert.noConflict = function() {
        return e.fn.alert = r,
        this
    }
    ,
    e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t),
        this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled"
          , n = this.$element
          , r = n.data()
          , i = n.is("input") ? "val" : "html";
        e += "Text",
        r.resetText || n.data("resetText", n[i]()),
        n[i](r[e] || this.options[e]),
        setTimeout(function() {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }
    ,
    t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"),
        this.$element.toggleClass("active")
    }
    ;
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("button")
              , s = typeof n == "object" && n;
            i || r.data("button", i = new t(this,s)),
            n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }
    ,
    e.fn.button.defaults = {
        loadingText: "loading..."
    },
    e.fn.button.Constructor = t,
    e.fn.button.noConflict = function() {
        return e.fn.button = n,
        this
    }
    ,
    e(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")),
        n.button("toggle")
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = n,
        this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function(t) {
            return t || (this.paused = !1),
            this.interval && clearInterval(this.interval),
            this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)),
            this
        },
        getActiveIndex: function() {
            return this.$active = this.$element.find(".item.active"),
            this.$items = this.$active.parent().children(),
            this.$items.index(this.$active)
        },
        to: function(t) {
            var n = this.getActiveIndex()
              , r = this;
            if (t > this.$items.length - 1 || t < 0)
                return;
            return this.sliding ? this.$element.one("slid", function() {
                r.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", e(this.$items[t]))
        },
        pause: function(t) {
            return t || (this.paused = !0),
            this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end),
            this.cycle(!0)),
            clearInterval(this.interval),
            this.interval = null,
            this
        },
        next: function() {
            if (this.sliding)
                return;
            return this.slide("next")
        },
        prev: function() {
            if (this.sliding)
                return;
            return this.slide("prev")
        },
        slide: function(t, n) {
            var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left" : "right", u = t == "next" ? "first" : "last", a = this, f;
            this.sliding = !0,
            s && this.pause(),
            i = i.length ? i : this.$element.find(".item")[u](),
            f = e.Event("slide", {
                relatedTarget: i[0],
                direction: o
            });
            if (i.hasClass("active"))
                return;
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"),
            this.$element.one("slid", function() {
                var t = e(a.$indicators.children()[a.getActiveIndex()]);
                t && t.addClass("active")
            }));
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())
                    return;
                i.addClass(t),
                i[0].offsetWidth,
                r.addClass(o),
                i.addClass(o),
                this.$element.one(e.support.transition.end, function() {
                    i.removeClass([t, o].join(" ")).addClass("active"),
                    r.removeClass(["active", o].join(" ")),
                    a.sliding = !1,
                    setTimeout(function() {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())
                    return;
                r.removeClass("active"),
                i.addClass("active"),
                this.sliding = !1,
                this.$element.trigger("slid")
            }
            return s && this.cycle(),
            this
        }
    };
    var n = e.fn.carousel;
    e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("carousel")
              , s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n)
              , o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this,s)),
            typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
        })
    }
    ,
    e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    },
    e.fn.carousel.Constructor = t,
    e.fn.carousel.noConflict = function() {
        return e.fn.carousel = n,
        this
    }
    ,
    e(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
        var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = e.extend({}, i.data(), n.data()), o;
        i.carousel(s),
        (o = n.attr("data-slide-to")) && i.data("carousel").pause().to(o).cycle(),
        t.preventDefault()
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t),
        this.options = e.extend({}, e.fn.collapse.defaults, n),
        this.options.parent && (this.$parent = e(this.options.parent)),
        this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function() {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function() {
            var t, n, r, i;
            if (this.transitioning || this.$element.hasClass("in"))
                return;
            t = this.dimension(),
            n = e.camelCase(["scroll", t].join("-")),
            r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning)
                    return;
                r.collapse("hide"),
                i || r.data("collapse", null)
            }
            this.$element[t](0),
            this.transition("addClass", e.Event("show"), "shown"),
            e.support.transition && this.$element[t](this.$element[0][n])
        },
        hide: function() {
            var t;
            if (this.transitioning || !this.$element.hasClass("in"))
                return;
            t = this.dimension(),
            this.reset(this.$element[t]()),
            this.transition("removeClass", e.Event("hide"), "hidden"),
            this.$element[t](0)
        },
        reset: function(e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth,
            this.$element[e !== null ? "addClass" : "removeClass"]("collapse"),
            this
        },
        transition: function(t, n, r) {
            var i = this
              , s = function() {
                n.type == "show" && i.reset(),
                i.transitioning = 0,
                i.$element.trigger(r)
            };
            this.$element.trigger(n);
            if (n.isDefaultPrevented())
                return;
            this.transitioning = 1,
            this.$element[t]("in"),
            e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("collapse")
              , s = e.extend({}, e.fn.collapse.defaults, r.data(), typeof n == "object" && n);
            i || r.data("collapse", i = new t(this,s)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.collapse.defaults = {
        toggle: !0
    },
    e.fn.collapse.Constructor = t,
    e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n,
        this
    }
    ,
    e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle" : n.data();
        n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"),
        e(i).collapse(s)
    })
}(window.jQuery),
!function(e) {
    "use strict";
    function r() {
        e(t).each(function() {
            i(e(this)).removeClass("open")
        })
    }
    function i(t) {
        var n = t.attr("data-target"), r;
        n || (n = t.attr("href"),
        n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")),
        r = n && e(n);
        if (!r || !r.length)
            r = t.parent();
        return r
    }
    var t = "[data-toggle=dropdown]"
      , n = function(t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function() {
            n.parent().removeClass("open")
        })
    };
    n.prototype = {
        constructor: n,
        toggle: function(t) {
            var n = e(this), s, o;
            if (n.is(".disabled, :disabled"))
                return;
            return s = i(n),
            o = s.hasClass("open"),
            r(),
            o || s.toggleClass("open"),
            n.focus(),
            !1
        },
        keydown: function(n) {
            var r, s, o, u, a, f;
            if (!/(38|40|27)/.test(n.keyCode))
                return;
            r = e(this),
            n.preventDefault(),
            n.stopPropagation();
            if (r.is(".disabled, :disabled"))
                return;
            u = i(r),
            a = u.hasClass("open");
            if (!a || a && n.keyCode == 27)
                return n.which == 27 && u.find(t).focus(),
                r.click();
            s = e("[role=menu] li:not(.divider):visible a", u);
            if (!s.length)
                return;
            f = s.index(s.filter(":focus")),
            n.keyCode == 38 && f > 0 && f--,
            n.keyCode == 40 && f < s.length - 1 && f++,
            ~f || (f = 0),
            s.eq(f).focus()
        }
    };
    var s = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)),
            typeof t == "string" && i[t].call(r)
        })
    }
    ,
    e.fn.dropdown.Constructor = n,
    e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = s,
        this
    }
    ,
    e(document).on("click.dropdown.data-api", r).on("click.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.dropdown-menu", function(e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n,
        this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)),
        this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var t = this
              , n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())
                return;
            this.isShown = !0,
            this.escape(),
            this.backdrop(function() {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body),
                t.$element.show(),
                n && t.$element[0].offsetWidth,
                t.$element.addClass("in").attr("aria-hidden", !1),
                t.enforceFocus(),
                n ? t.$element.one(e.support.transition.end, function() {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            })
        },
        hide: function(t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"),
            this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())
                return;
            this.isShown = !1,
            this.escape(),
            e(document).off("focusin.modal"),
            this.$element.removeClass("in").attr("aria-hidden", !0),
            e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        },
        enforceFocus: function() {
            var t = this;
            e(document).on("focusin.modal", function(e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function() {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this
              , n = setTimeout(function() {
                t.$element.off(e.support.transition.end),
                t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function() {
                clearTimeout(n),
                t.hideModal()
            })
        },
        hideModal: function() {
            var e = this;
            this.$element.hide(),
            this.backdrop(function() {
                e.removeBackdrop(),
                e.$element.trigger("hidden")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(),
            this.$backdrop = null
        },
        backdrop: function(t) {
            var n = this
              , r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body),
                this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)),
                i && this.$backdrop[0].offsetWidth,
                this.$backdrop.addClass("in");
                if (!t)
                    return;
                i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else
                !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"),
                e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
        }
    };
    var n = e.fn.modal;
    e.fn.modal = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("modal")
              , s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this,s)),
            typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }
    ,
    e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    e.fn.modal.Constructor = t,
    e.fn.modal.noConflict = function() {
        return e.fn.modal = n,
        this
    }
    ,
    e(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this)
          , r = n.attr("href")
          , i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, ""))
          , s = i.data("modal") ? "toggle" : e.extend({
            remote: !/#/.test(r) && r
        }, i.data(), n.data());
        t.preventDefault(),
        i.modal(s).one("hide", function() {
            n.focus()
        })
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function(t, n, r) {
            var i, s, o, u, a;
            this.type = t,
            this.$element = e(n),
            this.options = this.getOptions(r),
            this.enabled = !0,
            o = this.options.trigger.split(" ");
            for (a = o.length; a--; )
                u = o[a],
                u == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : u != "manual" && (i = u == "hover" ? "mouseenter" : "focus",
                s = u == "hover" ? "mouseleave" : "blur",
                this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)),
                this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
            this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t),
            t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }),
            t
        },
        enter: function(t) {
            var n = e.fn[this.type].defaults, r = {}, i;
            this._options && e.each(this._options, function(e, t) {
                n[e] != t && (r[e] = t)
            }, this),
            i = e(t.currentTarget)[this.type](r).data(this.type);
            if (!i.options.delay || !i.options.delay.show)
                return i.show();
            clearTimeout(this.timeout),
            i.hoverState = "in",
            this.timeout = setTimeout(function() {
                i.hoverState == "in" && i.show()
            }, i.options.delay.show)
        },
        leave: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide)
                return n.hide();
            n.hoverState = "out",
            this.timeout = setTimeout(function() {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        },
        show: function() {
            var t, n, r, i, s, o, u = e.Event("show");
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(u);
                if (u.isDefaultPrevented())
                    return;
                t = this.tip(),
                this.setContent(),
                this.options.animation && t.addClass("fade"),
                s = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement,
                t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }),
                this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element),
                n = this.getPosition(),
                r = t[0].offsetWidth,
                i = t[0].offsetHeight;
                switch (s) {
                case "bottom":
                    o = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case "top":
                    o = {
                        top: n.top - i,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case "left":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left - r
                    };
                    break;
                case "right":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left + n.width
                    }
                }
                this.applyPlacement(o, s),
                this.$element.trigger("shown")
            }
        },
        applyPlacement: function(e, t) {
            var n = this.tip(), r = n[0].offsetWidth, i = n[0].offsetHeight, s, o, u, a;
            n.offset(e).addClass(t).addClass("in"),
            s = n[0].offsetWidth,
            o = n[0].offsetHeight,
            t == "top" && o != i && (e.top = e.top + i - o,
            a = !0),
            t == "bottom" || t == "top" ? (u = 0,
            e.left < 0 && (u = e.left * -2,
            e.left = 0,
            n.offset(e),
            s = n[0].offsetWidth,
            o = n[0].offsetHeight),
            this.replaceArrow(u - r + s, s, "left")) : this.replaceArrow(o - i, o, "top"),
            a && n.offset(e)
        },
        replaceArrow: function(e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
        },
        setContent: function() {
            var e = this.tip()
              , t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
            e.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function i() {
                var t = setTimeout(function() {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function() {
                    clearTimeout(t),
                    n.detach()
                })
            }
            var t = this
              , n = this.tip()
              , r = e.Event("hide");
            this.$element.trigger(r);
            if (r.isDefaultPrevented())
                return;
            return n.removeClass("in"),
            e.support.transition && this.$tip.hasClass("fade") ? i() : n.detach(),
            this.$element.trigger("hidden"),
            this
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var t = this.$element[0];
            return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }, this.$element.offset())
        },
        getTitle: function() {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title),
            e
        },
        tip: function() {
            return this.$tip = this.$tip || e(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(),
            this.$element = null,
            this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(t) {
            var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
            n.tip().hasClass("in") ? n.hide() : n.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("tooltip")
              , s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this,s)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.tooltip.Constructor = t,
    e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    },
    e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n,
        this
    }
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function() {
            var e = this.tip()
              , t = this.getTitle()
              , n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t),
            e.find(".popover-content")[this.options.html ? "html" : "text"](n),
            e.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var e, t = this.$element, n = this.options;
            return e = (typeof n.content == "function" ? n.content.call(t[0]) : n.content) || t.attr("data-content"),
            e
        },
        tip: function() {
            return this.$tip || (this.$tip = e(this.options.template)),
            this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var n = e.fn.popover;
    e.fn.popover = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("popover")
              , s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this,s)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.popover.Constructor = t,
    e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    e.fn.popover.noConflict = function() {
        return e.fn.popover = n,
        this
    }
}(window.jQuery),
!function(e) {
    "use strict";
    function t(t, n) {
        var r = e.proxy(this.process, this), i = e(t).is("body") ? e(window) : e(t), s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n),
        this.$scrollElement = i.on("scroll.scroll-spy.data-api", r),
        this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a",
        this.$body = e("body"),
        this.refresh(),
        this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function() {
            var t = this, n;
            this.offsets = e([]),
            this.targets = e([]),
            n = this.$body.find(this.selector).map(function() {
                var n = e(this)
                  , r = n.data("target") || n.attr("href")
                  , i = /^#\w/.test(r) && e(r);
                return i && i.length && [[i.position().top + (!e.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), r]] || null
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).each(function() {
                t.offsets.push(this[0]),
                t.targets.push(this[1])
            })
        },
        process: function() {
            var e = this.$scrollElement.scrollTop() + this.options.offset, t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = t - this.$scrollElement.height(), r = this.offsets, i = this.targets, s = this.activeTarget, o;
            if (e >= n)
                return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--; )
                s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function(t) {
            var n, r;
            this.activeTarget = t,
            e(this.selector).parent(".active").removeClass("active"),
            r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            n = e(r).parent("li").addClass("active"),
            n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")),
            n.trigger("activate")
        }
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("scrollspy")
              , s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this,s)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.scrollspy.Constructor = t,
    e.fn.scrollspy.defaults = {
        offset: 10
    },
    e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = n,
        this
    }
    ,
    e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
            r || (r = t.attr("href"),
            r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active"))
                return;
            i = n.find(".active:last a")[0],
            o = e.Event("show", {
                relatedTarget: i
            }),
            t.trigger(o);
            if (o.isDefaultPrevented())
                return;
            s = e(r),
            this.activate(t.parent("li"), n),
            this.activate(s, s.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function(t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
                t.addClass("active"),
                s ? (t[0].offsetWidth,
                t.addClass("in")) : t.removeClass("fade"),
                t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"),
                r && r()
            }
            var i = n.find("> .active")
              , s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(),
            i.removeClass("in")
        }
    };
    var n = e.fn.tab;
    e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("tab");
            i || r.data("tab", i = new t(this)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.tab.Constructor = t,
    e.fn.tab.noConflict = function() {
        return e.fn.tab = n,
        this
    }
    ,
    e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(),
        e(this).tab("show")
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t),
        this.options = e.extend({}, e.fn.typeahead.defaults, n),
        this.matcher = this.options.matcher || this.matcher,
        this.sorter = this.options.sorter || this.sorter,
        this.highlighter = this.options.highlighter || this.highlighter,
        this.updater = this.options.updater || this.updater,
        this.source = this.options.source,
        this.$menu = e(this.options.menu),
        this.shown = !1,
        this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(),
            this.hide()
        },
        updater: function(e) {
            return e
        },
        show: function() {
            var t = e.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: t.top + t.height,
                left: t.left
            }).show(),
            this.shown = !0,
            this
        },
        hide: function() {
            return this.$menu.hide(),
            this.shown = !1,
            this
        },
        lookup: function(t) {
            var n;
            return this.query = this.$element.val(),
            !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source,
            n ? this.process(n) : this)
        },
        process: function(t) {
            var n = this;
            return t = e.grep(t, function(e) {
                return n.matcher(e)
            }),
            t = this.sorter(t),
            t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(e) {
            var t = [], n = [], r = [], i;
            while (i = e.shift())
                i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function(e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")","ig"), function(e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function(t) {
            var n = this;
            return t = e(t).map(function(t, r) {
                return t = e(n.options.item).attr("data-value", r),
                t.find("a").html(n.highlighter(r)),
                t[0]
            }),
            t.first().addClass("active"),
            this.$menu.html(t),
            this
        },
        next: function(t) {
            var n = this.$menu.find(".active").removeClass("active")
              , r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])),
            r.addClass("active")
        },
        prev: function(e) {
            var t = this.$menu.find(".active").removeClass("active")
              , n = t.prev();
            n.length || (n = this.$menu.find("li").last()),
            n.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", e.proxy(this.focus, this)).on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)),
            this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)),
            this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this)).on("mouseleave", "li", e.proxy(this.mouseleave, this))
        },
        eventSupported: function(e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"),
            t = typeof this.$element[e] == "function"),
            t
        },
        move: function(e) {
            if (!this.shown)
                return;
            switch (e.keyCode) {
            case 9:
            case 13:
            case 27:
                e.preventDefault();
                break;
            case 38:
                e.preventDefault(),
                this.prev();
                break;
            case 40:
                e.preventDefault(),
                this.next()
            }
            e.stopPropagation()
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat = ~e.inArray(t.keyCode, [40, 38, 9, 13, 27]),
            this.move(t)
        },
        keypress: function(e) {
            if (this.suppressKeyPressRepeat)
                return;
            this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown)
                    return;
                this.select();
                break;
            case 27:
                if (!this.shown)
                    return;
                this.hide();
                break;
            default:
                this.lookup()
            }
            e.stopPropagation(),
            e.preventDefault()
        },
        focus: function(e) {
            this.focused = !0
        },
        blur: function(e) {
            this.focused = !1,
            !this.mousedover && this.shown && this.hide()
        },
        click: function(e) {
            e.stopPropagation(),
            e.preventDefault(),
            this.select(),
            this.$element.focus()
        },
        mouseenter: function(t) {
            this.mousedover = !0,
            this.$menu.find(".active").removeClass("active"),
            e(t.currentTarget).addClass("active")
        },
        mouseleave: function(e) {
            this.mousedover = !1,
            !this.focused && this.shown && this.hide()
        }
    };
    var n = e.fn.typeahead;
    e.fn.typeahead = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("typeahead")
              , s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this,s)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    },
    e.fn.typeahead.Constructor = t,
    e.fn.typeahead.noConflict = function() {
        return e.fn.typeahead = n,
        this
    }
    ,
    e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
        var n = e(this);
        if (n.data("typeahead"))
            return;
        n.typeahead(n.data())
    })
}(window.jQuery),
!function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n),
        this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function() {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)),
        this.$element = e(t),
        this.checkPosition()
    };
    t.prototype.checkPosition = function() {
        if (!this.$element.is(":visible"))
            return;
        var t = e(document).height(), n = this.$window.scrollTop(), r = this.$element.offset(), i = this.options.offset, s = i.bottom, o = i.top, u = "affix affix-top affix-bottom", a;
        typeof i != "object" && (s = o = i),
        typeof o == "function" && (o = i.top()),
        typeof s == "function" && (s = i.bottom()),
        a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a)
            return;
        this.affixed = a,
        this.unpin = a == "bottom" ? r.top - n : null,
        this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    }
    ;
    var n = e.fn.affix;
    e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this)
              , i = r.data("affix")
              , s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this,s)),
            typeof n == "string" && i[n]()
        })
    }
    ,
    e.fn.affix.Constructor = t,
    e.fn.affix.defaults = {
        offset: 0
    },
    e.fn.affix.noConflict = function() {
        return e.fn.affix = n,
        this
    }
    ,
    e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this)
              , n = t.data();
            n.offset = n.offset || {},
            n.offsetBottom && (n.offset.bottom = n.offsetBottom),
            n.offsetTop && (n.offset.top = n.offsetTop),
            t.affix(n)
        })
    })
}(window.jQuery);
/*!

   Flowplayer v5.4.4 (2013-12-05) | flowplayer.org/license

*/
!function(e) {
    function t(t, n) {
        var i = "obj" + ("" + Math.random()).slice(2, 15)
          , o = '<object class="fp-engine" id="' + i + '" name="' + i + '" ';
        o += e.browser.msie ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' : ' data="' + t + '" type="application/x-shockwave-flash">';
        var a = {
            width: "100%",
            height: "100%",
            allowscriptaccess: "always",
            wmode: "transparent",
            quality: "high",
            flashvars: "",
            movie: t + (e.browser.msie ? "?" + i : ""),
            name: i
        };
        return e.each(n, function(e, t) {
            a.flashvars += e + "=" + t + "&"
        }),
        e.each(a, function(e, t) {
            o += '<param name="' + e + '" value="' + t + '"/>'
        }),
        o += "</object>",
        e(o)
    }
    function n(e, t) {
        return t = t || 100,
        Math.round(e * t) / t
    }
    function i(e) {
        return /mpegurl/i.test(e) ? "application/x-mpegurl" : "video/" + e
    }
    function o(e) {
        return /^(video|application)/.test(e) || (e = i(e)),
        !!g.canPlayType(e).replace("no", "")
    }
    function a(t, n) {
        var i = e.grep(t, function(e) {
            return e.type === n
        });
        return i.length ? i[0] : null
    }
    function r(e) {
        var t = e.attr("src")
          , n = e.attr("type") || ""
          , i = t.split(y)[1];
        return n = /mpegurl/.test(n) ? "mpegurl" : n.replace("video/", ""),
        {
            src: t,
            suffix: i || n,
            type: n || i
        }
    }
    function s(t) {
        var n = this
          , i = [];
        e("source", t).each(function() {
            i.push(r(e(this)))
        }),
        i.length || i.push(r(t)),
        n.initialSources = i,
        n.resolve = function(t) {
            return t ? (e.isArray(t) ? t = {
                sources: e.map(t, function(t) {
                    var n, i = e.extend({}, t);
                    return e.each(t, function(e) {
                        n = e
                    }),
                    i.type = n,
                    i.src = t[n],
                    delete i[n],
                    i
                })
            } : "string" == typeof t && (t = {
                src: t,
                sources: []
            },
            e.each(i, function(e, n) {
                "flash" != n.type && t.sources.push({
                    type: n.type,
                    src: t.src.replace(y, "." + n.suffix + "$2")
                })
            })),
            t) : {
                sources: i
            }
        }
    }
    function l(e) {
        return e = parseInt(e, 10),
        e >= 10 ? e : "0" + e
    }
    function d(e) {
        e = e || 0;
        var t = Math.floor(e / 3600)
          , n = Math.floor(e / 60);
        return e -= 60 * n,
        t >= 1 ? (n -= 60 * t,
        t + ":" + l(n) + ":" + l(e)) : l(n) + ":" + l(e)
    }
    !function(e) {
        if (!e.browser) {
            var t = e.browser = {}
              , n = navigator.userAgent.toLowerCase()
              , i = /(chrome)[ \/]([\w.]+)/.exec(n) || /(safari)[ \/]([\w.]+)/.exec(n) || /(webkit)[ \/]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || n.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [];
            i[1] && (t[i[1]] = !0,
            t.version = i[2] || "0")
        }
    }(jQuery),
    e(function() {
        "function" == typeof e.fn.flowplayer && e("video").parent(".flowplayer").flowplayer()
    });
    var u = []
      , c = []
      , p = window.navigator.userAgent;
    window.flowplayer = function(t) {
        return e.isFunction(t) ? c.push(t) : "number" == typeof t || void 0 === t ? u[t || 0] : e(t).data("flowplayer")
    }
    ,
    e(window).on("beforeunload", function() {
        e.each(u, function(t, n) {
            n.conf.splash ? n.unload() : n.bind("error", function() {
                e(".flowplayer.is-error .fp-message").remove()
            })
        })
    }),
    e.extend(flowplayer, {
        version: "5.4.4",
        engine: {},
        conf: {},
        support: {},
        defaults: {
            debug: !1,
            disabled: !1,
            engine: "html5",
            fullscreen: window == window.top,
            keyboard: !0,
            ratio: 9 / 16,
            adaptiveRatio: !1,
            flashfit: !1,
            rtmp: 0,
            splash: !1,
            live: !1,
            swf: "//releases.flowplayer.org/5.4.4/flowplayer.swf",
            speeds: [.25, .5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
            tooltip: !0,
            volume: "object" != typeof localStorage ? 1 : "true" == localStorage.muted ? 0 : isNaN(localStorage.volume) ? 1 : localStorage.volume || 1,
            errors: ["", "Video loading aborted", "Network error", "Video not properly encoded", "Video file not found", "Unsupported video", "Skin not found", "SWF file not found", "Subtitles not found", "Invalid RTMP URL", "Unsupported video format. Try installing Adobe Flash."],
            errorUrls: ["", "", "", "", "", "", "", "", "", "", "http://get.adobe.com/flashplayer/"],
            playlist: []
        }
    });
    var f = 1;
    e.fn.flowplayer = function(t, n) {
        return "string" == typeof t && (t = {
            swf: t
        }),
        e.isFunction(t) && (n = t,
        t = {}),
        !t && this.data("flowplayer") || this.each(function() {
            var i, o, a = e(this).addClass("is-loading"), r = e.extend({}, flowplayer.defaults, flowplayer.conf, t, a.data()), l = e("video", a).addClass("fp-engine").removeAttr("controls"), d = l.length ? new s(l) : null, p = {};
            if (flowplayer.support.firstframe || l.detach(),
            r.playlist.length) {
                var v, g = l.attr("preload");
                l.length && l.replaceWith(v = e("<p />")),
                l = e("<video />").addClass("fp-engine"),
                v ? v.replaceWith(l) : a.prepend(l),
                l.attr("preload", g),
                "string" == typeof r.playlist[0] ? l.attr("src", r.playlist[0]) : e.each(r.playlist[0], function(t, n) {
                    for (var i in n)
                        n.hasOwnProperty(i) && l.append(e("<source />").attr({
                            type: "video/" + i,
                            src: n[i]
                        }))
                }),
                d = new s(l)
            }
            var m = a.data("flowplayer");
            m && m.unload(),
            a.data("fp-player_id", a.data("fp-player_id") || f++);
            try {
                p = window.localStorage || p
            } catch (h) {}
            var y = this.currentStyle && "rtl" === this.currentStyle.direction || window.getComputedStyle && "rtl" === window.getComputedStyle(this, null).getPropertyValue("direction");
            y && a.addClass("is-rtl");
            var b = m || {
                conf: r,
                currentSpeed: 1,
                volumeLevel: "undefined" == typeof r.volume ? 1 * p.volume : r.volume,
                video: {},
                disabled: !1,
                finished: !1,
                loading: !1,
                muted: "true" == p.muted || r.muted,
                paused: !1,
                playing: !1,
                ready: !1,
                splash: !1,
                rtl: y,
                load: function(t, n) {
                    if (!(b.error || b.loading || b.disabled)) {
                        if (t = d.resolve(t),
                        e.extend(t, o.pick(t.sources)),
                        t.src) {
                            var i = e.Event("load");
                            a.trigger(i, [b, t, o]),
                            i.isDefaultPrevented() ? b.loading = !1 : (o.load(t),
                            e.isFunction(t) && (n = t),
                            n && a.one("ready", n))
                        }
                        return b
                    }
                },
                pause: function(e) {
                    return !b.ready || b.seeking || b.disabled || b.loading || (o.pause(),
                    b.one("pause", e)),
                    b
                },
                resume: function() {
                    return b.ready && b.paused && !b.disabled && (o.resume(),
                    b.finished && (b.trigger("resume"),
                    b.finished = !1)),
                    b
                },
                toggle: function() {
                    return b.ready ? b.paused ? b.resume() : b.pause() : b.load()
                },
                seek: function(t, n) {
                    if (b.ready) {
                        if ("boolean" == typeof t) {
                            var r = 3;
                            t = b.video.time + (t ? r : -r)
                        }
                        t = i = Math.min(Math.max(t, 0), b.video.duration).toFixed(1);
                        var s = e.Event("beforeseek");
                        a.trigger(s, [b, t]),
                        s.isDefaultPrevented() ? (b.seeking = !1,
                        a.toggleClass("is-seeking", b.seeking)) : (o.seek(t),
                        e.isFunction(n) && a.one("seek", n))
                    }
                    return b
                },
                seekTo: function(e, t) {
                    var n = void 0 === e ? i : .1 * b.video.duration * e;
                    return b.seek(n, t)
                },
                mute: function(e) {
                    return void 0 === e && (e = !b.muted),
                    p.muted = b.muted = e,
                    p.volume = isNaN(p.volume) ? r.volume : p.volume,
                    b.volume(e ? 0 : p.volume, !0),
                    b.trigger("mute", e),
                    b
                },
                volume: function(e, t) {
                    return b.ready && (e = Math.min(Math.max(e, 0), 1),
                    t || (p.volume = e),
                    o.volume(e)),
                    b
                },
                speed: function(t, n) {
                    return b.ready && ("boolean" == typeof t && (t = r.speeds[e.inArray(b.currentSpeed, r.speeds) + (t ? 1 : -1)] || b.currentSpeed),
                    o.speed(t),
                    n && a.one("speed", n)),
                    b
                },
                stop: function() {
                    return b.ready && (b.pause(),
                    b.seek(0, function() {
                        a.trigger("stop")
                    })),
                    b
                },
                unload: function() {
                    return a.hasClass("is-embedding") || (r.splash ? (b.trigger("unload"),
                    o.unload()) : b.stop()),
                    b
                },
                disable: function(e) {
                    return void 0 === e && (e = !b.disabled),
                    e != b.disabled && (b.disabled = e,
                    b.trigger("disable", e)),
                    b
                }
            };
            b.conf = e.extend(b.conf, r),
            e.each(["bind", "one", "unbind"], function(e, t) {
                b[t] = function(e, n) {
                    return a[t](e, n),
                    b
                }
            }),
            b.trigger = function(e, t) {
                return a.trigger(e, [b, t]),
                b
            }
            ,
            a.data("flowplayer") || a.bind("boot", function() {
                return e.each(["autoplay", "loop", "preload", "poster"], function(e, t) {
                    var n = l.attr(t);
                    void 0 !== n && (r[t] = n ? n : !0)
                }),
                (r.splash || a.hasClass("is-splash") || !flowplayer.support.firstframe) && (b.forcedSplash = !r.splash && !a.hasClass("is-splash"),
                b.splash = r.splash = r.autoplay = !0,
                a.addClass("is-splash"),
                l.attr("preload", "none")),
                (r.live || a.hasClass("is-live")) && (b.live = r.live = !0,
                a.addClass("is-live")),
                e.each(c, function() {
                    var e;
                    flowplayer.support.firstframe || (e = l.clone().prependTo(a)),
                    this(b, a),
                    e && e.remove()
                }),
                o = flowplayer.engine[r.engine],
                o && (o = o(b, a)),
                o.pick(d.initialSources) ? b.engine = r.engine : e.each(flowplayer.engine, function(e) {
                    return e != r.engine ? (o = this(b, a),
                    o.pick(d.initialSources) && (b.engine = e),
                    !1) : void 0
                }),
                u.push(b),
                b.engine ? (r.splash ? b.unload() : b.load(),
                r.disabled && b.disable(),
                o.volume(b.volumeLevel),
                void a.one("ready", n)) : b.trigger("error", {
                    code: flowplayer.support.flashVideo ? 5 : 10
                })
            }).bind("load", function(t, n) {
                r.splash && e(".flowplayer").filter(".is-ready, .is-loading").not(a).each(function() {
                    var t = e(this).data("flowplayer");
                    t.conf.splash && t.unload()
                }),
                a.addClass("is-loading"),
                n.loading = !0
            }).bind("ready", function(e, t, n) {
                function i() {
                    a.removeClass("is-loading"),
                    t.loading = !1
                }
                n.time = 0,
                t.video = n,
                r.splash ? a.one("progress", i) : i(),
                t.muted ? t.mute(!0) : t.volume(t.volumeLevel)
            }).bind("unload", function() {
                r.splash && l.remove(),
                a.removeClass("is-loading"),
                b.loading = !1
            }).bind("ready unload", function(e) {
                var t = "ready" == e.type;
                a.toggleClass("is-splash", !t).toggleClass("is-ready", t),
                b.ready = t,
                b.splash = !t
            }).bind("progress", function(e, t, n) {
                t.video.time = n
            }).bind("speed", function(e, t, n) {
                t.currentSpeed = n
            }).bind("volume", function(e, t, n) {
                t.volumeLevel = Math.round(100 * n) / 100,
                t.muted ? n && t.mute(!1) : p.volume = n
            }).bind("beforeseek seek", function(e) {
                b.seeking = "beforeseek" == e.type,
                a.toggleClass("is-seeking", b.seeking)
            }).bind("ready pause resume unload finish stop", function(e, t, n) {
                b.paused = /pause|finish|unload|stop/.test(e.type),
                "ready" == e.type && (b.paused = "none" == r.preload,
                n && (b.paused = !n.duration || !r.autoplay && "none" != r.preload)),
                b.playing = !b.paused,
                a.toggleClass("is-paused", b.paused).toggleClass("is-playing", b.playing),
                b.load.ed || b.pause()
            }).bind("finish", function() {
                b.finished = !0
            }).bind("error", function() {
                l.remove()
            }),
            a.trigger("boot", [b, a]).data("flowplayer", b)
        })
    }
    ,
    !function() {
        var t = function(e) {
            var t = /Version\/(\d\.\d)/.exec(e);
            return t && t.length > 1 ? parseFloat(t[1], 10) : 0
        }
          , n = flowplayer.support
          , i = e.browser
          , o = e("<video loop autoplay preload/>")[0]
          , a = i.msie
          , r = navigator.userAgent
          , s = /iPad|MeeGo/.test(r) && !/CriOS/.test(r)
          , l = /iPad/.test(r) && /CriOS/.test(r)
          , d = /iP(hone|od)/i.test(r) && !/iPad/.test(r)
          , u = /Android/.test(r) && !/Firefox/.test(r)
          , c = /Android/.test(r) && /Firefox/.test(r)
          , p = /Silk/.test(r)
          , f = /IEMobile/.test(r)
          , v = (s ? t(r) : 0,
        u ? parseFloat(/Android\ (\d\.\d)/.exec(r)[1], 10) : 0);
        e.extend(n, {
            subtitles: !!o.addTextTrack,
            fullscreen: !u && ("function" == typeof document.webkitCancelFullScreen && !/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(r) || document.mozFullScreenEnabled || "function" == typeof document.exitFullscreen),
            inlineBlock: !(a && i.version < 8),
            touch: "ontouchstart"in window,
            dataload: !s && !d && !f,
            zeropreload: !a && !u,
            volume: !(s || u || d || p || l),
            cachedVideoTag: !(s || d || l || f),
            firstframe: !(d || s || u || p || l || f || c),
            inlineVideo: !d && !p && !f && (!u || v >= 3),
            hlsDuration: !i.safari || s || d || l,
            seekable: !s && !l
        });
        try {
            var g = a ? new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version") : navigator.plugins["Shockwave Flash"].description;
            g = g.split(/\D+/),
            g.length && !g[0] && (g = g.slice(1)),
            n.flashVideo = g[0] > 9 || 9 == g[0] && g[3] >= 115
        } catch (m) {}
        try {
            n.video = !!o.canPlayType,
            n.video && o.canPlayType("video/mp4")
        } catch (h) {
            n.video = !1
        }
        n.animation = function() {
            for (var t = ["", "Webkit", "Moz", "O", "ms", "Khtml"], n = e("<p/>")[0], i = 0; i < t.length; i++)
                if ("undefined" !== n.style[t[i] + "AnimationName"])
                    return !0
        }()
    }(),
    window.attachEvent && window.attachEvent("onbeforeunload", function() {
        __flash_savedUnloadHandler = __flash_unloadHandler = function() {}
    }),
    flowplayer.engine.flash = function(n, i) {
        var o, a, r, s = n.conf, l = (n.video,
        {
            pick: function(t) {
                if (flowplayer.support.flashVideo) {
                    var n = e.grep(t, function(e) {
                        return "flash" == e.type
                    })[0];
                    if (n)
                        return n;
                    for (var i, o = 0; o < t.length; o++)
                        if (i = t[o],
                        /mp4|flv/.test(i.type))
                            return i
                }
            },
            load: function(l) {
                function d(e) {
                    return e.replace(/&amp;/g, "%26").replace(/&/g, "%26").replace(/=/g, "%3D")
                }
                var u = e("video", i)
                  , c = d(l.src);
                is_absolute = /^https?:/.test(c);
                try {
                    u.length > 0 && flowplayer.support.video && u[0].pause()
                } catch (p) {}
                var f = function() {
                    u.remove()
                }
                  , v = function(t) {
                    return e.grep(t, function(e) {
                        return !!u[0].canPlayType("video/" + e.type)
                    }).length > 0
                };
                if (flowplayer.support.video && u.prop("autoplay") && v(l.sources) ? u.one("timeupdate", f) : f(),
                is_absolute || s.rtmp || (c = e("<img/>").attr("src", c)[0].src),
                r)
                    r.__play(c);
                else {
                    o = "fp" + ("" + Math.random()).slice(3, 15);
                    var g = {
                        hostname: s.embedded ? s.hostname : location.hostname,
                        url: c,
                        callback: "jQuery." + o
                    };
                    i.data("origin") && (g.origin = i.data("origin")),
                    is_absolute && delete s.rtmp,
                    e.each(["key", "autoplay", "preload", "rtmp", "loop", "debug", "preload", "splash", "bufferTime"], function(e, t) {
                        s[t] && (g[t] = s[t])
                    }),
                    g.rtmp && (g.rtmp = d(g.rtmp)),
                    a = t(s.swf, g),
                    a.prependTo(i),
                    r = a[0],
                    setTimeout(function() {
                        try {
                            if (!r.PercentLoaded())
                                return i.trigger("error", [n, {
                                    code: 7,
                                    url: s.swf
                                }])
                        } catch (e) {}
                    }, 5e3),
                    e[o] = function(t, i) {
                        s.debug && "status" != t && console.log("--", t, i);
                        var o = e.Event(t);
                        switch (t) {
                        case "ready":
                            i = e.extend(l, i);
                            break;
                        case "click":
                            o.flash = !0;
                            break;
                        case "keydown":
                            o.which = i;
                            break;
                        case "seek":
                            l.time = i;
                            break;
                        case "status":
                            n.trigger("progress", i.time),
                            i.buffer < l.bytes && !l.buffered ? (l.buffer = i.buffer / l.bytes * l.duration,
                            n.trigger("buffer", l.buffer)) : l.buffered || (l.buffered = !0,
                            n.trigger("buffered"))
                        }
                        "buffered" != t && setTimeout(function() {
                            n.trigger(o, i)
                        }, 1)
                    }
                }
            },
            speed: e.noop,
            unload: function() {
                r && r.__unload && r.__unload(),
                delete e[o],
                e("object", i).remove(),
                r = 0
            }
        });
        e.each("pause,resume,seek,volume".split(","), function(e, t) {
            l[t] = function(e) {
                n.ready && ("seek" == t && n.video.time && (n.trigger("beforeseek"),
                n.trigger("seek")),
                void 0 === e ? r["__" + t]() : r["__" + t](e))
            }
        });
        var d = e(window);
        return n.bind("ready fullscreen fullscreen-exit", function(t) {
            var o = i.height()
              , a = i.width();
            if (n.conf.flashfit || /full/.test(t.type)) {
                var r, s, l = n.isFullscreen, u = l && _, c = !flowplayer.support.inlineBlock, p = l ? u ? screen.width : d.width() : a, f = l ? u ? screen.height : d.height() : o, v = 0, g = 0, m = c ? a : "", h = c ? o : "";
                (n.conf.flashfit || "fullscreen" === t.type) && (r = n.video.width / n.video.height,
                s = n.video.height / n.video.width,
                h = Math.max(s * p),
                m = Math.max(r * f),
                h = h > f ? m * s : h,
                h = Math.min(Math.round(h), f),
                m = m > p ? h * r : m,
                m = Math.min(Math.round(m), p),
                g = Math.max(Math.round((f + g - h) / 2), 0),
                v = Math.max(Math.round((p + v - m) / 2), 0)),
                e("object", i).css({
                    width: m,
                    height: h,
                    marginTop: g,
                    marginLeft: v
                })
            }
        }),
        l
    }
    ;
    var v, g = e("<video/>")[0], m = {
        ended: "finish",
        pause: "pause",
        play: "resume",
        progress: "buffer",
        timeupdate: "progress",
        volumechange: "volume",
        ratechange: "speed",
        seeked: "seek",
        loadeddata: "ready",
        error: "error",
        dataunavailable: "error"
    }, h = function(t) {
        return v ? v.attr({
            type: i(t.type),
            src: t.src
        }) : v = e("<video/>", {
            src: t.src,
            type: i(t.type),
            "class": "fp-engine",
            autoplay: "autoplay",
            preload: "none",
            "x-webkit-airplay": "allow"
        })
    };
    flowplayer.engine.html5 = function(t, i) {
        function r(a, r, s) {
            a.listeners && a.listeners.hasOwnProperty(i.data("fp-player_id")) || ((a.listeners || (a.listeners = {}))[i.data("fp-player_id")] = !0,
            r.bind("error", function(n) {
                try {
                    if (n.originalEvent && e(n.originalEvent.originalTarget).is("img"))
                        return n.preventDefault();
                    o(e(n.target).attr("type")) && t.trigger("error", {
                        code: 4
                    })
                } catch (i) {}
            }),
            e.each(m, function(o, r) {
                a.addEventListener(o, function(d) {
                    if ("progress" == r && d.srcElement && 0 === d.srcElement.readyState && setTimeout(function() {
                        t.video.duration || (r = "error",
                        t.trigger(r, {
                            code: 4
                        }))
                    }, 1e4),
                    f.debug && !/progress/.test(r) && console.log(o, "->", r, d),
                    (t.ready || /ready|error/.test(r)) && r && e("video", i).length) {
                        var u, p = e.Event(r);
                        switch (r) {
                        case "ready":
                            u = e.extend(s, {
                                duration: a.duration,
                                width: a.videoWidth,
                                height: a.videoHeight,
                                url: a.currentSrc,
                                src: a.currentSrc
                            });
                            try {
                                u.seekable = a.seekable && a.seekable.end(null)
                            } catch (v) {}
                            if (l = l || setInterval(function() {
                                try {
                                    u.buffer = a.buffered.end(null)
                                } catch (e) {}
                                u.buffer && (n(u.buffer, 1e3) < n(u.duration, 1e3) && !u.buffered ? t.trigger("buffer", d) : u.buffered || (u.buffered = !0,
                                t.trigger("buffer", d).trigger("buffered", d),
                                clearInterval(l),
                                l = 0))
                            }, 250),
                            !f.live && !u.duration && !c.hlsDuration && "loadeddata" === o) {
                                var g = function() {
                                    u.duration = a.duration;
                                    try {
                                        u.seekable = a.seekable && a.seekable.end(null)
                                    } catch (e) {}
                                    t.trigger(p, u),
                                    a.removeEventListener("durationchange", g)
                                };
                                return void a.addEventListener("durationchange", g)
                            }
                            break;
                        case "progress":
                        case "seek":
                            {
                                t.video.duration
                            }
                            if (a.currentTime > 0) {
                                u = Math.max(a.currentTime, 0);
                                break
                            }
                            if ("progress" == r)
                                return;
                        case "speed":
                            u = n(a.playbackRate);
                            break;
                        case "volume":
                            u = n(a.volume);
                            break;
                        case "error":
                            try {
                                u = (d.srcElement || d.originalTarget).error
                            } catch (m) {
                                return
                            }
                        }
                        t.trigger(p, u)
                    }
                }, !1)
            }))
        }
        var s, l, d, u = e("video", i), c = flowplayer.support, p = e("track", u), f = t.conf;
        return s = {
            pick: function(e) {
                if (c.video) {
                    if (f.videoTypePreference) {
                        var t = a(e, f.videoTypePreference);
                        if (t)
                            return t
                    }
                    for (var n = 0; n < e.length; n++)
                        if (o(e[n].type))
                            return e[n]
                }
            },
            load: function(n) {
                if (f.splash && !d)
                    u = h(n).prependTo(i),
                    c.inlineVideo || u.css({
                        position: "absolute",
                        top: "-9999em"
                    }),
                    p.length && u.append(p.attr("default", "")),
                    f.loop && u.attr("loop", "loop"),
                    d = u[0];
                else {
                    d = u[0];
                    var o = u.find("source");
                    !d.src && o.length && (d.src = n.src,
                    o.remove()),
                    t.video.src && n.src != t.video.src ? (u.attr("autoplay", "autoplay"),
                    d.src = n.src) : "none" != f.preload && c.dataload || (c.zeropreload ? t.trigger("ready", n).trigger("pause").one("ready", function() {
                        i.trigger("resume")
                    }) : t.one("ready", function() {
                        i.trigger("pause")
                    }))
                }
                r(d, e("source", u).add(u), n),
                "none" == f.preload && c.zeropreload && c.dataload && !f.splash || d.load()
            },
            pause: function() {
                d.pause()
            },
            resume: function() {
                d.play()
            },
            speed: function(e) {
                d.playbackRate = e
            },
            seek: function(e) {
                try {
                    var n = t.paused;
                    d.currentTime = e,
                    n && d.pause()
                } catch (i) {}
            },
            volume: function(e) {
                d.volume = e
            },
            unload: function() {
                e("video.fp-engine", i).remove(),
                c.cachedVideoTag || (v = null),
                l = clearInterval(l),
                d = 0
            }
        }
    }
    ;
    var y = /\.(\w{3,4})(\?.*)?$/i;
    e.throttle = function(e, t) {
        var n;
        return function() {
            n || (e.apply(this, arguments),
            n = 1,
            setTimeout(function() {
                n = 0
            }, t))
        }
    }
    ,
    e.fn.slider2 = function(t) {
        var n = /iPad/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
        return this.each(function() {
            var i, o, a, r, s, l, d, u, c = e(this), p = e(document), f = c.children(":last"), v = !1, g = function() {
                o = c.offset(),
                a = c.width(),
                r = c.height(),
                l = s ? r : a,
                u = b(d)
            }, m = function(e) {
                i || e == w.value || d && !(d > e) || (c.trigger("slide", [e]),
                w.value = e)
            }, h = function(e) {
                var n = e.pageX;
                !n && e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length && (n = e.originalEvent.touches[0].pageX);
                var i = s ? e.pageY - o.top : n - o.left;
                i = Math.max(0, Math.min(u || l, i));
                var a = i / l;
                return s && (a = 1 - a),
                t && (a = 1 - a),
                y(a, 0, !0)
            }, y = function(e, t) {
                void 0 === t && (t = 0),
                e > 1 && (e = 1);
                var i = Math.round(1e3 * e) / 10 + "%";
                return (!d || d >= e) && (n || f.stop(),
                v ? f.css("width", i) : f.animate(s ? {
                    height: i
                } : {
                    width: i
                }, t, "linear")),
                e
            }, b = function(e) {
                return Math.max(0, Math.min(l, s ? (1 - e) * r : e * a))
            }, w = {
                max: function(e) {
                    d = e
                },
                disable: function(e) {
                    i = e
                },
                slide: function(e, t, n) {
                    g(),
                    n && m(e),
                    y(e, t)
                },
                disableAnimation: function(e) {
                    v = e !== !1
                }
            };
            g(),
            c.data("api", w).bind("mousedown.sld touchstart", function(t) {
                if (t.preventDefault(),
                !i) {
                    var n = e.throttle(m, 100);
                    g(),
                    w.dragging = !0,
                    c.addClass("is-dragging"),
                    m(h(t)),
                    p.bind("mousemove.sld touchmove", function(e) {
                        e.preventDefault(),
                        n(h(e))
                    }).one("mouseup touchend", function() {
                        w.dragging = !1,
                        c.removeClass("is-dragging"),
                        p.unbind("mousemove.sld touchmove")
                    })
                }
            })
        })
    }
    ,
    flowplayer(function(t, n) {
        function i(t) {
            return e(".fp-" + t, n)
        }
        function o(t) {
            ("0px" === n.css("width") || "0px" === n.css("height") || t !== flowplayer.defaults.ratio) && (parseInt(y, 10) || g.css("paddingTop", 100 * t + "%")),
            l.inlineBlock || e("object", n).height(n.height())
        }
        function a(e) {
            n.toggleClass("is-mouseover", e).toggleClass("is-mouseout", !e)
        }
        var r, s = t.conf, l = flowplayer.support;
        n.find(".fp-ratio,.fp-ui").remove(),
        n.addClass("flowplayer").append('      <div class="ratio"/>      <div class="ui">         <div class="waiting"><em/><em/><em/></div>         <a class="fullscreen"/>         <a class="unload"/>         <p class="speed"/>         <div class="controls">            <a class="play"></a>            <div class="timeline">               <div class="buffer"/>               <div class="progress"/>            </div>            <div class="volume">               <a class="mute"></a>               <div class="volumeslider">                  <div class="volumelevel"/>               </div>            </div>         </div>         <div class="time">            <em class="elapsed">00:00</em>            <em class="remaining"/>            <em class="duration">00:00</em>         </div>         <div class="message"><h2/><p/></div>      </div>'.replace(/class="/g, 'class="fp-'));
        var u = i("progress")
          , c = i("buffer")
          , p = i("elapsed")
          , f = i("remaining")
          , v = i("waiting")
          , g = i("ratio")
          , m = i("speed")
          , h = i("duration")
          , y = g.css("paddingTop")
          , b = i("timeline").slider2(t.rtl)
          , w = b.data("api")
          , k = (i("volume"),
        i("fullscreen"))
          , x = i("volumeslider").slider2(t.rtl)
          , C = x.data("api")
          , T = n.is(".fixed-controls, .no-toggle");
        w.disableAnimation(n.hasClass("is-touch")),
        l.animation || v.html("<p>loading &hellip;</p>"),
        o(s.ratio);
        try {
            s.fullscreen || k.remove()
        } catch (S) {
            k.remove()
        }
        t.bind("ready", function() {
            var e = t.video.duration;
            w.disable(t.disabled || !e),
            s.adaptiveRatio && o(t.video.height / t.video.width),
            h.add(f).html(d(e)),
            e >= 3600 && n.addClass("is-long") || n.removeClass("is-long"),
            C.slide(t.volumeLevel)
        }).bind("unload", function() {
            y || g.css("paddingTop", "")
        }).bind("buffer", function() {
            var e = t.video
              , n = e.buffer / e.duration;
            !e.seekable && l.seekable && w.max(n),
            1 > n ? c.css("width", 100 * n + "%") : c.css({
                width: "100%"
            })
        }).bind("speed", function(e, t, n) {
            m.text(n + "x").addClass("fp-hilite"),
            setTimeout(function() {
                m.removeClass("fp-hilite")
            }, 1e3)
        }).bind("buffered", function() {
            c.css({
                width: "100%"
            }),
            w.max(1)
        }).bind("progress", function() {
            var e = t.video.time
              , n = t.video.duration;
            w.dragging || w.slide(e / n, t.seeking ? 0 : 250),
            p.html(d(e)),
            f.html("-" + d(n - e))
        }).bind("finish resume seek", function(e) {
            n.toggleClass("is-finished", "finish" == e.type)
        }).bind("stop", function() {
            p.html(d(0)),
            w.slide(0, 100)
        }).bind("finish", function() {
            p.html(d(t.video.duration)),
            w.slide(1, 100),
            n.removeClass("is-seeking")
        }).bind("beforeseek", function() {
            u.stop()
        }).bind("volume", function() {
            C.slide(t.volumeLevel)
        }).bind("disable", function() {
            var e = t.disabled;
            w.disable(e),
            C.disable(e),
            n.toggleClass("is-disabled", t.disabled)
        }).bind("mute", function(e, t, i) {
            n.toggleClass("is-muted", i)
        }).bind("error", function(t, i, o) {
            if (n.removeClass("is-loading").addClass("is-error"),
            o) {
                o.message = s.errors[o.code],
                i.error = !0;
                var a = e(".fp-message", n);
                e("h2", a).text((i.engine || "html5") + ": " + o.message),
                e("p", a).text(o.url || i.video.url || i.video.src || s.errorUrls[o.code]),
                n.unbind("mouseenter click").removeClass("is-mouseover")
            }
        }).bind("mouseenter mouseleave", function(e) {
            if (!T) {
                var t, i = "mouseenter" == e.type;
                a(i),
                i ? (n.bind("pause.x mousemove.x volume.x", function() {
                    a(!0),
                    t = new Date
                }),
                r = setInterval(function() {
                    new Date - t > 5e3 && (a(!1),
                    t = new Date)
                }, 100)) : (n.unbind(".x"),
                clearInterval(r))
            }
        }).bind("mouseleave", function() {
            (w.dragging || C.dragging) && n.addClass("is-mouseover").removeClass("is-mouseout")
        }).bind("click.player", function(n) {
            return e(n.target).is(".fp-ui, .fp-engine") || n.flash ? (n.preventDefault(),
            t.toggle()) : void 0
        }).bind("contextmenu", function(t) {
            t.preventDefault();
            var i = n.offset()
              , o = e(window)
              , a = t.clientX - i.left
              , r = t.clientY - i.top + o.scrollTop()
              , s = n.find(".fp-context-menu").css({
                left: a + "px",
                top: r + "px",
                display: "block"
            }).on("click", function(e) {
                e.stopPropagation()
            });
            e("html").on("click.outsidemenu", function() {
                s.hide(),
                e("html").off("click.outsidemenu")
            })
        }),
        s.poster && n.css("backgroundImage", "url(" + s.poster + ")");
        var _ = n.css("backgroundColor")
          , F = "none" != n.css("backgroundImage") || _ && "rgba(0, 0, 0, 0)" != _ && "transparent" != _;
        !F || s.splash || s.autoplay || t.bind("ready stop", function() {
            n.addClass("is-poster").one("progress", function() {
                n.removeClass("is-poster")
            })
        }),
        !F && t.forcedSplash && n.css("backgroundColor", "#555"),
        e(".fp-toggle, .fp-play", n).click(t.toggle),
        e.each(["mute", "fullscreen", "unload"], function(e, n) {
            i(n).click(function() {
                t[n]()
            })
        }),
        b.bind("slide", function(e, n) {
            t.seeking = !0,
            t.seek(n * t.video.duration)
        }),
        x.bind("slide", function(e, n) {
            t.volume(n)
        }),
        i("time").click(function() {
            e(this).toggleClass("is-inverted")
        }),
        a(T)
    });
    var b, w, k = "is-help";
    e(document).bind("keydown.fp", function(t) {
        var n = b
          , i = t.ctrlKey || t.metaKey || t.altKey
          , o = t.which
          , a = n && n.conf;
        if (n && a.keyboard && !n.disabled) {
            if (-1 != e.inArray(o, [63, 187, 191]))
                return w.toggleClass(k),
                !1;
            if (27 == o && w.hasClass(k))
                return w.toggleClass(k),
                !1;
            if (!i && n.ready) {
                if (t.preventDefault(),
                t.shiftKey)
                    return void (39 == o ? n.speed(!0) : 37 == o && n.speed(!1));
                if (58 > o && o > 47)
                    return n.seekTo(o - 48);
                switch (o) {
                case 38:
                case 75:
                    n.volume(n.volumeLevel + .15);
                    break;
                case 40:
                case 74:
                    n.volume(n.volumeLevel - .15);
                    break;
                case 39:
                case 76:
                    n.seeking = !0,
                    n.seek(!0);
                    break;
                case 37:
                case 72:
                    n.seeking = !0,
                    n.seek(!1);
                    break;
                case 190:
                    n.seekTo();
                    break;
                case 32:
                    n.toggle();
                    break;
                case 70:
                    a.fullscreen && n.fullscreen();
                    break;
                case 77:
                    n.mute();
                    break;
                case 81:
                    n.unload()
                }
            }
        }
    }),
    flowplayer(function(t, n) {
        t.conf.keyboard && (n.bind("mouseenter mouseleave", function(e) {
            b = t.disabled || "mouseenter" != e.type ? 0 : t,
            b && (w = n)
        }),
        n.append('      <div class="fp-help">         <a class="fp-close"></a>         <div class="fp-help-section fp-help-basics">            <p><em>space</em>play / pause</p>            <p><em>q</em>unload | stop</p>            <p><em>f</em>fullscreen</p>            <p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster <small>(latest Chrome and Safari)</small></p>         </div>         <div class="fp-help-section">            <p><em>&#8593;</em><em>&#8595;</em>volume</p>            <p><em>m</em>mute</p>         </div>         <div class="fp-help-section">            <p><em>&#8592;</em><em>&#8594;</em>seek</p>            <p><em>&nbsp;. </em>seek to previous            </p><p><em>1</em><em>2</em>&hellip;<em>6</em> seek to 10%, 20%, &hellip;60% </p>         </div>      </div>   '),
        t.conf.tooltip && e(".fp-ui", n).attr("title", "Hit ? for help").on("mouseout.tip", function() {
            e(this).removeAttr("title").off("mouseout.tip")
        }),
        e(".fp-close", n).click(function() {
            n.toggleClass(k)
        }))
    });
    var x, C = e.browser.mozilla ? "moz" : "webkit", T = "fullscreen", S = "fullscreen-exit", _ = flowplayer.support.fullscreen, F = "function" == typeof document.exitFullscreen, E = navigator.userAgent.toLowerCase(), M = /(safari)[ \/]([\w.]+)/.exec(E) && !/(chrome)[ \/]([\w.]+)/.exec(E);
    e(document).bind(F ? "fullscreenchange" : C + "fullscreenchange", function(t) {
        var n = e(document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullscreenElement || t.target);
        n.length && !x ? x = n.trigger(T, [n]) : (x.trigger(S, [x]),
        x = null)
    }),
    flowplayer(function(t, n) {
        if (t.conf.fullscreen) {
            var i, o = e(window), a = {
                index: 0,
                pos: 0,
                play: !1
            };
            t.isFullscreen = !1,
            t.fullscreen = function(r) {
                return t.disabled ? void 0 : (void 0 === r && (r = !t.isFullscreen),
                r && (i = o.scrollTop()),
                "webkit" != C && !M || "flash" != t.engine || (a.index = t.video.index,
                t.conf.rtmp && e.extend(a, {
                    pos: t.video.time,
                    play: t.playing
                })),
                _ ? r ? F ? n[0].requestFullscreen() : (n[0][C + "RequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT),
                !M || document.webkitCurrentFullScreenElement || document.mozFullScreenElement || n[0][C + "RequestFullScreen"]()) : F ? document.exitFullscreen() : document[C + "CancelFullScreen"]() : t.trigger(r ? T : S, [t]),
                t)
            }
            ;
            t.bind(T, function() {
                n.addClass("is-fullscreen"),
                t.isFullscreen = !0
            }).bind(S, function() {
                n.removeClass("is-fullscreen"),
                t.isFullscreen = !1,
                o.scrollTop(i)
            }).bind("ready", function() {
                a.index > 0 ? (t.play(a.index),
                a.index = 0) : a.pos && !isNaN(a.pos) && t.resume().seek(a.pos, function() {
                    a.play || t.pause(),
                    e.extend(a, {
                        pos: 0,
                        play: !1
                    })
                })
            })
        }
    }),
    flowplayer(function(t, n) {
        function i() {
            return e(a.query, n)
        }
        function o() {
            return e(a.query + "." + r, n)
        }
        var a = e.extend({
            active: "is-active",
            advance: !0,
            query: ".fp-playlist a"
        }, t.conf)
          , r = a.active;
        t.play = function(n) {
            return void 0 === n ? t.resume() : "number" != typeof n || t.conf.playlist[n] ? ("number" != typeof n && t.load.apply(null, arguments),
            t.unbind("resume.fromfirst"),
            t.video.index = n,
            t.load("string" == typeof t.conf.playlist[n] ? t.conf.playlist[n].toString() : e.map(t.conf.playlist[n], function(t) {
                return e.extend({}, t)
            })),
            t) : t
        }
        ,
        t.next = function(e) {
            e && e.preventDefault();
            var n = t.video.index;
            return -1 != n && (n = n === t.conf.playlist.length - 1 ? 0 : n + 1,
            t.play(n)),
            t
        }
        ,
        t.prev = function(e) {
            e && e.preventDefault();
            var n = t.video.index;
            return -1 != n && (n = 0 === n ? t.conf.playlist.length - 1 : n - 1,
            t.play(n)),
            t
        }
        ,
        e(".fp-next", n).click(t.next),
        e(".fp-prev", n).click(t.prev),
        a.advance && n.unbind("finish.pl").bind("finish.pl", function(e, t) {
            var i = t.video.index + 1;
            i < t.conf.playlist.length || a.loop ? (i = i === t.conf.playlist.length ? 0 : i,
            n.removeClass("is-finished"),
            setTimeout(function() {
                t.play(i)
            })) : (n.addClass("is-playing"),
            t.conf.playlist.length > 1 && t.one("resume.fromfirst", function() {
                return t.play(0),
                !1
            }))
        });
        var s = !1;
        if (t.conf.playlist.length) {
            s = !0;
            var l = n.find(".fp-playlist");
            if (!l.length) {
                l = e('<div class="fp-playlist"></div>');
                var d = e(".fp-next,.fp-prev", n);
                d.length ? d.eq(0).before(l) : e("video", n).after(l)
            }
            l.empty(),
            e.each(t.conf.playlist, function(t, n) {
                var i;
                if ("string" == typeof n)
                    i = n;
                else
                    for (var o in n[0])
                        if (n[0].hasOwnProperty(o)) {
                            i = n[0][o];
                            break
                        }
                l.append(e("<a />").attr({
                    href: i,
                    "data-index": t
                }))
            })
        }
        if (i().length) {
            s || (t.conf.playlist = [],
            i().each(function() {
                var n = e(this).attr("href");
                e(this).attr("data-index", t.conf.playlist.length),
                t.conf.playlist.push(n)
            })),
            n.on("click", a.query, function(n) {
                n.preventDefault();
                var i = e(n.target).closest(a.query)
                  , o = Number(i.attr("data-index"));
                -1 != o && t.play(o)
            });
            var u = i().filter("[data-cuepoints]").length;
            t.bind("load", function(i, a, s) {
                var l = o().removeClass(r)
                  , d = l.attr("data-index")
                  , c = s.index = t.video.index || 0
                  , p = e('a[data-index="' + c + '"]', n).addClass(r)
                  , f = c == t.conf.playlist.length - 1;
                n.removeClass("video" + d).addClass("video" + c).toggleClass("last-video", f),
                s.index = a.video.index = c,
                s.is_last = a.video.is_last = f,
                u && (t.cuepoints = p.data("cuepoints"))
            }).bind("unload.pl", function() {
                o().toggleClass(r)
            })
        }
        t.conf.playlist.length && (t.conf.loop = !1)
    });
    var A = / ?cue\d+ ?/;
    flowplayer(function(t, n) {
        function i(t) {
            n[0].className = e.trim(n[0].className.replace(A, " ")),
            t >= 0 && n.addClass("cue" + t)
        }
        var o = 0;
        t.cuepoints = t.conf.cuepoints || [],
        t.bind("progress", function(a, r, s) {
            if (o && .015 > s - o)
                return o = s;
            o = s;
            for (var l, d, u = t.cuepoints || [], c = 0, p = u.length; p > c && (l = u[c],
            isNaN(l) || (l = {
                time: l
            }),
            l.index = c,
            s >= l.time && (d = l,
            c !== p - 1) || (d && !e(n[0]).hasClass("cue" + d.index) && (i(d.index),
            n.trigger("cuepoint", [t, d])),
            !(s < l.time))); c++)
                ;
        }).bind("unload seek", i),
        t.conf.generate_cuepoints && t.bind("load", function() {
            e(".fp-cuepoint", n).remove()
        }).bind("ready", function() {
            var i = t.cuepoints || []
              , o = t.video.duration
              , a = e(".fp-timeline", n).css("overflow", "visible");
            e.each(i, function(n, i) {
                var r = i.time || i;
                0 > r && (r = o + i);
                var s = e("<a/>").addClass("fp-cuepoint fp-cuepoint" + n).css("left", r / o * 100 + "%");
                s.appendTo(a).mousedown(function() {
                    return t.seek(r),
                    !1
                })
            })
        })
    }),
    flowplayer(function(t, n) {
        function i(e) {
            var t = e.split(":");
            return 2 == t.length && t.unshift(0),
            60 * t[0] * 60 + 60 * t[1] + parseFloat(t[2].replace(",", "."))
        }
        function o(e) {
            e = e.replace(/<.*?>/g, "");
            for (var t = e.split(/\s+/), n = "", i = 0; i < t.length; i++) {
                var o = t[i];
                o = o.replace(/([\w'-]+)/, "<span class='word'>$1</span>"),
                n += o + " "
            }
            return n
        }
        var a = e("track", n)
          , r = t.conf;
        if (!flowplayer.support.subtitles || (t.subtitles = a.length && a[0].track,
        !r.nativesubtitles || "html5" != r.engine)) {
            a.remove();
            var s = /^(([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> (([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)/;
            t.subtitles = [];
            var l = a.attr("src");
            if (t.subtitles_src = l,
            l) {
                setTimeout(function() {
                    e.get(l, function(n) {
                        for (var a, r, l, d, u = 0, c = n.split("\n"), p = c.length, f = {}; p > u; u++)
                            if (r = s.exec(c[u])) {
                                for (a = c[u - 1],
                                l = "<p>" + o(c[++u]) + "</p><br/>"; e.trim(c[++u]) && u < c.length; )
                                    l += "<p>" + o(c[u]) + "</p><br/>";
                                f = {
                                    title: a,
                                    startTime: i(r[1]),
                                    endTime: i(6 == r.length ? r[3] : alert("Investigate endTime")),
                                    text: l
                                },
                                d = {
                                    time: f.startTime,
                                    subtitle: f
                                },
                                t.subtitles.push(f),
                                t.cuepoints.push(d),
                                t.cuepoints.push({
                                    time: f.endTime,
                                    subtitleEnd: a
                                }),
                                0 === f.startTime && t.trigger("cuepoint", d)
                            }
                    }).fail(function() {
                        return t.trigger("error", {
                            code: 8,
                            url: l
                        }),
                        !1
                    })
                });
                var d, u = e("<div class='fp-subtitle-wrap'/>", n).appendTo(n), c = e("<div class='fp-subtitle'/>", n).appendTo(u);
                e('<div class="translation"/>', n).appendTo(u),
                t.bind("cuepoint", function(e, t, n) {
                    n.subtitle ? (d = n.index,
                    c.html(n.subtitle.text).addClass("fp-active"),
                    u.show()) : n.subtitleEnd && (c.removeClass("fp-active"),
                    u.hide(),
                    d = n.index)
                }).bind("seek", function(n, i, o) {
                    d && t.cuepoints[d] && t.cuepoints[d].time > o && (c.removeClass("fp-active"),
                    d = null),
                    e.each(t.cuepoints || [], function(e, n) {
                        var i = n.subtitle;
                        i && d != n.index ? o >= n.time && (!i.endTime || o <= i.endTime) && t.trigger("cuepoint", n) : n.subtitleEnd && o >= n.time && n.index == d + 1 && t.trigger("cuepoint", n)
                    })
                })
            }
        }
    }),
    flowplayer(function(t, n) {
        function i() {
            if (a && "undefined" != typeof _gat) {
                var e = _gat._getTracker(o)
                  , i = t.video;
                e._setAllowLinker(!0),
                e._trackEvent("Video / Seconds played", t.engine + "/" + i.type, n.attr("title") || i.src.split("/").slice(-1)[0].replace(y, ""), Math.round(a / 1e3)),
                a = 0
            }
        }
        var o = t.conf.analytics
          , a = 0
          , r = 0;
        o && ("undefined" == typeof _gat && e.getScript("//google-analytics.com/ga.js"),
        t.bind("load unload", i).bind("progress", function() {
            t.seeking || (a += r ? +new Date - r : 0,
            r = +new Date)
        }).bind("pause", function() {
            r = 0
        }),
        e(window).unload(i))
    });
    var D = /IEMobile/.test(p);
    (flowplayer.support.touch || D) && flowplayer(function(t, n) {
        var i = /Android/.test(p) && !/Firefox/.test(p) && !/Opera/.test(p)
          , o = /Silk/.test(p)
          , a = i ? parseFloat(/Android\ (\d\.\d)/.exec(p)[1], 10) : 0;
        if (i && (t.conf.videoTypePreference = "mp4",
        !/Chrome/.test(p) && 4 > a)) {
            var r = t.load;
            t.load = function() {
                var e = r.apply(t, arguments);
                return t.trigger("ready", t, t.video),
                e
            }
        }
        flowplayer.support.volume || n.addClass("no-volume no-mute"),
        n.addClass("is-touch"),
        n.find(".fp-timeline").data("api").disableAnimation();
        var s = !1;
        n.bind("touchmove", function() {
            s = !0
        }).bind("touchend click", function() {
            return s ? void (s = !1) : t.playing && !n.hasClass("is-mouseover") ? (n.addClass("is-mouseover").removeClass("is-mouseout"),
            !1) : (t.paused && n.hasClass("is-mouseout") && !t.splash && t.toggle(),
            void (t.paused && D && e("video.fp-engine", n)[0].play()))
        }),
        t.conf.native_fullscreen && "function" == typeof e("<video />")[0].webkitEnterFullScreen && (t.fullscreen = function() {
            var t = e("video.fp-engine", n);
            t[0].webkitEnterFullScreen(),
            t.one("webkitendfullscreen", function() {
                t.prop("controls", !0).prop("controls", !1)
            })
        }
        ),
        (i || o) && t.bind("ready", function() {
            var i = e("video.fp-engine", n);
            i.one("canplay", function() {
                i[0].play()
            }),
            i[0].play(),
            t.bind("progress.dur", function() {
                var o = i[0].duration;
                1 !== o && (t.video.duration = o,
                e(".fp-duration", n).html(d(o)),
                t.unbind("progress.dur"))
            })
        })
    }),
    flowplayer(function(t, n) {
        if (t.conf.embed !== !1) {
            var i = t.conf
              , o = e(".fp-ui", n)
              , a = e("<a/>", {
                "class": "fp-embed",
                title: "Copy to your site"
            }).appendTo(o)
              , r = e("<div/>", {
                "class": "fp-embed-code"
            }).append("<label>Paste this HTML code on your site to embed.</label><textarea/>").appendTo(o)
              , s = e("textarea", r);
            t.embedCode = function() {
                var o = t.video
                  , a = o.width || n.width()
                  , r = o.height || n.height()
                  , s = e("<div/>", {
                    "class": "flowplayer",
                    css: {
                        width: a,
                        height: r
                    }
                })
                  , l = e("<video/>").appendTo(s);
                e.each(["origin", "analytics", "key", "rtmp"], function(e, t) {
                    i[t] && s.attr("data-" + t, i[t])
                }),
                i.logo && s.attr("data-logo", e("<img />").attr("src", i.logo)[0].src),
                e.each(o.sources, function(t, n) {
                    var o = n.src;
                    (!/^https?:/.test(n.src) && "flash" !== n.type || !i.rtmp) && (o = e("<img/>").attr("src", n.src)[0].src),
                    l.append(e("<source/>", {
                        type: "video/" + n.type,
                        src: o
                    }))
                });
                var d = {
                    src: "//embed.flowplayer.org/5.4.4/embed.min.js"
                };
                e.isPlainObject(i.embed) && (d["data-swf"] = i.embed.swf,
                d["data-library"] = i.embed.library,
                d.src = i.embed.script || d.src,
                i.embed.skin && (d["data-skin"] = i.embed.skin));
                var u = e("<foo/>", d).append(s);
                return e("<p/>").append(u).html().replace(/<(\/?)foo/g, "<$1script")
            }
            ,
            n.fptip(".fp-embed", "is-embedding"),
            s.click(function() {
                this.select()
            }),
            a.click(function() {
                s.text(t.embedCode()),
                s[0].focus(),
                s[0].select()
            })
        }
    }),
    e.fn.fptip = function(t, n) {
        return this.each(function() {
            function i() {
                o.removeClass(n),
                e(document).unbind(".st")
            }
            var o = e(this);
            e(t || "a", this).click(function(t) {
                t.preventDefault(),
                o.toggleClass(n),
                o.hasClass(n) && e(document).bind("keydown.st", function(e) {
                    27 == e.which && i()
                }).bind("click.st", function(t) {
                    e(t.target).parents("." + n).length || i()
                })
            })
        })
    }
}(jQuery),
flowplayer(function(e, t) {
    function n(e) {
        var t = i("<a/>")[0];
        return t.href = e,
        t.hostname
    }
    var i = jQuery
      , o = e.conf
      , a = o.swf.indexOf("flowplayer.org") && o.e && t.data("origin")
      , r = a ? n(a) : location.hostname
      , s = o.key;
    if ("file:" == location.protocol && (r = "localhost"),
    e.load.ed = 1,
    o.hostname = r,
    o.origin = a || location.href,
    a && t.addClass("is-embedded"),
    "string" == typeof s && (s = s.split(/,\s*/)),
    s && "function" == typeof key_check && key_check(s, r))
        o.logo && t.append(i("<a>", {
            "class": "fp-logo",
            href: a
        }).append(i("<img/>", {
            src: o.logo
        })));
    else {
        var l = i("<a/>").attr("href", "http://flowplayer.org").appendTo(t);
        i(".fp-controls", t);
        var d = i('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2013</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(t);
        e.bind("pause resume finish unload", function(e, n) {
            var o = -1;
            n.video.src && i.each([["org", "flowplayer", "drive"], ["org", "flowplayer", "my"]], function(e, t) {
                return o = n.video.src.indexOf("://" + t.reverse().join(".")),
                -1 === o
            }),
            /pause|resume/.test(e.type) && "flash" != n.engine && 4 != o && 5 != o ? (l.show().css({
                position: "absolute",
                left: 16,
                bottom: 36,
                zIndex: 99999,
                width: 100,
                height: 20,
                backgroundImage: "url(" + [".png", "logo", "/", ".net", ".cloudfront", "d32wqyuo10o653", "//"].reverse().join("") + ")"
            }),
            n.load.ed = l.is(":visible") && i.contains(t[0], d[0]),
            n.load.ed || n.pause()) : l.hide()
        })
    }
});
flowplayer(function(e, o) {
    function l(e) {
        var o = a("<a/>")[0];
        return o.href = e,
        o.hostname
    }
    var a = jQuery
      , r = e.conf
      , i = r.swf.indexOf("flowplayer.org") && r.e && o.data("origin")
      , n = i ? l(i) : location.hostname
      , t = r.key;
    if ("file:" == location.protocol && (n = "localhost"),
    e.load.ed = 1,
    r.hostname = n,
    r.origin = i || location.href,
    i && o.addClass("is-embedded"),
    "string" == typeof t && (t = t.split(/,\s*/)),
    t && "function" == typeof key_check && key_check(t, n))
        r.logo && o.append(a("<a>", {
            "class": "fp-logo",
            href: i
        }).append(a("<img/>", {
            src: r.logo
        })));
    else {
        var s = a("<a/>").attr("href", "http://flowplayer.org").appendTo(o);
        a(".fp-controls", o);
        var p = a('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2013</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(o);
        e.bind("pause resume finish unload", function(e, l) {
            var r = -1;
            l.video.src && a.each([["org", "flowplayer", "drive"], ["org", "flowplayer", "my"]], function(e, o) {
                return r = l.video.src.indexOf("://" + o.reverse().join(".")),
                -1 === r
            }),
            /pause|resume/.test(e.type) && "flash" != l.engine && 4 != r && 5 != r ? (s.show().css({
                position: "absolute",
                left: 16,
                bottom: 36,
                zIndex: 99999,
                width: 100,
                height: 20,
                backgroundImage: "url(" + [".png", "logo", "/", ".net", ".cloudfront", "d32wqyuo10o653", "//"].reverse().join("") + ")"
            }),
            l.load.ed = s.is(":visible") && a.contains(o[0], p[0]),
            l.load.ed || l.pause()) : s.hide()
        })
    }
});
function dump(obj, level) {
    level = typeof level !== "undefined" ? level : 3;
    if (app.verbosity < level)
        return;
    console.log(obj)
}
var app = {
    host: "www.hamatata.com",
    not_chrome: false,
    is_mobile: false,
    has_extension: false,
    default_translator: "google",
    last_chosen_movie_id: 0,
    new_words: {},
    verbosity: 4
};
var video_attrs = {};
flowplayer.conf.embed = false;
flowplayer.conf.tooltip = false;
flowplayer.conf.base_fontsize = 18;
flowplayer.conf.subtitles_shift = 0;
flowplayer.conf.sub_opacity = .5;
flowplayer.conf.sub_position = 0;
flowplayer.conf.volume = typeof localStorage != "object" ? .5 : localStorage.muted === "true" ? 0 : isNaN(localStorage.volume) ? .5 : localStorage.volume || .5;
flowplayer.conf.elapsed_time_percent = .75;
flowplayer(function(api, root) {
    flowplayer.conf.player_width = $(".myplayer").width();
    calculate_base_fontsize();
    change_font_size_absolute(".fp-subtitle", api.conf.base_fontsize / flowplayer.conf.base_fontsize);
    api.paused_by_mouseenter = false;
    api.elapsed_time = {
        enabled: true,
        time: 0,
        start: 0
    };
    var add_movie_tries_count = 0
      , notify_success_start = 120;
    function update_elapsed_time_time() {
        if (!api.elapsed_time.enabled)
            return;
        var interval = api.video.time - api.elapsed_time.start;
        api.elapsed_time.time += interval > 0 ? interval : 0;
        if (api.elapsed_time.time / api.video.duration > flowplayer.conf.elapsed_time_percent) {
            if (video_attrs.id !== "") {
                notify("coming_to_the_end");
                api.elapsed_time.enabled = false
            } else {
                add_movie_to_lib(false, function(success) {
                    if (success)
                        api.elapsed_time.enabled = false
                });
                if (++add_movie_tries_count >= 2)
                    api.elapsed_time.enabled = false
            }
        }
        if (notify_success_start && notify_success_start < api.elapsed_time.time) {
            notify("success_start", 4);
            notify_success_start = 0
        }
    }
    function remove_words_class(css_class) {
        $(".fp-subtitle ." + css_class).each(function() {
            $(this).removeClass(css_class)
        })
    }
    function remove_classes(classes) {
        for (var i = 0, len = classes.length; i < len; i++) {
            remove_words_class(classes[i])
        }
    }
    function add_new_words(text) {
        text = $.trim(text);
        var words = text.split(" ");
        if (words.length > 2)
            return;
        if (words.length > 1) {
            delete app.new_words[words[0]]
        }
        app.new_words[text] = 1;
        app.new_words_len = Object.keys(app.new_words).length;
        if (app.new_words_len % 20 === 0) {
            notify(app.new_words_len + "_words_translated")
        }
        if (video_attrs.id !== "") {
            localStorage.setItem("movie" + video_attrs.id, JSON.stringify(app.new_words))
        }
        print_new_words()
    }
    api.bind("fullscreen", function() {
        var factor = $(window).width() / flowplayer.conf.player_width;
        change_font_size_relative(".fp-subtitle", factor);
        change_font_size_relative(".translation", factor);
        resize_subtitle_wrap(factor)
    });
    api.bind("fullscreen-exit", function() {
        var factor = flowplayer.conf.player_width / $(window).width();
        change_font_size_relative(".fp-subtitle", factor);
        change_font_size_relative(".translation", factor);
        resize_subtitle_wrap(factor)
    });
    api.bind("resume", function() {
        $(".flowplayer").removeClass("play-white");
        $(".translation").hide();
        remove_words_class("selected");
        remove_words_class("pinned");
        remove_words_class("right-clicked");
        api.paused_by_mouseenter = false;
        api.elapsed_time.start = api.video.time
    });
    api.bind("pause", function() {
        update_elapsed_time_time()
    });
    api.bind("beforeseek", function() {
        if (!api.paused)
            update_elapsed_time_time()
    });
    api.bind("seek", function() {
        api.elapsed_time.start = api.video.time
    });
    api.bind("ready", function() {
        api.volume(flowplayer.conf.volume);
        if (typeof api.subtitles_src !== "undefined") {
            var timer = setInterval(function() {
                if (api.cuepoints.length > 0) {
                    clearInterval(timer);
                    $("#ui_subtitles_shift input").trigger("change")
                }
            }, 1e3)
        }
        if (api.video.duration < 3900) {
            api.elapsed_time.enabled = false;
            return
        }
    });
    api.bind("error", function(e, api, error) {
        notify("Player error: " + error.message + ". Elapsed_time " + api.elapsed_time.time);
        if (error.code > 4)
            return;
        var error_buttons = '<div id="error_buttons">' + '<a href="#" id="err-btn-restart" class="btn btn-large btn-success">Перезапустить</a>';
        error_buttons += '<a href="#" id="err-btn-close" class="btn btn-large btn-info">Закрыть</a>';
        if (error.code == 2) {
            if (window.location.href.indexOf("engine=flash") !== -1) {
                error_buttons += "<div>Вернуться в html5-плеер:</div>";
                error_buttons += '<a href="#" id="err-btn-html5" class="btn btn-info"><span>Открыть через html5-плеер</span></a>'
            } else {
                error_buttons += "<div>Если эта ошибка возникает очень часто и доставляет неудобства, попробуйте открыть это видео через flash-плеер:</div>";
                error_buttons += '<a href="#" id="err-btn-flash" class="btn btn-info"><span>Открыть через flash-плеер</span></a>'
            }
        } else if (error.code == 3) {
            error_buttons += "<div>В разделе &laquo;Помощь&raquo; описано решение для вашей проблемы :</div>";
            error_buttons += '<a href="page/help#problems" class="btn btn-info"><span>Известные проблемы и решения</span></a>'
        } else if (error.code == 4) {
            error_buttons += "<div><strong>Возможные причины появления этой ошибки:</strong></div>";
            error_buttons += "<ul><li>видеохостинг, с которого вы открыли видео, не поддерживается плеером</li><li>ссылка на видео устарела (в этом случае вам нужно заново открыть видео из каталога)</li>"
        }
        error_buttons += "</div>";
        $("#error_buttons").remove();
        $(".fp-message p").after(error_buttons);
        $("#err-btn-restart").click(function(e) {
            e.preventDefault();
            $("#submit-btn").trigger("click")
        });
        $("#err-btn-close").click(function(e) {
            e.preventDefault();
            api.fullscreen()
        });
        $("#err-btn-flash").click(function(e) {
            e.preventDefault();
            var url = window.location.href;
            url = url.replace(/\&engine=\w+/g, "");
            window.location.href = url + "&engine=flash"
        });
        $("#err-btn-html5").click(function(e) {
            e.preventDefault();
            var url = window.location.href;
            url = url.replace(/\&engine=\w+/g, "");
            window.location.href = url + "&engine=html5"
        })
    });
    $(".fp-subtitle").on("mouseenter", function(event) {
        if (!api.paused) {
            api.pause();
            api.paused_by_mouseenter = true
        }
    });
    $(".fp-subtitle-wrap").on("mouseleave", function(event) {
        var el = $(event.relatedTarget);
        if (api.paused && api.paused_by_mouseenter && !(el.hasClass("fp-controls") || el.hasClass("fp-progress") || el.hasClass("fp-buffer") || el.hasClass("fp-timeline") || el.is("a"))) {
            api.resume()
        }
    });
    $(".fp-subtitle").on("mousedown", function(event) {
        window.getSelection().removeAllRanges()
    });
    $(".fp-subtitle").on("click", "span", function(event) {
        sel = document.getSelection().toString();
        if (sel)
            return;
        text = $(this).text();
        add_new_words(text);
        get_translation(app.default_translator, text)
    });
    $(".fp-subtitle").on("mouseup", function(event) {
        if (event.which === 3)
            return;
        remove_words_class("right-clicked");
        var sel = document.getSelection().toString();
        if (!sel)
            return;
        var text = $.trim(sel).replace(/[\r\n]/g, " ");
        if (!text)
            return;
        add_new_words(text);
        get_translation(app.default_translator, text)
    });
    $(".fp-subtitle").on("contextmenu", "span", function(event) {
        event.stopPropagation();
        event.preventDefault();
        var span = $(this);
        span.toggleClass("right-clicked");
        if (!span.hasClass("right-clicked"))
            return;
        var text = "";
        $(".fp-subtitle .right-clicked").each(function() {
            text += $(this).text() + " "
        });
        add_new_words(text);
        get_translation(app.default_translator, text)
    });
    $(".fp-subtitle").on("contextmenu", function(event) {
        event.stopPropagation()
    })
});
function show_translation(text, service, word, no_header) {
    var tr_obj = $(".translation");
    var sub_obj = $(".fp-subtitle");
    var sub_wrap = $(".fp-subtitle-wrap");
    tr_obj.css({
        bottom: sub_obj.height() + parseFloat(sub_obj.css("bottom")),
        "max-height": ($(".myplayer").height() - sub_obj.outerHeight() - sub_wrap.height() - parseInt(sub_wrap.css("bottom")) - 2 * parseInt(tr_obj.css("padding-top")) - 2 * parseInt(tr_obj.css("border-top-width"))).toString() + "px"
    });
    var header = "";
    if (app.has_extension && !no_header) {
        var available = {
            yandex: "Яндекс",
            google: "Google",
            lingualeo: "LinguaLeo",
            glosbe: "Glosbe",
            urban: "Urban"
        };
        if (app.extension_version < "1.4.7")
            delete available.lingualeo;
        header = '<div id="translators" class="text-center">';
        for (id in available) {
            header += '<a href="#" id="' + id + '"';
            header += id === service ? ' class="btn btn-success disabled"' : ' class="btn btn-success"';
            header += "><span>" + available[id] + "</span></a>"
        }
        header += "</div>"
    }
    tr_obj.html(header + text);
    var left = ($(".myplayer").width() - tr_obj.outerWidth()) / 2;
    tr_obj.css("left", left);
    if (app.has_extension) {
        $("#translators a").click(function(e) {
            e.preventDefault();
            app.default_translator = this.id;
            get_translation(this.id, word)
        });
        $(".translation .lingualeo-suggest li .ru").hover(function() {
            $(this).addClass("lingualeo-selected").append($('<span class="translation-note absolute">добавить в словарь</span>'))
        }, function() {
            $(this).removeClass("lingualeo-selected").find("span:last").remove()
        }).click(function() {
            var wordForm = $(this).closest(".translation").find(".eng").text();
            if (!wordForm)
                wordForm = word;
            var tspan = $(this).find("span")[0];
            var translation = tspan.innerText || tspan.textContent;
            var context = $(".fp-active").text();
            export_word("lingualeo", wordForm, translation, context)
        })
    }
    tr_obj.show()
}
function get_translation(service, text) {
    show_translation('<p style="text-align:center"><img src="img/loader.gif"/></p>');
    if (app.has_extension) {
        if (service === "lingualeo" && !app.lingualeo_ready) {
            lingualeo_guest_translation(text)
        } else {
            window.postMessage({
                client_id: "translator",
                service: service,
                text: text
            }, "*")
        }
        return
    } else {
        yandex_translate(text)
    }
}
function yandex_translate(text) {
    text = text.replace(" ", ",");
    $.each(["'s", "n't", "'m", "'re", "'ll", "'ve", "'d"], function(i, val) {
        text = text.replace(val, "")
    });
    var url = "ajax/ya.php?text=" + encodeURIComponent(text);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "xml",
        success: function(data) {
            process_ya_reply(data, text)
        },
        error: function(xhr, status, error) {
            console.error("An AJAX error occured: " + status + "\nError: " + error)
        }
    })
}
function process_ya_reply(xml, text) {
    var res = "";
    if ($(xml).find("translation").length == 0) {
        res = '<p class="eng">' + text.replace(",", " ") + '</p><p class="notfound">Перевода слова не найдено</p>'
    }
    $(xml).find("translation").each(function(index) {
        res += '<p class="eng">' + $(this).attr("word") + "</p>";
        res += '<p class="ru">';
        var variants = $(this).find("variant");
        variants.each(function(index) {
            res += $(this).text();
            if (index != variants.length - 1) {
                res += ", "
            }
        });
        res += "</p>"
    });
    $(xml).find("time").each(function() {
        res += '<p class="time">Time: ' + $(this).text() + "</p>"
    });
    show_translation(res)
}
function export_word(service, word, translation, context) {
    show_translation('<p style="text-align:center"><img src="img/loader.gif"/></p>');
    if (app.has_extension) {
        window.postMessage({
            export_service: service,
            text: word,
            translation: translation,
            context: context
        }, "*");
        return
    }
}
function show_export_results(text) {
    show_translation(text, "", "", true)
}
function check_lingualeo_access() {
    if (typeof app.lingualeo_ready === "undefined") {
        window.postMessage({
            export_service: "lingualeo",
            text: "",
            check_permission: true
        }, "*")
    }
}
function set_lingualeo_state(state) {
    if (state === "on") {
        app.lingualeo_ready = true
    } else {
        app.lingualeo_ready = false
    }
}
function lingualeo_guest_translation(word) {
    var promo = "";
    promo += '<div class="lingualeo-promo">';
    promo += "<h3>Вы не зарегистрированы</h3>";
    promo += '<img src="img/leo2.png"/>';
    promo += "<p>Зарегистрируйтесь сейчас и вы получите возможность:";
    promo += "<ul>";
    promo += "<li>переводить слова";
    promo += "<li><strong>добавлять их в свой личный словарь</strong>";
    promo += "<li>тренировать с помощью упражнений";
    promo += "<li>и многое другое...";
    promo += "</ul>";
    promo += "</p>";
    promo += '<a href="https://ad.admitad.com/g/e583077b63d0a7cca160c814d4b7c0/" class="btn btn-large btn-warning" target="_blank">Зарегистрироваться / Войти</a>';
    promo += "</div>";
    show_translation(promo, "lingualeo", word)
}
function calculate_base_fontsize() {
    var fullscreen_fontsize = 42 / 1080 * screen.height;
    flowplayer.conf.base_fontsize = fullscreen_fontsize * ($(".myplayer").height() / screen.height)
}
function change_font_size_absolute(selector, factor) {
    var new_size = (parseFloat(flowplayer.conf.base_fontsize) * factor).toString() + "px";
    $(selector).css("font-size", new_size)
}
function change_font_size_relative(selector, factor) {
    var size = $(selector).css("font-size");
    var new_size = (parseFloat(size) * factor).toString() + "px";
    $(selector).css("font-size", new_size)
}
function resize_subtitle_wrap(factor) {
    var h = $(".fp-subtitle-wrap").height();
    var b = parseFloat($(".fp-subtitle").css("bottom"));
    $(".fp-subtitle-wrap").height(h * factor);
    $(".fp-subtitle").css("bottom", (b * factor).toString() + "px")
}
function shift_subtitles(time) {
    var player_obj = flowplayer(".myplayer");
    var shift = time - flowplayer.conf.subtitles_shift;
    if (shift == 0) {
        return
    }
    function set_time(obj, prop, time) {
        obj[prop] += time
    }
    for (var i = 0; i < player_obj.cuepoints.length; i += 2) {
        set_time(player_obj.cuepoints[i], "time", shift);
        set_time(player_obj.cuepoints[i].subtitle, "startTime", shift);
        set_time(player_obj.cuepoints[i].subtitle, "endTime", shift);
        set_time(player_obj.cuepoints[i + 1], "time", shift)
    }
    flowplayer.conf.subtitles_shift += shift
}
function change_subs_opacity(step) {
    var obj = $(".fp-subtitle")
      , opacity = parseFloat($(".fp-subtitle").css("background-color").split(",")[3]);
    if (isNaN(opacity))
        opacity = 1;
    var new_opacity = opacity + step;
    new_opacity = new_opacity < 0 ? 0 : new_opacity > 1 ? 1 : new_opacity;
    obj.css({
        "background-color": "rgba(0,0,0," + new_opacity.toString() + ")"
    })
}
function change_subs_position(step) {
    var obj = $(".fp-subtitle")
      , wrap_obj = $(".fp-subtitle-wrap");
    bottom = parseFloat(obj.css("bottom")),
    new_bottom = bottom + step,
    max_bottom = parseInt($(".myplayer").height() / 4);
    new_bottom = new_bottom < 0 ? 0 : new_bottom > max_bottom ? max_bottom : new_bottom;
    wrap_obj.height(new_bottom);
    obj.css("bottom", new_bottom + "px")
}
function init_player_ui() {
    $("#ui_subtitles_shift input").change(function() {
        val = parseFloat($(this).val());
        if (isNaN(val)) {
            val = 0
        }
        $(this).val(val + "sec");
        shift_subtitles(val)
    });
    $("#ui_subtitles_font input").change(function() {
        val = parseFloat($(this).val());
        if (!val) {
            return
        }
        $(this).val(val + "%");
        change_font_size_absolute(".fp-subtitle", val / 100)
    });
    $("#ui_translation_font input").change(function() {
        val = parseFloat($(this).val());
        if (!val) {
            return
        }
        $(this).val(val + "%");
        change_font_size_absolute(".translation", val / 100)
    });
    $("#ui_subtitles_shift a").click(function(e) {
        e.preventDefault();
        var interval = 1;
        if ($(this).hasClass("ui_less")) {
            interval = -interval
        }
        var res = parseFloat($("#ui_subtitles_shift input").val());
        res += interval;
        $("#ui_subtitles_shift input").val(res.toString() + "sec");
        $("#ui_subtitles_shift input").trigger("change")
    });
    $("#ui_translation_font a, #ui_subtitles_font a").click(function(e) {
        e.preventDefault();
        var step = 10;
        var parent = $(this).parent();
        if ($(this).hasClass("ui_less")) {
            step = -step
        }
        var input = parent.find("input");
        var res = parseInt(input.val()) + step;
        input.val(res.toString() + "%");
        input.trigger("change")
    });
    $("#ui_subtitles_opacity a").click(function(e) {
        e.preventDefault();
        var step = .1;
        if ($(this).hasClass("ui_less"))
            step = -step;
        change_subs_opacity(step)
    });
    $("#ui_subtitles_position a").click(function(e) {
        e.preventDefault();
        var step = 5;
        if ($(this).hasClass("ui_less"))
            step = -step;
        change_subs_position(step)
    });
    $("#ui_subtitles_presence select").change(function(e) {
        var player_class = $(this).val();
        var $player = $(".flowplayer");
        $.each(["always_subs", "paused_subs", "no_subs"], function(i, c) {
            $player.removeClass(c)
        });
        $player.addClass(player_class);
        dump($player)
    });
    $("#player_ui_wrapper").hide()
}
function stop_upload(error, message) {
    var result = "", alert_class;
    if (!error) {
        alert_class = "alert alert-success";
        result = "Файл загружен успешно!";
        $("#subs_url").html(message)
    } else {
        alert_class = "alert alert-error";
        var error_str = "";
        if (error === 3)
            error_str = "Вы загрузили архив. Распакуйте его у себя и загрузите файл с расширением *.srt или *.vtt";
        else
            error_str = message;
        result = "Произошла ошибка во время загрузки файла! (" + error_str + ")"
    }
    $("#subs_upload_process").hide();
    $("#subs_upload_form").show();
    $("#subs_upload_result").removeClass("alert-error alert-success").addClass(alert_class).show();
    $("#subs_upload_result").html(result);
    window.setTimeout(function() {
        $("#subs_upload_result").slideUp(500)
    }, error ? 5e3 : 1e3)
}
function lib_item_baloon_init(url, reg_link) {
    var res = '<div class="b-links"><div class="link_buttons_border ' + (app.has_extension ? "has_extension" : "") + '">';
    if (!app.has_extension) {
        res += baloon_no_extension_notice()
    } else {
        res += get_baloon_content(url, reg_link)
    }
    res += "</div></div>";
    return res
}
function baloon_no_extension_notice() {
    var res = '<div class="no-extension-notice">';
    res += "<h4>Вам нужны субтитры?</h4>";
    res += "<p>Чтобы воспользоваться субтитрами и переводчиком, необходимо добавить расширение." + ' <a href="page/help#extension">Зачем это нужно?</a></p>';
    res += '<div class="lib-item-buttons">';
    if (app.is_mobile)
        res += "<h5>Расширение недоступно для мобильных устройств и планшетов</h5>";
    else if (app.not_chrome)
        res += "<p>Расширение доступно для браузеров <strong>Firefox</strong>, <strong>Chrome</strong> и других аналогов на основе <strong>Chromium</strong> (Opera, Яндекс.Браузер и т.д.)</p><br/>" + '<a class="btn btn-success" href="page/help#browsers">Выбрать расширение</a>';
    else
        res += '<a class="btn btn-success ext-install">Добавить расширение</a>';
    res += '<a class="btn no-subs">Нет, мне не нужны субтитры</a>';
    res += '<img class="extension-loading hide" src="img/loader_circle2.gif"/>';
    res += "</div>";
    res += '<div class="ext-install-error alert hide"></div>';
    res += "</div>";
    return res
}
function get_baloon_content(url, reg_link, show_player) {
    var res = "";
    if (url.match(/^https?:\/\/vk\.com\/video_ext\.php\?.*/)) {
        res += vk_opened(url, show_player)
    } else {
        if (reg_link || url.match(/^https?:\/\/vk\.com\/video/)) {
            res += vk_closed(url, reg_link)
        } else {
            res += not_vk_video(url)
        }
    }
    return res
}
function vk_opened(url, show_vk_player) {
    var res = "";
    if (app.has_extension && !show_vk_player) {
        res += '<div>Выберите качество видео: </div><iframe class="show-buttons-only" src="' + url + '" scrolling="no"></iframe>';
        res += '<div>Или:<div><a class="btn btn-mini no-subs">Открыть без субтитров</a></div></div>';
        var oid = url.match(/oid=([\d-]+)&/)[1];
        var id = url.match(/id=([\d]+)&/)[1];
        if (oid && id) {
            res += "<p>Ссылка на видео Вконтакте:</p>";
            var vkUrl = "https://vk.com/video" + oid + "_" + id;
            res += '<div class="lib_ext_link"><a href="' + vkUrl + '">' + vkUrl + "</a></div>"
        }
    } else {
        res += '<iframe class="show-player" src="' + url + '" width="610px" height="360px" scrolling="no"></iframe>'
    }
    return res
}
function vk_closed(url, reg_link) {
    var res = "";
    if (reg_link) {
        res += "<h4>Видео находится в закрытой группе Вконтакте.</h4>" + "<p>Для просмотра вы должны <strong>вступить в эту группу:</strong></p>" + '<div class="lib_ext_link"><a href="' + reg_link + '" target="_blank">' + reg_link + "</a></div>" + '<h4 class="clear">Затем:</h4>'
    }
    res += "<p>Откройте ссылку:</p>" + '<div class="lib_ext_link"><a href="' + url + '" target="_blank">' + url + "</a></div>";
    if (app.has_extension)
        res += '<p class="clear">и кликните на кнопки нашего сервиса в нижней части плеера: <img src="img/vklinks.png"></p>';
    return res
}
function not_vk_video(url) {
    var res = "";
    if (app.has_extension) {
        res += "<h4>Шаг 1:</h4><p>Откройте ссылку";
        if (url.match(/^https?:\/\/viooz.co/)) {
            res += ", <strong><u>выберите максимальное качество</u></strong> (если есть выбор)"
        }
        res += ' и <span class="underline"><strong>запустите</strong></span> видео.';
        res += "</p>";
        res += "<h4>Шаг 2:</h4>";
        res += "<p>Когда видео начнется, нажмите на значок " + '<img src="img/extension-icon.png" style="height: 24px;"> в панели расширений браузера (справа вверху), чтобы открыть видео через наш плеер.<p>'
    }
    res += '<h4 style="margin-bottom:5px;">Ссылка:</h4><div class="lib_ext_link"><a href="' + url + '" target="_blank">' + url + "</a></div>";
    return res
}
function onload_baloon() {
    var id = window.location.hash.replace("#", "");
    $("#movie" + id).trigger("click")
}
function init_app() {
    app.not_chrome = $(".browser-is-not-supported").length !== 0;
    app.is_mobile = $(".mobile-browser").length !== 0
}
function check_extension() {
    if (app.has_extension)
        return true;
    var $ext_node = $("#EXTENSION_INSTALLED");
    if ($ext_node.length) {
        app.has_extension = true;
        var version = $ext_node.data("version");
        app.extension_version = version ? version : "";
        init_extension(app.extension_version);
        return true
    }
    return false
}
function check_extension_loop() {
    if (!check_extension()) {
        var tries = 50;
        var timer = setInterval(function() {
            if (check_extension() || tries-- <= 0)
                clearInterval(timer)
        }, 200)
    }
}
function init_extension(version) {
    if (version >= "1.4.7") {
        check_lingualeo_access()
    }
}
function check_video_type() {
    if ($("#video_type").val().match(/^(mp4|webm|ogg|flv)$/))
        return true;
    var src = $("input[name=video_src]").val();
    if (src == "") {
        return false
    }
    var TYPE_RE = /\.(mp4|webm|ogg|flv)/;
    var type = TYPE_RE.exec(src);
    if (type) {
        $("#video_type_select").val(type[1]);
        $("#video_type").val(type[1])
    } else {
        if ($("#video_type_alert").is(":hidden")) {
            $("#video_type_alert").slideDown();
            return false
        } else {
            $("#video_type").val($("#video_type_select").val())
        }
    }
    return true
}
function generate_player_code(video_src, video_type, subs_url) {
    if (video_type === "flv")
        video_type = "flash";
    var res = '<div class="myplayer is-splash play-white">' + "\n";
    res += "<video>\n" + '<source src="' + video_src + '" type="video/' + video_type + '" />' + "\n";
    res += '<track src="' + subs_url + '"/>' + "\n";
    res += "</video>";
    res += "</div><!--myplayer-->\n";
    return res
}
function init_video_attrs() {
    $.each(["vk_id", "page_url", "video_type", "user_id"], function(i, val) {
        if ($("#" + val).length === 1) {
            video_attrs[val] = $("#" + val).val()
        }
    });
    if ($("#movie_id").length === 1) {
        video_attrs.id = $("#movie_id").val()
    }
}
function get_movie_name() {
    var movie_name = $("#movie_name").val();
    if (movie_name === "" || typeof movie_name === "undefined") {
        movie_name = $("#movie_name_admin").val() || ""
    }
    return $.trim(movie_name)
}
function get_category_id() {
    var cat_id = parseInt($("#category_select_user input[name=category_user]:checked").val() || 0)
      , cat_id_admin = parseInt($("#category_select_admin input[name=category_admin]:checked").val() || 0);
    if (cat_id_admin !== 0) {
        cat_id = cat_id_admin
    }
    return cat_id
}
function update_video_attrs() {
    video_attrs.subs_shift = flowplayer.conf.subtitles_shift;
    video_attrs.subs_url = $("#subs_url").text();
    video_attrs.movie_name = get_movie_name();
    video_attrs.category_id = get_category_id();
    video_attrs.page_url_new = $("#page_url_admin").val();
    video_attrs.vk_id_new = $("#vk_id_admin").val()
}
function init() {
    init_app();
    init_player_ui();
    init_video_attrs();
    extension_install_btn_init();
    check_extension_loop();
    Session.init();
    Notifications.get()
}
function notify(msg, verbosity) {
    if (!verbosity)
        verbosity = 3;
    if (verbosity <= app.verbosity) {
        $.get("ajax/notify.php", {
            msg: msg
        })
    }
}
function generate_alert(obj, type, message, timeout) {
    obj.hide();
    obj[0].className = "alert alert-" + type;
    obj.text(message);
    obj.slideDown();
    if (typeof timeout === "undefined")
        timeout = 3e3;
    if (timeout) {
        setTimeout(function() {
            obj.slideUp()
        }, timeout)
    }
}
function add_movie_to_lib(by_user, callback) {
    update_video_attrs();
    var show_alert = function(classname, message) {
        if (!by_user)
            return;
        var alert = $("#add_movie_alert");
        alert[0].className = "alert " + classname;
        $("#add_movie_alert span").text(message);
        alert.slideDown()
    };
    if (video_attrs["movie_name"] === "" && by_user) {
        show_alert("alert-error", "Не заполнено название фильма.");
        return false
    }
    if (by_user && !video_attrs["movie_name"].match(/^[A-Za-z0-9].*$/)) {
        show_alert("alert-error", "Название фильма должно начинаться с буквы или цифры");
        return false
    }
    if (video_attrs["subs_url"] === "") {
        show_alert("alert-error", "Субтитры не загружены.");
        return false
    }
    $.ajax({
        url: "ajax/add_movie.php",
        data: video_attrs,
        dataType: "json",
        success: function(data) {
            if (typeof data.success !== "undefined") {
                $("#message_content").slideUp();
                show_alert("alert-success", data.success);
                if (callback)
                    callback(true)
            } else if (typeof data.error !== "undefined") {
                show_alert("alert-error", data.error)
            } else {
                show_alert("alert-error", "Неизвестная ошибка :(")
            }
        },
        error: function(error) {
            show_alert("alert-error", "Невозможно добавить видео. Проблема на стороне сервера.")
        }
    })
}
function edit_movie() {
    update_video_attrs();
    var alert_obj = $("#action_result");
    if (video_attrs["subs_url"] === "") {
        generate_alert(alert_obj, "error", "Субтитры не найдены");
        return false
    }
    var res = false;
    $.ajax({
        url: "ajax/update_movie.php",
        data: video_attrs,
        dataType: "json",
        success: function(data) {
            if (typeof data.success != "undefined") {
                generate_alert(alert_obj, "success", data.success);
                res = true
            } else if (typeof data.error != "undefined") {
                generate_alert(alert_obj, "error", data.error)
            } else {
                generate_alert(alert_obj, "error", "Неизвестная ошибка :(")
            }
        },
        error: function(error) {
            generate_alert(alert_obj, "error", "Невозможно добавить видео. Проблема на стороне сервера.")
        }
    });
    return res
}
function delete_movie_by_id(id) {
    var alert_obj = $("#action_result");
    var res = false;
    $.ajax({
        url: "ajax/delete_movie.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(data) {
            if (typeof data.success != "undefined") {
                generate_alert(alert_obj, "success", data.success);
                res = true
            } else if (typeof data.error != "undefined") {
                generate_alert(alert_obj, "error", data.error)
            } else {
                generate_alert(alert_obj, "error", "Неизвестная ошибка :(")
            }
        },
        error: function(error) {
            generate_alert(alert_obj, "error", "Невозможно удалить видео. Проблема на стороне сервера.")
        }
    });
    return res
}
function extension_install_btn_init() {
    $(".library_content li").on("click", ".ext-install", function(e) {
        e.preventDefault();
        extension_install(this);
        var msg = "Если возникнут проблемы при установке, попробуйте добавить расширение через официальный магазин Google: ";
        msg += '<a href="https://chrome.google.com/webstore/detail/hamatatacom-helper/odkfginmjmeaoggmbainlfacibmhhbbd">https://chrome.google.com/webstore</a>';
        setTimeout(function() {
            $(".ext-install-error").hide().html(msg).removeClass("alert-error").slideDown()
        }, 4e3)
    })
}
function extension_install(btn) {
    notify("extension");
    $(".extension-loading").show();
    $(btn).addClass("disabled");
    chrome.webstore.install(undefined, function() {
        window.location.hash = "#" + app.last_chosen_movie_id;
        window.location.reload()
    }, function(err) {
        $(".extension-loading").hide();
        if (err === "Invalid manifest") {
            err = "Вы используете устаревшую версию браузера."
        }
        var msg = "<p>При добавлении возникла ошибка: <strong>" + err + "</strong></p>";
        msg += "<p>Попробуйте добавить наше расширение через официальный магазин Google:</p>";
        msg += '<a href="https://chrome.google.com/webstore/detail/hamatatacom-helper/odkfginmjmeaoggmbainlfacibmhhbbd">https://chrome.google.com/webstore</a>';
        $(".ext-install-error").hide().html(msg).addClass("alert-error").slideDown();
        notify("extension_error:" + err);
        $(btn).removeClass("disabled");
        window.setTimeout(function() {
            $(".ext-install-error").slideUp()
        }, 1e4)
    })
}
function unknown_words_declension(n) {
    if (n > 10 && n < 15)
        return "незнакомых слов";
    switch (n % 10) {
    case 1:
        return "незнакомое слово";
    case 2:
    case 3:
    case 4:
        return "незнакомых слова";
    default:
        return "незнакомых слов"
    }
}
function retrieve_new_words() {
    if (video_attrs.id) {
        try {
            app.new_words = JSON.parse(localStorage.getItem("movie" + video_attrs.id))
        } catch (e) {
            app.new_words = {};
            dump("Cann't restore words: " + e)
        }
        if (app.new_words === null) {
            app.new_words = {}
        }
        print_new_words()
    }
}
function print_new_words() {
    var str = Object.keys(app.new_words).join(", ");
    $("#tab_new_words p").html(str ? str : "Список пуст.");
    if (!$.isEmptyObject(app.new_words)) {
        $("#clear_new_words").show()
    }
}
var Notifications = function() {
    var my = {};
    var interval = 30 * 60 * 1e3;
    var lastTimestamp = localStorage.notificationTimestamp || 0;
    my.get = function() {
        if (Session.getVisit() < 5)
            return;
        if (Date.now() - lastTimestamp < interval)
            return;
        localStorage.notificationTimestamp = Date.now();
        var url = "ajax/notifications.php";
        $.getJSON(url, function(json) {
            process(json)
        }).fail(function(r) {
            console.log(r)
        })
    }
    ;
    var process = function(json) {
        for (var i = 0, len = json.length; i < len; i++) {
            var item = json[i];
            var id = item.id;
            if (localStorage["notification" + id])
                continue;
            else {
                show(item);
                break
            }
        }
    };
    show = function(item) {
        var html = "";
        html += '<div class="n-title">' + item.title + "</div>";
        html += '<div class="n-text">' + item.text + "</div>";
        html += '<div class="text-center">';
        html += '<span class="btn btn-small n-close">Закрыть</span>';
        html += '<span class="btn btn-small n-dismiss" data-id="' + item.id + '">Закрыть и больше не показывать</span>';
        html += "</div>";
        var $popup = $(html).appendTo($("#notification"));
        $("#notification").removeClass("hide");
        $popup.find(".n-dismiss").click(function() {
            var id = this.dataset.id;
            if (id)
                localStorage["notification" + id] = true;
            $("#notification").addClass("hide");
            $popup.remove()
        });
        $popup.find(".n-close").click(function() {
            $("#notification").addClass("hide");
            $popup.remove()
        })
    }
    ;
    return my
}();
var Session = function() {
    var visit = 1;
    var visitTimestamp = 0;
    var interval = 3 * 3600 * 1e3;
    var init = function() {
        if (localStorage.visit) {
            visit = parseInt(localStorage.visit);
            visitTimestamp = parseInt(localStorage.visitTimestamp);
            if (Date.now() - visitTimestamp > interval) {
                visit++
            }
        }
        save()
    };
    var save = function() {
        localStorage.visitTimestamp = Date.now();
        localStorage.visit = visit
    };
    var getVisit = function() {
        return visit
    };
    return {
        init: init,
        getVisit: getVisit
    }
}();
$(document).ready(function() {
    init();
    $("#subs_upload_submit").click(function(event) {
        $("#subs_upload_process").show()
    });
    $("input[name=subs_file]").change(function() {
        if (this.files[0].size > 4e5) {
            stop_upload(1, "Слишком большой файл. Максимальный размер &mdash; 400 Кб");
            return
        }
        $("#subs_upload_form").submit();
        $("#subs_upload_process").show()
    });
    $("input[name=local_video]").change(function() {
        var src = window.URL.createObjectURL(this.files[0]);
        $("input[name=video_src]").val(src)
    });
    $("input[name=video_src]").change(function() {
        $("#video_type").val("");
        video_attrs = {}
    });
    $("#video_type_select").change(function() {
        $("#video_type").val(this.value)
    });
    $("#submit-btn").click(function(event) {
        event.preventDefault();
        if (flowplayer()) {
            flowplayer().unload();
            $(".myplayer").remove();
            $("#player_ui_wrapper").hide()
        }
        if (check_video_type() == 0) {
            return
        }
        video_attrs.video_src = $("input[name=video_src]").val();
        video_attrs.video_type = $("#video_type").val();
        video_attrs.subs_url = $("#subs_url").text();
        $player_wrapper = $("#player_wrapper");
        $player_wrapper.html(generate_player_code(video_attrs.video_src, video_attrs.video_type, video_attrs.subs_url));
        if ($player_wrapper.hasClass("flash")) {
            $(".myplayer").flowplayer({
                engine: "flash"
            })
        } else if ($player_wrapper.hasClass("native")) {
            $video = $("video");
            $video.attr("controls", true);
            $video.css("width", "100%");
            return
        } else {
            $(".myplayer").flowplayer({})
        }
        calculate_base_fontsize();
        flowplayer.conf.subtitles_shift = 0;
        if (video_attrs.id) {
            retrieve_new_words()
        }
        $("#player_ui_wrapper").slideDown();
        $("#player_widgets").slideDown();
        $("#ui_translation_font input").trigger("change");
        $("#ui_subtitles_font input").trigger("change")
    });
    $(".library_content a.movie").click(function(event) {
        event.preventDefault();
        $(".b-links").remove();
        var obj = $(this);
        app.last_chosen_movie_id = obj.data("id");
        var url = obj.data("link")
          , reg_link = obj.data("reg")
          , baloon = lib_item_baloon_init(url, reg_link);
        $(baloon).appendTo($(this.parentNode))
    });
    $(".library_content").on("click", ".no-subs", function() {
        var a = $(this).parents("li").find(".movie");
        if (a.length !== 1)
            return;
        var url = a.data("link").replace("#hmt", "")
          , reg_link = a.data("reg")
          , show_player = true
          , content = get_baloon_content(url, reg_link, show_player);
        $(this.parentNode.parentNode).after(content);
        notify(a.text(), 4)
    });
    $(".form-search ").on("submit", function(e) {
        e.preventDefault();
        query = $(this).find("input[type=text]").val();
        if (typeof query === "undefined" || query.length < 3) {
            generate_alert($("#notifier"), "error", "Минимальная длина запроса - 3 символа", 2e3);
            return
        } else if (query.match(/[А-Яа-яЁё]/)) {
            generate_alert($("#notifier"), "error", "Введите название на английском", 2e3);
            return
        }
        window.location.href = "http://" + app.host + "/search/" + encodeURIComponent(query)
    });
    $("#tab_share_link").click(function() {
        function escapeQuotes(text) {
            return text.replace(/"/g, '\\"').replace(/'/g, "\\'")
        }
        var movie_name = $("#movie_name_hidden").val()
          , words_str = $("#tab_new_words p").text()
          , words = words_str.split(", ")
          , words_counter = words.length
          , title = "Посмотрел «" + escapeQuotes(movie_name) + "» на английском.";
        if (words_counter > 1)
            title += " Встретил " + words_counter + " " + unknown_words_declension(words_counter) + ".";
        var description = app.host + " - фильмы на английском с переводом субтитров по клику мыши.\\n\\nСписок новых слов: " + escapeQuotes(words_str)
          , link = app.host;
        var code = '<p><img id="tab_share_loader" src="img/loader.gif"/></p>' + '<div id="ya_share"></div>' + "<script>" + '$.getScript("//yandex.st/share/share.js", function (){' + "var YaShareInstance = new Ya.share({" + 'element: "ya_share", link: "http://' + link + '", title: "' + title + '", description: "' + description + '",' + 'onready: function(){$("#tab_share_loader").hide();}' + "})" + "});</script>";
        $("#tab_share").html(code)
    });
    $("#clear_new_words").click(function(event) {
        event.preventDefault();
        if (video_attrs.id) {
            localStorage.removeItem("movie" + video_attrs.id)
        }
        app.new_words = {};
        print_new_words()
    });
    $("#add_movie").click(function(event) {
        event.preventDefault();
        add_movie_to_lib("by_user")
    });
    $("#btn-edit").click(function(event) {
        event.preventDefault();
        edit_movie()
    });
    $(".alert-blinking").each(function() {
        var elem = $(this)
          , counter = 7
          , m = this.className.match(/blink-counter(\d+)/);
        if (m) {
            counter = m[1]
        }
        var id = setInterval(function() {
            if (elem.css("opacity") == 0) {
                elem.fadeTo(50, 1)
            } else {
                elem.fadeTo(300, 0)
            }
            if (--counter <= 0) {
                clearInterval(id)
            }
        }, 500)
    });
    $("#show-controls").click(function() {
        $(".btn-delete-movie").css("display", "inline-block")
    });
    $(".btn-delete-movie").click(function(event) {
        event.preventDefault();
        id = parseInt($(this).data("id"));
        if ($(this).next().is("a")) {
            var movie_name = $(this).next().text()
        } else {
            update_video_attrs();
            movie_name = video_attrs["movie_name"]
        }
        var r = confirm("Вы действительно хотите удалить фильм " + movie_name + " (id=" + id + ")?");
        if (r === true) {
            if (id > 0) {
                delete_movie_by_id(id)
            }
        }
    });
    $('.contact-form button[type="submit"]').click(function(e) {
        e.preventDefault();
        if ($('textarea[name="msg"]').val().length == 0) {
            $(".contact-form-result").hide().text("Пустые сообщения не принимаем").slideDown();
            return
        }
        var data = {
            video_attrs: video_attrs,
            url: document.location.href,
            userAgent: navigator.userAgent,
            from: $('input[name="from"]').val(),
            msg: $('textarea[name="msg"]').val()
        };
        $(".contact-form-result").hide().text("Отправляем...").slideDown();
        $.post("ajax/sendmail.php", data, function(data) {
            $(".contact-form-result").hide().text(data).slideDown()
        })
    });
    $("ul.faq li").click(function() {
        var next_node = $(this).next();
        if (next_node.length > 0 && next_node.hasClass("faq-answer")) {
            $(this).next().remove();
            return
        }
        $(".faq-answer").remove();
        var item = this;
        url = $(this).data("page");
        if (!url)
            return;
        $.get("ajax/faq/" + url + ".php", function(data) {
            $('<div class="faq-answer">' + data + "<div>").insertAfter($(item)).slideDown()
        })
    });
    $(".kinopoisk-item").each(function() {
        var name = $(this).data("name")
          , year = $(this).data("year");
        this.title = "Найти информацию о фильме на КиноПоиск.ру";
        var href = "http://www.kinopoisk.ru/index.php?first=yes&level=7&m_act%5Bfrom%5D=forma&m_act%5Bwhat%5D=content&m_act%5Bfind%5D=" + name;
        if (year) {
            href += "&m_act%5Byear%5D=" + year
        }
        this.href = href
    });
    $(".imdb-item").each(function() {
        var name = $(this).data("name");
        this.title = "Найти информацию о фильме на IMDb";
        this.href = "http://www.imdb.com/find?s=tt&q=" + name
    });
    $(".top-banner").click(function(e) {
        var id = this.dataset.id;
        var user = this.dataset.user;
        notify("banner_click_" + id + "_" + user)
    });
    $("#back_to_top").click(function(e) {
        e.preventDefault();
        $("html,body").animate({
            scrollTop: 0
        }, 500, "swing")
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > 600) {
            $("#back_to_top").fadeIn("slow")
        } else {
            $("#back_to_top").hide()
        }
    })
});
window.onload = function() {
    check_extension();
    if (window.location.hash) {
        onload_baloon()
    }
}
;
