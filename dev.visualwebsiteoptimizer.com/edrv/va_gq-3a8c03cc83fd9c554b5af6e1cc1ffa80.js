// This file uses references and method signatures that can be found in jquery.js and cash.js.
// Copyright JS Foundation and other contributors, https://js.foundation/
// Copyright (c) 2014-present Ken Wheeler
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//  * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
//  * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
//  * permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  *
//  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
//  * Software.
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//  * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
//  * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
(function() {
    "use strict";
    var e, t, n, i, o, r, s;
    window.VWO = window.VWO || [], window.VWO.v = "7.0", window.VWO.v_e = "079e9384", window.VWO.modules = {
            vwoUtils: {
                cookies: {}
            },
            utils: {},
            tags: {},
            phoenixPlugins: {
                events: {
                    predefinedEvents: {}
                }
            },
            otherLibDeps: {}
        },
        function(e) {
            e.DOM = "vwo_dom"
        }(e || (e = {})),
        function(e) {
            e.WILD_CARD = "*", e.TRIGGER = "trigger", e.POST_INIT = "post-init", e.TIMER = "vwo_timer"
        }(t || (t = {})),
        function(e) {
            e.URL_CHANGE = "vwo_urlChange", e.LEAVE_INTENT = "vwo_leaveIntent", e.CLICK_EVENT = "vwo_dom_click", e.SUBMIT_EVENT = "vwo_dom_submit"
        }(n || (n = {})),
        function(e) {
            e.PAGE_VIEW = "vwo_pageView"
        }(i || (i = {})),
        function(e) {
            e.EXIT_CONDITIONS = "__exitConditions"
        }(o || (o = {})),
        function(e) {
            e.DOM_CONTENT_LOADED = "DOMContentLoaded", e.SCROLL = "scroll", e.CLICK = "click", e.SUBMIT = "submit"
        }(r || (r = {})),
        function(e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARN = 2] = "WARN", e[e.ERROR = 3] = "ERROR"
        }(s || (s = {}));
    class a {
        constructor(e) {
            this.setLevel(e)
        }
        setLevel(e = "warn") {
            this.logLevel = s[e.toUpperCase()]
        }
        info(e, t = {}) {
            this.customLog(s.INFO, e, t)
        }
        debug(e, t = {}) {
            this.customLog(s.DEBUG, e, t)
        }
        warn(e, t = {}) {
            var n, i;
            this.customLog(s.WARN, e, t, null === (i = null === (n = window.VWO) || void 0 === n ? void 0 : n._) || void 0 === i ? void 0 : i.customError)
        }
        error(e, t = {}) {
            var n, i;
            this.customLog(s.ERROR, e, t, null === (i = null === (n = window.VWO) || void 0 === n ? void 0 : n._) || void 0 === i ? void 0 : i.customError)
        }
        customLog(e, t, n, i = null) {
            var o, r, s;
            if (e >= this.logLevel) {
                const a = this.formatMessage(e, t, n);
                null === (s = null === (r = null === (o = window.VWOEvents) || void 0 === o ? void 0 : o.store) || void 0 === r ? void 0 : r.actions) || void 0 === s || s.addLogsForDebugging(a), i ? i(a) : this.consoleLog(e, [a])
            }
        }
        consoleLog(e, t) {
            switch (e) {
                case s.INFO:
                    console.info(...t);
                    break;
                case s.WARN:
                    console.warn(...t);
                    break;
                case s.ERROR:
                    console.error(...t);
                    break;
                default:
                    console.log(...t)
            }
        }
        formatMessage(t, n, i) {
            var o, a;
            const c = Object.keys(i).reduce(((e, t) => e.replace(new RegExp(`{{${t}}}`, "g"), i[t])), n),
                l = `${e.DOM}_`;
            let u = i;
            const d = (null === (o = i.data) || void 0 === o ? void 0 : o.vwoEventName) || i.vwoEventName;
            return d !== l + r.CLICK && d !== l + r.SUBMIT || (u = i.data ? null === (a = i.data) || void 0 === a ? void 0 : a.props : u.props, u = u || {
                name: d
            }), `VWO: [${s[t].toUpperCase()}] [${(new Date).toUTCString()}] ${c} ${JSON.stringify(u)}`
        }
    }
    var c = new a("warn");
    const {
        toString: l
    } = Object.prototype;

    function u(e) {
        return "[object Object]" === l.call(e)
    }

    function d(e) {
        return "[object Array]" === l.call(e)
    }

    function g(e) {
        return "[object Null]" === l.call(e)
    }

    function h(e) {
        return "[object Undefined]" === l.call(e)
    }

    function p(e) {
        return !h(e) && !g(e)
    }

    function v(e) {
        return "[object String]" === l.call(e)
    }

    function w(e) {
        return "[object Boolean]" === l.call(e)
    }

    function f(e) {
        return "[object Function]" === l.call(e)
    }

    function _(e) {
        return "[object AsyncFunction]" === l.call(e)
    }
    class E {
        mergeNestedObjects(...e) {
            return e.reduce(((e, t) => this.recursivelyMerge(e, t)))
        }
        createNestedObjects(e, t) {
            let n = e;
            return t && t.split(".").forEach((e => {
                Object.prototype.hasOwnProperty.call(n, e) || (n[e] = {}), n = n[e]
            })), n
        }
        clearNestedObject(e, t) {
            let n = e;
            const i = t.split("."),
                o = i[i.length - 1];
            for (let e = 0; e < i.length - 1; e++) n = n[i[e]];
            u(n[o]) ? n[o] = {} : delete n[o]
        }
        recursivelyMerge(e, t, n = {}) {
            if (u(e) && u(t)) {
                const i = {};
                Object.keys(e).concat(Object.keys(t)).forEach((e => {
                    i[e] = 1
                }));
                const o = Object.getOwnPropertyDescriptors(e),
                    r = Object.getOwnPropertyDescriptors(t);
                return Object.keys(i).forEach((i => {
                    r[i] ? Object.defineProperty(n, i, r[i]) : Object.defineProperty(n, i, o[i]), this.recursivelyMerge(e[i], t[i], n[i])
                })), n
            }
            return t || e
        }
    }
    var m = new E;
    const S = window.performance || window.workerThread.performance,
        O = {
            mark: (e = "") => {
                e = "vwo-" + e, S.mark && S.mark(e)
            },
            measure: (e, t, n) => {
                t = "vwo-" + t, n = "vwo-" + n;
                try {
                    S.measure && S.measure(e, t, n)
                } catch (e) {
                    c.debug(e)
                }
            }
        },
        T = function(...e) {
            window.fetcher.getValue("VWO._.triggerEvent", e)
        };
    var y = {
            PARSE_TLD: "pTLD"
        },
        C = ["co", "org", "com", "net", "edu", "au", "ac"];

    function I(e) {
        var t, n = e.split("."),
            i = n.length,
            o = n[i - 2];
        return o && C.includes(o) ? (t = n[i - 3] + "." + o + "." + n[i - 1], T(y.PARSE_TLD, e, t), t) : (t = o + "." + n[i - 1], T(y.PARSE_TLD, e, t), t)
    }
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    function N(e, t, n, i) {
        return new(n || (n = Promise))((function(o, r) {
            function s(e) {
                try {
                    c(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    c(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function c(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(s, a)
            }
            c((i = i.apply(e, t || [])).next())
        }))
    }
    const A = {
        SET_COOKIE: "sC",
        GET_COOKIE: "gC",
        ERASE_COOKIE: "eC",
        SET_THIRD_PARTY_COOKIE: "sTPC",
        SET_THIRD_PARTY_COOKIE_ERROR: "sTPCE"
    };
    window._vwo_evq = window._vwo_evq || [];
    var b = "jI",
        R = window._vwo_evq;
    const L = window._vwo_ev = window._vwo_ev || function(...e) {
        if (!e[0]) throw new Error("Invalid Event:" + e[0]);
        e[0] !== b ? R.push([].slice.call(arguments)) : R.unshift([b])
    };
    window.VWO._.triggerEvent = window._vwo_ev;
    const V = {
        get: e => {
            try {
                return window.localStorage.getItem(e)
            } catch (e) {
                return !1
            }
        },
        set: (e, t) => {
            try {
                const n = window.localStorage;
                return window.VWO._.isWorkerThread ? n.setItem(e, t) : n._setItem(e, t)
            } catch (e) {
                return !1
            }
        },
        remove: e => {
            try {
                const t = window.localStorage;
                return window.VWO._.isWorkerThread ? t.removeItem(e) : t._removeItem(e)
            } catch (e) {
                return !1
            }
        }
    };
    let x;

    function U(e) {
        x = e
    }

    function D(e) {
        window.VWO = null != e ? e : x
    }
    const k = window.VWO._ && window.VWO._.customError || function() {},
        P = window.encodeURIComponent,
        W = window.decodeURIComponent,
        M = function(e) {
            return btoa && x._.ac && x._.ac.bsECJ ? btoa(e) : P(e)
        },
        G = function(e) {
            if (atob) try {
                return atob(e)
            } catch (e) {}
            return W(e)
        },
        $ = V.set,
        F = V.get,
        j = window.clearTimeout,
        H = window.setTimeout,
        B = Math.floor,
        K = Math.pow,
        Y = "~",
        q = "(",
        J = ")",
        X = "_vis_opt_",
        z = "_vwo_",
        Q = "_vis_",
        Z = 864e5,
        ee = {
            [X + "out"]: 0,
            [X + "exp_*_combi"]: 10,
            [X + "exp_*_combi_choose"]: 11,
            [X + "exp_*_goal_*"]: 12,
            [X + "exp_*_exclude"]: 13,
            [X + "exp_*_split"]: 14,
            [X + "test_cookie"]: 20,
            [X + "s"]: 21,
            [z + "ds"]: 22,
            [z + "sn"]: 23,
            [z + "referrer"]: 24,
            [z + "uuid"]: 30,
            [z + "uuid_*"]: 31,
            [z + "uuid_v2"]: 32,
            [z + "app_version_*_*"]: 40,
            [Q + "preview_*"]: 41,
            [Q + "editor"]: 42,
            [Q + "heatmap_*"]: 43
        };
    let te;
    for (const e in ee) ee[e] = le(ee[e]), ee["debug" + e] = "d" + ee[e];

    function ne() {
        for (var e = document.cookie.split(/; ?/), t = {}, n = 0; n < e.length; n++) {
            var i = e[n].split("=");
            try {
                const e = W(i[0]);
                let n;
                n = "_vwo" === e ? G(i[1]) : W(i[1]), t[e] = n
            } catch (e) {}
        }
        return t
    }

    function ie(e) {
        return ["_vis_opt_out", "_vwo_ssm", "_vwo_ss", "_vwo_global_opt_out"].indexOf(e) < 0 && (e.indexOf("_vis_opt_") > -1 || e.indexOf("_vwo_") > -1 || e.indexOf("_vis_") > -1)
    }

    function oe(e) {
        let t, n;
        return () => (n = n || H((() => {
            n = t = void 0
        }), 1), t = t || e())
    }
    let re = oe(ne);

    function se(e) {
        return re()[W(e)]
    }

    function ae(e, t, n, i = 4e12) {
        t = "_vwo" === e ? M(t) : P(t);
        let o = P(e) + "=" + t + "; ";
        n && (o += "domain=" + n + "; "), i && (o += "expires=" + new Date(i).toUTCString() + "; "), o += "path=/", window.VWO._ = window.VWO._ || {}, window.VWO._.ss && (o += "; secure; samesite=none"), document.cookie = o, re = oe(ne)
    }

    function ce() {
        re = oe(ne)
    }

    function le(e) {
        "string" == typeof e && (e = +e), e < 0 && (e = 0);
        let t = "";
        for (; e;) {
            const n = e % 64;
            let i = n.toString(36);
            n >= 36 && (i = String.fromCharCode(n + 29)), 62 === n && (i = "_"), 63 === n && (i = "-"), t = i + t, e = B(e / 64)
        }
        return t || e + ""
    }

    function ue(e) {
        let t = 0,
            n = 0;
        for (; e;) {
            const i = e.slice(-1);
            let o = 26 * +/[A-Z]/.test(i) + parseInt(i, 36);
            "_" === i && (o = 62), "-" === i && (o = 63), t += o * K(64, n++), e = e.slice(0, -1)
        }
        return t
    }

    function de(e, t, n) {
        return `${e}${Y}${t}${q}${le(B(100*n))}`
    }

    function ge(e, t) {
        try {
            const t = e.split(Y),
                n = t[1].split(q);
            return [t[0], n[0], ue(n[1]) / 100]
        } catch (n) {
            const i = `Error occurred while decoding the cookie in cookieJar for strategy: ${t}. Cookie Value to be decoded: ${e}. ${n}`;
            return void k({
                msg: i,
                url: "cookie-jar.js",
                lineno: 257,
                colno: 26,
                source: P(i)
            })
        }
    }

    function he(e, t) {
        return !e || "number" != typeof e[2] || Date.now() > t + e[2] * Z
    }
    class pe {
        constructor(e, t, n = "cookie", i = !0, o, r, s) {
            this.threadInstanceSync = !1, this.backwardCompatible = i, this.cookieSyncUrl = o, this.jarName = e, this.cookieStorageStrategy = n, this.domain = t, this.syncingOff = r, this.strategyConfig = s, this.syncingOff ? this.cookies = this.syncFromTPCValue() : this.cookies = this.syncFromCookies(), this.strategyConfig && (this.strategyConfig.callback = this.strategyConfig.callback || function() {}, this.strategyConfig.cookieJarValue = this.strategyConfig.cookieJarValue || ""), te = ue(this.getInJar("ts") || "0") || Date.now(), this.setInJar("ts", le(te), 2e3), this.backwardCompatible && this.getAll(!1, !0), this.backwardCompatible || this.syncingOff || "custom" === n || this.syncCookiesToJar(), this.threadInstanceSync = !0
        }
        syncCookiesToJar() {
            const e = document.cookie.split(/; ?/),
                t = this.getAll();
            for (var n = 0; n < e.length; n++) {
                const i = e[n].split("="),
                    o = t[i[0]];
                ie(i[0]) && !o && (this.setInJar(W(i[0]), W(i[1]), 100), window.VWO._.cookies.create(i[0], i[1], void 0, void 0, -1, !0))
            }
        }
        getInJar(e, t = !1) {
            if (e = this.mapKey(e), !this.cookies) return;
            const n = this.cookies[e];
            return he(n, te) ? (delete this.cookies[e], void(this.syncingOff || this.syncToCookies())) : t ? n.slice(1) : n[1]
        }
        expired(e) {
            e = this.mapKey(e);
            const t = this.cookies[e];
            if (t) return he(t, te)
        }
        setInJar(e, t, n) {
            return e = this.mapKey(e), this.cookies[e] = [e, t, n + (Date.now() - te) / Z], this.threadInstanceSync && this.otherSide("updateJarMemory", [e, this.cookies[e]]), this.syncingOff || this.syncToCookies(), this.getInJar(e)
        }
        syncToCookies() {
            let e = "";
            for (const t in this.cookies) {
                const n = this.cookies[t];
                e += (e ? J : "") + de.apply(!1, n)
            }
            if ("custom" === this.cookieStorageStrategy) return ce(), e = M(e), void this.strategyConfig.callback(e);
            "ls" !== this.cookieStorageStrategy && "both" !== this.cookieStorageStrategy || $(this.jarName, e), "cookie" !== this.cookieStorageStrategy && "both" !== this.cookieStorageStrategy || ae(this.jarName, e, this.domain)
        }
        getStoredJarValue(e) {
            let t = "";
            for (const e in this.cookies) {
                const n = this.cookies[e];
                t += (t ? J : "") + de.apply(!1, n)
            }
            return e ? M(t) : t
        }
        syncFromTPCValue() {
            let e = window.VWO.data.tpc ? window.VWO.data.tpc._vwo : void 0;
            const t = {};
            if (!e) return t;
            e = e.split(J);
            for (let n = 0; n < e.length; n++) {
                const i = ge(e[n], this.cookieStorageStrategy);
                i && (t[i[0]] = i)
            }
            return t
        }
        syncFromCookies() {
            let e = "";
            this.cookies = {}, "custom" === this.cookieStorageStrategy ? e = G(this.strategyConfig.cookieJarValue) : "ls" === this.cookieStorageStrategy ? e = F(this.jarName) : "cookie" === this.cookieStorageStrategy ? e = se(this.jarName) : "both" === this.cookieStorageStrategy && (e = se(this.jarName) || F(this.jarName)), e = e || "";
            const t = e.split(J);
            for (let n = 0; e && n < t.length; n++) {
                const e = ge(t[n], this.cookieStorageStrategy);
                e && (this.cookies[e[0]] = e)
            }
            return this.cookies
        }
        mapKey(e) {
            if (ee[e]) return ee[e];
            const t = /([0-9]+)/g,
                n = e.replace(t, "*");
            if (ee[n]) {
                const i = e.match(t) || [];
                return ee[n] + "*" + i.map(le).join("*")
            }
            return e
        }
        unmapKey(e) {
            const t = e.split("*"),
                n = t[0];
            let i = "";
            for (const e in ee)
                if (ee[e] === n) {
                    i = e;
                    break
                }
            for (let e = 1; e < t.length; e++) i = i.replace("*", "" + ue(t[e]));
            return (i || "ts" === e) && i || e
        }
        getAll(e = !1, t = !1) {
            const n = {};
            for (const i in this.cookies) {
                const o = this.unmapKey(i);
                let r = this.cookies[i][1];
                "ts" !== i && (r = this.get(o, t)), !1 === this.expired(i) && (n[o] = e ? [r, new Date(this.cookies[i][2] * Z + te)] : r)
            }
            return n
        }
        get(e, t = !1) {
            const n = this.expired(e),
                i = this.getInJar(e, !0);
            let o, r;
            i && ([o, r] = i);
            const s = "*" === o;
            if ("custom" !== this.cookieStorageStrategy && s) {
                const t = se(e);
                return !t && o && this.setInJar(e, "", -1), t
            }
            if (this.backwardCompatible) {
                const i = se(e);
                return i && n ? void ae(e, "", this.domain, -1) : (!t || !o || "ts" === e || i && i !== o || ae(e, o, this.domain, te + r * Z), i || !o || t || "ts" === e ? (i && o && i !== o && this.setInJar(e, i, r - (Date.now() - te) / Z), i || o) : void this.setInJar(e, "", -1))
            }
            return this.getInJar(e)
        }
        xmlSuccess() {
            window.VWO._.cookies.create("_vis_opt_test_cookie", 1, void 0, void 0, void 0, !0)
        }
        set(e, t, n) {
            if (t += "", "number" == typeof n ? this.setInJar(e, t, n) : this.setInJar(e, "*", 2e3), "custom" !== this.cookieStorageStrategy && (this.backwardCompatible || "number" != typeof n)) {
                let i;
                i = null === n ? null : Date.now() + n * Z, ae(e, t, this.domain, i)
            }
            this.cookieSyncUrl && (j(this.cookieSyncTimeout), this.cookieSyncTimeout = H((() => {
                this.syncViaXML(this.xmlSuccess)
            }), 1e3))
        }
        updateJarMemory(e, t) {
            this.cookies[e] = t
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    const ve = {
        primary: (e, t, n = !1, i, o) => new Proxy(t, {
            construct(t, r) {
                this.store = this.store || ["1"];
                const s = new t(...r),
                    a = this.store.length;
                this.store.push(s);
                let c = r;
                n && (c = i(s)), Object.defineProperty(s, "otherSideCreated", {
                    value: !1,
                    enumerable: !1,
                    writable: !0
                }), s.otherSide = (...e) => s.otherSideCreated.then((() => s.otherSide(...e).then((e => e))));
                const l = {
                    type: "vwoClassInstanceBridge",
                    id: a,
                    args: c,
                    path: e
                };
                return s.otherSideCreated = new Promise((t => {
                    window.fetcher.request(l).send().then((n => {
                        s.otherSide = (...t) => {
                            const i = e.dest + "." + n + "." + t[0];
                            return t[0] = i, window.fetcher.getValue(...t)
                        }, t(null), o && o(n)
                    }))
                })), s
            },
            get(e, t) {
                return "symbol" == typeof t || isNaN(+t) ? e : this.store[t]
            }
        }),
        secondary: (e, t, n) => new Proxy(t, {
            construct(e, t) {
                this.store = this.store || ["1"];
                const i = new e(...t),
                    o = this.store.length;
                return this.store.push(i), n && n(i), [o, i]
            },
            get(e, t) {
                return "symbol" == typeof t || isNaN(+t) ? e : this.store[t]
            }
        })
    };
    class we extends pe {
        syncViaXML(e) {
            if (!window.XMLHttpRequest) return;
            const t = new XMLHttpRequest;
            t.addEventListener("load", e), t.open("GET", this.cookieSyncUrl, !0), t.withCredentials = !0, t.send(null)
        }
    }

    function fe(e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(n);
        return t
    }
    window.VWO.modules.vwoUtils.cookies.CookieJar = ve.secondary("VWO.modules.vwoUtils.cookies.CookieJar", we, (e => {
        "_vwo" === e.jarName && window.VWO._.cookieInitMT(e)
    }));
    var _e = {};

    function Ee(e, t) {
        const n = document.createEvent("Event");
        e = "vwo." + e, n.initEvent && (n.initEvent(e, !1, !1), n.data = t, document.dispatchEvent && document.dispatchEvent(n))
    }

    function me(e, t) {
        _e.queue = _e.queue || [];
        const n = window.VWO._.ac && window.VWO._.ac.rdbg;
        if ("meta" == e && !n) return;
        if (!document.createEvent) return;
        const i = window.VWO;
        if (!i.nls || !i.nls.Recording) return void _e.queue.push({
            eventName: e,
            data: t
        });
        _e.queue.push({
            eventName: e,
            data: t
        });
        const o = _e.queue.splice(0);
        for (var r of o) Ee(r.eventName, r.data)
    }
    window.VWO.modules.vwoUtils.utils = {
        customEvent: me
    };
    var Se = window._vis_opt_cookieDays,
        Oe = window._vwo_exp || {},
        Te, ye = window._vwo_acc_id,
        Ce = [],
        Ie = 0,
        Ne, Ae = function() {
            for (var e = 0; e < Ce.length; e++) Ce[e].d || (Ce[e].c(), Ce[e].d = !0)
        };

    function be() {
        return window._vis_debug
    }

    function Re(e) {
        const t = window.VWO;
        return t._.cLFE || !t.data.cj || Object.values(t.data.cj).every((e => void 0 === e)) || (e.backwardCompatible = t.data.cj.bc || !1, e.strategy = e.strategy || t.data.cj.s), e
    }
    const Le = {
        domain: void 0,
        _create: function(e, t, n, i, o, r, s) {
            be() && 0 !== e.indexOf("debug") && (e = "debug" + e), window.VWO._.cLFE, "_vwo_sn" !== e && "_vwo_ds" !== e && "_vis_opt_test_cookie" !== e && !isNaN(Se = parseFloat(Se)) && isFinite(Se) && (n = Se);
            var a = "";
            o ? a += "; expires=" + new Date(o).toGMTString() : n ? a += "; expires=" + new Date((new Date).getTime() + 864e5 * n).toGMTString() : !1 === n && (a = "; expires=Thu, 01 Jan 1970 00:00:01 GMT"), i || (i = Le.domain), void 0 !== i && (i = "; domain=." + i);
            const c = e + "=" + encodeURIComponent(t) + a + (i || "") + "; path=/";
            window.VWO._.ss && !s ? document.cookie = c + "; secure; samesite=none" : document.cookie = c
        },
        create: function(e, t, n, i, o, r, s) {
            this._create(e, t, n, i, o, r, s), L(A.SET_COOKIE, e, t, n, o), me("meta", {
                ckName: e,
                ckValue: t,
                ckDays: n,
                ckExpiryTs: o
            })
        },
        get: function(e, t, n) {
            var i;
            !n && be() && (e = "debug" + e), window.VWO._.cLFE;
            var o = document.cookie.match(new RegExp("(?:^|;)\\s?" + e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=(.*?)(?:;|$)", "i"));
            return i = o && decodeURIComponent(o[1]), L(A.GET_COOKIE, e, i), i
        },
        erase: function(e, t, n) {
            this.create(e, "", !1, t, 1, n), L(A.ERASE_COOKIE, e)
        },
        mergeInFPJar: function() {
            if (window.VWO._.cLFE) return;
            const e = this.createThirdPartyJar().getAll(!0);
            for (const t in e) {
                if ("ts" === t) continue;
                const n = e[t][1],
                    i = e[t][0];
                window.VWO._.jar.set(t, i, (n - Date.now()) / 864e5)
            }
        },
        createThirdPartyJar: function() {
            return Te || (Te = new we("_vwo_third_party", Le.domain, void 0, !1, void 0, !0), window.VWO._.tpj = Te, Te)
        },
        setThirdPartyCookiesInJar: function(e, t, n, i) {
            const o = this.createThirdPartyJar(),
                r = i ? (i - Date.now()) / 864e5 : n;
            o.set(e, t, r)
        },
        getThirdPartyJarValue: function() {
            const e = Te.getStoredJarValue();
            return e.length ? e : null
        },
        createThirdParty: function(e, t, n, i, o, r, s) {
            if (!window.mainThread) return window.fetcher.getValue("VWO._.cookies.createThirdParty", [e, t, n, i, o, r, s]);
            var a, c, l, u;
            let d = !1;
            if (o && (d = s ? s.multiple_domains : Oe[o].multiple_domains), "_vwo" !== e && this._create(e, t, n, i), be() && 0 !== e.indexOf("debug") && (e = "debug" + e), !((u = window.vwo_$) && o && d || r || "_vwo" === e)) return void L(A.SET_THIRD_PARTY_COOKIE_ERROR, e, t, n, i);
            a = u("<iframe>").attr({
                height: "1px",
                width: "1px",
                border: "0",
                class: "vwo_iframe",
                name: "vwo_" + Math.random(),
                style: "position: absolute; left: -2000px; display: none"
            }).appendTo("head").load((function() {
                -1 !== e.indexOf("split") && this.parentNode.removeChild(this), --Ie || Ae()
            })), Ie++;
            const g = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com";
            c = g + "/ping_tpc.php?account=" + ye + "&name=" + encodeURIComponent(e) + "&value=" + encodeURIComponent(t) + "&days=" + n + "&random=" + Math.random(), /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? a.attr("src", c) : ((l = u("<form>").attr({
                action: g + "/ping_tpc.php",
                "accept-charset": "UTF-8",
                target: a.attr("name"),
                enctype: "application/x-www-form-urlencoded",
                method: "post",
                id: "vwo_form",
                style: "display:none"
            }).appendTo("head")).attr("action", c).submit(), l.remove()), L(A.SET_COOKIE, e, t, n, o, !0)
        },
        waitForThirdPartySync: function(e) {
            return N(this, void 0, void 0, (function*() {
                window.mainThread ? Ce.push({
                    c: e
                }) : yield window.fetcher.getValue('VWO._.cookies.waitForThirdPartySync("${{1}}")', null, {
                    captureGroups: [e]
                })
            }))
        },
        setJar(e) {
            window.VWO._.jar = Ne = e
        },
        init: function(e) {
            window.VWO._.jar = null
        },
        getAll: function() {
            const e = document.cookie.split(/; ?/),
                t = {};
            for (let n = 0; n < e.length; n++) {
                const i = e[n].split("="),
                    o = i[0],
                    r = i[1];
                try {
                    t[o] = r
                } catch (e) {}
            }
            return t
        },
        getItem: function(e) {
            return e.indexOf("_vis_opt_") > -1 || e.indexOf("_vwo_") > -1 ? this.get(e) || this.get(e, !0) : this.get(e, !0, !0)
        },
        setItem: function(e, t) {
            this.create(e, t)
        },
        deleteAll: function() {},
        deleteItem: function() {},
        includes: function(e) {
            const t = new RegExp(e),
                n = Object.keys(Le.getAll());
            for (let e = 0; e < n.length; e++)
                if (t.test(n[e])) return 1;
            return 0
        }
    };
    var Ve;
    window.VWO._.cookies = Le;
    const xe = {
        init: function() {
            Ve = Le.get("_vwo_referrer"), Le.erase("_vwo_referrer"), "string" != typeof Ve && (Ve = document.referrer)
        },
        get: function() {
            return -1 !== location.search.search("_vwo_test_ref") ? document.referrer : Ve
        },
        set: function() {
            Le.create("_vwo_referrer", Ve, 18e-5)
        }
    };
    window.VWO.modules.vwoUtils.referrer = xe;
    const Ue = {
            get navigator() {
                return navigator
            },
            get pageTitle() {
                return document.title
            },
            get doNotTrack() {
                return window.doNotTrack
            },
            get windowName() {
                return window.name
            },
            get currentUrl() {
                return window._vis_opt_url || window.location.href
            },
            get location() {
                return window.location
            },
            get document() {
                return window.location
            },
            get history() {
                return window.history
            },
            get accountId() {
                return window._vwo_acc_id
            },
            get smartCodeVersion() {
                return window._vwo_code_version
            },
            get serverUrl() {
                return window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/"
            },
            get vwoText() {
                return window._vwo_text
            },
            get vwoCode() {
                return window._vwo_code
            },
            get MutationObserver() {
                let e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                return window.Zone && window.Zone.__symbol__ && (e = window[window.Zone.__symbol__("MutationObserver")]), e
            },
            get vwoInternalProperties() {
                return window.VWO._
            },
            get cookie() {
                return document.cookie
            },
            get visDebug() {
                return window._vis_debug
            },
            get cookieDomain() {
                return window._vis_opt_domain || window._vwo_cookieDomain || I(location.host)
            },
            get vwoStyle() {
                return window._vwo_style
            },
            get screen() {
                return window.screen
            },
            get vwoCss() {
                return window._vwo_css
            },
            get visOptUrl() {
                return window._vis_opt_url
            },
            get allSettings() {
                return window.VWO._.allSettings
            },
            get apiSectionCallback() {
                return window._vwo_api_section_callback
            },
            get encodeURIComponent() {
                return window.encodeURIComponent
            },
            get page() {
                return {
                    title: Ue.pageTitle,
                    url: Ue.currentUrl,
                    referrerUrl: xe.get()
                }
            },
            get timeSpentInASession() {
                var e, t, n, i, o, r;
                return +Date.now() - 1e3 * +(null === (n = null === (t = null === (e = window.VWO.phoenix) || void 0 === e ? void 0 : e.store) || void 0 === t ? void 0 : t.getters) || void 0 === n ? void 0 : n.sessionStart) ? (+Date.now() - 1e3 * +(null === (r = null === (o = null === (i = window.VWO.phoenix) || void 0 === i ? void 0 : i.store) || void 0 === o ? void 0 : o.getters) || void 0 === r ? void 0 : r.sessionStart)) / 1e3 : 0
            },
            get vwoUUID() {
                return window._vwo_uuid
            }
        },
        De = function(e) {
            let t, n, i;
            t = e.toString(), ((n = t.match(/^(?:async\s+)?([A-Za-z0-9_$]*)\s*=>/)) || (n = t.match(/^(?:async\s+)?\((.*)\)\s*=>/)) || (n = t.match(/^(?:async\s+)?function(?:\s+[A-Za-z_$]*)?\s*\((.*)\)\s*{/))) && (i = n[1]);
            const o = {};
            let r = !1;
            return i.split(",").forEach(((e, t) => {
                "vwo_$" === e.trim() && (o[t] = window.vwo_$, r = !0)
            })), r ? function(...t) {
                return Object.keys(o).forEach((e => {
                    +e < t.length && (t[e] = o[e])
                })), e(...t)
            } : e
        };
    let ke;

    function Pe(e) {
        if (!e) return e;
        try {
            e = window.decodeURIComponent(e)
        } catch (e) {}
        return e
    }
    const We = function() {
        if (void 0 !== ke) return ke;
        const e = [],
            t = window.VWO._.allSettings.dataStore.campaigns;
        let n, i;
        for (let n in t) e.push(n);
        return ke = !!(n = (window.location.search + window.location.hash).match(/.*_vis_test_id=(.*?)&.*_vis_opt_preview_combination=(.*)$/)) && (!(!e.includes(n[1]) || !t[n[1]] || void 0 === t[n[1]].combs[i = Pe(n[2])]) && i), ke
    };
    var Me = {};

    function Ge(e, t) {
        const n = window.VWO._.allSettings.dataStore.campaigns || {};
        if (Object.hasOwnProperty.call(n, e)) {
            if (Le.get("_vis_opt_exp_" + e + "_combi")) return delete Me[e], !0;
            const i = n[e].combs || {};
            if (Object.hasOwnProperty.call(i, t))
                for (const e in i) Object.hasOwnProperty.call(i, e) && (i[e] = e === t ? 1 : 0);
            return delete Me[e], !0
        }
        return !1
    }

    function $e(e) {
        if (!window._vis_debug && !We())
            if (Array.isArray(e) && e.length)
                for (const t of e) {
                    const {
                        e: e,
                        v: n
                    } = t;
                    Ge(e, n) || (Me[e] = n)
                } else
                    for (const e in Me) Object.hasOwnProperty.call(Me, e) && Ge(e, Me[e])
    }

    function Fe(e, t, n) {
        const i = window.VWO;
        switch (e.toLowerCase()) {
            case "tags":
                i.phoenix.tags.add(t, n.fn);
                break;
            case "operators":
                i.phoenix.operators.add(n.fn);
                break;
            case "storages":
                i.phoenix.storages.add(n);
                break;
            case "store":
                i.phoenix.store.actions.addValues(n)
        }
    }
    class je {
        constructor(e) {
            if (e instanceof je) return void Object.keys(e).forEach((t => {
                this[t] = e[t]
            }));
            this.queue = e.slice(), this._ = e._ || {}, this._.performance = O, this.nonce = e.nonce, Object.defineProperty(this, "modules", {
                value: e.modules,
                enumerable: !1,
                configurable: !1
            }), this.data = e.data || {}, this.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM = e.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM, this.onEventReceive = e.onEventReceive, this.onVariationApplied = e.onVariationApplied, this.onSurveyShown = e.onSurveyShown, this.onSurveyCompleted = e.onSurveyCompleted, this.onSurveyAnswerSubmitted = e.onSurveyAnswerSubmitted, this.tag = e.tag, this.v_e = e.v_e, this.v = e.v;
            let t = 0;
            for (const e of this.queue) this[t] = e, t++;
            this.length = this.queue.length
        }
        config(e) {
            return e && (this.configSettings = e), this.configSettings
        }
        definePlugin(e, t = {}) {
            const n = e.split(".")[0],
                i = e.split(".")[1],
                o = window.VWO;
            o.phoenix ? Fe(n, i, t) : (o.pluginStorage = o.pluginStorage || {}, o.pluginStorage[n] = o.pluginStorage[n] || {}, i ? (o.pluginStorage[n][i] = o.pluginStorage[n][i] || {}, o.pluginStorage[n][i] = m.mergeNestedObjects(o.pluginStorage[n][i], t)) : o.pluginStorage[n] = m.mergeNestedObjects(o.pluginStorage[n], t))
        }
        addPhoenix(e) {
            this.event = function(e, t) {
                (t = t || {}).isCustomEvent = !0, t.page = Ue.page, this.otherSide("event", [e, t])
            }, this.visitor = function(e) {
                e && this.otherSide("visitor", [e])
            }, this.syncAttributes = function() {
                this.otherSide("syncAttributes", [])
            }, this.syncEvents = function() {
                this.otherSide("syncEvents", [])
            }, this.setVariation = $e, this.phoenix = e
        }
        splice(...e) {
            const t = this.queue.splice.apply(this.queue, e);
            return this.length = this.queue.length, t
        }
        push(...e) {
            const t = this.queue.push.apply(this.queue, e);
            return this.length = this.queue.length, this[this.length - 1] = this.queue[this.queue.length - 1], t
        }
        sort(...e) {
            return this.queue.sort.apply(this.queue, e)
        }
        updateSettings(e, t) {
            const n = e.tags;
            for (var i in Object.keys(n).forEach((e => {
                    n[e].fn = De(n[e].fn)
                })), window.VWO._.allSettings.triggers = Object.assign(Object.assign({}, window.VWO._.allSettings.triggers), e.triggers), e.tags) window.VWO._.allSettings.tags[i] || (window.VWO._.allSettings.tags[i] = e.tags[i]);
            this.pageGroup.add(e.pages, e.pagesEval), delete window.VWO._.goalsToBeConvertedSynchronously;
            const o = !!fe(window.VWO._.track).length;
            this.otherSide("updateSettings", [o, e, t])
        }
        otherSide(...e) {
            e[0] = "VWO." + e[0], window.fetcher.getValue(...e)
        }
    }
    var He = [];
    const Be = ["dev.visualwebsiteoptimizer.com", "d5phz18u4wuww.cloudfront.net", "cdn-cn.vwo-analytics.com"];

    function Ke(e) {
        let t = !1;
        for (let n = 0; n < Be.length; n++)
            if (e.indexOf(Be[n]) >= 0) {
                t = !0;
                break
            }
        return t
    }
    var Ye = function(e) {
        if (Ke(e && e.url || ""))
            for (var t = 0; t < He.length; t++) He[t](e)
    };

    function qe(e) {
        var t = {
            msg: e.error && e.error.stack || e.message || e.reason && (e.reason.stack || e.reason.message),
            url: e.filename || e.reason && (e.reason.stack || e.reason.message),
            lineno: e.lineno,
            colno: e.colno,
            source: "aEL"
        };
        Ye(t)
    }
    window.addEventListener ? (window.addEventListener("error", qe), window.addEventListener("unhandledrejection", qe)) : window.attachEvent && window.attachEvent("onerror", (function(e, t, n, i) {
        Ye({
            msg: e,
            url: t,
            lineno: n,
            colno: i,
            source: "aE"
        })
    }));
    const Je = function(e) {
        e && "function" == typeof e && He.push(e)
    };
    var Xe = parseInt(+new Date / 1e3, 10),
        ze, Qe = function() {
            return ze || (ze = window.VWO.data.ts || Xe)
        };
    const Ze = Object.keys;

    function et(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
    }

    function tt(e, t) {
        var n;
        if (e && "function" == typeof t)
            if (e instanceof Array) {
                for (n = 0; n < e.length; n++)
                    if (!1 === t(e[n], n)) return
            } else
                for (n in e)
                    if (e.hasOwnProperty(n) && !1 === t(e[n], n)) return
    }

    function nt(e, t) {
        if (!(e instanceof Array)) return -1;
        for (var n = 0; n < e.length; n++)
            if (t === e[n]) return n;
        return -1
    }

    function it(e, t) {
        for (var n = this.getKeys(t), i = 0; i < n.length; i++) e.setAttribute(n[i], t[n[i]])
    }

    function ot(e) {
        return /^(https?:\/\/|\/\/)/.test(e)
    }

    function rt(e, t) {
        for (var n = [], i = 0; i < e.length; i++) n.push(t(e[i]));
        return n
    }

    function st(e, t) {
        for (var n = [], i = 0; i < e.length; i++) t(e[i], i) && n.push(e[i]);
        return n
    }

    function at(e) {
        var t = Qe();
        return e ? t : 1e3 * t + +new Date % 1e3
    }

    function ct(e) {
        var t = Qe(),
            n = parseInt(+new Date / 1e3, 10) - Xe;
        return e ? t + n : 1e3 * (t + n) + +new Date % 1e3
    }

    function lt() {
        return (new Date).getTimezoneOffset() / 60
    }

    function ut(e, t) {
        var n = !1;
        return function() {
            n || (e.call(), n = !0, setTimeout((function() {
                n = !1
            }), t))
        }
    }

    function dt(e, t, n) {
        var i, o, r, s = !1;
        return -1 === t || n ? (o = requestAnimationFrame, r = cancelAnimationFrame) : (o = setTimeout, r = clearTimeout),
            function() {
                s && (r(i), i = null), i = o((function() {
                    e.call()
                }), t), s = !0
            }
    }

    function gt(e, t) {
        const n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            return window.setTimeout(e, 1e3 / 60)
        };
        t || x && x._ && x._.ac && x._.ac.aSP ? n(e) : e()
    }
    var ht = Object.freeze({
            __proto__: null,
            getKeys: Ze,
            extend: et,
            forEach: tt,
            arrayContains: nt,
            setAttrs: it,
            isAbsoluteUrl: ot,
            map: rt,
            filter: st,
            getServerStartTimestamp: at,
            getCurrentTimestamp: ct,
            getTimeZoneOffset: lt,
            throttle: ut,
            debounce: dt,
            processCallbackInRequestAnimationFrame: gt
        }),
        pt = function() {};

    function vt(e) {
        window.vwo_iehack_queue || (window.vwo_iehack_queue = []), window.vwo_iehack_queue.push(e)
    }

    function wt(e, t, n) {
        var i, o = new Image;
        t = t || pt, n = n || pt, o.onload = function() {
            i || (i = 1, t())
        }, o.onerror = function() {
            i || (i = 1, n())
        }, e.serverUrl = e.serverUrl || window._vwo_server_url;
        var r = e.serverUrl + e.url + "&vn=" + e.vn + "&vns=" + e.vns + "&vno=" + e.vno + "&eTime=" + ct() + "&v=" + window.VWO.v_e;
        e.url.indexOf("&cu=") < 0 && e.url.indexOf("&url=") < 0 && (r += "&_cu=" + encodeURIComponent(document.URL.slice(0, 100))), document.referrer && e.url.indexOf("&ru=") < 0 && (r += "&_ru=" + encodeURIComponent(document.referrer.slice(0, 100))), r += "&random=" + Math.random(), o.src = r, vt(o)
    }
    class ft {
        formatErrorObject(e) {
            return "string" == typeof e && (e = {
                msg: e
            }), e
        }
        setCustomError(e) {
            const t = this;
            window.VWO._.customError = function(n) {
                n = t.formatErrorObject(n), e(n)
            }
        }
    }
    class _t extends ft {
        setErrorTrackingCallback(e) {
            const t = e.encodeURIComponent,
                n = e.accountId,
                i = e.serverUrl;
            var o = 0;
            const r = function(e) {
                var r = (e = e || {}).msg && e.msg.substring(0, 1e3);
                const s = e.lineno,
                    a = e.colno,
                    c = e.source,
                    l = "ee.gif?" + (e.url ? "f=" + t(e.url) : "") + (s ? "&l=" + s : "") + (a ? "&c=" + e.colno : "") + "&a=" + n + (c ? "&s=" + t(c) : "") + "&e=" + t(r);
                o < 50 && (o++, wt({
                    url: l,
                    serverUrl: i
                }))
            };
            return Je(r), r
        }
        errorTracking({
            getters: e
        }) {
            const t = this.setErrorTrackingCallback(e);
            this.setCustomError(t)
        }
    }
    const Et = new _t,
        mt = Et.errorTracking.bind(Et);
    window.VWO.modules.tags = window.VWO.modules.tags || {}, window.VWO.modules.tags.errorTracking = mt, window.VWO.modules.tags.errorTrackingCallback = Et.setErrorTrackingCallback;
    var St = "undefined",
        Ot = 10;

    function Tt(e) {
        return !!e
    }
    var yt = navigator,
        Ct = document,
        It = yt.userAgent,
        Nt = yt.vendor,
        At = Ct.createElement("a"),
        bt = It.toLowerCase(),
        Rt = yt.appVersion,
        Lt = [{
            s: It,
            sS: " OPR/",
            p: window.opera,
            i: "Opera"
        }, {
            s: Nt,
            sS: "Apple",
            i: "Safari"
        }, {
            s: Nt,
            sS: "KDE",
            i: "Konqueror"
        }, {
            s: It,
            sS: "Firefox",
            i: "Firefox"
        }, {
            s: It,
            sS: "Netscape",
            i: "Netscape"
        }, {
            s: It,
            sS: "MSIE",
            p: /(?:Trident\/.*?rv:|Windows NT.*?Edge\/)(?:[0-9]+[.0-9]*)/i.test(It),
            i: "Explorer"
        }, {
            s: It,
            sS: "Chrome",
            i: "Chrome"
        }],
        Vt = [{
            s: "search.yahoo.com/",
            p: "p",
            i: 1
        }, {
            s: "www.google.",
            p: "q",
            i: 2
        }, {
            s: "www.bing.com/",
            p: "q",
            i: 3
        }, {
            s: ".ask.com/",
            p: "q",
            i: 4
        }, {
            s: "www.search.com/",
            p: "q",
            i: 5
        }, {
            s: "www.baidu.com/",
            p: "wd",
            i: 6
        }, {
            s: "search.aol.com/",
            p: "q",
            i: 7
        }, {
            s: "duckduckgo.com/",
            p: "q",
            i: 8
        }],
        xt = function(e) {
            return St !== typeof e
        },
        Ut = function() {
            return window.VWO && window.VWO.data && window.VWO.data.vi
        },
        Dt = function(e) {
            var t = window._vwo_geo;
            return 2 == +e && (t = window._vwo_geo2), t
        };
    const kt = {
        ce: function() {
            return yt.cookieEnabled
        },
        U: function() {
            return Ct.URL
        },
        ks: function() {
            return "" === this.R() ? "" : At.search
        },
        ors: function() {
            for (var e = 0; e < Vt.length; e++)
                if (-1 !== this.R().indexOf(Vt[e].s)) return Vt[e].i;
            return 0
        },
        rt: function() {
            return this.ors() ? "org" : this.R() ? "ref" : this.f_in(this.qP("utm_medium"), "email") ? "eml" : this.f_re_i(this.qP("utm_medium"), "^(?:cpc|ppc|cpa|cpm|cpv|cpp)$") ? "spt" : "dir"
        },
        ts: function() {
            let e, t, n, i, o = this.R();
            if (/facebook\.com|quora\.com|reddit\.com|imgur\.com|tapiture\.com|disqus\.com|9gag\.com|tumblr\.com|plus\.google|stumbleupon\.com|twitter\.com|linkedin|del\.icio\.us|delicious\.com|technorati|digg\.com| hootsuite|stumbleupon|myspace|bit\.ly|tr\.im|tinyurl|ow\.ly|reddit|m\.facebook\.com|youtube|flickr|pinterest\.com|^t\.co$|tweetdeck/.test(o)) return "soc";
            if (this.ors() && (e = !0), n = this.qP("gclid"), i = this.qP("utm_medium"), o && (t = !0), e && n) return "pst";
            if (i) {
                if (this.f_in(i, "email")) return "eml";
                if (this.f_re_i(i, "^(?:cpc|ppc|cpa|cpm|cpv|cpp)$")) return "pst"
            } else if (e) return "org";
            return t ? "ref" : "dir"
        },
        k: function() {
            if (this.ors()) {
                var e = new RegExp("[\\?&]" + Vt[this.ors() - 1].p + "=([^&#]*)").exec(this.R());
                if (null !== e) return e[1].split("+").join(" ")
            }
            return ""
        },
        gC: function(e) {
            if (VWO._.jar && /^_vis_opt_exp_\d+_combi$/.test(e)) {
                return VWO._.jar.get(e) || ""
            }
            if (0 < Ct.cookie.length) {
                var t, n = Ct.cookie.indexOf(e + "=");
                if (-1 !== n) return n = n + e.length + 1, -1 === (t = Ct.cookie.indexOf(";", n)) && (t = Ct.cookie.length), decodeURIComponent(Ct.cookie.substring(n, t))
            }
            return ""
        },
        T: function() {
            var e = this.gC("_vis_opt_s");
            return e && 1 < parseInt(e.split("|")[0], Ot) ? "ret" : "new"
        },
        qP: function(e) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(this.U());
            return t ? t[1] : ""
        },
        f_in_loc: function(e, t) {
            return N(this, void 0, void 0, (function*() {
                if (e && t) {
                    const n = e.countryCode,
                        i = e.city,
                        o = e.region;
                    return (yield kt.f_in_list(n, t)) || (yield kt.f_in_list(`${n}-${o}`, t)) || (yield kt.f_in_list(`${n}-${o}-${i}`, t))
                }
            }))
        },
        f_nin_loc: function(e, t) {
            return N(this, void 0, void 0, (function*() {
                if (e && t) {
                    const n = e.countryCode,
                        i = e.city,
                        o = e.region;
                    return (yield kt.f_nin_list(n, t)) && (yield kt.f_nin_list(`${n}-${o}`, t)) && (yield kt.f_nin_list(`${n}-${o}-${i}`, t))
                }
            }))
        },
        f_in_list: function(e, t) {
            return N(this, void 0, void 0, (function*() {
                if (!Tt(e)) return !1;
                "string" == typeof e && (e = e.toLowerCase());
                const n = yield window.VWO._.contentSyncService.syncGet("fns.list", [e, t]);
                return !!n.dataPresent && n.val
            }))
        },
        f_nin_list: function(e, t) {
            return N(this, void 0, void 0, (function*() {
                if ("" === e) return !0;
                if (!Tt(e)) return !1;
                "string" == typeof e && (e = e.toLowerCase());
                const n = yield window.VWO._.contentSyncService.syncGet("fns.list", [e, t]);
                return !!n.dataPresent && !n.val
            }))
        },
        f_in: function(e, t) {
            return xt(e) && xt(t) && e.toString().toLowerCase() === t.toString().toLowerCase()
        },
        f_nin: function(e, t) {
            return !this.f_in(e, t)
        },
        f_cs: function(e, t) {
            return xt(e) && xt(t) && e.toString() === t.toString()
        },
        f_ncs: function(e, t) {
            return !this.f_cs(e, t)
        },
        f_re_i: function(e, t) {
            if (!xt(e) || !xt(t)) return !1;
            var n = new RegExp(t, "i");
            return (e += "").match(n)
        },
        f_re_s: function(e, t) {
            if (!xt(e) || !xt(t)) return !1;
            var n = new RegExp(t);
            return (e += "").match(n)
        },
        f_con: function(e, t) {
            return !(!xt(e) || !xt(t)) && e.toString().toLowerCase().indexOf(t.toString().toLowerCase()) > -1
        },
        f_d_con: function(e, t) {
            return !this.f_con(e, t)
        },
        f_b: function(e) {
            return !e
        },
        f_n_b: function(e) {
            return !this.f_b(e)
        },
        f_e: function(e, t) {
            var n;
            if ("object" == typeof t) {
                for (n = 0; n < t.length; n++)
                    if (this.f_in(e, t[n])) return !0;
                return !1
            }
            return this.f_in(e, t)
        },
        wk: function() {
            return bt.indexOf("webkit") > -1
        },
        de: function() {
            var e = Ut();
            return e && e.de ? e.de : bt.indexOf("ipod") > -1 ? "ipod" : bt.indexOf("ipad") > -1 && this.wk() ? "ipad" : bt.indexOf("iphone") > -1 ? "iphone" : bt.indexOf("android") > -1 ? "android" : bt.indexOf("googletv") > -1 ? "googletv" : bt.indexOf("symbian") > -1 || /series\s*[4-9]0/i.test(bt) ? "symbian" : bt.indexOf("blackberry") > -1 || bt.indexOf("vnd.rim") > -1 || bt.indexOf("bb10") > -1 ? "blackberry" : bt.indexOf("windows phone") > -1 ? "winphone" : ""
        },
        dt: function() {
            var e = Ut();
            return e && e.dt || ""
        },
        os: function() {
            var e = Ut();
            return e && e.os ? e.os : -1 !== Rt.indexOf("Win") ? "windows" : -1 !== Rt.indexOf("Mac") ? "macOS" : -1 !== Rt.indexOf("X11") ? "unix" : -1 !== Rt.indexOf("Linux") ? "linux" : void 0
        },
        b: function() {
            var e = Ut();
            return e && e.br ? e.br : this.sS(Lt) || ""
        },
        sS: function(e) {
            var t, n, i;
            for (t = 0; t < e.length; t++) {
                if (n = e[t].s, i = e[t].p, n && -1 !== n.indexOf(e[t].sS)) return e[t].i;
                if (i) return e[t].i
            }
        },
        jv: function(e) {
            try {
                return window[e] || eval(e)
            } catch (e) {}
        },
        ua: function() {
            return It
        },
        DoW: function() {
            return (new Date).getDay().toString()
        },
        Hr: function() {
            return (new Date).getHours()
        },
        Co: function(e) {
            var t = Dt(e);
            return St !== typeof t && St !== typeof t.country ? t.country : ""
        },
        Re: function(e) {
            var t = Dt(e);
            return St !== typeof t && St !== typeof t.region ? t.region : ""
        },
        Ci: function(e) {
            var t = Dt(e);
            return St !== typeof t && St !== typeof t.city ? t.city : ""
        },
        ip: function() {
            return window._vwo_ip || ""
        },
        vt: function() {
            var e = window.VWO.data.vi;
            if (e) return e.vt
        }
    };

    function Pt() {
        return kt
    }
    kt.R = function() {
        return xe.get()
    };
    var Wt = window.console || {
            log: function() {}
        },
        Mt;
    window.VWO._.prVWO = window.VWO._.prVWO || [];
    const Gt = {
        processEvent: function(e, t, n, i, o) {
            if ("[object Array]" !== Object.prototype.toString.call(e)) return 0;
            try {
                var r, s, a, c = e[0],
                    l = e.slice(1),
                    u = -1 !== c.indexOf(".");
                return u && 0 === c.indexOf(t) || !u ? (u ? (r = n[(s = c.split("."))[0]][s[1]], a = n[s[0]]) : (r = n[c], a = n), r ? (window.VWO._.prVWO = window.VWO._.prVWO.concat(o.queue ? o.splice(i, 1) : o.queue), r.apply(a, l), 1) : 0) : 0
            } catch (t) {
                return Wt.log("Error occured in VWO Process Event (" + (e && e[0]) + "): ", t), 0
            }
        },
        addPushListener: function(e, t, n) {
            var i = t.push;
            t.push = function(...o) {
                let r = 0;
                return o.forEach((o => {
                    r = function(o) {
                        const r = i.apply(t, [].slice.call(arguments));
                        return t.queue && t.queue[t.queue.length - 1] === o ? Gt.processEvent(o, e, n, t.queue.length - 1, t) : t.queue || t[t.length - 1] !== o || Gt.processEvent(o, e, n, t.length - 1, t), r
                    }(o)
                })), r
            }
        },
        init: function(e, t, n, i) {
            Mt = n ? t[n] = t[n] || [] : t || [], this.vwoApi = i, Gt.process(e, Mt, t), Gt.addPushListener(e, Mt, t)
        },
        initTrack: function(e, t) {
            Gt.init(e, window.VWO, t)
        },
        process: function(e, t, n) {
            var i = 0;
            t.sort((function(e) {
                return "config" === e[0] ? -1 : 0
            }));
            const o = t.queue ? t.queue : t;
            for (; i < o.length;) 0 === Gt.processEvent(o[i], e, n, i, t) && i++
        }
    };
    window.VWO && (window.VWO._ = window.VWO._ || {}, window.VWO._.vwoLib = Gt);
    class $t {}
    const Ft = {
        CAMPAIGN_FLOW_START: "cFS",
        TEST_NOT_RUNNING: "tNR",
        CAMPAIGN_FLOW_END: "cFE",
        REGISTER_CONVERSION: "vwo_rC",
        CONVERT_GOAL_FOR_ALL_EXPERIMENTS: "cGFAE",
        UNHIDE_ALL_VARIATIONS: "uAV",
        DIMENSION_TAG_PUSHED: "dTP",
        CONVERT_VISIT_GOAL_FOR_EXPERIMENT: "cVGFE",
        UNHIDE_SECTION: "uS",
        EXCLUDE_URL: "eURL",
        BEFORE_REDIRECT_TO_URL: "bRTR",
        URL_CHANGED: "uC",
        HIDE_ELEMENTS: "hE",
        ELEMENT_LOAD_ERROR: "eLTTE",
        NOT_REDIRECTING: "vwo_notRedirecting",
        VISIBILITY_TRIGGERED: "vwo_visibilityTriggered",
        VARIATION_APPLIED: "vwo_vA",
        ELEMENT_LOAD_TIMER_STOP: "eLTSt",
        SEND_NEW_VISITOR_CALL: "sNVC",
        CONVERT_REVENUE_GOALS_FOR_EXPERIMENT: "cRGFE",
        CHOOSE_COMBINATION: "cC",
        START_APPLY_CHANGES: "sAC",
        END_APPLY_CHANGES: "eAC",
        ELEMENT_LOADED: "eL",
        ELEMENT_NOT_LOADED: "eNL",
        MATCH_WILDCARD: "mW",
        DELETE_CSS_RULE: "dCSSR",
        SPLIT_READY_TO_REDIRECT: "sURL",
        NEW_SESSION: "newSession",
        UNHIDE_VARIATION: "uV",
        WAIT_FOR_BEHAVIOR: "wFB",
        NEW_SESSION_CREATED: "newSessionCreated",
        PAUSE: "pause",
        SPLIT_URL: "sURL",
        SHOULD_EXECUTE_LIB_ERROR: "shouldExecLib",
        UPDATE_SETTINGS_CALL: "uSC",
        EXCLUDE_GOAL_URL: "eGURL",
        HEATMAP_CLICK: "hCl",
        POST_URL_CHANGE: "hC",
        CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT: "cAVGFE",
        OPT_OUT: "optOut",
        POST_INIT: "vwo_postInit",
        PAGE_VIEW: "vwo_pageView",
        ELEMENT_CHANGES_APPLIED: "elementChangesApplied",
        REGISTER_HIT: "registerHit",
        REDIRECT_DECISION: "redirectDecision",
        RETRACK_VISITOR: "retrackVisitor",
        CAMPAIGN_NOT_ELIGIBLE: "runCampaign.notEligible",
        UNHIDE_ELEMENT: "unhideElement",
        TOGGLE_VISIBILITY_LOCK: "runCampaign.toggleVisibilityLock",
        CAMPAIGN_READY: "runCampaign.campaignReady",
        MODIFIED_ELEMENT: "runTestCampaign.modifiedEl",
        ERROR: "error",
        SSR_COMPLETE: "vwo_mutationObserved",
        MUTATION_FOUND: "mutationFound",
        SET_ENV: "setEnvironment",
        ACTIVATED: "vwo_activated",
        _ACTIVATED: "vwo__activated",
        RECORDING_NOT_ELIGIBLE: "rNE",
        VARIATION_SHOWN: "vwo_variationShown",
        MOUSEDOWN: "dom.mousedown",
        TOUCHEND: "dom.touchend",
        TOUCHMOVE: "dom.touchmove",
        NEW_SURVEY_FOUND: "nSF",
        SYNC_VISITOR_PROP: "vwo_syncVisitorProp",
        EXECUTE_FUNNEL_FOR_GOAL_CAMPAIGN: "executeFunnelCampForGoalCampaign",
        EDITOR_APPLY_CHANGES_COMPLETE: "editorApplyChangesComplete",
        INIT_VWO_INTERNALS: "initVWOInternals",
        SET_CAMPAIGN_TO_OBSERVE: "setCampaignToObserve",
        SEGMENTATION_EVALUATED: "sE",
        ELEMENTS_SHOWN_WITHOUT_CHANGES: "eSWC",
        CUSTOM_CONVERSION: "vwo_conversion",
        DOM_SUBMIT: "vwo_dom_submit",
        DOM_CLICK: "vwo_dom_click",
        GROUP_WINNER_CHOOSEN: "vwo_groupWinnerChosen",
        CHECK_SEGMENTATION: "checkSegmentation",
        TRACK_NEW_SESSION_CREATED: "tnSC",
        TRACK_SESSION_CREATED: "tSC"
    };
    class jt {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.dataSync." + e[0], window.fetcher.getValue(...e)
        }
    }
    const Ht = "lT",
        Bt = "sT",
        Kt = "ivp",
        Yt = "ca",
        qt = 10,
        Jt = "custom",
        Xt = function() {};

    function zt(e) {
        window.vwo_iehack_queue || (window.vwo_iehack_queue = []), window.vwo_iehack_queue.push(e)
    }

    function Qt(e) {
        const {
            data: t,
            apiToUse: n,
            headers: i,
            success: o,
            complete: r,
            error: s
        } = e, {
            url: a
        } = e, c = n && new(n.get("XMLHttpRequest")) || new XMLHttpRequest;
        if (c.open("POST", a, !0), i)
            for (const e in i) i.hasOwnProperty(e) && c.setRequestHeader(e, i[e]);
        t instanceof FormData && (c.formData = t), c.send(t), c.onload = function() {
            o.call(this), r.call(this, e.callbackContext)
        }, c.onerror = function() {
            s.call(this), r.call(this, e.callbackContext)
        }
    }

    function Zt(e, t) {
        const {
            apiToUse: n,
            success: i,
            error: o,
            complete: r,
            callbackContext: s
        } = e;
        let {
            url: a
        } = e;
        const c = n && new(n.get("Image")) || new Image;
        a += t ? "&_bf=1" : "", c.src = a, c.onload = function() {
            i.call(this), r.call(this, s)
        }, c.onerror = function() {
            o.call(this), r.call(this)
        }, zt(c)
    }

    function en(e, t) {
        e.data ? Qt(e) : Zt(e, false)
    }

    function tn(e) {
        let {
            url: t,
            miscOptions: n
        } = e;
        t.indexOf("?") < 0 && (t += "?");
        return t += n ? "&vn=" + n.vn + "&vns=" + n.vns + "&vno=" + n.vno : "", t.indexOf("&cu=") < 0 && t.indexOf("&url=") < 0 && (t += "&_cu=" + encodeURIComponent(document.URL.slice(0, 100))), document.referrer && t.indexOf("&ru=") < 0 && (t += "&_ru=" + encodeURIComponent(document.referrer.slice(0, 100))), t.indexOf("&eTime=") < 0 && (t += "&eTime=" + ct()), t += "&random=" + Math.random(), t.indexOf("?&") > 0 && (t = t.replace("?&", "?")), t
    }
    const nn = function(e) {
        const t = function() {};
        let n = !1;
        (e.success || e.error) && (n = !0), e.success = e.success || t, e.error = e.error || t, e.complete = e.complete || t, e.url = tn(e), e.callbackContext = e.callbackContext || {};
        const {
            data: i,
            url: o,
            useBeacon: r,
            complete: s
        } = e;
        if (n && !r) return en(e, !1), {
            typeOfCall: nn.callTypes.NONBEACON
        };
        return "function" == typeof navigator.sendBeacon && (window.VWO.data && window.VWO.data.fB || r) && navigator.sendBeacon(o, i) ? (s(e.callbackContext), {
            typeOfCall: nn.callTypes.BEACON
        }) : (en(e, !0), {
            typeOfCall: nn.callTypes.NONBEACON
        })
    };
    nn.shouldCompress = function(e) {
        return e.length > 1800
    }, nn.callTypes = {
        BEACON: "beacon",
        NONBEACON: "non-beacon"
    };
    class on {
        constructor() {
            this.vwoEventsToBeSynced = {
                [Ft.VARIATION_SHOWN]: {
                    ignoreMetricDataCheck: !0
                },
                [Ft.PAGE_VIEW]: {},
                [Ft.DOM_CLICK]: {},
                [Ft.DOM_SUBMIT]: {},
                [Ft.CUSTOM_CONVERSION]: {},
                [Ft.SYNC_VISITOR_PROP]: {
                    ignoreMetricDataCheck: !0
                }
            }
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.dataSync.utils." + e[0], window.fetcher.getValue(...e)
        }
        shouldSendEventCall(e, t) {
            var n;
            const i = t.name;
            if (!i) return !1;
            const o = this.vwoEventsToBeSynced[t.name];
            if (void 0 === o && !t.props.isCustomEvent) return !1;
            if (t.props.isCustomEvent) return !0;
            if (!o || !o.ignoreMetricDataCheck) {
                const t = null === (n = e.eventDataConfig) || void 0 === n ? void 0 : n[i];
                if (!t || Object.keys(t).length <= 0) return !1
            }
            if (t.name !== Ft.VARIATION_SHOWN) return !0;
            let r = "non-analytics";
            location.href.includes("jsMode=Any") && (r = "analytics");
            const s = null == t ? void 0 : t.props,
                a = null == s ? void 0 : s.id;
            if (!s || !a) return !1;
            const c = e.currentSettings.dataStore.campaigns[a] || window._vwo_exp[a],
                l = window.VWO.modules.utils.libUtils.isSessionBasedCampaign2(c),
                u = "SURVEY" === c.type;
            return !(!("analytics" === r || "non-analytics" === r && s.isFirst) || l || u)
        }
        evaluateDataForEventsCall(e, t, n) {
            let i = !0;
            this.syncAdditionalDataWithEventsData(e.eventDataConfig, n);
            const o = {
                d: {}
            };
            return o.d.msgId = `${t}-${+new Date}`, o.d.visId = t, o.d.event = {
                props: this.excludeEventPropsNotToBeSynced(e, n.name, n.props),
                name: n.name,
                time: n.time
            }, n.props.$visitor && (o.d.visitor = this.excludeVisitorPropsNotToBeSynced(e, n.props.$visitor), delete n.props.$visitor, Object.keys(o.d.visitor.props).length <= 0 && (i = !1)), o.d.event.props.page = n.page || this.getPageInfo(), {
                payload: o,
                shouldSyncCall: i
            }
        }
        getPageInfo() {
            return Ue.page
        }
        excludeVisitorPropsNotToBeSynced(e, t) {
            if (!t) return {
                props: {}
            };
            const n = t.props,
                i = e.currentSettings.dataStore.visitorProps || window.VWO._.allSettings.dataStore.visitorProps,
                o = {};
            for (const e in n)
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    const t = null == i ? void 0 : i[e];
                    t && !t.nS && (o[e] = n[e])
                }
            return t.props = o, t
        }
        syncAdditionalDataWithEventsData(e, t) {
            const n = null == e ? void 0 : e[t.name];
            if (n) {
                for (const e in n)
                    if (Object.prototype.hasOwnProperty.call(n, e) && "shouldSyncData" !== e) {
                        const i = n[e];
                        if (void 0 === i) continue;
                        t.props ? t.props[e] = i : t[e] = i
                    }
                this.resetDataForCurrentEvent(e, t.name)
            }
        }
        resetDataForCurrentEvent(e, t) {
            e && e[t] && (e[t] = {})
        }
        excludeEventPropsNotToBeSynced(e, t, n) {
            var i, o, r, s, a, c, l;
            const u = ["fireLinkedTagSync", "isTrusted", "page"];
            if (!n.isCustomEvent) {
                const n = (null === (s = null === (r = null === (o = null === (i = e.currentSettings) || void 0 === i ? void 0 : i.dataStore) || void 0 === o ? void 0 : o.events) || void 0 === r ? void 0 : r[t]) || void 0 === s ? void 0 : s.nS) || (null === (l = null === (c = null === (a = window.VWO._.allSettings.dataStore) || void 0 === a ? void 0 : a.events) || void 0 === c ? void 0 : c[t]) || void 0 === l ? void 0 : l.nS) || [];
                Array.prototype.push.apply(u, n)
            }
            if (!u || !u.length) return n;
            const d = {};
            for (const e in n) Object.prototype.hasOwnProperty.call(n, e) && (u.indexOf(e) > -1 ? delete d[e] : d[e] = n[e]);
            return d
        }
    }
    class rn {
        constructor() {
            this.uuid = "", this.TPJarExpiry = 730, this.preview = We
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.utils.libUtils." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
        isDomDependent(e) {
            return "VISUAL_AB" === e || "VISUAL" === e
        }
        generateUUID() {
            return "Jxxxxxxxxxxx4xxxyxxxxxx5xxxxxxxx9".replace(/[xy]/g, (function(e) {
                const t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16).toUpperCase()
            }))
        }
        isDomIndependentCampaign(e) {
            return "ANALYSIS" === e || "SURVEY" === e || "ANALYZE_RECORDING" === e || "ANALYZE_HEATMAP" === e || "ANALYZE_FORM" === e || "TRACK" === e || "FUNNEL" === e
        }
        isSessionBasedCampaign2(e) {
            const t = e.type;
            return "ANALYZE_RECORDING" === t || "ANALYZE_HEATMAP" === t || "ANALYZE_FORM" === t || "TRACK" === t || "FUNNEL" === t
        }
        isBot2() {
            return window.navigator.userAgent.toLowerCase().indexOf("bot") >= 0 || window.navigator.userAgent.toLowerCase().indexOf("spider") >= 0 || window.navigator.userAgent.toLowerCase().indexOf("preview") >= 0
        }
        isPageBasedGoal(e) {
            return "SEPARATE_PAGE" === e || "CUSTOM_GOAL" === e || "REVENUE_TRACKING" === e
        }
        isSplitVariation(e) {
            return "SPLIT_URL" === e.type && e[Kt]
        }
        shouldTrackUserForCampaign(e) {
            return !e || !window._vwo_code || !window._vwo_code[Ht] && !window._vwo_code[Bt] || (this.isDomIndependentCampaign(e.type) || this.isSplitVariation(e))
        }
        getUUIDString(e) {
            return e ? "&u=" + e : ""
        }
        isAnalyzeCampaign(e) {
            return "ANALYZE_RECORDING" === e || "ANALYZE_HEATMAP" === e || "ANALYZE_FORM" === e
        }
        updateGoalsKind(e) {
            let t = {};
            Object.keys(e).forEach((n => {
                const i = e[n],
                    o = e[n].mt;
                o && Object.keys(i.goals).length && Object.entries(o).forEach((([e, i]) => {
                    const o = this.getGoalKind(i);
                    o && (t[n] = t[n] || {}, t[n][e] = o)
                }))
            })), window.VWO._.goalsToBeConvertedSynchronously = t
        }
        getGoalKind(e) {
            let t;
            const n = window.VWO._.allSettings.triggers[e];
            if (n)
                if ("object" == typeof n.cnds[0]) {
                    switch (n.cnds[0].event) {
                        case Ft.DOM_CLICK:
                            t = "CLICK_ELEMENT";
                            break;
                        case Ft.DOM_SUBMIT:
                            t = "FORM_SUBMIT"
                    }
                } else {
                    switch (n.cnds[1].event) {
                        case Ft.DOM_SUBMIT:
                        case Ft.DOM_CLICK:
                            t = "ENGAGEMENT"
                    }
                }
            return t
        }
    }
    const sn = window.VWO.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM || 1 / 48,
        an = {
            TRACK_GLOBAL_COOKIE_NAME: "_vwo_ds",
            TRACK_SESSION_COOKIE_NAME: "_vwo_sn",
            TRACK_SESSION_COOKIE_EXPIRY: sn,
            SESSION_TIMER_EXPIRE: 60 * sn * 60 * 1e3 * 24,
            COOKIE_VERSION: 3,
            COOKIE_TS_INDEX: 1,
            COOKIE_VERSION_INDEX: 0,
            FIRST_SESSION_ID_INDEX: 0,
            PC_TRAFFIC_INDEX: 1,
            RELATIVE_SESSION_ID_INDEX: 0,
            PAGE_ID_INFORMATION_INDEX: 1,
            SESSION_SYNCED_STATE_INDEX: 4,
            PAGE_ID_EXPIRY: 15,
            GLOBAL_OPT_OUT: "_vwo_global_opt_out",
            OPT_OUT: "_vis_opt_out",
            TEST_COOKIE: "_vis_opt_test_cookie",
            COOKIE_JAR: "_vwo",
            SAME_SITE: "_vwo_ssm",
            UUID: "uuid",
            UUID_V2: "uuid_v2",
            DEFAULT_EXPIRY: 100,
            UUID_COOKIE_EXPIRY: 3650
        };

    function cn() {
        return Math.min(window.VWO.TRACK_GLOBAL_COOKIE_EXPIRY_CUSTOM || window.VWO.data.rp || 90, 90)
    }
    const ln = window.JSON && window.JSON.parse || function(e) {
            return new Function("return " + e)()
        },
        un = window.JSON && window.JSON.stringify || function(e) {
            return new Function("return " + e)()
        };
    var dn = Object.freeze({
        __proto__: null,
        jsonParse: ln,
        jsonStringify: un
    });

    function gn(e) {
        if ("object" != typeof e) return '"' + e + '"';
        let t = "";
        try {
            const n = Ze(e);
            let i = n.length;
            for (; i--;) {
                const o = n[i];
                t += '"' + o + '":' + gn(e[o]) + ","
            }
            t = "{" + t.slice(0, -1) + "}"
        } catch (t) {
            window.VWO._.customError && window.VWO._.customError({
                msg: "Error in json stringify - " + e,
                url: "utils.js",
                lineno: 98,
                colno: 9,
                source: encodeURIComponent("json-stringify")
            })
        }
        return t
    }

    function hn(e, t) {
        let n = !1;
        return function() {
            n || (e.call(this, arguments), n = !0, setTimeout((function() {
                n = !1
            }), t))
        }
    }

    function pn(e, t) {
        let n, i = !1;
        return function(...o) {
            i && (clearTimeout(n), n = null), n = setTimeout((function() {
                e.apply(null, o)
            }), t), i = !0
        }
    }

    function vn(e, t, n) {
        let i = document.URL;
        e && window.history ? function(e, t) {
            const n = function(n) {
                const o = e[n];
                e[n] = function(n) {
                    const r = o.apply(e, [].slice.call(arguments));
                    return window.fetcher.postMessage({
                        type: "sync",
                        property: "URL",
                        value: document.URL,
                        syncType: 2
                    }), t({
                        state: n,
                        currentUrl: document.URL,
                        previousUrl: i
                    }), i = document.URL, r
                }
            };
            n("pushState"), n("replaceState")
        }(window.history, t) : window.addEventListener("hashchange", t, !1)
    }

    function wn(e) {
        e.fn.nonEmptyContents = function() {
            if (!this || !this.length) return this.contents();
            const e = this.contents();
            let t;
            for (let n = e.length; n--;) t = e.get(n), 3 !== t.nodeType || /\S/.test(t.nodeValue) || e.splice(n, 1);
            return e
        };
        const t = function(e, t, n) {
            (navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1) && e.style.setProperty(t, n.replace("!important", "").trim()), e.style.setProperty(t, n.replace("!important", ""), "important")
        };
        e.fn.vwoCss = function() {
            let n;
            if (1 === arguments.length) {
                if ("string" == typeof arguments[0]) return this.css(arguments[0]);
                for (const e in arguments[0]) arguments[0].hasOwnProperty(e) && (n = arguments[0][e].toString(), n.indexOf("important") > -1 ? this.each((function() {
                    t(this, e, n)
                })) : this.css(arguments[0]))
            } else if (2 === arguments.length) {
                const e = arguments[0].toString();
                n = arguments[1] ? arguments[1].toString() : null, n && n.indexOf("important") > -1 ? this.each((function() {
                    t(this, e, n)
                })) : this.css(e, n)
            } else e.fn.css.apply(this, arguments);
            return this
        }, e.fn.vwoAttr = function() {
            if (this && this.length) {
                if (2 !== arguments.length) {
                    if (1 === arguments.length) {
                        if ("string" == typeof arguments[0]) return this.attr(arguments[0]); {
                            const t = arguments[0],
                                n = e.extend({}, t);
                            if (Array.isArray(n.removedAttributes))
                                for (let e = n.removedAttributes.length - 1; e >= 0; e--) n[n.removedAttributes[e]] && delete n[n.removedAttributes[e]];
                            else delete n.removedAttributes;
                            const i = ["type", "height", "width"],
                                o = this.get(0);
                            for (let e in i)
                                if (i.hasOwnProperty(e)) {
                                    const t = i[e];
                                    n[t] && (o.setAttribute(t, n[t]), delete n[t])
                                }
                            if (n.class) {
                                const e = n.class.addedClasses,
                                    t = n.class.removedClasses;
                                e && e.length > 0 && this.addClass(e.join(" ")), t && t.length > 0 && this.removeClass(t.join(" ")), delete n.class
                            }
                            if (n.removedAttributes && n.removedAttributes.length > 0) {
                                for (let e = 0; e < n.removedAttributes.length; e++) this.get(0).removeAttribute(n.removedAttributes[e]);
                                delete n.removedAttributes
                            }
                            if (n.src && n.loader) {
                                const t = `vwo-loader-el-${n.loaderConfig.id}`;
                                if (this.attr("src") !== n.src && !this.hasClass(t)) {
                                    this.attr("src", "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                                    const i = n.src,
                                        o = n.srcSet;
                                    o && this.removeAttr("srcset"), e("head").append(`<style type="text/css" id="${t}">.${t}{width:${n.width}px;height:${n.height}px;animation-timing-function: linear;animation-duration: ${n.loaderConfig.as};animation-iteration-count: infinite;animation-name: placeHolderShimmer;background: #ccc;background: linear-gradient(to right, ${n.loaderConfig.pc} 8%, ${n.loaderConfig.sc} 38%, ${n.loaderConfig.pc} 54%);display: inline-block;}@keyframes placeHolderShimmer{0%{background-position: -468px 0}100%{background-position: 468px 0}}</style>`);
                                    const r = new Image;
                                    r.onload = r.onerror = () => {
                                        this.attr("src", i), o && this.attr("srcset", o), e(`#${t}`).remove(), this.removeClass(t)
                                    }, r.src = i, o && (r.srcset = o), this.addClass(t)
                                }["src", "srcSet", "loader", "loaderConfig"].forEach((e => {
                                    delete n[e]
                                }))
                            }
                            return this.attr(n)
                        }
                    }
                    return e.fn.attr.apply(this, arguments)
                }
                this.get(0).setAttribute(arguments[0], arguments[1])
            }
            return this
        };
        const n = window._vwo_editorOperationTracker = {};
        e.fn.vwoElement = function(t) {
            const i = `vwo_w_${t.id}`,
                o = t.opId,
                r = e => {
                    o && (e ? n[o] = e : delete n[o])
                },
                s = () => {
                    r("sw-attached"), x.phoenix('on("${{1}}", "${{2}}")', null, {
                        captureGroups: [t.sw.p_dsl, () => {
                            r("sw-executed"), !t.sw.executed && a(), t.sw.executed = !0
                        }]
                    }), x.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [`widget-${t.id}-sw-ready`]
                    })
                },
                a = () => {
                    const n = t.id && `#vwo-widget-${t.id}` || "";
                    this[t.position](t.html), r(), t.js && (x.phoenix('on("${{1}}", "${{2}}")', null, {
                        captureGroups: [t.js.p_dsl, () => {}]
                    }), x.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [`widget-${t.id}-js-ready`]
                    })), n && (t => {
                        const n = e(t);
                        n.length && n.get(0).addEventListener("close_button_clicked", (function() {
                            r("disconnected")
                        }))
                    })(n), t.rec && c(), t.hw && (x.phoenix('on("${{1}}", "${{2}}")', null, {
                        captureGroups: [t.hw.p_dsl, () => {
                            let n = V.get(i);
                            n && (n = ln(n), n.d = 1, V.set(i, gn(n))), (t => {
                                e(t).remove()
                            })(`#vwo-widget-${t.id}`)
                        }]
                    }), x.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [`widget-${t.id}-hw-ready`]
                    }))
                },
                c = () => {
                    let e = V.get(`vwo_w_${t.id}`);
                    if (e) {
                        e = ln(e);
                        for (const t in e) switch (t) {
                            case "v":
                                e[t] = parseInt(e[t]) + 1;
                                break;
                            case "l_ts":
                                e[t] = Date.now()
                        }
                        V.set(`vwo_w_${t.id}`, gn(e))
                    } else l(e)
                },
                l = e => {
                    !e && (e = V.get(`vwo_w_${t.id}`)), e || V.set(`vwo_w_${t.id}`, gn(t.sks))
                };
            return t && this.length && t.position && !(() => {
                t.sks && l();
                let e = V.get(`vwo_w_${t.id}`);
                return !!e && (e = ln(e), 1 == e.d)
            })() && (t.rec ? (r("rec-attached"), x.phoenix('on("${{1}}", "${{2}}")', null, {
                captureGroups: [t.rec.p_dsl, () => {
                    r("rec-executed"), t.sw ? s() : a()
                }]
            }), x.phoenix('trigger("${{1}}")', null, {
                captureGroups: [`widget-${t.id}-rec-ready`]
            })) : t.sw ? s() : a()), this
        }, e.fn.performOp = function(t) {
            try {
                if (this && this.length) return n[t] ? e() : (n[t] = "in-progress", this)
            } catch (e) {}
            return this
        }, e(window).bind("unload", (function() {
            try {
                const e = [],
                    t = x.queue || x;
                for (let n = t.length; n--;) {
                    const i = t[n],
                        o = i && i.length && i[0];
                    o && o.startsWith("track") && e.push(i)
                }
                e.length && V.set(`_vwo_track_data_${window._vwo_acc_id}`, gn(e))
            } catch (e) {
                const t = "[JSLIB EVENT] Error unload event.";
                window.VWO._.customError && window.VWO._.customError({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }))
    }

    function fn(e) {
        return N(this, void 0, void 0, (function*() {
            yield x.phoenix('store.actions.addValues("${{1}}", "${{2}}" )', null, {
                captureGroups: [e, "vwoInternalProperties"]
            })
        }))
    }
    window.VWO.modules.utils.helperFunctions = {
        onUrlChange: vn
    };
    class _n extends rn {
        constructor() {
            super(...arguments), this.loadScriptLoadedScripts = {}, this.noopFn = () => {}
        }
        deleteAllCss() {
            const e = document.getElementById("_vis_opt_path_hides");
            e && e.parentNode.removeChild(e)
        }
        getUUID(e) {
            e = e || {}, this.uuid = Ue.vwoUUID;
            const t = e && e.id && e.multiple_domains && Le.get("_vwo_uuid_" + e.id) || Le.get("_vwo_uuid");
            return this.uuid = t || this.uuid || this.generateUUID()
        }
        createUUIDCookie2(e) {
            const t = this.getUUID(e),
                n = e && e.id && e.multiple_domains ? "_" + e.id : "";
            return Le.get("_vwo_uuid" + n) || this.createCookieMT("_vwo_uuid" + n, t, an.UUID_COOKIE_EXPIRY, e), x.data = x.data || {}, x.data.vin = x.data.vin || {}, x.data.vin.uuid = t, t
        }
        extraData2(e) {
            var t, n, i, o, r = {},
                s = x.modules.tags.sessionInfoService.getInfo(),
                a = e ? s.r : xe.get();
            const c = window.screen.width,
                l = window.screen.height;
            return r.sr = c + "x" + l, r.sc = window.screen.colorDepth, r.de = document.characterSet || document.charset, r.ul = window.navigator.language.toLocaleLowerCase(), r.r = a, r.lt = (new Date).getTime(), r.tO = lt(), r.tz = (null === (o = null === (i = null === (n = null === (t = null === Intl || void 0 === Intl ? void 0 : Intl.DateTimeFormat) || void 0 === t ? void 0 : t.call(Intl)) || void 0 === n ? void 0 : n.resolvedOptions) || void 0 === i ? void 0 : i.call(n)) || void 0 === o ? void 0 : o.timeZone) || "", JSON.stringify(r)
        }
        createCookie(e, t, n, i, o) {
            return N(this, void 0, void 0, (function*() {
                return this.otherSide('createCookie("${{1}}", "${{2}}", "${{3}}", "${{4}}", "${{5}}")', null, [null, t, n, i, o])
            }))
        }
        createCookieMT(e, t, n, i) {
            this.shouldTrackUserForCampaign(i) && (i && i.multiple_domains ? Le.createThirdParty(e, t, n, void 0, i.id, void 0, i) : Le.create(e, t, n))
        }
        setTPCJarValue(e, t, n, i, o, r) {
            Le.setThirdPartyCookiesInJar(e, t, n, o), this.__vwoCookie = Le.getThirdPartyJarValue(), this.dTP = this.dTP || pn((() => window.VWO.phoenix.storages.get("cookies").createThirdParty.call(window.VWO.phoenix.storages.get("cookies"), "_vwo", this.__vwoCookie, this.TPJarExpiry, void 0, void 0, void 0, r)), 50), this.__vwoCookie && this.dTP()
        }
        isSSApp({
            getters: e,
            vwoEvents: t
        }) {
            var n;
            const i = x._.sstd;
            if (!i) return !1;
            if (e.vwoInternalProperties.ssdm) return x.data.sst && e.vwoInternalProperties.ssdm;
            try {
                let t = null === (n = e.document.domain) || void 0 === n ? void 0 : n.match(i);
                if (t = window.document.domain.match(i), t && t.length > 0) return x.data.sst
            } catch (e) {
                return t.trigger(Ft.ERROR, {
                    msg: `Invalid regex for domain. sstd = ${x._.sstd}`,
                    source: encodeURIComponent(`Invalid regex for domain. VWO._.sstd = ${x._.sstd}`)
                }), !1
            }
        }
        doesUuidCookiesExist() {
            return !!Le.get("_vwo_uuid") || !!st(document.cookie.split(";"), (function(e) {
                return 0 === e.trim().indexOf("_vwo_uuid_") && 0 !== e.trim().indexOf("_vwo_uuid_v2")
            })).length
        }
        doNotTrack(e) {
            if (e.settings.vwoData.dntEnabled) return "yes" === e.navigator.doNotTrack || "1" == e.navigator.doNotTrack || "1" == e.navigator.msDoNotTrack || "1" == e.doNotTrack
        }
        isGloballyOptedOut(e) {
            return !!parseInt(e.storages.storages.cookies.get(an.GLOBAL_OPT_OUT), 10)
        }
        _optOut(e, t) {
            return t.trigger(Ft.OPT_OUT, {
                oldArgs: [!1]
            }), !1
        }
        doesSessionBasedCampaignExistsInTags(e) {
            var t = e && ln(e),
                n = 0,
                i = t && "object" == typeof t && t.si;
            if (i && "object" == typeof i)
                for (var o in i)
                    if (i.hasOwnProperty(o) && (n = this.isSessionBasedCampaign2(window._vwo_exp[o]) ? 1 : 0)) return !!n;
            return !!n
        }
        delCSS({
            ruleName: e,
            campaignData: t
        }) {
            if ("string" != typeof e) return;
            let n, i, o, r, s, a, c;
            if (e = e.toLowerCase(), t ? (n = document.getElementById("_vis_opt_path_hides_" + t.id), c = "{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}") : (n = window._vwo_style || document.getElementById("_vis_opt_path_hides"), c = window._vwo_css), n) {
                if (n)
                    if (n.sheet) {
                        n.styleSheet || (e = e.replace(/\*:/g, ":")), i = n.sheet, o = i.cssRules.length && i.cssRules[0].selectorText ? i.cssRules[0].selectorText.toLowerCase().split(",") : "", r = "";
                        let t = 0;
                        for (s = 0; s < o.length; s++) vwo_$.trim(o[s]) !== e || t ? r += o[s] + "," : t || (t = 1);
                        if (r && t) {
                            r = r.substr(0, r.length - 1);
                            try {
                                i.insertRule(r + c, 1)
                            } catch (e) {} finally {
                                i.deleteRule(0)
                            }
                        } else n && n.parentNode && n.parentNode.removeChild(n)
                    } else if (n.styleSheet) {
                    i = n.styleSheet, s = 0;
                    do {
                        a = i.rules[s], a && a.selectorText.toLowerCase() === e ? i.removeRule(s) : s++
                    } while (a)
                }
                O.mark(`el-${e}-shown`), O.measure(`elHidden-${e}`, `el-${e}-hidden`, `el-${e}-shown`), window.fetcher.getValue('phoenix.trigger("${{1}}","${{2}}")', null, {
                    captureGroups: [Ft.DELETE_CSS_RULE, {
                        oldArgs: [e]
                    }]
                })
            }
        }
        insertCSS(e, t) {
            let n, i;
            "object" != typeof e || e instanceof Array || (n = e, e = n.id, i = n.className);
            let o = document.getElementById(e);
            if (o) try {
                o.removeChild(o.childNodes[0])
            } catch (e) {} else {
                const t = document.getElementsByTagName("head")[0];
                o = document.createElement("style"), e && o.setAttribute("id", e), i && o.setAttribute("class", i), o.setAttribute("type", "text/css"), t.appendChild(o)
            }
            if (o.styleSheet) o.styleSheet.cssText = t;
            else {
                const e = document.createTextNode(t);
                o.appendChild(e)
            }
        }
        isCustomEvent(e) {
            return e && "string" == typeof e && e.startsWith(Jt)
        }
        loadScript(e, t) {
            if (this.loadScriptLoadedScripts[e]) return;
            this.loadScriptLoadedScripts[e] = 1;
            const n = document.createElement("script");
            n.src = e, /\/web\/.*\/tag-/.test(e) && (n.crossOrigin = "anonymous"), n.type = "text/javascript", t = t || this.noopFn, n.onerror = function() {
                t()
            }, document.getElementsByTagName("head")[0].appendChild(n), n.parentNode ? n.parentNode.removeChild(n) : window.setTimeout((function() {
                n.parentNode && n.parentNode.removeChild(n)
            }), 100)
        }
        setCampaignIds(e) {
            window._vwo_exp_ids = window._vwo_exp_ids || [], e = e || [], window._vwo_exp_ids.push(...e), fn({
                experimentIds: window._vwo_exp_ids
            })
        }
        getSplitDecision(e) {
            return Le.get("_vis_opt_exp_" + e + "_split")
        }
        shouldStopExecWhenSsmNotFound() {
            Le.create("_vwo_ssm", 1, 3650, void 0, void 0, !0);
            const e = Le.get("_vwo_ssm", !0);
            return Le.erase("_vwo_ssm", void 0, !0), !e
        }
        areCookiesDisabled(e) {
            return e && Le.create(an.TEST_COOKIE, "1", void 0), !Le.get(an.TEST_COOKIE)
        }
    }
    const En = new _n;
    window.VWO.modules.utils.libUtils = En;
    class mn extends on {
        handleDomTriggeredEvent(e) {
            const t = e.name;
            t.indexOf("vwo_dom_") < 0 || (t === Ft.DOM_CLICK && (e.name = "click"), t === Ft.DOM_SUBMIT && (e.name = "submit"))
        }
        sendCall(e, t, n, i, o, r, s) {
            const a = null == t ? void 0 : t.successCallback,
                c = null == t ? void 0 : t.errorCallback,
                l = Ue.serverUrl,
                u = Ue.accountId,
                d = l.endsWith("/");
            let g = l;
            if (s) g += `${d?"":"/"}events/t?en=${s.name}&a=${u}&v=${window.VWO.v_e}`;
            else {
                if (!t) return;
                g = g + t.url + "&vn=" + t.vn + "&vns=" + t.vns + "&vno=" + t.vno + "&eTime=" + ct() + "&v=" + window.VWO.v_e
            }
            window.VWO._.isBeaconAvailable = !0, o = window.VWO.data.tB && (window.VWO._.isLinkRedirecting || o);
            nn({
                url: g,
                complete: i,
                success: a,
                error: c,
                data: n,
                useBeacon: o,
                callbackContext: r
            }).typeOfCall !== nn.callTypes.BEACON && (window.VWO._.isBeaconAvailable = !1)
        }
        addDataFromMTAndSend(e, t, n, i, o, r, s) {
            return s && s.name === Ft.VARIATION_SHOWN && (s.props.extraData = En.extraData2()), this.sendCall(e, t, n, i, o, r, s)
        }
        getDataForEventsCall(e, t, n) {
            const i = window.VWO.modules.tags.sessionInfoService;
            let {
                payload: o,
                shouldSyncCall: r
            } = this.evaluateDataForEventsCall(e, t, n);
            return o.d.sessionId = i.getSessionId(), {
                data: JSON.stringify(o),
                shouldSyncCall: r
            }
        }
    }
    const Sn = new mn;
    window.VWO.modules.tags.dataSync = {
        utils: Sn
    };
    var On = new mn;
    class Tn extends jt {
        execute({
            event: e
        }, t, n, i, o, r) {
            if (i = i || Xt, window._vis_debug) i && i(o);
            else if (On.shouldSendEventCall({
                    eventDataConfig: t
                }, e)) {
                r = r || En.createUUIDCookie2(n);
                const {
                    data: s,
                    shouldSyncCall: a
                } = On.getDataForEventsCall({
                    eventDataConfig: t
                }, r, e);
                a && On.sendCall(null, null, s, i, !0, o, e)
            } else i && i(o)
        }
    }
    const yn = new Tn,
        Cn = yn.execute.bind(yn);
    window.VWO.modules.tags.dataSync = Object.assign(window.VWO.modules.tags.dataSync, Cn);
    class In {
        toAbsURL(e) {
            return new URL(e, document.baseURI).href
        }
        isHashPresent(e) {
            return -1 !== e.indexOf("#")
        }
        isQueryParamPresent(e, t) {
            var n = e.indexOf("#"),
                i = e.indexOf("?"),
                o = t ? -1 : e.indexOf("=");
            return -1 === n ? -1 !== i || -1 !== o : -1 !== i && n > i || -1 !== o && n > o
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.vwoUtils.urlUtils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class Nn extends In {}
    const An = new Nn;

    function bn(e, t, n, i = null) {
        return window.fetcher.getValue('VWO.modules.events.fireEventAndSyncData("${{1}}","${{2}}","${{3}}", "${{4}}" )', null, {
            captureGroups: [null, t, n, i]
        })
    }

    function Rn(e, t, n, i = {}, o = null) {
        if (t.name = e || t.name, !t.props) {
            t.props = {};
            for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && "props" !== e && (t.props[e] = t[e]);
            Object.keys(i).forEach((e => {
                t.props[e] = i[e]
            }))
        }
        let r;
        if (t.name === Ft.DOM_SUBMIT || t.name === Ft.DOM_CLICK && t.targetUrl ? t.props.targetUrl = t.targetUrl = An.toAbsURL(t.targetUrl) : t.name === Ft.VARIATION_SHOWN && (r = window._vwo_exp[t.props.id]), t.time = t.time || +new Date, (n = n[t.name]) && n.splitAmongMultipleCalls) {
            const e = Object.keys(n);
            for (let i = e.length - 1; i >= 0; --i) {
                const r = e[i];
                if ("splitAmongMultipleCalls" === r) continue;
                const s = n[r].uuid;
                delete n[r].uuid, n[t.name] = n[r], Cn({
                    event: t
                }, n, window._vwo_exp[r], o, null, s)
            }
        } else Cn({
            event: t
        }, r)
    }
    window.VWO.modules.vwoUtils.urlUtils = An;
    class Ln {}
    const Vn = function() {
            let e;
            if (window.VWO._.eventsManager) return window.VWO._.eventsManager;
            var t = [],
                n = !0,
                i = [],
                o = [],
                r = {
                    bind: "unbind",
                    live: "die",
                    on: "off"
                },
                s = [];
            var a = /iPhone|iPad/.test(navigator.userAgent);

            function c(e) {
                return !window.VWO.DONT_IOS && (!("touchmove" !== e && "touchstart" !== e && "touchend" !== e || !a) || void 0)
            }

            function l(e, t) {
                n && s.push({
                    type: e,
                    state: t,
                    ref: e[t]
                })
            }

            function u() {
                for (var e = s.length - 1; e >= 0; e--) {
                    var t = s[e];
                    t.type[t.state] = t.ref
                }
            }
            return e = {
                addEventListener: function(i, o, r, s) {
                    if (!c(o)) return n && t.push({
                        $el: i,
                        name: o,
                        callback: r,
                        capture: s
                    }), i.addEventListener ? i.addEventListener(o, r, s) : i.attachEvent && i.attachEvent("on" + o, r, s), e
                },
                addMutationObserver: function(e, t, n, i) {
                    var r;
                    if (void 0 !== window.MutationObserver ? r = window.MutationObserver : void 0 !== window.WebKitMutationObserver && (r = window.WebKitMutationObserver), r) try {
                        const r = new MutationObserver(e.bind(i));
                        o.push(r), r.observe(t, n)
                    } catch (e) {}
                },
                clearAllListeners: function() {
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n],
                            c = a.$el;
                        a.jqType ? (l = c, d = a.jqType, g = a.eventName, h = a.callback, p = a.selector, v = a.capture, d && (p ? l[r[d]] && l[r[d]](g, p, h, v) : l[r[d]] && l[r[d]](g, h, v))) : c.removeEventListener ? c.removeEventListener(a.name, a.callback, a.capture) : c.detachEvent && c.detachEvent("on" + a.name, a.callback)
                    }
                    var l, d, g, h, p, v;
                    return o.forEach((e => {
                            e.disconnect()
                        })),
                        function() {
                            for (var e = 0; e < i.length; e++) {
                                var t = i[e];
                                "interval" === t.type ? clearInterval(t.name) : clearTimeout(t.name)
                            }
                        }(), u(), t.length = 0, s.length = 0, o.length = 0, i.length = 0, e
                },
                addJqEventListener: function(i, o, r, s, a, l) {
                    return c(r) || (n && t.push({
                        $el: i,
                        jqType: o,
                        eventName: r,
                        callback: s,
                        selector: a,
                        capture: l
                    }), a ? i[o](r, a, s, l) : i[o](r, s, l)), e
                },
                pushTimers: function(t, o) {
                    if (n) return i.push({
                        name: t,
                        type: o
                    }), e
                },
                addOverrideState: l,
                overrideHistoryPush: function(e, t, i) {
                    if (n) {
                        var o = e[i];
                        l(e, i), e[i] = function(n) {
                            var i = o.apply(e, [].slice.call(arguments));
                            try {
                                t({
                                    state: n
                                })
                            } catch (e) {}
                            return i
                        }
                    }
                },
                revertOverriddenStates: u,
                init: function(e) {
                    n = e.shouldPushToQueue
                }
            }, window.VWO._.eventsManager = e, e
        }(),
        xn = dt((function() {
            window.dataLayer.push({
                event: "VWO"
            })
        }), 1),
        Un = {};

    function Dn(e) {
        var t = setInterval((function() {
            if (window.GoogleAnalyticsObject || window.ga) {
                var n = window.GoogleAnalyticsObject || "ga";
                if (window[n].getAll) {
                    clearInterval(t);
                    var i = window[n].getAll(),
                        o = !1;
                    window.gtag && i && i[0] && i[0].get("name").indexOf("gtag") >= 0 && (o = !0), e(o, n)
                }
            }
        }), 100);
        Vn.pushTimers(t, "interval")
    }

    function kn(e, t, n, i, o) {
        Dn((function(r, s) {
            if (r) {
                var a = o,
                    c = {
                        event_category: i,
                        non_interaction: !0
                    };
                c[e] = t, o && (c.send_to = a), window.gtag("event", n, c)
            } else {
                (window[s] = window[s] || function() {
                    (window[s].q = window[s].q || []).push(arguments)
                })((function(r) {
                    (r = window[s].getByName(o) || r).set(e, t), r.send("event", i, n, {
                        nonInteraction: !0
                    })
                }))
            }
        }))
    }

    function Pn(e, t, n, i) {
        if (!We() && !window._vis_debug) try {
            i = i || "GA", n && "" !== n ? "GA" === i && (n += ".") : n = "";
            var o = "GA" === i ? 4 : 1;
            if (t = t || window._vis_opt_GA_slot || o, Un[e].c)
                if ("GA" === i) window._gaq = window._gaq || [], window._gaq.push((function() {
                    void 0 === window.pageTracker || n ? window._gaq.push([n + "_setCustomVar", t, "VWO-" + e, Un[e].n, 1], [n + "_trackEvent", "VWO", "Visit", "", 0, !0]) : (window.pageTracker._setCustomVar(t, "VWO-" + e, Un[e].n, 1), window.pageTracker._trackEvent("VWO", "Visit", "", 0, !0))
                }));
                else {
                    var r = "dimension" + t,
                        s = "CampId:" + e + ", VarName:" + Un[e].n;
                    kn(r, s, "Custom", "VWO", n)
                }
        } catch (t) {
            window.VWO._.customError && window.VWO._.customError({
                msg: "Error while pushing data in GA for experiment id - " + e,
                url: "core.js",
                lineno: 2922,
                colno: 9,
                source: encodeURIComponent("VWO-GA-push")
            })
        }
    }

    function Wn(e, t) {
        const n = window._vwo_exp;
        if (En.isSessionBasedCampaign2(n[e])) return;
        let i = 0;
        Un[e] = {}, Un[e].c = t, Un[e].n = n[e].comb_n[Un[e].c] || "";
        const o = n[e].GA ? "GA" : n[e].UA ? "UA" : "";
        if (o && !n[e][o].tracked && (Pn(e, n[e][o].s, n[e][o].p, o), n[e][o].tracked = !0), n[e].GTM) {
            const t = {};
            t["Campaign-" + e] = Un[e].n, window.dataLayer = window.dataLayer || [], window.dataLayer.push(t), i = 1
        }
        i && xn()
    }
    window.VWO.modules.utils.collectAndSendDataForGA = Wn;
    class Mn extends Ln {
        executeCode(e) {
            if (e) try {
                vwo_$("head").append(e)
            } catch (e) {}
        }
    }
    class Gn {
        otherSide(...e) {
            return e[0] = "window.VWO.modules.utils.campaignUtils." + e[0], window.fetcher.getValue(...e)
        }
    }
    var $n = function(e) {
            return e.replace(/^(https?:\/\/)(?:w{3}\.)?(.*?)(?:\/(?:home|default|index)\..{3,4}|\/$)?(?:\/)?([\?#].*)?$/i, "$1$2$3")
        },
        Fn = function(e) {
            return e.replace(/^(https?:\/\/)(?:w{3}\.)?(.*?)(?:(?:home|default|index)\..{3,4})?([\?#].*)?$/i, "$1$2$3")
        },
        jn = function(e) {
            return Fn(e).replace(/\/\?/gi, "?")
        },
        Hn = window._vis_opt_url,
        Bn;
    class Kn {
        constructor() {
            Bn = this
        }
        regexEscape(e) {
            return e.replace(/[\-\[\]{}()*+?.,\/\\^$|#\s]/g, "\\$&")
        }
        cleanURL(e, t) {
            return Hn && !t ? Hn : e.replace(/^(.*[^\*])(\/(home|default|index)\..{3,4})((\?|#).*)*$/i, "$1$4")
        }
        removeWWW(e, t) {
            return e = e.replace(/^(https?:\/\/)(www\.)?(.*)$/i, "$1$3"), t && (e = e.replace(/(^\*?|\/\/)www\./i, "$1")), e
        }
        stripSlashes(e, t, n) {
            if (e = e.replace(/\/$/, ""), t) {
                var i = e.indexOf("/?");
                e.indexOf("?") - 1 === i && (e = e.replace(/\/\?([^\?]*)(.*)/, "?$1$2"))
            }
            if (n) {
                var o = e.indexOf("/#");
                e.indexOf("#") - 1 === o && (e = e.replace(/\/#([^#]*)(.*)/, "#$1$2"))
            }
            return e
        }
        cleanPattern(e) {
            let t = "";
            return {
                regex: e.replace(/\(\?([a-zA-Z])\)/g, ((...e) => (e[1] && (t += e[1]), ""))),
                flags: t
            }
        }
        matchRegex(e, t, n, i) {
            if ("string" != typeof e || "string" != typeof t) return !1;
            let o = "ig";
            if (i) {
                const {
                    regex: n,
                    flags: i
                } = Bn.cleanPattern(t);
                o = i || "g";
                try {
                    return new RegExp(n, o).exec(e)
                } catch (e) {
                    const i = "Failed to create regex for the pattern: " + t + ", the cleaned regex derived from the pattern is: " + n + " and regexFlag is: " + o;
                    return c.error(i), !1
                }
            }
            var r = function(n) {
                var i = new RegExp(t, o).exec(e) || new RegExp(t, o).exec(n(e));
                if (!i && 0 !== e.indexOf("http")) {
                    const r = (new In).toAbsURL(e);
                    i = new RegExp(t, o).exec(r) || new RegExp(t, o).exec(n(r))
                }
                return i
            };
            let s = $n,
                a = !1;
            390187 == window._vwo_acc_id && (a = !0), a && (s = jn);
            var l = r(s);
            return l && !a ? (s = Fn, n && r(s) || l) : l
        }
        matchWildcard(e, t, n) {
            if ("string" != typeof e || "string" != typeof t) return !1;
            const i = new In;
            var o = i.isQueryParamPresent(t),
                r = i.isHashPresent(t),
                s = i.isQueryParamPresent(e),
                a = i.isHashPresent(e);
            o || (s && a ? e = e.replace(/^(.*?)(\?[^#]*)(#?.*)$/, "$1$3") : s && !a && (e = e.replace(/^(.*)(\?.*)$/, "$1"))), r || a && (e = e.replace(/^(.*?)(#.*)$/, "$1")), "/" !== e && (e = Bn.stripSlashes(e, s, a)), "/" !== t && (t = Bn.stripSlashes(t, o, r));
            var c, l, u = new RegExp("^" + Bn.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi");
            return u.test(e) ? (u = new RegExp("^" + Bn.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !n || u.exec(e)) : (e = Bn.removeWWW(e), t = Bn.removeWWW(t, !0), (u = new RegExp("^" + Bn.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi")).test(e) ? (u = new RegExp("^" + Bn.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !n || u.exec(e)) : (c = Bn.cleanURL(t, !0), -1 === t.indexOf("*") && ((l = Bn.removeWWW(i.toAbsURL(e)).replace(/\/$/, "").replace(/\/\?/, "?")) === t || l === c) || (e = Bn.cleanURL(e), t = c, !!(u = new RegExp("^" + Bn.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi")).test(e) && (u = new RegExp("^" + Bn.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !n || u.exec(e)))))
        }
    }
    const Yn = new Kn;
    window.VWO.modules.vwoUtils.url = Yn, window.VWO._.matchRegex = Yn.matchRegex;
    class qn {
        verifyUrl(e, t, n, i) {
            let o = !1;
            const r = i ? e : this.getCleanedUrl(e);
            if (t)
                if (i) o = !!Yn.matchRegex(r, t, null, i);
                else {
                    const n = this.getCleanedUrl(e, !0);
                    o = !(!Yn.matchRegex(r, t, null, i) && !Yn.matchRegex(n, t, !0, i))
                }
            else o = Yn.matchWildcard(r, n) || Yn.matchWildcard(e, n);
            return o
        }
        getCleanedUrl(e, t) {
            if (!e) return;
            let n;
            return -1 !== e.search(/_vis_(test_id|hash|opt_(preview_combination|random))=[a-z\.\d,]+&?/) ? (n = e.replace(/_vis_(test_id|hash|opt_(preview_combination|random))=[a-z\.\d,]+&?/g, ""), n = t ? n.replace(/(\??&?)$/, "") : n.replace(/(\/?\??&?)$/, "")) : n = t ? e : e.replace(/\/$/, ""), n
        }
        compareUrlWithIncludeExcludeRegex(e, t, n, i) {
            const o = {};
            return n && Yn.matchRegex(e, n) ? (o.didMatch = !1, o.reason = 1, o) : (o.didMatch = this.verifyUrl(e, t, i), o.reason = o.didMatch ? 2 : 3, o)
        }
    }
    const Jn = new qn;
    class Xn extends Gn {
        clearTimeouts(e) {
            this.otherSide("clearTimeouts", e)
        }
        markGoalTriggered(e, t) {
            const n = window.tracklib || window.VWO._.track;
            "TRACK" === e.type ? n.markGoalTriggered(e.id, t) : En.createCookieMT("_vis_opt_exp_" + e.id + "_goal_" + t, "1", 100, e)
        }
        clearTimeoutsHandler(e) {
            var t;
            e.timeout = null === (t = window._vwo_exp[e.id]) || void 0 === t ? void 0 : t.timeout, cancelAnimationFrame(e.timeout), delete e.timeout
        }
        isGoalTriggered(e, t) {
            return "TRACK" === e.type ? !window.VWO._.track.shouldTriggerGoal(e.id, t) : Le.get("_vis_opt_exp_" + e.id + "_goal_" + t)
        }
        doExperimentHere({
            currentUrl: e
        }, t, n, i) {
            const o = Jn.getCleanedUrl(e),
                r = Jn.compareUrlWithIncludeExcludeRegex(e, t.urlRegex, t.exclude_url, t.url_pattern);
            return i || (1 === r.reason ? window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                captureGroups: [Ft.EXCLUDE_URL, {
                    oldArgs: [t.id]
                }]
            }) : window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                captureGroups: [Ft.MATCH_WILDCARD, {
                    oldArgs: [t.id, o, t.urlRegex || t.url_pattern, r.didMatch]
                }]
            })), r.didMatch
        }
        getCombiCookie(e) {
            return Le.get("_vis_opt_exp_" + e + "_combi")
        }
        getTrackGoalIdFromExp(e) {
            return fe(window._vwo_exp[e].goals)[0]
        }
        getCombi(e, t) {
            const n = x._.track;
            return "TRACK" === e.type ? n.isGoalIncluded ? n.isGoalIncluded(this.getTrackGoalIdFromExp(e.id)) : void(t || x.push(["track.delayedGoalConversion", {
                campaignId: e.id,
                type: "TRACK",
                goalId: this.getTrackGoalIdFromExp(e.id)
            }])) : "FUNNEL" === e.type ? n.isFunnelIncluded ? n.isFunnelIncluded(e.id) : void(t || x.push(["track.delayedGoalConversion", {
                campaignId: e.id,
                type: "FUNNEL"
            }])) : En.isAnalyzeCampaign(e.type) ? n.isAnalyzeCampaignIncluded ? n.isAnalyzeCampaignIncluded(e.id) : void(t || x.push(["track.delayedGoalConversion", {
                campaignId: e.id,
                type: e.type
            }])) : this.getCombiCookie(e.id)
        }
    }
    const zn = new Xn;
    window.VWO.modules.utils.campaignUtils = zn;
    class Qn extends In {
        getUrlVars(e) {
            var t, n, i, o = {};
            for (-1 !== e.indexOf("#") && (e = e.slice(0, e.indexOf("#"))), n = (i = e.slice(e.indexOf("?") + 1).split("&").reverse()).length; n--;)
                if (void 0 === o[(t = i[n].split("="))[0]]) {
                    let e = t[1];
                    (478778 == window._vwo_acc_id || window._vwo_acc_id > 495077) && (e = t.slice(1).join("=")), o[t[0]] = e
                } else o[t[0]] = o[t[0]] + "&" + t[0] + "=" + t[1];
            return o
        }
    }
    const Zn = new Qn;
    window.VWO.modules.vwoUtils.urlUtils = Zn;
    class ei extends qn {}
    const ti = new ei;
    window.VWO.modules.utils.urlUtils = ti;
    class ni extends Mn {
        constructor() {
            super(...arguments), this.preview = We, this.currentCombinationXPaths = {}
        }
        isChangeAppliedOnElForCampaign(e, t) {
            return vwo_$(e).hasClass("vwo_loaded") && vwo_$(e).hasClass("vwo_loaded_" + t)
        }
        markChangeAppliedOnElForCampaign(e, t, n, i) {
            return n && n.addClass("vwo_loaded vwo_loaded_" + t + " _vwo_variation_" + i), vwo_$(e).addClass("vwo_loaded vwo_loaded_" + t)
        }
        tryApplyingChanges(e, t, n, i, o) {
            var r, s;
            En.isDomIndependentCampaign(n.type) || (!(null === (s = null === (r = n.muts) || void 0 === r ? void 0 : r.post) || void 0 === s ? void 0 : s.enabled) && n.xPath && "head" !== (null == n ? void 0 : n.xPath.toLowerCase()) && (n.timeout = requestAnimationFrame((() => {
                this.tryApplyingChanges(e, t, n, i, o)
            })), window._vwo_exp[n.id] && (window._vwo_exp[n.id].timeout = n.timeout)), this.applyChanges(e, t, n, i, o))
        }
        applyChanges(e, t, n, i, o) {
            i || (i = {
                trigger: function(e, t) {
                    return N(this, void 0, void 0, (function*() {
                        yield window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: [e, t]
                        })
                    }))
                }
            });
            const r = window.VWO;
            let s, a, l, u, d, g, h, p = t.split(","),
                v = 0;
            const w = n.type,
                f = n.sections,
                _ = window._vwo_exp[n.id].sections,
                E = e._vwo_api_section_callback || {};
            try {
                for ("VISUAL_AB" === w && (g = f[1].variations[t], g ? ("object" != typeof g && (g = vwo_$.parseJSON(g)), p = new Array(g.length)) : p = []), d = p.length, i.trigger(Ft.SET_CAMPAIGN_TO_OBSERVE, {
                        campaignId: n.id
                    }), u = 0; u < d; u++) {
                    if (s = void 0, "VISUAL_AB" === w) {
                        if (v = 1, !(a = g[u].xpath)) continue;
                        "head" === a.toLowerCase() || this.isChangeAppliedOnElForCampaign(a, n.id) ? delete this.currentCombinationXPaths[a] : this.currentCombinationXPaths[a] = [v, t], s = r._.allSettings.tags[g[u].tag].fn
                    } else {
                        if (a = f[++v].path, !a) continue;
                        if ("head" === a.toLowerCase() || this.isChangeAppliedOnElForCampaign(a, n.id) || (this.currentCombinationXPaths[a] = [v, p[u]]), 1 === n.version && 1 === parseInt(p[u], 10)) {
                            i.trigger(Ft.ELEMENT_LOADED, {
                                oldArgs: [n.id, v, p[u], a]
                            }), this.markChangeAppliedOnElForCampaign(a, n.id), i.trigger(Ft.UNHIDE_ELEMENT, {
                                ruleName: a,
                                campaignData: n,
                                getters: null
                            });
                            continue
                        }
                        f[v].variations[p[u]].length > 0 && (s = window.VWO._.allSettings.tags[f[v].variations[p[u]][0].tag].fn || Xt)
                    }
                    const c = s ? s.toString() : "";
                    "head" === a.toLowerCase() && (_[v].loaded = _[v].loaded || {}, !0 !== _[v].loaded[u] && (i.trigger(Ft.ELEMENT_LOADED, {
                        oldArgs: [n.id, v, p[u], a]
                    }), i.trigger(Ft.ELEMENT_CHANGES_APPLIED, {
                        oldArgs: [n.id, v, "VISUAL" === w ? p[u] : t, a, c]
                    }), bn(i, Ft.MODIFIED_ELEMENT, {
                        id: n.id,
                        section_id: v,
                        combination: "VISUAL" === w ? p[u] : t,
                        path: a,
                        content: s
                    }))), h = vwo_$(a);
                    const d = this;
                    if (h && h.length)
                        if (l = h.filter((function(e, t) {
                                return !d.isChangeAppliedOnElForCampaign(t, n.id)
                            })), l.length || "head" !== a.toLocaleLowerCase() || _[v].loaded[u] || (l = h), 0 < l.length) {
                            "head" === a.toLowerCase() && (_[v].loaded[u] = !0), "VISUAL" === w ? i.trigger(Ft.ELEMENT_LOADED, {
                                oldArgs: [n.id, v, p[u], a]
                            }) : i.trigger(Ft.ELEMENT_LOADED, {
                                oldArgs: [n.id, "1", t, a]
                            }), delete this.currentCombinationXPaths[a];
                            const e = [];
                            let o;
                            const r = function(t, n) {
                                    e.push({
                                        path: n,
                                        changes: String(t).split(" ")
                                    })
                                },
                                l = s && s(r);
                            void 0 !== o && vwo_$(o).each((function() {
                                E[v] && "function" == typeof E[v] && E[v](vwo_$(a), this)
                            })), i.trigger(Ft.UNHIDE_ELEMENT, {
                                ruleName: a,
                                campaignData: n,
                                getters: null
                            }), this.markChangeAppliedOnElForCampaign(a, n.id, l, v), i.trigger(Ft.INIT_VWO_INTERNALS, {
                                elementSelector: a,
                                campaignId: n.id
                            }), "VISUAL" === w ? (i.trigger(Ft.ELEMENT_CHANGES_APPLIED, {
                                oldArgs: [n.id, v, p[u], a, c, e]
                            }), bn(i, Ft.MODIFIED_ELEMENT, {
                                name: Ft.MODIFIED_ELEMENT,
                                time: +new Date,
                                props: {
                                    id: n.id,
                                    section: v,
                                    combination: p[u],
                                    path: a,
                                    content: s,
                                    debugLog: e
                                }
                            })) : (i.trigger(Ft.ELEMENT_CHANGES_APPLIED, {
                                oldArgs: [n.id, "1", t, a, c, e]
                            }), bn(i, Ft.MODIFIED_ELEMENT, {
                                name: Ft.MODIFIED_ELEMENT,
                                time: +new Date,
                                props: {
                                    id: n.id,
                                    section: "1",
                                    combination: t,
                                    path: a,
                                    content: s,
                                    debugLog: e
                                }
                            })), bn(i, Ft.ELEMENT_CHANGES_APPLIED, {
                                name: Ft.ELEMENT_CHANGES_APPLIED,
                                time: +new Date,
                                props: {
                                    id: n.id,
                                    section: "1",
                                    combination: t,
                                    path: a
                                }
                            }), n[Yt] = 1
                        } else i.trigger(Ft.UNHIDE_ELEMENT, {
                            ruleName: a,
                            campaignData: n,
                            getters: null
                        });
                    else i.trigger(Ft.UNHIDE_ELEMENT, {
                        ruleName: a,
                        campaignData: n,
                        getters: null
                    });
                    null != (o = e.vwoInternalProperties[`keepElementLoadedRunning_${n.id}`] || o) && r._.coreLib.finished && this.shouldCancelInterval(o, n.id, n) && zn.clearTimeouts(n)
                }
            } catch (e) {
                i.trigger(Ft.ELEMENT_LOAD_ERROR, {
                    oldArgs: [n.id, t, e]
                }), c.error(e)
            }
        }
        processRedirect({
            getters: e,
            campaignData: t,
            redirectURL: n
        }) {
            let i, o, r, s, a, c, l, u, d = !1;
            const g = e.location;
            if (d = t.urlRegex ? Yn.matchRegex(ti.getCleanedUrl(e.currentUrl, !0), t.urlRegex, !0) : Yn.matchWildcard(ti.getCleanedUrl(e.currentUrl, !0), t.url_pattern, !0), d && 1 !== d.length) {
                for (s = "", l = n.split("*"), i = 1, o = l.length; i < o; i++) {
                    if (t.urlRegex && d[i] && (Zn.isQueryParamPresent(d[i]) || Zn.isHashPresent(d[i]))) {
                        const e = t.sections[1].variations[1];
                        Zn.isQueryParamPresent(e) || Zn.isHashPresent(e) ? Zn.isHashPresent(e) && !Zn.isQueryParamPresent(e) ? d[i] = d[i].replace(/^(.*?)(?:\?[^#]*)(#?.*)$/, "$1$2") : !Zn.isHashPresent(e) && Zn.isQueryParamPresent(e) && (d[i] = d[i].replace(/#.*/, "")) : d[i] = d[i].replace(/[\?#].*/, "")
                    }
                    s += l[i - 1] + (d[i] || "")
                }
                s += l[l.length - 1]
            } else s = n;
            if (s = s.replace(/\*/g, ""), g.search)
                if (Zn.isQueryParamPresent(s, !0))
                    for (c = Zn.getUrlVars(g.search), a = Zn.getUrlVars(s), u = fe(c), o = u.length; o--;) r = u[o], void 0 === a[r] && (s += "&" + r + "=" + c[r]);
                else Zn.isHashPresent(s) ? s = s.replace(/(.*?)#(.*)/, "$1" + g.search + "#$2") : s += g.search;
            if (g.hash && -1 === s.indexOf("#") && (s += g.hash), window.fetcher.getValue('phoenix.trigger("${{1}}","${{2}}")', null, {
                    captureGroups: [Ft.BEFORE_REDIRECT_TO_URL, {
                        oldArgs: [t.id, s]
                    }]
                }), e.flags.cookieLessModeEnabled) {
                if (!e.vwoInternalProperties.jar) throw new Error("CooKie less feature is enabled but CookieJar is not created i.e. VWO._.jar is undefined");
                const t = e.storages.storages.cookies.getStoredJarValue(!0);
                if (!(s.indexOf("_vwo_store=") > -1)) throw new Error("CooKie Less feature is enabled but _vwo_store= do not exists in URL's query Param"); {
                    let e = s.match(/.*_vwo_store=([^&]*)/);
                    e = e ? e[1] : "", s = s.replace(`_vwo_store=${e}`, `_vwo_store=${t}`)
                }
            }
            g.replace(s)
        }
        shouldCancelInterval(e, t, n) {
            return !e || 0 == e || 1 !== e && !0 !== e && (2 === e ? !t || (!En.isDomDependent(n.type) || !!n[Yt]) : 3 !== e && void 0)
        }
        otherSide(...e) {
            e[0] = "tags.runTestCampaign.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    const ii = new ni;
    window.VWO.modules.tags.runTestCampaign = window.VWO.modules.tags.runTestCampaign || {}, window.VWO.modules.tags.runTestCampaign.utils = ii;
    const oi = {
            SURVEY_INIT: "s.init",
            SURVEY_SHOWN: "s.shn",
            SURVEY_READY: "s._ready",
            SURVEY_COMPLETED: "s.cmtd",
            SURVEY_ATTEMPTED: "s.atd",
            SURVEY_CLOSED: "s.cld",
            SURVEY_MINIMIZED: "s.mnmz"
        },
        ri = {
            TRACK_SESSION_CREATED: "tSC",
            RETRACK_VISITOR: "rV",
            NEW_SESSION_CREATED: "nSC'",
            TOP_INITIALIZE_BEGIN: "tIB",
            TOP_INITIALIZE_ERROR: "tIE",
            TOP_INITIALIZE_END: "tIEn",
            UNHIDE_ALL_VARIATIONS: "uAV",
            UNHIDE_VARIATION: "uV",
            UNHIDE_SECTION: "uS",
            EXCLUDE_URL: "eURL",
            BEFORE_REDIRECT_TO_URL: "bRTR",
            URL_CHANGED: "uC",
            NOT_REDIRECTING: "nR",
            REGISTER_HIT: "rH",
            UPDATE_SETTINGS_CALL: "uSC",
            REGISTER_CONVERSION: "rC",
            CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT: "cAVGFE",
            CONVERT_REVENUE_GOALS_FOR_EXPERIMENT: "cRGFE",
            HIDE_ELEMENTS: "hE",
            POST_URL_CHANGE: "hC",
            ELEMENT_LOAD_ERROR: "eLTTE",
            WAIT_FOR_BEHAVIOR: "wFB",
            ELEMENT_LOAD_TIMER_STOP: "eLTSt",
            CHOOSE_COMBINATION: "cC",
            BOTTOM_INITIALIZE_BEGIN: "bIB",
            BOTTOM_INITIALIZE_END: "bIE",
            ELEMENT_LOADED: "eL",
            ELEMENT_NOT_LOADED: "eNL",
            SPLIT_URL: "sURL",
            MATCH_WILDCARD: "mW",
            DELETE_CSS_RULE: "dCSSR",
            HEATMAP_CLICK: "hCl",
            CONVERT_GOAL_FOR_ALL_EXPERIMENTS: "cGFAE",
            TEST_NOT_RUNNING: "tNR",
            EXCLUDE_GOAL_URL: "eGURL",
            VARIATION_SHOWN: "vS",
            RECORDING_NOT_ELIGIBLE: "rNE",
            VARIATION_APPLIED: "vA",
            NEW_SURVEY_FOUND: "nSF",
            SURVEY_INIT: "s.init",
            SURVEY_READY: "s._ready",
            SURVEY_ATTEMPTED: "s.atd",
            SURVEY_SHOWN: "s.shn",
            SURVEY_COMPLETED: "s.cmtd",
            SURVEY_CLOSED: "s.cld",
            SURVEY_MINIMIZED: "s.mnmz",
            ELEMENT_CHANGES_APPLIED: "eCA",
            SEGMENTATION_EVALUATED: "sE",
            ELEMENTS_SHOWN_WITHOUT_CHANGES: "eSWC",
            ON_SURVEY_SHOWN: "oSS",
            ON_SURVEY_COMPLETED: "oSC",
            ON_SURVEY_ANSWER_SUBMITTED: "oSASUB",
            TRACK_NEW_SESSION_CREATED: "tnSC"
        },
        si = {
            [Ft.VARIATION_SHOWN]: "VARIATION_SHOWN",
            [Ft.VARIATION_APPLIED]: "VARIATION_APPLIED",
            [Ft.ELEMENT_CHANGES_APPLIED]: "ELEMENT_CHANGES_APPLIED",
            [Ft.REGISTER_CONVERSION]: "REGISTER_CONVERSION",
            sE: "SEGMENTATION_EVALUATED",
            eSWC: "ELEMENTS_SHOWN_WITHOUT_CHANGES",
            tNR: "TEST_NOT_RUNNING",
            wFB: "WAIT_FOR_BEHAVIOR",
            hC: "POST_URL_CHANGE",
            nSC: "NEW_SESSION_CREATED",
            cFS: "TOP_INITIALIZE_BEGIN",
            cGFAE: "CONVERT_GOAL_FOR_ALL_EXPERIMENTS",
            hCl: "HEATMAP_CLICK",
            eGURL: "EXCLUDE_GOAL_URL",
            cAVGFE: "CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT",
            cFE: "TOP_INITIALIZE_END",
            uAV: "UNHIDE_ALL_VARIATIONS",
            uS: "UNHIDE_SECTION",
            shouldExecLib: "TOP_INITIALIZE_ERROR",
            eURL: "EXCLUDE_URL",
            cRGFE: "CONVERT_REVENUE_GOALS_FOR_EXPERIMENT",
            bRTR: "BEFORE_REDIRECT_TO_URL",
            uC: "URL_CHANGED",
            hE: "HIDE_ELEMENTS",
            eLTTE: "ELEMENT_LOAD_ERROR",
            eLTSt: "ELEMENT_LOAD_TIMER_STOP",
            cC: "CHOOSE_COMBINATION",
            sAC: "BOTTOM_INITIALIZE_BEGIN",
            uSC: "UPDATE_SETTINGS_CALL",
            eAC: "BOTTOM_INITIALIZE_END",
            eL: "ELEMENT_LOADED",
            eNL: "ELEMENT_NOT_LOADED",
            registerHit: "REGISTER_HIT",
            mW: "MATCH_WILDCARD",
            dCSSR: "DELETE_CSS_RULE",
            sURL: "SPLIT_URL",
            nSF: "NEW_SURVEY_FOUND",
            oSS: "ON_SURVEY_SHOWN",
            oSC: "ON_SURVEY_COMPLETED",
            oSASUB: "ON_SURVEY_ANSWER_SUBMITTED",
            [Ft.RETRACK_VISITOR]: "RETRACK_VISITOR",
            [oi.SURVEY_INIT]: "SURVEY_INIT",
            [oi.SURVEY_READY]: "SURVEY_READY",
            [oi.SURVEY_ATTEMPTED]: "SURVEY_ATTEMPTED",
            [oi.SURVEY_SHOWN]: "SURVEY_SHOWN",
            [oi.SURVEY_COMPLETED]: "SURVEY_COMPLETED",
            [oi.SURVEY_CLOSED]: "SURVEY_CLOSED",
            [oi.SURVEY_MINIMIZED]: "SURVEY_MINIMIZED"
        },
        ai = {
            [Ft.VARIATION_SHOWN]: function(e) {
                return [e.id + "", e.variation]
            }
        };
    class ci extends $t {
        constructor() {
            super(), this.isNotRedirectingEventFired = !1, this.vwoEvents = {
                trigger: function(e, t) {
                    return N(this, void 0, void 0, (function*() {
                        yield window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: [e, t]
                        })
                    }))
                }
            }
        }
        execute(e) {
            window._vis_opt_goal_conversion = function(e) {
                bn(null, Ft.CUSTOM_CONVERSION, {
                    gId: e,
                    ["gId_" + e]: 1
                })
            }, window._vis_opt_register_conversion = function(e, t) {
                bn(null, Ft.CUSTOM_CONVERSION, {
                    cId: t,
                    gId: e,
                    ["gId_" + e]: 1
                })
            }, window._vis_opt_revenue_conversion = function(e) {
                bn(null, Ft.CUSTOM_CONVERSION, {
                    revenue: e
                })
            }, window.VWO.track = window.VWO.track || {}, window.VWO.track.goalConversion = function(e) {
                return N(this, void 0, void 0, (function*() {
                    yield window.fetcher.getValue("VWO.modules.tags.backwardCompatibilityUtils.customGoalConversion", [e, !0])
                }))
            }, window.VWO.track.revenueConversion = function(e) {
                return N(this, void 0, void 0, (function*() {
                    yield window.fetcher.getValue("VWO.modules.tags.backwardCompatibilityUtils.customRevenueConversion", [e, !0])
                }))
            }, window.VWO.track.delayedGoalConversion = function(e) {
                return N(this, void 0, void 0, (function*() {
                    yield window.fetcher.getValue("VWO.modules.tags.backwardCompatibilityUtils.delayedGoalConversion", [e])
                }))
            }, window._vis_opt_createCookie = function(t, n, i, o) {
                return N(this, void 0, void 0, (function*() {
                    window._vis_debug && 0 === t.indexOf("debug") && !window._vwo_exp[o].multiple_domains ? Le.create(t, n, i) : yield window.fetcher.getValue('VWO.modules.utils.libUtils.createCookie("${{1}}", "${{2}}", "${{3}}", "${{4}}", "${{5}}")', null, {
                        captureGroups: [null, t, n, i, e.settings.campaigns[o]]
                    })
                }))
            }, window._vis_opt_readCookie = Le.get, window._vis_opt_element_loaded = ii.tryApplyingChanges
        }
        checkIfNotRedirecting(e) {
            this.isNotRedirectingEventFired || e.name !== Ft.PAGE_VIEW || this.isNotRedirectingEventFired || (this.isNotRedirectingEventFired = !0, L.apply(L, [ri.NOT_REDIRECTING]))
        }
        wildCardCallback(e, t) {
            this.checkIfNotRedirecting(e);
            const n = si[t];
            if (n && Ft.VARIATION_APPLIED !== t) {
                const i = ri[n];
                let o, r = null == e ? void 0 : e.oldArgs;
                if (r ? o = !0 : r = [], !o && ai[t] && (r = ai[t](e.props)), t !== Ft.VARIATION_SHOWN || e.props.isFirst ? t === Ft.ELEMENT_CHANGES_APPLIED ? o && L.apply(L, [i, ...r]) : t !== Ft.VARIATION_SHOWN && (t == Ft.CAMPAIGN_FLOW_START && window._vwo_code && (window._vwo_code.libExecuted = 1, window.fetcher.setValue("_vwo_code.libExecuted", 1)), L.apply(L, [i, ...r])) : L.apply(L, [i, ...r]), t === Ft.VARIATION_SHOWN && !e.props.isFirst || t == Ft.REGISTER_HIT) {
                    const e = si[Ft.VARIATION_APPLIED],
                        t = ri[e];
                    L.apply(L, [t, ...r]), this.vwoEvents.trigger(Ft.VARIATION_APPLIED, {
                        oldArgs: r,
                        campaignId: parseInt(r[0], qt),
                        combi: parseInt(r[1], qt)
                    })
                }
            }
        }
    }
    const li = new ci,
        ui = li.execute.bind(li),
        di = li.wildCardCallback.bind(li);
    window.VWO.modules.tags.backwardCompatibility = ui, window.VWO.modules.tags.wildCardCallback = di;
    class gi {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.backwardCompatibilityUtils." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    let hi;

    function pi(e) {
        return N(this, void 0, void 0, (function*() {
            yield x.phoenix('store.actions.addValues("${{1}}", "${{2}}" )', null, {
                captureGroups: [e, "vwoInternalProperties"]
            })
        }))
    }
    class vi extends gi {
        declareVWOAPI() {
            x.applyChanges = function(e) {
                return N(this, void 0, void 0, (function*() {
                    const t = [],
                        n = (yield x.phoenix("store.getters")).currentSettings.dataStore.campaigns;
                    for (const e in n) t.push(e);
                    e = e || t;
                    for (var i = 0; i < e.length; i++) {
                        const t = e[i];
                        yield window.fetcher.getValue('VWO.modules.events.events.variationShown("${{1}}", "${{2}}", "${{3}}")', null, {
                            captureGroups: [null, {
                                id: t,
                                variation: "",
                                isFirst: 0
                            }, n[t]]
                        })
                    }
                }))
            }, x.activate = function(e, t, n, i) {
                var o, r;
                return N(this, void 0, void 0, (function*() {
                    var n, s = {};
                    const a = yield x.phoenix("store.getters");
                    if ("object" == typeof e && (e = (s = e).keepElementLoadedRunning, t = s.expIds, s.manual, i = s.customUrl, n = s.virtualPageUrl), i && (window._vis_opt_url = i, window.fetcher.setValue("_vis_opt_url", window._vis_opt_url)), t = t || (null === (o = null == a ? void 0 : a.vwoInternalProperties) || void 0 === o ? void 0 : o.experimentIds) || window._vwo_exp_ids, n) window._vis_opt_url = n, yield window.fetcher.getValue('phoenix.trigger("${{1}}")', null, {
                        captureGroups: ["vwo_urlChange"]
                    });
                    else if (t && t.length)
                        for (const n of t) {
                            const t = null === (r = a.currentSettings.dataStore) || void 0 === r ? void 0 : r.campaigns[n];
                            if (t) {
                                if (En.isSessionBasedCampaign2(t)) {
                                    bn(null, Ft._ACTIVATED, {
                                        id: n
                                    });
                                    continue
                                }(null == t ? void 0 : t.manual) ? (pi({
                                    [`keepElementLoadedRunning_${n}`]: e
                                }), bn(null, Ft.ACTIVATED, {
                                    id: n
                                })) : (yield x.phoenix('validateTrigger("${{1}}")', null, {
                                    captureGroups: [a.currentSettings.triggers[t.triggers[0]]]
                                })) && (yield window.fetcher.getValue('VWO.modules.tags.activate("${{1}}")', null, {
                                    captureGroups: [{
                                        campaignId: t.id
                                    }]
                                }))
                            }
                        }
                }))
            }, x.revertChanges = function(e) {
                return N(this, void 0, void 0, (function*() {
                    const t = (yield x.phoenix("store.getters")).currentSettings.dataStore.campaigns[e];
                    if (t.sections)
                        for (var n = Ze(t.sections), i = 0; i < n.length; i++) vwo_$(".vwo_loaded.vwo_loaded_" + e + "._vwo_variation_" + n[i]).remove(), delete t.sections[n[i]].loaded, yield window.fetcher.setValue(`VWO._.allSettings.dataStore.campaigns.${e}.sections.${n[i]}.loaded`, void 0)
                }))
            }, x.modifyClickPauseTime = function(e) {
                e = e || {
                    time: 0,
                    useBeacon: !1
                }, x._.redirectionDelayTime = e.time, e.useBeacon && (x.data.tB = !0)
            }, x.destroy = function() {
                return N(this, void 0, void 0, (function*() {
                    yield x.phoenix("destroy()"), Vn.clearAllListeners()
                }))
            }, x.setFetchSettingsDelay = function(e) {
                pi({
                    SPA_SETTINGS_DELAY: e
                })
            }, x.disableAutofetchSettings = function() {
                pi({
                    disableAutofetchSettings: !0
                })
            }, x.refreshElements = function(e, t) {
                var n;
                return N(this, void 0, void 0, (function*() {
                    if (!e) return;
                    e instanceof Array || (e = [e]);
                    const i = yield x.phoenix("store.getters"), o = [];
                    for (const e in i.currentSettings.dataStore.campaigns) o.push(e);
                    t = t || o;
                    for (var r = vwo_$(e.join(",")), s = 0; s < t.length; s++) {
                        var a = "vwo_loaded_" + t[s];
                        r.each((function(e, t) {
                            var n = vwo_$(t);
                            n.hasClass(a) ? n.removeClass(a) : n.parents("." + a).eq(0).removeClass(a)
                        }))
                    }
                    for (const e of t) {
                        const t = null === (n = i.currentSettings.dataStore.campaigns) || void 0 === n ? void 0 : n[e];
                        t && t.ready && (yield window.fetcher.getValue('VWO.modules.events.events.variationShown("${{1}}", "${{2}}", "${{3}}")', null, {
                            captureGroups: [null, {
                                id: e,
                                variation: "",
                                isFirst: 0
                            }, t]
                        }))
                    }
                }))
            }, x.fetchPCSettings = function() {
                hi || (hi = !0, pi({
                    loadPC: !0
                }))
            }, x.enableSPA = function(e) {
                pi(void 0 === e || e ? {
                    isSpaEnabled: !0
                } : {
                    isSpaEnabled: e
                })
            }, x.updateSPAWaitTime = function(e) {
                pi({
                    SPA_ELEMENT_WAIT_TIMEOUT: e
                })
            }, x.deactivate = function(e) {
                return N(this, void 0, void 0, (function*() {
                    const t = yield x.phoenix("store.getters");
                    for (const n of e) t.settings.campaigns[n].dontKillTimer = !1, yield window.fetcher.setValue(`VWO._.allSettings.dataStore.campaigns.${n}.dontKillTimer`, !1)
                }))
            }
        }
        makeCallForTagsAndSession(e, t) {
            const n = window.VWO._.sessionInfoService;
            n.isSessionInfoSynced() || n.setSNCookieValueByIndex2(an.SESSION_SYNCED_STATE_INDEX, 1);
            const i = "s.gif?account_id=" + Ue.accountId + En.getUUIDString(En.createUUIDCookie2({
                vwoUUID: Ue.vwoUUID
            })) + "&s=" + n.getSessionId() + ("newSession" === t ? "&ed=" + encodeURIComponent(En.extraData2()) + "&cu=" + encodeURIComponent(Ue.currentUrl) : "") + "&p=" + n.getPageId() + (e.tags ? "&tags=" + e.tags : "") + (e.egTagValue ? "&eg=" + e.egTagValue : "") + ("sessionUpdate" === t ? "&update=1" : "") + "&cq=" + e.cq;
            On.sendCall({
                serverUrl: Ue.serverUrl,
                accountId: Ue.accountId
            }, {
                url: i
            })
        }
        sendRegisterCall(e, t, n) {
            On.sendCall(e, {
                url: t,
                successCallback: n
            }, null, null, !0)
        }
    }
    const wi = new vi;
    window.VWO.modules.tags.backwardCompatibilityUtils = wi;
    class fi {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.setSession." + e[0], window.fetcher.getValue(...e)
        }
    }
    const _i = {
        get: e => {
            try {
                return window.localStorage.getItem(e)
            } catch (e) {
                return ""
            }
        },
        set: (e, t) => {
            try {
                const n = window.localStorage;
                return window.VWO._.isWorkerThread ? n.setItem(e, t) : n._setItem(e, t)
            } catch (e) {
                return ""
            }
        },
        remove: e => {
            try {
                const t = window.localStorage;
                return window.VWO._.isWorkerThread ? t.removeItem(e) : t._removeItem(e)
            } catch (e) {
                return !1
            }
        },
        getItem: function(e) {
            return this.get(e)
        },
        setItem: function(e, t) {
            this.set(e, t)
        },
        deleteAll: function() {},
        deleteItem: function(e) {
            this.remove(e)
        }
    };
    window.VWO._.localStorageService = _i;
    class Ei {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.sessionInfoService." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }

    function mi(e, t, n) {
        "Array" === e ? (this.tags = [], this.lastSent = 0) : "Hash" === e && (this.tags = {}, this.sentTags = {}), this.type = e, this.maxCount = t || 1 / 0, this.addTagCallback = n || function() {}
    }
    Ei.LOCAL_STORAGE_SESSION_EXPIRY = 30, Ei.LOCAL_STORAGE_NAME = window._vis_debug ? "debug_vwoSn" : "vwoSn", Ei.ACCOUNT_ID = window._vwo_acc_id, mi.prototype.add = function(e, t) {
        if (e) {
            var n = this.tags;
            "Array" === this.type ? ("[object Array]" !== Object.prototype.toString.call(e) && (e = [e]), e = rt(e, (function(e) {
                return e = encodeURIComponent(e.trim())
            })), n = st(n = (n = n.concat(e)).slice(0, this.maxCount), (function(e, t) {
                return n.indexOf(e) === t
            })), this.tags = n) : "Hash" === this.type && (this.sentTags[e] && this.sentTags[e] === t || (this.tags[encodeURIComponent(e)] = encodeURIComponent(t))), this.addTagCallback()
        }
    }, mi.prototype.get = function() {
        var e;
        if (this.isTagPassed()) return "Array" === this.type ? (e = this.tags.slice(this.lastSent), this.lastSent = this.tags.length) : "Hash" === this.type && (e = this.tags, et(this.sentTags, this.tags), this.tags = {}), e
    }, mi.prototype.isTagPassed = function() {
        return "Array" === this.type ? this.tags.length > this.lastSent : "Hash" === this.type && Ze(this.tags).length > 0
    }, mi.prototype.reset = function() {
        "Array" === this.type ? (this.tags = [], this.lastSent = 0) : "Hash" === this.type && (this.tags = {}, this.sentTags = {})
    }, mi.prototype.refresh = function() {
        "Array" === this.type ? this.lastSent = 0 : "Hash" === this.type && (et(this.tags, this.sentTags), this.sentTags = {})
    };
    const Si = "eg";
    let Oi = {},
        Ti, yi = ["u", "s", "p", "ui", "si", "pi"],
        Ci = function() {},
        Ii = {
            user: "u",
            session: "s",
            page: "p"
        };
    for (Ti = 0; Ti < yi.length; Ti++) Oi[yi[Ti]] = new mi("Hash");
    Oi[Si] = new mi("Array");
    const Ni = {
        onPush: function(e) {
            "function" == typeof e && (Ci = e)
        },
        getTags: function() {
            let e = {},
                t = "";
            for (Ti = 0; Ti < yi.length; Ti++) {
                const t = Oi[yi[Ti]].get();
                t && (e[yi[Ti]] = un(t))
            }
            for (const n in e) e.hasOwnProperty(n) && (t += '"' + n + '":' + e[n] + ",");
            return t = t && "{" + t.slice(0, -1) + "}", t
        },
        getEgTags: function() {
            const e = Oi[Si].get();
            if (e) return e.join()
        },
        addTag: function(e, t, n, i) {
            let o = Ii[n = n || "session"];
            if (!o) {
                if (n !== Si) return;
                o = Si
            }
            i && (o += "i"), Oi[o].add(e, t), Ci()
        },
        refresh: function() {
            Oi.s.reset(), Oi.si.refresh(), Oi[Si].refresh()
        }
    };
    window.VWO.tag = Ni.addTag, window.VWO._.tags = Ni;
    const Ai = {
        getDataStore: function() {
            return this.getDSCookieValueByIndex(1)
        },
        setDataStore: function(e) {
            Le.create(an.TRACK_GLOBAL_COOKIE_NAME, this.getMetaStore() + "$" + e, cn())
        },
        getMetaStore: function() {
            return this.getDSCookieValueByIndex(0) || ""
        },
        setMetaStore: function(e) {
            Le.create(an.TRACK_GLOBAL_COOKIE_NAME, e + "$" + this.getDataStore(), cn())
        },
        getMetaInfoByIndex: function(e) {
            return this.getMetaStore().split(":")[e]
        },
        setMetaInfoByIndex: function(e, t) {
            var n = this.getMetaStore().split(":");
            n[e] = t, this.setMetaStore(n.join(":"))
        },
        setDataInfoByIndex: function(e, t) {
            var n = this.getDataStore().split(":");
            n[e] = t, this.setDataStore(n.join(":"))
        },
        getDataInfoByIndex: function(e) {
            return this.getDataStore().split(":")[e]
        },
        getDSCookieValueByIndex: function(e) {
            var t = Le.get(an.TRACK_GLOBAL_COOKIE_NAME);
            return t ? t.split("$")[e] : null
        },
        getCookieVersion: function() {
            return Le.get(an.TRACK_GLOBAL_COOKIE_NAME).split("$")[0].split(":")[an.COOKIE_VERSION_INDEX]
        },
        deleteDataStoreInfoByIndex: function(e) {
            var t = this.getDataStore();
            t && ((t = t.split(":"))[e] = "", t = t.join(":"), this.setDataStore(t))
        }
    };
    window.VWO._.commonCookieHandler = Ai;
    class bi {
        constructor() {
            this.eventCallbacks = [], this.isInitialized = !1
        }
        onActivity() {
            for (let e = 0; e < this.eventCallbacks.length; e++) this.eventCallbacks[e]()
        }
        init() {
            if (this.isInitialized) return;
            const e = hn((() => {
                this.onActivity()
            }), 1e3);
            document.addEventListener ? (document.addEventListener("mouseup", e), document.addEventListener("keyup", e), document.addEventListener("mousemove", e), document.addEventListener("scroll", e)) : document.attachEvent && (document.attachEvent("onmouseup", e), document.attachEvent("onkeyup", e), document.attachEvent("onmousemove", e), document.attachEvent("onscroll", e)), this.isInitialized = !0
        }
        track(e) {
            this.eventCallbacks.push(e), this.init()
        }
    }
    const Ri = new bi;

    function Li() {
        _i.remove(Ei.LOCAL_STORAGE_NAME)
    }
    let Vi;
    window.VWO._.tua = Ri;
    class xi extends Ei {
        constructor() {
            super(), this.firstSessionCreated = !1, this.vwoSn = {
                cu: "",
                r: "",
                lt: 0,
                v: "0.1.0"
            }, Vi = this, this.expireSessionOnDateChange(), this.visitorInformation = window.VWO.data.vi = window.VWO.data.vi || {}, this.setVWOSn(), this.getSessionStore() && this.initialize(), Ri.track((() => {
                this.updateLocalStorageSession()
            }))
        }
        expireSessionOnDateChange() {
            if (!this.getSessionStore()) return;
            const e = this.getSessionId();
            if (e) {
                const t = new Date(1e3 * e).getDate();
                new Date(ct()).getDate() !== t && this.eraseSessionCookie()
            }
        }
        initializeSession2(e) {
            this.initialize(), this.setSessionStore(e + "")
        }
        getDSCookieValueByIndex(e) {
            var t = this.getGlobalCookie();
            return t ? t.split("$")[e] : null
        }
        initialize() {
            this.isInitiatedOnce || (this.isInitiatedOnce = !0, this.attachTagsPushCallback() || this.getSessionStore() || window.VWO.phoenix('trigger("${{1}}")', null, {
                captureGroups: [Ft.NEW_SESSION_CREATED]
            }), Ri.track((() => {
                this.updateSession()
            })), this.addValues({
                sessionStart: this.getSessionId()
            }, "root"))
        }
        attachTagsPushCallback() {
            let e, t;
            const n = this,
                i = function(i) {
                    e = Ni.getTags(), t = Ni.getEgTags();
                    const o = En.doesSessionBasedCampaignExistsInTags(e);
                    if (!window._vis_debug && !We() && (e || t)) {
                        if (!i && !n.getSessionStore()) return bn(null, Ft.NEW_SESSION_CREATED, {
                            name: Ft.NEW_SESSION_CREATED,
                            time: +new Date,
                            props: {
                                pageId: n.getPageId(),
                                tags: e,
                                egTagValue: t,
                                cq: o
                            }
                        }), !0;
                        window.fetcher.getValue("VWO.modules.events.events.dimensionTagPushed", [null, {
                            tags: e,
                            egTagValue: t,
                            cq: o
                        }])
                    }
                    return !1
                },
                o = pn(i, 10);
            return Ni.onPush((() => o(!0))), i()
        }
        updateSession() {
            this.updateSession2()
        }
        updateSession2() {
            let e = this.getSessionStore();
            e && this.expireSessionOnDateChange(), e = this.getSessionStore(), this.sessionTimer || e ? (e && (this.setSessionStore(e), this.addValues({
                sessionStart: this.getSessionId()
            }, "root")), this.updateSessionTimer()) : this.retrackVisitor()
        }
        updateSessionTimer() {
            this.sessionTimer && clearTimeout(this.sessionTimer), this.sessionTimer = setTimeout((() => this.eraseSessionCookie()), an.SESSION_TIMER_EXPIRE)
        }
        retrackVisitor() {
            const e = ct(!0) - Vi.getFirstSessionId();
            this.setSessionStore(e + ""), window.VWO.phoenix('trigger("${{1}}")', null, {
                captureGroups: [Ft.RETRACK_VISITOR]
            })
        }
        initializeSession(e) {
            this.initializeSession2(e)
        }
        setVisitorInformation() {
            window.VWO.data.vi.vt = Vi.visitorInformation.vt = Vi.isReturningVisitor() ? "ret" : "new", window.fetcher.setValue("VWO.data.vi.vt", window.VWO.data.vi.vt)
        }
        getPageIdInfo() {
            const e = this.getSessionStore(),
                t = e && e.split(":")[an.PAGE_ID_INFORMATION_INDEX];
            return t && t.split("_")
        }
        markPageIdSessionExpiry() {
            const e = this.getPageId() + "_" + (ct(!0) - this.getFirstSessionId() + an.PAGE_ID_EXPIRY);
            Vi.markPageId(e)
        }
        getPageId() {
            const e = this.getPageIdInfo(),
                t = e && e[0];
            return t ? parseInt(t, 10) : 0
        }
        isReturningVisitor() {
            return Vi.getSessionId() > Vi.getFirstSessionId()
        }
        setVWOSn() {
            const e = this.getLocalStorageSession();
            e ? this.vwoSn = e || {} : this.createLocalStorageSession()
        }
        getInfo() {
            return this.vwoSn
        }
        removeInfo() {
            this.vwoSn = {
                cu: "",
                r: "",
                lt: 0,
                v: "0.1.0"
            }
        }
        getRelativeSessionTimestamp() {
            const e = this.getFirstSessionId();
            return this.firstSessionCreated ? ct(!0) - e : (this.firstSessionCreated = !0, at(!0) - e)
        }
        updateLocalStorageSession() {
            const e = this.getLocalStorageSession();
            !e || (ct(!0) - e.lt) / 60 > Ei.LOCAL_STORAGE_SESSION_EXPIRY ? this.createLocalStorageSession() : this.updateTimestampInfo(e)
        }
        updateTimestampInfo(e) {
            this.vwoSn = e, this.vwoSn.lt = ct(!0), this.setLocalStorageSession()
        }
        createLocalStorageSession(e) {
            e ? (this.vwoSn.cu = `${document.URL}#vwo_fix`, this.vwoSn.r = `${document.referrer}#vwo_fix`) : (this.vwoSn.cu = document.URL, this.vwoSn.r = document.referrer), this.vwoSn.lt = ct(!0), this.setLocalStorageSession()
        }
        getLocalStorageSession(e) {
            let t = _i.get(xi.LOCAL_STORAGE_NAME);
            try {
                t = t ? ln(t) : null
            } catch (t) {
                Li(), this.otherSide('createLocalStorageSession("${{1}}")', null, [!0]), e || this.getLocalStorageSession(!0)
            }
            return t ? t.v ? (t.cu = decodeURIComponent(t.cu), t.r = decodeURIComponent(t.r), t) : (t.v = "0.1.0", t) : null
        }
        addValues(e, t) {
            return window.VWO.phoenix('store.actions.addValues("${{1}}", "${{2}}" )', null, {
                captureGroups: [e, t]
            })
        }
        updateAndSyncPageId(e = !1) {
            return N(this, void 0, void 0, (function*() {
                let t;
                if (t = window.VWO._.pageId, !t) {
                    if (t = this.updatePageId(), e) return t;
                    yield this.otherSide('setPageIdValue("${{1}}")', null, [t])
                }
            }))
        }
        updatePageId() {
            let e = this.getPageId();
            return this.shouldUpdatePageCount() && (e += 1), this.markPageId(e), window.VWO._.pageId = e, e
        }
        markPageId(e) {
            this.setSNCookieValueByIndex2(an.PAGE_ID_INFORMATION_INDEX, e)
        }
        setSNCookieValueByIndex2(e, t) {
            const n = this.getSessionStore(),
                i = n && n.split(":") || [];
            i[e] = t + "", this.setSessionStore(i.join(":"))
        }
        shouldUpdatePageCount() {
            const e = this.getPageIdInfo(),
                t = parseInt(e && e[1], 10);
            return !t || ct(!0) - Vi.getFirstSessionId() > t
        }
        setSNCookieValueByIndex(e, t) {
            const n = this.getSessionStore(),
                i = n && n.split(":") || [];
            i[e] = t + "", Le.create(an.TRACK_SESSION_COOKIE_NAME, i.join(":"), an.TRACK_SESSION_COOKIE_EXPIRY)
        }
        getSessionId() {
            return this.getFirstSessionId() + this.getRelativeSessionId()
        }
        setSessionStore(e) {
            return Le.create(an.TRACK_SESSION_COOKIE_NAME, e, an.TRACK_SESSION_COOKIE_EXPIRY)
        }
        getRelativeSessionId() {
            let e = this.getSessionStore();
            if (!e) {
                var t = ct(!0) - this.getFirstSessionId();
                this.setSessionStore(t + ""), e = this.getSessionStore()
            }
            return e && +e.split(":")[an.RELATIVE_SESSION_ID_INDEX]
        }
        setLocalStorageSession() {
            this.vwoSn.v && (this.vwoSn.cu = encodeURIComponent(this.vwoSn.cu), this.vwoSn.r = encodeURIComponent(this.vwoSn.r)), _i.set(xi.LOCAL_STORAGE_NAME, gn(this.vwoSn))
        }
        getSessionStore() {
            return Le.get(an.TRACK_SESSION_COOKIE_NAME)
        }
        getGlobalCookie() {
            return Le.get(an.TRACK_GLOBAL_COOKIE_NAME)
        }
        eraseSessionCookie() {
            this.sessionTimer = null, Le.erase(an.TRACK_SESSION_COOKIE_NAME)
        }
        getPcTrafficFromCookie() {
            var e = Ai.getDataStore();
            return e ? parseFloat(e.split(":")[an.PC_TRAFFIC_INDEX]) : null
        }
        getFirstSessionId() {
            let e = Ai.getDataStore();
            return e || (this.createGlobalCookie(), e = Ai.getDataStore()), e && +e.split(":")[an.FIRST_SESSION_ID_INDEX]
        }
        getSNCookieValueByIndex(e) {
            var t = this.getSessionStore();
            return t ? t.split(":")[e] : null
        }
        createGlobalCookie() {
            const e = an.COOKIE_VERSION + "$" + at(!0) + ":" + this.getPcTraffic() + "::";
            Le.create(an.TRACK_GLOBAL_COOKIE_NAME, e, cn())
        }
        isSessionInfoSynced() {
            return this.getSNCookieValueByIndex(an.SESSION_SYNCED_STATE_INDEX)
        }
        getPcTraffic() {
            return void 0 !== this.pcTraffic && null !== this.pcTraffic || (this.pcTraffic = this.getPcTrafficFromCookie(), this.pcTraffic = this.pcTraffic || parseFloat((100 * Math.random()).toFixed(8))), this.pcTraffic
        }
        shouldSendSessionInfoInCall() {
            return !0
        }
    }
    class Ui extends fi {
        execute(e) {
            return N(this, void 0, void 0, (function*() {
                let t;
                if (window.VWO.modules.tags.sessionInfoService ? t = window.VWO.modules.tags.sessionInfoService : (t = new xi, window.VWO.modules.tags.sessionInfoService = t, window.VWO._.sessionInfoService = t), !t.getSessionStore()) {
                    En.createUUIDCookie2(e), t.getGlobalCookie() || t.createGlobalCookie();
                    const n = t.getRelativeSessionTimestamp();
                    t.initializeSession2 && t.initializeSession2(n)
                }
                return t.setVisitorInformation(), yield t.updateAndSyncPageId(!0)
            }))
        }
    }
    const Di = new Ui,
        ki = Di.execute.bind(Di);
    window.VWO.modules.tags.setSession = Di;
    class Pi {
        otherSide(...e) {
            e[0] = "VWO.modules.tags.checkEnvironment." + e[0], window.fetcher.getValue(...e)
        }
    }
    window.VWO.modules.tags.checkEnvironment = {};
    class Wi {
        otherSide(...e) {
            e[0] = "VWO.modules.tags.checkEnvironment.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class Mi extends Wi {
        addDomListenerForTimeout(e) {
            window.onload = () => {
                e()
            }, "complete" === document.readyState && e()
        }
    }
    const Gi = new Mi;
    window.VWO.modules.tags.checkEnvironment.utils = Gi;
    class $i extends Pi {
        execute() {}
    }
    const Fi = new $i,
        ji = Fi.execute;
    window.VWO.modules.tags.checkEnvironment.fn = Fi;
    class Hi {}
    class Bi extends Hi {
        execute() {}
    }
    const Ki = new Bi,
        Yi = Ki.execute;
    window.VWO.modules.tags.runCampaign = Ki;
    const qi = function() {};
    window.VWO.modules.tags.runTestCampaign.fn = qi;
    class Ji {}
    class Xi extends Ji {
        processGroupCampaigns() {}
    }
    const zi = new Xi,
        Qi = zi.processGroupCampaigns.bind(zi);
    window.VWO.modules.tags.groupCampaigns = Qi;
    class Zi {}
    class eo extends Zi {
        execute() {}
    }
    const to = new eo,
        no = to.execute;
    class io {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.prePostMutation.fn." + e[0], window.fetcher.getValue(...e)
        }
    }
    window.VWO.modules.tags.prePostMutation = {};
    class oo {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.prePostMutation.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    let ro = null,
        so = null,
        ao = null,
        co = !1,
        lo = !1;
    class uo extends oo {
        monitorPageForChanges() {
            if ("undefined" != typeof MutationObserver && !so) {
                const e = {
                        subtree: !0,
                        attributes: !0,
                        childList: !0,
                        attributeFilter: ["class"]
                    },
                    t = function() {
                        co || window.fetcher.getValue("phoenix.trigger", [Ft.MUTATION_FOUND])
                    };
                so = new Ue.MutationObserver(t);
                const n = document.body || document.documentElement;
                n && so.observe(n, e)
            }
        }
        waitForDOMRenderingAndExecuteCampaign(e) {
            co = !0;
            const t = document.body || document.documentElement,
                n = {
                    subtree: !0,
                    childList: !0
                },
                i = function() {
                    lo = !0, ro = ro || dt((function() {
                        co = !1, ao.disconnect(), window.fetcher.getValue("phoenix.trigger", [Ft.SSR_COMPLETE])
                    }), e.timer, !0), ro()
                };

            function o() {
                lo || (co = !1, window.fetcher.getValue("phoenix.trigger", [Ft.SSR_COMPLETE]), ao && ao.disconnect())
            }
            t ? (ao = new Ue.MutationObserver(i), ao.observe(t, n)) : (lo = !0, window.fetcher.getValue("phoenix.trigger", [Ft.SSR_COMPLETE])), e.timeout ? setTimeout(o, e.timeout) : o()
        }
    }
    const go = new uo;
    window.VWO.modules.tags.prePostMutation.utils = go;
    const ho = {},
        po = function(e) {
            this.observed = !1, this.applyCount = 0, void 0 !== Ue.MutationObserver && (this.observer = new Ue.MutationObserver(this.refreshObserverCallback.bind(this)), this.observer.node = e, e.addEventListener("vwoObserverAction", this.observerActionCallback.bind(this)))
        },
        vo = window._vwo_editorOperationTracker = {},
        wo = 100,
        fo = {
            subtree: !0,
            attributes: !0,
            characterData: !0,
            childList: !0,
            attributeFilter: ["style", "src", "srcset"]
        },
        _o = "vwo_refresh_limit_reached",
        Eo = [],
        mo = function(e, t) {
            const n = vwo_$(e);
            if (!n.length || !ho[t]) return;
            const i = n.get(0);
            let o = i.__vwoInternals;
            o || (o = i.__vwoInternals = new po(i), Eo.push(o)), o.applyCount++
        },
        So = function(e, t) {
            const n = document.createEvent("CustomEvent");
            n.initCustomEvent("vwoObserverAction", !0, !1, t), e && e.dispatchEvent(n)
        };
    window._vwo_handleMutations = function(e, t) {
        try {
            e && "function" == typeof t && (So(e, {
                disconnect: !0
            }), t(), So(e, {
                connect: !0
            }))
        } catch (e) {
            const t = "[JSLIB_EDITOR] Error _vwo_handleMutations.";
            window.VWO._.customError && window.VWO._.customError({
                msg: t,
                url: "editorChangesObserver.js",
                source: encodeURIComponent(t)
            })
        }
    }, po.prototype.refreshObserverCallback = function(e, t) {
        const n = t.node,
            i = JSON.parse(JSON.stringify(ho));
        window.vwoRefreshCampaigns && window.vwoRefreshCampaigns.forEach((e => {
            i[e] = !0
        }));
        for (const e in i) i[e] && n.classList && n.classList.remove(`vwo_loaded_${e}`);
        this.disconnectObserver()
    }, po.prototype.observerActionCallback = function(e) {
        if (!e.detail) return;
        const t = e.detail || {},
            n = t.operationId;
        t.disconnect ? n ? vo[n] = "disconnected" : this.disconnectObserver() : t.connect ? this.connectObserver() : n && delete vo[n]
    }, po.prototype.disconnectObserver = function() {
        this.observer.disconnect(), this.observed = !1
    }, po.prototype.connectObserver = function() {
        this.observer && (this.observed || (this.applyCount <= wo ? (this.observer.observe(this.observer.node, fo), this.observed = !0) : this.observer.node.hasAttribute(_o) || this.observer.node.setAttribute(_o, "")))
    }, po.prototype.resetObserver = function() {
        this.observer && (this.applyCount = 0, this.observed || (this.observer.observe(this.observer.node, fo), this.observed = !0), this.observer.node.hasAttribute(_o) && this.observer.node.removeAttribute(_o))
    };
    let Oo = null;
    const To = function() {
        const e = window._vwo_exp,
            t = function(e, t) {
                return window.VWO.phoenix('on("${{1}}", "${{2}}")', null, {
                    captureGroups: [e, t]
                })
            },
            n = function(e, t) {
                return window.VWO.phoenix('off("${{1}}", "${{2}}")', null, {
                    captureGroups: [e, t]
                })
            };
        t(Ft.INIT_VWO_INTERNALS, (function(e) {
            const {
                elementSelector: t,
                campaignId: n
            } = e;
            mo(t, n)
        })), Oo && Oo.then((e => n(Ft.SET_CAMPAIGN_TO_OBSERVE, e))), Oo = t(Ft.SET_CAMPAIGN_TO_OBSERVE, (function(t) {
            var n, i, o, r, s;
            const {
                campaignId: a
            } = t;
            e[a].xPath && "head" !== (null === (n = e[a]) || void 0 === n ? void 0 : n.xPath.toLowerCase()) && (null === (o = null === (i = e[a].muts) || void 0 === i ? void 0 : i.post) || void 0 === o ? void 0 : o.enabled) && (ho[a] = !!(null === (s = null === (r = e[a].muts) || void 0 === r ? void 0 : r.post) || void 0 === s ? void 0 : s.refresh))
        })), t(Ft.URL_CHANGED, (function() {
            for (let e = Eo.length - 1; e > -1; e--) Eo[e].resetObserver()
        })), t(Ft.EDITOR_APPLY_CHANGES_COMPLETE, (function() {
            for (let e = Eo.length - 1; e > -1; e--) Eo[e].connectObserver()
        }))
    };
    window.VWO.modules.tags.prePostMutation.editorChangesObserver = {
        attachEditorChangeObserverEvents: To
    };
    class yo extends io {
        execute() {}
    }
    const Co = new yo,
        Io = Co.execute;
    window.VWO.modules.tags.prePostMutation.fn = Co;
    class No {}

    function Ao(e) {
        return !We() && !window._vis_debug && En.shouldTrackUserForCampaign(e) && window.VWO._.shouldExecuteLib
    }
    class bo {
        constructor() {
            this.vwoEvents = {
                trigger: function(e, t) {
                    return N(this, void 0, void 0, (function*() {
                        yield window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: [e, t]
                        })
                    }))
                }
            }
        }
        isGoalEligible(e, t) {
            return e.pExcludeUrl && Yn.matchRegex(t, e.pExcludeUrl) ? (window.VWO.modules.tags.wildCardCallback({}, Ft.EXCLUDE_GOAL_URL), !1) : e.pUrl ? ti.verifyUrl(t, e.pUrl, null) : ti.verifyUrl(t, null, e.urlRegex)
        }
        registerConversion(e, t, n, i, o) {
            e = e || 1, this._triggerGoalConversion(e, t, n, i, {
                combination: zn.getCombi(t, o)
            })
        }
        getImgUrlForConversion(e, t, n, i) {
            var o, r;
            const s = e.id,
                a = window._vwo_acc_id,
                c = window.VWO.modules.tags.sessionInfoService;
            if (r = "c.gif?account_id=" + a + "&experiment_id=" + s + "&goal_id=" + t + "&ru=" + encodeURIComponent(xe.get()) + (void 0 === i ? "" : "&r=" + i) + En.getUUIDString(En.getUUID(e)), "TRACK" === e.type) {
                o = c.getSessionId(), window.VWO.modules.tags.wildCardCallback({
                    campaign: e
                }, Ft.EXECUTE_FUNNEL_FOR_GOAL_CAMPAIGN);
                const n = (window.tracklib || window.VWO._.track).getGtAndF(t);
                if (n) {
                    return r + "&s=" + o + "&ifs=" + +(o === c.getSessionId()) + "&t=1&cu=" + encodeURIComponent(window.location.href) + n
                }
                return ""
            }
            return c.shouldSendSessionInfoInCall() && (o = c.getSessionId()), r + "&combination=" + n + (o = o ? "&sId=" + o : "")
        }
        _triggerGoalConversion(e, t, n, i, o) {
            const r = o.combination;
            if (!i && (!r || zn.isGoalTriggered(t, e) || En.isBot2())) return void window.VWO.modules.tags.wildCardCallback({
                oldArgs: [t.id, e, n, !1],
                campaignId: t.id,
                goalId: e
            }, Ft.REGISTER_CONVERSION);
            "REVENUE_TRACKING" !== t.goals[e].type && (n = void 0);
            const s = this.getImgUrlForConversion(t, e, r, n);
            s && (Ao(t.id) && On.sendCall(null, {
                url: s
            }, null, null), zn.markGoalTriggered(t, e)), window.VWO.modules.tags.wildCardCallback({
                oldArgs: [t.id, e, n, !!s],
                campaignId: t.id,
                goalId: e
            }, Ft.REGISTER_CONVERSION)
        }
    }
    const Ro = new bo;
    class Lo extends No {
        execute(e, t) {
            if (window.VWO._.willRedirectionOccur) return;
            if (En.isBot2()) return;
            let n = {};
            const i = {},
                o = {};
            for (const n of t)
                for (const t of n.campaigns) {
                    const n = t.c,
                        s = t.g,
                        a = n && window._vwo_exp[n];
                    let c = !1,
                        l = a.goals[s];
                    if (!n || !s || !a || !En.isSessionBasedCampaign2(a) && zn.isGoalTriggered(a, s)) continue;
                    if (!l) continue;
                    if (c = En.isSessionBasedCampaign2(a), c && "CLICK_ELEMENT" !== l.type && "ENGAGEMENT" !== l.type && "ON_PAGE" !== l.type && "FORM_SUBMIT" !== l.type) continue;
                    const u = t.uuid || En.createUUIDCookie2(a);
                    if (!c) {
                        if ("CUSTOM_GOAL" === (null == l ? void 0 : l.type)) {
                            const e = l.url;
                            i[u] = i[u] || [], i[u].indexOf(e) < 0 && i[u].push(e)
                        }
                        zn.markGoalTriggered(a, s), o[u] = o[u] || {};
                        const e = "id_" + n;
                        o[u].metrics = o[u].metrics || {}, o[u].metrics[e] = o[u].metrics[e] || [], o[u].metrics[e].push("g_" + s), a.isEventMigrated && (o[u].comb = o[u].comb || {}, o[u].comb[e] = zn.getCombi(a))
                    }
                    var r = !0;
                    window.VWO._.isBeaconAvailable = e.isBeaconAvailable, window.VWO._.isLinkRedirecting = e.isLinkRedirecting, Ro.registerConversion(s, a, e.revenue, !c, !0), window.VWO._.isLinkRedirecting = !1, r = r && window.VWO._.isBeaconAvailable
                }
            const s = {};
            if (Object.keys(o).length <= 0) return;
            return Object.keys(o).forEach((e => {
                var t;
                const n = Object.keys(o[e])[0].slice(3);
                s[n] = {
                    vwoMeta: {
                        metric: o[e].metrics
                    },
                    uuid: e
                }, o[e].comb && (s[n].vwoMeta.vS = o[e].comb), (null === (t = i[e]) || void 0 === t ? void 0 : t.length) > 0 && (s[n].matchedSelectors = i[e])
            })), s.splitAmongMultipleCalls = !0, n[e.vwoEventName] = s, n
        }
    }
    const Vo = new Lo,
        xo = Vo.execute;

    function Uo() {
        setTimeout((function() {
            var e;
            const t = vwo_$('[id^="_vis_opt_path_hides"]');
            if (t.length) {
                const n = [];
                for (let i = 0; i < t.length; i++) vwo_$(t[i]).remove(), n.push(null === (e = t[i].getAttribute("id")) || void 0 === e ? void 0 : e.split("_").slice(-1)[0]);
                window.fetcher.getValue("phoenix.trigger", [Ft.CHECK_SEGMENTATION]), window.VWO._.customError && window.VWO._.customError({
                    msg: "Multiple hiding tags found after 30 seconds for campaigns " + JSON.stringify(n),
                    url: "visibilityService.js",
                    lineno: 34,
                    colno: 34
                })
            }
        }), 5e3)
    }
    window.VWO.modules.tags.metric = xo, window.VWO.modules.tags.visibilityService = window.VWO.modules.tags.visibilityService || {}, window.VWO.modules.tags.visibilityService.utils = {
        unhideElementsAfterTimer: Uo
    };
    class Do {
        constructor() {
            this.noOp = function() {}
        }
        test() {
            console.log(1)
        }
        getPhoenixConfig() {
            return {
                tags: {
                    checkEnvironment: {
                        fn: ji,
                        sync: !0
                    },
                    runCampaign: {
                        fn: Yi,
                        sync: !0
                    },
                    runTestCampaign: {
                        fn: qi,
                        sync: !0
                    },
                    groupCampaigns: {
                        fn: Qi,
                        sync: !0
                    },
                    prePostMutation: {
                        fn: Io,
                        sync: !0
                    },
                    urlChange: {
                        fn: no,
                        sync: !0
                    },
                    errorTracking: {
                        fn: mt,
                        sync: !0
                    },
                    metric: {
                        fn: xo,
                        sync: !0,
                        fireUniquelyForEveryEvent: !0
                    }
                },
                storages: {
                    localStorageService: _i,
                    cookies: Le
                },
                jsLibUtils: {
                    verifyUrl: function() {
                        return ti.verifyUrl.apply(ti, arguments)
                    }
                }
            }
        }
        sendMessageToParentFrame(e) {
            if (!e) return;
            if (window.self === window.parent) throw new Error("Cookieless Mode for Iframe enabled at top level. ");
            const t = {
                vwoEvent: {
                    name: "VWO_STORE_UPDATE",
                    data: e
                }
            };
            window.parent.postMessage(t, "*")
        }
        initializeCookieJar(e = "ignoreCustomConfig") {
            for (var t, n = Array.prototype.slice.apply(x).length, i = 0; i < n; i++)
                if ("config" === x[i][0]) {
                    t = i;
                    break
                }
            "number" == typeof t && Gt.processEvent(["config", x[t][1]], "jslib", x, t, x);
            var o = x.config();
            "ignoreCustomConfig" !== e && ((o = o || {}).storage = {
                strategy: "custom",
                backwardCompatible: !1,
                strategyConfig: {
                    callback: this.sendMessageToParentFrame,
                    cookieJarValue: this.getCookieJarValidValue(e)
                }
            }), Le.init(o && o.storage)
        }
        getCookieJarValidValue(e) {
            return ["null", null, void 0, "undefined"].indexOf(e) > -1 ? "" : e
        }
        setupCookieJar(e) {
            let t;
            e && (t = location.search.match(/.*_vwo_store=([^&]*)/), t = t ? t[1] : ""), this.initializeCookieJar(t)
        }
        setFunnelExps(e) {
            var t, n;
            const i = null === (t = null == e ? void 0 : e.settings) || void 0 === t ? void 0 : t.campaigns;
            for (const e in window._vwo_exp)
                if (window._vwo_exp[e].funnel)
                    for (const t of window._vwo_exp[e].funnel) {
                        const e = t;
                        (null === (n = window._vwo_exp[e.id]) || void 0 === n ? void 0 : n.g) || (window._vwo_exp[e.id] = e, window._vwo_exp[e.id].g = e.goals, window._vwo_exp[e.id].goals = {}, i && (i[e.id] = window._vwo_exp[e.id]))
                    }
        }
    }
    const ko = new Do;

    function Po() {
        return N(this, void 0, void 0, (function*() {
            const e = window.fetcher,
                t = window.fetcher.getValue("phoenixInstantiate");
            return [function(t, n = null, i = {}) {
                if (!n) return e.getValue("phoenix." + t, null, i);
                e.setValue("phoenix." + t, n)
            }, yield t]
        }))
    }
    window.VWO.modules.utils.initUtils = ko;
    const Wo = Po;
    window._vis_opt_queue = window._vis_opt_queue || [];
    var Mo = window._vis_opt_queue || [];
    const Go = [];
    Go.execute = function(e) {
        try {
            e()
        } catch (e) {}
    }, Go.finish = function(e) {
        if (!this.isProcessed) {
            var t = Mo.push;
            Mo.push = function() {
                t.apply(this, [].slice.call(arguments)), Go.execute.apply(this, [].slice.call(arguments))
            }, this.isProcessed = !0
        }
        for (e = 0; e < Mo.length; e++) Go.execute(Mo[e])
    }, Go.clear = function() {
        Mo.splice(0, Mo.length)
    };
    var $o = function() {},
        Fo = [],
        jo = [],
        Ho = window._vwo_evq = window._vwo_evq || [];
    window.VWO = window.VWO || [], window.VWO._ = window.VWO._ || {};
    var Bo = function(e, t) {
            t.e === e[0] && t.c.apply(this, [e])
        },
        Ko = function(e, t) {
            t.e && t.e !== e[1] || t.v && t.v !== e[2] || t.c.apply(this, [e])
        },
        Yo = function(e) {
            for (var t = 0; t < jo.length; t++) Bo(e, jo[t]);
            if (e[0] === Ft.TRACK_SESSION_CREATED && !0 === e[4] && window.VWO.phoenix('trigger("${{1}}")', null, {
                    captureGroups: [Ft.TRACK_NEW_SESSION_CREATED]
                }), "rH" === e[0] || "vS" === e[0])
                for (t = 0; t < Fo.length; t++) Ko(e, Fo[t])
        },
        qo = Ho.push;
    Ho.push = function() {
        var e = arguments[0];
        Yo(e), qo.apply(Ho, [].slice.call(arguments))
    };
    var Jo = Ho.unshift;
    Ho.unshift = function() {
        var e = arguments[0];
        Yo(e), Jo.apply(Ho, [].slice.call(arguments))
    };
    const Xo = {
        onVariationApplied: function(e, t, n) {
            "function" == typeof e && (n = e, e = null, t = null);
            var i = {
                e: e,
                v: t,
                c: n = n || $o
            };
            Fo.push(i);
            for (var o = 0; o < Ho.length; o++) "rH" !== Ho[o][0] && "vS" !== Ho[o][0] || Ko(Ho[o], i)
        },
        onEventReceive: function(e, t) {
            if (!e) throw new Error("Invalid eventName:" + e);
            var n = {
                e: e,
                c: t = t || $o
            };
            jo.push(n);
            for (var i = 0; i < Ho.length; i++) Bo(Ho[i], n)
        },
        onSurveyShown: function(e) {
            this.push(["onEventReceive", window.VWO._.EventsEnum.ON_SURVEY_SHOWN, function(t) {
                e(t[1])
            }])
        },
        onSurveyCompleted: function(e) {
            this.push(["onEventReceive", window.VWO._.EventsEnum.ON_SURVEY_COMPLETED, function(t) {
                e(t[1])
            }])
        },
        onSurveyAnswerSubmitted: function(e) {
            this.push(["onEventReceive", window.VWO._.EventsEnum.ON_SURVEY_ANSWER_SUBMITTED, function(t) {
                e(t[1])
            }])
        }
    };
    for (var zo in Xo) Xo.hasOwnProperty(zo) && (window.VWO[zo] = Xo[zo]);

    function Qo(e, t) {
        for (const n in e)
            if ("SURVEY" == e[n].type) {
                (!e[n].survey || 0 === Object.keys(e[n].survey).length && e[n].survey.constructor === Object) && c.warn(`Survey settings unavailable for account: ${window._vwo_acc_id} and campaign: ${n}`);
                for (const i in e[n].survey) window._vwo_surveySettings = window._vwo_surveySettings || {}, window._vwo_surveySettings[i] = e[n].survey[i], t && t[n] && (window._vwo_surveySettings[i].debug = t[n].debug.su)
            }
    }

    function Zo(e) {
        x._.libLoaded = !0, x._.commonUtil = ht, x._.utils = dn, x._.customEvent = me, x._.track = x._.track || {}, x._.listener = Xo, x._.EventsEnum = ri, x._.GoalsEnum = {
                SEPARATE_PAGE: "SEPARATE_PAGE",
                CLICK_ELEMENT: "CLICK_ELEMENT",
                ENGAGEMENT: "ENGAGEMENT",
                FORM_SUBMIT: "FORM_SUBMIT",
                ON_PAGE: "ON_PAGE",
                REVENUE_TRACKING: "REVENUE_TRACKING",
                CUSTOM_GOAL: "CUSTOM_GOAL"
            }, x._.CampaignEnum = {
                AB_CAMPAIGN: "VISUAL_AB",
                MVT_CAMPAIGN: "VISUAL",
                SPLIT_CAMPAIGN: "SPLIT_URL",
                SURVEY_CAMPAIGN: "SURVEY",
                ANALYZE_HEATMAP_CAMPAIGN: "ANALYZE_HEATMAP",
                ANALYZE_RECORDING_CAMPAIGN: "ANALYZE_RECORDING",
                ANALYZE_FORM_CAMPAIGN: "ANALYZE_FORM",
                ANALYSIS_CAMPAIGN: "ANALYSIS",
                GOAL_CAMPAIGN: "TRACK",
                FUNNEL_CAMPAIGN: "FUNNEL"
            }, x._.libUtils = En, x._.CookieEnum = an, x._.coreLib = x._.coreLib || {}, x._.coreLib.compareUrlWithIncludeExcludeRegex = Jn.compareUrlWithIncludeExcludeRegex.bind(Jn), x._.coreLib.getCurrentUrl = function() {
                return window._vis_opt_url || window.location.href
            }, x._.coreLib.runCampaigns = function(e, t) {
                return N(this, void 0, void 0, (function*() {
                    "object" == typeof e && (t = e.expIds);
                    const n = t.map((function(e) {
                        return N(this, void 0, void 0, (function*() {
                            yield bn(x.phoenix, Ft._ACTIVATED, {
                                id: e
                            })
                        }))
                    }));
                    yield Promise.all(n), Gt.init("track", x, null)
                }))
            }, x._.libUtils.createUUIDCookie = function() {
                return En.createUUIDCookie2({
                    vwoUUID: e
                })
            }, x._.libUtils.sendCall = function(e) {
                wt({
                    url: e
                })
            }, x._.libUtils.extraData = function(e) {
                return En.extraData2(e)
            }, x._.libUtils.isSessionBasedCampaign = function(e) {
                const t = x._.allSettings.dataStore.campaigns[e];
                return En.isSessionBasedCampaign2(t)
            }, x._.libUtils.isBot = function() {
                return En.isBot2()
            }, Qo(window._vwo_exp),
            function() {
                const e = window._vwo_pa = {},
                    t = window._vwo_exp;
                for (var n in t) "ANALYZE_RECORDING" === t[n].type && (e.r = 1), "ANALYZE_FORM" === t[n].type && (e.r = 1), "ANALYZE_HEATMAP" === t[n].type && (e.r = 1)
            }()
    }

    function er(e, t) {
        if (!window.workerThread) {
            window.parent, window.self;
            const e = !1;
            e && t.phoenix("getters.flags.cookieLessModeEnabled", t._.cLFE = e)
        }
    }
    window.VWO.modules.otherLibDeps.storeSurveyDataInVWOSurveySettings = Qo, window.VWO.modules.otherLibDeps.setOtherLibrariesDeps = Zo;
    const tr = function(e, t) {
            var n, i, o, r, s, a, c, l, u, d;
            const g = e.settings.plugins;
            if (e.flags = e.flags || {}, !g) return;
            const h = g.DACDNCONFIG;
            t._.ac = t._.ac || {}, t.data.pc = t.data.pc || (null === (i = null === (n = t.data) || void 0 === n ? void 0 : n.accountJSInfo) || void 0 === i ? void 0 : i.pc), t.data.noSS = null === (o = t.data.accountJSInfo) || void 0 === o ? void 0 : o.noSS, t.DONT_IOS = null == h ? void 0 : h.DONT_IOS, t.data.sst = null == h ? void 0 : h.SST, t._.sstd = null === (r = null == h ? void 0 : h.SST) || void 0 === r ? void 0 : r.SSTD, t._.ac.it = null === (s = null == h ? void 0 : h.SD) || void 0 === s ? void 0 : s.it, t._.ac.uct = null === (a = null == h ? void 0 : h.SD) || void 0 === a ? void 0 : a.uct, t._.ac.rdbg = null == h ? void 0 : h.rdbg, t.data.fB = null == h ? void 0 : h.FB, e.vwoInternalProperties.SPA_SETTINGS_DELAY = +(null === (c = null == h ? void 0 : h.SD) || void 0 === c ? void 0 : c.it) || 0, e.vwoInternalProperties.SPA_NEW_PAGE_SETTINGS_DELAY = +(null === (l = null == h ? void 0 : h.SD) || void 0 === l ? void 0 : l.uct) || 0, e.vwoInternalProperties.isSpaEnabled = null == h ? void 0 : h.SPA, t._.ac.eNC = null == h ? void 0 : h.eNC, t._.ac.cInstJS = null == h ? void 0 : h.CINSTJS, t._.ac.bsECJ = null == h ? void 0 : h.BSECJ, t._.ast = null == h ? void 0 : h.AST, t.featureInfo = (null == h ? void 0 : h.jsConfig) || {}, window._vwo_clicks = window._vwo_clicks || (null == h ? void 0 : h.HEATMAPCLICKS), t.data.cj = {
                bc: null === (u = null == h ? void 0 : h.CJ) || void 0 === u ? void 0 : u.BC,
                s: null === (d = null == h ? void 0 : h.CJ) || void 0 === d ? void 0 : d.S
            }, t._.ac.eNC = null == h ? void 0 : h.eNC, er(null == h ? void 0 : h.CKLV, t)
        },
        nr = function() {
            var e, t, n = function(e, t) {
                    try {
                        Object.defineProperty(e, t, {
                            writable: !1
                        })
                    } catch (e) {}
                },
                i = function() {
                    if (!window.DISABLE_NATIVE_CONSTANTS) {
                        if (!document.body) return void(window.DISABLE_NATIVE_CONSTANTS = !0);
                        e = window.document.createElement("iframe"), n(e, "src"), e.setAttribute = function(e, t) {}, e.style.display = "none", e.onload = function() {
                            (t = e.contentWindow).onerror = function(e, t, n, i) {
                                window.VWO && window.VWO._ && window.VWO._.customError && window.VWO._.customError({
                                    msg: e,
                                    url: t,
                                    lineno: n,
                                    colno: i,
                                    source: "nativeConstants"
                                })
                            }
                        }, document.body.appendChild(e), (t = e.contentWindow) && n(t.location, "href")
                    }
                };
            return void 0 === window.DISABLE_NATIVE_CONSTANTS ? window.DISABLE_NATIVE_CONSTANTS = !0 : !1 === window.DISABLE_NATIVE_CONSTANTS && i(), {
                get: function(n) {
                    e && e.contentWindow || i();
                    var o = t;
                    return o && !window.DISABLE_NATIVE_CONSTANTS || (o = window), o[n]
                }
            }
        },
        ir = function(e) {
            void 0 === window.DISABLE_NATIVE_CONSTANTS && (window.DISABLE_NATIVE_CONSTANTS = !e), window.VWO._.nativeConstants = nr()
        };
    let or;
    const rr = {
            test: e => {
                var t;
                return or = null === (t = window.VWO) || void 0 === t ? void 0 : t.phoenix, window.workerThread && or && e === or.store.getters
            },
            transformer: function(e) {
                return e === or.store.getters.settings.campaigns || e === or.store.getters.allSettings.dataStore.campaigns ? "vwojFnGPlugCamp" : e === or.store.getters.allSettings ? "vwojFnGPlugAllSet" : e
            },
            parse: (e, t) => {
                if ("vwojFnGPlugCamp" === t) return window._vwo_exp;
                if ("vwojFnGPlugAllSet" === t) {
                    const e = Object.assign({}, window.VWO._.allSettings);
                    return delete e.triggers, delete e.tags, e
                }
                return t
            }
        },
        sr = [rr],
        ar = {
            stringify: function(e, t, n) {
                return JSON.stringify(e, (function(e, i) {
                    if (!n) {
                        const e = sr.filter((e => e.test(i)));
                        if (e.length > 0) {
                            const n = t => e.reduce(((e, t) => t.transformer(e)), t);
                            return JSON.parse(ar.stringify(i, t, n))
                        }
                    }
                    n && (i = n(i));
                    const o = e ? this : t;
                    var r;
                    return i instanceof Function || "function" == typeof i ? i.type === "vwoWrappedFn_" + (window.mainThread ? "WT" : "MT") ? "_NuPreW" + i.name.slice(0, i.name.indexOf("_") + 1) : (r = i.toString()).length < 8 || "function" !== r.substring(0, 8) ? "_NuFrRa" + window.functionWrapper.wrap(i, o) + "_" : "_NuFrNf" + window.functionWrapper.wrap(i, o) + "_" : i instanceof RegExp ? "_PxEgEr_" + i : i
                }))
            },
            parse: function(e, t) {
                if (!e) return e;

                function n(e) {
                    const t = e + "_wrappedFn",
                        n = {
                            [t](...t) {
                                const n = {
                                    type: "callWrappedFunction",
                                    id: e,
                                    args: ar.stringify(t)
                                };
                                return window.fetcher.request(n).send()
                            }
                        }[t];
                    return n.type = "vwoWrappedFn_" + (window.mainThread ? "WT" : "MT"), n
                }
                const i = !!t && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
                return JSON.parse(e, (function(e, t) {
                    var o;
                    if (t = sr.reduce(((t, n) => n.parse(e, t)), t), "string" != typeof t) return t;
                    if (t.length < 8) return t;
                    if (o = t.substring(0, 7), i && t.match(i)) return new Date(t);
                    if ("_NuPreW" === o) {
                        const e = t.match(/_NuPreW([0-9]*)_/)[1];
                        return window.functionWrapper.unwrap(e)
                    }
                    if ("_NuFrNf" === o) {
                        const e = t.match(/_NuFrNf([0-9]*)_/)[1];
                        return n(e)
                    }
                    if ("_PxEgEr" === o) return eval(t.slice(8));
                    if ("_NuFrRa" === o) {
                        const e = +t.match(/_NuFrRa([0-9]*)_/)[1];
                        return n(e)
                    }
                    return t
                }))
            },
            clone: function(e, t) {
                return this.parse(this.stringify(e), t)
            }
        };
    let cr = 0;
    const lr = {},
        ur = {};

    function dr(e, t, n) {
        var i;
        const o = this.postMessage.bind(this);
        if ("response" === (null === (i = e) || void 0 === i ? void 0 : i.type)) {
            const t = e;
            return {
                resolve: function(e) {
                    let n = t.encapsulatedData,
                        i = t.isErrorPresent;
                    n && (n = "function" == typeof e ? e(t.encapsulatedData) : t.encapsulatedData), i ? ur[t.twoWayCommId](n) : lr[t.twoWayCommId](n)
                }
            }
        } {
            const i = {
                type: "response",
                encapsulatedData: e,
                twoWayCommId: t,
                isErrorPresent: n
            };
            return {
                send: function() {
                    try {
                        return o(i), !0
                    } catch (e) {
                        return !1
                    }
                }
            }
        }
    }

    function gr(e) {
        var t;
        if (this.sendingLayer = this.postMessage, "request" === (null === (t = e) || void 0 === t ? void 0 : t.type)) {
            const t = e,
                n = t.encapsulatedData;
            return {
                resolve: e => N(this, void 0, void 0, (function*() {
                    try {
                        const i = yield e(n);
                        return dr.call(this, i, t.twoWayCommId).send(), !0
                    } catch (e) {
                        const n = ar.stringify(e.message);
                        return dr.call(this, n, t.twoWayCommId, !0).send(), !1
                    }
                }))
            }
        } {
            const t = {
                type: "request",
                encapsulatedData: e,
                twoWayCommId: ++cr
            };
            return {
                send: () => new Promise(((e, n) => {
                    try {
                        lr[t.twoWayCommId] = e, ur[t.twoWayCommId] = n, this.sendingLayer(t)
                    } catch (e) {
                        console.log(e), n(e)
                    }
                }))
            }
        }
    }
    var hr;
    ! function(e) {
        e[e.Object = 0] = "Object", e[e.Property = 1] = "Property", e[e.Document = 2] = "Document", e[e.Variable = 3] = "Variable", e[e.OverWrite = 4] = "OverWrite", e[e.Delete = 5] = "Delete"
    }(hr || (hr = {}));
    class pr {
        constructor() {
            this.masterObject = {}
        }
        static isObject(e) {
            return "object" == typeof e && !Array.isArray(e) && null !== e
        }
        static createProxy(e, t, n) {
            if (e.__isProxy || !this.isObject(e)) return e;
            const i = e;
            return Object.defineProperty(i, "__transferData", {
                value: !0,
                enumerable: !1,
                writable: !0
            }), new Proxy(i, {
                set: (e, i, o) => {
                    if ("__isProxy" === i || e[i] === o) return !0;
                    if (typeof e[i] == typeof o && "function" != typeof o && JSON.stringify(o) === JSON.stringify(e[i])) return !0;
                    if (this.isObject(o) ? e[i] = this.proxify(o, t, n + i.toString() + ".") : e[i] = o, "__transferData" === i || !e.__transferData) return !0;
                    const r = {
                        path: n + i.toString() + ".",
                        value: o
                    };
                    return r.value = ar.stringify(o, e), t({
                        type: "sync",
                        data: r,
                        syncType: hr.Object
                    }), !0
                },
                get: (e, t) => "__isProxy" === t || e[t],
                deleteProperty: (e, i) => {
                    if (i in e) {
                        if (delete e[i], !e.__transferData) return !0;
                        const o = {
                            path: n.toString(),
                            key: i
                        };
                        t({
                            type: "sync",
                            data: JSON.stringify(o),
                            syncType: hr.Delete
                        })
                    }
                    return !0
                }
            })
        }
        isKey(e) {
            return e in this.masterObject
        }
        static proxify(e, t, n) {
            return this.isObject(e) ? (Object.keys(null != e ? e : {}).forEach((i => {
                this.isObject(e[i]) && (e[i] = this.proxify(e[i], t, n + i + "."))
            })), this.createProxy(e, t, n)) : e
        }
        register(e, t, n) {
            t in this.masterObject && console.error("Key already exists!"), null == e && (e = {});
            const i = pr.proxify(e, n, t + ".");
            return this.masterObject[t] = {
                proxy: i
            }, i
        }
        append(e, t) {
            return t in this.masterObject || console.error("Key doesn't exist!"), JSON.stringify(e) !== JSON.stringify(this.masterObject[t].proxy) && console.error(`The object doesn't match the object registered under the key ${t}!`), this.masterObject[t].proxy
        }
        static getProxy(e, t, n) {
            return this.proxify(e, t, n + ".")
        }
        static sync(e, t, n, i, o) {
            if (null == e || !e.__isProxy) return e;
            let r = null,
                s = n + ".";
            return 1 === i.length ? (e.__transferData = !1, e[i[0]] = this.proxify(t, o, s + i[0] + "."), e.__transferData = !0, e) : (r = e[i[0]], i.forEach(((e, t) => {
                0 !== t && t !== i.length - 1 && (s += e + ".", e in r || (r.__transferData = !1, r[e] = this.proxify({}, o, s), r.__transferData = !0), r = r[e])
            })), r.__transferData = !1, r[i.pop()] = this.proxify(t, o, s), r.__transferData = !0, e)
        }
    }
    class vr {
        static getSetter(e) {
            return t => {
                let n, i = null;
                if ("string" == typeof t) n = t;
                else {
                    if ("object" != typeof t || Array.isArray(t)) return void console.error("Invalid value type!");
                    n = t.value, i = t.context
                }
                if (window.VWO._.isWorkerThread && "MAIN" !== i) {
                    const e = n.indexOf("="),
                        t = n.substring(0, e).trim(),
                        i = {};
                    n.split(";").forEach((e => {
                        const [t, n = ""] = e.split("=");
                        i[t.trim()] = n.trim()
                    }));
                    let o = !1;
                    (i.expires && new Date(i.expires) < new Date(Date.now()) || "0" === i["max-age"]) && (o = !0);
                    const r = {};
                    document.__cookie.split(";").forEach((e => {
                        if (!e) return;
                        const t = e.split("=");
                        r[t[0]] = t[1]
                    })), o ? delete r[t] : r[t] = i[t], document.__cookie = Object.entries(r).map((e => e.join("="))).join(";")
                } else if (document.__cookie = n, "MAIN" === i) return !0;
                return e({
                    type: "sync",
                    data: {
                        propertyName: "cookie",
                        value: {
                            value: window.VWO._.isWorkerThread ? n : document.__cookie,
                            context: window.VWO._.isWorkerThread ? "WORKER" : "MAIN"
                        }
                    },
                    syncType: hr.Document
                }), !0
            }
        }
    }
    class wr {
        static register(e, t) {
            if (!document) return void console.error("The property doesn't exist on the `DOCUMENT` object.");
            const n = window.VWO._.isWorkerThread ? window.document : window.Document.prototype;
            if (e in window.document) {
                const i = Object.getOwnPropertyDescriptor(n, e);
                Object.defineProperty(n, "__" + e, i), Object.defineProperty(n, e, {
                    enumerable: i.enumerable,
                    configurable: i.configurable,
                    get: () => document["__" + e],
                    set: "cookie" === e ? vr.getSetter(t) : n => (JSON.stringify(document["__" + e]) === JSON.stringify(n) || (document["__" + e] = n, t({
                        type: "sync",
                        data: {
                            propertyName: e,
                            value: document["__" + e]
                        },
                        syncType: hr.Document
                    })), !0)
                })
            }
        }
    }
    class fr {
        static register(e, t, n, i) {
            n in e ? console.error("The property must not pre-exist inside the object.") : Object.defineProperty(e, n, {
                enumerable: !0,
                configurable: !1,
                get: () => e[`__${n}`],
                set: o => (e[`__${n}`] = o, i({
                    type: "sync",
                    data: {
                        identifier: t,
                        property: n,
                        value: o
                    },
                    syncType: hr.Property
                }), !0)
            })
        }
    }

    function _r() {
        class e {
            constructor(e) {
                this.__transferData = !0, this.length = (null == e ? void 0 : e.length) || 0, this.value = e || {}, this.callback = window.fetcher.postMessage.bind(window.fetcher)
            }
            key(e) {
                if (e >= this.length) return null;
                const t = Object.keys(this.value);
                for (let n = 0; n < t.length; n++)
                    if (n === e) return t[n]
            }
            getItem(e) {
                return e in this.value ? this.value[e] : null
            }
            setItem(e, t) {
                if (e in this.value) {
                    if (this.value[e] === t) return
                } else this.length++;
                return this.value[e] = t, this.callback({
                    data: {
                        key: e,
                        value: t
                    },
                    type: "sync",
                    syncType: {
                        type: "custom",
                        method: "localStorage",
                        operation: "setItem"
                    }
                }), null
            }
            removeItem(e) {
                return e in this.value ? (this.length--, delete this.value[e], this.callback({
                    data: {
                        key: e
                    },
                    type: "sync",
                    syncType: {
                        type: "custom",
                        method: "localStorage",
                        operation: "removeItem"
                    }
                }), null) : null
            }
            clear() {
                return 0 === this.length || (this.length = 0, this.value = {}, this.callback({
                    data: {},
                    type: "sync",
                    syncType: {
                        type: "custom",
                        method: "localStorage",
                        operation: "clear"
                    }
                })), null
            }
        }
        if (window.VWO._.isWorkerThread) window.localStorage = new e(window.localStorage);
        else {
            const e = window.fetcher.postMessage.bind(window.fetcher);
            Object.assign(window.Storage.prototype, {
                _setItem: (t, n) => {
                    if (window.localStorage.getItem(t) !== n) return window.localStorage.setItem(t, n), e({
                        data: {
                            key: t,
                            value: n
                        },
                        type: "sync",
                        syncType: {
                            type: "custom",
                            method: "localStorage",
                            operation: "setItem"
                        }
                    }), null
                },
                _removeItem: t => {
                    null !== window.localStorage.getItem(t) && (window.localStorage.removeItem(t), e({
                        data: {
                            key: t
                        },
                        type: "sync",
                        syncType: {
                            type: "custom",
                            method: "localStorage",
                            operation: "removeItem"
                        }
                    }))
                },
                _clear: () => {
                    0 !== Object.keys(window.localStorage).length && (window.localStorage.clear(), e({
                        data: {},
                        type: "sync",
                        syncType: {
                            type: "custom",
                            method: "localStorage",
                            operation: "clear"
                        }
                    }))
                }
            })
        }
    }

    function Er(e) {
        if ("number" != typeof e.syncType) {
            switch (window.localStorage.__transferData && (window.localStorage.__transferData = !1), e.syncType.operation) {
                case "setItem":
                    window.localStorage.setItem(e.data.key, e.data.value);
                    break;
                case "removeItem":
                    window.localStorage.removeItem(e.data.key);
                    break;
                case "clear":
                    window.localStorage.clear();
                    break;
                default:
                    return
            }
            window.localStorage.__transferData && (window.localStorage.__transferData = !0)
        }
    }
    class mr {}
    mr.syncLocalStorage = _r;
    class Sr extends mr {
        constructor() {
            super(), this.objectSyncer = new pr
        }
        register(e, t, n = {}, i = "", o = !1) {
            if ("object" != typeof n || Array.isArray(n)) return;
            const r = window.fetcher.postMessage.bind(window.fetcher);
            switch (e) {
                case "custom":
                    switch (t) {
                        case "localStorage":
                            Sr.syncLocalStorage();
                            break;
                        default:
                            throw new Error("Unknown property name!")
                    }
                    break;
                case hr.Object:
                    {
                        const e = this.objectSyncer.register(n, t, r);
                        return o && r({
                            data: {
                                value: JSON.stringify(n),
                                path: t
                            },
                            type: "sync",
                            syncType: hr.OverWrite
                        }),
                        e
                    }
                case hr.Property:
                    fr.register(n, i, t, r);
                    break;
                case hr.Document:
                    wr.register(t, r);
                    break;
                default:
                    console.error("Unknown 'syncAblesEnum' type!")
            }
        }
        append(e, t) {
            return this.objectSyncer.append(e, t)
        }
        static sync(e, t) {
            var n;
            const {
                data: i
            } = e;
            if ("object" != typeof e.syncType || "custom" !== e.syncType.type) switch (e.syncType) {
                case hr.Object:
                    {
                        i.value = ar.parse(i.value);
                        const e = i.path.substring(0, i.path.lastIndexOf(".")).split(".");window[e[0]] = pr.sync(window[e[0]], i.value, e[0], e.splice(1), t);
                        break
                    }
                case hr.Document:
                    document[i.propertyName] = i.value;
                    break;
                case hr.Property:
                case hr.Variable:
                    t(i);
                    break;
                case hr.OverWrite:
                    if (!("__transferData" in (null !== (n = window[i.path]) && void 0 !== n ? n : {}))) return void(window[i.path] = JSON.parse(i.value));
                    window[i.path] = pr.getProxy(JSON.parse(i.value), t, i.path);
                    break;
                case hr.Delete:
                    {
                        const e = JSON.parse(i),
                            t = e.path.substring(0, e.path.lastIndexOf(".")).split(".").reduce(((e, t) => Object.keys(e).length ? e[t] : window[t]), {}),
                            n = e.key;n in t && (t.__transferData = !1, delete t[n], t.__transferData = !0);
                        break
                    }
                default:
                    console.error("Unknown 'syncAblesEnum' type!")
            } else switch (e.syncType.method) {
                case "localStorage":
                    Er(e);
                    break;
                default:
                    return
            }
        }
        declare(e, t) {
            fr.register(window, "window", e, t)
        }
    }
    const Or = window.VWOEventsArchInCompatibilityMode,
        Tr = (e, t) => {
            if (e && e.bind) try {
                e = e.bind(t)
            } catch (t) {
                if (/(cannot be invoked without 'new')|(Cannot call a class constructor without |new|)/i.test(t.message)) return e;
                console.error(t)
            }
            return e
        };

    function yr(e, t, n = {}) {
        if ("window" === e) return window;
        let i = window;
        const {
            captureGroups: o = null,
            filter: r
        } = n, s = e.split("."), a = s.length;
        for (let e = 0; e < a; e++) {
            let t = s[e];
            if (t.endsWith(")")) {
                const e = t.substring(0, t.indexOf("("));
                let n = t.substring(t.indexOf("("));
                n = "[" + n.slice(1, n.length - 1) + "]";
                const r = n.slice(1, n.length - 1).split(",");
                r.forEach(((e, t) => {
                    e.startsWith('"') || (r[t] = '"vwoCurrThreadRef' + e + '"')
                }));
                const s = JSON.parse(n, ((e, t) => {
                    let n;
                    if ("string" == typeof t) {
                        if (n = t.match(/\${{([0-9]*)}}/)) return o[n[1] - 1];
                        if (n = t.match(/vwoCurrThreadRef(.*)/)) return yr(n[1])
                    }
                    return t
                }));
                i = i[e](...s)
            } else {
                let e = !1;
                t.endsWith("?") && (t = t.slice(0, -1), e = !0);
                const n = i[t];
                if (i = Tr(n, i), e && null == i) return i
            }
        }
        if (r) {
            const e = {};
            r.forEach((t => {
                e[t] = i[t]
            })), i = e
        }
        return i
    }
    const Cr = function(e) {
            return window.functionWrapper.unwrap(e.id)(...ar.parse(e.args))
        },
        Ir = function(e) {
            var t, n;
            return N(this, void 0, void 0, (function*() {
                switch (e.type) {
                    case "callWrappedFunction":
                        {
                            const t = Cr(e);
                            return ar.stringify(t)
                        }
                    case "vwoClassInstanceBridge":
                        {
                            const t = e.path.dest.lastIndexOf(".");
                            let n = window,
                                i = e.path.dest; - 1 !== t && (n = yr(e.path.dest.slice(0, t)), i = e.path.dest.substr(t + 1));
                            const o = n[i],
                                [r, s] = new o(...e.args);
                            return s.otherSide = (...t) => {
                                const n = e.path.src + "." + r + "." + t[0];
                                return t[0] = n, window.fetcher.getValue(...t)
                            },
                            "" + r
                        }
                    default:
                        {
                            let i, o;
                            if ("setValue" === (e = ar.parse(e)).type) {
                                -1 == e.path.lastIndexOf(".") && (e.path = "window." + e.path);
                                const t = e.path;
                                e.path = t.slice(0, t.lastIndexOf(".")), i = t.slice(t.lastIndexOf(".") + 1)
                            }(null === (t = e.config) || void 0 === t ? void 0 : t.captureGroups) && (e.config.captureGroups = ar.parse(e.config.captureGroups));
                            const r = o = yr(e.path, e.args, null == e ? void 0 : e.config);
                            return (null === (n = e.config) || void 0 === n ? void 0 : n.constructable) ? o = new r(...e.args) : "function" == typeof r && (o = r(...e.args || [])),
                            i && (o = r[i] = e.val),
                            o = yield o,
                            ar.stringify(o)
                        }
                }
            }))
        };
    class Nr {}
    class Ar extends Nr {
        init() {
            var e, t, n;
            this.thread = (null === (t = null === (e = window) || void 0 === e ? void 0 : e.mainThread) || void 0 === t ? void 0 : t.webWorker) || (null === (n = window) || void 0 === n ? void 0 : n.workerThread), this.request = gr, this.response = dr, this.thread.onmessage = this.onMessage.bind(this)
        }
        onMessage(e) {
            var t, n;
            const {
                data: i
            } = e;
            switch (i.type) {
                case "initDone":
                    window.vwo_initDone(i);
                    break;
                case "request":
                    this.request(i).resolve(Ir);
                    break;
                case "response":
                    this.response(i).resolve(ar.parse.bind(ar));
                    break;
                case "sync":
                    {
                        let e = e => null;
                        switch (i.syncType) {
                            case hr.OverWrite:
                            case hr.Object:
                                e = this.postMessage.bind(this);
                                break;
                            case hr.Property:
                            case hr.Document:
                            case hr.Variable:
                            case hr.Delete:
                        }
                        Sr.sync(i, e);
                        break
                    }
                default:
                    null === (n = (t = this.thread)._onMessage) || void 0 === n || n.call(t, e)
            }
        }
        postMessage(e) {
            try {
                this.thread.postMessage(e)
            } catch (e) {
                console.error(e)
            }
        }
        getValue(e, t, n = {}) {
            let i;
            (null == n ? void 0 : n.captureGroups) && (i = ar.stringify(n.captureGroups));
            const o = {
                path: e,
                args: t,
                config: Object.assign(Object.assign({}, n), {
                    captureGroups: i
                })
            };
            return this.request(ar.stringify(o)).send()
        }
        setValue(e, t) {
            const n = {
                type: "setValue",
                path: e,
                val: t
            };
            return this.request(ar.stringify(n)).send()
        }
    }
    class br extends Nr {
        init() {}
        onMessage() {}
        postMessage() {
            this.onMessage.apply(this, arguments)
        }
        getValue(e, t, n = {}) {
            return new Promise((n => {
                t ? Array.isArray(t) ? n(window[e](...t)) : t.captureGroups.forEach(((t, n) => {
                    e.replace(`{{${n}}}`, ar.parse(t))
                })) : n(e)
            }))
        }
        setValue(e, t) {
            return window[e] = t
        }
    }
    const Rr = Or ? br : Ar;
    window.fetcher = new Rr;
    class Lr {
        constructor() {
            this.storageLookUpKey = "_vwo_store_content"
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.vwoUtils.contentSync." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    class Vr extends Lr {
        constructor() {
            super(...arguments), this.collectedData = {}, this.requestsChecker = {}
        }
        updateStorage() {
            return N(this, void 0, void 0, (function*() {
                if (!this.response) return;
                const e = JSON.parse(this.response);
                fe(e).length && (yield window.fetcher.getValue("VWO._.contentSyncService.updateStorage", [e]))
            }))
        }
        syncFromBackend(e, t, n, i) {
            const [o, r] = e.split(".");
            if (this.collectedData[o] = this.collectedData[o] || {}, this.collectedData[o][r] = this.collectedData[o][r] || [], this.requestsChecker[n]) return;
            this.requestsChecker[n] = 1, this.collectedData[o][r].push(t);
            const s = this;
            this.debouncedCall = this.debouncedCall || dt((function() {
                return N(this, void 0, void 0, (function*() {
                    nn({
                        url: i + "sync?a=" + window._vwo_acc_id,
                        data: JSON.stringify(s.collectedData),
                        success: s.updateStorage
                    }), s.collectedData = {}
                }))
            }), 0), this.debouncedCall()
        }
    }
    window.VWO.modules.vwoUtils.contentSync = new Vr;
    class xr {
        static parseUrl(e) {
            const t = /^((((\w+)(:\/\/))?((\w+):(\w+)@)?(www\.)?)([^?#\/:\s]*)?:?([0-9][^?#\/\s]*)?)\/?([^?#\s]*)\??([^#\s]*)#?(.*)$/.exec(e.trim());
            if (!t) throw new Error("Not a valid URL.");
            return t && {
                url: t[0],
                origin: t[1].replace(t[6], ""),
                protocol: t[4] || "",
                hasWWW: Boolean(t[9]),
                username: t[7] || "",
                password: t[8] || "",
                host: (t[9] || "") + t[10],
                domain: t[10],
                port: t[11] || "",
                path: t[12],
                query: t[13] || "",
                queryParams: t[13] ? t[13].split("&").reduce(((e, t) => {
                    const [n, i = ""] = t.split("=");
                    return e[n] = i, e
                }), {}) : {},
                fragment: t[14] || "",
                urlWithoutProtocol: t[0].replace(t[3], ""),
                urlWithoutProtocolAndWww: t[0].replace(t[2], "")
            }
        }
    }
    var Ur = {
        LOGGER_LEVEL: "error"
    };
    const Dr = xr.parseUrl(window.location.href).queryParams.vwoLogLevel;
    var kr = new a(Dr || Ur.LOGGER_LEVEL);
    class Pr {
        constructor() {
            this.plugins = {}
        }
        register(e) {
            kr.debug(`Registering plugin '${e.pluginName}' in Plugins factory`), this.plugins[e.pluginName] = e
        }
        unregister(e) {
            let t;
            t = v(e) ? e : e.pluginName, kr.debug(`Unregistering plugin '${t}' in Plugins factory`), this.plugins[t].removeAll(), delete this.plugins[t]
        }
        unregisterAll() {
            kr.debug("Unregistering all plugins in Plugins factory"), Object.keys(this.plugins).forEach((e => {
                this.plugins[e].removeAll(), delete this.plugins[e]
            }))
        }
    }
    var Wr = new Pr,
        Mr;
    ! function(e) {
        e.EVENT = "event", e.EVENT_PROPS = "eventProps", e.STORAGE = "storage", e.FORMULA = "formula", e.OPERATOR = "operator", e.TAG = "tag"
    }(Mr || (Mr = {}));
    class Gr {
        get(e) {
            return this[e]
        }
        set(e, t) {
            this[e] = t
        }
    }
    var $r = new Gr,
        Fr;
    ! function(e) {
        e[e.EXCLUDE_PASSED = 1] = "EXCLUDE_PASSED", e[e.INCLUDE_PASSED = 2] = "INCLUDE_PASSED", e[e.INCLUDE_FAILED = 3] = "INCLUDE_FAILED"
    }(Fr || (Fr = {}));
    var jr = Fr,
        Hr;
    ! function(e) {
        e.OR = "o", e.AND = "a"
    }(Hr || (Hr = {}));
    var Br = Hr;
    class Kr {
        constructor() {
            this.experimentConfig = {}, this.pageConfig = {}, this.experimentConfigCache = {}, this.pageConfigCache = {}, this.previewParamsCleanedUrlCache = {}, Kr.cleanerRegex = /(^https?:\/\/)?(w{3}\.)?(.*?)?(\/(?:home|default|index)\.\w{3,4}|\/$)?(\/)?([?#].*)?$/i, Kr.logicalOperators = [Br.AND, Br.OR]
        }
        static get currentUrl() {
            return window.location.href
        }
        add(e, t) {
            if (kr.debug("Adding pageGroup config to phoenix"), p(e) && (Object.hasOwnProperty.call(e, "ec") && e.ec.forEach((e => {
                    const t = Object.keys(e)[0];
                    this.experimentConfig[t] || (this.experimentConfig[t] = e[t])
                })), Object.hasOwnProperty.call(e, "pc") && e.pc.forEach((e => {
                    const t = Object.keys(e)[0];
                    this.pageConfig[t] || (this.pageConfig[t] = e[t])
                }))), p(t)) {
                if (d(t.pc)) {
                    const e = this.getCache(Kr.currentUrl, !0);
                    t.pc.forEach((t => {
                        e[t] = {
                            didMatch: !0,
                            reason: jr.INCLUDE_PASSED,
                            cacheHit: !0
                        }
                    }))
                }
                if (d(t.ec)) {
                    const e = this.getCache(Kr.currentUrl);
                    t.ec.forEach((t => {
                        e[t] = {
                            didMatch: !0,
                            reason: jr.INCLUDE_PASSED,
                            cacheHit: !0
                        }
                    }))
                }
            }
        }
        getCache(e, t) {
            return t ? (this.pageConfigCache = this.pageConfigCache || {}, this.pageConfigCache[e] = this.pageConfigCache[e] || {}, this.pageConfigCache[e]) : (this.experimentConfigCache = this.experimentConfigCache || {}, this.experimentConfigCache[e] = this.experimentConfigCache[e] || {}, this.experimentConfigCache[e])
        }
        getPreviewParamsCleanedUrl(e) {
            return e ? (this.previewParamsCleanedUrlCache = this.previewParamsCleanedUrlCache || {}, this.previewParamsCleanedUrlCache[e] || (this.previewParamsCleanedUrlCache[e] = $r.get("jsLibUtils").getCleanedUrl(e, !0)), this.previewParamsCleanedUrlCache[e]) : e
        }
        getIndexFileCleanedUrl(e) {
            return e ? (this.indexFileCleanedUrlCache = this.indexFileCleanedUrlCache || {}, this.indexFileCleanedUrlCache[e] || (this.indexFileCleanedUrlCache[e] = e.replace(Kr.cleanerRegex, "$1$2$3$5$6")), this.indexFileCleanedUrlCache[e]) : e
        }
        validatePage(e, t, n, i) {
            const o = t ? this.pageConfig[e] : this.experimentConfig[e];
            if (!o) return kr.info(`ConfigId ${e} is not present inside ${t?"pageConfig":"experimentConfig"}`), {
                didMatch: !1,
                reason: jr.INCLUDE_FAILED,
                cacheHit: !1
            };
            const r = n || Kr.currentUrl,
                s = this.getCache(r, t);
            if (s && Object.hasOwnProperty.call(s, e)) return kr.info(`Fetching value from cache for ${t?"pageConfigId":"experimentConfigId"} = ${e}`), s[e].cacheHit = !0, s[e];
            let a;
            const c = o.exc,
                l = o.inc;
            if (Array.isArray(c) && c.length > 0) {
                const t = this.evaluateDSL(c, r, i || !1);
                if (t) return a = {
                    didMatch: !t,
                    reason: jr.EXCLUDE_PASSED,
                    cacheHit: !1
                }, i || (s[e] = a), a
            }
            if (Array.isArray(l))
                if (l.length) {
                    const e = this.evaluateDSL(l, r, i || !1);
                    a = e ? {
                        didMatch: e,
                        reason: jr.INCLUDE_PASSED,
                        cacheHit: !1
                    } : {
                        didMatch: e,
                        reason: jr.INCLUDE_FAILED,
                        cacheHit: !1
                    }
                } else a = {
                    didMatch: !0,
                    reason: jr.INCLUDE_PASSED,
                    cacheHit: !1
                };
            return a = a || {
                didMatch: !1,
                reason: jr.INCLUDE_FAILED,
                cacheHit: !1
            }, i || (s[e] = a), a
        }
        evaluateDSL(e, t, n) {
            if (!d(e) || e.length < 2) return kr.error("Invalid dsl tree", e), !1;
            const i = [];
            return e.forEach((e => {
                var o;
                let r;
                if (e || (r = !1), v(e) && (r = e), d(e))
                    if (Kr.logicalOperators.includes(e[0])) r = this.evaluateDSL(e, t, n);
                    else {
                        const [i, s, ...a] = e, c = null === (o = Wr.plugins[Mr.OPERATOR]) || void 0 === o ? void 0 : o.get(s);
                        let l;
                        if (i.includes("url")) l = this.getIndexFileCleanedUrl(this.getPreviewParamsCleanedUrl(t));
                        else {
                            const e = a[0];
                            l = this.validatePage(e, !0, t, n).didMatch, a[0] = !0
                        }
                        r = null == c ? void 0 : c(l, ...a, {
                            jsLibUtils: $r.get("jsLibUtils"),
                            pageUrl: !0
                        })
                    }
                i.push(r || !1)
            })), this.evaluateTree(i)
        }
        evaluateTree(e) {
            let t = !1;
            switch (e[0]) {
                case Br.AND:
                    t = !e.includes(!1);
                    break;
                case Br.OR:
                    t = e.includes(!0)
            }
            return t
        }
    }
    var Yr = new Kr;
    const qr = {
        SURVEY_ID: "{{survey_id}}"
    };

    function Jr(e, t) {
        if (e.filters)
            for (let n = 0; n < e.filters.length; n++)
                if ("string" != typeof e.filters[n])
                    for (let i = 0; i < e.filters[n].length; i++) e.filters[n][i] === qr.SURVEY_ID && (e.filters[n][i] = t);
        return e
    }
    class Xr {
        execute({
            callbacks: e,
            data: t,
            eventName: n
        }) {
            return N(this, void 0, void 0, (function*() {
                let i = t;
                for (let t = 0; t < e.length; t++)
                    if (f(e[t]) || _(e[t])) {
                        const o = yield e[t](i, n);
                        o && (i = o)
                    }
            }))
        }
    }
    var zr = new Xr,
        Qr, Zr, es, ts;
    ! function(e) {
        e.SETTINGS = "settings", e.CUSTOM = "custom", e.TRIGGERS = "triggers", e.TAGS = "tags", e.EVENTS = "events", e.DEBUG = "debug", e.ROOT = "root"
    }(Qr || (Qr = {})),
    function(e) {
        e.HISTORY = "history"
    }(Zr || (Zr = {})),
    function(e) {
        e.LOGS = "logs"
    }(es || (es = {})),
    function(e) {
        e.ALIAS = "$alias"
    }(ts || (ts = {}));
    class ns {
        constructor() {
            this.originalValues = {
                [Qr.SETTINGS]: {},
                [Qr.CUSTOM]: {},
                [Qr.TRIGGERS]: {},
                [Qr.EVENTS]: {
                    [Zr.HISTORY]: []
                },
                [Qr.DEBUG]: {
                    [es.LOGS]: []
                }
            }, this.reset()
        }
        reset() {
            this.values = JSON.parse(JSON.stringify(this.originalValues)), this.setValues(this.values)
        }
        getValue(e = "") {
            try {
                return e.split(".").reduce(((e, t) => e[t]), this.values)
            } catch (e) {
                return null
            }
        }
        set(e, t, n = "") {
            const i = m.createNestedObjects(this.values, n);
            this.defineProperty(i, e, t)
        }
        setValues(e, t = "") {
            const n = this.getNamespace(t);
            u(e) && Object.keys(e).forEach((t => {
                this.set(t, e, n), u(e[t]) && this.setValues(e[t], `${n}.${t}`)
            }))
        }
        clear(e) {
            const t = this.getNamespace(e);
            m.clearNestedObject(this.values, t)
        }
        defineProperty(e, t, n, i = "") {
            let o = n[t];
            const r = Object.getOwnPropertyDescriptor(n, t),
                [s, ...a] = v(o) ? o.split(".") : [],
                c = this;
            switch (s) {
                case ts.ALIAS:
                    Object.defineProperty(e, t, {
                        get() {
                            const [e, ...t] = (Object.prototype.hasOwnProperty.call(r, "get") ? r.get() : "").split(".");
                            return c.getValue((t || a).join("."))
                        },
                        configurable: !0
                    });
                    break;
                default:
                    try {
                        Object.defineProperty(e, t, {
                            get: () => Object.prototype.hasOwnProperty.call(r, "get") ? r.get() : o,
                            set(e) {
                                var n;
                                JSON.stringify(o) !== JSON.stringify(e) && (o = e, Object.prototype.hasOwnProperty.call(r, "set") && (null === (n = r.set) || void 0 === n || n.call(r, e)), c.setValues(e, i ? `${i}.${t}` : t))
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    } catch (i) {
                        ns.logger.info(i), Object.prototype.hasOwnProperty.call(e, t) || (e[t] = n[t])
                    }
            }
        }
        getNamespace(e) {
            return (null == e ? void 0 : e.startsWith(".")) ? e.substring(1) : e
        }
    }
    ns.logger = new a("warn");
    var is = new ns;
    class os {
        constructor() {
            const e = function(e, t) {
                Object.defineProperty(this, e, {
                    get: t,
                    enumerable: !0
                })
            }.bind(this);
            e("settings", (() => is.values[Qr.SETTINGS])), e("custom", (() => is.values[Qr.CUSTOM])), e("url", (() => window.location.href)), e("refUrl", (() => window.document.referrer))
        }
        get triggers() {
            return is.values[Qr.TRIGGERS]
        }
        get tags() {
            return is.values[Qr.TAGS]
        }
        get pageGroupExperimentConfig() {
            return Yr.experimentConfig
        }
        get pageGroupPageConfig() {
            return Yr.pageConfig
        }
        get events() {
            return is.values[Qr.EVENTS]
        }
        get eventsHistory() {
            return this.events[Zr.HISTORY]
        }
        get window() {
            return window
        }
        addNameSpace(e = "") {
            const t = e.split(".")[0];
            t in this || Object.defineProperty(this, t, {
                get: () => is.values[t],
                configurable: !0,
                enumerable: !0
            })
        }
        getValue(e = "") {
            return is.getValue(e)
        }
        getHistoryEvents(e) {
            var t, n, i;
            const o = [];
            null === (t = this.events[Zr.HISTORY]) || void 0 === t || t.forEach((({
                name: t,
                event: n
            }) => {
                t === e && o.push(n)
            }));
            const r = null === (i = null === (n = window.VWO) || void 0 === n ? void 0 : n._) || void 0 === i ? void 0 : i.crossStore;
            let s = null == r ? void 0 : r.getLocal({
                key: Zr.HISTORY
            });
            return s && (s = JSON.parse(s)), s && s.forEach((({
                name: t,
                event: n
            }) => {
                t === e && o.push(n)
            })), o
        }
    }
    var rs = new os,
        ss = {
            MAX_EVENTS_HISTORY: 1e3,
            MAX_LOGS_HISTORY: 1e3,
            EVENTS_TO_PERSIST: ["s.q", "s.r"]
        };
    class as {
        refreshState(e) {
            is.setValues(e)
        }
        clear(e) {
            is.clear(e)
        }
        clearAll() {
            is.reset()
        }
        addValues(e, t = "") {
            is.setValues(e, t), t ? rs.addNameSpace(t) : Object.keys(e).forEach((e => {
                rs.addNameSpace(e)
            }))
        }
        addEventInHistory({
            name: e,
            event: t
        }) {
            const n = is.values[Qr.EVENTS][Zr.HISTORY];
            n.push({
                name: e,
                event: t
            }), n.length > ss.MAX_EVENTS_HISTORY && n.shift(), ss.EVENTS_TO_PERSIST.indexOf(e) > -1 && window.fetcher.getValue("VWO._.crossStore.getLocal", [{
                key: Zr.HISTORY
            }]).then((n => {
                let i = n;
                i ? (i = JSON.parse(i), i.push({
                    name: e,
                    event: t
                })) : i = [{
                    name: e,
                    event: t
                }], window.fetcher.getValue("VWO._.crossStore.set", [Zr.HISTORY, JSON.stringify(i)])
            })).catch((e => {
                console.log(e)
            }))
        }
        addLogsForDebugging(e) {
            const t = is.values[Qr.DEBUG][es.LOGS];
            t.push(e), t.length > ss.MAX_LOGS_HISTORY && t.shift()
        }
    }
    var cs = new as;
    class ls {
        refreshState(e) {
            cs.refreshState(e)
        }
        addValues(e, t = Qr.CUSTOM) {
            cs.addValues(e, t === Qr.ROOT ? "" : t)
        }
        set(e, t, n = Qr.CUSTOM) {
            this.addValues({
                [e]: t
            }, n)
        }
        clear(e) {
            cs.clear(e)
        }
        clearAll() {
            cs.clearAll()
        }
        updateSettings(e, t = "") {
            this.addValues(e, t ? `${Qr.SETTINGS}.${t}` : Qr.SETTINGS)
        }
        addEventInHistory({
            name: e,
            event: t
        }) {
            cs.addEventInHistory({
                name: e,
                event: t
            })
        }
        addLogsForDebugging(e) {
            cs.addLogsForDebugging(e)
        }
        updateTriggerState(e, t) {
            cs.addValues({
                state: t
            }, `${Qr.TRIGGERS}.${e}`)
        }
        updateTagState(e, t) {
            ls.logger.debug(`Updating tag ${e} in store' with `, t), cs.addValues(t, `${Qr.TAGS}.${e}`)
        }
        clearTriggerState(e = "") {
            this.clear(e ? `${Qr.TRIGGERS}.${e}` : Qr.TRIGGERS)
        }
        updateTriggerExecutionCount(e, t) {
            cs.addValues({
                executionCount: t
            }, `${Qr.TRIGGERS}.${e}`)
        }
    }
    ls.logger = new a("warn");
    var us = new ls;
    const ds = function() {
        var e, t;
        return (null === (t = null === (e = window.VWO) || void 0 === e ? void 0 : e._) || void 0 === t ? void 0 : t.performance) || window.performance
    };
    class gs {
        constructor() {
            this.events = {}, this.eventIdsMapping = {}, this.globalInterceptors = {}, this.eventId = 0, this.eventsFrequencyManager = {}
        }
        setGlobalInterceptors(e = {}) {
            this.globalInterceptors = e
        }
        trigger(e, n = {}, i = {}) {
            return N(this, void 0, void 0, (function*() {
                e !== t.TIMER && kr.info(`Triggering event '${e}'`, {
                    data: n,
                    event: this.events[e]
                }), ds().mark(`event-${e}`), Object.values(t).every((t => !e.startsWith(t))) && (this.addComputedEventProps(e, n), yield this.trigger(t.WILD_CARD, n, {
                    eventName: e
                }), us.addEventInHistory({
                    name: e,
                    event: n
                }));
                const o = this.events[e];
                let r;
                r = this.eventsFrequencyManager[e] ? this.eventsFrequencyManager[e].then((() => this.executeListeners(e, n, i, o))) : this.executeListeners(e, n, i, o), this.eventsFrequencyManager[e] = r, yield r
            }))
        }
        executeListeners(e, n = {}, i = {}, o) {
            return N(this, void 0, void 0, (function*() {
                const r = null == o ? void 0 : o.length;
                if (r) {
                    const t = [],
                        s = o.push;
                    o.push = r => {
                        s.call(o, r), t.push(new Promise((t => {
                            queueMicrotask((() => N(this, void 0, void 0, (function*() {
                                yield zr.execute({
                                    callbacks: [this.globalInterceptors.before, r.before, r.fn, this.globalInterceptors.after, r.after],
                                    data: n,
                                    eventName: i.eventName || e
                                }), this.eventIdsMapping[r.id].executionCount++, t(null)
                            }))))
                        })))
                    };
                    for (let s = 0; s < r; ++s) {
                        const r = o[s];
                        kr.debug(`Synchronously executing listener for event '${r.id}' with event name '${e}'`), t.push(zr.execute({
                            callbacks: [this.globalInterceptors.before, r.before, r.fn, this.globalInterceptors.after, r.after],
                            data: n,
                            eventName: i.eventName || e
                        }).then((() => {
                            this.eventIdsMapping[r.id].executionCount++
                        })))
                    }
                    yield Promise.all(t), o.push = s
                } else e !== t.TIMER && kr.debug(`No callbacks for the event ${e}. Events List in eventBus is`, this.events)
            }))
        }
        on(e, t, {
            before: n,
            after: i
        } = {}) {
            var o;
            kr.debug(`Attaching listener for event name '${e}'`);
            const r = ++this.eventId,
                s = Object.assign(Object.assign({
                    id: r,
                    fn: t
                }, n && {
                    before: n
                }), i && {
                    after: i
                });
            return this.events[e] = this.events[e] || [], this.events[e].push(s), this.eventIdsMapping[r] = {
                executionCount: 0,
                event: s
            }, null === (o = Wr.plugins[Mr.EVENT]) || void 0 === o || o.addDomEvent(e), this.eventId
        }
        off(e, t) {
            var n;
            kr.debug(`Removing a listener for event '${e}'`, {
                reference: t
            }), this.events[e] = null === (n = this.events[e]) || void 0 === n ? void 0 : n.filter((e => f(t) ? e.fn !== t : e.id !== Number(t)))
        }
        remove(e) {
            kr.debug(`Removing all the listener for event '${e}'`), this.events[e] = []
        }
        removeAll() {
            kr.debug("Removing all the listener for every event"), this.events = {}, this.eventIdsMapping = {}
        }
        event(e) {
            return {
                register(t, n) {
                    kr.debug(`Registering hooks for event ID '${e}'`, {
                        hook: t
                    }), this.eventIdsMapping[e][t] = n
                },
                get executionCount() {
                    return this.eventIdsMapping[e].executionCount
                },
                get hasExecuted() {
                    return Boolean(this.eventIdsMapping[e].executionCount)
                }
            }
        }
        addComputedEventProps(e, t) {
            var n, i;
            const o = (null === (n = Wr.plugins[Mr.EVENT_PROPS]) || void 0 === n ? void 0 : n.get("*")) || {},
                r = (null === (i = Wr.plugins[Mr.EVENT_PROPS]) || void 0 === i ? void 0 : i.get(e)) || {},
                s = Object.assign(Object.assign({}, o), r);
            Object.keys(s).forEach((n => {
                t[n] = s[n](t, e)
            }))
        }
    }
    var hs = new gs,
        ps;
    ! function(e) {
        e.AND = "a", e.OR = "o"
    }(ps || (ps = {}));
    class vs {
        evaluateExpression(e) {
            return e && this.recursivelyEvaluateTree(0, e)
        }
        recursivelyEvaluateTree(e, t) {
            if (w(t[e])) return Boolean(t[e]);
            if (!p(t[e])) return !0;
            const n = 2 * (e + 1) - 1,
                i = 2 * (e + 1);
            return this.isValid(t[e], this.recursivelyEvaluateTree(n, t), this.recursivelyEvaluateTree(i, t))
        }
        isValid(e, t, n) {
            switch (e) {
                case ps.AND:
                    return t && n;
                case ps.OR:
                    return t || n;
                default:
                    throw new Error(e)
            }
        }
    }
    var ws = new vs,
        fs;
    class _s {}! function(e) {
        e.EVENT = "event", e.FORMULA = "formula", e.CUSTOM = "custom", e.SETTINGS = "settings", e.DEFAULT = "default", e.STORAGE = "storage", e.WINDOW = "window", e.TAGS = "tags"
    }(fs || (fs = {}));
    class Es {
        getValue({
            event: e,
            variableName: t,
            formulaValues: n
        }) {
            return N(this, void 0, void 0, (function*() {
                if (kr.debug(`Extracting value of variable '${t}'`), d(t)) {
                    return Promise.all(t.map((t => N(this, void 0, void 0, (function*() {
                        return yield this.extractVariableValue({
                            event: e,
                            variableName: t,
                            formulaValues: n
                        })
                    })))))
                }
                return this.extractVariableValue({
                    event: e,
                    variableName: t,
                    formulaValues: n
                })
            }))
        }
        extractVariableValue({
            event: e,
            variableName: t,
            formulaValues: n
        }) {
            var i, o;
            return N(this, void 0, void 0, (function*() {
                kr.debug(`Extracting value of variable '${t}'`);
                const {
                    type: r,
                    key: s
                } = this.getVariableTypeAndKey(t);
                let a, c = !1;
                switch (kr.debug(`Evaluated type and key of variable '${t}' are `, {
                    type: r,
                    key: s
                }), r) {
                    case fs.EVENT:
                        a = e;
                        break;
                    case fs.FORMULA:
                        a = n;
                        break;
                    case fs.CUSTOM:
                        a = rs.custom;
                        break;
                    case fs.SETTINGS:
                        a = rs.settings;
                        break;
                    case fs.WINDOW:
                        a = this.getValueFromMtWindow(s);
                        break;
                    case fs.TAGS:
                        try {
                            a = s.startsWith("js") ? yield null === (i = Wr.plugins[Mr.TAG]) || void 0 === i ? void 0 : i.get(s).fn(): null === (o = Wr.plugins[Mr.TAG]) || void 0 === o ? void 0 : o.get(s).fn
                        } catch (e) {}
                        break;
                    case fs.STORAGE:
                        {
                            const e = Wr.plugins[Mr.STORAGE],
                                t = s.split("."),
                                [n, i, o] = t,
                                r = null == e ? void 0 : e.get(n);a = "includes" === i ? r && r.includes ? r.includes(o) : void 0 : r && r.getItem ? r.getItem(i) : void 0;
                            break
                        }
                    default:
                        a = rs, c = !0
                }
                let l = r === fs.STORAGE || r === fs.WINDOW ? a : this.extractValue(a, s);
                return l = r === fs.TAGS ? a : l, c && h(l) && (l = this.getValueFromMtWindow(s)), kr.debug(`Evaluated value of variable '${t}' is '${l}'`), l
            }))
        }
        getValueFromMtWindow(e) {
            return N(this, void 0, void 0, (function*() {
                const t = window.fetcher || {
                    getValue: e => Promise.resolve(window[e])
                };
                let n;
                try {
                    n = yield t.getValue(e)
                } catch (e) {}
                return n
            }))
        }
        getVariableTypeAndKey(e) {
            var t;
            kr.debug(`Getting type and key of variable '${e}'`);
            const n = e.split("."),
                i = null === (t = n.splice(0, 1)[0]) || void 0 === t ? void 0 : t.toLowerCase();
            return Object.values(fs).includes(i) ? {
                type: i,
                key: n.join(".")
            } : {
                type: fs.DEFAULT,
                key: e
            }
        }
        extractValue(e, t) {
            try {
                return t.split(".").reduce(((e, t) => e[t]), e)
            } catch (e) {
                return
            }
        }
    }
    var ms = new Es;
    const Ss = {
            UNKNOWN_SET_API_TYPE: "Unknown type '{{type}}' found in set API.",
            EVENTS: {
                ALREADY_EXISTS: "Event with name '{{eventName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Event with name '{{eventName}}' has not been registered yet. Please use 'add' API to register it."
            },
            OPERATORS: {
                ALREADY_EXISTS: "Operator with name '{{operatorName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Operator with name '{{operatorName}}' has not been registered yet. Please use 'add' API to register it."
            },
            FORMULAS: {
                ALREADY_EXISTS: "Formula with name '{{formulaName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Formula with name '{{formulaName}}' has not been registered yet. Please use 'add' API to register it."
            },
            STORAGES: {
                ALREADY_EXISTS: "Storage with name '{{storageName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Storage with name '{{storageName}}' has not been registered yet. Please use 'add' API to register it."
            },
            TAGS: {
                ALREADY_EXISTS: "Tag with name '{{tagName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Tag with name '{{tagName}}' has not been registered yet. Please use 'add' API to register it."
            },
            EVENT_PROP: {
                ALREADY_EXISTS: "Event property with name '{{propName}}' already exists for event '{{eventName}}'. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Event property with name '{{propName}}' has not been registered yet for event '{{eventName}}'. Please use 'add' API to register it."
            }
        },
        Os = {
            EVENTS: {
                NO_EVENT_TO_REMOVE: "Unable to remove Event '{{eventName}}' as it's not been registered."
            },
            OPERATORS: {
                NO_OPERATOR_TO_REMOVE: "Unable to remove Operator '{{operatorName}}' as it's not been registered."
            },
            FORMULAS: {
                NO_FORMULA_TO_REMOVE: "Unable to remove Formula '{{formulaName}}' as it's not been registered."
            },
            STORAGES: {
                NO_STORAGE_TO_REMOVE: "Unable to remove Storage '{{storageName}}' as it's not been registered."
            },
            TAGS: {
                NO_TAG_TO_REMOVE: "Unable to remove Tag '{{tagName}}' as it's not been registered."
            },
            EVENT_PROP: {
                NO_EVENT_PROP_TO_REMOVE: "Unable to remove Event property '{{propName}}' for event '{{eventName}}' as it's not been registered."
            }
        };
    class Ts {
        evaluate(e = [], t) {
            const n = {};
            return e.forEach((e => {
                const i = this.evaluateFormulaExpression(e, t);
                n[e.id] = i
            })), n
        }
        evaluateFilter(e, t) {
            return e.reduce(((e, t) => this.evaluateFormulaExpression(t, e)), t)
        }
        evaluateArgs(e, t) {
            return e.map((e => this.evaluateFormulaExpression(e, t)))
        }
        evaluateFormulaExpression(e, t) {
            var n;
            return (e.fn || (null === (n = Wr.plugins[Mr.FORMULA]) || void 0 === n ? void 0 : n.get(e.type)))(p(e.filters) ? this.evaluateFilter(e.filters, t) : t, p(e.args) ? e.args.map((e => u(e) ? this.evaluateArgs([e], t)[0] : e)) : e.args)
        }
    }
    var ys = new Ts;
    class Cs {
        constructor() {
            this.serializeValidationQueue = {}
        }
        isValid(e, t, n, i, o = {}) {
            return N(this, void 0, void 0, (function*() {
                kr.debug(`Checking validity of trigger '${e}'`, {
                    trigger: t,
                    event: n,
                    eventName: i
                }), this.saveEventState(e, i, !0);
                const {
                    isValid: r,
                    shouldRemoveEventListener: s
                } = yield this.validateTrigger(t, n, {
                    eventName: i,
                    triggerName: e,
                    exitTriggersMet: o
                });
                return this.saveTriggerState(e, this.hasTriggerMetBefore(e) || r), {
                    isValid: r,
                    shouldRemoveEventListener: s
                }
            }))
        }
        validateTrigger(e, t, {
            eventName: n,
            triggerName: i,
            skipEventProps: o,
            exitTriggersMet: r,
            skipValidationIfTimer: s
        } = {}, a) {
            return N(this, void 0, void 0, (function*() {
                return i ? (this.serializeValidationQueue[i] = this.serializeValidationQueue[i] || Promise.resolve(), this.serializeValidationQueue[i] = this.serializeValidationQueue[i].then((() => this.validateTriggerHandler(e, t, {
                    eventName: n,
                    triggerName: i,
                    skipEventProps: o,
                    exitTriggersMet: r,
                    skipValidationIfTimer: s
                }, a))), this.serializeValidationQueue[i]) : this.validateTriggerHandler(e, t, {
                    eventName: n,
                    triggerName: i,
                    skipEventProps: o,
                    exitTriggersMet: r,
                    skipValidationIfTimer: s
                }, a)
            }))
        }
        validateTriggerHandler(e, n, {
            eventName: i,
            triggerName: o,
            skipEventProps: r,
            exitTriggersMet: s,
            skipValidationIfTimer: a
        } = {}, c) {
            var l;
            return N(this, void 0, void 0, (function*() {
                if (!e || !u(e)) return {
                    isValid: !0,
                    shouldRemoveEventListener: !1
                };
                if (a) {
                    const {
                        cnds: n
                    } = e, i = n.length;
                    for (let e = 0; e < i; ++e) {
                        const i = n[e];
                        if (u(i) && i.event === t.TIMER) return {
                            isValid: !0,
                            shouldRemoveEventListener: !1
                        }
                    }
                }
                const d = {};
                let g = !1;
                if (i) {
                    const {
                        cnds: t
                    } = e, s = t.length;
                    for (let e = 0; e < s; ++e) {
                        const s = t[e];
                        c && u(s) && Jr(s, c);
                        if (u(s) && s.event === i && (yield this.validateTriggerOperand(s, n, {
                                eventName: i,
                                triggerName: o,
                                skipEventProps: r
                            }))) {
                            g = !0;
                            break
                        }
                    }
                } else g = !0;
                const h = null === (l = e.cnds) || void 0 === l ? void 0 : l.map((e => N(this, void 0, void 0, (function*() {
                        if (v(e)) return e;
                        if (!e) return null;
                        let t = !0,
                            s = !1;
                        if (o) {
                            if (!1 !== e.persistState && this.hasConditionMetBefore(o, e.id)) return kr.debug("Trigger condition already met before. Skipping it's validation.", {
                                triggerName: o,
                                conditionId: e.id
                            }), !0;
                            t = this.hasEventOccurred(o, e.event), e.hist && e.event !== i && (s = !0), t || kr.debug("Event hasn't occurred before. Skipping it's validation.", {
                                triggerName: o,
                                event: e.event
                            })
                        }
                        const a = (t || s) && (yield this.validateTriggerOperand(e, e.event === i ? n : {
                            fromLocalStorage: !0
                        }, {
                            eventName: e.event,
                            skipEventProps: r,
                            triggerName: o
                        }));
                        return o && this.saveConditionState(o, e.id, a), a && !1 !== e.persistState && (d[e.id] = !0), a
                    })))),
                    p = yield Promise.all(h);
                kr.debug("Generated tree conditions for trigger", {
                    triggerName: o,
                    treeConditions: p
                });
                const w = !e.formula || e.formula.every((e => {
                        var t, n;
                        return null === (n = null === (t = Wr.plugins[Mr.FORMULA]) || void 0 === t ? void 0 : t.get(e.type)) || void 0 === n ? void 0 : n({
                            id: o,
                            currentSatisfiedConditions: d
                        }, e.args)
                    })),
                    f = this.shouldRemoveEventListener(i, e.cnds, p, s);
                return {
                    isValid: g && w && ws.evaluateExpression(p),
                    shouldRemoveEventListener: f
                }
            }))
        }
        validateTriggerOperand({
            filters: e,
            formula: t,
            id: n,
            hist: i
        }, o, {
            eventName: r,
            triggerName: s,
            skipEventProps: a = !1
        } = {}) {
            var c;
            return N(this, void 0, void 0, (function*() {
                const l = ys.evaluate(t, [o]);
                if (i && Object.keys(i).length && r && o) {
                    const e = window.VWO.modules.eventHistHandler.getEventsByDate(r, i.dr, o);
                    let t;
                    if (null === (c = i.pf) || void 0 === c ? void 0 : c.length) {
                        const n = this.evaluateDSL.bind(this),
                            o = null == e ? void 0 : e.map((e => N(this, void 0, void 0, (function*() {
                                return n(i.pf, {
                                    triggerName: s,
                                    eventName: r,
                                    event: e,
                                    formulaValues: l
                                })
                            }))));
                        t = o && (yield Promise.all(o)), t = e.filter(((e, n) => t[n]))
                    } else t = e;
                    Object.keys(i.data).length && (o._meta = window.VWO.modules.eventHistHandler.getCumulativeData(t, i.data))
                }
                const u = null == e ? void 0 : e.map(((e, t) => N(this, void 0, void 0, (function*() {
                        var i, c, u, d, g;
                        if (v(e)) return e;
                        const h = null === (d = null === (u = null === (c = null === (i = o) || void 0 === i ? void 0 : i.preComputedConds) || void 0 === c ? void 0 : c[s]) || void 0 === u ? void 0 : u[n]) || void 0 === d ? void 0 : d[t];
                        if ("boolean" == typeof h) return h;
                        const [p, w, ...f] = e;
                        if (a && p.startsWith(`${fs.EVENT}.`)) return !0;
                        const _ = yield ms.getValue({
                            event: o,
                            variableName: p,
                            formulaValues: l
                        }), E = null === (g = Wr.plugins[Mr.OPERATOR]) || void 0 === g ? void 0 : g.get(w);
                        return (yield null == E ? void 0 : E(_, ...f, {
                            eventName: r,
                            triggerName: s,
                            jsLibUtils: $r.get("jsLibUtils")
                        })) || !1
                    })))),
                    d = u && (yield Promise.all(u));
                return !d || this.evaluateFilterExpression(d)
            }))
        }
        evaluateFilterExpression(e) {
            if (!w(e[0])) return ws.evaluateExpression(e);
            for (let t = e.length - 1; t >= 0; --t)
                if (!e[t]) return !1;
            return !0
        }
        hasEventOccurred(e, t) {
            return Boolean(rs.getValue(`${Qr.TRIGGERS}.${this.generateTriggerEventId(e,t)}.state`))
        }
        hasConditionMetBefore(e, t) {
            return Boolean(rs.getValue(`${Qr.TRIGGERS}.${this.generateTriggerConditionId(e,t)}.state`))
        }
        hasTriggerMetBefore(e) {
            return Boolean(rs.getValue(`${Qr.TRIGGERS}.${e}.state`))
        }
        saveTriggerState(e, t) {
            us.updateTriggerState(e, t)
        }
        saveEventState(e, t, n) {
            kr.debug("Saving trigger event's state i.e. it's event occurred or not.", {
                triggerName: e,
                eventName: t,
                state: n
            }), us.updateTriggerState(this.generateTriggerEventId(e, t), n)
        }
        saveConditionState(e, t, n) {
            kr.debug("Saving trigger condition's state i.e. it's condition satisfied or not.", {
                triggerName: e,
                conditionId: t,
                state: n
            }), us.updateTriggerState(this.generateTriggerConditionId(e, t), n)
        }
        generateTriggerConditionId(e, t) {
            return `${e}.trigger.${t}`
        }
        generateTriggerEventId(e, t) {
            return `${e}.event.${t}`
        }
        shouldRemoveEventListener(e, n, i, o) {
            return e === t.TIMER && n.every(((e, n) => !(u(e) && e.event === t.TIMER && !o[e.exitTrigger] && !i[n])))
        }
        evaluateDSL(e, {
            triggerName: t,
            eventName: n,
            event: i,
            formulaValues: o
        }) {
            return N(this, void 0, void 0, (function*() {
                if (d(e) && e.length > 1) {
                    const r = e.map((e => N(this, void 0, void 0, (function*() {
                            var r;
                            let s;
                            if (e || (s = !1), v(e) && (s = e), d(e))
                                if ([Br.AND, Br.OR].includes(e[0])) s = this.evaluateDSL(e, {
                                    triggerName: t,
                                    eventName: n,
                                    event: i,
                                    formulaValues: o
                                });
                                else {
                                    const [a, c, ...l] = e, u = null === (r = Wr.plugins[Mr.OPERATOR]) || void 0 === r ? void 0 : r.get(c), d = yield ms.getValue({
                                        event: i,
                                        variableName: a,
                                        formulaValues: o
                                    });
                                    s = (yield null == u ? void 0 : u(d, ...l, {
                                        eventName: n,
                                        triggerName: t,
                                        jsLibUtils: $r.get("jsLibUtils")
                                    })) || !1
                                }
                            return s
                        })))),
                        s = r && (yield Promise.all(r));
                    return this.evaluateTree(s)
                }
                return !1
            }))
        }
        evaluateTree(e) {
            let t = !1;
            switch (e[0]) {
                case Br.AND:
                    t = !e.includes(!1);
                    break;
                case Br.OR:
                    t = e.includes(!0)
            }
            return t
        }
    }
    var Is = new Cs;
    class Ns {
        constructor() {
            this.triggerEventListeners = {}
        }
        initialize(e) {
            Object.keys(e).forEach((t => {
                this.triggerEventListeners[t] ? us.updateTriggerExecutionCount(t, 0) : this.add(t, e[t])
            }))
        }
        add(e, t, n) {
            var i;
            kr.debug(`Attaching event listeners for all the events using in '${e}' trigger conditions.`);
            const o = {};
            this.triggerEventListeners[e] = this.triggerEventListeners[e] || {}, null === (i = null == t ? void 0 : t.cnds) || void 0 === i || i.forEach((i => {
                var r;
                if (u(i)) {
                    if (n && Jr(i, n), !this.triggerEventListeners[e][i.event]) {
                        null === (r = Wr.plugins[Mr.EVENT]) || void 0 === r || r.updateConditions(i.event, [this.extractDomEventFromCondition(e, i)]), i.persistState && this.executeTriggerValidatorOfHistoryEvents(e, t, i.event), i.hist && (window.VWO.modules.eventHistHandler.triggerEvents.push({
                            triggerName: e,
                            trigger: t,
                            eventName: i.event
                        }), this.validateEventFromHistHandler(e, t, i.event));
                        const n = hs.on(i.event, ((i, o) => N(this, void 0, void 0, (function*() {
                            yield this.validateAndDispatchTriggerEvent(e, t, i, o, n)
                        }))));
                        this.triggerEventListeners[e][i.event] = n
                    }
                    if (i.exitTrigger) {
                        const n = this.getTriggerEventName(i.exitTrigger),
                            r = hs.on(n, (s => {
                                o[i.exitTrigger] = 1;
                                const a = this.triggerEventListeners[e][i.event];
                                this.validateAndDispatchTriggerEvent(e, t, s, i.event, a, o), hs.off(n, r)
                            }));
                        this.triggerEventListeners[e][n] = r
                    }
                }
            }))
        }
        validateTriggerFromHistory(e, t) {
            var n;
            return N(this, void 0, void 0, (function*() {
                const i = null === (n = null == t ? void 0 : t.cnds) || void 0 === n ? void 0 : n.map((n => N(this, void 0, void 0, (function*() {
                        var i;
                        if (null === (i = n) || void 0 === i ? void 0 : i.event) {
                            const i = rs.getHistoryEvents(n.event);
                            let o = !1;
                            const r = i.map((i => N(this, void 0, void 0, (function*() {
                                const {
                                    isValid: r
                                } = yield Is.isValid(e, t, i, n.event);
                                r && (o = r)
                            }))));
                            return yield Promise.all(r), o
                        }
                        return n
                    })))),
                    o = yield Promise.all(i);
                return ws.evaluateExpression(o)
            }))
        }
        executeTriggerValidatorOfHistoryEvents(e, t, n) {
            rs.getHistoryEvents(n).forEach((i => this.validateAndDispatchTriggerEvent(e, t, i, n)))
        }
        validateEventFromHistHandler(e, t, n) {
            return N(this, void 0, void 0, (function*() {
                window.VWO.modules.eventHistHandler.eventHist[n] && (yield Is.isValid(e, t, {
                    isCustomEvent: !0,
                    fromLocalStorage: !0
                }, n))
            }))
        }
        validateAndDispatchTriggerEvent(e, t, n, i, o, r) {
            return N(this, void 0, void 0, (function*() {
                let s = this.getExecutionCount(e) || 0;
                if (t.occurrence && t.occurrence <= s) return;
                const {
                    isValid: a,
                    shouldRemoveEventListener: c
                } = yield Is.isValid(e, t, n, i, r);
                if (c && hs.off(i, o), a) {
                    if (s = this.getExecutionCount(e) || 0, t.occurrence && t.occurrence <= s) return;
                    us.updateTriggerExecutionCount(e, s + 1), yield hs.trigger(this.getTriggerEventName(e), n)
                }
            }))
        }
        remove(e) {
            kr.debug(`Removing event listeners of trigger '${e}'`), Object.entries(this.triggerEventListeners[e]).forEach((([e, t]) => {
                hs.off(e, t)
            })), delete this.triggerEventListeners[e]
        }
        removeAll() {
            Object.keys(this.triggerEventListeners).forEach((e => {
                this.remove(e)
            }))
        }
        extractDomEvents(e) {
            kr.debug("Extracting DOM events from triggers config");
            const t = {};
            return Object.keys(e).forEach((n => {
                var i, o;
                null === (o = null === (i = e[n]) || void 0 === i ? void 0 : i.cnds) || void 0 === o || o.forEach((e => {
                    if (u(e)) {
                        this.extractDomEventFromCondition(n, e) && (t[e.event] = t[e.event] || [], t[e.event].push(Object.assign(Object.assign({}, e), {
                            triggerName: n
                        })))
                    }
                }))
            })), t
        }
        extractDomEventFromCondition(t, n) {
            return n.event.toLowerCase().includes(`${e.DOM}_`) ? Object.assign(Object.assign({}, n), {
                triggerName: t
            }) : null
        }
        getTriggerEventName(e) {
            return `${t.TRIGGER}.${e}`
        }
        getExecutionCount(e) {
            const t = rs.getValue(`${Qr.TRIGGERS}.${e}.executionCount`);
            return null != t ? t : 0
        }
    }
    var As = new Ns,
        bs, Rs;
    ! function(e) {
        e.EQUAL = "eq", e.NOT_EQUAL = "neq", e.EQUAL_CASE_SENSITIVE = "eqs", e.NOT_EQUAL_CASE_SENSITIVE = "neqs", e.REGEX = "reg", e.REGEX_CASE_SENSITIVE = "regs", e.CONTAINS = "cn", e.NOT_CONTAINS = "ncn", e.BLANK = "bl", e.NOT_BLANK = "nbl", e.GREATER_THAN = "gt", e.LESS_THAN = "lt", e.GREATER_THAN_EQUAL = "gte", e.LESS_THAN_EQUAL = "lte", e.IN = "in", e.NOT_IN = "nin", e.EXEC = "exec", e.IN_LOCATION = "inloc", e.NOT_IN_LOCATION = "ninloc", e.URL_REGEX = "urlReg", e.NOT_URL_REGEX = "nUrlReg", e.RANGE_COMPARISON = "rg", e.PAGE_CONFIG_EVALUATION = "pgc"
    }(bs || (bs = {})),
    function(e) {
        e.PAGE = "PAGE", e.EVENT = "EVENT", e.JS_VARIABLE = "JS_VARIABLE"
    }(Rs || (Rs = {}));
    const Ls = {
        [bs.EQUAL]: (e, t) => String(e).toLowerCase() === String(t).toLowerCase(),
        [bs.NOT_EQUAL]: (e, t) => !Ls[bs.EQUAL](e, t),
        [bs.EQUAL_CASE_SENSITIVE]: (e, t) => String(e) === String(t),
        [bs.NOT_EQUAL_CASE_SENSITIVE]: (e, t) => !Ls[bs.EQUAL_CASE_SENSITIVE](e, t),
        [bs.REGEX](e, t) {
            try {
                return new RegExp(t, "i").test(String(e))
            } catch (e) {
                return !1
            }
        },
        [bs.URL_REGEX](e, t, n) {
            const i = null == n ? void 0 : n.jsLibUtils;
            return i ? i.verifyUrl(e, t, null, null == n ? void 0 : n.pageUrl) : Ls[bs.REGEX](e, t)
        },
        [bs.NOT_URL_REGEX]: (e, t, n) => !Ls[bs.URL_REGEX](e, t, n),
        [bs.REGEX_CASE_SENSITIVE](e, t) {
            try {
                return new RegExp(t).test(String(e))
            } catch (e) {
                return !1
            }
        },
        [bs.CONTAINS]: (e, t) => String(e).toLowerCase().includes(String(t).toLowerCase()),
        [bs.NOT_CONTAINS]: (e, t) => !Ls[bs.CONTAINS](e, t),
        [bs.BLANK]: e => !e,
        [bs.NOT_BLANK]: e => !Ls[bs.BLANK](e),
        [bs.GREATER_THAN]: (e, t) => e > t,
        [bs.GREATER_THAN_EQUAL]: (e, t) => e >= t,
        [bs.LESS_THAN]: (e, t) => e < t,
        [bs.LESS_THAN_EQUAL]: (e, t) => e <= t,
        [bs.EXEC](e, {
            triggerName: t = ""
        } = {}) {
            if (!e) return !1;
            for (let n = 0; n < e.length; n++) {
                const i = e[n];
                if (!i) break;
                window.VWO._.pageNo = window.VWO._.pageNo || 0;
                const {
                    pageNo: o
                } = window.VWO._, r = () => {
                    o === window.VWO._.pageNo && hs.trigger(As.getTriggerEventName(t))
                };
                try {
                    i(r, window.vwo_$)
                } catch (e) {
                    kr.warn(`Issue with custom trigger ${null==i?void 0:i.toString()}`)
                }
            }
            return !1
        },
        [bs.NOT_IN_LOCATION](e, t) {
            let n = !1;
            if (!t || 0 === t.length) return !1;
            for (let i = 0; i < t.length; i++) {
                const o = t[i];
                if (o === e.countryCode || o === `${e.countryCode}-${e.region}` || o === `${e.countryCode}-${e.region}-${e.city}`) {
                    n = !1;
                    break
                }
                n = !0
            }
            return n
        },
        [bs.IN_LOCATION](e, t) {
            let n = !1;
            if (!t || 0 === t.length) return !1;
            for (let i = 0; i < t.length; i++) {
                const o = t[i];
                if (o === e.countryCode || o === `${e.countryCode}-${e.region}` || o === `${e.countryCode}-${e.region}-${e.city}`) {
                    n = !0;
                    break
                }
            }
            return n
        },
        [bs.IN]: (e, t) => t.map((e => String(e).toLowerCase())).includes(String(e).toLowerCase()),
        [bs.NOT_IN]: (e, t) => !Ls[bs.IN](e, t),
        [bs.RANGE_COMPARISON](e, t) {
            try {
                const n = JSON.parse(e),
                    i = t.split("'")[1].split("-"),
                    o = i[0],
                    r = i[1];
                return Ls[bs.GREATER_THAN_EQUAL](n[0], parseInt(o, 10)) && Ls[bs.LESS_THAN_EQUAL](n[0], parseInt(r, 10))
            } catch (e) {
                return kr.info(`RANGE OPERATOR ERROR: ${e&&e.stack}`), !1
            }
        },
        [bs.PAGE_CONFIG_EVALUATION]: (e, t) => Yr.validatePage(t, !1, e).didMatch
    };
    class Vs extends _s {
        constructor() {
            super(), this.pluginName = Mr.OPERATOR, this.operators = {}, this.initialize()
        }
        add(e, t) {
            kr.debug(`Adding operator '${e}' in OperatorsManager`), this.operators[e] ? kr.error(Ss.OPERATORS.ALREADY_EXISTS, {
                operatorName: e
            }) : this.operators[e] = t
        }
        update(e, t) {
            kr.debug(`Updating operator '${e}' in OperatorsManager`), this.operators[e] = t
        }
        get(e) {
            return kr.debug(`Getting operator '${e}' in OperatorsManager`), "sel" === e ? null : this.operators[e] ? this.operators[e] : (kr.error(Ss.OPERATORS.NOT_REGISTERED, {
                operatorName: e
            }), null)
        }
        remove(e) {
            kr.debug(`Removing operator '${e}' in OperatorsManager`), this.operators[e] ? delete this.operators[e] : kr.warn(Os.OPERATORS.NO_OPERATOR_TO_REMOVE, {
                operatorName: e
            })
        }
        removeAll() {
            kr.debug("Removing all operators in OperatorsManager"), this.operators = {}
        }
        initialize() {
            Object.keys(Ls).forEach((e => {
                this.add(e, Ls[e])
            }))
        }
    }
    class xs {
        constructor() {
            this.listenerAdded = !1, this.queue = new Set
        }
        addListener(e) {
            this.queue.add(e), this.listenerAdded || (window.addEventListener("storage", (e => {
                this.queue.has(e.key) && this.otherSide("processQueue", [e.key, e.newValue])
            })), this.listenerAdded = !0)
        }
        otherSide(...e) {
            e[0] = "VWO.modules.utils.storageSyncer." + e[0], window.fetcher.getValue(...e)
        }
    }
    const Us = new xs;
    window.VWO.modules.utils.storageSyncer = Us;
    const Ds = function(e) {
            var t;
            return N(this, void 0, void 0, (function*() {
                L("jI"), e._.allSettings.dataStore.vwoData = e._.allSettings.dataStore.vwoData || {};
                const n = e._.allSettings.tags;
                Object.keys(n).forEach((e => {
                    n[e].fn = De(n[e].fn)
                }));
                const i = [];
                i.push(null), i.push(ko.getPhoenixConfig()), window.fetcher.setValue("fakeWindow.VWO", e), window.fetcher.setValue("fakeWindow.VWOSettings", i);
                const o = Wo(),
                    r = new Sr;
                window._vwo_exp = r.register(hr.Object, "_vwo_exp", window._vwo_exp, "", !1), window.VWO._.allSettings.dataStore.campaigns = window._vwo_exp, r.register(hr.Document, "cookie"), r.register("custom", "localStorage");
                const [s, a] = yield o;
                Le.domain = a.cookieDomain, a.accountId >= 374300 && (e.data.tB = !0), e.addPhoenix(s), tr(a, e), ir(null === (t = e._.ac) || void 0 === t ? void 0 : t.eNC),
                    function() {
                        var e, t, n = null === (t = null === (e = a.settings.vwoData) || void 0 === e ? void 0 : e.accountJSInfo) || void 0 === t ? void 0 : t.tpc;
                        for (var i in n) n.hasOwnProperty(i) && i === an.GLOBAL_OPT_OUT && (!!parseInt(n[i], 10) ? Le._create(an.GLOBAL_OPT_OUT, 1, 100) : Le.erase(an.GLOBAL_OPT_OUT))
                    }(), Gt.init("jslib", e, null), Gt.init("optOut", e, null), window._vwo_surveySettings = r.register(hr.Object, "_vwo_surveySettings", window._vwo_surveySettings), window.VWO._.track = r.register(hr.Object, "tracklib", window.VWO._.track, "", !1), $r.set("jsLibUtils", {
                        verifyUrl: function() {
                            return Jn.verifyUrl.apply(Jn, arguments)
                        },
                        getCleanedUrl: function() {
                            return Jn.getCleanedUrl.apply(Jn, arguments)
                        }
                    });
                const c = new Vs;
                Wr.register(c), e.pageGroup = Yr;
                const {
                    pages: l,
                    pagesEval: u
                } = e._.allSettings;
                e.pageGroup.add(l, u), xe.init(), window.fetcher.getValue("VWO.modules.vwoUtils.referrer.init"), Go.finish()
            }))
        },
        ks = {},
        Ps = function(e, t, n) {
            if (!ks[e]) {
                ks[e] = 1;
                var i = document.createElement("script");
                i.src = e, i.type = "text/javascript", t = t || function() {}, n = n || function() {}, i.onerror = function() {
                    t()
                }, i.onload = n, document.getElementsByTagName("head")[0].appendChild(i), i.parentNode ? i.parentNode.removeChild(i) : window.setTimeout((function() {
                    i.parentNode && i.parentNode.removeChild(i)
                }), 100)
            }
        };
    window.VWO.modules.utils.loadScript = Ps;
    const Ws = function(e, t) {
        window._vwo_exp = e._.allSettings.dataStore.campaigns, e._.coreLib = {
            lS: Ps
        };
        const n = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/";

        function i(t) {
            e._.allSettings.triggers.customPreviewTrigger = {
                cnds: ["a", {
                    event: Ft.PAGE_VIEW,
                    id: +new Date
                }, {
                    event: Ft.VISIBILITY_TRIGGERED,
                    id: +new Date
                }]
            }, e._.allSettings.rules.push({
                triggers: ["customPreviewTrigger"],
                tags: [{
                    priority: 4,
                    data: `campaigns.${t}`,
                    id: "runCampaign"
                }]
            });
            const n = e._.allSettings.dataStore.campaigns[t].triggers[0];
            delete e._.allSettings.triggers[n], e._.allSettings.dataStore.campaigns[t].triggers[0] = "customPreviewTrigger"
        }
        ko.setFunnelExps();
        const o = e._.allSettings.dataStore.previewExtraSettings;
        if (!o || "object" != typeof o) {
            if (We())
                for (const t in e._.allSettings.dataStore.campaigns) i(t);
            return t(e), !1
        }
        const r = fe(o);
        if (!r.length) return t(e), !1;
        const s = r[0],
            a = o[s].debug.s,
            l = o[s].debug.tg;
        for (var u in window._vwo_exp) window._vis_debug = !0, o[u] ? (_vwo_exp[u].previewHash = o[u].previewHash, _vwo_exp[u].debug = o[u].debug, o[u].debug.url && (_vwo_exp[u].url = decodeURIComponent(o[u].debug.url))) : delete _vwo_exp[u];
        let d;
        Qo(window._vwo_exp, o), Object.keys(e._.allSettings.dataStore.campaigns).length || c.error("Preview mode opened but no campaigns served");
        const g = window.name;
        var h;
        if (!a && g.indexOf("_vis_heatmap_") < 0 && i(s), h = s, e._.allSettings.triggers.customSegmentTestTrigger = {
                cnds: [{
                    event: "checkSegmentation",
                    id: +new Date
                }]
            }, e._.allSettings.rules.push({
                triggers: ["customSegmentTestTrigger"],
                tags: [{
                    data: `campaigns.${h}`,
                    id: "segmentEligibilityTest"
                }],
                occurance: 1
            }), !l && g.indexOf("_vis_heatmap") < 0) {
            const t = o[s].debug.v;
            e._.allSettings.dataStore.campaigns[s].sections[1].triggers[t] && (e._.allSettings.dataStore.campaigns[s].sections[1].triggers[t] = "customPreviewTrigger")
        }
        if (window._vwo_surveySettings) {
            const e = fe(window._vwo_surveySettings);
            e.length && (window._vwo_surveySettings[e[0]].t = "customPreviewTrigger")
        }
        return g.indexOf("_vis_heatmap_") >= 0 ? (d = `${n}7.0/heatmap.helper.js`, window._vis_opt_heatmap = 1) : (d = `${n}7.0/debugger.js`, "SURVEY" === e._.allSettings.dataStore.campaigns[s].type && (d = `${n}va_survey_debug.js`)), Ps(d, null, (function() {
            t(e)
        })), !0
    };
    class Ms {
        constructor() {
            this.id = 0, this.store = {}
        }
        wrap(e, t) {
            const n = this.id++;
            return this.store = this.store || {}, this.store[n] = t ? e.bind(t) : e, n
        }
        unwrap(e) {
            return this.store[e]
        }
    }
    const Gs = {
        [bs.EQUAL]: (e, t) => String(e).toLowerCase() === String(t).toLowerCase(),
        [bs.NOT_EQUAL]: (e, t) => !Gs[bs.EQUAL](e, t),
        [bs.EQUAL_CASE_SENSITIVE]: (e, t) => String(e) === String(t),
        [bs.NOT_EQUAL_CASE_SENSITIVE]: (e, t) => !Gs[bs.EQUAL_CASE_SENSITIVE](e, t),
        [bs.REGEX](e, t) {
            try {
                return new RegExp(t, "i").test(String(e))
            } catch (e) {
                return !1
            }
        },
        [bs.URL_REGEX]: (e, t, n) => Jn.verifyUrl ? Jn.verifyUrl(e, t, null) : Gs[bs.REGEX](e, t),
        [bs.NOT_URL_REGEX]: (e, t, n) => !Gs[bs.URL_REGEX](e, t, n),
        [bs.REGEX_CASE_SENSITIVE](e, t) {
            try {
                return new RegExp(t).test(String(e))
            } catch (e) {
                return !1
            }
        },
        [bs.CONTAINS]: (e, t) => String(e).toLowerCase().includes(String(t).toLowerCase()),
        [bs.NOT_CONTAINS]: (e, t) => !Gs[bs.CONTAINS](e, t),
        [bs.BLANK]: e => !e,
        [bs.NOT_BLANK]: e => !Gs[bs.BLANK](e),
        [bs.GREATER_THAN]: (e, t) => e > t,
        [bs.GREATER_THAN_EQUAL]: (e, t) => e >= t,
        [bs.LESS_THAN]: (e, t) => e < t,
        [bs.LESS_THAN_EQUAL]: (e, t) => e <= t,
        [bs.NOT_IN_LOCATION](e, t) {
            let n = !1;
            if (!t || 0 === t.length) return !1;
            for (let i = 0; i < t.length; i++) {
                const o = t[i];
                if (o === e.countryCode || o === `${e.countryCode}-${e.region}` || o === `${e.countryCode}-${e.region}-${e.city}`) {
                    n = !1;
                    break
                }
                n = !0
            }
            return n
        },
        [bs.IN_LOCATION](e, t) {
            let n = !1;
            if (!t || 0 === t.length) return !1;
            for (let i = 0; i < t.length; i++) {
                const o = t[i];
                if (o === e.countryCode || o === `${e.countryCode}-${e.region}` || o === `${e.countryCode}-${e.region}-${e.city}`) {
                    n = !0;
                    break
                }
            }
            return n
        },
        sel: (e, t) => !!e.closest(t),
        [bs.IN]: (e, t) => t.map((e => String(e).toLowerCase())).includes(String(e).toLowerCase()),
        [bs.NOT_IN]: (e, t) => !Gs[bs.IN](e, t),
        [bs.RANGE_COMPARISON](e, t) {
            try {
                const n = JSON.parse(e),
                    i = t.split("'")[1].split("-"),
                    o = i[0],
                    r = i[1];
                return Gs[bs.GREATER_THAN_EQUAL](n[0], parseInt(o, 10)) && Gs[bs.LESS_THAN_EQUAL](n[0], parseInt(r, 10))
            } catch (e) {
                return !1
            }
        },
        [bs.PAGE_CONFIG_EVALUATION]: (e, t) => Yr.validatePage(t, !1, e).didMatch
    };

    function $s(e, t, n) {
        const i = {};
        return n.forEach((n => {
            const [o, r, ...s] = n.condition, [a, c] = o.split("."), l = "event" === a ? t[c] : Ue.page[c], u = Gs[r], d = null == u ? void 0 : u(l, ...s, {
                eventName: e,
                triggerName: n.triggerId
            });
            i[n.triggerName] = i[n.triggerName] || {}, i[n.triggerName][n.condId] = i[n.triggerName][n.condId] || {}, i[n.triggerName][n.condId][n.filterId] = d
        })), i
    }
    class Fs {
        constructor(e, t, n, i) {
            this.eventName = e, this.domEventName = t, this.domEventsDebounceTime = n, this.attachedFilters = i
        }
        on(e) {
            this.domEventName !== r.CLICK && this.domEventName !== r.SUBMIT && (this.domEventName === r.DOM_CONTENT_LOADED ? "interactive" === document.readyState || "complete" === document.readyState ? setTimeout((() => {
                e()
            }), 0) : window.document.addEventListener(this.domEventName, this.callback = pn((t => {
                t.preComputedConds = $s(this.eventName, t, this.attachedFilters), e(t)
            }), this.domEventsDebounceTime), !0) : this.domEventName === r.SCROLL ? window.document.addEventListener(this.domEventName, this.callback = pn((t => {
                const {
                    scrollY: n,
                    innerHeight: i
                } = window, o = vwo_$(document).height(), r = 100 * n / (o - i);
                Object.assign(t, {
                    pxTop: n,
                    pxBottom: o - i - n,
                    top: r,
                    bottom: 100 - r
                }), t.preComputedConds = $s(this.eventName, t, this.attachedFilters), e(t)
            }), this.domEventsDebounceTime), !0) : window.document.addEventListener(this.domEventName, this.callback = pn((t => {
                t.preComputedConds = $s(this.eventName, t, this.attachedFilters), e(t)
            }), this.domEventsDebounceTime), !0))
        }
        off() {
            window.document.removeEventListener(this.domEventName, this.callback, !0)
        }
        eventConditionsUpdate(e) {
            this.attachedFilters = e
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent = ve.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent", Fs);
    class js {}
    class Hs extends js {
        constructor() {
            super(), this.eventName = n.LEAVE_INTENT, this.threshold = 2, this.delay = 1e3
        }
        on(e) {
            window.document.addEventListener("mouseleave", this.onMouseLeave(e), !0), window.document.addEventListener("mouseenter", this.onMouseEnter, !0)
        }
        off() {
            window.document.removeEventListener("mouseleave", this.mouseLeaveCallback, !0), window.document.removeEventListener("mouseenter", this.onMouseEnter, !0)
        }
        onMouseLeave(e) {
            return this.mouseLeaveCallback = t => {
                Math.abs(t.offsetY || t.clientY) > this.threshold && this.isMouseMoveUpward(t) && (this.timeout = window.setTimeout((() => e(t)), this.delay))
            }, this.mouseLeaveCallback
        }
        onMouseEnter() {
            clearTimeout(this.timeout)
        }
        isMouseMoveUpward(e) {
            let t = !0;
            return /\b(MSIE|Trident.*?rv:|Edge\/)(\d+)/.test(navigator.userAgent) || (t = e.clientY < 0), t && e.screenY - window.innerHeight < 0 && (e.offsetX || e.clientX) - 3 > 0 && e.clientX + 3 - window.innerWidth < 0
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent = ve.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent", Hs);
    class Bs extends js {
        constructor(e) {
            super(), this.eventName = n.URL_CHANGE, this.originalCallbacks = {}, this.events = e || ["pushState", "replaceState", "hashchange", "popstate"]
        }
        on(e) {
            let t = document.URL;
            this.events.forEach((n => {
                "popstate" === n ? window.addEventListener(n, (function(n) {
                    e({
                        values: [],
                        oldUrl: t,
                        _event: n
                    }), t = window.location.href
                }), !1) : (this.originalCallbacks[n] = window.history[n], window.history[n] = (...i) => {
                    const o = window.location.href;
                    this.originalCallbacks[n].apply(window.history, i), e({
                        values: i,
                        oldUrl: o
                    }), t = window.location.href
                })
            }))
        }
        off() {
            Object.keys(this.originalCallbacks).forEach((e => {
                window.history[e] = this.originalCallbacks[e]
            }))
        }
    }

    function Ks(e, t) {
        if (e) {
            var n, i = "." + e,
                o = window.vwo_$;
            if ((t = t || {})[e]) return !1;
            try {
                n = o(i)
            } catch (e) {
                n = ""
            }
            return 1 === n.length || (t[e] = !0, !1)
        }
    }

    function Ys(e) {
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

    function qs(e, t) {
        var n = t[e](),
            i = t.get(0);
        if (!n) {
            if (window.getComputedStyle && void 0 !== (n = getComputedStyle(i)[e]) && (n = parseInt(n, 10), !isNaN(n) && n)) return n;
            n = i["client" + e.toUpperCase()[0] + e.substring(1, e.length)]
        }
        return n
    }

    function Js(e) {
        if (e.previousElementSibling) return e.previousElementSibling;
        for (; e = e.previousSibling;)
            if (1 === e.nodeType) return e
    }

    function Xs(e, t) {
        if (!e) return null;
        if (e === document) return "#document";
        t = t || {};
        var n, i, o, r, s, a = e,
            c = [],
            l = e.tagName,
            u = window.vwo_$;
        if ("string" == typeof l && ("body" === l.toLowerCase() || "head" === l.toLowerCase())) return l;
        for (; e;) {
            n = (l = e.tagName) && l.match(/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/), l && n && (n && n[0]) === l || (l = "*");
            try {
                i = u(e).attr("id")
            } catch (a) {
                i = e.id
            }
            i && "string" == typeof i && Ys(i) && (l = l + "#" + i), o = (o = e.getAttribute && e.getAttribute("class")) ? o.split(/\s+/) : [];
            for (var d = 0; d < o.length; d++)
                if (s = "." + (r = o[d]), Ks(r, t)) {
                    l += s;
                    break
                }
            c.unshift(l), e = Js(e)
        }
        return -1 !== c[0].indexOf("#") || a.parentNode && "HEAD" === a.parentNode.nodeName || (c[0] += ":first-child"), Xs(a.parentNode, t) + " > " + c.join(" + ")
    }

    function zs(e) {
        return e instanceof SVGElement && e.tagName && "svg" !== e.tagName.toLowerCase() ? zs(e.parentNode) : e
    }

    function Qs(e) {
        return qs("width", e)
    }

    function Zs(e) {
        return qs("height", e)
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent = ve.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent", Bs);
    class ea {}
    class ta extends ea {
        shouldWeTriggerMetric({
            currentUrl: e
        }, t, n, i = {}) {
            const o = t.isFirst,
                {
                    excludeUrl: r,
                    pExcludeUrl: s,
                    urlRegex: a,
                    pUrl: c
                } = n;
            let l;
            l = !(r || s || a || c) || Ro.isGoalEligible(n, e);
            return !(!En.isSessionBasedCampaign2(t) && o && i.name === Ft.PAGE_VIEW && "CUSTOM_GOAL" === n.type) && l
        }
    }
    var na = new ta;
    class ia {
        constructor(e, t) {
            this.nameInStorage = e, this.goalsFilter = t
        }
        isGoalTriggerValid(e) {
            if (!e) return !0;
            let t = !1;
            const n = Object.keys(e);
            for (const i of n) {
                const n = e[i];
                let o = !0;
                const r = Object.keys(n);
                for (const e of r)
                    if (!n[e]) {
                        o = !1;
                        break
                    }
                if (o) {
                    t = !0;
                    break
                }
            }
            return t
        }
        fireEventForConversion(e, t) {
            let n, i = [];
            const o = window._vis_opt_url || window.location.href,
                r = bn(null, e, t);
            return window.VWO._.goalsToBeConvertedSynchronously || En.updateGoalsKind(window._vwo_exp), window.VWO._.track.loaded || (t.trackLibraryNotLoaded = !0), Object.keys(window.VWO._.goalsToBeConvertedSynchronously).forEach((e => {
                var n;
                const r = window.VWO._.goalsToBeConvertedSynchronously[e],
                    s = window._vwo_exp[e];
                if ((null === (n = null == s ? void 0 : s.ss) || void 0 === n ? void 0 : n.csa) && !s.isTriggerValidated) return;
                const a = En.isSessionBasedCampaign2(s);
                if ((!a || window.VWO._.track.loaded) && !zn.getCombi(s)) return;
                if (!En.shouldTrackUserForCampaign(s)) return;
                let c = {
                    campaigns: []
                };
                Object.entries(r).forEach((([e, n]) => {
                    var i;
                    const r = Object.assign({
                        kind: n
                    }, s.goals[e]);
                    if (this.goalsFilter.includes(r.kind)) {
                        const n = null === (i = s.mt) || void 0 === i ? void 0 : i[e];
                        if (!n || !this.isGoalTriggerValid(t.preComputedConds[n]) || !na.shouldWeTriggerMetric({
                                currentUrl: o
                            }, s, r)) return;
                        if (a && !window.VWO._.track.loaded) return void zn.getCombi(s);
                        zn.isGoalTriggered(s, e) || c.campaigns.push({
                            c: s.id,
                            g: e
                        })
                    }
                })), c.campaigns.length && i.push(c)
            })), i.length && (n = xo(t, i)), n && Rn(e, t, n), r
        }
    }
    class oa {
        constructor(e) {
            this.eventName = n.CLICK_EVENT, this.attachedFilters = e, this.goalConverter = new ia("vwoClickGoalData", ["CLICK_ELEMENT", "ENGAGEMENT", "ON_PAGE"])
        }
        isEligibleToSendCall(e) {
            return N(this, void 0, void 0, (function*() {
                const t = yield x.phoenix("store.getters.vwoInternalProperties.shouldExecuteLib");
                return !We() && !window._vis_debug && En.shouldTrackUserForCampaign(e) && t
            }))
        }
        onTouchEnd({
            e: e,
            partialGetters: t
        }) {
            var n = e.target;
            n && (n.vwoTe = 1, setTimeout((function() {
                n.vwoTe = 0
            }), 1e3), n.vwoTm || this._click({
                e: e,
                _pause: 0,
                partialGetters: t
            }), n.vwoTm = 0)
        }
        onTouchMove(e) {
            var t = e.target;
            t && (t.vwoTm = 1, setTimeout((function() {
                t.vwoTm = 0
            }), 1e3))
        }
        shouldTrackClick(e, t) {
            return "touchend" === e || void 0 === t || 1 === t
        }
        onMouseDown({
            e: e,
            partialGetters: t
        }) {
            var n = e.target;
            n.vwoTe ? n.vwoTe = 0 : this._click({
                e: e,
                _pause: void 0,
                partialGetters: t
            })
        }
        _click({
            _pause: e,
            e: t,
            partialGetters: n
        }) {
            return N(this, void 0, void 0, (function*() {
                var n, i, o, r, s, a, c, l, u, d, g, h, p, v, w, f, _, E = t.which;
                s = (r = vwo_$(t.target)).get(0);
                const m = x._.nativeConstants.get("Math");
                if (!this.shouldTrackClick(t.type, E) || void 0 === s.tagName) return;
                void 0 === e && (e = 500), w = !0;
                const S = Ze(window._vwo_exp);
                for (o = S.length, "a" === s.tagName.toLowerCase() ? (n = r.attr("href"), v = !0) : 0 < r.parents("a").length ? (n = r.parents("a").eq(0).attr("href"), v = !0) : ("button" === s.tagName.toLowerCase() || 0 < r.parents("button").length || "input" === s.tagName.toLowerCase() && ("button" === r.attr("type") || "image" === r.attr("type") || "submit" === r.attr("type"))) && (v = !0), t.props = t.props || {}, t.userEngagement = t.props.userEngagement = !!v, t.vwoEventName = Ft.DOM_CLICK, n && (t.props.targetUrl = t.targetUrl = n), t.preComputedConds = $s(this.eventName, t, this.attachedFilters), _ = {
                        props: t.props,
                        userEngagement: t.userEngagement,
                        vwoEventName: t.vwoEventName,
                        preComputedConds: t.preComputedConds
                    }, this.goalConverter.fireEventForConversion(this.eventName, _); o--;)
                    if (a = S[o], "RUNNING" === (i = window._vwo_exp[a]).status && i.clickmap && (i.ready || i.gp)) {
                        c = yield window.fetcher.getValue('VWO.modules.utils.campaignUtils.getCombi("${{1}}", "${{2}}")', null, {
                            captureGroups: [null, i]
                        }), i.clicks = i.clicks || 0;
                        var O = zs(s);
                        if (O !== s && (s = O, r = vwo_$(s)), p = p || Xs(s), c && "string" == typeof p && "html" !== p.toLowerCase() && !En.isBot2() && ++i.clicks <= (window._vwo_clicks || 3) && ("a" === s.tagName.toLowerCase() || r.parents("a").length, f = r.offset(), "touchend" === t.type ? (d = t.originalEvent && t.originalEvent.changedTouches[0]) && (l = d.pageX, u = d.pageY) : (l = t.pageX, u = t.pageY), (0 > (g = m.round(1e3 * (l - f.left) / Qs(r)) / 1e3) || 1 < g) && (g = .5), (0 > (h = m.round(1e3 * (u - f.top) / Zs(r)) / 1e3) || 1 < h) && (h = .5), yield this.isEligibleToSendCall(a))) {
                            var T = "h.gif?experiment_id=" + a + "&account_id=" + window._vwo_acc_id + "&combination=" + c + En.getUUIDString(yield window.fetcher.getValue('VWO.modules.utils.libUtils.getUUID("${{1}}", "${{2}}")', null, {
                                captureGroups: [null, a]
                            })) + "&url=" + encodeURIComponent(window.location.href) + "&path=" + encodeURIComponent(p) + "&x=" + g + "&y=" + h;
                            window.VWO._.isBeaconAvailable = !0, window.VWO._.isLinkRedirecting = undefined, On.sendCall({
                                serverUrl: this.serverUrl,
                                accountId: window._vwo_acc_id
                            }, {
                                url: T
                            }), window.VWO._.isLinkRedirecting = !1, w = w && window.VWO._.isBeaconAvailable, yield window.fetcher.getValue('phoenix.trigger("${{1}}")', null, {
                                captureGroups: [Ft.HEATMAP_CLICK, {
                                    oldArgs: [a, c, p, g, h]
                                }]
                            })
                        }
                    }
            }))
        }
        on(e, t) {
            const n = this,
                i = We(),
                o = vwo_$(document)[0];
            this.serverUrl = t.serverUrl, i || function() {
                if (o && o.vwoCEvent) return;
                const e = vwo_$(o);
                Vn.addJqEventListener(e, "bind", "mousedown", (e => {
                    n.onMouseDown({
                        e: e,
                        partialGetters: t
                    })
                })), Vn.addJqEventListener(e, "bind", "touchend", (e => {
                    n.onTouchEnd({
                        e: e,
                        partialGetters: t
                    })
                })), Vn.addJqEventListener(e, "bind", "touchmove", (e => {
                    n.onTouchMove({
                        e: e
                    })
                })), o && (o.vwoCEvent = 1)
            }()
        }
        off() {}
        eventConditionsUpdate(e) {
            this.attachedFilters = e
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent = ve.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent", oa);
    class ra {
        constructor(e) {
            this.eventName = Ft.DOM_SUBMIT, this.attachedFilters = e, this.goalConverter = new ia("vwoSubmitGoalData", ["FORM_SUBMIT"])
        }
        eventConditionsUpdate(e) {
            this.attachedFilters = e
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
        onFormSubmit({
            e: e,
            partialGetters: t
        }) {
            var n, i = vwo_$(e.target),
                o = i.get(0);
            "string" == typeof o.tagName && "form" !== o.tagName.toLowerCase() && i.parents("form").length > 0 && (o = i.parents("form").get(0)), "string" == typeof o.tagName && "form" !== o.tagName.toLowerCase() || "vwo_form" === vwo_$(o).attr("id") || (e.props = e.props || {}, e.props.targetUrl = e.targetUrl = vwo_$(o).attr("action"), e.userEngagement = e.props.userEngagement = !0, e.isBeaconAvailable = !0, e.isLinkRedirecting = !0, e.vwoEventName = this.eventName, e.preComputedConds = $s(this.eventName, e, this.attachedFilters), n = {
                props: e.props,
                targetUrl: e.targetUrl,
                userEngagement: e.userEngagement,
                isBeaconAvailable: e.isBeaconAvailable,
                isLinkRedirecting: e.isLinkRedirecting,
                vwoEventName: e.vwoEventName,
                preComputedConds: e.preComputedConds
            }, this.goalConverter.fireEventForConversion(this.eventName, n))
        }
        on(e, t) {
            const n = this,
                i = We(),
                o = vwo_$(document)[0];
            o && (o.vwoFEvent = 1),
                function() {
                    var e = vwo_$(document)[0];
                    i || (Vn.addJqEventListener(vwo_$(e), "bind", "submit", (e => {
                        n.onFormSubmit({
                            e: e,
                            partialGetters: t
                        })
                    })), e && (e.vwoFEvent = 1))
                }()
        }
        off() {}
    }

    function sa(e) {
        var t, n, i, o;
        if (null === (t = window.VWO) || void 0 === t ? void 0 : t.phoenix) return;
        window.VWO.nonce = "";
        const r = document.querySelector("#vwoCode");
        r && (window.VWO.nonce = r.nonce), window.vwo_$ = e, window._vwo_uuid = null === (n = window.VWO._.allSettings.dataStore) || void 0 === n ? void 0 : n.uuid, window.clearTimeout(window._vwo_library_timer);
        let s = !!(window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver);
        window.Zone && window.Zone.__symbol__ && (s = !!window[window.Zone.__symbol__("MutationObserver")]), window.functionWrapper = new Ms;
        const a = {
            MutationObserver: s,
            name: window.name,
            navigator: {
                userAgent: window.navigator.userAgent,
                language: window.navigator.language || window.navigator.browserLanguage,
                appVersion: window.navigator.appVersion
            },
            screen: {
                colorDepth: window.screen.colorDepth,
                pixelDepth: window.screen.pixelDepth
            },
            location: window.location,
            Document: {
                prototype: {}
            },
            localStorage: window.localStorage,
            history: {},
            vwoCodeEndBeforeVA: null === (i = window._vwo_code) || void 0 === i ? void 0 : i.finished(),
            _vwo_code: window._vwo_code,
            _vwo_code_version: (null === (o = window._vwo_code) || void 0 === o ? void 0 : o.getVersion) && window._vwo_code.getVersion(),
            _vwo_server_url: window._vwo_server_url,
            _vwo_acc_id: window._vwo_acc_id,
            _vwo_clicks: window._vwo_clicks,
            _vis_opt_url: window._vis_opt_url,
            _vwo_cookieDomain: window._vwo_cookieDomain,
            _vis_opt_domain: window._vis_opt_domain,
            _vwo_style: window._vwo_style,
            _vwo_css: window._vwo_css,
            _vwo_uuid: window._vwo_uuid,
            _vwo_api_section_callback: window._vwo_api_section_callback,
            _vis_debug: window._vis_debug,
            _vis_heatmap: window.name.indexOf("_vis_heatmap_") >= 0,
            document: {
                cookie: document.cookie,
                URL: document.URL,
                referrer: document.referrer,
                addEventListener: document.addEventListener,
                domain: document.domain,
                title: document.title,
                characterSet: document.characterSet,
                charset: document.charset,
                baseURI: document.baseURI
            }
        };
        window.fetcher.init(), window.fetcher.setValue("fakeWindow", a), wn(e), window._vwo_server_url = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/", mt({
            getters: {
                window: window,
                accountId: window._vwo_acc_id,
                encodeURIComponent: encodeURIComponent,
                actions: {},
                serverUrl: window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/"
            }
        });
        const l = new URL(document.URL).searchParams.get("vwoLogLevel");
        c.setLevel(l || "warn"), c.info("Initializing jslib");
        const u = new je(window.VWO || []);
        U(u), D(u), Gt.init("jslib", u, null), window._vwo_s = Pt, gt((() => {
            Ws(u, Ds)
        }), !0)
    }

    function aa(e, t, n, i) {
        x._ && x._.customError && window.VWO._.customError({
            msg: e,
            url: "gquery.js",
            lineno: t,
            colno: n,
            source: i
        })
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent = ve.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent", ra);
    const ca = function() {
        var e = document,
            t = e.documentElement,
            n = [].slice,
            i = [].push,
            o = [].map,
            r = [].filter,
            s = e.createElement("div"),
            a = [].indexOf,
            c = [].splice,
            l = [].reverse,
            u = window,
            d = /^data-(.+)/,
            g = /\S+/g,
            h = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
            p = {
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

        function v(e) {
            return e.multiple && e.options ? function(e, t, n, o) {
                for (var r = [], s = M(t), a = o, c = 0, l = e.length; c < l; c++)
                    if (s) {
                        var u = t(e[c]);
                        u.length && i.apply(r, u)
                    } else
                        for (var d = e[c][t]; !(null == d || o && a(-1, d));) r.push(d), d = n ? d[t] : null;
                return r
            }(r.call(e.options, (function(e) {
                return e.selected && !e.disabled && !e.parentNode.disabled
            })), "value") : e.value || ""
        }

        function w(e) {
            return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        var f = {
                focus: "focusin",
                blur: "focusout"
            },
            _ = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
        var E = /\S+/g;
        var m = {
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
                if (O(t, e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        });
        var S = function e(t, n) {
                return new e.fn.init(t, n)
            },
            O = S.matches = function(e, t) {
                var n = e && (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector);
                return !!n && n.call(e, t)
            },
            T = S.isString = function(e) {
                return w(e) === w("")
            },
            y = /^--/;

        function C(e) {
            return y.test(e)
        }
        var I = /-([a-z])/g;

        function N(e, t) {
            return t.toUpperCase()
        }
        var A = S.camelCase = function(e) {
            return e.replace(I, N)
        };

        function b(e) {
            return !!e && 1 === e.nodeType
        }
        var R = {},
            L = s.style,
            V = ["webkit", "moz", "ms", "o"];

        function x(e, t) {
            if (void 0 === t && (t = C(e)), t) return e;
            if (!R[e]) {
                var n = A(e),
                    i = "" + n.charAt(0).toUpperCase() + n.slice(1);
                B((n + " " + V.join(i + " ") + i).split(" "), (function(t, n) {
                    if (n in L) return R[e] = n, !1
                }))
            }
            return R[e]
        }

        function U(e, t, n) {
            return void 0 === n && (n = C(e)), n || p[e] || !j(t) ? t : t + "px"
        }

        function D(e, t) {
            return parseInt(k(e, t), 10) || 0
        }

        function k(e, t, n) {
            if (b(e) && t) {
                var i = u.getComputedStyle(e, null);
                return t ? n ? i.getPropertyValue(t) || void 0 : i[t] : i
            }
        }
        var P, W = function() {},
            M = S.isFunction = function(e) {
                return w(e) === w(W) && !!e.call
            },
            G = S.uid = "_gQ" + Date.now(),
            $ = function(e) {
                return e[G] = e[G] || {}
            },
            F = S.isWindow = function(e) {
                return e === e.window
            },
            j = S.isNumeric = function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            H = function(e) {
                return 9 === e.nodeType
            };

        function B(e, t) {
            for (var n = 0, i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
        }

        function K(e, t, n) {
            B(e, (function(e, i) {
                B(t, (function(t, o) {
                    Y(i, e ? o.cloneNode(!0) : o, n, n && i.firstChild)
                }))
            }))
        }

        function Y(e, t, n, i) {
            if (B(3 === t.nodeType ? [] : S("script", t), (function(e, t) {
                    var n = document.createElement("script");
                    B(S(t).prop("attributes"), (function() {
                        S(n).attr(this.name, this.value)
                    })), n.text = t.innerHTML, document.getElementsByTagName("head")[0].appendChild(n), t.parentElement.removeChild(t)
                })), n)
                if ("SCRIPT" === t.tagName || "STYLE" === t.tagName) {
                    var o = document.createElement(t.tagName.toLowerCase());
                    "SCRIPT" === t.tagName ? o.text = t.innerHTML : o.appendChild(document.createTextNode(t.innerHTML)), B(S(t).prop("attributes"), (function() {
                        S(o).attr(this.name, this.value)
                    })), o.classList = t.classList, e.insertBefore(o, i)
                } else e.insertBefore(t, i);
            else if ("SCRIPT" === t.tagName || "STYLE" === t.tagName) {
                o = document.createElement(t.tagName.toLowerCase());
                "SCRIPT" === t.tagName ? o.text = t.innerHTML : o.appendChild(document.createTextNode(t.innerHTML));
                B(S(t).prop("attributes"), (function() {
                    S(o).attr(this.name, this.value)
                })), o.classList = t.classList, e.appendChild(o)
            } else e.appendChild(t)
        }
        return S.extend = function() {
            var e, t, n, i, o = arguments[0] || {},
                r = 1,
                s = arguments.length,
                a = !1;
            for ("boolean" == typeof o && (a = o, o = arguments[1] || {}, r = 2), "object" === w(o) || M(o) || (o = {}), s === r && (o = this, --r); r < s; r++)
                if (null != (e = arguments[r]))
                    for (t in e)
                        if (n = o[t], o !== (i = e[t]))
                            if (a && i && (S.isPlainObject(i) || S.isArray(i))) {
                                var c = n && (S.isPlainObject(n) || S.isArray(n)) ? n : S.isArray(i) ? [] : {};
                                o[t] = S.extend(a, c, i)
                            } else void 0 !== i && (o[t] = i);
            return o
        }, S.isArray = Array.isArray, S.isPlainObject = function(e) {
            if (!e || "[object Object]" !== Object.prototype.toString.call(e) || e.nodeType || e.setInterval) return !1;
            if (e.constructor && !hasOwnProperty.call(e, "constructor") && !hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            var t;
            for (t in e);
            return void 0 === t || hasOwnProperty.call(e, t)
        }, S.parseJSON = function(e) {
            return "string" == typeof e && e ? /^[\],:{}\s]*$/.test(e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? JSON.parse(e) : void 0 : null
        }, S.getJSON = function(e, t, n, i) {
            return M(t) && (i = i || n, n = t, t = null), S.ajax({
                url: e,
                data: t,
                success: n,
                dataType: i
            })
        }, S.get = function(e, t, n, i) {
            return M(t) && (i = i || n, n = t, t = null), S.ajax({
                type: "GET",
                url: e,
                data: t,
                success: n,
                dataType: i
            })
        }, S.each = function() {
            var e, t, i = arguments;
            1 === i.length && M(i[0]) ? (e = n.call(this), t = i[0]) : (e = i[0], t = i[1]);
            for (var o = 0; o < e.length; o++) t.call(e[o], o, e[o]);
            return this
        }, S.ajax = function(e) {
            if ("script" === e.dataType) {
                var t = document.createElement("script");
                return t.src = e.url, document.getElementsByTagName("head")[0].appendChild(t), t.onload = e.success || W, void(t.onerror = e.error || W)
            }
            var n = new XMLHttpRequest;
            n.open(e.method ? e.method : "GET", e.url, !0), e.data || (e.data = null), n.onload = function() {
                this.status >= 200 && this.status < 400 && (e.dataType || (this.response = S.parseJSON(this.response)), e.success && e.success(this.response))
            }, n.onerror = function() {
                e.error && e.error(this.response)
            }, n.send(e.data)
        }, S.isEmptyObject = function(e) {
            return e && 0 === Object.keys(e).length
        }, (S.fn = S.prototype = {
            jquery: "1.4.2",
            gQVersion: "0.0.1",
            toArray: function() {
                return n.call(this, 0)
            },
            constructor: S,
            hasClass: function(e) {
                return n.call(this).every((function(t) {
                    return 1 === t.nodeType && t.classList.contains(e)
                }))
            },
            ready: function(t) {
                return "loading" !== e.readyState ? setTimeout(t) : e.addEventListener("DOMContentLoaded", t), this
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
                let n = "height" === e.toLowerCase() ? 1 : 0,
                    i = this[0];
                if (i) return F(i) ? window["outer" + e] : this[0]["offset" + e] + (t ? D(this[0], "margin" + (n ? "Top" : "Left")) + D(this[0], "margin" + (n ? "Bottom" : "Right")) : 0)
            },
            getComputedDimension: function(e, t) {
                var n, i, o = this[0],
                    r = "height" === e.toLowerCase() ? 0 : 1;
                if (e = e.charAt(0).toUpperCase() + e.slice(1), H(o)) {
                    var s = o.documentElement;
                    return Math.max(o.body["scroll" + e], o.body["offset" + e], s["scroll" + e], s["offset" + e], s["client" + e])
                }
                if (F(o)) return "height" === e.toLowerCase() ? o.outerHeight : o.outerWidth;
                try {
                    return o.getBoundingClientRect()[e.toLowerCase()] - (D(n = o, "border" + ((i = r) ? "Left" : "Top") + "Width") + D(n, "padding" + (i ? "Left" : "Top")) + D(n, "padding" + (i ? "Right" : "Bottom")) + D(n, "border" + (i ? "Right" : "Bottom") + "Width"))
                } catch (e) {
                    aa(`Error is ${e} and elem is ${o}`, 529, 25, "getBoundingClientRect")
                }
            },
            height: function() {
                return this.getComputedDimension("height")
            },
            width: function() {
                return this.getComputedDimension("width")
            },
            is: function(e) {
                if (!e) return !1;
                var t = !1;
                return this.each((function(n, i) {
                    return !(t = "string" == typeof e ? O(i, e) : i === e)
                })), t
            },
            attr: function(e, t) {
                var n;
                if (e) {
                    if (T(e)) return void 0 === t ? null === (n = this[0] ? this[0].getAttribute ? this[0].getAttribute(e) : this[0][e] : void 0) ? void 0 : n : this.each((function(n, i) {
                        i.setAttribute ? i.setAttribute(e, t) : i[e] = t
                    }));
                    for (var i in e) this.attr(i, e[i]);
                    return this
                }
            },
            removeAttr: function(e) {
                return e = e.match(g) || [], this.each((function(t, n) {
                    B(e, (function(e, t) {
                        n.removeAttribute(t)
                    }))
                }))
            },
            outerWidth: function(e) {
                return this.getComputedDimensionOuter("Width", e)
            },
            outerHeight: function(e) {
                return this.getComputedDimensionOuter("Height", e)
            },
            offset: function() {
                var e = this[0];
                if (e.nodeType == Node.TEXT_NODE && (e = e.parentElement), !e) return {
                    top: 0,
                    left: 0
                };
                let n = {};
                try {
                    n = e.getBoundingClientRect()
                } catch (t) {
                    if (aa(`Error is ${t} and elem is ${e}`, 603, 25, "getBoundingClientRect"), e === document) return
                }
                var i = e.ownerDocument ? e.ownerDocument.defaultView : window;
                return {
                    top: n.top + i.pageYOffset - t.clientTop,
                    left: n.left + i.pageXOffset - t.clientLeft
                }
            },
            index: function(e) {
                var t = e ? S(e)[0] : this[0],
                    n = e ? this : S(t).parent().children();
                return a.call(n, t)
            },
            each: S.each,
            delegate: function(e, t, n, i) {
                return this.on(e, t, n, i)
            },
            on: function(e, t, n, i) {
                var o, r, s = this;
                return M(t) && (n = t, t = null), this[0] === document && "ready" === e ? (this.ready(n), this) : (t && (o = n, n = function(e) {
                    for (var n = e.target; !O(n, t);) {
                        if (n === this || !n) return !1;
                        n = n.parentNode
                    }
                    n && o.call(n, e)
                }), B(T(r = e) && r.match(E) || [], (function(o, r) {
                    m[r] && (t && m[r].delegateType ? e = m[r].delegateType : m[r].bindType && (e = m[r].bindType)), s.each((function(t, o) {
                        o.addEventListener(e, n, !!i)
                    }))
                })), this)
            },
            off: function(e, t, n) {
                return this.each((function(i, o) {
                    o.removeEventListener(e, t, !!n)
                }))
            },
            isChecked: function() {
                return null !== this[0].getAttribute("checked")
            },
            isFocussed: function() {
                return this[0] === e.activeElement
            },
            closest: function(e) {
                return new S(this[0].closest(e))
            },
            parent: function() {
                return new S(this[0] && this[0].parentNode)
            },
            val: function(e) {
                return arguments.length ? this.each((function(t, n) {
                    var i = n.multiple && n.options;
                    if (i || /radio|checkbox/i.test(n.type)) {
                        var r = Array.isArray(e) ? o.call(e, String) : null === e ? [] : [String(e)];
                        i ? B(n.options, (function(e, t) {
                            t.selected = r.indexOf(t.value) >= 0
                        })) : n.checked = r.indexOf(n.value) >= 0
                    } else n.value = null == e ? "" : e
                })) : this[0] && v(this[0])
            },
            prop: function(e, t) {
                if (e) {
                    if (T(e)) return void 0 === t ? this[0][e] : this.each((function(n, i) {
                        i[e] = t
                    }));
                    for (var n in e) this.prop(n, e[n]);
                    return this
                }
            },
            data: function(e, t) {
                var n = this;
                if (!e) {
                    if (!this[0]) return;
                    var i = {};
                    return B(this[0].attributes, (function(e, t) {
                        var o = t.name.match(d);
                        o && (i[o[1]] = n.data(o[1]))
                    })), i
                }
                if (T(e)) return void 0 === t ? function(e, t) {
                    var n = $(e)[t];
                    return void 0 === n && (n = e.dataset ? e.dataset[t] : S(e).attr("data-" + t)), n
                }(this[0], e) : this.each((function(n, i) {
                    return function(e, t, n) {
                        return $(e)[t] = n
                    }(i, e, t)
                }));
                for (var o in e) this.data(o, e[o]);
                return this
            },
            eq: function(e) {
                return S(this.get(e))
            },
            get: function(e) {
                return void 0 === e ? n.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            appendTo: function(e) {
                for (var t = S(e), n = 0; n < t.length; n++) t[n].appendChild(this[0]);
                return this
            },
            find: function(e) {
                return this[0] || (e = void 0), S(e, this[0])
            },
            toggleClass: function(e, t, n) {
                var i = [],
                    o = void 0 !== t;
                return T(e) && (i = e.match(g) || []), this.each((function(e, r) {
                    if (1 === r.nodeType)
                        for (var s = 0; s < i.length; s++) o ? (n = t ? "add" : "remove", r.classList[n](i[s])) : r.classList.toggle(i[s])
                }))
            },
            addClass: function(e) {
                return this.toggleClass(e, !0, "add"), this
            },
            removeClass: function(e) {
                return e ? this.toggleClass(e, !1, "remove") : this.attr("class", ""), this
            },
            remove: function() {
                return this.each((function(e, t) {
                    t.parentNode.removeChild(t)
                })), this
            },
            children: function() {
                var e = [];
                return this.each((function(t, n) {
                    i.apply(e, n.children)
                })), S(e)
            },
            map: function(e) {
                return S(o.call(this, (function(t, n) {
                    return e.call(t, n, t)
                })))
            },
            clone: function() {
                return this.map((function(e, t) {
                    return t.cloneNode(!0)
                }))
            },
            filter: function(e) {
                var t = e;
                return T(t) && (t = function(t, n) {
                    return O(n, e)
                }), S(r.call(this, (function(e, n) {
                    return t.call(e, n, e)
                })))
            },
            parents: function(e) {
                var t = [];
                return this.each((function(e, n) {
                    for (var i = n.parentNode; i && 9 !== i.nodeType;) t.push(i), i = i.parentNode
                })), t = t.filter((function(e, n) {
                    return t.indexOf(e) === n
                })), e && (t = t.filter((function(t) {
                    return O(t, e)
                }))), S(t)
            },
            append: function() {
                var e = this;
                return B(arguments, (function(t, n) {
                    K(e, S(n))
                })), this
            },
            prepend: function() {
                var e = this;
                return B(arguments, (function(t, n) {
                    K(e, S(n), !0)
                })), this
            },
            html: function(e) {
                return void 0 === e ? this[0] && this[0].innerHTML : this.each((function(t, n) {
                    n.innerHTML = e
                }))
            },
            css: function(e, t) {
                if (T(e)) {
                    var n = C(e);
                    return e = x(e, n), arguments.length < 2 ? this[0] && k(this[0], e, n) : e ? (t = U(e, t, n), this.each((function(i, o) {
                        b(o) && (n ? o.style.setProperty(e, t) : o.style[e] = t)
                    }))) : this
                }
                for (var i in e) this.css(i, e[i]);
                return this
            },
            hashchange: function(e) {
                window.addEventListener("hashchange", e)
            },
            replaceWith: function(e) {
                return this.each((function(t, n) {
                    var i = n.nextSibling,
                        o = n.parentNode;
                    S(n).remove(), i ? S(i).before(e) : S(o).append(e)
                }))
            },
            before: function() {
                var e = this;
                return B(arguments, (function(t, n) {
                    S(n).insertBefore(e)
                })), this
            },
            after: function() {
                var e = this;
                return B(l.apply(arguments), (function(t, n) {
                    l.apply(S(n).slice()).insertAfter(e)
                })), this
            },
            insertBefore: function(e) {
                var t = this;
                return S(e).each((function(e, n) {
                    var i = n.parentNode;
                    i && t.each((function(t, o) {
                        Y(i, e ? o.cloneNode(!0) : o, !0, n)
                    }))
                })), this
            },
            insertAfter: function(e) {
                var t = this;
                return S(e).each((function(e, n) {
                    var i = n.parentNode;
                    i && t.each((function(t, o) {
                        Y(i, e ? o.cloneNode(!0) : o, !0, n.nextSibling)
                    }))
                })), this
            },
            trigger: function(t, n) {
                var i, o;
                if (T(t)) {
                    var r = [(o = t.split("."))[0], o.slice(1).sort()],
                        s = r[0],
                        a = r[1],
                        c = _.test(s) ? "MouseEvents" : "HTMLEvents";
                    (i = e.createEvent(c)).initEvent(s, !0, !0), i.namespace = a.join(".")
                } else i = t;
                i.data = n;
                var l = i.type in f;
                return this.each((function(e, t) {
                    l && M(t[i.type]) ? t[i.type]() : t.dispatchEvent(i)
                }))
            },
            contents: function() {
                return this[0] ? S(this[0].childNodes) : S("")
            },
            not: function(e) {
                return S(this).filter((function(t, n) {
                    return !O(n, e)
                }))
            }
        }).bind = S.fn.live = S.fn.on, S.inArray = function(e, t) {
            return a.call(t, e)
        }, S.trim = function(e) {
            return (e || "").replace(h, "")
        }, S.getScript = function(e, t) {
            return S.get(e, void 0, t, "script")
        }, S.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), (function(e, t) {
            S.fn[t] = function(e) {
                return "submit" === t ? this[0].submit() : e ? this.bind(t, e) : this.trigger(t)
            }, S.attrFn && (S.attrFn[t] = !0)
        })), S.guid = 1, S.proxy = function(e, t, n) {
            return 2 === arguments.length && ("string" == typeof t ? (e = (n = e)[t], t = void 0) : t && !M(t) && (n = t, t = void 0)), !t && e && (t = function() {
                return e.apply(n || this, arguments)
            }), e && (t.guid = e.guid = e.guid || t.guid || S.guid++), t
        }, (S.fn.init = function(t, n) {
            var o, r = !1;
            if (T(t) && /<.+>/.test(t)) {
                r = !0;
                try {
                    o = t, P || (P = e.implementation.createHTMLDocument(null)), P.body.innerHTML = o, t = P.body.childNodes
                } catch (e) {
                    throw e
                }
            }
            if (!t) return this;
            if (t && t.nodeType || F(t)) return this[0] = t, this.length = 1, this;
            if (T(t)) {
                n = n || e;
                var s = this.constructor(),
                    a = /^#[\w-]*$/.test(t) ? n.getElementById(t.slice(1)) : n.querySelectorAll(t);
                return a && a.nodeType && (a = [a]), i.apply(s, r ? t : a), s
            }
            if (M(t)) return S.fn.ready(t);
            for (var c = 0; c < t.length; c++) this.length = t.length, this[c] = t[c]
        }).prototype = S.fn, S.fn.splice = c, "function" == typeof Symbol && (S.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]), S.prototype.slice = function() {
            return S(n.apply(this, arguments))
        }, S.prototype.length = 0, S.nodeName = function(e, t) {
            return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
        }, S
    }();
    sa(ca)
})();