! function() {
    var e = function(e, t) {
        var n = function() {
            e() ? t() : setTimeout(n, 100)
        };
        n()
    };
    e(function() {
        return VWO && VWO._ && VWO._.libLoaded
    }, function() {
        window.VWO = window.VWO || [], VWO.v_o = "4.0.179",
            function() {
                var i = parseInt(new Date / 1e3, 10),
                    e, o = function() {
                        return e || (e = VWO.data.ts || i)
                    },
                    t = Object.keys || function(e) {
                        var t, n = [];
                        for (t in e) e.hasOwnProperty(t) && n.push(t);
                        return n
                    };

                function n(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                }

                function r(e, t) {
                    for (var n = [], i = 0; i < e.length; i++) n.push(t(e[i]));
                    return n
                }

                function a(e, t) {
                    for (var n = [], i = 0; i < e.length; i++) t(e[i], i) && n.push(e[i]);
                    return n
                }

                function T(e) {
                    var t = o(),
                        n = parseInt(new Date / 1e3, 10) - i;
                    return e ? t + n : 1e3 * (t + n) + +new Date % 1e3
                }

                function _(e, t) {
                    var n, i = !1;
                    return function() {
                        i && (clearTimeout(n), n = null), n = setTimeout(function() {
                            e.call()
                        }, t), i = !0
                    }
                }

                function s(e, t, n) {
                    "Array" === e ? (this.tags = [], this.lastSent = 0) : "Hash" === e && (this.tags = {}, this.sentTags = {}), this.type = e, this.maxCount = t || 1 / 0, this.addTagCallback = n || function() {}
                }

                function q(e, t, n, i) {
                    VWO._ && VWO._.customError && window.VWO._.customError({
                        msg: e,
                        url: "gquery.js",
                        lineno: t,
                        colno: n,
                        source: i
                    })
                }
                s.prototype.add = function(e, t) {
                    if (e) {
                        var n = this.tags;
                        "Array" === this.type ? ("[object Array]" !== Object.prototype.toString.call(e) && (e = [e]), e = r(e, function(e) {
                            return e = encodeURIComponent(e.trim())
                        }), n = a(n = (n = n.concat(e)).slice(0, this.maxCount), function(e, t) {
                            return n.indexOf(e) === t
                        }), this.tags = n) : "Hash" === this.type && (this.sentTags[e] && this.sentTags[e] === t || (this.tags[encodeURIComponent(e)] = encodeURIComponent(t))), this.addTagCallback()
                    }
                }, s.prototype.get = function() {
                    var e;
                    if (this.isTagPassed()) return "Array" === this.type ? (e = this.tags.slice(this.lastSent), this.lastSent = this.tags.length) : "Hash" === this.type && (e = this.tags, n(this.sentTags, this.tags), this.tags = {}), e
                }, s.prototype.isTagPassed = function() {
                    return "Array" === this.type ? this.tags.length > this.lastSent : "Hash" === this.type && 0 < t(this.tags).length
                }, s.prototype.reset = function() {
                    "Array" === this.type ? (this.tags = [], this.lastSent = 0) : "Hash" === this.type && (this.tags = {}, this.sentTags = {})
                }, s.prototype.refresh = function() {
                    "Array" === this.type ? this.lastSent = 0 : "Hash" === this.type && (n(this.tags, this.sentTags), this.sentTags = {})
                };
                var d = function() {
                        var c = document,
                            i = c.documentElement,
                            o = [].slice,
                            u = [].push,
                            r = [].map,
                            t = [].filter,
                            e = c.createElement("div"),
                            a = [].indexOf,
                            n = [].splice,
                            s = [].reverse,
                            d = window,
                            l = /^data-(.+)/,
                            h = /\S+/g,
                            f = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
                            m = {
                                animationIterationCount: !0,
                                columnCount: !0,
                                flexGrow: !0,
                                flexShrink: !0,
                                fontWeight: !0,
                                lineHeight: !0,
                                opacity: !0,
                                order: !0,
                                orphans: !0,
                                widows: !0,
                                zIndex: !0
                            };

                        function g(e) {
                            return e.multiple && e.options ? function(e, t, n, i) {
                                for (var o = [], r = V(t), a = i, s = 0, d = e.length; s < d; s++)
                                    if (r) {
                                        var c = t(e[s]);
                                        c.length && u.apply(o, c)
                                    } else
                                        for (var l = e[s][t]; !(null == l || i && a(-1, l));) o.push(l), l = n ? l[t] : null;
                                return o
                            }(t.call(e.options, function(e) {
                                return e.selected && !e.disabled && !e.parentNode.disabled
                            }), "value") : e.value || ""
                        }

                        function p(e) {
                            return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            } : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            })(e)
                        }
                        var v = {
                                focus: "focusin",
                                blur: "focusout"
                            },
                            w = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
                        var y = /\S+/g;
                        var _ = {
                            focus: {
                                delegateType: "focusin"
                            },
                            blur: {
                                delegateType: "focusout"
                            },
                            mouseenter: {
                                delegateType: "mouseover",
                                bindType: "mouseover"
                            },
                            mouseleave: {
                                delegateType: "mouseout",
                                bindType: "mouseout"
                            },
                            pointerenter: {
                                delegateType: "pointerover",
                                bindType: "pointerover"
                            },
                            pointerleave: {
                                delegateType: "pointerout",
                                bindType: "pointerout"
                            }
                        };
                        Element.prototype.closest || (Element.prototype.closest = function(e) {
                            var t = this;
                            if (!document.documentElement.contains(t)) return null;
                            do {
                                if (T(t, e)) return t;
                                t = t.parentElement || t.parentNode
                            } while (null !== t && 1 === t.nodeType);
                            return null
                        });
                        var b = function e(t, n) {
                                return new e.fn.init(t, n)
                            },
                            T = b.matches = function(e, t) {
                                var n = e && (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector);
                                return !!n && n.call(e, t)
                            },
                            N = b.isString = function(e) {
                                return p(e) === p("")
                            },
                            E = /^--/;

                        function S(e) {
                            return E.test(e)
                        }
                        var O = /-([a-z])/g;

                        function C(e, t) {
                            return t.toUpperCase()
                        }
                        var R = b.camelCase = function(e) {
                            return e.replace(O, C)
                        };

                        function k(e) {
                            return e && 1 === e.nodeType
                        }
                        var A = {},
                            D = e.style,
                            I = ["webkit", "moz", "ms", "o"];

                        function P(e, t) {
                            return parseInt(L(e, t), 10) || 0
                        }

                        function L(e, t, n) {
                            if (k(e) && t) {
                                var i = d.getComputedStyle(e, null);
                                return t ? n ? i.getPropertyValue(t) || void 0 : i[t] : i
                            }
                        }

                        function x() {}

                        function M(e) {
                            return e[z] = e[z] || {}
                        }

                        function H(e) {
                            return e && 9 === e.nodeType
                        }
                        var W, V = b.isFunction = function(e) {
                                return p(e) === p(x) && !!e.call
                            },
                            z = b.uid = "_gQ" + Date.now(),
                            F = b.isWindow = function(e) {
                                return e === e.window
                            },
                            j = b.isNumeric = function(e) {
                                return !isNaN(parseFloat(e)) && isFinite(e)
                            };

                        function Y(e, t) {
                            for (var n = 0, i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
                        }

                        function X(e, t, o) {
                            Y(e, function(n, i) {
                                Y(t, function(e, t) {
                                    U(i, n ? t.cloneNode(!0) : t, o, o && i.firstChild)
                                })
                            })
                        }

                        function U(e, t, n, i) {
                            if (Y(t && 3 === t.nodeType ? [] : b("script", t), function(e, t) {
                                    var n = document.createElement("script");
                                    Y(b(t).prop("attributes"), function() {
                                        b(n).attr(this.name, this.value)
                                    }), n.text = t.innerHTML, document.getElementsByTagName("head")[0].appendChild(n), t.parentElement.removeChild(t)
                                }), n)
                                if ("SCRIPT" === t.tagName || "STYLE" === t.tagName) {
                                    var o = document.createElement(t.tagName.toLowerCase());
                                    "SCRIPT" === t.tagName ? o.text = t.innerHTML : o.appendChild(document.createTextNode(t.innerHTML)), Y(b(t).prop("attributes"), function() {
                                        b(o).attr(this.name, this.value)
                                    }), o.classList = t.classList, e.insertBefore(o, i)
                                } else e.insertBefore(t, i);
                            else if ("SCRIPT" === t.tagName || "STYLE" === t.tagName) {
                                o = document.createElement(t.tagName.toLowerCase());
                                "SCRIPT" === t.tagName ? o.text = t.innerHTML : o.appendChild(document.createTextNode(t.innerHTML)), Y(b(t).prop("attributes"), function() {
                                    b(o).attr(this.name, this.value)
                                }), o.classList = t.classList, e.appendChild(o)
                            } else e.appendChild(t)
                        }
                        return b.extend = function() {
                            var e, t, n, i, o = arguments[0] || {},
                                r = 1,
                                a = arguments.length,
                                s = !1;
                            for ("boolean" == typeof o && (s = o, o = arguments[1] || {}, r = 2), "object" === p(o) || V(o) || (o = {}), a === r && (o = this, --r); r < a; r++)
                                if (null != (e = arguments[r]))
                                    for (t in e)
                                        if (n = o[t], o !== (i = e[t]))
                                            if (s && i && (b.isPlainObject(i) || b.isArray(i))) {
                                                var d = n && (b.isPlainObject(n) || b.isArray(n)) ? n : b.isArray(i) ? [] : {};
                                                o[t] = b.extend(s, d, i)
                                            } else void 0 !== i && (o[t] = i);
                            return o
                        }, b.isArray = Array.isArray, b.isPlainObject = function(e) {
                            if (!e || "[object Object]" !== Object.prototype.toString.call(e) || e.nodeType || e.setInterval) return !1;
                            if (e.constructor && !hasOwnProperty.call(e, "constructor") && !hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
                            var t;
                            for (t in e);
                            return void 0 === t || hasOwnProperty.call(e, t)
                        }, b.parseJSON = function(e) {
                            return "string" == typeof e && e ? /^[\],:{}\s]*$/.test(e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? JSON.parse(e) : void 0 : null
                        }, b.getJSON = function(e, t, n, i) {
                            return V(t) && (i = i || n, n = t, t = null), b.ajax({
                                url: e,
                                data: t,
                                success: n,
                                dataType: i
                            })
                        }, b.get = function(e, t, n, i) {
                            return V(t) && (i = i || n, n = t, t = null), b.ajax({
                                type: "GET",
                                url: e,
                                data: t,
                                success: n,
                                dataType: i
                            })
                        }, b.each = function() {
                            var e, t, n = arguments;
                            t = 1 === n.length && V(n[0]) ? (e = o.call(this), n[0]) : (e = n[0], n[1]);
                            for (var i = 0; i < e.length; i++) t.call(e[i], i, e[i]);
                            return this
                        }, b.ajax = function(e) {
                            if ("script" === e.dataType) {
                                var t = document.createElement("script");
                                return t.src = e.url, document.getElementsByTagName("head")[0].appendChild(t), t.onload = e.success || x, void(t.onerror = e.error || x)
                            }
                            var n = new XMLHttpRequest;
                            n.open(e.method ? e.method : "GET", e.url, !0), e.data || (e.data = null), n.onload = function() {
                                200 <= this.status && this.status < 400 && (e.dataType || (this.response = b.parseJSON(this.response)), e.success && e.success(this.response))
                            }, n.onerror = function() {
                                e.error && e.error(this.response)
                            }, n.send(e.data)
                        }, b.isEmptyObject = function(e) {
                            return e && 0 === Object.keys(e).length
                        }, b.fn = b.prototype = {
                            jquery: "1.4.2",
                            gQVersion: "0.0.1",
                            toArray: function() {
                                return o.call(this, 0)
                            },
                            constructor: b,
                            hasClass: function(t) {
                                return o.call(this).every(function(e) {
                                    return e && 1 === e.nodeType && e.classList.contains(t)
                                })
                            },
                            ready: function(e) {
                                return "loading" !== c.readyState ? setTimeout(e) : c.addEventListener("DOMContentLoaded", e), this
                            },
                            scrollTop: function() {
                                var e = this[0];
                                return F(e) ? e.pageYOffset : H(e) ? e.defaultView.pageYOffset : e.scrollTop
                            },
                            scrollLeft: function() {
                                var e = this[0];
                                return F(e) ? e.pageXOffset : H(e) ? e.defaultView.pageXOffset : e.scrollLeft
                            },
                            getComputedDimensionOuter: function(e, t) {
                                var n = "height" === e.toLowerCase() ? 1 : 0,
                                    i = this[0];
                                if (i) return F(i) ? window["outer" + e] : this[0]["offset" + e] + (t ? P(this[0], "margin" + (n ? "Top" : "Left")) + P(this[0], "margin" + (n ? "Bottom" : "Right")) : 0)
                            },
                            getComputedDimension: function(e) {
                                var t, n, i = this[0],
                                    o = "height" === e.toLowerCase() ? 0 : 1;
                                if (e = e.charAt(0).toUpperCase() + e.slice(1), H(i)) {
                                    var r = i.documentElement;
                                    return Math.max(i.body["scroll" + e], i.body["offset" + e], r["scroll" + e], r["offset" + e], r["client" + e])
                                }
                                if (F(i)) return "height" === e.toLowerCase() ? i.outerHeight : i.outerWidth;
                                try {
                                    return i.getBoundingClientRect()[e.toLowerCase()] - (P(t = i, "border" + ((n = o) ? "Left" : "Top") + "Width") + P(t, "padding" + (n ? "Left" : "Top")) + P(t, "padding" + (n ? "Right" : "Bottom")) + P(t, "border" + (n ? "Right" : "Bottom") + "Width"))
                                } catch (e) {
                                    q("Error is " + e + " and elem is " + i, 529, 25, "getBoundingClientRect")
                                }
                            },
                            height: function() {
                                return this.getComputedDimension("height")
                            },
                            width: function() {
                                return this.getComputedDimension("width")
                            },
                            is: function(n) {
                                if (!n) return !1;
                                var i = !1;
                                return this.each(function(e, t) {
                                    return !(i = "string" == typeof n ? T(t, n) : t === n)
                                }), i
                            },
                            attr: function(n, i) {
                                var e;
                                if (n) {
                                    if (N(n)) return void 0 === i ? null === (e = this[0] ? this[0].getAttribute ? this[0].getAttribute(n) : this[0][n] : void 0) ? void 0 : e : this.each(function(e, t) {
                                        t.setAttribute ? t.setAttribute(n, i) : t[n] = i
                                    });
                                    for (var t in n) this.attr(t, n[t]);
                                    return this
                                }
                            },
                            removeAttr: function(t) {
                                return t = t.match(h) || [], this.each(function(e, n) {
                                    Y(t, function(e, t) {
                                        n.removeAttribute(t)
                                    })
                                })
                            },
                            outerWidth: function(e) {
                                return this.getComputedDimensionOuter("Width", e)
                            },
                            outerHeight: function(e) {
                                return this.getComputedDimensionOuter("Height", e)
                            },
                            offset: function() {
                                var t = this[0];
                                if (!t) return {
                                    top: 0,
                                    left: 0
                                };
                                t.nodeType == Node.TEXT_NODE && (t = t.parentElement);
                                var e = {};
                                try {
                                    e = t.getBoundingClientRect()
                                } catch (e) {
                                    if (q("Error is " + e + " and elem is " + t, 603, 25, "getBoundingClientRect"), t === document) return
                                }
                                var n = t.ownerDocument ? t.ownerDocument.defaultView : window;
                                return {
                                    top: e.top + n.pageYOffset - i.clientTop,
                                    left: e.left + n.pageXOffset - i.clientLeft
                                }
                            },
                            index: function(e) {
                                var t = e ? b(e)[0] : this[0],
                                    n = e ? this : b(t).parent().children();
                                return a.call(n, t)
                            },
                            each: b.each,
                            delegate: function(e, t, n, i) {
                                return this.on(e, t, n, i)
                            },
                            on: function(n, i, o, r) {
                                var a, e, s = this;
                                return V(i) && (o = i, i = null), this[0] === document && "ready" === n ? this.ready(o) : (i && (a = o, o = function(e) {
                                    for (var t = e.target; !T(t, i);) {
                                        if (t === this || !t) return !1;
                                        t = t.parentNode
                                    }
                                    t && a.call(t, e)
                                }), Y(N(e = n) && e.match(y) || [], function(e, t) {
                                    _[t] && (i && _[t].delegateType ? n = _[t].delegateType : _[t].bindType && (n = _[t].bindType)), s.each(function(e, t) {
                                        t.addEventListener(n, o, !!r)
                                    })
                                })), this
                            },
                            off: function(n, i, o) {
                                return this.each(function(e, t) {
                                    t.removeEventListener(n, i, !!o)
                                })
                            },
                            isChecked: function() {
                                return null !== this[0].getAttribute("checked")
                            },
                            isFocussed: function() {
                                return this[0] === c.activeElement
                            },
                            closest: function(e) {
                                return new b(this[0].closest(e))
                            },
                            parent: function() {
                                return new b(this[0] && this[0].parentNode)
                            },
                            val: function(o) {
                                return arguments.length ? this.each(function(e, t) {
                                    var n = t.multiple && t.options;
                                    if (n || /radio|checkbox/i.test(t.type)) {
                                        var i = Array.isArray(o) ? r.call(o, String) : null === o ? [] : [String(o)];
                                        n ? Y(t.options, function(e, t) {
                                            t.selected = 0 <= i.indexOf(t.value)
                                        }) : t.checked = 0 <= i.indexOf(t.value)
                                    } else t.value = null == o ? "" : o
                                }) : this[0] && g(this[0])
                            },
                            prop: function(n, i) {
                                if (n) {
                                    if (N(n)) return void 0 === i ? this[0][n] : this.each(function(e, t) {
                                        t[n] = i
                                    });
                                    for (var e in n) this.prop(e, n[e]);
                                    return this
                                }
                            },
                            data: function(o, r) {
                                var e, t, n, i = this;
                                if (!o) {
                                    if (!this[0]) return;
                                    var a = {};
                                    return Y(this[0].attributes, function(e, t) {
                                        var n = t.name.match(l);
                                        n && (a[n[1]] = i.data(n[1]))
                                    }), a
                                }
                                if (N(o)) return void 0 === r ? (e = this[0], t = o, void 0 === (n = M(e)[t]) && (n = e.dataset ? e.dataset[t] : b(e).attr("data-" + t)), n) : this.each(function(e, t) {
                                    return n = o, i = r, M(t)[n] = i;
                                    var n, i
                                });
                                for (var s in o) this.data(s, o[s]);
                                return this
                            },
                            eq: function(e) {
                                return b(this.get(e))
                            },
                            get: function(e) {
                                return void 0 === e ? o.call(this) : e < 0 ? this[e + this.length] : this[e]
                            },
                            appendTo: function(e) {
                                for (var t = b(e), n = 0; n < t.length; n++) t[n].appendChild(this[0]);
                                return this
                            },
                            find: function(e) {
                                return this[0] || (e = void 0), b(e, this[0])
                            },
                            toggleClass: function(e, i, o) {
                                var r = [],
                                    a = void 0 !== i;
                                return N(e) && (r = e.match(h) || []), this.each(function(e, t) {
                                    if (t && 1 === t.nodeType)
                                        for (var n = 0; n < r.length; n++) a ? (o = i ? "add" : "remove", t.classList[o](r[n])) : t.classList.toggle(r[n])
                                })
                            },
                            addClass: function(e) {
                                return this.toggleClass(e, !0, "add"), this
                            },
                            removeClass: function(e) {
                                return e ? this.toggleClass(e, !1, "remove") : this.attr("class", ""), this
                            },
                            remove: function() {
                                return this.each(function(e, t) {
                                    t.parentNode.removeChild(t)
                                }), this
                            },
                            children: function() {
                                var n = [];
                                return this.each(function(e, t) {
                                    u.apply(n, t.children)
                                }), b(n)
                            },
                            map: function(n) {
                                return b(r.call(this, function(e, t) {
                                    return n.call(e, t, e)
                                }))
                            },
                            clone: function() {
                                return this.map(function(e, t) {
                                    return t.cloneNode(!0)
                                })
                            },
                            filter: function(n) {
                                var i = n;
                                return N(i) && (i = function(e, t) {
                                    return T(t, n)
                                }), b(t.call(this, function(e, t) {
                                    return i.call(e, t, e)
                                }))
                            },
                            parents: function(t) {
                                var i = [];
                                return this.each(function(e, t) {
                                    for (var n = t.parentNode; n && 9 !== n.nodeType;) i.push(n), n = n.parentNode
                                }), i = i.filter(function(e, t) {
                                    return i.indexOf(e) === t
                                }), t && (i = i.filter(function(e) {
                                    return T(e, t)
                                })), b(i)
                            },
                            append: function() {
                                var n = this;
                                return Y(arguments, function(e, t) {
                                    X(n, b(t))
                                }), this
                            },
                            prepend: function() {
                                var n = this;
                                return Y(arguments, function(e, t) {
                                    X(n, b(t), !0)
                                }), this
                            },
                            html: function(n) {
                                return void 0 === n ? this[0] && this[0].innerHTML : this.each(function(e, t) {
                                    t.innerHTML = n
                                })
                            },
                            css: function(n, i) {
                                if (N(n)) {
                                    var o = S(n);
                                    return (n = function(n, e) {
                                        if (void 0 === e && (e = S(n)), e) return n;
                                        if (!A[n]) {
                                            var t = R(n),
                                                i = "" + t.charAt(0).toUpperCase() + t.slice(1);
                                            Y((t + " " + I.join(i + " ") + i).split(" "), function(e, t) {
                                                if (t in D) return A[n] = t, !1
                                            })
                                        }
                                        return A[n]
                                    }(n, o), arguments.length < 2) ? this[0] && L(this[0], n, o) : n ? (e = n, t = i, void 0 === (r = o) && (r = S(e)), i = r || m[e] || !j(t) ? t : t + "px", this.each(function(e, t) {
                                        k(t) && (o ? t.style.setProperty(n, i) : t.style[n] = i)
                                    })) : this
                                }
                                var e, t, r;
                                for (var a in n) this.css(a, n[a]);
                                return this
                            },
                            hashchange: function(e) {
                                window.addEventListener("hashchange", e)
                            },
                            replaceWith: function(o) {
                                return this.each(function(e, t) {
                                    var n = t.nextSibling,
                                        i = t.parentNode;
                                    b(t).remove(), n ? b(n).before(o) : b(i).append(o)
                                })
                            },
                            before: function() {
                                var n = this;
                                return Y(arguments, function(e, t) {
                                    b(t).insertBefore(n)
                                }), this
                            },
                            after: function() {
                                var n = this;
                                return Y(s.apply(arguments), function(e, t) {
                                    s.apply(b(t).slice()).insertAfter(n)
                                }), this
                            },
                            insertBefore: function(e) {
                                var t = this;
                                return b(e).each(function(n, i) {
                                    var o = i.parentNode;
                                    o && t.each(function(e, t) {
                                        U(o, n ? t.cloneNode(!0) : t, !0, i)
                                    })
                                }), this
                            },
                            insertAfter: function(e) {
                                var t = this;
                                return b(e).each(function(n, i) {
                                    var o = i.parentNode;
                                    o && t.each(function(e, t) {
                                        U(o, n ? t.cloneNode(!0) : t, !0, i.nextSibling)
                                    })
                                }), this
                            },
                            trigger: function(e, t) {
                                var n, i;
                                if (N(e)) {
                                    var o = [(i = e.split("."))[0], i.slice(1).sort()],
                                        r = o[0],
                                        a = o[1],
                                        s = w.test(r) ? "MouseEvents" : "HTMLEvents";
                                    (n = c.createEvent(s)).initEvent(r, !0, !0), n.namespace = a.join(".")
                                } else n = e;
                                n.data = t;
                                var d = n.type in v;
                                return this.each(function(e, t) {
                                    d && V(t[n.type]) ? t[n.type]() : t.dispatchEvent(n)
                                })
                            },
                            contents: function() {
                                return this[0] ? b(this[0].childNodes) : b("")
                            },
                            not: function(n) {
                                return b(this).filter(function(e, t) {
                                    return !T(t, n)
                                })
                            }
                        }, b.fn.bind = b.fn.live = b.fn.on, b.fn.unbind = b.fn.die = b.fn.off, b.inArray = function(e, t) {
                            return a.call(t, e)
                        }, b.trim = function(e) {
                            return (e || "").replace(f, "")
                        }, b.getScript = function(e, t) {
                            return b.get(e, void 0, t, "script")
                        }, b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(e, t) {
                            b.fn[t] = function(e) {
                                return "submit" === t ? this[0].submit() : e ? this.bind(t, e) : this.trigger(t)
                            }, b.attrFn && (b.attrFn[t] = !0)
                        }), b.guid = 1, b.proxy = function(e, t, n) {
                            return 2 === arguments.length && ("string" == typeof t ? (e = (n = e)[t], t = void 0) : t && !V(t) && (n = t, t = void 0)), !t && e && (t = function() {
                                return e.apply(n || this, arguments)
                            }), e && (t.guid = e.guid = e.guid || t.guid || b.guid++), t
                        }, (b.fn.init = function(e, t) {
                            var n, i = !1;
                            if (N(e) && /<.+>/.test(e)) {
                                i = !0;
                                try {
                                    n = e, (W = W || c.implementation.createHTMLDocument(null)).body.innerHTML = n, e = W.body.childNodes
                                } catch (e) {
                                    throw e
                                }
                            }
                            if (!e) return this;
                            if (e && e.nodeType || F(e)) return this[0] = e, this.length = 1, this;
                            if (N(e)) {
                                t = t || c;
                                var o = this.constructor(),
                                    r = /^#[\w-]*$/.test(e) ? t.getElementById(e.slice(1)) : t.querySelectorAll(e);
                                return r && r.nodeType && (r = [r]), u.apply(o, i ? e : r), o
                            }
                            if (V(e)) return b.fn.ready(e);
                            for (var a = 0; a < e.length; a++) this.length = e.length, this[a] = e[a]
                        }).prototype = b.fn, b.fn.splice = n, "function" == typeof Symbol && (b.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]), b.prototype.slice = function() {
                            return b(o.apply(this, arguments))
                        }, b.prototype.length = 0, b.nodeName = function(e, t) {
                            return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
                        }, b
                    }(),
                    c = d,
                    l = 250,
                    u = 7,
                    h, f, m, g;
                f = h = h || {}, f.DEAD = "11", f.RAGE = "12", f.ERROR = "13";
                var N = {
                        init: function(e) {
                            g = m = !1;
                            var t = this.getMcData(e);
                            return this.originalData = e, 0 < t.length && this.classifyClick(t), {
                                latestRecording: this.originalData,
                                deadClickInThisBatch: m,
                                rageClickInThisBatch: g
                            }
                        },
                        desanitizeActionData: function(e) {
                            return e ? e.replace(/!-u-!/g, "_").replace(/!-c-!/g, ",") : ""
                        },
                        getTargetFromPath: function(e) {
                            var t = e.split("+"),
                                n = t[t.length - 1];
                            return 0 < n.indexOf(">") ? (n = (t = e.split(">"))[t.length - 1], this.getTargetFromPath(n)) : 0 < n.indexOf("+") && this.getTargetFromPath(n), n.trim()
                        },
                        isDeadClickElement: function(t) {
                            var e;
                            try {
                                e = document.querySelector(this.desanitizeActionData(t))
                            } catch (e) {
                                window.VWO._.customError && window.VWO._.customError({
                                    msg: "Query selector failed for selector path " + this.desanitizeActionData(t),
                                    url: "clickTracker.js",
                                    lineno: 92,
                                    colno: 9
                                })
                            }
                            if (!e || !e.nodeName || !e.nodeName.toUpperCase) return !1;
                            if (e._vwo_nd) return !1;
                            switch (e.nodeName.toUpperCase()) {
                                case "LABEL":
                                    if (e.hasAttribute("for")) {
                                        var n = e.getAttribute("for");
                                        if (document.getElementById(n)) return !1
                                    } else if (0 < c(e).find("input,select,textarea,option").length) return !1
                            }
                            return !0
                        },
                        canBeRageClick: function(e, t) {
                            return parseInt(t.time, 10) - parseInt(e.time, 10) < l && e.selectorPath === t.selectorPath
                        },
                        getRageClicks: function(i) {
                            if (i.length < 7) return [];
                            var e = 0,
                                t = 0,
                                o = [];

                            function n(e, t) {
                                if (u - 1 <= t - e)
                                    for (var n = e; n <= t; n++) o.push(i[n].index)
                            }
                            for (var r = 1; r < i.length; r++) this.canBeRageClick(i[r - 1], i[r]) ? t++ : (n(e, t), t = e = r);
                            return e !== t && n(e, t), o
                        },
                        classifyClick: function(e) {
                            for (var t = [], n = 0; n < e.length; n++) this.isDeadClickElement(e[n].selectorPath) && t.push(e[n].index);
                            this.addToOriginalData(t, this.getRageClicks(e))
                        },
                        addToOriginalData: function(e, t) {
                            for (var n = {}, i = 0; i < e.length; i++) m = !0, n[e[i]] = h.DEAD;
                            for (i = 0; i < t.length; i++) g = !0, n[t[i]] ? n[t[i]] += ":" + h.RAGE : n[t[i]] = h.RAGE;
                            for (var o in n) n.hasOwnProperty(o) && (this.originalData[o] += "_{" + n[o] + "}")
                        },
                        getMcData: function(e) {
                            for (var t = [], n = 0; n < e.length; n++) {
                                var i = e[n].split("_");
                                if ("mc" === i[0]) {
                                    var o = i[1],
                                        r = i[2];
                                    t.push({
                                        action: i[0],
                                        time: o,
                                        selectorPath: r,
                                        index: n
                                    })
                                }
                            }
                            return t
                        }
                    },
                    p = function() {
                        if (VWO._.eventsManager) return VWO._.eventsManager;
                        var c = [],
                            a = !0,
                            l = [],
                            u = [],
                            h = {
                                bind: "unbind",
                                live: "die",
                                on: "off"
                            },
                            f = [];
                        var t = /iPhone|iPad/.test(navigator.userAgent);

                        function s(e) {
                            return !VWO.DONT_IOS && !("touchmove" !== e && "touchstart" !== e && "touchend" !== e || !t)
                        }

                        function r(e, t) {
                            a && f.push({
                                type: e,
                                state: t,
                                ref: e[t]
                            })
                        }

                        function m() {
                            for (var e = f.length - 1; 0 <= e; e--) {
                                var t = f[e];
                                t.type[t.state] = t.ref
                            }
                        }
                        return p = {
                            addEventListener: function(e, t, n, i) {
                                if (!s(t)) {
                                    a && c.push({
                                        $el: e,
                                        name: t,
                                        callback: n,
                                        capture: i
                                    });
                                    try {
                                        e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n, i)
                                    } catch (e) {}
                                    return p
                                }
                            },
                            addMutationObserver: function(e, t, n, i) {
                                var o;
                                if (void 0 !== window.MutationObserver ? o = window.MutationObserver : void 0 !== window.WebKitMutationObserver && (o = window.WebKitMutationObserver), o) try {
                                    var r = new MutationObserver(e.bind(i));
                                    u.push(r), r.observe(t, n)
                                } catch (e) {}
                            },
                            clearAllListeners: function() {
                                for (var e = 0; e < c.length; e++) {
                                    var t = c[e],
                                        n = t.$el;
                                    t.jqType ? (i = n, o = t.jqType, r = t.eventName, a = t.callback, s = t.selector, d = t.capture, o && (s ? i[h[o]](r, s, a, d) : i[h[o]](r, a, d))) : n.removeEventListener ? n.removeEventListener(t.name, t.callback, t.capture) : n.detachEvent && n.detachEvent("on" + t.name, t.callback)
                                }
                                var i, o, r, a, s, d;
                                return u.forEach(function(e) {
                                        e.disconnect()
                                    }),
                                    function() {
                                        for (var e = 0; e < l.length; e++) {
                                            var t = l[e];
                                            ("interval" === t.type ? clearInterval : clearTimeout)(t.name)
                                        }
                                    }(), m(), c.length = 0, f.length = 0, u.length = 0, l.length = 0, p
                            },
                            addJqEventListener: function(e, t, n, i, o, r) {
                                return s(n) || (a && c.push({
                                    $el: e,
                                    jqType: t,
                                    eventName: n,
                                    callback: i,
                                    selector: o,
                                    capture: r
                                }), o ? e[t](n, o, i, r) : e[t](n, i, r)), p
                            },
                            pushTimers: function(e, t) {
                                if (a) return l.push({
                                    name: e,
                                    type: t
                                }), p
                            },
                            addOverrideState: r,
                            overrideHistoryPush: function(n, i, e) {
                                if (a) {
                                    var o = n[e];
                                    r(n, e), n[e] = function(e) {
                                        var t = o.apply(n, [].slice.call(arguments));
                                        try {
                                            i({
                                                state: e
                                            })
                                        } catch (e) {}
                                        return t
                                    }
                                }
                            },
                            revertOverriddenStates: m,
                            init: function(e) {
                                a = e.shouldPushToQueue
                            }
                        }, VWO.destroy = p.clearAllListeners, VWO._.eventsManager = p
                    }();

                function v(e, t) {
                    if (e) {
                        var n, i = "." + e,
                            o = window.vwo_$;
                        if (!(t = t || {})[e]) {
                            try {
                                n = o(i)
                            } catch (e) {
                                n = ""
                            }
                            if (1 === n.length) return 1;
                            t[e] = !0
                        }
                    }
                }

                function w(e) {
                    if (e) {
                        var t, n = window.vwo_$;
                        try {
                            t = n("#" + e)
                        } catch (e) {
                            t = ""
                        }
                        return t.length
                    }
                }

                function y(e) {
                    if (!e) return null;
                    if (e.previousElementSibling) return e.previousElementSibling;
                    for (; e = e.previousSibling;)
                        if (1 === e.nodeType) return e
                }

                function b(e, t) {
                    if (!e) return null;
                    if (e === document) return "#document";
                    t = t || {};
                    var n, i, o, r, a, s = e,
                        d = [],
                        c = e.tagName,
                        l = window.vwo_$;
                    if ("string" == typeof c && ("body" === c.toLowerCase() || "head" === c.toLowerCase())) return c;
                    for (; e;)
                        if (VWO._.ac && VWO._.ac.hFCVJ && e.__vue__ && e.__isFragment) e = y(e);
                        else {
                            n = (c = "undefined" != typeof ShadowRoot && e instanceof ShadowRoot ? "shadow-root" : e.tagName) && c.match(/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/), c && n && (n && n[0]) === c || (c = "*");
                            try {
                                i = l(e).attr("id")
                            } catch (s) {
                                i = e.id
                            }
                            i && "string" == typeof i && w(i) && (c = c + "#" + i), o = (o = e.getAttribute && e.getAttribute("class")) ? o.split(/\s+/) : [];
                            for (var u = 0; u < o.length; u++)
                                if (a = "." + (r = o[u]), v(r, t)) {
                                    c += a;
                                    break
                                }
                            d.unshift(c), e = y(e)
                        }
                    return !d.length || -1 !== d[0].indexOf("#") || s.parentNode && "HEAD" === s.parentNode.nodeName || s.host || (d[0] += ":first-child"), b("undefined" != typeof ShadowRoot && s instanceof ShadowRoot && s.host ? s.host : s.parentNode, t) + (d.length ? " > " + d.join(" + ") : "")
                }
                var E = {
                        JSON: {
                            stringify: function(i) {
                                function e(e) {
                                    return "string" == typeof e
                                }

                                function n(e) {
                                    return null === e && "object" == typeof e
                                }

                                function o(e) {
                                    return "number" == typeof e && isNaN(e)
                                }

                                function r(e) {
                                    return "number" == typeof e && !isFinite(e)
                                }

                                function a(e) {
                                    return "symbol" == typeof e
                                }

                                function s(e) {
                                    return void 0 === (t = e) && void 0 === t || "function" == typeof e || a(e);
                                    var t
                                }

                                function t(e) {
                                    var t = e.split("");
                                    return t.pop(), t.join("")
                                }
                                var d = this;
                                if (!s(i)) {
                                    if ("object" == typeof(c = i) && null !== c && "function" == typeof c.getMonth) return '"' + i.toISOString() + '"';
                                    var c, l;
                                    if (o(l = i) || r(l) || n(l)) return "null";
                                    if (!a(i)) {
                                        if ("number" == typeof(f = i) || e(f) || "boolean" == typeof f) {
                                            var u = void 0,
                                                h = void 0;
                                            return e(i) ? (h = '"', u = (u = (u = (u = (u = i.toString()).replace(/\\/g, "\\\\")).replace(/\n/g, "\\n")).replace(/\t/g, "\\t")).replace(/\"/g, '\\"')) : h = "", u ? "" + h + u + h : "" + h + i + h
                                        }
                                        var f, m, g;
                                        if (m = i, Array.isArray(m) && "object" == typeof m) {
                                            var p = "";
                                            return i.forEach(function(e) {
                                                var t;
                                                p += o(t = e) || r(t) || n(t) || s(t) ? d.stringify(null) : d.stringify(e), p += ","
                                            }), "[" + t(p) + "]"
                                        }
                                        if ("object" == typeof(g = i) && null !== g && !Array.isArray(g)) {
                                            var v = "";
                                            return Object.keys(i).forEach(function(e) {
                                                var t = i[e],
                                                    n = s(t);
                                                v += n ? "" : d.stringify(e) + ":" + d.stringify(t) + ","
                                            }), "{" + t(v) + "}"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    S = function() {
                        function e(e, t) {
                            try {
                                Object.defineProperty(e, t, {
                                    writable: !1
                                })
                            } catch (e) {}
                        }

                        function n() {
                            if (!window.DISABLE_NATIVE_CONSTANTS) {
                                if (!document.body) return window.DISABLE_NATIVE_CONSTANTS = !0, 0;
                                i = window.document.createElement("iframe"), e(i, "src"), i.setAttribute = function(e, t) {}, i.style.display = "none", i.onload = function() {
                                    (o = i.contentWindow).onerror = function(e, t, n, i) {
                                        window.VWO && window.VWO._ && window.VWO._.customError && window.VWO._.customError({
                                            msg: e,
                                            url: t,
                                            lineno: n,
                                            colno: i,
                                            source: "nativeConstants"
                                        })
                                    }
                                }, document.body.appendChild(i), (o = i.contentWindow) && e(o.location, "href")
                            }
                        }
                        var i, o;
                        return void 0 === window.DISABLE_NATIVE_CONSTANTS ? window.DISABLE_NATIVE_CONSTANTS = !0 : !1 === window.DISABLE_NATIVE_CONSTANTS && n(), {
                            get: function(e) {
                                i && i.contentWindow || n();
                                var t = o;
                                return t && !window.DISABLE_NATIVE_CONSTANTS || (t = window), window.VWO.featureInfo && window.VWO.featureInfo.vwoNative && E[e] ? ("JSON" === e && (E[e].parse = t[e].parse), E[e]) : t[e]
                            }
                        }
                    };
                window.VWO = window.VWO || [], window.VWO._ = window.VWO._ || {}, window.VWO._.nativeConstants = window.VWO._.nativeConstants || S();
                var M = window.VWO._.nativeConstants,
                    O = {
                        create: function(e, t, n, i) {
                            var o = "";
                            if (n) {
                                var r = new(M.get("Date"));
                                r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + r.toGMTString()
                            } else !1 === n && (o = "; expires=Thu, 01 Jan 1970 00:00:01 GMT");
                            i = i ? "; domain=" + i : "", document.cookie = e + "=" + t + o + "; path=/" + i
                        },
                        get: function(e) {
                            for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
                                for (var o = n[i];
                                    " " === o.charAt(0);) o = o.substring(1, o.length);
                                if (0 === o.indexOf(t)) return o.substring(t.length, o.length)
                            }
                            return null
                        },
                        erase: function(e, t) {
                            this.create(e, "", !1, t)
                        }
                    },
                    C = VWO._ && VWO._.ac && VWO._.ac.eNC;
                void 0 === window.DISABLE_NATIVE_CONSTANTS && (window.DISABLE_NATIVE_CONSTANTS = !C);
                var R = M,
                    k = {
                        create: function(e, t, n, i) {
                            var o = ";";
                            n && (o = "; expires=" + new Date((new Date).getTime() + 864e5 * n).toGMTString()), window.document.cookie = e + "=" + encodeURIComponent(t) + "; path=/;domain=" + i + o
                        },
                        erase: function(e, t) {
                            window.document.cookie = e + "=; path=/;domain=" + t + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                        },
                        get: function(e) {
                            var t = document.cookie.split(e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=");
                            return 2 === t.length ? decodeURIComponent(t[1].split(";")[0]) : null
                        }
                    },
                    A = R.get("console");

                function D(e) {
                    Object.defineProperty(this, "refType", {
                        value: e,
                        writable: !1,
                        enumerable: !1,
                        configurable: !0
                    })
                }

                function I(e) {
                    D.call(this, "recorder"), Object.defineProperty(this, "ref", {
                        value: e,
                        writable: !1,
                        enumerable: !1,
                        configurable: !0
                    })
                }

                function P(e) {
                    D.call(this, "player"), Object.defineProperty(this, "ref", {
                        value: e,
                        writable: !1,
                        enumerable: !1,
                        configurable: !0
                    })
                }
                D.prototype.help = function() {
                    switch (A.group("Helper API"), A.info("%c getHtml()", "color: green", " : Fetches HTML metadata\n"), A.info("%c getMutations()", "color: green", " : Fetches Mutation metadata\n"), A.info("%c getSnapshottedUrls()", "color: green", " : Fetches the stylesheets which are snapshotted\n"), this.refType) {
                        case "recorder":
                            A.info("%c isAnalyzeSampled()", "color: green", " : Check if the DS cookie is valid for analyze calls\n"), A.info("%c forceSampleAnalyze()", "color: green", " : Validate DS Cookie to enable analyze calls\n");
                            break;
                        case "player":
                            A.info("%c isLongRecording()", "color: green", " :  Check if the recording is long or faulty based on the duration and the last action recorded\n")
                    }
                    A.groupEnd()
                }, I.prototype = Object.create(D.prototype), I.prototype.constructor = D, I.prototype.isAnalyzeCampaign = function(e) {
                    return e && ("ANALYZE_RECORDING" === e.type && e.main || "ANALYZE_HEATMAP" === e.type && e.main || "ANALYZE_FORM" === e.type)
                }, I.prototype.isAnalyzeSampled = function() {
                    var e = k.get("_vwo_ds");
                    if (!e) return A.info("No DS Cookie present"), !1;
                    var t = decodeURIComponent(e).split(":"),
                        n = t[t.length - 2],
                        i = window._vwo_exp,
                        o = !1;
                    for (var r in i) {
                        var a = n.split(",");
                        if (this.isAnalyzeCampaign(i[r]))
                            for (var s = 0; s < a.length; s++) {
                                var d = a[s].split("_");
                                d[0] && Number(d[0]) === Number(r) && 1 === Number(d[1]) && (o = !0)
                            }
                    }
                    return -1 < t[1].indexOf("1") && o
                }, I.prototype.forceSampleAnalyze = function() {
                    var e, t, n, i = k.get("_vwo_ds");
                    if (i && !this.isAnalyzeSampled()) {
                        var o = decodeURIComponent(i).split(":");
                        o[1] = "t_1,a_1", o[o.length - 1] = 0 < Number(o[o.length - 1]) ? o[o.length - 1] : "1";
                        var r = o[o.length - 2],
                            a = window._vwo_exp;
                        for (var s in a)
                            if (this.isAnalyzeCampaign(a[s])) {
                                for (var d = r.split(","), c = 0; c < d.length; c++) {
                                    var l = d[c].split("_");
                                    l[0] && Number(l[0]) === Number(s) && (l[1] = "1"), d[c] = l.join("_")
                                }
                                r = d.join(",");
                                break
                            }
                        o[o.length - 2] = r;
                        var u = o.join(":"),
                            h = (null === (e = window.VWO) || void 0 === e ? void 0 : e.TRACK_GLOBAL_COOKIE_EXPIRY_CUSTOM) || (null === (n = null === (t = window.VWO) || void 0 === t ? void 0 : t.data) || void 0 === n ? void 0 : n.rp) || 90,
                            f = Math.min(h, 90),
                            m = document.domain || window.location.host;
                        m = this.stripURL(m), k.create("_vwo_ds", u, f, m), A.info("DS cookie validated. Kindly reload the page to see it in action")
                    }
                }, I.prototype.getSnapshottedUrls = function() {
                    return this.ref.linkHrefForSnapshotting.map(function(e) {
                        return decodeURIComponent(e)
                    })
                }, I.prototype.getHtml = function() {
                    return this.ref.GetHtml.html
                }, I.prototype.getMutations = function() {
                    return this.ref.Mutations.mutations
                }, I.prototype.stripURL = function(e) {
                    var t = window.vwo_$ || window.$,
                        n = e.split("."),
                        i = n.length,
                        o = n[i - 2];
                    return o && -1 !== t.inArray(o, ["co", "org", "com", "net", "edu", "au", "ac"]) ? n[i - 3] + "." + o + "." + n[i - 1] : o + "." + n[i - 1]
                }, P.prototype = Object.create(D.prototype), P.prototype.constructor = D, P.prototype.isLongRecording = function() {
                    var e = this.ref.recordingArray,
                        t = Number(e[e.length - 1].split("_")[1]);
                    return !isNaN(t) && this.duration - t <= this.ref.longRecordingBuffer
                }, P.prototype.getHtml = function() {
                    return this.ref.createHTML.html
                }, P.prototype.getMutations = function() {
                    return this.ref.mutationsArray
                }, P.prototype.getSnapshottedUrls = function() {
                    return this.ref.createHTML.snapshotAssets
                };
                var L = window.visualViewport,
                    x = d,
                    H = window.VWO || [];
                H._vba = H._vba || {};
                var W = 120,
                    V = [],
                    z = function(e) {
                        var t = e.sort(function(e, t) {
                            return e - t
                        }).filter(function(e) {
                            return e
                        });
                        return {
                            min: t[0] || 0,
                            max: t[t.length - 1] || 0
                        }
                    },
                    F = {
                        cDT: 500,
                        sRD: null,
                        visualViewportAvailable: window.visualViewport,
                        jq: x,
                        version: "4.0.179",
                        ids: {
                            account: window._vwo_acc_id,
                            experiment: {},
                            re: {},
                            he: {},
                            fe: {},
                            recording: 0,
                            html: 0,
                            session: 0
                        },
                        tags: {
                            eTags: new s("Hash"),
                            eTagsV2: {
                                f: new s("Array"),
                                r: new s("Array"),
                                h: new s("Array")
                            },
                            uTags: new s("Array")
                        },
                        heartBeatFrequency: H._vba.heartBeat || 4e3,
                        startTime: 0,
                        returnVisitor: !1,
                        newSession: !1,
                        loadChance: 100,
                        saveNewRecordingInitiatedOnce: !1,
                        lastTime: 0,
                        enums: {
                            formAnalysis: {
                                TEMPORARY_STATE: "temporary",
                                PERMANENT_STATE: "permanent"
                            }
                        },
                        config: {
                            stopRecordingTime: 18e5,
                            deleteSessionRecordingTime: 0
                        },
                        recordingData: {
                            totals: {
                                movements: 0,
                                clicks: 0,
                                keyPresses: 0,
                                scroll: 0,
                                touches: 0,
                                ocs: 0
                            },
                            last: {
                                movements: 0,
                                clicks: 0,
                                keyPresses: 0,
                                scroll: 0,
                                touches: 0,
                                ocs: 0
                            },
                            mouse: {
                                lastMove: {
                                    docX: 0,
                                    docY: 0
                                }
                            }
                        },
                        htmlRequestSuccess: !1,
                        linkHrefForSnapshotting: [],
                        triggerSessionIdleTimeout: function() {
                            F.sessionIdleTimeout || (F.sessionIdleTimeout = setTimeout(function() {
                                F.stopRecording = F.enums.formAnalysis.TEMPORARY_STATE, F.triggerSessionDeleteTimeout()
                            }, F.config.stopRecordingTime))
                        },
                        triggerSessionDeleteTimeout: function() {
                            F.sessionIdleTimeout = setTimeout(function() {
                                F.stopRecording = F.enums.formAnalysis.PERMANENT_STATE, O.erase("nlssid" + F.ids.account, F.getCookieDomain()), O.erase("nlsrid" + F.ids.account, F.getCookieDomain())
                            }, F.config.deleteSessionRecordingTime)
                        },
                        clearSessionIdleTimeout: function() {
                            F.sessionIdleTimeout && (clearTimeout(F.sessionIdleTimeout), F.sessionIdleTimeout = 0)
                        },
                        resetAfterDataSent: function() {
                            F.recordingData.last.scroll = F.recordingData.totals.scroll, F.recordingData.last.movements = F.recordingData.totals.movements, F.recordingData.last.clicks = F.recordingData.totals.clicks, F.recordingData.last.keyPresses = F.recordingData.totals.keyPresses, F.recordingData.last.touches = F.recordingData.totals.touches, F.recordingData.last.ocs = F.recordingData.totals.ocs, F.ftu = !1, F.resetTagAfterSent()
                        },
                        resetTagOnUC: function() {
                            F.tags.eTagsV2.h.reset(), F.tags.eTagsV2.f.reset(), F.tags.eTagsV2.r.reset()
                        },
                        resetTagAfterSent: function() {
                            F.tags.eTagsV2.f.refresh(), F.tags.eTagsV2.r.refresh(), F.tags.eTagsV2.h.refresh()
                        },
                        checkIfIdle: function() {
                            return F.recordingData.last.scroll === F.recordingData.totals.scroll && F.recordingData.last.movements === F.recordingData.totals.movements && F.recordingData.last.clicks === F.recordingData.totals.clicks && F.recordingData.last.keyPresses === F.recordingData.totals.keyPresses && F.recordingData.last.touches === F.recordingData.totals.touches && F.recordingData.last.ocs === F.recordingData.totals.ocs && !F.ftu
                        },
                        resetClicksCount: function() {
                            this.recordingData.totals.clicks = 0, this.recordingData.last.clicks = 0
                        },
                        calcDuration: function(e, t) {
                            e = e || {};
                            var n, i, o, r, a, s, d, c = T(),
                                l = M.get("Math");
                            e.recording && (o = +(n = e.recording.split(","))[0].split("_")[1], r = +n[n.length - 1].split("_")[1]), e.mutations && (i = M.get("JSON").parse(e.mutations)) instanceof M.get("Array") && (a = +i[0].time, s = +i[i.length - 1].time);
                            var u = z([r, s, o, a]);
                            return d = t || !u.max ? 0 : l.abs(u.max - this.lastTime), d /= 1e3, this.lastTime = t ? c - F.startTime : d ? u.max : this.lastTime, {
                                currentTime: c,
                                duration: d
                            }
                        },
                        isMobile: function() {
                            return /iphone|ipad|ipod|android|webos|opera mini|blackberry|iemobile|windows phone/i.test(navigator.userAgent)
                        },
                        getViewportDimensions: function() {
                            var e = {
                                width: 0,
                                height: 0
                            };
                            return e.width = this.isMobile() ? window.innerWidth : document.documentElement.clientWidth, e.height = this.isMobile() ? window.innerHeight : document.documentElement.clientHeight, e.height = parseInt(e.height, 10), e.height = e.height || 0, F.isMobile() ? this.getDimensionsConsideringOrientation(e.width, e.height) : {
                                width: e.width,
                                height: e.height
                            }
                        },
                        getAvailableDimensions: function() {
                            var e = window.screen.availWidth || window.outerWidth,
                                t = window.screen.availHeight || window.outerHeight,
                                n = this.getDimensionsConsideringOrientation(e, t);
                            return {
                                height: n.height,
                                width: n.width
                            }
                        },
                        getDimensionsConsideringOrientation: function(e, t) {
                            var n, i, o = M.get("Math");
                            return this.isLandscapeMode() ? (n = o.max(e, t), i = o.min(e, t)) : (i = o.max(e, t), n = o.min(e, t)), {
                                width: n,
                                height: i
                            }
                        },
                        isLandscapeMode: function() {
                            return F.visualViewportAvailable && window.screen && window.screen.orientation ? 0 <= window.screen.orientation.type.indexOf("landscape") : window.innerWidth > window.innerHeight
                        },
                        getScreenDimensions: function() {
                            var e = window.screen.width,
                                t = window.screen.height,
                                n = this.getDimensionsConsideringOrientation(e, t);
                            return {
                                width: n.width,
                                height: n.height
                            }
                        },
                        getScreenScale: function() {
                            var e = F.getAvailableDimensions(),
                                t = F.getScreenDimensions();
                            return {
                                x: e.width / t.width,
                                y: e.height / t.height
                            }
                        },
                        getScale: function() {
                            var e, t, n = window._vwo_acc_id;
                            if ((55e4 < n || -1 < [6, 515160].indexOf(n)) && L && this.isMobile()) return {
                                x: L.scale,
                                y: L.scale
                            };
                            if (this.isMobile() && document.documentElement.clientHeight == window.innerHeight && document.documentElement.clientWidth == window.innerWidth) e = window.innerHeight, t = window.innerWidth;
                            else {
                                var i = F.getScreenDimensions();
                                e = i.height, t = i.width
                            }
                            return {
                                x: t / window.innerWidth,
                                y: e / window.innerHeight
                            }
                        },
                        getScrollPercentage: function() {
                            var e = x(window).scrollTop(),
                                t = x(document).height(),
                                n = x(window).height(),
                                i = M.get("Math").ceil(100 - (t - (n + e)) / t * 100);
                            return isNaN(i) ? 0 : 100 < i ? 100 : i
                        },
                        getPageTitle: function() {
                            var e = document.getElementsByTagName("title")[0];
                            return e ? e.innerHTML : document.title
                        },
                        getCookieDomain: function() {
                            for (var e = M.get("Date"), t = 0, n = document.domain || window.location.host, i = n.split("."), o = "nlsgd" + (new e).getTime(); t < i.length - 1 && -1 === document.cookie.indexOf(o + "=" + o);) n = i.slice(-1 - ++t).join("."), document.cookie = o + "=" + o + ";domain=" + n + ";";
                            return document.cookie = o + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + n + ";", n
                        },
                        triggerLibEvent: function(e, t) {
                            t instanceof M.get("Array") || (t = [t]), window._vwo_evq.push([e].concat(t))
                        },
                        isEligibleToSendRecordingData: function() {
                            if (F.stopRecording === F.enums.formAnalysis.PERMANENT_STATE) return !1;
                            var e = T(),
                                t = 1e3 * F.ids.session;
                            return !(60 * W * 1e3 < e - t) || (F.stopRecording = F.enums.formAnalysis.PERMANENT_STATE, !1)
                        },
                        extractLinkHrefForSnapshotting: function(e) {
                            if (H._.ast) {
                                var t = e.href && encodeURIComponent(e.href);
                                "LINK" === e.tagName && t && "stylesheet" === e.rel && F.linkHrefForSnapshotting.indexOf(t) < 0 && (F.linkHrefForSnapshotting.push(t), H._.customEvent("meta", {
                                    aSTHref: t
                                }), V.push(t))
                            }
                        },
                        resetHrefCollection: function() {
                            V.length = 0
                        },
                        getCurrentHrefs: function() {
                            return V
                        }
                    };
                F.__proto__ = new I(F), F.__proto__.constructor = Object;
                var j = d,
                    Y = window.VWO._.cookies,
                    X = {
                        getNodeProperty: function(e, t, n, i) {
                            return t = t || "", this.shouldConsiderAnonymizingImgAttributes(i, t, e, n) ? this.getAnonymizedImageAttrValue({
                                name: i,
                                value: t
                            }, e) : this.needsMasking(e, n) ? this.getMaskedValue(t) : t
                        },
                        getMaskedValue: function(e, t) {
                            return e ? "!!-nlsCN-!!" === e || "!!-nlsTN-!!" === e || "string" != typeof e ? e : "password" === t ? "*" : "number" === t ? e.replace(/./gi, "0") : "date" === t ? "1970-01-01" : e.replace(/\S/g, "*") : ""
                        },
                        isElementBlacklisted: function(e, t) {
                            return !!j(e).is(F.Recording.bl) || (!(!e.classList || !e.classList.contains("nls_protected")) || !(!e.tagName || "textarea" !== e.tagName.toLowerCase() && "option" !== e.tagName.toLowerCase() || !t))
                        },
                        ntDdClk: function(e) {
                            if (VWO.data.frn && VWO.data.frn.dc && VWO.data.frn.dc.bl) {
                                if (j(e).is(VWO.data.frn.dc.bl)) return !0
                            } else if (e.classList && e.classList.contains("_vwo_no_dead")) return !0;
                            return !1
                        },
                        isElementWhitelisted: function(e) {
                            return !!j(e).is(F.Recording.wl) || !(!e.classList || !e.classList.contains("nls_whitelist"))
                        },
                        needsMasking: function(e, t) {
                            return !this.isElementWhitelisted(e) && (!!this.isElementBlacklisted(e, t) || e.parentNode && this.needsMasking(e.parentNode, t))
                        },
                        shouldAnonymizeValue: function(e, t) {
                            var n = j(e),
                                i = n.val();
                            if (!this.isElementWhitelisted(e) && t && "submit" !== n.prop("type") && "reset" !== n.prop("type") || this.isElementBlacklisted(e, t) || !this.isElementWhitelisted(e) && i.match(/\d{3,}/) || "password" === n.prop("type") || "hidden" === n.prop("type")) return !0
                        },
                        sanitizeActionData: function(e) {
                            return "string" != typeof e ? "INVALIDATA" : e.replace(/_/g, "!-u-!").replace(/,/g, "!-c-!")
                        },
                        attributeValueToBeAnonymized: function(e, t) {
                            var n;
                            switch (t) {
                                case "label":
                                    n = e.attr("label");
                                    break;
                                case "value":
                                default:
                                    n = e.val()
                            }
                            return n
                        },
                        shouldConsiderAnonymizingImgAttributes: function(t, e, n, i) {
                            if (!t || !e || !VWO._.ac || !VWO._.ac.iAF || this.isElementWhitelisted(n) || !this.isElementBlacklisted(n, i)) return !1;
                            var o;
                            return ["src", "srcset"].forEach(function(e) {
                                -1 < t.indexOf(e) && (o = !0)
                            }), "style" === t && (o = o || -1 < e.indexOf("background") || -1 < e.indexOf("background-image")), o
                        },
                        getAnonymizedImageAttrValue: function(e, t) {
                            var n, i = (e = e || {}).name;
                            return n = e.value, -1 < i.indexOf("srcset") ? n = this.getAnonymizeSrcSet(n, t) : -1 < i.indexOf("src") ? n = this.getAnonyImageUrl(t) : -1 < i.indexOf("style") && (n = this.anonymizeStyleAttr(n, t)), n
                        },
                        anonymizeStyleAttr: function(t, n) {
                            if (-1 < t.indexOf("url(")) {
                                var e = t.match(/url\(.+?\)/g) || [],
                                    i = this;
                                e.forEach(function(e) {
                                    t = t.replace(e, 'url("' + i.getAnonyImageUrl(n) + '")')
                                });
                                var o = t.match(/(.+)\;$/);
                                o && (t = o[1]), t += " !important;"
                            }
                            return t
                        },
                        getAnonymizeSrcSet: function(t, e) {
                            if (!t) return t;
                            try {
                                for (var n = [], i = t.split(",") || [], o = 0; o < i.length; o++) {
                                    var r = i[o] || "",
                                        a = (r = r.trim()).split(" ")[1] || "";
                                    n.push(this.getAnonyImageUrl(e) + " " + a)
                                }
                                return n.join(" , ")
                            } catch (e) {
                                return t
                            }
                        },
                        getElemWidthAndHeight: function(e) {
                            for (var t = 0, n = 0;
                                (!t || !n) && e;) {
                                var i = j(e);
                                t = i.width(), n = i.height(), e = e.parentNode
                            }
                            return {
                                width: t = 0 < t ? 5e3 < t ? 5e3 : t : 0,
                                height: n = 0 < n ? 5e3 < n ? 5e3 : n : 0
                            }
                        },
                        getAnonyImageUrl: function(e) {
                            var t = this.getElemWidthAndHeight(e);
                            return "https://app.vwo.com/anonymize-image?w=" + t.width + "&h=" + t.height
                        },
                        handleProtected: function(e, t, n) {
                            var i = j(e),
                                o = this.attributeValueToBeAnonymized(i, n);
                            return this.shouldAnonymizeValue(e, t) && (o = this.getMaskedValue(o, i.prop("type"))), o
                        },
                        getUUID: function() {
                            return Y.get("_vwo_uuid")
                        }
                    },
                    U = {
                        getTrueWidth: function(e) {
                            var t = window.vwo_$ || window.jQuery;
                            return t && t(e).width() || e.clientWidth || e.offsetWidth || e.scrollWidth
                        },
                        getTrueHeight: function(e) {
                            var t = window.vwo_$ || window.jQuery;
                            return t && t(e).height() || e.clientHeight || e.offsetHeight || e.scrollHeight
                        },
                        getRelativeStats: function(e, t, n, i, o, r) {
                            var a = e.offset().top - t.offset().top,
                                s = e.offset().left - t.offset().left,
                                d = 0,
                                c = 0;
                            return o && r && (d = o - s, c = r - a), {
                                correctedTargetHeight: this.getTrueHeight(t[0]),
                                correctedTargetWidth: this.getTrueWidth(t[0]),
                                correctedTargetOffsetX: n + s,
                                correctedTargetOffsetY: i + a,
                                correctedTargetPageX: d,
                                correctedTargetPageY: c
                            }
                        },
                        postProcessMutations: function(e) {
                            var i = this;
                            return e.forEach(function(e) {
                                var t, n;
                                null !== (t = e.addedNodes) && void 0 !== t && t.length && (e.addedNodes = i.deduplicateNodes(e.addedNodes)), null !== (n = e.removedNodes) && void 0 !== n && n.length && (e.removedNodes = i.deduplicateNodes(e.removedNodes))
                            }), e
                        },
                        deduplicateNodes: function(e) {
                            var t = [];
                            if (t.push(e[0]), 1 < e.length) {
                                var n = [],
                                    i = JSON.parse(JSON.stringify(e[0]));
                                i.id && delete i.id, i.parentNode && delete i.parentNode, n.push(JSON.stringify(i));
                                for (var o = 1; o < e.length; o++) {
                                    var r = JSON.parse(JSON.stringify(e[o]));
                                    delete r.id, delete r.parentNode, -1 === n.indexOf(JSON.stringify(r)) && (t.push(e[o]), n.push(JSON.stringify(r)))
                                }
                            }
                            return t
                        }
                    },
                    B = ["html", "mutations", "recording"],
                    J = [],
                    K = {
                        log: function() {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            if (window.console && -1 !== document.cookie.indexOf("vwo_log_mode")) return window.console.log.apply(window, e)
                        }
                    },
                    G = 3,
                    Q = 0,
                    Z = null,
                    ee = function(e, t, n) {
                        setTimeout(function() {
                            n.retries = n.retries || 0, n.retries++, n.retries <= G && te(e, t, n)
                        }, 50)
                    },
                    te = function(t, n, i) {
                        var e = i.url,
                            o = new(M.get("XMLHttpRequest"));
                        o.open("POST", e, !0), "JSON" === t ? o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8") : o.formData = n, o.send(n), o.onload = function() {
                            if (200 <= this.status && this.status < 400)
                                if (this.response) try {
                                    var e = M.get("JSON");
                                    i.success(e.parse(this.response))
                                } catch (e) {} else i.success();
                                else i.formData = this.formData, i.error(), ee(t, n, i);
                            i.complete()
                        }, o.onerror = function() {
                            i.formData = this.formData, i.error(), i.complete(), ee(t, n, i)
                        }
                    },
                    ne = {
                        workerUrl: "",
                        isWorkerAvailable: function() {
                            return this.workerUrl
                        },
                        isMultipartSupported: function() {
                            return !!window.FormData
                        },
                        isWorkerRequired: function(e) {
                            for (var t = 0; t < B.length; t++) {
                                if (e[B[t]]) return !0
                            }
                        },
                        ajax: function(e) {
                            var t = void 0 !== (e = e || {}).url ? e.url : "",
                                n = void 0 !== e.type ? e.type : "AUTO",
                                i = e.data = void 0 !== e.data ? e.data : {},
                                o = e.success = "function" == typeof e.success ? e.success : function() {},
                                r = e.error = "function" == typeof e.error ? e.error : function() {},
                                a = e.complete = "function" == typeof e.complete ? e.complete : function() {},
                                s = this.workerUrl = e.workerUrl,
                                d = e.formData,
                                c = M.get("Object");
                            if (c.keys(i).length) {
                                var l = this.createQueryString(i);
                                if ("GET" === n.toUpperCase() || "AUTO" === n.toUpperCase() && l.length <= 1800) {
                                    e.type = "GET";
                                    var u = new(M.get("Image"));
                                    u.src = t + "?" + l, u.onload = function() {
                                        o(), a()
                                    }, u.onerror = function() {
                                        r(), a()
                                    }
                                } else if ("POST" === n.toUpperCase() || "AUTO" === n.toUpperCase() && 1800 < l.length) {
                                    e.url = e.url + "?_a=" + i.a + "&_u=" + encodeURIComponent(i.url), e.type = "POST";
                                    var h = [];
                                    try {
                                        s && (Z = Z || new Worker(s))
                                    } catch (e) {}
                                    if (d) te("FormData", d, e);
                                    else if (e.dataLength = e.dataLength || l.length, this.isWorkerRequired(i) && this.isWorkerAvailable() && this.isMultipartSupported() && Z) {
                                        for (var f = 0; f < B.length; f++) h[f] = i[B[f]];
                                        J[++Q] = {
                                            data: i,
                                            options: e
                                        }, Z.postMessage({
                                            id: Q,
                                            action: "compress",
                                            strings: h
                                        }), Z.onmessage = Z.onmessage || function(e) {
                                            var t = e.data,
                                                n = t.strings;
                                            if (J[t.id]) {
                                                var i, o = J[t.id].data,
                                                    r = J[t.id].options;
                                                if ("compressed" === t.action) {
                                                    for (var a = 0; a < n.length; a++) i = B[a], n[a] && (o["c_" + i] = new Blob([n[a]]), K.log("Original Size: " + o[i].length + ", Compressed Size: " + o["c_" + i].size), delete o[i]);
                                                    var s = new FormData;
                                                    for (var d in o) c.prototype.hasOwnProperty.call(o, d) && s.append(d, o[d]);
                                                    te("FormData", s, r), delete J[t.id]
                                                }
                                            }
                                        }
                                    } else te("JSON", l, e)
                                }
                            }
                        },
                        createQueryString: function(e) {
                            var t = "";
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t += t.length ? "&" : "", t += n + "=", t += encodeURIComponent(e[n]));
                            return t
                        },
                        sendError: function(e, t, n, i) {
                            window.VWO._.customError && window.VWO._.customError({
                                msg: e,
                                url: t,
                                lineno: n || 0,
                                colno: i || 0,
                                source: encodeURIComponent(window.location.href)
                            })
                        }
                    },
                    ie = {
                        htmlSuccess: [6]
                    },
                    oe = R.get("JSON"),
                    re = {
                        localStorageKey: "_vwo_nls_q_" + window._vwo_acc_id,
                        isRequestQueueable: function() {
                            try {
                                var e = window.localStorage,
                                    t = 329635 === window._vwo_acc_id || 583e3 < window._vwo_acc_id;
                                return t ? e.getItem(re.localStorageKey) : t
                            } catch (e) {
                                return !1
                            }
                        },
                        queueRequest: function(t, n) {
                            if (re.isRequestQueueable()) {
                                var e = oe.parse(window.localStorage.getItem(re.localStorageKey)),
                                    i = {
                                        data: t,
                                        options: n
                                    };
                                e.unshift(oe.stringify(i));
                                try {
                                    window.localStorage.setItem(re.localStorageKey, oe.stringify(e))
                                } catch (e) {
                                    be.sendData(t, n)
                                }
                            } else be.sendData(t, n)
                        },
                        deQueueRequest: function() {
                            if (re.isRequestQueueable()) {
                                var e = oe.parse(window.localStorage.getItem(re.localStorageKey)),
                                    t = null == e ? void 0 : e.length;
                                if (t)
                                    for (var n = 0; n < t; n++) {
                                        var i = oe.parse(e.pop());
                                        be.sendData(i.data, i.options)
                                    }
                                window.localStorage.setItem(re.localStorageKey, oe.stringify(e))
                            }
                        }
                    },
                    ae = d,
                    se, de, ce = "nls_ajax.php",
                    le = ["eTags", "eTagsV2"],
                    ue = window.VWO.data,
                    he = function() {},
                    fe = {},
                    me = 0,
                    ge = function() {
                        return !F.faultyWorker && F.workerUrl
                    },
                    pe = function(e) {
                        var t = Object.keys(e);
                        if (t.length > le.length) return !0;
                        for (var n = 0; n < t.length; n++)
                            if (-1 === le.indexOf(t[n])) return !0;
                        return !1
                    };

                function ve(e, t) {
                    try {
                        (t = t || {}).lineBreaks = (null == t ? void 0 : t.lineBreaks) || 1, t.ignoreWhitespace = (null == t ? void 0 : t.ignoreWhitespace) || !1;
                        var n = 0,
                            i = null == e ? void 0 : e.length,
                            o = null == e || e.replace(/[\u0100-\uFFFF]/g, function() {
                                return n++
                            }).length,
                            r = i - (null == e ? void 0 : e.replace(/(\r?\n|\r)/g, "").length);
                        return o = 2 * n, t.ignoreWhitespace ? (null == (e = null == e ? void 0 : e.replace(/(\r?\n|\r|\s+)/g, "")) ? void 0 : e.length) + o : i + o + Math.max(0, t.lineBreaks * (r - 1))
                    } catch (e) {}
                }

                function we(e) {
                    var t = M.get("Object").entries(e).sort(function(e, t) {
                        return ve(e[1]) - ve(t[1])
                    });
                    return t[t.length - 1]
                }

                function ye() {
                    var e = {},
                        t = M.get("JSON");
                    return F.r && (e.re = t.stringify(F.ids.re)), F.hs && (e.he = t.stringify(F.ids.he)), F.fae && (e.fe = t.stringify(F.ids.fe)), e
                }

                function _e(e) {
                    return 607307 === e
                }
                var be = {
                        formSubmitCallbacks: [],
                        saveNewRecording: function(e) {
                            var t, n, i, o, r = F.getViewportDimensions(),
                                a = F.getScrollPercentage(),
                                s = F.formAnalysis ? F.formAnalysis.forms : {},
                                d = {},
                                c = F.calcDuration(null, !0);
                            if (e = e || he, F.isEligibleToSendRecordingData()) {
                                var l = M.get("JSON");
                                F.recordingData.totals.scroll = a < 1 ? 10 : a;
                                var u = F.getScreenDimensions(),
                                    h = {
                                        codedo: "set_html_and_recording",
                                        a: F.ids.account,
                                        e: l.stringify(F.ids.experiment),
                                        title: F.getPageTitle(),
                                        url: window.location.href,
                                        referring_url: "http:" === document.location.protocol && document.location.href === document.referrer ? "" : document.referrer,
                                        session_id: F.ids.session,
                                        recording_id: F.ids.recording,
                                        return_visitor: F.returnVisitor,
                                        ins: F.newSession,
                                        start_time: F.startTime,
                                        end_time: c.currentTime,
                                        window_width: r.width,
                                        window_height: r.height,
                                        sh: u.height,
                                        sw: u.width,
                                        vn: F.version,
                                        rand: Math.random()
                                    };
                                VWO._ && (h.eTime = VWO._.commonUtil.getCurrentTimestamp());
                                var f = F.getCurrentHrefs();
                                if (f.length && (h.asts = f), F.newSession = !1, F.hs && (i = {
                                        scroll_percentage: F.recordingData.totals.scroll
                                    }), F.fae) {
                                    var m = F.formAnalysis ? F.formAnalysis.f : {};
                                    n = 0 === Object.keys(m).length ? {
                                        forms: l.stringify(m),
                                        f: l.stringify(m)
                                    } : {
                                        forms: l.stringify(s),
                                        f: l.stringify(m)
                                    }
                                }
                                F.r && (t = {
                                    duration: c.duration,
                                    clicks: F.recordingData.totals.clicks,
                                    movements: F.recordingData.totals.movements,
                                    end_time: c.currentTime
                                }, F.Recording && F.Recording.addInitialHTML(h)), F.analyze && (ce = "analyze", o = ye(), d = F.getTags(), F.resetTagAfterSent()), ae.extend(h, t, n, i, o, d), this.sendData(h, {
                                    callback: e
                                }), F.resetClicksCount()
                            }
                        },
                        sendRecordingData: function(e, t) {
                            if (-1 === ie.htmlSuccess.indexOf(F.ids.account) && !F.htmlRequestSuccess) return !1;
                            var n, i, o, r, a, s, d, c = F.checkIfIdle(),
                                l = M.get("JSON");
                            if (!e) {
                                if (!F.isEligibleToSendRecordingData()) return;
                                switch (F.stopRecording) {
                                    case F.enums.formAnalysis.TEMPORARY_STATE:
                                        return void(c || (F.resetAfterDataSent(), F.clearSessionIdleTimeout(), F.triggerSessionDeleteTimeout()));
                                    case F.enums.formAnalysis.PERMANENT_STATE:
                                        return
                                }
                                if (c) {
                                    if (F.triggerSessionIdleTimeout(), c) return;
                                    F.clearSessionIdleTimeout()
                                }
                                i = {
                                    a: F.ids.account,
                                    e: l.stringify(F.ids.experiment),
                                    url: t || window.location.href,
                                    session_id: F.ids.session,
                                    recording_id: F.ids.recording,
                                    vn: F.version,
                                    rand: Math.random()
                                }, VWO._ && (i.eTime = VWO._.commonUtil.getCurrentTimestamp());
                                var u = F.getCurrentHrefs();
                                for (var h in u.length && (i.asts = u), r = {}, this.formSubmitCallbacks) Object.prototype.hasOwnProperty.call(this.formSubmitCallbacks, h) && (n = this.formSubmitCallbacks[h]()) && ae.extend(r, n);
                                if (o = F.calcDuration(r), F.r && (s = {
                                        movements: F.recordingData.totals.movements,
                                        clicks: F.recordingData.totals.clicks,
                                        duration: o.duration,
                                        start_time: F.startTime,
                                        end_time: o.currentTime
                                    }, a = !0), pe(r) && (a = !0, ae.extend(i, r)), !a) return void F.resetTagAfterSent();
                                F.analyze && (ce = "analyze", d = ye(), i.fRS = F.htmlRequestSuccess, delete i.e), ae.extend(i, s, d), F.resetAfterDataSent(), re.queueRequest(i), F.resetClicksCount()
                            }
                        },
                        sendData: function(e, t) {
                            window.localStorage.getItem("a"), se = "https://dev.visualwebsiteoptimizer.com/", de = F.analyze && ue.asn && "https://" + ue.asn + "/";
                            var n = (t = t || {}).callback || function() {},
                                i = F.analyze || window.VWO._vba.forceWorker ? ge() : null,
                                o = (de || se) + ce,
                                r = F.ids.session;
                            if (fe[r] ? fe[r] !== o && (ne.sendError("Recording url is not matching __ previous url: " + fe[r] + " __ new url: " + o + " __ sessionId: " + r + "__ uuid: " + X.getUUID(), "ajax-nls.js", 33), fe[r] = o) : fe[r] = o, 1e7 < ve(JSON.stringify(e))) {
                                var a = we(e);
                                window.VWO._.customError && window.VWO._.customError({
                                    msg: "callStack size exceeded 10mb, data : " + JSON.stringify(a),
                                    url: document.URL
                                })
                            }
                            e.count = ++me, ne.ajax({
                                url: o,
                                type: t.method,
                                data: e,
                                workerUrl: _e(e.a) ? null : i,
                                success: function(e) {
                                    n(e), F.resetHrefCollection()
                                }
                            })
                        }
                    },
                    Te = "_",
                    Ne = {
                        mc: "Click",
                        mm: "Mouse Move",
                        mu: "Mouse Up",
                        dc: "Dead Click",
                        rc: "Rage Click",
                        rcdc: "Rage & Dead Click",
                        sS: "Screen Scale",
                        tc: "Touch",
                        is: "Scale Information",
                        rs: "Resize and Scale",
                        re: "Resize",
                        bl: "Blur",
                        fo: "Focus",
                        rb: "Radio Button",
                        cb: "Checkbox",
                        sb: "Selectbox",
                        sc: "Scroll",
                        es: "Element Scroll",
                        ku: "Key Up",
                        url: "Page Load",
                        oc: "Orientation Change",
                        mr: "Click",
                        vwomt: "vwo Meta event",
                        ko: "Keyboard Open",
                        kc: "Keyboard Close"
                    },
                    Ee = function(e) {
                        return e ? e.replace(/!-u-!/g, "_").replace(/!-c-!/g, ",") : ""
                    },
                    Se = {
                        parseEventString: function(e) {
                            var t, n = e.split(Te),
                                i = 0,
                                o = n[0];
                            if (o in Ne) {
                                var r = void 0,
                                    a = void 0,
                                    s = void 0,
                                    d = parseInt(n[1], 10);
                                if ("mc" !== o && "mr" !== o || (i++, 10 === n.length ? r = "{11}" === n[9] ? Ne.dc : "{12}" === n[9] ? Ne.rc : "{11:12}" === n[9] ? Ne.rcdc : Ne.mc : 9 === n.length && (r = Ne[o]), s = n[2], "mc" === o && (a = ""), t = {
                                        action: o,
                                        label: r,
                                        timeMomentRelativeToPage: d,
                                        selectorPath: Ee(s),
                                        sanitizedSelectorPath: s,
                                        elWidth: n[3],
                                        elHeight: n[4],
                                        relX: n[5],
                                        relY: n[6],
                                        docX: n[7],
                                        docY: n[8],
                                        innerText: a,
                                        clickCounter: i
                                    }), "mm" !== o && "mu" !== o || (r = Ne[o], s = n[2], t = {
                                        action: o,
                                        label: r,
                                        timeMomentRelativeToPage: d,
                                        selectorPath: Ee(s),
                                        sanitizedSelectorPath: s,
                                        elWidth: n[3],
                                        elHeight: n[4],
                                        relX: n[5],
                                        relY: n[6],
                                        docX: n[7],
                                        docY: n[8]
                                    }), "sS" === o && (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        screenScaleX: n[2],
                                        screenScaleY: n[3]
                                    }), "tc" !== o && "is" !== o || (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        scaleX: n[2],
                                        scaleY: n[3],
                                        scrollX: n[4],
                                        scrollY: n[5]
                                    }), "rs" === o && (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        width: n[2],
                                        height: n[3],
                                        scrollX: n[4],
                                        scrollY: n[5],
                                        scaleX: n[6],
                                        scaleY: n[7],
                                        screenScaleX: n[8],
                                        screenScaleY: n[9],
                                        pageWidth: n[10],
                                        pageHeight: n[11]
                                    }), "re" === o && (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        width: n[2],
                                        height: n[3],
                                        scrollX: n[4],
                                        scrollY: n[5]
                                    }), "bl" !== o && "sb" !== o && "ku" !== o || (r = Ne[o], s = n[2], t = {
                                        action: o,
                                        label: r,
                                        timeMomentRelativeToPage: d,
                                        selectorPath: Ee(s),
                                        sanitizedSelectorPath: s,
                                        value: n[3]
                                    }), "fo" === o && (r = Ne[o], s = n[2], t = {
                                        action: o,
                                        label: r,
                                        timeMomentRelativeToPage: d,
                                        selectorPath: Ee(s),
                                        sanitizedSelectorPath: s
                                    }), "rb" !== o && "cb" !== o || (r = Ne[o], s = n[2], t = {
                                        action: o,
                                        label: r,
                                        timeMomentRelativeToPage: d,
                                        selectorPath: Ee(s),
                                        sanitizedSelectorPath: s,
                                        isChecked: n[3]
                                    }), "sc" === o && (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        scaleX: n[2],
                                        scaleY: n[3],
                                        scrollX: n[4],
                                        scrollY: n[5],
                                        width: n[6],
                                        height: n[7],
                                        pageWidth: n[8],
                                        pageHeight: n[9]
                                    }), "es" === o && (r = Ne[o], s = n[2], t = {
                                        action: o,
                                        label: r,
                                        timeMomentRelativeToPage: d,
                                        selectorPath: Ee(s),
                                        sanitizedSelectorPath: s,
                                        scrollX: n[3],
                                        scrollY: n[4]
                                    }), "url" === o && (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        url: n[2],
                                        referrerUrl: n[3]
                                    }), "oc" === o && (t = {
                                        action: o,
                                        label: r = Ne[o],
                                        timeMomentRelativeToPage: d,
                                        width: n[2],
                                        height: n[3]
                                    }), "vwomt" === o) t = {
                                    action: o,
                                    label: r = Ne[o],
                                    timeMomentRelativeToPage: d,
                                    data: e.substring(e.indexOf(n[1]) + 1, e.length)
                                };
                                return "ko" !== o && "kc" !== o || (t = {
                                    action: o,
                                    label: r = Ne[o],
                                    timeMomentRelativeToPage: d
                                }), t
                            }
                        },
                        serializeEvent: function(e) {
                            if (e.action in Ne) {
                                var t = "";
                                return "mc" !== e.action && "mr" !== e.action && "mm" !== e.action && "mu" !== e.action || (t = [e.action, e.timestamp, e.selectorPath, e.elWidth, e.elHeight, e.relX, e.relY, e.docX, e.docY].join(Te)), "sS" === e.action && (t = [e.action, e.timestamp, e.screenScaleX, e.screenScaleX].join(Te)), "tc" !== e.action && "is" !== e.action || (t = [e.action, e.timestamp, e.scaleX, e.scaleY, e.scrollX, e.scrollY].join(Te)), "rs" === e.action && (t = [e.action, e.timestamp, e.width, e.height, e.scrollX, e.scrollY, e.scaleX, e.scaleY, e.screenScaleX, e.screenScaleY, e.pageWidth, e.pageHeight].join(Te)), "re" === e.action && (t = [e.action, e.timestamp, e.width, e.height, e.scrollX, e.scrollY].join(Te)), "bl" !== e.action && "sb" !== e.action && "ku" !== e.action || (t = [e.action, e.timestamp, e.selectorPath, e.value].join(Te)), "fo" === e.action && (t = [e.action, e.timestamp, e.selectorPath].join(Te)), "rb" !== e.action && "cb" != e.action || (t = [e.action, e.timestamp, e.selectorPath, e.isChecked].join(Te)), "sc" === e.action && (t = [e.action, e.timestamp, e.scaleX, e.scaleY, e.scrollX, e.scrollY, e.width, e.height, e.pageWidth, e.pageHeight].join(Te)), "es" === e.action && (t = [e.action, e.timestamp, e.selectorPath, e.scrollX, e.scrollY].join(Te)), "url" === e.action && (t = [e.action, e.timestamp, e.url, e.referrerUrl].join(Te)), "oc" === e.action && (t = [e.action, e.timestamp, e.width, e.height].join(Te)), "vwomt" === e.action && (t = [e.action, e.timestamp, e.data].join(Te)), "ko" !== e.action && "kc" !== e.action || (t = [e.action, e.timestamp].join(Te)), t
                            }
                        }
                    },
                    Oe = d,
                    Ce, Re;

                function ke(i) {
                    var o, r;
                    window.history && (o = window.history, r = o.pushState || function() {}, p.addOverrideState(o, "pushState"), o.pushState = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var n = r.apply(o, e);
                        return i({
                            state: e[0]
                        }), n
                    }, window.addEventListener ? p.addEventListener(window, "popstate", i, !1) : window.attachEvent && window.attachEvent("onpopstate", i))
                }

                function Ae() {
                    F.recordingData.totals.ocs++;
                    var e = F.getScreenDimensions(),
                        t = {
                            action: "oc",
                            timestamp: T() - F.startTime,
                            width: e.width,
                            height: e.height
                        };
                    this.recording.push(Se.serializeEvent(t))
                }

                function De(e) {
                    var t = setTimeout(Ae.bind(e), 10);
                    p.pushTimers(t, "timeout")
                }

                function Ie(e) {
                    if (this.isMobile = F.isMobile(), this.isMobile) {
                        var t = {
                            action: "focusin" == e.type ? "ko" : "kc",
                            timestamp: T() - F.startTime
                        };
                        this.recording.push(Se.serializeEvent(t))
                    }
                }

                function Pe(e) {
                    if (document.contains(e)) return document;
                    for (var t = e; t.parentNode;) t = t.parentNode;
                    return t
                }

                function Le() {
                    var e = M.get("Array");
                    this.heatmap = {
                        eventsLength: 0,
                        maxClicksRecorded: window._vwo_clicks || 3,
                        clicks: new e
                    }, this.recording = new e, this.clicks = new e, this.index = {
                        recording: 0,
                        clicks: 0,
                        heatmap: 0
                    }, this.intervals = new e, this.anonymizeKeys = !0, this.clickDelay = {
                        page: 0,
                        link: 380
                    }, this.tags = new s("Array"), this.totals = {
                        movements: 0,
                        clicks: 0,
                        keyPresses: 0,
                        scroll: 0
                    }, this.window = {
                        width: 0,
                        height: 0
                    }, this.mouse = {
                        curMove: {
                            el: {},
                            width: 0,
                            height: 0,
                            relX: 0,
                            relY: 0,
                            docX: 0,
                            docY: 0
                        },
                        lastMove: {
                            docX: 0,
                            docY: 0
                        },
                        curDown: {
                            tag: "",
                            index: 0
                        }
                    }, this.isMobile = F.isMobile(), this.devicePixelRatio = 0
                }

                function xe() {
                    for (var e = document.cookie.split(/; ?/), t = {}, n = 0; n < e.length; n++) {
                        var i = e[n].split("="),
                            o = i[0],
                            r = i[1];
                        try {
                            0 !== o.indexOf("_vwo") && 0 !== o.indexOf("_vis_opt") || (t[o] = r)
                        } catch (e) {}
                    }
                    return t
                }

                function Me() {
                    var e = window._vwo_evq;
                    if (e) {
                        var t = F.Recording.index.evq ? F.Recording.index.evq - 1 : 0,
                            n = e.slice(t);
                        return F.Recording.index.evq = e.length, n
                    }
                }
                Le.prototype.addInitialHTML = function(e) {
                    if (F.r) {
                        var t = M.get("JSON"),
                            n = F.GetHtml.html;
                        n.lvs = {
                            c: VWO.v,
                            o: VWO.v_o,
                            s: VWO.v_s
                        }, n.idleToAction = F.saveNewRecordingInitiatedOnce, e.html = t.stringify(n)
                    }
                }, Le.prototype.getRelativeCoord = function(e) {
                    if (this.isMobile) {
                        var t = (Ce = Ce || Oe('<span style="position:absolute;top:0;left:-100px"></span>').appendTo("body")).offset();
                        e.pageY += t.top, e.pageX += t.left - -100
                    }
                    return {
                        x: e.pageX - e.offsetX,
                        y: e.pageY - e.offsetY
                    }
                }, Le.prototype.sendElementScrollData = function(e) {
                    var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                        i = {
                            action: "es",
                            selectorPath: X.sanitizeActionData(b(n)),
                            timestamp: T() - F.startTime,
                            scrollX: Oe(n).scrollLeft(),
                            scrollY: Oe(n).scrollTop()
                        };
                    this.recording.push(Se.serializeEvent(i))
                }, Le.prototype.loadEventListeners = function() {
                    var n = this;
                    p.addJqEventListener(Oe(document), "on", "focusin", Ie.bind(this), "select, textarea, input[type=text], input[type=date], input[type=password], input[type=email], input[type=number]"), p.addJqEventListener(Oe(document), "on", "focusout", Ie.bind(this), "select, textarea, input[type=text], input[type=date], input[type=password], input[type=email], input[type=number]");
                    var e = window.navigator.userAgent;
                    e.match(/safari/i) && !e.match(/chrome/i) || window._vwo_acc_id < 5e5 ? p.addEventListener(Oe(window), "on", "orientationchange", De.bind(this, n)) : p.addEventListener(window.screen.orientation, "change", De.bind(this, n)), p.addJqEventListener(Oe(document), "on", "mouseleave", be.sendRecordingData.bind(be));

                    function s() {
                        var e = F.getScale(),
                            t = {
                                action: "tc",
                                timestamp: T() - F.startTime,
                                scaleX: e.x,
                                scaleY: e.y,
                                scrollX: Oe(window).scrollLeft(),
                                scrollY: Oe(window).scrollTop()
                            };
                        n.recording.push(Se.serializeEvent(t))
                    }

                    function d(e) {
                        var t, n, i, o = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            r = "touchend" === e.type,
                            a = window.vwo_$(o),
                            s = Oe(o).offset(),
                            d = window.vwo_$(o);
                        if ("undefined" != typeof ShadowRoot && (o.getRootNode ? o.getRootNode() instanceof ShadowRoot : Pe(o) instanceof ShadowRoot)) {
                            var c = o.getBoundingClientRect();
                            s = {
                                top: c.top + document.body.scrollTop,
                                left: c.left + document.body.scrollLeft
                            }
                        }
                        if (s) {
                            if (this.mouse.curDown.tag = o.nodeName, this.mouse.curDown.index = Oe(o.nodeName).index(o), r) {
                                var l = e.changedTouches[0];
                                l && (n = l.pageX, i = l.pageY)
                            } else n = e.pageX, i = e.pageY;
                            for (var u = M.get("Math"), h = this.getRelativeCoord({
                                    pageX: n,
                                    offsetX: s.left,
                                    pageY: i,
                                    offsetY: s.top
                                }), f = T() - F.startTime, m = {
                                    action: "mc",
                                    timestamp: f,
                                    selectorPath: X.sanitizeActionData(b(o)),
                                    elWidth: U.getTrueWidth(o),
                                    elHeight: U.getTrueHeight(o),
                                    relX: u.floor(h.x),
                                    relY: u.floor(h.y),
                                    docX: this.mouse.curMove.docX,
                                    docY: this.mouse.curMove.docY
                                }; d.width() <= 0 && d.height() <= 0 && d.length;) d = d.parent();
                            if (d && a && d.length && a.length) {
                                var g = u.floor(h.x),
                                    p = u.floor(h.y),
                                    v = this.mouse.curMove.docX,
                                    w = this.mouse.curMove.docY,
                                    y = U.getRelativeStats(a, d, g, p, v, w);
                                m = {
                                    action: "mc",
                                    timestamp: f,
                                    selectorPath: X.sanitizeActionData(b(d[0])),
                                    elWidth: y.correctedTargetWidth,
                                    elHeight: y.correctedTargetHeight,
                                    relX: u.floor(y.correctedTargetOffsetX),
                                    relY: u.floor(y.correctedTargetOffsetY),
                                    docX: y.correctedTargetPageX,
                                    docY: y.correctedTargetPageY
                                }
                            }
                            1 != e.which && "touchend" !== e.type || this.heatmap.clicks.push(Se.serializeEvent(m)), this.recording.push(Se.serializeEvent(m)), F.sRD = F.sRD || _(be.sendRecordingData.bind(be), F.cDT), F.sRD()
                        }
                    }

                    function t() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var n = e[0],
                            i = n.target;
                        if ("pointerdown" === n.type) i.pointerdownAttended = !0, setTimeout(function() {
                            i.pointerdownAttended = !1
                        });
                        else if ("mousedown" === n.type && i.pointerdownAttended) return;
                        i.vwoVbaTe ? i.vwoVbaTe = 0 : d.apply(this, e)
                    }
                    p.addEventListener(document, "touchstart", function(e) {
                        2 === e.touches.length && s()
                    }.bind(this)), p.addEventListener(document, "touchmove", function(e) {
                        var t;
                        2 === e.touches.length && s();
                        var n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target;
                        if (n) {
                            n.vwoVbaTm = 1;
                            var i = setTimeout(function() {
                                n.vwoVbaTm = 0
                            }, 1e3);
                            p.pushTimers(i, "timeout")
                        }
                    }.bind(this)), p.addEventListener(document, "touchend", function() {
                        for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        var i = t[0];
                        if (2 === i.touches.length) {
                            var o = setTimeout(s, 600);
                            p.pushTimers(o, "timeout")
                        }
                        var r = i.composedPath && null !== (e = i.composedPath()) && void 0 !== e && e.length ? i.composedPath()[0] : i.target;
                        if (r) {
                            r.vwoVbaTe = 1;
                            var a = setTimeout(function() {
                                r.vwoVbaTe = 0
                            }, 1e3);
                            p.pushTimers(a, "timeout"), r.vwoVbaTm || d.apply(this, t.concat(0)), r.vwoVbaTm = 0
                        }
                    }.bind(this));
                    var i = _(function() {
                        var e = F.getScale(),
                            t = this.isMobile ? e.x : 1,
                            n = this.isMobile ? e.y : 1,
                            i = {
                                action: "sc",
                                timestamp: T() - F.startTime,
                                scaleX: t,
                                scaleY: n,
                                scrollX: Oe(window).scrollLeft(),
                                scrollY: Oe(window).scrollTop(),
                                width: window.innerWidth,
                                height: window.innerHeight,
                                pageWidth: Oe("html").width(),
                                pageHeight: Oe("html").height()
                            };
                        this.recording.push(Se.serializeEvent(i))
                    }.bind(n), 100);
                    p.addEventListener(window, "resize", function() {
                        if (this.devicePixelRatio === window.devicePixelRatio) {
                            var e = F.getScale(),
                                t = F.getScreenScale(),
                                n = {
                                    action: this.isMobile ? "rs" : "re",
                                    timestamp: T() - F.startTime,
                                    width: this.isMobile ? window.innerWidth : document.documentElement.clientWidth,
                                    height: this.isMobile ? window.innerHeight : document.documentElement.clientHeight,
                                    scrollX: Oe(window).scrollLeft(),
                                    scrollY: Oe(window).scrollTop(),
                                    scaleX: this.isMobile ? e.x : "",
                                    scaleY: this.isMobile ? e.y : "",
                                    screenScaleX: this.isMobile ? t.x : "",
                                    screenScaleY: this.isMobile ? t.y : "",
                                    pageWidth: this.isMobile ? Oe("html").width() : "",
                                    pageHeight: this.isMobile ? Oe("html").height() : ""
                                };
                            this.recording.push(Se.serializeEvent(n))
                        } else this.devicePixelRatio = window.devicePixelRatio
                    }.bind(this)), p.addEventListener(document, "mousemove", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = Oe(n).offset();
                        if ("undefined" != typeof ShadowRoot && (n.getRootNode ? n.getRootNode() instanceof ShadowRoot : Pe(n) instanceof ShadowRoot)) {
                            var o = n.getBoundingClientRect();
                            i = {
                                top: o.top + document.body.scrollTop,
                                left: o.left + document.body.scrollLeft
                            }
                        }
                        if (i) {
                            var r = this.getRelativeCoord({
                                    pageX: e.pageX,
                                    offsetX: i.left,
                                    pageY: e.pageY,
                                    offsetY: i.top
                                }),
                                a = M.get("Math");
                            this.mouse.curMove.el = n, this.mouse.curMove.width = U.getTrueWidth(n), this.mouse.curMove.height = U.getTrueHeight(n), this.mouse.curMove.relX = a.floor(r.x), this.mouse.curMove.relY = a.floor(r.y), this.mouse.curMove.docX = e.pageX, this.mouse.curMove.docY = e.pageY
                        }
                    }.bind(this)), p.addJqEventListener(Oe(window), "on", "scroll", i), "function" == typeof document.addEventListener ? p.addEventListener(document.body, "scroll", n.sendElementScrollData.bind(n), !0) : p.addJqEventListener(Oe("*"), "on", "scroll", n.sendElementScrollData.bind(n)), p.addEventListener(document, "focus", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = {
                                action: "fo",
                                timestamp: T() - F.startTime,
                                selectorPath: X.sanitizeActionData(b(n))
                            };
                        this.recording.push(Se.serializeEvent(i))
                    }.bind(this), !0), p.addEventListener(document, "blur", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = this.handleProtected(n),
                            o = {
                                action: "bl",
                                timestamp: T() - F.startTime,
                                selectorPath: X.sanitizeActionData(b(n)),
                                value: i
                            };
                        this.recording.push(Se.serializeEvent(o))
                    }.bind(this), !0), ke(function() {
                        var e = {
                            action: "url",
                            timestamp: T() - F.startTime,
                            url: encodeURIComponent(location.href),
                            referrerUrl: encodeURIComponent(this.currentUrl)
                        };
                        this.recording.push(Se.serializeEvent(e)), this.currentUrl = location.href
                    }.bind(this)), p.addEventListener(document.body, "mousedown", t.bind(this)), p.addEventListener(document.body, "pointerdown", t.bind(this)), p.addEventListener(document, "mouseup", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = Oe(n).offset(),
                            o = Oe(n.nodeName).index(n);
                        if ("HTML" !== n.nodeName && i) {
                            var r;
                            if (n.nodeName === this.mouse.curDown.tag && o === this.mouse.curDown.index) switch (e.button) {
                                case 0:
                                case 1:
                                default:
                                    r = "mc";
                                    break;
                                case 2:
                                    r = "mr"
                            } else r = "mu";
                            if ("mc" !== r) {
                                var a = this.getRelativeCoord({
                                        pageX: e.pageX,
                                        offsetX: i.left,
                                        pageY: e.pageY,
                                        offsetY: i.top
                                    }),
                                    s = M.get("Math"),
                                    d = {
                                        action: r,
                                        timestamp: T() - F.startTime,
                                        selectorPath: X.sanitizeActionData(b(n)),
                                        elWidth: U.getTrueWidth(n),
                                        elHeight: U.getTrueHeight(n),
                                        relX: s.floor(a.x),
                                        relY: s.floor(a.y),
                                        docX: this.mouse.curMove.docX,
                                        docY: this.mouse.curMove.docY
                                    };
                                if (this.recording.push(Se.serializeEvent(d)), "submit" !== Oe(n).attr("type")) {
                                    setTimeout(function() {
                                        be.sendRecordingData()
                                    }, 1);
                                    for (var c = "A" === n.nodeName ? this.clickDelay.link : this.clickDelay.page, l = M.get("Date"), u = new l, h = u.getTime() + c; u.getTime() < h;) u = new l
                                }
                            }
                        }
                    }.bind(this)), p.addEventListener(document, "keyup", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = this.handleProtected(n),
                            o = {
                                action: "ku",
                                timestamp: T() - F.startTime,
                                selectorPath: X.sanitizeActionData(b(n)),
                                value: i
                            };
                        this.recording.push(Se.serializeEvent(o))
                    }.bind(this)), p.addJqEventListener(Oe(document), "on", "change", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = Oe(n).isChecked && Oe(n).isChecked() || Oe(n).is(":checked"),
                            o = {
                                action: "rb",
                                timestamp: T() - F.startTime,
                                selectorPath: X.sanitizeActionData(b(n)),
                                isChecked: i
                            };
                        this.recording.push(Se.serializeEvent(o))
                    }.bind(this), "input[type=radio]"), p.addJqEventListener(Oe(document), "on", "change", function(e) {
                        var t, n = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            i = Oe(n).is(":checked"),
                            o = {
                                action: "rb",
                                timestamp: T() - F.startTime,
                                selectorPath: X.sanitizeActionData(b(n)),
                                isChecked: i
                            };
                        this.recording.push(Se.serializeEvent(o))
                    }.bind(this), "input[type=checkbox]"), p.addJqEventListener(Oe(document), "on", "change", function(e) {
                        var t, n, i = e.composedPath && null !== (t = e.composedPath()) && void 0 !== t && t.length ? e.composedPath()[0] : e.target,
                            o = Oe(i).val();
                        if (Oe.isArray(o)) {
                            for (var r = 0; r < o.length; r++) o[r] = X.sanitizeActionData(o[r]);
                            n = o.join("!-ac-!")
                        } else n = o;
                        n = this.handleProtected(i);
                        var a = {
                            action: "sb",
                            timestamp: T() - F.startTime,
                            selectorPath: X.sanitizeActionData(b(i)),
                            value: n
                        };
                        this.recording.push(Se.serializeEvent(a))
                    }.bind(this), "select")
                }, Le.prototype.storeMouseMove = function() {
                    if ("HTML" !== this.mouse.curMove.el.nodeName && (this.mouse.lastMove.docX !== this.mouse.curMove.docX || this.mouse.lastMove.docY !== this.mouse.curMove.docY)) {
                        var e = {
                            action: "mm",
                            timestamp: T() - F.startTime,
                            selectorPath: X.sanitizeActionData(b(this.mouse.curMove.el)),
                            elWidth: this.mouse.curMove.width,
                            elHeight: this.mouse.curMove.height,
                            relX: this.mouse.curMove.relX,
                            relY: this.mouse.curMove.relY,
                            docX: this.mouse.curMove.docX,
                            docY: this.mouse.curMove.docY
                        };
                        this.recording.push(Se.serializeEvent(e)), this.mouse.lastMove.docX = this.mouse.curMove.docX, this.mouse.lastMove.docY = this.mouse.curMove.docY
                    }
                }, Le.prototype.handleProtected = function(e) {
                    var t = X.handleProtected(e, this.anonymizeKeys);
                    return t = X.sanitizeActionData(t)
                }, Le.prototype.getHeatmapData = function(e) {
                    if (F.hs && !F.hsStopped) {
                        var t = e,
                            n = {},
                            i = F.Recording.heatmap.maxClicksRecorded - F.Recording.heatmap.eventsLength;
                        return t = t.slice(0, i), F.Recording.heatmap.eventsLength += t.length, 0 < t.length && Oe.extend(n, {
                            mc: t.join(",")
                        }), F.Recording.hasScrollChanged() && Oe.extend(n, {
                            scroll_percentage: F.recordingData.totals.scroll
                        }), n
                    }
                }, Le.prototype.resetHeatmapData = function() {
                    var e = M.get("Array");
                    F.Recording.heatmap.eventsLength = 0, F.hsStopped = !1, F.Recording.heatmap.clicks = new e, F.Recording.index.heatmap = 0
                }, Le.prototype.resetData = function() {
                    F.tags.eTags.refresh(), F.lastSendTime = 0, F.Recording.resetHeatmapData()
                }, Le.prototype.hasScrollChanged = function() {
                    return F.recordingData.totals.scroll !== F.recordingData.last.scroll
                }, Le.prototype.addTag = function(e) {
                    F.analyze || (F.Recording.tags.add(e), F.Recording.tags.isTagPassed() && be.sendRecordingData(!0))
                }, Le.prototype.getTagData = function() {
                    if (F.r && F.Recording.tags.isTagPassed()) return {
                        tags: F.Recording.tags.get()
                    }
                }, Le.prototype.getRecordingData = function(e, t) {
                    var n = {};
                    if (F.r) {
                        if (e.length && (n.recording = e.join(",")), t.length) {
                            var i = M.get("JSON");
                            n.mutations = i.stringify(t)
                        }
                        return n
                    }
                }, Le.prototype.sendData = function() {
                    var e, t, n, i, o, r, a = F.getScreenScale(),
                        s = {};
                    if (this.oldSettings = this.oldSettings || {}, this.isMobile && (this.oldSettings.screenScaleX !== a.x || this.oldSettings.screenScaleY !== a.y)) {
                        var d = {
                            action: "sS",
                            timestamp: T() - F.startTime,
                            screenScaleX: a.x,
                            screenScaleY: a.y
                        };
                        F.Recording.recording.push(Se.serializeEvent(d)), this.oldSettings.screenScaleX = a.x, this.oldSettings.screenScaleY = a.y
                    }
                    var c = Me();
                    if (!(F.Recording.index.recording >= F.Recording.recording.length && F.Recording.index.heatmap >= F.Recording.heatmap.clicks.length && F.Mutations.index >= F.Mutations.mutations.length) || F.Recording.hasScrollChanged() || F.Recording.tags.isTagPassed() || c.length) {
                        var l = F.Recording.recording.slice(F.Recording.index.recording),
                            u = F.Mutations.mutations.slice(F.Mutations.index),
                            h = F.Recording.heatmap.clicks.slice(F.Recording.index.heatmap);
                        F.Recording.index.recording = F.Recording.recording.length, F.Recording.index.heatmap = F.Recording.heatmap.clicks.length, F.Mutations.index = F.Mutations.mutations.length;
                        var f = M.get("JSON"),
                            m = N.init(l);
                        l = m.latestRecording;
                        var g = m.deadClickInThisBatch ? 11 : 0,
                            p = m.rageClickInThisBatch ? 12 : 0,
                            v = {};
                        if (g || p) {
                            var w = [];
                            w.push(g, p), v.rm = f.stringify({
                                ct: w
                            })
                        }
                        var y = F.Recording.getRecordingData(l, u),
                            _ = F.Recording.getHeatmapData(h),
                            b = F.Recording.getTagData();
                        VWO._ && VWO._.ac && VWO._.ac.rdbg && y && y.recording && (y.recording = y.recording + ",vwomt_" + (T() - F.startTime) + "_" + encodeURIComponent(f.stringify({
                            evq: c
                        })));
                        try {
                            null !== (n = null === (t = null === (e = window.VWO) || void 0 === e ? void 0 : e._) || void 0 === t ? void 0 : t.ac) && void 0 !== n && n.cRecJS && null !== (r = null === (o = null === (i = window.VWO) || void 0 === i ? void 0 : i._) || void 0 === o ? void 0 : o.ac) && void 0 !== r && r.cRecJS() ? Oe.extend(s, _, b, v) : Oe.extend(s, y, _, b, v)
                        } catch (e) {
                            window.VWO._.customError && window.VWO._.customError({
                                msg: "Error in cRecJS " + VWO._.ac.cRecJS,
                                url: document.URL
                            })
                        }
                        return s
                    }
                }, Le.prototype.pushScaleInformation = function() {
                    var e = F.getScale(),
                        t = e.x,
                        n = e.y,
                        i = {
                            action: "is",
                            timestamp: T() - F.startTime,
                            scaleX: t,
                            scaleY: n,
                            scrollX: Oe(window).scrollLeft(),
                            scrollY: Oe(window).scrollTop()
                        };
                    this.recording.push(Se.serializeEvent(i))
                }, Le.prototype.init = function(e) {
                    if (e && Le.bind(this)(), this.currentUrl = location.href, be.formSubmitCallbacks.push(this.sendData.bind(this)), this.devicePixelRatio = window.devicePixelRatio, this.initialClientHeight = F.getViewportDimensions().height, this.isMobile) {
                        this.oldSettings = this.oldSettings || {};
                        var t = F.getScreenScale(),
                            n = t.x,
                            i = t.y,
                            o = {
                                action: "sS",
                                timestamp: T() - F.startTime,
                                screenScaleX: n,
                                screenScaleY: i
                            };
                        F.Recording.recording.push(Se.serializeEvent(o)), this.oldSettings.screenScaleX = n, this.oldSettings.screenScaleY = i, this.pushScaleInformation();
                        for (var r = 500; r <= 2e3; r += 500) {
                            var a = setTimeout(this.pushScaleInformation.bind(this), r);
                            p.pushTimers(a, "timeout")
                        }
                    }
                    var s = F.getScale(),
                        d = {
                            action: "sc",
                            timestamp: T() - F.startTime,
                            scaleX: this.isMobile ? s.x : 1,
                            scaleY: this.isMobile ? s.y : 1,
                            scrollX: Oe(window).scrollLeft(),
                            scrollY: Oe(window).scrollTop(),
                            width: window.innerWidth,
                            height: window.innerHeight,
                            pageWidth: Oe("html").width(),
                            pageHeight: Oe("html").height()
                        };
                    if (this.recording.push(Se.serializeEvent(d)), !Re) {
                        this.loadEventListeners();
                        var c = !1;
                        document.addEventListener("vwo.meta", function(e) {
                            var t, n = e.data,
                                i = M.get("JSON");
                            n && "object" == typeof n && 519176 === window._vwo_acc_id && (n.snapShottedUrl = i.stringify(F.linkHrefForSnapshotting), c || (n.sessionId = F.ids.session, n.uuid = X.getUUID(), n.aST = VWO._.ast), c = !0), n && "object" == typeof n && 555774 === window._vwo_acc_id && (n.vvps = window.visualViewport && window.visualViewport.scale), n && "object" == typeof n && 373511 === window._vwo_acc_id && window.vwo_iehack_queue.length && (n.gifCalls = [], null !== (t = window.vwo_iehack_queue) && void 0 !== t && t.forEach(function(e) {
                                n.gifCalls.push(e.src)
                            })), n && "object" == typeof n && 566821 === window._vwo_acc_id && window._vwo_geo && (c || (n.location = window._vwo_geo), c = !0), F.Recording.recording.push("vwomt_" + (T() - F.startTime) + "_" + encodeURIComponent(i.stringify(n)))
                        }), VWO._.customEvent("meta", {
                            cks: xe()
                        });
                        var l = setInterval(this.storeMouseMove.bind(this), 300);
                        p.pushTimers(l, "interval"), Re = !0
                    }
                }, F.Recording = new Le;
                var He = F.Recording,
                    We = function() {};

                function Ve() {
                    this.focusedNode = null, this.selectedLiIndex = -1
                }
                Ve.prototype.getFocusedNode = function() {
                    return this.focusedNode
                }, Ve.prototype.setFocusOnNode = function(e) {
                    this.focusedNode = e
                }, Ve.prototype.resetFocusedNode = function() {
                    this.focusedNode = null
                }, Ve.prototype.resetSelectedLiIndex = function() {
                    this.selectedLiIndex = -1
                }, Ve.prototype.getSelectedLiIndex = function() {
                    return this.selectedLiIndex
                }, Ve.prototype.setSelectedLiIndex = function(e, t) {
                    t = t || We, this.selectedLiIndex !== e && (this.selectedLiIndex = e, t())
                }, Ve.prototype.doBlurOnNode = function(e, t) {
                    t = t || We, this.focusedNode && this.focusedNode !== e && (t(), this.resetFocusedNode(), this.resetSelectedLiIndex())
                }, Ve.prototype.doFocusOnNode = function(e, t) {
                    t = t || We, this.focusedNode && this.focusedNode === e || t()
                };
                var ze = new Ve,
                    Fe = {
                        createEvent: function(e, t) {
                            try {
                                var n = e.createEvent("Event");
                                return n.initEvent(t, !1, !1), n
                            } catch (e) {
                                window.VWO._.customError && window.VWO._.customError({
                                    msg: e && e.stack || e + ".",
                                    url: document.URL,
                                    source: "cEF"
                                })
                            }
                        },
                        dispatchEvent: function(e, t) {
                            e.dispatchEvent(t)
                        }
                    },
                    je = d,
                    Ye;

                function Xe(e) {
                    if (e.vwoCustEl && e.vwoCustEl.length) {
                        for (var t = e.vwoCustEl, n = 0; n < t.length; n++) delete t[n].vwoNatEl, Ze(t[n]);
                        delete e.vwoCustEl
                    }
                }

                function Ue(e) {
                    for (var t = e.customElements, n = e.nativeElement, i = [], o = 0; o < t.length; o++)
                        if (t[o]) {
                            if (t[o].vwoNatEl) continue;
                            t[o].vwoNatEl = n, Qe(t[o]), i.push(t[o])
                        }
                    n.vwoCustEl = i
                }

                function qe(e) {
                    var t = je(e),
                        n = t.attr("type");
                    if (t.is("input") && ("checkbox" === n || "radio" === n)) {
                        var i = je('label[for="' + t.attr("id") + '"]');
                        if (i.length <= 0) {
                            var o = t.parent();
                            "label" === o.get(0).tagName.toLowerCase() && (i = o)
                        }
                        return i.get(0)
                    }
                }

                function Be(e) {
                    var t = e.currentTarget.vwoNatEl,
                        n = je(e.target);
                    if (t.tagName && "SELECT" === t.tagName && (n.is("li") || n.parent().is("li") || n.parent().parent().is("li"))) {
                        var i = n.closest("li").index();
                        return t.chStatsProcessed = 0, ze.setSelectedLiIndex(i, Ye.changeHandler.bind({}, {
                            target: t
                        }, !0)), void(t.chStatsProcessed = 1)
                    }
                    t.mdStatsProcessed = 0, Ye.mouseDownHandler({
                        target: t
                    }), t.mdStatsProcessed = 1, t.fcStatsProcessed = 0, ze.doFocusOnNode(t, Ye.focusHandler.bind({}, {
                        target: t
                    })), t.fcStatsProcessed = 1
                }

                function Je(e) {
                    var t = je(e.target),
                        n = e.currentTarget.vwoNatEl;
                    n.tagName && "SELECT" === n.tagName && (t.parent().is("li") || t.parent().parent().is("li")) || (n.muStatsProcessed = 0, Ye.mouseUpHandler({
                        target: n
                    }), n.muStatsProcessed = 1, n.chStatsProcessed = 0, "INPUT" === n.tagName && "checkbox" === n.type ? Ye.changeHandler({
                        target: n
                    }) : "INPUT" === n.tagName && "radio" === n.type && ze.doFocusOnNode(n, Ye.changeHandler.bind({}, {
                        target: n
                    })), n.chStatsProcessed = 1, ze.setFocusOnNode(n))
                }

                function Ke(e) {
                    var t = e.currentTarget.vwoNatEl;
                    t.meStatsProcessed = 0, Ye.mouseEnterHandler({
                        target: t
                    }), t.meStatsProcessed = 1
                }

                function $e(e) {
                    var t = e.currentTarget.vwoNatEl;
                    t.mlStatsProcessed = 0, Ye.mouseLeaveHandler({
                        target: t
                    }), t.mlStatsProcessed = 1
                }

                function Ge() {
                    document.addEventListener("vwo_element_added", function(e) {
                        if (Ye._mapElements) {
                            var t = e.data;
                            t.constructor !== NodeList && (t = [t]);
                            for (var n = 0; n < t.length; n++) {
                                var i = [];
                                t[n].tagName && "input" === t[n].tagName.toLowerCase() && i.push(qe(t[n])), i.push(Ye._mapElements(t[n]));
                                var o = {
                                    customElements: i.reduce(function(e, t) {
                                        return e.concat(t)
                                    }, []),
                                    nativeElement: t[n]
                                };
                                Xe(t[n]), Ue(o)
                            }
                        }
                    }, !1)
                }

                function Qe(e) {
                    e.addEventListener("mousedown", Be, !0), e.addEventListener("mouseup", Je, !0), e.addEventListener("mouseenter", Ke, !0), e.addEventListener("mouseleave", $e, !0)
                }

                function Ze(e) {
                    e.removeEventListener("mousedown", Be, !0), e.removeEventListener("mouseup", Je, !0), e.removeEventListener("mouseenter", Ke, !0), e.removeEventListener("mouseleave", $e, !0)
                }
                var et = {
                        init: function(e) {
                            Ye = e, Ge()
                        }
                    },
                    tt = d,
                    nt = window._vwo_exp,
                    it = window._vwo_exp_ids,
                    ot = "ANALYZE_FORM",
                    rt = 0,
                    at;

                function st(e, t) {
                    var n, i = tt(e.target),
                        o = i.get(0);
                    switch (t) {
                        case "mouseenter":
                            n = o.meStatsProcessed;
                            break;
                        case "mouseleave":
                            n = o.mlStatsProcessed;
                            break;
                        case "mousedown":
                            n = o.mdStatsProcessed;
                            break;
                        case "mouseup":
                            n = o.muStatsProcessed;
                            break;
                        case "focus":
                            n = o.fcStatsProcessed;
                            break;
                        case "blur":
                            n = o.blStats;
                            break;
                        case "change":
                            n = o.chStatsProcessed;
                            break;
                        case "keydown":
                            n = o.kdStats
                    }
                    if (!n && dt.handleTracking(i)) return i
                }
                var dt = {
                    f: {},
                    forms: {},
                    lastSentForms: void 0,
                    changes: {},
                    formInputSelector: "form input, form select, form textarea, [nls_fa_name]:not(form) input, [nls_fa_name]:not(form) select, [nls_fa_name]:not(form) textarea",
                    getFormName: function(e) {
                        if (F.analyze) {
                            var t = e.data("id");
                            return t ? t : (rt++, e.data("id", rt), rt)
                        }
                        return void 0 !== e.attr("nls_fa_name") && !1 !== e.attr("nls_fa_name") ? e.attr("nls_fa_name") : void 0 !== e.attr("id") && !1 !== e.attr("id") ? e.attr("id") : void 0 !== e.attr("name") && !1 !== e.attr("name") && e.attr("name")
                    },
                    getFormElementName: function(e) {
                        return void 0 !== e.attr("nls_fa_el_name") && !1 !== e.attr("nls_fa_el_name") && null !== e.attr("nls_fa_el_name") ? e.attr("nls_fa_el_name") : void 0 !== e.attr("id") && !1 !== e.attr("id") && null !== e.attr("id") ? e.attr("id") : void 0 !== e.attr("name") && !1 !== e.attr("name") && null !== e.attr("name") && e.attr("name")
                    },
                    addForm: function(n) {
                        var i, o, r, a, s, e = it.length,
                            d = this.getFormName(n);
                        if (d) {
                            for (; e--;)
                                if (o = it[e], (i = nt[o]).type === ot && i.ready) {
                                    var t = void 0;
                                    try {
                                        t = tt(i.forms[0])
                                    } catch (e) {
                                        return
                                    }
                                    t.eq(0).each(l)
                                }
                            if ((!F.analyze || r) && 1 !== n.data("nls_fa_tracked") && !this.forms[d]) {
                                a = {
                                    hiddenInputs: 0,
                                    submit: 0,
                                    total: 0
                                }, n.find("input, select, textarea").each(function(e, t) {
                                    var n = tt(t);
                                    "hidden" === n.prop("type").toLowerCase() && (a.hiddenInputs += 1), "submit" === n.prop("type").toLowerCase() && (a.submit += 1), a.total += 1
                                }), s = a.hiddenInputs + a.submit === a.total;
                                var c = M.get("Array");
                                d ? s ? (n.data("nls_fa_tracked", 0), n.data("nls_fa_active", 0)) : (n.data("nls_fa_tracked", 1), n.data("nls_fa_active", 1), this.forms[d] = {
                                    name: d,
                                    fields: new c,
                                    interacted: 0,
                                    submitted: 0
                                }, n.data("nls_fa_name", d)) : (n.data("nls_fa_tracked", 1), n.data("nls_fa_active", 0)), n.find("input, select, textarea").each(function(e, t) {
                                    var n = tt(t),
                                        i = dt.getFormElementName(n),
                                        o = n.prop("type"),
                                        r = 1 === n.data("nls_fa_tracked") && 1 === n.data("nls_fa_active");
                                    if (!d || !i || "hidden" === n.prop("type").toLowerCase() || s) return r || (n.data("nls_fa_tracked", 1), n.data("nls_fa_active", 0)), !0;
                                    var a = dt.forms[d].fields.length;
                                    dt.forms[d].fields.push({
                                        name: i,
                                        type: o,
                                        interacted: 0,
                                        filledOut: 0,
                                        refilled: 0,
                                        timeHesitation: 0,
                                        timeInteraction: 0,
                                        fip: a
                                    }), n.data("nls_fa_tracked", 1), n.data("nls_fa_active", 1), n.data("nls_fa_name", d), n.data("nls_fa_field_pos", a)
                                }), Object.prototype.hasOwnProperty.call(this.forms, d) && this.addChanges("add_forms", this.forms[d], d)
                            }
                        }

                        function l(e, t) {
                            t === n[0] && (r = !0, dt.f[d] = dt.f[d] || {}, dt.f[d][o] || (dt.f[d][o] = i.forms[0]))
                        }
                    },
                    addFormElement: function(e) {
                        if (1 !== e.data("nls_fa_tracked")) {
                            var t = e.closest("form,[nls_fa_name]:not(form)");
                            if (1 === t.data("nls_fa_tracked")) {
                                if (1 === t.data("nls_fa_tracked") && 1 !== t.data("nls_fa_active")) return e.data("nls_fa_tracked", 1), void e.data("nls_fa_active", 0);
                                var n = t.data("nls_fa_name"),
                                    i = this.getFormElementName(e),
                                    o = e.prop("type");
                                if (!i || "hidden" === e.prop("type").toLowerCase()) return e.data("nls_fa_tracked", 1), void e.data("nls_fa_active", 0);
                                var r = this.forms[n].fields.length;
                                this.forms[n].fields.push({
                                    name: i,
                                    type: o,
                                    interacted: 0,
                                    filledOut: 0,
                                    refilled: 0,
                                    timeHesitation: 0,
                                    timeInteraction: 0,
                                    fip: r
                                }), e.data("nls_fa_tracked", 1), e.data("nls_fa_active", 1), e.data("nls_fa_name", n), e.data("nls_fa_field_pos", r), Object.prototype.hasOwnProperty.call(this.forms[n].fields, r) && this.addChanges("edit", {
                                    a: "add",
                                    t: "element",
                                    d: this.forms[n].fields[r]
                                }, n)
                            } else this.addForm(t)
                        }
                    },
                    _addForm: function(e, t) {
                        dt.addForm(tt(t))
                    },
                    loadForms: function() {
                        tt("form").each(this._addForm), tt("[nls_fa_name]:not(form)").each(this._addForm)
                    },
                    handleTracking: function(e) {
                        if (1 !== e.data("nls_fa_tracked") && this.addFormElement(e), e.data("nls_fa_tracked")) return 1 !== e.data("nls_fa_tracked") || 1 === e.data("nls_fa_active")
                    },
                    addChanges: function(e, t, n) {
                        if ("add_forms" === e) void 0 === this.changes.add_forms && (this.changes.add_forms = {}), this.changes.add_forms[n] = t;
                        else if ("edit" === e) {
                            var i = M.get("Array");
                            void 0 === this.changes.edit && (this.changes.edit = {}), void 0 === this.changes.edit[n] && (this.changes.edit[n] = new i), this.changes.edit[n].push(t)
                        }
                    },
                    staggerChanges: function() {
                        var e = {},
                            t = M.get("Array");
                        for (var n in this.changes)
                            if (Object.prototype.hasOwnProperty.call(dt.changes, n))
                                if ("add_forms" === n) e.add_forms = dt.changes.add_forms;
                                else if ("edit" === n)
                            for (var i in e.edit = {}, dt.changes.edit)
                                if (Object.prototype.hasOwnProperty.call(dt.changes.edit, i)) {
                                    e.edit[i] = new t;
                                    for (var o = 0; o < dt.changes.edit[i].length; o++) {
                                        if (o + 1 !== dt.changes.edit[i].length) {
                                            var r = dt.changes.edit[i][o],
                                                a = dt.changes.edit[i][o + 1];
                                            if ("edit" === r.a && r.fip === a.fip && r.d.pn === a.d.pn) continue
                                        }
                                        e.edit[i].push(dt.changes.edit[i][o])
                                    }
                                }
                        return this.changes = {}, e
                    },
                    changeHandler: function(e) {
                        var t = st(e, "change");
                        if (t) {
                            var n = t.data("nls_fa_name"),
                                i = t.data("nls_fa_field_pos"),
                                o = dt.forms[n].fields[i].name;
                            0 < t.data("nls_fa_focus_time") && (dt.forms[n].fields[i].timeHesitation += T() - t.data("nls_fa_focus_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeHesitation",
                                    v: dt.forms[n].fields[i].timeHesitation
                                }
                            }, n), t.data("nls_fa_focus_time", 0)), 0 < t.data("nls_fa_keydown_time") && (dt.forms[n].fields[i].timeInteraction += T() - t.data("nls_fa_keydown_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeInteraction",
                                    v: dt.forms[n].fields[i].timeInteraction
                                }
                            }, n), t.data("nls_fa_keydown_time", 0)), t.data("nls_fa_mouseenter_time", 0), t.data("nls_fa_mousedown_time", 0), 1 === dt.forms[n].fields[i].filledOut && (dt.forms[n].fields[i].refilled = 1, dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "refilled",
                                    v: dt.forms[n].fields[i].refilled
                                }
                            }, n)), t.val() || 1 !== dt.forms[n].fields[i].filledOut ? t.val() && 0 === dt.forms[n].fields[i].filledOut && (dt.forms[n].fields[i].filledOut = 1, dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "filledOut",
                                    v: dt.forms[n].fields[i].filledOut
                                }
                            }, n)) : (dt.forms[n].fields[i].filledOut = 0, dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "filledOut",
                                    v: dt.forms[n].fields[i].filledOut
                                }
                            }, n))
                        }
                    },
                    blurHandler: function(e) {
                        var t = st(e, "blur");
                        if (t) {
                            var n = t.data("nls_fa_name"),
                                i = t.data("nls_fa_field_pos"),
                                o = dt.forms[n].fields[i].name;
                            0 < t.data("nls_fa_focus_time") && (dt.forms[n].fields[i].timeHesitation += T() - t.data("nls_fa_focus_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeHesitation",
                                    v: dt.forms[n].fields[i].timeHesitation
                                }
                            }, n), t.data("nls_fa_focus_time", 0)), 0 < t.data("nls_fa_keydown_time") && (dt.forms[n].fields[i].timeInteraction += T() - t.data("nls_fa_keydown_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeInteraction",
                                    v: dt.forms[n].fields[i].timeInteraction
                                }
                            }, n), t.data("nls_fa_keydown_time", 0)), t.data("nls_fa_mouseenter_time", 0), t.data("nls_fa_mousedown_time", 0)
                        }
                    },
                    focusHandler: function(e) {
                        var t = st(e, "focus");
                        if (t) {
                            var n = t.data("nls_fa_name"),
                                i = t.data("nls_fa_field_pos"),
                                o = dt.forms[n].fields[i].name;
                            0 === dt.forms[n].interacted && (dt.forms[n].interacted = 1, dt.addChanges("edit", {
                                a: "edit",
                                t: "form",
                                d: {
                                    pn: "interacted",
                                    v: 1
                                }
                            }, n)), 0 === dt.forms[n].fields[i].interacted && (dt.forms[n].fields[i].interacted = 1, dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "interacted",
                                    v: 1
                                }
                            }, n)), t.data("nls_fa_focus_time", T()), 0 < t.data("nls_fa_mouseenter_time") && (dt.forms[n].fields[i].timeHesitation += T() - t.data("nls_fa_mouseenter_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeHesitation",
                                    v: dt.forms[n].fields[i].timeHesitation
                                }
                            }, n), t.data("nls_fa_mouseenter_time", 0))
                        }
                    },
                    mouseUpHandler: function(e) {
                        var t = st(e, "mouseup");
                        if (t) {
                            var n = t.data("nls_fa_name"),
                                i = t.data("nls_fa_field_pos"),
                                o = dt.forms[n].fields[i].name;
                            0 < t.data("nls_fa_mousedown_time") && (dt.forms[n].fields[i].timeInteraction += T() - t.data("nls_fa_mousedown_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeInteraction",
                                    v: dt.forms[n].fields[i].timeInteraction
                                }
                            }, n), t.data("nls_fa_mousedown_time", 0))
                        }
                    },
                    mouseDownHandler: function(e) {
                        var t = st(e, "mousedown");
                        t && (ze.doBlurOnNode(t.get(0), dt.blurHandler.bind({}, {
                            target: ze.getFocusedNode()
                        })), t.data("nls_fa_mousedown_time", T()))
                    },
                    mouseLeaveHandler: function(e) {
                        var t = st(e, "mouseleave");
                        if (!(!t || t.isFocussed && t.isFocussed() || t.is(":focus"))) {
                            var n = t.data("nls_fa_name"),
                                i = t.data("nls_fa_field_pos"),
                                o = dt.forms[n].fields[i].name;
                            0 < t.data("nls_fa_mouseenter_time") && (dt.forms[n].fields[i].timeHesitation += T() - t.data("nls_fa_mouseenter_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeHesitation",
                                    v: dt.forms[n].fields[i].timeHesitation
                                }
                            }, n), t.data("nls_fa_mouseenter_time", 0))
                        }
                    },
                    mouseEnterHandler: function(e) {
                        var t = st(e, "mouseenter");
                        !t || t.isFocussed && t.isFocussed() || t.is(":focus") || t.data("nls_fa_mouseenter_time", T())
                    },
                    onFormSubmit: function() {
                        var e = tt(this);
                        dt.trackFormSubmission(e)
                    },
                    keyDownHandler: function(e) {
                        var t = st(e, "keydown");
                        if (t) {
                            var n = t.data("nls_fa_name"),
                                i = t.data("nls_fa_field_pos"),
                                o = dt.forms[n].fields[i].name;
                            0 < t.data("nls_fa_focus_time") && (dt.forms[n].fields[i].timeHesitation += T() - t.data("nls_fa_focus_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeHesitation",
                                    v: dt.forms[n].fields[i].timeHesitation
                                }
                            }, n), t.data("nls_fa_focus_time", 0)), 0 < t.data("nls_fa_keydown_time") && (dt.forms[n].fields[i].timeInteraction += T() - t.data("nls_fa_keydown_time"), dt.addChanges("edit", {
                                a: "edit",
                                t: "element",
                                fip: i,
                                fname: o,
                                d: {
                                    pn: "timeInteraction",
                                    v: dt.forms[n].fields[i].timeInteraction
                                }
                            }, n)), t.data("nls_fa_keydown_time", T())
                        }
                    },
                    loadFormEventListeners: function() {
                        if (window.MktoForms2 && window.MktoForms2.whenReady) {
                            var t = dt.f,
                                n = Object.keys(t).map(function(e) {
                                    return t[e]
                                }).map(function(e) {
                                    for (var t in e)
                                        if (Object.prototype.hasOwnProperty.call(e, t)) return e[t]
                                });
                            window.MktoForms2.whenReady(function(e) {
                                var t = e.getFormElem();
                                t && Object.prototype.hasOwnProperty.call(t, "0") && n.some(function(e) {
                                    return document.querySelector(e) == t[0]
                                }) && e.onSubmit(dt.onFormSubmit.bind(t[0]))
                            })
                        }
                        p.addJqEventListener(tt(document), "on", "focus", dt.focusHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "blur", dt.blurHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "change", dt.changeHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "keydown", dt.keyDownHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "mouseenter", dt.mouseEnterHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "mouseleave", dt.mouseLeaveHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "mousedown", dt.mouseDownHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "mouseup", dt.mouseUpHandler, this.formInputSelector), p.addJqEventListener(tt(document), "on", "submit", this.onFormSubmit, "form")
                    },
                    markSuccess: function(e, t) {
                        var n = tt(e),
                            i = dt.getFormName(n);
                        i && (e = dt.forms[i]) && (e.success = t, F.ftu = !0, dt.trackFormSubmission(n))
                    },
                    isFormSuccess: function(e) {
                        var t = dt.forms[e];
                        return t && (0 === t.success || !1 === t.success) ? 0 : 1
                    },
                    trackFormSubmission: function(e) {
                        if (1 !== e.data("nls_fa_tracked") && this.addForm(e), 1 !== e.data("nls_fa_tracked") || 1 === e.data("nls_fa_active")) {
                            var t = e.data("nls_fa_name");
                            if (t && dt.forms[t] && 1 !== dt.forms[t].submitted) {
                                0 === dt.forms[t].interacted && (dt.forms[t].interacted = 1, dt.addChanges("edit", {
                                    a: "edit",
                                    t: "form",
                                    d: {
                                        pn: "interacted",
                                        v: 1
                                    }
                                }, t)), dt.isFormSuccess(t) ? (dt.forms[t].submitted = 1, dt.addChanges("edit", {
                                    a: "edit",
                                    t: "form",
                                    d: {
                                        pn: "submitted",
                                        v: 1
                                    }
                                }, t)) : dt.forms[t].failed || (dt.forms[t].failed = 1, dt.addChanges("edit", {
                                    a: "edit",
                                    t: "form",
                                    d: {
                                        pn: "failed",
                                        v: 1
                                    }
                                }, t)), be.sendRecordingData();
                                for (var n = M.get("Date"), i = new n, o = i.getTime() + 300; i.getTime() < o;) i = new n
                            }
                        }
                    },
                    sendData: function() {
                        if (F.fae) {
                            var e, t, n, i, o, r = dt.lastSentForms,
                                a = dt.staggerChanges();
                            for (var s in r || (dt.lastSentForms = dt.forms), a.edit)
                                if (Object.prototype.hasOwnProperty.call(a.edit, s))
                                    for (var d in n = a.edit[s], o = dt.lastSentForms[s], n) Object.prototype.hasOwnProperty.call(n, d) && ("timeHesitation" !== (e = n[d]).d.pn && "timeInteraction" !== e.d.pn || (i = o && o.fields[e.fip] ? o.fields[e.fip][e.d.pn] : 0, (t = e.d.v - i) <= 0 || (a.edit[s][d].d.v = t)));
                            if (dt.lastSentForms = tt.extend(!0, {}, dt.forms), !tt.isEmptyObject(a)) {
                                var c = M.get("JSON"),
                                    l = {};
                                return F.analyze && (dt.f = dt.f || {}, l.f = c.stringify(dt.f), 0 === Object.keys(dt.f).length ? l.fa_changes = c.stringify(dt.f) : l.fa_changes = c.stringify(a)), l
                            }
                        }
                    },
                    init: function() {
                        be.formSubmitCallbacks.push(this.sendData.bind(this)), this.loadForms(), at || (this.loadFormEventListeners(), at = !0), this.changes = {}, et.init(dt)
                    }
                };

                function ct() {
                    var e = document.querySelectorAll("select, input, label");
                    if (e.length) {
                        var t = Fe.createEvent(document, "vwo_element_added");
                        t.data = e, Fe.dispatchEvent(document, t)
                    }
                }

                function lt(e) {
                    e && (dt._mapElements = e, ct())
                }
                F.formAnalysis = dt, F.mapElements = lt;
                var ut = window.VWO = window.VWO || [],
                    ht = window.console || {
                        log: function() {},
                        error: function() {}
                    },
                    ft = {
                        processEvent: function(t, e) {
                            try {
                                var n = t[0],
                                    i = t.slice(1),
                                    o = -1 !== n.indexOf(".");
                                if (o && 0 === n.indexOf(e) || !o) {
                                    n = "VWO." + n;
                                    var r = eval(n),
                                        a = void 0;
                                    return a = n.split("."), a.splice(-1), a = eval(a.join(".")), r ? (r.apply(a, i), 1) : 0
                                }
                                return 0
                            } catch (e) {
                                return ht.error("Error occured in VWO Process Event (" + (t && t[0]) + "): ", e), 0
                            }
                        },
                        addPushListener: function(i) {
                            var o, r = ut.push;
                            ut.push = function() {
                                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                var n = e[0];
                                return r.apply(ut, e), ut[ut.length - 1] === n && (o = ft.processEvent(n, i), ut[ut.length - 1] === n && o && ut.splice(-1)), ut.length
                            }
                        },
                        init: function(e) {
                            for (var t = 0; t < ut.length;) 1 === ft.processEvent(ut[t], e) ? ut.splice(t, 1) : t++;
                            ft.addPushListener(e)
                        }
                    },
                    mt = {
                        RECORDING_INITIATED: "rI"
                    },
                    gt = {
                        overRideInsertRule: function(i) {
                            var o = CSSStyleSheet.prototype.insertRule;
                            CSSStyleSheet.prototype.insertRule = function() {
                                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                var n = [];
                                try {
                                    o.apply(this, e)
                                } catch (e) {
                                    throw new Error(e)
                                } finally {
                                    n.push({
                                        parentSelector: b(this.ownerNode),
                                        rule: e[0],
                                        index: e[1]
                                    }), i.addMutation({
                                        time: T() - F.startTime,
                                        insertedRules: [{
                                            addedStyles: n
                                        }]
                                    })
                                }
                            }
                        },
                        processInsertRules: function() {
                            function e(e) {
                                var o = t[e];
                                [].forEach.call(o.cssRules, function(e, t) {
                                    var n = b(o.ownerNode),
                                        i = [];
                                    i.push({
                                        parentSelector: n,
                                        rule: e.cssText,
                                        index: t
                                    }), r.html.insertedRules.push({
                                        addedStyles: i
                                    })
                                })
                            }
                            for (var t = gt.getCurrentInsertedRules(), r = this, n = 0; n < t.length; n++) e(n)
                        },
                        getCurrentInsertedRules: function() {
                            var n = [];
                            return [].forEach.call(document.styleSheets, function(e) {
                                var t;
                                !e.href && e.cssRules && 0 !== e.cssRules.length && (void 0 !== e.ownerNode.innerText ? t = e.ownerNode.innerText : void 0 !== e.ownerNode.innerHTML && (t = e.ownerNode.innerHTML), (t.match(/{/g) || []).length < e.cssRules.length && n.push(e))
                            }), n
                        },
                        init: function(e) {
                            this.overRideInsertRule(e)
                        }
                    },
                    pt = {
                        BUTTON: 1,
                        A: 1,
                        INPUT: 1,
                        TEXTAREA: 1,
                        SELECT: 1,
                        OPTION: 1
                    };

                function vt() {
                    var e = M.get("Array");
                    this.nextId = 1, this.nodes = new e, this.ID_PROP = "nlsNodeId"
                }

                function wt(e) {
                    var t = M.get("Array");
                    this.target = e || document, this.mutations = new t, this.index = 0, this.stagger = !0, this.knownNodes = new vt
                }
                vt.prototype.add = function(e, t, n) {
                    var i = 0;
                    if (F.baseAdjustment.afterEl === e && (i = F.baseAdjustment.offset), this.nextId = this.nextId + i, e[this.ID_PROP] = this.nextId, (n || X.ntDdClk(e) || 1 === pt[e.nodeName && e.nodeName.toUpperCase && e.nodeName.toUpperCase()]) && (e._vwo_nd = 1, n = !0), this.nodes[this.nextId] = e, this.nextId++, t && e.childNodes.length)
                        for (var o = e.firstChild; o; o = o.nextSibling) this.add(o, !0, n);
                    return e[this.ID_PROP]
                }, vt.prototype.delete = function(e) {
                    var t = this.getId(e);
                    delete this.nodes[t], delete e[this.ID_PROP]
                }, vt.prototype.getId = function(e) {
                    return e[this.ID_PROP]
                }, vt.prototype.getNode = function(e) {
                    return this.nodes[e]
                }, F.observerCallback = function(e) {
                    F.Mutations.initialised && F.Mutations.mutationProcessing(e)
                }, wt.prototype.mutationProcessing = function(e, t) {
                    if (F.GetHtml.domTraverCompl) {
                        var n = new(M.get("Array"));
                        e.forEach(function(e) {
                            (e = this.processMutation(e)) && n.push(e)
                        }, this), n.length && this.addMutation({
                            time: t || T() - F.startTime,
                            mutations: n
                        })
                    } else F.GetHtml.tempMutations.push({
                        time: T() - F.startTime,
                        mutations: e
                    })
                }, wt.prototype.processMutation = function(e) {
                    switch (e.type) {
                        case "childList":
                            return this.processChildList(e);
                        case "attributes":
                            return this.processAttributes(e);
                        case "characterData":
                            return this.processCharacterData(e);
                        default:
                            return
                    }
                }, wt.prototype.processChildList = function(e) {
                    var t, n = M.get("Array"),
                        i = new n,
                        o = new n;
                    for (t = 0; t < e.addedNodes.length; t++) i = this.processAddedNode(e.addedNodes[t], i);
                    for (t = 0; t < e.removedNodes.length; t++) {
                        var r = e.removedNodes[t];
                        r.parentNode && r.parentElement || !this.knownNodes.getId(r) || (o.push(this.serializeNode(r)), this.knownNodes.delete(r))
                    }
                    return i.length || o.length ? {
                        type: "childList",
                        addedNodes: i,
                        removedNodes: o
                    } : null
                }, wt.prototype.processAddedNode = function(e, t) {
                    var n, i, o, r = M.get("Array");
                    if (t = t || new r, e.tagName && "form" === e.tagName.toLowerCase() && F.formAnalysis._addForm(null, e), e.tagName && ("input" === e.tagName.toLowerCase() || "select" === e.tagName.toLowerCase())) {
                        var a = Fe.createEvent(document, "vwo_element_added");
                        a.data = e, Fe.dispatchEvent(document, a)
                    }
                    var s = this.serializeNode(e);
                    s.previousSibling = this.serializeNode(e.previousSibling), "undefined" != typeof ShadowRoot && e.parentNode instanceof ShadowRoot ? (s.parentNode = this.serializeNode(e.parentNode.host), s.isFragChild = !0) : s.parentNode = this.serializeNode(e.parentNode), e.shadowRoot && (s.hasShadow = !0, on.observe(e.shadowRoot, rn)), t.push(s);
                    for (var d = e.firstChild || (null === (n = e.shadowRoot) || void 0 === n ? void 0 : n.firstChild); d; d = d.nextSibling || (null === (o = null === (i = d.parentNode) || void 0 === i ? void 0 : i.shadowRoot) || void 0 === o ? void 0 : o.firstChild)) t = this.processAddedNode(d, t);
                    return t
                }, wt.prototype.processAttributes = function(e) {
                    var t, n = e.target,
                        i = e.attributeName;
                    if (!n.parentNode) return null;
                    this.knownNodes.getId(n.parentNode) || (t = this.serializeNodeWrapper(n.parentNode));
                    var o = this.serializeNode(n);
                    return o.type = "attributes", o.name = i, t && (o.parentData = t), o.value = "value" === i || "label" === i ? X.handleProtected(n, F.Recording.anonymizeKeys, i) : n.getAttribute(i), X.shouldConsiderAnonymizingImgAttributes(i, o.value, n, F.Recording.anonymizeKeys) && (o.value = X.getAnonymizedImageAttrValue({
                        name: i,
                        value: o.value
                    }, n) || o.value), "jetzoom-blank" !== n.className && "jetzoom-lens" !== n.className || 142952 !== window._vwo_acc_id && 230507 !== window._vwo_acc_id || (o.value = "", o.name = "vwo-" + i), o
                }, wt.prototype.processCharacterData = function(e) {
                    var t = e.target;
                    if (!t.parentNode || !this.knownNodes.getId(t.parentNode)) return null;
                    var n = this.serializeNode(t);
                    return n.type = "characterData", n.textContent = X.getNodeProperty(t, t.textContent, F.Recording.anonymizeKeys, e.attributeName), n
                }, wt.prototype.serializeNode = function(e) {
                    var t = M.get("Node"),
                        n = M.get("Array");
                    if (null === e) return null;
                    F.extractLinkHrefForSnapshotting(e);
                    var i = this.knownNodes.getId(e);
                    if (i) return {
                        id: i
                    };
                    var o = {
                            nodeType: e.nodeType,
                            id: this.knownNodes.add(e)
                        },
                        r = !1;
                    switch (o.nodeType) {
                        case t.DOCUMENT_TYPE_NODE:
                            o.name = e.name, o.publicId = e.publicId, o.systemId = e.systemId;
                            break;
                        case t.COMMENT_NODE:
                        case t.TEXT_NODE:
                            o.textContent = X.getNodeProperty(e, e.textContent, F.Recording.anonymizeKeys);
                            break;
                        case t.ELEMENT_NODE:
                            o.tagName = e.tagName, o.attributes = new n;
                            for (var a = 0; a < e.attributes.length; a++) {
                                var s = e.attributes[a];
                                "value" === s.name && (r = !0);
                                var d = "value" === s.name || "label" === s.name ? X.handleProtected(e, F.Recording.anonymizeKeys, s.name) : s.value;
                                X.shouldConsiderAnonymizingImgAttributes(s.name, s.value, e, F.Recording.anonymizeKeys) && (d = X.getAnonymizedImageAttrValue(s, e)), o.attributes.push({
                                    name: s.name,
                                    value: d
                                })
                            }
                            "INPUT" !== e.tagName || r || void 0 === e.value || "" === e.value || (o.value = X.handleProtected(e, F.Recording.anonymizeKeys))
                    }
                    return o
                }, wt.prototype.serializeNodeWrapper = function(e) {
                    if (null !== e) {
                        var t = this.serializeNode(e);
                        return e.parentNode && !this.knownNodes.getId(e.parentNode) && (t.parentData = this.serializeNodeWrapper(e.parentNode)), t && t.nodeType ? t : void 0
                    }
                }, wt.prototype.addMutation = function(e) {
                    this.mutations.push(e)
                }, wt.prototype.init = function(e, t) {
                    e && wt.bind(this)();
                    var n = F.GetHtml.muts.knownNodes;
                    if ("htmlTraversal" === t || n && n.nodes && n.nodes.length) this.knownNodes.nodes = n.nodes, this.knownNodes.nextId = n.nextId, this.knownNodes.ID_PROP = n.ID_PROP;
                    else {
                        F.GetHtml.domTraverCompl = !0, this.knownNodes.add(this.target);
                        for (var i = this.target.firstChild; i; i = i.nextSibling) this.knownNodes.add(i, !0)
                    }
                    gt.init(this), this.initialised = !0
                }, F.Mutations = new wt(document);
                var yt = F.Mutations,
                    _t = 0,
                    bt = location.search.match(/.*nodes=(\d*).*/),
                    Tt = VWO._.ac && VWO._.ac.dNdOfst || 1e3,
                    Nt;
                bt && (Tt = parseInt(bt[1]));
                var Et = [HTMLDivElement],
                    St = [],
                    Ot = {
                        MAINTAIN: "maintain",
                        SET: "set"
                    },
                    Ct;

                function Rt(e) {
                    if (!e) return e;
                    var t = e.nodeName && e.nodeName.toLowerCase();
                    if ("video" === t) {
                        var n = document.createElement("__nls-video");
                        return Ct.setAttributes(n, e.attributes), n
                    }
                    if ("img" !== t) return (598297 === window._vwo_acc_id || 602845 < window._vwo_acc_id) && window.$ && window.$.fn && window.$.fn.clone && "undefined" != typeof customElements && "function" == typeof customElements.get && customElements.get(t) ? $(e).clone().get(0) : e.cloneNode(!1);
                    var i = document.createElement("img");
                    return Ct.setAttributes(i, e.attributes, Ct.getAttributeName), i
                }

                function kt(e) {
                    delete e.parentData, delete e.noDeadEnabled, delete e.shouldAnonymizeContent, delete e.whiteListedElementFound
                }

                function At(e) {
                    if (e === Ot.MAINTAIN) {
                        for (var t = 0; t < Et.length; t++) St.push(Et[t].prototype.addEventListener), Et[t].prototype.addEventListener = function() {};
                        window.$ && window.$.fn && (Nt = window.$.fn.click, window.$.fn.click = function() {})
                    } else if (e === Ot.SET) {
                        window.$ && window.$.fn && Nt && (window.$.fn.click = Nt);
                        for (t = 0; t < Et.length; t++) Et[t].prototype.addEventListener = St[t];
                        St = []
                    }
                }

                function Dt(e, t) {
                    try {
                        t = Ct.add(e, t)
                    } catch (e) {
                        if (window.VWO._.customError) {
                            var n = e && e.stack || e + ".";
                            window.VWO._.customError({
                                msg: "DomConfig serializeNode : " + (Ct.serializeNode, !0) + ". Html Data on DomConfig: " + (Ct.html, !0) + ". " + n,
                                url: document.URL,
                                lineno: 131,
                                colno: 29,
                                source: "dIA"
                            })
                        }
                    }
                    return t
                }

                function It(e, l, u, h, f, m, g) {
                    var p, v, w, y, _, b, T, N, E, S, O, C, R, k, A, D, I = e;
                    if (_t++, !e) return e;
                    var P = Ct;
                    Ct.offset = Tt;

                    function t() {
                        var e = M.get("Node");
                        if ((null != I && I.shadowRoot || "TEMPLATE" === I.tagName) && !I.childNodes.length) {
                            var t = document.createComment("Comment of VWO");
                            I.appendChild(t)
                        }
                        u = Dt(I, u), At(Ot.MAINTAIN), L = Rt(I), At(Ot.SET);
                        var o = M.get("Array"),
                            n = void 0;
                        if (l = l || "body" === I.nodeName.toLowerCase()) {
                            var i = Ct.handleTextNodes(L, I);
                            i && !i.nodeType ? n = Ct.serializeNode(i.newCommentNode, m, g, void 0, I) : L = i
                        }
                        var r = Ct.serializeNode(L, m, g, I === document.doctype, I),
                            a = r && r.data;
                        if (null === a) return {
                            value: null
                        };
                        if (a.parentData = f, (null == I ? void 0 : I.parentNode) instanceof DocumentFragment && (a.isFragChild = !0), n && a.parentData.childNodes.push(n.data), m = r.shouldAnonymizeContent, g = r.whiteListedElementFound, a.noDeadEnabled = u, a.shouldAnonymizeContent = m, a.whiteListedElementFound = g, I.childNodes.length) {
                            if (a.childNodes = new o, I = I.firstChild, f = a, _t % Tt == 0) return setTimeout(function() {
                                It(I, l, u, h, f, m, g)
                            }, 0), x = "false", "break";
                            if ("false" == (x = It(I, l, u, h, f, m, g)) || "end" == x) return "break"
                        }
                        for (var s = "", d = I; d; d = (null === (p = null == d ? void 0 : d.parentNode) || void 0 === p ? void 0 : p.nodeType) === e.DOCUMENT_FRAGMENT_NODE ? "undefined" != typeof ShadowRoot && (null == d ? void 0 : d.parentNode) instanceof ShadowRoot ? null === (v = null == d ? void 0 : d.parentNode) || void 0 === v ? void 0 : v.host : null === (w = null == d ? void 0 : d.parentNode) || void 0 === w ? void 0 : w.predecessor : null == d ? void 0 : d.parentNode) {
                            a.parentData && a.parentData.childNodes && a.parentData.childNodes.push(a);
                            var c = a;
                            if (d.nextSibling) {
                                s = d.nextSibling, m = a.parentData.shouldAnonymizeContent, g = a.parentData.whiteListedElementFound, kt(c);
                                break
                            }
                            if ("TEMPLATE" === (null === (y = d.parentNode) || void 0 === y ? void 0 : y.tagName) && null !== (b = null === (_ = d.parentNode) || void 0 === _ ? void 0 : _.content) && void 0 !== b && b.firstChild) {
                                s = null === (N = null === (T = d.parentNode) || void 0 === T ? void 0 : T.content) || void 0 === N ? void 0 : N.firstChild, d.parentNode.content.predecessor = d.parentNode, a.parentData.hasFragment = !0, m = a.parentData.shouldAnonymizeContent, g = a.parentData.whiteListedElementFound, kt(c);
                                break
                            }
                            if (null !== (E = d.parentNode) && void 0 !== E && E.shadowRoot && null !== (O = null === (S = d.parentNode) || void 0 === S ? void 0 : S.shadowRoot) && void 0 !== O && O.firstChild) {
                                u = Dt(d.parentNode.shadowRoot, u), on.observe(d.parentNode.shadowRoot, rn), s = null === (R = null === (C = d.parentNode) || void 0 === C ? void 0 : C.shadowRoot) || void 0 === R ? void 0 : R.firstChild, a.parentData.hasShadow = !0, a.parentData.constructedSheets = new o, null !== (D = null === (A = null === (k = d.parentNode) || void 0 === k ? void 0 : k.shadowRoot) || void 0 === A ? void 0 : A.adoptedStyleSheets) && void 0 !== D && D.forEach(function(e) {
                                    for (var t, n = new o, i = 0; i < e.cssRules.length; i++) n.push(null === (t = e.cssRules[i]) || void 0 === t ? void 0 : t.cssText);
                                    a.parentData.constructedSheets.push(n)
                                }), m = a.parentData.shouldAnonymizeContent, g = a.parentData.whiteListedElementFound, kt(c);
                                break
                            }
                            d === document ? P = a : (a = a.parentData, f = a.parentData, u = a.parentData.noDeadEnabled, m = a.parentData.shouldAnonymizeContent, g = a.parentData.whiteListedElementFound), kt(c)
                        }
                        return (I = s) ? void 0 : (x = "endComplete", "break")
                    }
                    for (var L, x = ""; I;) {
                        var n = t();
                        if ("object" == typeof n) return n.value;
                        if ("break" === n) break
                    }
                    return "endComplete" === x ? (setTimeout(function() {
                        h(P)
                    }, 0), "end") : x
                }

                function Pt(e, t, n, f) {
                    var m = !!(Ct = t).headEl,
                        g = !!Ct.bodyEl,
                        p = !1;
                    Ct.domTraverCompl = !1, yt.init(n, "htmlTraversal");
                    var v = Ct;
                    setTimeout(function() {
                        It(e, void 0, void 0, function(e) {
                            if (Ct = v, e && e.childNodes) {
                                for (var t = e.childNodes, n = 0; n < t.length; n++) {
                                    var i = Ct.html.html.present,
                                        o = Ct.html.doctype.present,
                                        r = t[n],
                                        a = r.tagName && "html" === r.tagName.toLowerCase();
                                    if (i) Ct.html.afterHtml.push(t[n]), Ct.html.afterHtml.reverse();
                                    else if ("doctype" === t[n].elem) Ct.html.doctype.present = !0, Ct.html.doctype.name = document.doctype.name, Ct.html.doctype.publicId = Ct.doctype.publicId, Ct.html.doctype.systemId = Ct.doctype.systemId, p = !0;
                                    else if (a) {
                                        for (var s = 0; s < r.childNodes.length; s++) {
                                            var d = r.childNodes[s].tagName,
                                                c = d && d.toLowerCase(),
                                                l = r.childNodes[s],
                                                u = Ct.html.body.present,
                                                h = Ct.html.head.present;
                                            g && u ? (Ct.html.afterBody.push(l), Ct.html.afterBody.reverse()) : m && !h && "head" !== c ? Ct.html.beforeHead.push(l) : !g || m && !h || "body" === c ? "head" !== c && "body" !== c || (Ct.html[c].nodes = l, Ct.html[c].attributes = Ct.html[c].nodes.attributes, Ct.html[c].present = !0) : Ct.html.beforeBody.push(l)
                                        }
                                        delete r.childNodes, Ct.html.html = r, Ct.html.html.present = !0
                                    } else i || (o || !p ? Ct.html.beforeHtml.push(t[n]) : o || Ct.html.beforeDoctype.push(t[n]))
                                }
                                f(!0)
                            }
                        }, {})
                    }, 0)
                }
                var Lt = d,
                    xt = {
                        BUTTON: 1,
                        A: 1,
                        INPUT: 1,
                        TEXTAREA: 1,
                        SELECT: 1,
                        OPTION: 1
                    };

                function Mt(n, e, i) {
                    var o;
                    i = i || function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return e[0]
                    }, Lt.each(e, function(e, t) {
                        o = i(t.name);
                        try {
                            n.setAttribute(o, t.value)
                        } catch (e) {}
                    })
                }

                function Ht(e) {
                    switch (e) {
                        case "src":
                            e = "__nls-src";
                            break;
                        case "srcset":
                            e = "__nls-srcset"
                    }
                    return e
                }

                function Wt() {
                    this.doctype = {}, this.htmlEl = {}, this.headEl = {}, this.bodyEl = {};
                    var e = M.get("Array"),
                        t = window._vwo_code;
                    this.html = {
                        version: 3,
                        timedout: t && t.lT ? 1 : t && t.sT ? 2 : 0,
                        idleToAction: F.saveNewRecordingInitiatedOnce,
                        beforeDoctype: new e,
                        insertedRules: new e,
                        doctype: {
                            present: !1,
                            name: "",
                            publicId: "",
                            systemId: ""
                        },
                        beforeHtml: new e,
                        html: {
                            present: !1,
                            attributes: {}
                        },
                        beforeHead: new e,
                        head: {
                            present: !1,
                            attributes: {},
                            html: ""
                        },
                        beforeBody: new e,
                        body: {
                            present: !1,
                            attributes: {},
                            html: ""
                        },
                        afterBody: new e,
                        afterHtml: new e
                    }, this.muts = {
                        knownNodes: {
                            nextId: 1,
                            nodes: new e,
                            ID_PROP: "nlsNodeId",
                            noDeadEnabled: !1
                        }
                    }, this.tempNextId = -1, this.tempNodes = [], this.tempMutations = new e, this.setAttributes = Mt, this.getAttributeName = Ht
                }
                Wt.prototype.processMutsOccrdPrvsly = function() {
                    var e = this.tempMutations;
                    if (F.Mutations.knownNodes.nextId = this.muts.knownNodes.nextId, e.length)
                        for (var t = 0; t < e.length; t++) F.Mutations.mutationProcessing(e[t].mutations, e[t].time)
                }, Wt.prototype.add = function(e, t) {
                    var n = 0;
                    F.baseAdjustment.afterEl === e && (n = F.baseAdjustment.offset);
                    var i = this.muts.knownNodes;
                    return i.nextId = i.nextId + n, e[i.ID_PROP] = i.nextId, (t || X.ntDdClk(e) || 1 === xt[e.nodeName && e.nodeName.toUpperCase && e.nodeName.toUpperCase()]) && (e._vwo_nd = 1, t = !0), i.nodes[i.nextId] = e, i.nextId++, t
                }, Wt.prototype.serializeNode = function(e, t, n, i, o) {
                    var r = {
                            data: {},
                            shouldAnonymizeContent: t,
                            whiteListedElementFound: n
                        },
                        a = M.get("Node");
                    if (null === e) return null;
                    var s = {
                        nodeType: e.nodeType
                    };
                    switch (F.extractLinkHrefForSnapshotting(e), s.nodeType) {
                        case a.COMMENT_NODE:
                        case a.TEXT_NODE:
                            s.textContent = e.textContent, (r.shouldAnonymizeContent = t) && s.textContent && s.textContent.trim() && (s.textContent = X.getMaskedValue(s.textContent));
                            break;
                        case a.ELEMENT_NODE:
                            X.isElementWhitelisted(o) ? n = !(t = !1) : !n && X.isElementBlacklisted(o, F.Recording.anonymizeKeys) && (t = !0), s.tagName = e.tagName, s.attributes = {};
                            for (var d = 0; d < e.attributes.length; d++) {
                                var c = e.attributes[d];
                                if ("OPTION" === e.tagName || "INPUT" === e.tagName) {
                                    if ("value" === c.name)(l = vwo_$(e, this.bodyEl)).attr("value", X.handleProtected(o, F.Recording.anonymizeKeys)), e.attributes[d].value = l.attr("value");
                                    if ("label" === c.name)(l = vwo_$(e, this.bodyEl)).attr("label", X.handleProtected(o, F.Recording.anonymizeKeys, "label")), e.attributes[d].value = l.attr("label")
                                }
                                X.shouldConsiderAnonymizingImgAttributes(c.name, c.value, e, F.Recording.anonymizeKeys) && (e.attributes[d].value = X.getAnonymizedImageAttrValue(c, o)), s.attributes[c.name] = c.value
                            }
                            var l;
                            if ("INPUT" === e.tagName && void 0 === s.attributes.value && void 0 !== e.value && "" !== e.value)(l = vwo_$(e, this.bodyEl)).attr("value", X.handleProtected(o, F.Recording.anonymizeKeys)), s.value = l.attr("value");
                            r.shouldAnonymizeContent = t, r.whiteListedElementFound = n
                    }
                    return r.data = s, i && (r.data.elem = "doctype"), r
                }, Wt.prototype.handleBaseElement = function() {
                    for (var e, t = document.getElementsByTagName("base"), n = 0; n < t.length; n++)
                        if ((e = t[n]).hasAttribute("href")) {
                            var i = e.getAttribute("href");
                            null != i && (this.html.base = 1)
                        }
                    this.html.base ? F.baseAdjustment = {
                        offset: 0
                    } : this.headEl ? F.baseAdjustment = {
                        offset: 1,
                        afterEl: this.headEl.childNodes[0]
                    } : F.baseAdjustment = {
                        offset: 2,
                        afterEl: this.bodyEl
                    }
                }, Wt.prototype.handleTextNodes = function(e, t) {
                    var n = M.get("Node");
                    if (e.nodeType === n.TEXT_NODE && "" === e.textContent) {
                        if (t.previousSibling && "" === t.previousSibling.textContent) return e;
                        e = document.createComment("!!-nlsTN-!!")
                    } else if (e.nodeType === n.TEXT_NODE && t.previousSibling && t.previousSibling.nodeType === n.TEXT_NODE && "" !== t.previousSibling.textContent) return {
                        nodeRet: e,
                        newCommentNode: document.createComment("!!-nlsCN-!!")
                    };
                    return e
                }, Wt.prototype.processBaseElement = function() {
                    this.handleBaseElement()
                }, Wt.prototype.init = function(e, t) {
                    e && Wt.bind(this)(), F && (F.startTime = T()), this.doctype = document.doctype, this.htmlEl = document.getElementsByTagName("html")[0], this.headEl = document.getElementsByTagName("head")[0], this.bodyEl = document.getElementsByTagName("body")[0], this.headEl && this.handleBaseElement(), gt.processInsertRules.call(this), Pt(document, this, e, t)
                }, F.GetHtml = new Wt, F.GetHtml.__ = 1;
                var Vt = F.GetHtml,
                    zt = {
                        INIT: "nls.init"
                    },
                    Ft = d;

                function jt() {
                    F.recordingData.totals.touches++
                }

                function Yt() {
                    F.recordingData.totals.keyPresses++
                }

                function Xt(e) {
                    "HTML" !== e.target.nodeName && F.recordingData.totals.clicks++
                }

                function Ut(e) {
                    var t = e.target.nodeName,
                        n = e.pageX,
                        i = e.pageY;
                    "HTML" !== t && (F.recordingData.mouse.lastMove.docX === n && F.recordingData.mouse.lastMove.docY === i || (F.recordingData.totals.movements++, F.recordingData.mouse.lastMove.docX = n, F.recordingData.mouse.lastMove.docY = i))
                }
                var qt = _(be.sendRecordingData.bind(be), 100);

                function Bt() {
                    var e = F.getScrollPercentage();
                    e > F.recordingData.totals.scroll && 0 < e && (F.recordingData.totals.scroll = e, qt())
                }

                function Jt() {
                    p.addJqEventListener(Ft(window), "on", "scroll", Bt), p.addEventListener(document, "mouseup", Xt), p.addEventListener(document, "keyup", Yt), p.addEventListener(document, "mousemove", Ut), p.addEventListener(document, "touchstart", jt)
                }
                var Kt = {
                    init: Jt,
                    __: 1
                };
                F.EventListeners = Kt, Kt.__ = 1;
                var $t = function() {
                        var e = O.get("nlssid" + F.ids.account);
                        e ? (F.ids.session = parseInt(e, 10), F.returnVisitor = !0) : (F.ids.session = window._vwo_pa.sId, O.create("nlssid" + F.ids.account, F.ids.session, null, F.getCookieDomain()), F.returnVisitor = !1)
                    },
                    Gt = function() {
                        var e = parseInt(O.get("nlsrid" + F.ids.account), 10);
                        e = isNaN(e) ? 1 : e + 1, F.ids.recording = e, O.create("nlsrid" + F.ids.account, e, 365, F.getCookieDomain())
                    },
                    Qt = !1,
                    Zt = function() {
                        var e = navigator.userAgent.toLowerCase();
                        return -1 !== e.indexOf("msie") && parseInt(e.split("msie")[1], 10)
                    },
                    en = function() {
                        var e = {},
                            t = F.tags.eTags.get(),
                            n = M.get("JSON"),
                            i = {
                                f: F.tags.eTagsV2.f.get(),
                                r: F.tags.eTagsV2.r.get(),
                                h: F.tags.eTagsV2.h.get()
                            },
                            o = F.tags.uTags.get();
                        return t && (e.eTags = n.stringify(t)), (i.f || i.r || i.h) && (e.eTagsV2 = n.stringify(i)), o && (e.uTags = n.stringify(o)), e
                    };
                F.getTags = en;
                var tn = function(n, i) {
                        function e(e) {
                            for (var t in Qt || (F.EventListeners.init(), Qt = !0), be.formSubmitCallbacks.push(en), n) Object.prototype.hasOwnProperty.call(n, t) && F[n[t]].init(i);
                            e && (F.GetHtml.domTraverCompl = !0, F.GetHtml.processMutsOccrdPrvsly()), F.triggerLibEvent(zt.INIT), setTimeout(function() {
                                be.saveNewRecording(function() {
                                    F.saveNewRecordingInitiatedOnce = !0, F.sRD = F.sRD || _(be.sendRecordingData.bind(be), F.cDT);
                                    var e = setInterval(F.sRD, F.heartBeatFrequency);
                                    p.pushTimers(e, "interval"), F.htmlRequestSuccess = !0
                                })
                            }, 0), re.isRequestQueueable() && setInterval(re.deQueueRequest, 1e3)
                        }
                        /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent) || (F.ids.session || ($t(), Gt()), void 0 !== F.ids.session && void 0 !== F.returnVisitor && (Zt() ? (n.push("Mutations"), e(!1)) : F.GetHtml.init(i, e)))
                    },
                    nn = {
                        init: tn
                    },
                    on, rn = {
                        childList: !0,
                        attributes: !0,
                        characterData: !0,
                        subtree: !0
                    },
                    an = d;
                Vt.__ = 1;
                var sn = window._vwo_exp || {},
                    dn = window._vwo_exp_ids || [],
                    cn = "ANALYZE_HEATMAP",
                    ln = "ANALYZE_RECORDING",
                    un = "ANALYZE_FORM",
                    hn = {},
                    fn = window.VWO,
                    mn = fn.data && fn.data.mrp || 20,
                    gn, pn = !0,
                    vn = !1,
                    wn = !1,
                    yn = !1,
                    _n = !1;
                fn._.customEvent = fn._.customEvent || function() {};
                var bn = function() {
                        for (var e in fn._) {
                            if (Object.prototype.hasOwnProperty.call(fn._, e) && "function" == typeof fn._[e])
                                if (0 <= fn._[e].toString().indexOf('unshift(["jI"]')) return fn._[e]
                        }
                    },
                    Tn = fn._.triggerEvent || bn() || function() {};
                hn[un] = "fe", hn[cn] = "he", hn[ln] = "re";
                var Nn = function(e) {
                        return window._vwo_pa = window._vwo_pa || {}, !(!window._vwo_pa || !window._vwo_pa[e] || 1 !== window._vwo_pa[e].r && 1 !== window._vwo_pa[e].fae && 1 !== window._vwo_pa[e].hs)
                    },
                    En = function(e) {
                        if (sn[e]) {
                            var t = sn[e].type;
                            return 0 <= [cn, ln].indexOf(t) ? (sn[e].main && (F.hs = F.hs || t === cn, F.r = F.r || t === ln), !0) : t === un && (F.fae = !0)
                        }
                    },
                    Sn = function() {
                        for (var e, t = dn.length; t--;)
                            if (e = sn[dn[t]].type, 0 <= [cn, ln, un].indexOf(e)) return !0;
                        return !1
                    },
                    On = function() {
                        F.stopRecording = F.enums.formAnalysis.PERMANENT_STATE
                    },
                    Cn = function(e, t, n, i, o) {
                        var r = O.get("nlssid" + F.ids.account);
                        if (!Sn() && r) F.ids.session = parseInt(r, 10), F.ids.recording = parseInt(O.get("nlsrid" + F.ids.account) || 1, 10), F.returnVisitor = !0;
                        else {
                            var a = o || t;
                            if (mn < a) return void On();
                            i && (F.stopRecording = ""), F.ids.session = e, F.ids.recording = a, F.returnVisitor = n, F.newSession = !!i, wn = !0, yn || gn(), pn && r && (O.erase("nlssid" + F.ids.account, F.getCookieDomain()), O.erase("nlsrid" + F.ids.account, F.getCookieDomain())), pn = !1, n && F.saveNewRecordingInitiatedOnce && be.saveNewRecording()
                        }
                    },
                    Rn = function() {
                        F.ready = !1, F.r = !1, F.hs = !1, F.fae = !1, F.resetTagOnUC(), F.ids.experiment = {}, wn = !1, F.saveNewRecordingInitiatedOnce = !1, yn = !1, F.htmlRequestSuccess = !1, F.Recording.resetData(), F.ids.re = {}, F.formAnalysis && (F.formAnalysis.f = {}), F.ids.he = {}, F.ids.fe = {}
                    },
                    kn = function(e) {
                        var t, n, i, o, r = e[0];
                        if ("rH" === r || "vS" === r) {
                            if (t = e[1], n = +e[2] || 1, i = En(t), !F.ids.experiment[t] && (Nn(t) || i))
                                if (i)
                                    if (o = sn[t].type, sn[t].main || o === un) F.ids[hn[o]][t] = X.getUUID(), F.ready = !0, F.analyze = !0, o === un ? (F.tags.eTags.add(t, n), F.tags.eTagsV2.f.add(t)) : o === ln && (F.Recording.anonymizeKeys = void 0 !== sn[t].aK ? sn[t].aK : F.Recording.anonymizeKeys, F.Recording.bl = sn[t].bl, F.Recording.wl = sn[t].wl), yn || gn();
                                    else switch (F.tags.eTags.add(t, n), o) {
                                        case cn:
                                            F.tags.eTagsV2.h.add(t);
                                            break;
                                        case ln:
                                            F.tags.eTagsV2.r.add(t)
                                    } else F.Recording.anonymizeKeys = F.Recording.anonymizeKeys || window._vwo_pa[t].aK, F.fae = F.fae || window._vwo_pa[t].fae, F.hs = F.hs || window._vwo_pa[t].hs, F.r = F.r || window._vwo_pa[t].r, F.ids.experiment[t] = X.getUUID(), F.ready = !0, yn || gn()
                        } else "tSC" === r ? Cn(e[1], e[2], e[3], e[4], e[5]) : "tSE" === r ? On() : "uC" === r && (be.sendRecordingData(!1, F.Recording && F.Recording.currentUrl), Rn())
                    },
                    An = function(e) {
                        an.each(e, function(e, t) {
                            kn(t)
                        })
                    },
                    Dn = function() {
                        window._vwo_evq = window._vwo_evq || [], An(window._vwo_evq);
                        var n = window._vwo_evq.push,
                            i = window._vwo_evq.unshift;
                        window._vwo_evq.push = function() {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            return kn(e[0]), n.apply(window._vwo_evq, e)
                        }, window._vwo_evq.unshift = function() {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            return kn(e[0]), i.apply(window._vwo_evq, e)
                        }
                    },
                    In = function() {
                        return window.Worker && window.URL && window.Blob
                    },
                    Pn = function() {
                        return !!F.ready && (!(F.analyze && !wn) && (!!F.faultyWorker || !!In() && !!F.workerUrl))
                    };

                function Ln(e) {
                    F.observerCallback(e)
                }

                function xn() {
                    if (!F.__mutObserverAtcd) {
                        F.__mutObserverAtcd = 1;
                        var e = void 0;
                        if ("undefined" != typeof MutationObserver ? e = MutationObserver : "undefined" != typeof WebKitMutationObserver && (e = window.WebKitMutationObserver), !e) return;
                        (on = new e(Ln.bind(this))).observe(document, rn), window.addEventListener("beforeunload", function() {
                            on.disconnect()
                        })
                    }
                }
                var Mn = function(e) {
                        xn(), !yn && Pn() && _n && (yn = !0, F.ready && F.r && Tn(mt.RECORDING_INITIATED), nn.init(e, vn), vn = !0)
                    },
                    Hn = function(n) {
                        gn = _(function() {
                            Mn(n)
                        }, 50), Dn();
                        var e = window._vwo_worker_cb,
                            t = e ? "-" + e : "";
                        if (!fn.nls) {
                            fn.nls = F;
                            var i = window._vwo_worker_url || "https://dev.visualwebsiteoptimizer.com/analysis/worker" + t + ".js";
                            In() && an.ajax({
                                url: i,
                                dataType: "text",
                                success: function(e) {
                                    try {
                                        var t = new window.Blob([e], {
                                            type: "text/javascript"
                                        });
                                        F.workerUrl = window.URL.createObjectURL(t)
                                    } catch (e) {
                                        F.faultyWorker = !0
                                    }
                                    Mn(n)
                                }
                            }), an(document).ready(function() {
                                setTimeout(function() {
                                    _n = !0, Mn(n), ft.init("nls")
                                }, 500)
                            }), window._vwo_evq = window._vwo_evq || [], F.ajax = ne;
                            var o = R.get("JSON");
                            try {
                                var r = window.localStorage;
                                if (329635 === window._vwo_acc_id || 583e3 < window._vwo_acc_id) {
                                    var a = r.getItem(re.localStorageKey) || o.stringify([]);
                                    r.setItem(re.localStorageKey, a)
                                }
                            } catch (e) {
                                window.console.info(e)
                            }
                            return window.__nls = F
                        }
                    },
                    Wn = Object.freeze({
                        __proto__: null,
                        get mutationObserver() {
                            return on
                        },
                        mutationConfig: rn,
                        init: Hn
                    });
                He.__es6hack = 1, dt.__es6hack = 1, Hn(["Recording", "formAnalysis"])
            }()
    })
}();