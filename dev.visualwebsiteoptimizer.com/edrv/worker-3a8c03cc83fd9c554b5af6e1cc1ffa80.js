(function() {
    "use strict";

    function e(e) {}
    const t = self;
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
    function i(e, t, i, n) {
        return new(i || (i = Promise))((function(r, o) {
            function s(e) {
                try {
                    l(n.next(e))
                } catch (e) {
                    o(e)
                }
            }

            function a(e) {
                try {
                    l(n.throw(e))
                } catch (e) {
                    o(e)
                }
            }

            function l(e) {
                var t;
                e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                    e(t)
                }))).then(s, a)
            }
            l((n = n.apply(e, t || [])).next())
        }))
    }
    let n;
    window.setInterval = t.setInterval.bind(t), window.setTimeout = t.setTimeout.bind(t), window.clearInterval = t.clearInterval.bind(t), window.clearTimeout = t.clearTimeout.bind(t), window.addEventListener = t.addEventListener.bind(t), window.encodeURIComponent = t.encodeURIComponent.bind(t), window.decodeURIComponent = t.decodeURIComponent.bind(t), window.JSON = self.JSON, document = window.document, window.window = window, t._onMessage = e, window.workerThread = t, window.VWO.modules = {
        vwoUtils: {
            cookies: {}
        },
        utils: {},
        tags: {},
        phoenixPlugins: {
            events: {
                predefinedEvents: {}
            }
        }
    };
    const r = {
            test: e => {
                var t;
                return n = null === (t = window.VWO) || void 0 === t ? void 0 : t.phoenix, window.workerThread && n && e === n.store.getters
            },
            transformer: function(e) {
                return e === n.store.getters.settings.campaigns || e === n.store.getters.allSettings.dataStore.campaigns ? "vwojFnGPlugCamp" : e === n.store.getters.allSettings ? "vwojFnGPlugAllSet" : e
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
        o = [r],
        s = {
            stringify: function(e, t, i) {
                return JSON.stringify(e, (function(e, n) {
                    if (!i) {
                        const e = o.filter((e => e.test(n)));
                        if (e.length > 0) {
                            const i = t => e.reduce(((e, t) => t.transformer(e)), t);
                            return JSON.parse(s.stringify(n, t, i))
                        }
                    }
                    i && (n = i(n));
                    const r = e ? this : t;
                    var a;
                    return n instanceof Function || "function" == typeof n ? n.type === "vwoWrappedFn_" + (window.mainThread ? "WT" : "MT") ? "_NuPreW" + n.name.slice(0, n.name.indexOf("_") + 1) : (a = n.toString()).length < 8 || "function" !== a.substring(0, 8) ? "_NuFrRa" + window.functionWrapper.wrap(n, r) + "_" : "_NuFrNf" + window.functionWrapper.wrap(n, r) + "_" : n instanceof RegExp ? "_PxEgEr_" + n : n
                }))
            },
            parse: function(e, t) {
                if (!e) return e;

                function i(e) {
                    const t = e + "_wrappedFn",
                        i = {
                            [t](...t) {
                                const i = {
                                    type: "callWrappedFunction",
                                    id: e,
                                    args: s.stringify(t)
                                };
                                return window.fetcher.request(i).send()
                            }
                        }[t];
                    return i.type = "vwoWrappedFn_" + (window.mainThread ? "WT" : "MT"), i
                }
                const n = !!t && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
                return JSON.parse(e, (function(e, t) {
                    var r;
                    if (t = o.reduce(((t, i) => i.parse(e, t)), t), "string" != typeof t) return t;
                    if (t.length < 8) return t;
                    if (r = t.substring(0, 7), n && t.match(n)) return new Date(t);
                    if ("_NuPreW" === r) {
                        const e = t.match(/_NuPreW([0-9]*)_/)[1];
                        return window.functionWrapper.unwrap(e)
                    }
                    if ("_NuFrNf" === r) {
                        const e = t.match(/_NuFrNf([0-9]*)_/)[1];
                        return i(e)
                    }
                    if ("_PxEgEr" === r) return eval(t.slice(8));
                    if ("_NuFrRa" === r) {
                        const e = +t.match(/_NuFrRa([0-9]*)_/)[1];
                        return i(e)
                    }
                    return t
                }))
            },
            clone: function(e, t) {
                return this.parse(this.stringify(e), t)
            }
        };
    let a = 0;
    const l = {},
        c = {};

    function d(e, t, i) {
        var n;
        const r = this.postMessage.bind(this);
        if ("response" === (null === (n = e) || void 0 === n ? void 0 : n.type)) {
            const t = e;
            return {
                resolve: function(e) {
                    let i = t.encapsulatedData,
                        n = t.isErrorPresent;
                    i && (i = "function" == typeof e ? e(t.encapsulatedData) : t.encapsulatedData), n ? c[t.twoWayCommId](i) : l[t.twoWayCommId](i)
                }
            }
        } {
            const n = {
                type: "response",
                encapsulatedData: e,
                twoWayCommId: t,
                isErrorPresent: i
            };
            return {
                send: function() {
                    try {
                        return r(n), !0
                    } catch (e) {
                        return !1
                    }
                }
            }
        }
    }

    function u(e) {
        var t;
        if (this.sendingLayer = this.postMessage, "request" === (null === (t = e) || void 0 === t ? void 0 : t.type)) {
            const t = e,
                n = t.encapsulatedData;
            return {
                resolve: e => i(this, void 0, void 0, (function*() {
                    try {
                        const i = yield e(n);
                        return d.call(this, i, t.twoWayCommId).send(), !0
                    } catch (e) {
                        const i = s.stringify(e.message);
                        return d.call(this, i, t.twoWayCommId, !0).send(), !1
                    }
                }))
            }
        } {
            const t = {
                type: "request",
                encapsulatedData: e,
                twoWayCommId: ++a
            };
            return {
                send: () => new Promise(((e, i) => {
                    try {
                        l[t.twoWayCommId] = e, c[t.twoWayCommId] = i, this.sendingLayer(t)
                    } catch (e) {
                        console.log(e), i(e)
                    }
                }))
            }
        }
    }
    var g;
    ! function(e) {
        e[e.Object = 0] = "Object", e[e.Property = 1] = "Property", e[e.Document = 2] = "Document", e[e.Variable = 3] = "Variable", e[e.OverWrite = 4] = "OverWrite", e[e.Delete = 5] = "Delete"
    }(g || (g = {}));
    class v {
        constructor() {
            this.masterObject = {}
        }
        static isObject(e) {
            return "object" == typeof e && !Array.isArray(e) && null !== e
        }
        static createProxy(e, t, i) {
            if (e.__isProxy || !this.isObject(e)) return e;
            const n = e;
            return Object.defineProperty(n, "__transferData", {
                value: !0,
                enumerable: !1,
                writable: !0
            }), new Proxy(n, {
                set: (e, n, r) => {
                    if ("__isProxy" === n || e[n] === r) return !0;
                    if (typeof e[n] == typeof r && "function" != typeof r && JSON.stringify(r) === JSON.stringify(e[n])) return !0;
                    if (this.isObject(r) ? e[n] = this.proxify(r, t, i + n.toString() + ".") : e[n] = r, "__transferData" === n || !e.__transferData) return !0;
                    const o = {
                        path: i + n.toString() + ".",
                        value: r
                    };
                    return o.value = s.stringify(r, e), t({
                        type: "sync",
                        data: o,
                        syncType: g.Object
                    }), !0
                },
                get: (e, t) => "__isProxy" === t || e[t],
                deleteProperty: (e, n) => {
                    if (n in e) {
                        if (delete e[n], !e.__transferData) return !0;
                        const r = {
                            path: i.toString(),
                            key: n
                        };
                        t({
                            type: "sync",
                            data: JSON.stringify(r),
                            syncType: g.Delete
                        })
                    }
                    return !0
                }
            })
        }
        isKey(e) {
            return e in this.masterObject
        }
        static proxify(e, t, i) {
            return this.isObject(e) ? (Object.keys(null != e ? e : {}).forEach((n => {
                this.isObject(e[n]) && (e[n] = this.proxify(e[n], t, i + n + "."))
            })), this.createProxy(e, t, i)) : e
        }
        register(e, t, i) {
            t in this.masterObject && console.error("Key already exists!"), null == e && (e = {});
            const n = v.proxify(e, i, t + ".");
            return this.masterObject[t] = {
                proxy: n
            }, n
        }
        append(e, t) {
            return t in this.masterObject || console.error("Key doesn't exist!"), JSON.stringify(e) !== JSON.stringify(this.masterObject[t].proxy) && console.error(`The object doesn't match the object registered under the key ${t}!`), this.masterObject[t].proxy
        }
        static getProxy(e, t, i) {
            return this.proxify(e, t, i + ".")
        }
        static sync(e, t, i, n, r) {
            if (null == e || !e.__isProxy) return e;
            let o = null,
                s = i + ".";
            return 1 === n.length ? (e.__transferData = !1, e[n[0]] = this.proxify(t, r, s + n[0] + "."), e.__transferData = !0, e) : (o = e[n[0]], n.forEach(((e, t) => {
                0 !== t && t !== n.length - 1 && (s += e + ".", e in o || (o.__transferData = !1, o[e] = this.proxify({}, r, s), o.__transferData = !0), o = o[e])
            })), o.__transferData = !1, o[n.pop()] = this.proxify(t, r, s), o.__transferData = !0, e)
        }
    }
    class p {
        static getSetter(e) {
            return t => {
                let i, n = null;
                if ("string" == typeof t) i = t;
                else {
                    if ("object" != typeof t || Array.isArray(t)) return void console.error("Invalid value type!");
                    i = t.value, n = t.context
                }
                if (window.VWO._.isWorkerThread && "MAIN" !== n) {
                    const e = i.indexOf("="),
                        t = i.substring(0, e).trim(),
                        n = {};
                    i.split(";").forEach((e => {
                        const [t, i = ""] = e.split("=");
                        n[t.trim()] = i.trim()
                    }));
                    let r = !1;
                    (n.expires && new Date(n.expires) < new Date(Date.now()) || "0" === n["max-age"]) && (r = !0);
                    const o = {};
                    document.__cookie.split(";").forEach((e => {
                        if (!e) return;
                        const t = e.split("=");
                        o[t[0]] = t[1]
                    })), r ? delete o[t] : o[t] = n[t], document.__cookie = Object.entries(o).map((e => e.join("="))).join(";")
                } else if (document.__cookie = i, "MAIN" === n) return !0;
                return e({
                    type: "sync",
                    data: {
                        propertyName: "cookie",
                        value: {
                            value: window.VWO._.isWorkerThread ? i : document.__cookie,
                            context: window.VWO._.isWorkerThread ? "WORKER" : "MAIN"
                        }
                    },
                    syncType: g.Document
                }), !0
            }
        }
    }
    class h {
        static register(e, t) {
            if (!document) return void console.error("The property doesn't exist on the `DOCUMENT` object.");
            const i = window.VWO._.isWorkerThread ? window.document : window.Document.prototype;
            if (e in window.document) {
                const n = Object.getOwnPropertyDescriptor(i, e);
                Object.defineProperty(i, "__" + e, n), Object.defineProperty(i, e, {
                    enumerable: n.enumerable,
                    configurable: n.configurable,
                    get: () => document["__" + e],
                    set: "cookie" === e ? p.getSetter(t) : i => (JSON.stringify(document["__" + e]) === JSON.stringify(i) || (document["__" + e] = i, t({
                        type: "sync",
                        data: {
                            propertyName: e,
                            value: document["__" + e]
                        },
                        syncType: g.Document
                    })), !0)
                })
            }
        }
    }
    class w {
        static register(e, t, i, n) {
            i in e ? console.error("The property must not pre-exist inside the object.") : Object.defineProperty(e, i, {
                enumerable: !0,
                configurable: !1,
                get: () => e[`__${i}`],
                set: r => (e[`__${i}`] = r, n({
                    type: "sync",
                    data: {
                        identifier: t,
                        property: i,
                        value: r
                    },
                    syncType: g.Property
                }), !0)
            })
        }
    }

    function f() {
        class e {
            constructor(e) {
                this.__transferData = !0, this.length = (null == e ? void 0 : e.length) || 0, this.value = e || {}, this.callback = window.fetcher.postMessage.bind(window.fetcher)
            }
            key(e) {
                if (e >= this.length) return null;
                const t = Object.keys(this.value);
                for (let i = 0; i < t.length; i++)
                    if (i === e) return t[i]
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
                _setItem: (t, i) => {
                    if (window.localStorage.getItem(t) !== i) return window.localStorage.setItem(t, i), e({
                        data: {
                            key: t,
                            value: i
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

    function m(e) {
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
    class E {}
    E.syncLocalStorage = f;
    class _ extends E {
        constructor() {
            super(), this.objectSyncer = new v
        }
        register(e, t, i = {}, n = "", r = !1) {
            if ("object" != typeof i || Array.isArray(i)) return;
            const o = window.fetcher.postMessage.bind(window.fetcher);
            switch (e) {
                case "custom":
                    switch (t) {
                        case "localStorage":
                            _.syncLocalStorage();
                            break;
                        default:
                            throw new Error("Unknown property name!")
                    }
                    break;
                case g.Object:
                    {
                        const e = this.objectSyncer.register(i, t, o);
                        return r && o({
                            data: {
                                value: JSON.stringify(i),
                                path: t
                            },
                            type: "sync",
                            syncType: g.OverWrite
                        }),
                        e
                    }
                case g.Property:
                    w.register(i, n, t, o);
                    break;
                case g.Document:
                    h.register(t, o);
                    break;
                default:
                    console.error("Unknown 'syncAblesEnum' type!")
            }
        }
        append(e, t) {
            return this.objectSyncer.append(e, t)
        }
        static sync(e, t) {
            var i;
            const {
                data: n
            } = e;
            if ("object" != typeof e.syncType || "custom" !== e.syncType.type) switch (e.syncType) {
                case g.Object:
                    {
                        n.value = s.parse(n.value);
                        const e = n.path.substring(0, n.path.lastIndexOf(".")).split(".");window[e[0]] = v.sync(window[e[0]], n.value, e[0], e.splice(1), t);
                        break
                    }
                case g.Document:
                    document[n.propertyName] = n.value;
                    break;
                case g.Property:
                case g.Variable:
                    t(n);
                    break;
                case g.OverWrite:
                    if (!("__transferData" in (null !== (i = window[n.path]) && void 0 !== i ? i : {}))) return void(window[n.path] = JSON.parse(n.value));
                    window[n.path] = v.getProxy(JSON.parse(n.value), t, n.path);
                    break;
                case g.Delete:
                    {
                        const e = JSON.parse(n),
                            t = e.path.substring(0, e.path.lastIndexOf(".")).split(".").reduce(((e, t) => Object.keys(e).length ? e[t] : window[t]), {}),
                            i = e.key;i in t && (t.__transferData = !1, delete t[i], t.__transferData = !0);
                        break
                    }
                default:
                    console.error("Unknown 'syncAblesEnum' type!")
            } else switch (e.syncType.method) {
                case "localStorage":
                    m(e);
                    break;
                default:
                    return
            }
        }
        declare(e, t) {
            w.register(window, "window", e, t)
        }
    }
    const y = window.VWOEventsArchInCompatibilityMode,
        O = (e, t) => {
            if (e && e.bind) try {
                e = e.bind(t)
            } catch (t) {
                if (/(cannot be invoked without 'new')|(Cannot call a class constructor without |new|)/i.test(t.message)) return e;
                console.error(t)
            }
            return e
        };

    function S(e, t, i = {}) {
        if ("window" === e) return window;
        let n = window;
        const {
            captureGroups: r = null,
            filter: o
        } = i, s = e.split("."), a = s.length;
        for (let e = 0; e < a; e++) {
            let t = s[e];
            if (t.endsWith(")")) {
                const e = t.substring(0, t.indexOf("("));
                let i = t.substring(t.indexOf("("));
                i = "[" + i.slice(1, i.length - 1) + "]";
                const o = i.slice(1, i.length - 1).split(",");
                o.forEach(((e, t) => {
                    e.startsWith('"') || (o[t] = '"vwoCurrThreadRef' + e + '"')
                }));
                const s = JSON.parse(i, ((e, t) => {
                    let i;
                    if ("string" == typeof t) {
                        if (i = t.match(/\${{([0-9]*)}}/)) return r[i[1] - 1];
                        if (i = t.match(/vwoCurrThreadRef(.*)/)) return S(i[1])
                    }
                    return t
                }));
                n = n[e](...s)
            } else {
                let e = !1;
                t.endsWith("?") && (t = t.slice(0, -1), e = !0);
                const i = n[t];
                if (n = O(i, n), e && null == n) return n
            }
        }
        if (o) {
            const e = {};
            o.forEach((t => {
                e[t] = n[t]
            })), n = e
        }
        return n
    }
    const T = function(e) {
            return window.functionWrapper.unwrap(e.id)(...s.parse(e.args))
        },
        I = function(e) {
            var t, n;
            return i(this, void 0, void 0, (function*() {
                switch (e.type) {
                    case "callWrappedFunction":
                        {
                            const t = T(e);
                            return s.stringify(t)
                        }
                    case "vwoClassInstanceBridge":
                        {
                            const t = e.path.dest.lastIndexOf(".");
                            let i = window,
                                n = e.path.dest; - 1 !== t && (i = S(e.path.dest.slice(0, t)), n = e.path.dest.substr(t + 1));
                            const r = i[n],
                                [o, s] = new r(...e.args);
                            return s.otherSide = (...t) => {
                                const i = e.path.src + "." + o + "." + t[0];
                                return t[0] = i, window.fetcher.getValue(...t)
                            },
                            "" + o
                        }
                    default:
                        {
                            let i, r;
                            if ("setValue" === (e = s.parse(e)).type) {
                                -1 == e.path.lastIndexOf(".") && (e.path = "window." + e.path);
                                const t = e.path;
                                e.path = t.slice(0, t.lastIndexOf(".")), i = t.slice(t.lastIndexOf(".") + 1)
                            }(null === (t = e.config) || void 0 === t ? void 0 : t.captureGroups) && (e.config.captureGroups = s.parse(e.config.captureGroups));
                            const o = r = S(e.path, e.args, null == e ? void 0 : e.config);
                            return (null === (n = e.config) || void 0 === n ? void 0 : n.constructable) ? r = new o(...e.args) : "function" == typeof o && (r = o(...e.args || [])),
                            i && (r = o[i] = e.val),
                            r = yield r,
                            s.stringify(r)
                        }
                }
            }))
        };
    class C {}
    class b extends C {
        init() {
            var e, t, i;
            this.thread = (null === (t = null === (e = window) || void 0 === e ? void 0 : e.mainThread) || void 0 === t ? void 0 : t.webWorker) || (null === (i = window) || void 0 === i ? void 0 : i.workerThread), this.request = u, this.response = d, this.thread.onmessage = this.onMessage.bind(this)
        }
        onMessage(e) {
            var t, i;
            const {
                data: n
            } = e;
            switch (n.type) {
                case "initDone":
                    window.vwo_initDone(n);
                    break;
                case "request":
                    this.request(n).resolve(I);
                    break;
                case "response":
                    this.response(n).resolve(s.parse.bind(s));
                    break;
                case "sync":
                    {
                        let e = e => null;
                        switch (n.syncType) {
                            case g.OverWrite:
                            case g.Object:
                                e = this.postMessage.bind(this);
                                break;
                            case g.Property:
                            case g.Document:
                            case g.Variable:
                            case g.Delete:
                        }
                        _.sync(n, e);
                        break
                    }
                default:
                    null === (i = (t = this.thread)._onMessage) || void 0 === i || i.call(t, e)
            }
        }
        postMessage(e) {
            try {
                this.thread.postMessage(e)
            } catch (e) {
                console.error(e)
            }
        }
        getValue(e, t, i = {}) {
            let n;
            (null == i ? void 0 : i.captureGroups) && (n = s.stringify(i.captureGroups));
            const r = {
                path: e,
                args: t,
                config: Object.assign(Object.assign({}, i), {
                    captureGroups: n
                })
            };
            return this.request(s.stringify(r)).send()
        }
        setValue(e, t) {
            const i = {
                type: "setValue",
                path: e,
                val: t
            };
            return this.request(s.stringify(i)).send()
        }
    }
    class N extends C {
        init() {}
        onMessage() {}
        postMessage() {
            this.onMessage.apply(this, arguments)
        }
        getValue(e, t, i = {}) {
            return new Promise((i => {
                t ? Array.isArray(t) ? i(window[e](...t)) : t.captureGroups.forEach(((t, i) => {
                    e.replace(`{{${i}}}`, s.parse(t))
                })) : i(e)
            }))
        }
        setValue(e, t) {
            return window[e] = t
        }
    }
    const A = y ? N : b;
    window.fetcher = new A;
    class R {
        constructor() {
            this.id = 0, this.store = {}
        }
        wrap(e, t) {
            const i = this.id++;
            return this.store = this.store || {}, this.store[i] = t ? e.bind(t) : e, i
        }
        unwrap(e) {
            return this.store[e]
        }
    }
    var V = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function x(e) {
        var t = {
            exports: {}
        };
        return e(t, t.exports), t.exports
    }
    var P = function(e) {
            return e && e.Math == Math && e
        },
        D = P("object" == typeof globalThis && globalThis) || P("object" == typeof window && window) || P("object" == typeof self && self) || P("object" == typeof V && V) || function() {
            return this
        }() || Function("return this")(),
        L = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        },
        k = !L((function() {
            return 7 != Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })),
        U = {}.propertyIsEnumerable,
        M = Object.getOwnPropertyDescriptor,
        W = {
            f: M && !U.call({
                1: 2
            }, 1) ? function(e) {
                var t = M(this, e);
                return !!t && t.enumerable
            } : U
        },
        G = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        },
        F = {}.toString,
        j = "".split,
        $ = L((function() {
            return !Object("z").propertyIsEnumerable(0)
        })) ? function(e) {
            return "String" == function(e) {
                return F.call(e).slice(8, -1)
            }(e) ? j.call(e, "") : Object(e)
        } : Object,
        H = function(e) {
            return $(function(e) {
                if (null == e) throw TypeError("Can't call method on " + e);
                return e
            }(e))
        },
        B = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        },
        J = function(e, t) {
            if (!B(e)) return e;
            var i, n;
            if (t && "function" == typeof(i = e.toString) && !B(n = i.call(e))) return n;
            if ("function" == typeof(i = e.valueOf) && !B(n = i.call(e))) return n;
            if (!t && "function" == typeof(i = e.toString) && !B(n = i.call(e))) return n;
            throw TypeError("Can't convert object to primitive value")
        },
        K = {}.hasOwnProperty,
        Y = function(e, t) {
            return K.call(e, t)
        },
        z = D.document,
        X = B(z) && B(z.createElement),
        q = !k && !L((function() {
            return 7 != Object.defineProperty(("div", X ? z.createElement("div") : {}), "a", {
                get: function() {
                    return 7
                }
            }).a
        })),
        Q = Object.getOwnPropertyDescriptor,
        Z = {
            f: k ? Q : function(e, t) {
                if (e = H(e), t = J(t, !0), q) try {
                    return Q(e, t)
                } catch (e) {}
                if (Y(e, t)) return G(!W.f.call(e, t), e[t])
            }
        },
        ee = function(e) {
            if (!B(e)) throw TypeError(String(e) + " is not an object");
            return e
        },
        te = Object.defineProperty,
        ie = {
            f: k ? te : function(e, t, i) {
                if (ee(e), t = J(t, !0), ee(i), q) try {
                    return te(e, t, i)
                } catch (e) {}
                if ("get" in i || "set" in i) throw TypeError("Accessors not supported");
                return "value" in i && (e[t] = i.value), e
            }
        },
        ne = k ? function(e, t, i) {
            return ie.f(e, t, G(1, i))
        } : function(e, t, i) {
            return e[t] = i, e
        },
        re = function(e, t) {
            try {
                ne(D, e, t)
            } catch (i) {
                D[e] = t
            }
            return t
        },
        oe = D["__core-js_shared__"] || re("__core-js_shared__", {}),
        se = Function.toString;
    "function" != typeof oe.inspectSource && (oe.inspectSource = function(e) {
        return se.call(e)
    });
    var ae, le, ce, de, ue = oe.inspectSource,
        ge = D.WeakMap,
        ve = "function" == typeof ge && /native code/.test(ue(ge)),
        pe = x((function(e) {
            (e.exports = function(e, t) {
                return oe[e] || (oe[e] = void 0 !== t ? t : {})
            })("versions", []).push({
                version: "3.8.1",
                mode: "global",
                copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
            })
        })),
        he = 0,
        we = Math.random(),
        fe = pe("keys"),
        me = {},
        Ee = D.WeakMap;
    if (ve) {
        var _e = oe.state || (oe.state = new Ee),
            ye = _e.get,
            Oe = _e.has,
            Se = _e.set;
        ae = function(e, t) {
            return t.facade = e, Se.call(_e, e, t), t
        }, le = function(e) {
            return ye.call(_e, e) || {}
        }, ce = function(e) {
            return Oe.call(_e, e)
        }
    } else {
        var Te = fe[de = "state"] || (fe[de] = function(e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++he + we).toString(36)
        }(de));
        me[Te] = !0, ae = function(e, t) {
            return t.facade = e, ne(e, Te, t), t
        }, le = function(e) {
            return Y(e, Te) ? e[Te] : {}
        }, ce = function(e) {
            return Y(e, Te)
        }
    }
    var Ie = {
            set: ae,
            get: le,
            has: ce,
            enforce: function(e) {
                return ce(e) ? le(e) : ae(e, {})
            },
            getterFor: function(e) {
                return function(t) {
                    var i;
                    if (!B(t) || (i = le(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                    return i
                }
            }
        },
        Ce = x((function(e) {
            var t = Ie.get,
                i = Ie.enforce,
                n = String(String).split("String");
            (e.exports = function(e, t, r, o) {
                var s, a = !!o && !!o.unsafe,
                    l = !!o && !!o.enumerable,
                    c = !!o && !!o.noTargetGet;
                "function" == typeof r && ("string" != typeof t || Y(r, "name") || ne(r, "name", t), (s = i(r)).source || (s.source = n.join("string" == typeof t ? t : ""))), e !== D ? (a ? !c && e[t] && (l = !0) : delete e[t], l ? e[t] = r : ne(e, t, r)) : l ? e[t] = r : re(t, r)
            })(Function.prototype, "toString", (function() {
                return "function" == typeof this && t(this).source || ue(this)
            }))
        })),
        be = D,
        Ne = function(e) {
            return "function" == typeof e ? e : void 0
        },
        Ae = Math.ceil,
        Re = Math.floor,
        Ve = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? Re : Ae)(e)
        },
        xe = Math.min,
        Pe = Math.max,
        De = Math.min,
        Le = function(e) {
            return function(t, i, n) {
                var r, o, s = H(t),
                    a = (r = s.length) > 0 ? xe(Ve(r), 9007199254740991) : 0,
                    l = function(e, t) {
                        var i = Ve(e);
                        return i < 0 ? Pe(i + t, 0) : De(i, t)
                    }(n, a);
                if (e && i != i) {
                    for (; a > l;)
                        if ((o = s[l++]) != o) return !0
                } else
                    for (; a > l; l++)
                        if ((e || l in s) && s[l] === i) return e || l || 0;
                return !e && -1
            }
        },
        ke = (Le(!0), Le(!1)),
        Ue = function(e, t) {
            var i, n = H(e),
                r = 0,
                o = [];
            for (i in n) !Y(me, i) && Y(n, i) && o.push(i);
            for (; t.length > r;) Y(n, i = t[r++]) && (~ke(o, i) || o.push(i));
            return o
        },
        Me = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        We = Me.concat("length", "prototype"),
        Ge = {
            f: Object.getOwnPropertyNames || function(e) {
                return Ue(e, We)
            }
        },
        Fe = {
            f: Object.getOwnPropertySymbols
        },
        je = function(e, t) {
            return arguments.length < 2 ? Ne(be[e]) || Ne(D[e]) : be[e] && be[e][t] || D[e] && D[e][t]
        }("Reflect", "ownKeys") || function(e) {
            var t = Ge.f(ee(e)),
                i = Fe.f;
            return i ? t.concat(i(e)) : t
        },
        $e = function(e, t) {
            for (var i = je(t), n = ie.f, r = Z.f, o = 0; o < i.length; o++) {
                var s = i[o];
                Y(e, s) || n(e, s, r(t, s))
            }
        },
        He = /#|\.prototype\./,
        Be = function(e, t) {
            var i = Ke[Je(e)];
            return i == ze || i != Ye && ("function" == typeof t ? L(t) : !!t)
        },
        Je = Be.normalize = function(e) {
            return String(e).replace(He, ".").toLowerCase()
        },
        Ke = Be.data = {},
        Ye = Be.NATIVE = "N",
        ze = Be.POLYFILL = "P",
        Xe = Be,
        qe = Z.f,
        Qe = function(e, t) {
            var i, n, r, o, s, a = e.target,
                l = e.global,
                c = e.stat;
            if (i = l ? D : c ? D[a] || re(a, {}) : (D[a] || {}).prototype)
                for (n in t) {
                    if (o = t[n], r = e.noTargetGet ? (s = qe(i, n)) && s.value : i[n], !Xe(l ? n : a + (c ? "." : "#") + n, e.forced) && void 0 !== r) {
                        if (typeof o == typeof r) continue;
                        $e(o, r)
                    }(e.sham || r && r.sham) && ne(o, "sham", !0), Ce(i, n, o, e)
                }
        },
        Ze = Object.keys || function(e) {
            return Ue(e, Me)
        },
        et = W.f,
        tt = function(e) {
            return function(t) {
                for (var i, n = H(t), r = Ze(n), o = r.length, s = 0, a = []; o > s;) i = r[s++], k && !et.call(n, i) || a.push(e ? [i, n[i]] : n[i]);
                return a
            }
        },
        it = (tt(!0), tt(!1));
    Qe({
        target: "Object",
        stat: !0
    }, {
        values: function(e) {
            return it(e)
        }
    }), be.Object.values;
    var nt = function(e, t, i) {
            var n = J(t);
            n in e ? ie.f(e, n, G(0, i)) : e[n] = i
        },
        rt, ot, st, at, lt, ct, dt;
    Qe({
            target: "Object",
            stat: !0,
            sham: !k
        }, {
            getOwnPropertyDescriptors: function(e) {
                for (var t, i, n = H(e), r = Z.f, o = je(n), s = {}, a = 0; o.length > a;) void 0 !== (i = r(n, t = o[a++])) && nt(s, t, i);
                return s
            }
        }), be.Object.getOwnPropertyDescriptors,
        function(e) {
            e.DOM = "vwo_dom"
        }(rt || (rt = {})),
        function(e) {
            e.WILD_CARD = "*", e.TRIGGER = "trigger", e.POST_INIT = "post-init", e.TIMER = "vwo_timer"
        }(ot || (ot = {})),
        function(e) {
            e.URL_CHANGE = "vwo_urlChange", e.LEAVE_INTENT = "vwo_leaveIntent", e.CLICK_EVENT = "vwo_dom_click", e.SUBMIT_EVENT = "vwo_dom_submit"
        }(st || (st = {})),
        function(e) {
            e.PAGE_VIEW = "vwo_pageView"
        }(at || (at = {})),
        function(e) {
            e.EXIT_CONDITIONS = "__exitConditions"
        }(lt || (lt = {})),
        function(e) {
            e.DOM_CONTENT_LOADED = "DOMContentLoaded", e.SCROLL = "scroll", e.CLICK = "click", e.SUBMIT = "submit"
        }(ct || (ct = {})),
        function(e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARN = 2] = "WARN", e[e.ERROR = 3] = "ERROR"
        }(dt || (dt = {}));
    class ut {
        constructor(e) {
            this.setLevel(e)
        }
        setLevel(e = "warn") {
            this.logLevel = dt[e.toUpperCase()]
        }
        info(e, t = {}) {
            this.customLog(dt.INFO, e, t)
        }
        debug(e, t = {}) {
            this.customLog(dt.DEBUG, e, t)
        }
        warn(e, t = {}) {
            var i, n;
            this.customLog(dt.WARN, e, t, null === (n = null === (i = window.VWO) || void 0 === i ? void 0 : i._) || void 0 === n ? void 0 : n.customError)
        }
        error(e, t = {}) {
            var i, n;
            this.customLog(dt.ERROR, e, t, null === (n = null === (i = window.VWO) || void 0 === i ? void 0 : i._) || void 0 === n ? void 0 : n.customError)
        }
        customLog(e, t, i, n = null) {
            var r, o, s;
            if (e >= this.logLevel) {
                const a = this.formatMessage(e, t, i);
                null === (s = null === (o = null === (r = window.VWOEvents) || void 0 === r ? void 0 : r.store) || void 0 === o ? void 0 : o.actions) || void 0 === s || s.addLogsForDebugging(a), n ? n(a) : this.consoleLog(e, [a])
            }
        }
        consoleLog(e, t) {
            switch (e) {
                case dt.INFO:
                    console.info(...t);
                    break;
                case dt.WARN:
                    console.warn(...t);
                    break;
                case dt.ERROR:
                    console.error(...t);
                    break;
                default:
                    console.log(...t)
            }
        }
        formatMessage(e, t, i) {
            var n, r;
            const o = Object.keys(i).reduce(((e, t) => e.replace(new RegExp(`{{${t}}}`, "g"), i[t])), t),
                s = rt.DOM + "_";
            let a = i;
            const l = (null === (n = i.data) || void 0 === n ? void 0 : n.vwoEventName) || i.vwoEventName;
            return l !== s + ct.CLICK && l !== s + ct.SUBMIT || (a = i.data ? null === (r = i.data) || void 0 === r ? void 0 : r.props : a.props, a = a || {
                name: l
            }), `VWO: [${dt[e].toUpperCase()}] [${(new Date).toUTCString()}] ${o} ${JSON.stringify(a)}`
        }
    }
    class gt {
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
                    const [i, n = ""] = t.split("=");
                    return e[i] = n, e
                }), {}) : {},
                fragment: t[14] || "",
                urlWithoutProtocol: t[0].replace(t[3], ""),
                urlWithoutProtocolAndWww: t[0].replace(t[2], "")
            }
        }
    }
    var vt = new ut(gt.parseUrl(window.location.href).queryParams.vwoLogLevel || "error");
    const {
        toString: pt
    } = Object.prototype;

    function ht(e) {
        return "[object Object]" === pt.call(e)
    }

    function wt(e) {
        return "[object Array]" === pt.call(e)
    }

    function ft(e) {
        return "[object Null]" === pt.call(e)
    }

    function mt(e) {
        return "[object Undefined]" === pt.call(e)
    }

    function Et(e) {
        return !mt(e) && !ft(e)
    }

    function _t(e) {
        return "[object Number]" === pt.call(e)
    }

    function yt(e) {
        return "[object String]" === pt.call(e)
    }

    function Ot(e) {
        return "[object Boolean]" === pt.call(e)
    }

    function St(e) {
        return "[object Function]" === pt.call(e)
    }

    function Tt(e) {
        return "[object AsyncFunction]" === pt.call(e)
    }

    function It(e) {
        return ht(e) ? "Object" : wt(e) ? "Array" : ft(e) ? "Null" : mt(e) ? "Undefined" : function(e) {
            return e != e
        }(e) ? "NaN" : _t(e) ? "Number" : yt(e) ? "String" : Ot(e) ? "Boolean" : function(e) {
            return "[object Date]" === pt.call(e)
        }(e) ? "Date" : function(e) {
            return "[object RegExp]" === pt.call(e)
        }(e) ? "Regex" : St(e) ? "Function" : Tt(e) ? "AsyncFunction" : function(e) {
            return "[object Promise]" === pt.call(e)
        }(e) ? "Promise" : "Unknown Type"
    }
    var Ct, bt, Nt, At, Rt = new class {
        mergeNestedObjects(...e) {
            return e.reduce(((e, t) => this.recursivelyMerge(e, t)))
        }
        createNestedObjects(e, t) {
            let i = e;
            return t && t.split(".").forEach((e => {
                Object.prototype.hasOwnProperty.call(i, e) || (i[e] = {}), i = i[e]
            })), i
        }
        clearNestedObject(e, t) {
            let i = e;
            const n = t.split("."),
                r = n[n.length - 1];
            for (let e = 0; e < n.length - 1; e++) i = i[n[e]];
            ht(i[r]) ? i[r] = {} : delete i[r]
        }
        recursivelyMerge(e, t, i = {}) {
            if (ht(e) && ht(t)) {
                const n = {};
                Object.keys(e).concat(Object.keys(t)).forEach((e => {
                    n[e] = 1
                }));
                const r = Object.getOwnPropertyDescriptors(e),
                    o = Object.getOwnPropertyDescriptors(t);
                return Object.keys(n).forEach((n => {
                    o[n] ? Object.defineProperty(i, n, o[n]) : Object.defineProperty(i, n, r[n]), this.recursivelyMerge(e[n], t[n], i[n])
                })), i
            }
            return t || e
        }
    };
    ! function(e) {
        e.SETTINGS = "settings", e.CUSTOM = "custom", e.TRIGGERS = "triggers", e.TAGS = "tags", e.EVENTS = "events", e.DEBUG = "debug", e.ROOT = "root"
    }(Ct || (Ct = {})), (bt || (bt = {})).HISTORY = "history",
        function(e) {
            e.LOGS = "logs"
        }(Nt || (Nt = {})),
        function(e) {
            e.ALIAS = "$alias"
        }(At || (At = {}));
    class Vt {
        constructor() {
            this.originalValues = {
                [Ct.SETTINGS]: {},
                [Ct.CUSTOM]: {},
                [Ct.TRIGGERS]: {},
                [Ct.EVENTS]: {
                    [bt.HISTORY]: []
                },
                [Ct.DEBUG]: {
                    [Nt.LOGS]: []
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
        set(e, t, i = "") {
            const n = Rt.createNestedObjects(this.values, i);
            this.defineProperty(n, e, t)
        }
        setValues(e, t = "") {
            const i = this.getNamespace(t);
            ht(e) && Object.keys(e).forEach((t => {
                this.set(t, e, i), ht(e[t]) && this.setValues(e[t], `${i}.${t}`)
            }))
        }
        clear(e) {
            const t = this.getNamespace(e);
            Rt.clearNestedObject(this.values, t)
        }
        defineProperty(e, t, i, n = "") {
            let r = i[t];
            const o = Object.getOwnPropertyDescriptor(i, t),
                [s, ...a] = yt(r) ? r.split(".") : [],
                l = this;
            switch (s) {
                case At.ALIAS:
                    Object.defineProperty(e, t, {
                        get() {
                            const [e, ...t] = (Object.prototype.hasOwnProperty.call(o, "get") ? o.get() : "").split(".");
                            return l.getValue((t || a).join("."))
                        },
                        configurable: !0
                    });
                    break;
                default:
                    try {
                        Object.defineProperty(e, t, {
                            get: () => Object.prototype.hasOwnProperty.call(o, "get") ? o.get() : r,
                            set(e) {
                                var i;
                                JSON.stringify(r) !== JSON.stringify(e) && (r = e, Object.prototype.hasOwnProperty.call(o, "set") && (null === (i = o.set) || void 0 === i || i.call(o, e)), l.setValues(e, n ? `${n}.${t}` : t))
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    } catch (n) {
                        Vt.logger.info(n), Object.prototype.hasOwnProperty.call(e, t) || (e[t] = i[t])
                    }
            }
        }
        getNamespace(e) {
            return (null == e ? void 0 : e.startsWith(".")) ? e.substring(1) : e
        }
    }
    Vt.logger = new ut("warn");
    var xt = new Vt,
        Pt, Dt = new class {
            constructor() {
                this.plugins = {}
            }
            register(e) {
                vt.debug(`Registering plugin '${e.pluginName}' in Plugins factory`), this.plugins[e.pluginName] = e
            }
            unregister(e) {
                let t;
                t = yt(e) ? e : e.pluginName, vt.debug(`Unregistering plugin '${t}' in Plugins factory`), this.plugins[t].removeAll(), delete this.plugins[t]
            }
            unregisterAll() {
                vt.debug("Unregistering all plugins in Plugins factory"), Object.keys(this.plugins).forEach((e => {
                    this.plugins[e].removeAll(), delete this.plugins[e]
                }))
            }
        };
    ! function(e) {
        e.EVENT = "event", e.EVENT_PROPS = "eventProps", e.STORAGE = "storage", e.FORMULA = "formula", e.OPERATOR = "operator", e.TAG = "tag"
    }(Pt || (Pt = {}));
    var Lt, kt = new class {
        get(e) {
            return this[e]
        }
        set(e, t) {
            this[e] = t
        }
    };
    ! function(e) {
        e[e.EXCLUDE_PASSED = 1] = "EXCLUDE_PASSED", e[e.INCLUDE_PASSED = 2] = "INCLUDE_PASSED", e[e.INCLUDE_FAILED = 3] = "INCLUDE_FAILED"
    }(Lt || (Lt = {}));
    var Ut, Mt = Lt;
    ! function(e) {
        e.OR = "o", e.AND = "a"
    }(Ut || (Ut = {}));
    var Wt = Ut;
    class Gt {
        constructor() {
            this.experimentConfig = {}, this.pageConfig = {}, this.experimentConfigCache = {}, this.pageConfigCache = {}, this.previewParamsCleanedUrlCache = {}, Gt.cleanerRegex = /(^https?:\/\/)?(w{3}\.)?(.*?)?(\/(?:home|default|index)\.\w{3,4}|\/$)?(\/)?([?#].*)?$/i, Gt.logicalOperators = [Wt.AND, Wt.OR]
        }
        static get currentUrl() {
            return window.location.href
        }
        add(e, t) {
            if (vt.debug("Adding pageGroup config to phoenix"), Et(e) && (Object.hasOwnProperty.call(e, "ec") && e.ec.forEach((e => {
                    const t = Object.keys(e)[0];
                    this.experimentConfig[t] || (this.experimentConfig[t] = e[t])
                })), Object.hasOwnProperty.call(e, "pc") && e.pc.forEach((e => {
                    const t = Object.keys(e)[0];
                    this.pageConfig[t] || (this.pageConfig[t] = e[t])
                }))), Et(t)) {
                if (wt(t.pc)) {
                    const e = this.getCache(Gt.currentUrl, !0);
                    t.pc.forEach((t => {
                        e[t] = {
                            didMatch: !0,
                            reason: Mt.INCLUDE_PASSED,
                            cacheHit: !0
                        }
                    }))
                }
                if (wt(t.ec)) {
                    const e = this.getCache(Gt.currentUrl);
                    t.ec.forEach((t => {
                        e[t] = {
                            didMatch: !0,
                            reason: Mt.INCLUDE_PASSED,
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
            return e ? (this.previewParamsCleanedUrlCache = this.previewParamsCleanedUrlCache || {}, this.previewParamsCleanedUrlCache[e] || (this.previewParamsCleanedUrlCache[e] = kt.get("jsLibUtils").getCleanedUrl(e, !0)), this.previewParamsCleanedUrlCache[e]) : e
        }
        getIndexFileCleanedUrl(e) {
            return e ? (this.indexFileCleanedUrlCache = this.indexFileCleanedUrlCache || {}, this.indexFileCleanedUrlCache[e] || (this.indexFileCleanedUrlCache[e] = e.replace(Gt.cleanerRegex, "$1$2$3$5$6")), this.indexFileCleanedUrlCache[e]) : e
        }
        validatePage(e, t, i, n) {
            const r = t ? this.pageConfig[e] : this.experimentConfig[e];
            if (!r) return vt.info(`ConfigId ${e} is not present inside ${t?"pageConfig":"experimentConfig"}`), {
                didMatch: !1,
                reason: Mt.INCLUDE_FAILED,
                cacheHit: !1
            };
            const o = i || Gt.currentUrl,
                s = this.getCache(o, t);
            if (s && Object.hasOwnProperty.call(s, e)) return vt.info(`Fetching value from cache for ${t?"pageConfigId":"experimentConfigId"} = ${e}`), s[e].cacheHit = !0, s[e];
            let a;
            const l = r.exc,
                c = r.inc;
            if (Array.isArray(l) && l.length > 0) {
                const t = this.evaluateDSL(l, o, n || !1);
                if (t) return a = {
                    didMatch: !t,
                    reason: Mt.EXCLUDE_PASSED,
                    cacheHit: !1
                }, n || (s[e] = a), a
            }
            if (Array.isArray(c))
                if (c.length) {
                    const e = this.evaluateDSL(c, o, n || !1);
                    a = e ? {
                        didMatch: e,
                        reason: Mt.INCLUDE_PASSED,
                        cacheHit: !1
                    } : {
                        didMatch: e,
                        reason: Mt.INCLUDE_FAILED,
                        cacheHit: !1
                    }
                } else a = {
                    didMatch: !0,
                    reason: Mt.INCLUDE_PASSED,
                    cacheHit: !1
                };
            return a = a || {
                didMatch: !1,
                reason: Mt.INCLUDE_FAILED,
                cacheHit: !1
            }, n || (s[e] = a), a
        }
        evaluateDSL(e, t, i) {
            if (!wt(e) || e.length < 2) return vt.error("Invalid dsl tree", e), !1;
            const n = [];
            return e.forEach((e => {
                var r;
                let o;
                if (e || (o = !1), yt(e) && (o = e), wt(e))
                    if (Gt.logicalOperators.includes(e[0])) o = this.evaluateDSL(e, t, i);
                    else {
                        const [n, s, ...a] = e, l = null === (r = Dt.plugins[Pt.OPERATOR]) || void 0 === r ? void 0 : r.get(s);
                        let c;
                        if (n.includes("url")) c = this.getIndexFileCleanedUrl(this.getPreviewParamsCleanedUrl(t));
                        else {
                            const e = a[0];
                            c = this.validatePage(e, !0, t, i).didMatch, a[0] = !0
                        }
                        o = null == l ? void 0 : l(c, ...a, {
                            jsLibUtils: kt.get("jsLibUtils"),
                            pageUrl: !0
                        })
                    }
                n.push(o || !1)
            })), this.evaluateTree(n)
        }
        evaluateTree(e) {
            let t = !1;
            switch (e[0]) {
                case Wt.AND:
                    t = !e.includes(!1);
                    break;
                case Wt.OR:
                    t = e.includes(!0)
            }
            return t
        }
    }
    var Ft = new Gt,
        jt = new class {
            constructor() {
                const e = function(e, t) {
                    Object.defineProperty(this, e, {
                        get: t,
                        enumerable: !0
                    })
                }.bind(this);
                e("settings", (() => xt.values[Ct.SETTINGS])), e("custom", (() => xt.values[Ct.CUSTOM])), e("url", (() => window.location.href)), e("refUrl", (() => window.document.referrer))
            }
            get triggers() {
                return xt.values[Ct.TRIGGERS]
            }
            get tags() {
                return xt.values[Ct.TAGS]
            }
            get pageGroupExperimentConfig() {
                return Ft.experimentConfig
            }
            get pageGroupPageConfig() {
                return Ft.pageConfig
            }
            get events() {
                return xt.values[Ct.EVENTS]
            }
            get eventsHistory() {
                return this.events[bt.HISTORY]
            }
            get window() {
                return window
            }
            addNameSpace(e = "") {
                const t = e.split(".")[0];
                t in this || Object.defineProperty(this, t, {
                    get: () => xt.values[t],
                    configurable: !0,
                    enumerable: !0
                })
            }
            getValue(e = "") {
                return xt.getValue(e)
            }
            getHistoryEvents(e) {
                var t, i, n;
                const r = [];
                null === (t = this.events[bt.HISTORY]) || void 0 === t || t.forEach((({
                    name: t,
                    event: i
                }) => {
                    t === e && r.push(i)
                }));
                const o = null === (n = null === (i = window.VWO) || void 0 === i ? void 0 : i._) || void 0 === n ? void 0 : n.crossStore;
                let s = null == o ? void 0 : o.getLocal({
                    key: bt.HISTORY
                });
                return s && (s = JSON.parse(s)), s && s.forEach((({
                    name: t,
                    event: i
                }) => {
                    t === e && r.push(i)
                })), r
            }
        },
        $t = {
            MAX_EVENTS_HISTORY: 1e3,
            MAX_LOGS_HISTORY: 1e3,
            EVENTS_TO_PERSIST: ["s.q", "s.r"]
        },
        Ht = new class {
            refreshState(e) {
                xt.setValues(e)
            }
            clear(e) {
                xt.clear(e)
            }
            clearAll() {
                xt.reset()
            }
            addValues(e, t = "") {
                xt.setValues(e, t), t ? jt.addNameSpace(t) : Object.keys(e).forEach((e => {
                    jt.addNameSpace(e)
                }))
            }
            addEventInHistory({
                name: e,
                event: t
            }) {
                const i = xt.values[Ct.EVENTS][bt.HISTORY];
                i.push({
                    name: e,
                    event: t
                }), i.length > $t.MAX_EVENTS_HISTORY && i.shift(), $t.EVENTS_TO_PERSIST.indexOf(e) > -1 && window.fetcher.getValue("VWO._.crossStore.getLocal", [{
                    key: bt.HISTORY
                }]).then((i => {
                    let n = i;
                    n ? (n = JSON.parse(n), n.push({
                        name: e,
                        event: t
                    })) : n = [{
                        name: e,
                        event: t
                    }], window.fetcher.getValue("VWO._.crossStore.set", [bt.HISTORY, JSON.stringify(n)])
                })).catch((e => {
                    console.log(e)
                }))
            }
            addLogsForDebugging(e) {
                const t = xt.values[Ct.DEBUG][Nt.LOGS];
                t.push(e), t.length > $t.MAX_LOGS_HISTORY && t.shift()
            }
        };
    class Bt {
        refreshState(e) {
            Ht.refreshState(e)
        }
        addValues(e, t = Ct.CUSTOM) {
            Ht.addValues(e, t === Ct.ROOT ? "" : t)
        }
        set(e, t, i = Ct.CUSTOM) {
            this.addValues({
                [e]: t
            }, i)
        }
        clear(e) {
            Ht.clear(e)
        }
        clearAll() {
            Ht.clearAll()
        }
        updateSettings(e, t = "") {
            this.addValues(e, t ? `${Ct.SETTINGS}.${t}` : Ct.SETTINGS)
        }
        addEventInHistory({
            name: e,
            event: t
        }) {
            Ht.addEventInHistory({
                name: e,
                event: t
            })
        }
        addLogsForDebugging(e) {
            Ht.addLogsForDebugging(e)
        }
        updateTriggerState(e, t) {
            Ht.addValues({
                state: t
            }, `${Ct.TRIGGERS}.${e}`)
        }
        updateTagState(e, t) {
            Bt.logger.debug(`Updating tag ${e} in store' with `, t), Ht.addValues(t, `${Ct.TAGS}.${e}`)
        }
        clearTriggerState(e = "") {
            this.clear(e ? `${Ct.TRIGGERS}.${e}` : Ct.TRIGGERS)
        }
        updateTriggerExecutionCount(e, t) {
            Ht.addValues({
                executionCount: t
            }, `${Ct.TRIGGERS}.${e}`)
        }
    }
    Bt.logger = new ut("warn");
    var Jt = new Bt,
        Kt = new class {
            setStoragePlugin(e) {
                this.storagePlugin = e
            }
            reInitialize() {
                const e = this.storagePlugin.get();
                Jt.refreshState(e)
            }
        };
    const Yt = "{{survey_id}}";

    function zt(e, t) {
        if (e.filters)
            for (let i = 0; i < e.filters.length; i++)
                if ("string" != typeof e.filters[i])
                    for (let n = 0; n < e.filters[i].length; n++) e.filters[i][n] === Yt && (e.filters[i][n] = t);
        return e
    }
    var Xt = new class {
        async execute({
            callbacks: e,
            data: t,
            eventName: i
        }) {
            let n = t;
            for (let t = 0; t < e.length; t++)
                if (St(e[t]) || Tt(e[t])) {
                    const r = await e[t](n, i);
                    r && (n = r)
                }
        }
    };
    const qt = function() {
        var e, t;
        return (null === (t = null === (e = window.VWO) || void 0 === e ? void 0 : e._) || void 0 === t ? void 0 : t.performance) || window.performance
    };
    var Qt, Zt = new class {
        constructor() {
            this.events = {}, this.eventIdsMapping = {}, this.globalInterceptors = {}, this.eventId = 0, this.eventsFrequencyManager = {}
        }
        setGlobalInterceptors(e = {}) {
            this.globalInterceptors = e
        }
        async trigger(e, t = {}, i = {}) {
            e !== ot.TIMER && vt.info(`Triggering event '${e}'`, {
                data: t,
                event: this.events[e]
            }), qt().mark("event-" + e), Object.values(ot).every((t => !e.startsWith(t))) && (this.addComputedEventProps(e, t), await this.trigger(ot.WILD_CARD, t, {
                eventName: e
            }), Jt.addEventInHistory({
                name: e,
                event: t
            }));
            const n = this.events[e];
            let r;
            r = this.eventsFrequencyManager[e] ? this.eventsFrequencyManager[e].then((() => this.executeListeners(e, t, i, n))) : this.executeListeners(e, t, i, n), this.eventsFrequencyManager[e] = r, await r
        }
        async executeListeners(e, t = {}, i = {}, n) {
            const r = null == n ? void 0 : n.length;
            if (r) {
                const o = [],
                    s = n.push;
                n.push = r => {
                    s.call(n, r), o.push(new Promise((n => {
                        queueMicrotask((async () => {
                            await Xt.execute({
                                callbacks: [this.globalInterceptors.before, r.before, r.fn, this.globalInterceptors.after, r.after],
                                data: t,
                                eventName: i.eventName || e
                            }), this.eventIdsMapping[r.id].executionCount++, n(null)
                        }))
                    })))
                };
                for (let s = 0; s < r; ++s) {
                    const r = n[s];
                    vt.debug(`Synchronously executing listener for event '${r.id}' with event name '${e}'`), o.push(Xt.execute({
                        callbacks: [this.globalInterceptors.before, r.before, r.fn, this.globalInterceptors.after, r.after],
                        data: t,
                        eventName: i.eventName || e
                    }).then((() => {
                        this.eventIdsMapping[r.id].executionCount++
                    })))
                }
                await Promise.all(o), n.push = s
            } else e !== ot.TIMER && vt.debug(`No callbacks for the event ${e}. Events List in eventBus is`, this.events)
        }
        on(e, t, {
            before: i,
            after: n
        } = {}) {
            var r;
            vt.debug(`Attaching listener for event name '${e}'`);
            const o = ++this.eventId,
                s = Object.assign(Object.assign({
                    id: o,
                    fn: t
                }, i && {
                    before: i
                }), n && {
                    after: n
                });
            return this.events[e] = this.events[e] || [], this.events[e].push(s), this.eventIdsMapping[o] = {
                executionCount: 0,
                event: s
            }, null === (r = Dt.plugins[Pt.EVENT]) || void 0 === r || r.addDomEvent(e), this.eventId
        }
        off(e, t) {
            var i;
            vt.debug(`Removing a listener for event '${e}'`, {
                reference: t
            }), this.events[e] = null === (i = this.events[e]) || void 0 === i ? void 0 : i.filter((e => St(t) ? e.fn !== t : e.id !== Number(t)))
        }
        remove(e) {
            vt.debug(`Removing all the listener for event '${e}'`), this.events[e] = []
        }
        removeAll() {
            vt.debug("Removing all the listener for every event"), this.events = {}, this.eventIdsMapping = {}
        }
        event(e) {
            return {
                register(t, i) {
                    vt.debug(`Registering hooks for event ID '${e}'`, {
                        hook: t
                    }), this.eventIdsMapping[e][t] = i
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
            var i, n;
            const r = (null === (i = Dt.plugins[Pt.EVENT_PROPS]) || void 0 === i ? void 0 : i.get("*")) || {},
                o = (null === (n = Dt.plugins[Pt.EVENT_PROPS]) || void 0 === n ? void 0 : n.get(e)) || {},
                s = Object.assign(Object.assign({}, r), o);
            Object.keys(s).forEach((i => {
                t[i] = s[i](t, e)
            }))
        }
    };
    ! function(e) {
        e.AND = "a", e.OR = "o"
    }(Qt || (Qt = {}));
    var ei, ti = new class {
        evaluateExpression(e) {
            return e && this.recursivelyEvaluateTree(0, e)
        }
        recursivelyEvaluateTree(e, t) {
            if (Ot(t[e])) return Boolean(t[e]);
            if (!Et(t[e])) return !0;
            const i = 2 * (e + 1) - 1,
                n = 2 * (e + 1);
            return this.isValid(t[e], this.recursivelyEvaluateTree(i, t), this.recursivelyEvaluateTree(n, t))
        }
        isValid(e, t, i) {
            switch (e) {
                case Qt.AND:
                    return t && i;
                case Qt.OR:
                    return t || i;
                default:
                    throw new Error(e)
            }
        }
    };
    class ii {}! function(e) {
        e.EVENT = "event", e.FORMULA = "formula", e.CUSTOM = "custom", e.SETTINGS = "settings", e.DEFAULT = "default", e.STORAGE = "storage", e.WINDOW = "window", e.TAGS = "tags"
    }(ei || (ei = {}));
    var ni = new class {
            async getValue({
                event: e,
                variableName: t,
                formulaValues: i
            }) {
                return vt.debug(`Extracting value of variable '${t}'`), wt(t) ? Promise.all(t.map((async t => await this.extractVariableValue({
                    event: e,
                    variableName: t,
                    formulaValues: i
                })))) : this.extractVariableValue({
                    event: e,
                    variableName: t,
                    formulaValues: i
                })
            }
            async extractVariableValue({
                event: e,
                variableName: t,
                formulaValues: i
            }) {
                var n, r;
                vt.debug(`Extracting value of variable '${t}'`);
                const {
                    type: o,
                    key: s
                } = this.getVariableTypeAndKey(t);
                let a, l = !1;
                switch (vt.debug(`Evaluated type and key of variable '${t}' are `, {
                    type: o,
                    key: s
                }), o) {
                    case ei.EVENT:
                        a = e;
                        break;
                    case ei.FORMULA:
                        a = i;
                        break;
                    case ei.CUSTOM:
                        a = jt.custom;
                        break;
                    case ei.SETTINGS:
                        a = jt.settings;
                        break;
                    case ei.WINDOW:
                        a = this.getValueFromMtWindow(s);
                        break;
                    case ei.TAGS:
                        try {
                            a = s.startsWith("js") ? await (null === (n = Dt.plugins[Pt.TAG]) || void 0 === n ? void 0 : n.get(s).fn()) : null === (r = Dt.plugins[Pt.TAG]) || void 0 === r ? void 0 : r.get(s).fn
                        } catch (e) {}
                        break;
                    case ei.STORAGE:
                        {
                            const e = Dt.plugins[Pt.STORAGE],
                                t = s.split("."),
                                [i, n, r] = t,
                                o = null == e ? void 0 : e.get(i);a = "includes" === n ? o && o.includes ? o.includes(r) : void 0 : o && o.getItem ? o.getItem(n) : void 0;
                            break
                        }
                    default:
                        a = jt, l = !0
                }
                let c = o === ei.STORAGE || o === ei.WINDOW ? a : this.extractValue(a, s);
                return c = o === ei.TAGS ? a : c, l && mt(c) && (c = this.getValueFromMtWindow(s)), vt.debug(`Evaluated value of variable '${t}' is '${c}'`), c
            }
            async getValueFromMtWindow(e) {
                const t = window.fetcher || {
                    getValue: e => Promise.resolve(window[e])
                };
                let i;
                try {
                    i = await t.getValue(e)
                } catch (e) {}
                return i
            }
            getVariableTypeAndKey(e) {
                var t;
                vt.debug(`Getting type and key of variable '${e}'`);
                const i = e.split("."),
                    n = null === (t = i.splice(0, 1)[0]) || void 0 === t ? void 0 : t.toLowerCase();
                return Object.values(ei).includes(n) ? {
                    type: n,
                    key: i.join(".")
                } : {
                    type: ei.DEFAULT,
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
        },
        ri = new class {
            sum(e, t) {
                return e.reduce(((e, i) => e + t.reduce(((e, t) => e + (Number(i[t]) || 0)), 0)), 0)
            }
            multiply(e, t) {
                return e.reduce(((e, i) => e + t.reduce(((e, t) => e * (Number(i[t]) || 1)), 1)), 1)
            }
        };
    class oi {
        static ordered(e, t) {
            const i = oi.getTriggerConditionsOrderState(e.id);
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                if (!i[r] && !e.currentSatisfiedConditions[r]) return !1;
                i[r] = !0, Jt.updateTriggerState(oi.generateTriggerOrderingNamespace(e.id), i)
            }
            return !0
        }
        static strict(e, t) {
            const i = Object.keys(oi.getTriggerConditionsOrderState(e.id)).map((e => Number(e))).sort(((e, i) => t.indexOf(e) - t.indexOf(i))),
                n = Object.keys(e.currentSatisfiedConditions).filter((t => Boolean(e.currentSatisfiedConditions[t]))).map((e => Number(e))).sort(((e, i) => t.indexOf(e) - t.indexOf(i))),
                r = [...i, ...n].slice(0, t.length);
            let o = {};
            for (let i = 0; i < r.length; i++) {
                if (t[i] !== r[i]) {
                    o = {};
                    for (let e = 0; e < n.length && t[e] === n[e]; e++) o[n[e]] = !0;
                    return Jt.updateTriggerState(oi.generateTriggerOrderingNamespace(e.id), o), !1
                }
                o[r[i]] = !0
            }
            return Jt.updateTriggerState(oi.generateTriggerOrderingNamespace(e.id), o), r.length === t.length
        }
        static generateTriggerOrderingNamespace(e) {
            return e + ".order"
        }
        static getTriggerConditionsOrderState(e) {
            return jt.getValue(`${Ct.TRIGGERS}.${this.generateTriggerOrderingNamespace(e)}.state`) || {}
        }
    }
    var si = {
        sum: ri.sum,
        multiply: ri.multiply,
        ordered: oi.ordered,
        strict: oi.strict
    };
    const ai = {
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
        li = {
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
    class ci extends ii {
        constructor() {
            super(), this.pluginName = Pt.FORMULA, this.formulas = {}, this.initialize()
        }
        add(e, t) {
            vt.debug(`Adding formula '${e}' in FormulasManager`), this.formulas[e] ? vt.error(ai.FORMULAS.ALREADY_EXISTS, {
                formulaName: e
            }) : this.formulas[e] = t
        }
        update(e, t) {
            vt.debug(`Updating formula '${e}' in FormulasManager`), this.formulas[e] = t
        }
        get(e) {
            return vt.debug(`Getting formula '${e}' in FormulasManager`), this.formulas[e] ? this.formulas[e] : (vt.error(ai.FORMULAS.NOT_REGISTERED, {
                formulaName: e
            }), null)
        }
        remove(e) {
            vt.debug(`Removing formula '${e}' in FormulasManager`), this.formulas[e] ? delete this.formulas[e] : vt.warn(li.FORMULAS.NO_FORMULA_TO_REMOVE, {
                formulaName: e
            })
        }
        removeAll() {
            vt.debug("Removing all formulas in FormulasManager"), this.formulas = {}
        }
        initialize() {
            Object.keys(si).forEach((e => {
                this.add(e, si[e])
            }))
        }
    }
    var di = new class {
            evaluate(e = [], t) {
                const i = {};
                return e.forEach((e => {
                    const n = this.evaluateFormulaExpression(e, t);
                    i[e.id] = n
                })), i
            }
            evaluateFilter(e, t) {
                return e.reduce(((e, t) => this.evaluateFormulaExpression(t, e)), t)
            }
            evaluateArgs(e, t) {
                return e.map((e => this.evaluateFormulaExpression(e, t)))
            }
            evaluateFormulaExpression(e, t) {
                var i;
                return (e.fn || (null === (i = Dt.plugins[Pt.FORMULA]) || void 0 === i ? void 0 : i.get(e.type)))(Et(e.filters) ? this.evaluateFilter(e.filters, t) : t, Et(e.args) ? e.args.map((e => ht(e) ? this.evaluateArgs([e], t)[0] : e)) : e.args)
            }
        },
        ui = new class {
            constructor() {
                this.serializeValidationQueue = {}
            }
            async isValid(e, t, i, n, r = {}) {
                vt.debug(`Checking validity of trigger '${e}'`, {
                    trigger: t,
                    event: i,
                    eventName: n
                }), this.saveEventState(e, n, !0);
                const {
                    isValid: o,
                    shouldRemoveEventListener: s
                } = await this.validateTrigger(t, i, {
                    eventName: n,
                    triggerName: e,
                    exitTriggersMet: r
                });
                return this.saveTriggerState(e, this.hasTriggerMetBefore(e) || o), {
                    isValid: o,
                    shouldRemoveEventListener: s
                }
            }
            async validateTrigger(e, t, {
                eventName: i,
                triggerName: n,
                skipEventProps: r,
                exitTriggersMet: o,
                skipValidationIfTimer: s
            } = {}, a) {
                return n ? (this.serializeValidationQueue[n] = this.serializeValidationQueue[n] || Promise.resolve(), this.serializeValidationQueue[n] = this.serializeValidationQueue[n].then((() => this.validateTriggerHandler(e, t, {
                    eventName: i,
                    triggerName: n,
                    skipEventProps: r,
                    exitTriggersMet: o,
                    skipValidationIfTimer: s
                }, a))), this.serializeValidationQueue[n]) : this.validateTriggerHandler(e, t, {
                    eventName: i,
                    triggerName: n,
                    skipEventProps: r,
                    exitTriggersMet: o,
                    skipValidationIfTimer: s
                }, a)
            }
            async validateTriggerHandler(e, t, {
                eventName: i,
                triggerName: n,
                skipEventProps: r,
                exitTriggersMet: o,
                skipValidationIfTimer: s
            } = {}, a) {
                var l;
                if (!e || !ht(e)) return {
                    isValid: !0,
                    shouldRemoveEventListener: !1
                };
                if (s) {
                    const {
                        cnds: t
                    } = e, i = t.length;
                    for (let e = 0; e < i; ++e) {
                        const i = t[e];
                        if (ht(i) && i.event === ot.TIMER) return {
                            isValid: !0,
                            shouldRemoveEventListener: !1
                        }
                    }
                }
                const c = {};
                let d = !1;
                if (i) {
                    const {
                        cnds: o
                    } = e, s = o.length;
                    for (let e = 0; e < s; ++e) {
                        const s = o[e];
                        if (a && ht(s) && zt(s, a), ht(s) && s.event === i && await this.validateTriggerOperand(s, t, {
                                eventName: i,
                                triggerName: n,
                                skipEventProps: r
                            })) {
                            d = !0;
                            break
                        }
                    }
                } else d = !0;
                const u = null === (l = e.cnds) || void 0 === l ? void 0 : l.map((async e => {
                        if (yt(e)) return e;
                        if (!e) return null;
                        let o = !0,
                            s = !1;
                        if (n) {
                            if (!1 !== e.persistState && this.hasConditionMetBefore(n, e.id)) return vt.debug("Trigger condition already met before. Skipping it's validation.", {
                                triggerName: n,
                                conditionId: e.id
                            }), !0;
                            o = this.hasEventOccurred(n, e.event), e.hist && e.event !== i && (s = !0), o || vt.debug("Event hasn't occurred before. Skipping it's validation.", {
                                triggerName: n,
                                event: e.event
                            })
                        }
                        const a = (o || s) && await this.validateTriggerOperand(e, e.event === i ? t : {
                            fromLocalStorage: !0
                        }, {
                            eventName: e.event,
                            skipEventProps: r,
                            triggerName: n
                        });
                        return n && this.saveConditionState(n, e.id, a), a && !1 !== e.persistState && (c[e.id] = !0), a
                    })),
                    g = await Promise.all(u);
                vt.debug("Generated tree conditions for trigger", {
                    triggerName: n,
                    treeConditions: g
                });
                const v = !e.formula || e.formula.every((e => {
                        var t, i;
                        return null === (i = null === (t = Dt.plugins[Pt.FORMULA]) || void 0 === t ? void 0 : t.get(e.type)) || void 0 === i ? void 0 : i({
                            id: n,
                            currentSatisfiedConditions: c
                        }, e.args)
                    })),
                    p = this.shouldRemoveEventListener(i, e.cnds, g, o);
                return {
                    isValid: d && v && ti.evaluateExpression(g),
                    shouldRemoveEventListener: p
                }
            }
            async validateTriggerOperand({
                filters: e,
                formula: t,
                id: i,
                hist: n
            }, r, {
                eventName: o,
                triggerName: s,
                skipEventProps: a = !1
            } = {}) {
                var l;
                const c = di.evaluate(t, [r]);
                if (n && Object.keys(n).length && o && r) {
                    const e = window.VWO.modules.eventHistHandler.getEventsByDate(o, n.dr, r);
                    let t;
                    if (null === (l = n.pf) || void 0 === l ? void 0 : l.length) {
                        const i = this.evaluateDSL.bind(this),
                            r = null == e ? void 0 : e.map((async e => i(n.pf, {
                                triggerName: s,
                                eventName: o,
                                event: e,
                                formulaValues: c
                            })));
                        t = r && await Promise.all(r), t = e.filter(((e, i) => t[i]))
                    } else t = e;
                    Object.keys(n.data).length && (r._meta = window.VWO.modules.eventHistHandler.getCumulativeData(t, n.data))
                }
                const d = null == e ? void 0 : e.map((async (e, t) => {
                        var n, l, d, u, g;
                        if (yt(e)) return e;
                        const v = null === (u = null === (d = null === (l = null === (n = r) || void 0 === n ? void 0 : n.preComputedConds) || void 0 === l ? void 0 : l[s]) || void 0 === d ? void 0 : d[i]) || void 0 === u ? void 0 : u[t];
                        if ("boolean" == typeof v) return v;
                        const [p, h, ...w] = e;
                        if (a && p.startsWith(ei.EVENT + ".")) return !0;
                        const f = await ni.getValue({
                                event: r,
                                variableName: p,
                                formulaValues: c
                            }),
                            m = null === (g = Dt.plugins[Pt.OPERATOR]) || void 0 === g ? void 0 : g.get(h);
                        return await (null == m ? void 0 : m(f, ...w, {
                            eventName: o,
                            triggerName: s,
                            jsLibUtils: kt.get("jsLibUtils")
                        })) || !1
                    })),
                    u = d && await Promise.all(d);
                return !u || this.evaluateFilterExpression(u)
            }
            evaluateFilterExpression(e) {
                if (!Ot(e[0])) return ti.evaluateExpression(e);
                for (let t = e.length - 1; t >= 0; --t)
                    if (!e[t]) return !1;
                return !0
            }
            hasEventOccurred(e, t) {
                return Boolean(jt.getValue(`${Ct.TRIGGERS}.${this.generateTriggerEventId(e,t)}.state`))
            }
            hasConditionMetBefore(e, t) {
                return Boolean(jt.getValue(`${Ct.TRIGGERS}.${this.generateTriggerConditionId(e,t)}.state`))
            }
            hasTriggerMetBefore(e) {
                return Boolean(jt.getValue(`${Ct.TRIGGERS}.${e}.state`))
            }
            saveTriggerState(e, t) {
                Jt.updateTriggerState(e, t)
            }
            saveEventState(e, t, i) {
                vt.debug("Saving trigger event's state i.e. it's event occurred or not.", {
                    triggerName: e,
                    eventName: t,
                    state: i
                }), Jt.updateTriggerState(this.generateTriggerEventId(e, t), i)
            }
            saveConditionState(e, t, i) {
                vt.debug("Saving trigger condition's state i.e. it's condition satisfied or not.", {
                    triggerName: e,
                    conditionId: t,
                    state: i
                }), Jt.updateTriggerState(this.generateTriggerConditionId(e, t), i)
            }
            generateTriggerConditionId(e, t) {
                return `${e}.trigger.${t}`
            }
            generateTriggerEventId(e, t) {
                return `${e}.event.${t}`
            }
            shouldRemoveEventListener(e, t, i, n) {
                return e === ot.TIMER && t.every(((e, t) => !(ht(e) && e.event === ot.TIMER && !n[e.exitTrigger] && !i[t])))
            }
            async evaluateDSL(e, {
                triggerName: t,
                eventName: i,
                event: n,
                formulaValues: r
            }) {
                if (wt(e) && e.length > 1) {
                    const o = e.map((async e => {
                            var o;
                            let s;
                            if (e || (s = !1), yt(e) && (s = e), wt(e))
                                if ([Wt.AND, Wt.OR].includes(e[0])) s = this.evaluateDSL(e, {
                                    triggerName: t,
                                    eventName: i,
                                    event: n,
                                    formulaValues: r
                                });
                                else {
                                    const [a, l, ...c] = e, d = null === (o = Dt.plugins[Pt.OPERATOR]) || void 0 === o ? void 0 : o.get(l), u = await ni.getValue({
                                        event: n,
                                        variableName: a,
                                        formulaValues: r
                                    });
                                    s = await (null == d ? void 0 : d(u, ...c, {
                                        eventName: i,
                                        triggerName: t,
                                        jsLibUtils: kt.get("jsLibUtils")
                                    })) || !1
                                }
                            return s
                        })),
                        s = o && await Promise.all(o);
                    return this.evaluateTree(s)
                }
                return !1
            }
            evaluateTree(e) {
                let t = !1;
                switch (e[0]) {
                    case Wt.AND:
                        t = !e.includes(!1);
                        break;
                    case Wt.OR:
                        t = e.includes(!0)
                }
                return t
            }
        },
        gi = new class {
            constructor() {
                this.triggerEventListeners = {}
            }
            initialize(e) {
                Object.keys(e).forEach((t => {
                    this.triggerEventListeners[t] ? Jt.updateTriggerExecutionCount(t, 0) : this.add(t, e[t])
                }))
            }
            add(e, t, i) {
                var n;
                vt.debug(`Attaching event listeners for all the events using in '${e}' trigger conditions.`);
                const r = {};
                this.triggerEventListeners[e] = this.triggerEventListeners[e] || {}, null === (n = null == t ? void 0 : t.cnds) || void 0 === n || n.forEach((n => {
                    var o;
                    if (ht(n)) {
                        if (i && zt(n, i), !this.triggerEventListeners[e][n.event]) {
                            null === (o = Dt.plugins[Pt.EVENT]) || void 0 === o || o.updateConditions(n.event, [this.extractDomEventFromCondition(e, n)]), n.persistState && this.executeTriggerValidatorOfHistoryEvents(e, t, n.event), n.hist && (window.VWO.modules.eventHistHandler.triggerEvents.push({
                                triggerName: e,
                                trigger: t,
                                eventName: n.event
                            }), this.validateEventFromHistHandler(e, t, n.event));
                            const i = Zt.on(n.event, (async (n, r) => {
                                await this.validateAndDispatchTriggerEvent(e, t, n, r, i)
                            }));
                            this.triggerEventListeners[e][n.event] = i
                        }
                        if (n.exitTrigger) {
                            const i = this.getTriggerEventName(n.exitTrigger),
                                o = Zt.on(i, (s => {
                                    r[n.exitTrigger] = 1;
                                    const a = this.triggerEventListeners[e][n.event];
                                    this.validateAndDispatchTriggerEvent(e, t, s, n.event, a, r), Zt.off(i, o)
                                }));
                            this.triggerEventListeners[e][i] = o
                        }
                    }
                }))
            }
            async validateTriggerFromHistory(e, t) {
                var i;
                const n = null === (i = null == t ? void 0 : t.cnds) || void 0 === i ? void 0 : i.map((async i => {
                        var n;
                        if (null === (n = i) || void 0 === n ? void 0 : n.event) {
                            const n = jt.getHistoryEvents(i.event);
                            let r = !1;
                            const o = n.map((async n => {
                                const {
                                    isValid: o
                                } = await ui.isValid(e, t, n, i.event);
                                o && (r = o)
                            }));
                            return await Promise.all(o), r
                        }
                        return i
                    })),
                    r = await Promise.all(n);
                return ti.evaluateExpression(r)
            }
            executeTriggerValidatorOfHistoryEvents(e, t, i) {
                jt.getHistoryEvents(i).forEach((n => this.validateAndDispatchTriggerEvent(e, t, n, i)))
            }
            async validateEventFromHistHandler(e, t, i) {
                window.VWO.modules.eventHistHandler.eventHist[i] && await ui.isValid(e, t, {
                    isCustomEvent: !0,
                    fromLocalStorage: !0
                }, i)
            }
            async validateAndDispatchTriggerEvent(e, t, i, n, r, o) {
                let s = this.getExecutionCount(e) || 0;
                if (t.occurrence && t.occurrence <= s) return;
                const {
                    isValid: a,
                    shouldRemoveEventListener: l
                } = await ui.isValid(e, t, i, n, o);
                if (l && Zt.off(n, r), a) {
                    if (s = this.getExecutionCount(e) || 0, t.occurrence && t.occurrence <= s) return;
                    Jt.updateTriggerExecutionCount(e, s + 1), await Zt.trigger(this.getTriggerEventName(e), i)
                }
            }
            remove(e) {
                vt.debug(`Removing event listeners of trigger '${e}'`), Object.entries(this.triggerEventListeners[e]).forEach((([e, t]) => {
                    Zt.off(e, t)
                })), delete this.triggerEventListeners[e]
            }
            removeAll() {
                Object.keys(this.triggerEventListeners).forEach((e => {
                    this.remove(e)
                }))
            }
            extractDomEvents(e) {
                vt.debug("Extracting DOM events from triggers config");
                const t = {};
                return Object.keys(e).forEach((i => {
                    var n, r;
                    null === (r = null === (n = e[i]) || void 0 === n ? void 0 : n.cnds) || void 0 === r || r.forEach((e => {
                        ht(e) && this.extractDomEventFromCondition(i, e) && (t[e.event] = t[e.event] || [], t[e.event].push(Object.assign(Object.assign({}, e), {
                            triggerName: i
                        })))
                    }))
                })), t
            }
            extractDomEventFromCondition(e, t) {
                return t.event.toLowerCase().includes(rt.DOM + "_") ? Object.assign(Object.assign({}, t), {
                    triggerName: e
                }) : null
            }
            getTriggerEventName(e) {
                return `${ot.TRIGGER}.${e}`
            }
            getExecutionCount(e) {
                const t = jt.getValue(`${Ct.TRIGGERS}.${e}.executionCount`);
                return null != t ? t : 0
            }
        },
        vi = {
            log: (new class {
                log({
                    event: e,
                    data: t,
                    getters: i,
                    actions: n,
                    vwoEvents: r
                }) {
                    console.log(e, t, i, n, r)
                }
            }).log
        },
        pi = Object.freeze({
            __proto__: null,
            default: vi
        });
    class hi extends ii {
        constructor() {
            super(), this.pluginName = Pt.TAG, this.tags = {}, this.initialize()
        }
        add(e, t, {
            occurrence: i,
            scope: n,
            sync: r
        } = {}) {
            vt.debug(`Adding tag '${e}' in TagsManager`), this.tags[e] ? vt.error(ai.TAGS.ALREADY_EXISTS, {
                tagName: e
            }) : this.tags[e] = {
                fn: t,
                occurrence: i,
                scope: n,
                sync: r
            }
        }
        update(e, t, {
            occurrence: i,
            scope: n,
            sync: r,
            fireUniquelyForEveryEvent: o
        } = {}) {
            vt.debug(`Updating tag '${e}' in TagsManager`), this.tags[e] = {
                fn: t,
                occurrence: i,
                scope: n,
                sync: r,
                fireUniquelyForEveryEvent: o
            }
        }
        get(e) {
            return vt.debug(`Getting tag '${e}' in TagsManager`), this.tags[e] ? this.tags[e] : (vt.error(ai.TAGS.NOT_REGISTERED, {
                tagName: e
            }), null)
        }
        remove(e) {
            vt.debug(`Removing tag '${e}' in TagsManager`), this.tags[e] ? delete this.tags[e] : vt.warn(li.TAGS.NO_TAG_TO_REMOVE, {
                tagName: e
            })
        }
        removeAll() {
            vt.debug("Removing all tags in TagsManager"), this.tags = {}
        }
        initialize() {
            Object.keys(pi).forEach((e => {
                this.add(e, pi[e])
            }))
        }
    }
    var wi = new class {
        flushTagData(e, t) {
            delete e[t]
        }
        async executeTagUniquelyForEveryEventAndFlushData(e) {
            if (!e || !this._vwoEventsInstance) return;
            const t = this._vwoEventsInstance[e];
            if (!t || !t.tags) return;
            const i = [];
            Object.keys(t.tags).forEach((e => {
                const n = t.tags[e];
                if (n) {
                    const r = n.data,
                        o = this.getTagDetails(e).fn({
                            data: r,
                            event: t.event,
                            getters: jt,
                            actions: Jt,
                            vwoEvents: this._vwoEventsInstance
                        });
                    i.push(o)
                }
            })), await Promise.all(i), this.flushTagData(this._vwoEventsInstance, e)
        }
        async execute(e, t, i, n, r) {
            var o, s;
            this._vwoEventsInstance = r;
            const a = "metric" === t.id ? t.data : await ni.getValue({
                    variableName: `${Ct.SETTINGS}.${t.data}`
                }),
                l = this.generateTagId(t.id),
                c = jt.tags[l].executionCount || 0,
                d = this.getTagDetails(t.id);
            if (!_t(d.occurrence) || c < d.occurrence) {
                vt.info(`Started executing tag '${t.id}' because of:`, i), Jt.updateTagState(l, {
                    hasExecuted: !0,
                    executionCount: (jt.tags[l].executionCount || 0) + 1,
                    stoppedByExitCondition: !1
                }), qt().mark("tag-" + t.id);
                const r = i.name;
                if (this._vwoEventsInstance[r] = this._vwoEventsInstance[r] || {}, r && n.fireUniquelyForEveryEvent) return this._vwoEventsInstance[r].event = this._vwoEventsInstance[r].event || i, this._vwoEventsInstance[r].tags = this._vwoEventsInstance[r].tags || {}, this._vwoEventsInstance[r].tags[t.id] = this._vwoEventsInstance[r].tags[t.id] || {}, this._vwoEventsInstance[r].tags[t.id].data = this._vwoEventsInstance[r].tags[t.id].data || [], void this._vwoEventsInstance[r].tags[t.id].data.push(a);
                n.sync || await Promise.resolve();
                const c = null === (s = null === (o = d.fn) || void 0 === o ? void 0 : o.type) || void 0 === s ? void 0 : s.startsWith("vwoWrappedFn");
                await d.fn({
                    data: a,
                    event: i,
                    getters: jt,
                    actions: Jt,
                    vwoEvents: c ? null : e
                })
            } else vt.info(`Maximum occurrence of ${d.occurrence} has reached. Skipping executing tag '${t.id}'`)
        }
        generateTagId(e) {
            return "" + e
        }
        getTagDetails(e) {
            var t;
            return null === (t = Dt.plugins[Pt.TAG]) || void 0 === t ? void 0 : t.get(e)
        }
    };
    let fi = 0;
    var mi = new class {
        constructor() {
            this.rulesMap = {}
        }
        initialize(e, t) {
            this.vwoEventsInstance = e, Object.keys(t).forEach((e => {
                this.remove(e), this.add(t[e], e)
            }))
        }
        add(e, t) {
            (wt(e.triggers) ? e.triggers : [e.triggers]).forEach((i => {
                this.rulesMap[i] ? vt.debug(`Skipping adding the listeners for trigger ${i} as rulesMap exist`) : this.attachTriggersListeners(this.vwoEventsInstance, i), this.rulesMap[i] = this.rulesMap[i] || [], e.tags.forEach((n => {
                    this.rulesMap[i].push(Object.assign(Object.assign({}, e), {
                        id: t,
                        tags: [n]
                    }))
                })), this.sortPriorityRuleTags(i)
            }))
        }
        remove(e) {
            vt.debug(`Removing all event listeners of rule '${e}'`), Object.keys(this.rulesMap).forEach((t => {
                this.rulesMap[t] = this.rulesMap[t].filter((t => t.id !== e))
            }))
        }
        removeAll() {
            Object.keys(this.rulesMap).forEach((e => {
                Zt.remove(gi.getTriggerEventName(e)), delete this.rulesMap[e]
            }))
        }
        generateRandomRuleId() {
            return fi++, "rule_" + fi
        }
        attachTriggersListeners(e, t) {
            Zt.on(gi.getTriggerEventName(t), (async i => {
                const n = this.rulesMap[t].map((t => t.tags.map((async n => {
                    var r, o, s;
                    const a = Et(n.shouldConsiderParentExitCondition) ? n.shouldConsiderParentExitCondition : t.shouldConsiderParentExitCondition,
                        l = this.getExitConditions(i, t.exitCondition, n.exitCondition, a),
                        c = await this.shouldExit(i, l),
                        d = wi.generateTagId(n.id);
                    if (Jt.updateTagState(d, {
                            stoppedByExitCondition: c,
                            lastExitConditions: l
                        }), c) vt.info(`Exit condition(s) met. Not executing tag '${n.id}'`, l);
                    else {
                        const t = null === (o = null === (r = this.vwoEventsInstance.tags) || void 0 === r ? void 0 : r.tags) || void 0 === o ? void 0 : o[n.id];
                        await wi.execute(Object.assign(Object.assign({}, e), {
                            [lt.EXIT_CONDITIONS]: l
                        }), n, i, {
                            sync: t.sync || (null === (s = i.props) || void 0 === s ? void 0 : s.fireLinkedTagSync),
                            fireUniquelyForEveryEvent: t.fireUniquelyForEveryEvent
                        }, e)
                    }
                }))));
                await Promise.all(Array.prototype.concat.apply([], n))
            }))
        }
        sortPriorityRuleTags(e) {
            this.rulesMap[e].sort(((e, t) => {
                const i = e.tags[0],
                    n = t.tags[0];
                return (Et(i.priority) && -1 !== i.priority ? i.priority : 1 / 0) - (Et(n.priority) && -1 !== n.priority ? n.priority : 1 / 0)
            }))
        }
        assignExecutionProperty(e) {
            const t = this.rulesMap[e],
                i = {},
                n = ["sync", "fireUniquelyForEveryEvent"];
            for (let e = t.length - 1; e >= 0; e--) {
                const r = t[e].tags[0],
                    o = i[r.id] || wi.getTagDetails(r.id);
                Object.keys(n).forEach((e => {
                    const t = n[e];
                    r[t] = o[t]
                })), i[r.id] = o
            }
        }
        getExitConditions(e, t, i, n = !0) {
            const r = n ? [...e[lt.EXIT_CONDITIONS] || []] : [];
            return t && r.push(t), i && r.push(i), r
        }
        async shouldExit(e, t = []) {
            const i = t.length;
            for (let n = 0; n < i; ++n) {
                const i = t[n];
                if (await ui.validateTriggerOperand({
                        filters: i
                    }, e)) return !0
            }
            return !1
        }
    };
    class Ei {
        static get(e) {
            const t = document.cookie.split("; ").find((t => t.startsWith(e + "=")));
            return (null == t ? void 0 : t.split("=")[1]) || ""
        }
        static expire(e) {
            document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }
    }
    class _i {
        static init() {
            _i.actualReferrer = Ei.get("_vwo_referrer"), Ei.expire("_vwo_referrer"), "string" != typeof _i.actualReferrer && (_i.actualReferrer = document.referrer)
        }
        static get() {
            return -1 === window.location.search.search("_vwo_test_ref") ? document.referrer : _i.actualReferrer
        }
    }
    _i.actualReferrer = "";
    class yi {
        static get() {
            const {
                queryParams: e
            } = gt.parseUrl(document.URL);
            let t, i;
            const n = _i.get();
            if (/facebook\.com|quora\.com|reddit\.com|imgur\.com|tapiture\.com|disqus\.com|9gag\.com|tumblr\.com|plus\.google|stumbleupon\.com|twitter\.com|linkedin|del\.icio\.us|delicious\.com|technorati|digg\.com| hootsuite|stumbleupon|myspace|bit\.ly|tr\.im|tinyurl|ow\.ly|reddit|m\.facebook\.com|youtube|flickr|pinterest\.com|^t\.co$|tweetdeck/.test(n)) return "soc";
            yi.organicReferralSource() && (t = !0);
            const {
                gclid: r,
                utm_medium: o
            } = e;
            if (n && (i = !0), t && r) return "pst";
            if (o) {
                if ("email" === (null == o ? void 0 : o.toString().toLowerCase())) return "eml";
                if (null == o ? void 0 : o.toString().match(new RegExp("^(?:cpc|ppc|cpa|cpm|cpv|cpp)$", "i"))) return "pst"
            } else if (t) return "org";
            return i ? "ref" : "dir"
        }
        static organicReferralSource() {
            for (let e = 0; e < yi.organicReferrals.length; e++)
                if (-1 !== _i.get().indexOf(yi.organicReferrals[e].s)) return yi.organicReferrals[e].i;
            return 0
        }
    }
    yi.organicReferrals = [{
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
    }];
    const Oi = {
        get url() {
            return window.location.href
        },
        get refUrl() {
            return _i.get()
        },
        get trafficSource() {
            return yi.get()
        },
        get queryParams() {
            return gt.parseUrl(window.location.href).queryParams
        },
        get timeSpent() {
            const e = Date.now();
            return Math.floor((Date.now() - e) / 1e3)
        },
        get scroll() {
            var e, t;
            const {
                scrollY: i,
                innerHeight: n
            } = window, r = 100 * i / ((null === (e = document.body) || void 0 === e ? void 0 : e.offsetHeight) - n);
            return {
                pxTop: i,
                pxBottom: (null === (t = document.body) || void 0 === t ? void 0 : t.offsetHeight) - n - i,
                top: r,
                bottom: 100 - r
            }
        },
        get operatingSystem() {
            var e;
            const {
                visitorDetails: t
            } = Oi;
            if (null === (e = null == t ? void 0 : t.UA) || void 0 === e ? void 0 : e.os) return t.UA.os;
            const {
                appVersion: i
            } = window.navigator;
            return i.includes("Win") ? "windows" : i.includes("Mac") ? "macOS" : i.includes("X11") ? "unix" : i.includes("Linux") ? "linux" : ""
        },
        get browser() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.UA) || void 0 === t ? void 0 : t.br
        },
        get visitorDetails() {
            var e, t, i, n;
            return (null === (n = null === (i = null === (t = null === (e = window.VWO) || void 0 === e ? void 0 : e._) || void 0 === t ? void 0 : t.allSettings) || void 0 === i ? void 0 : i.dataStore) || void 0 === n ? void 0 : n.plugins) || {}
        },
        get userAgent() {
            return navigator.userAgent
        },
        get deviceType() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.UA) || void 0 === t ? void 0 : t.dt
        },
        get deviceName() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.UA) || void 0 === t ? void 0 : t.de
        },
        get day() {
            return (new Date).getDay().toString()
        },
        get hour() {
            return (new Date).getHours()
        },
        get visitorType() {
            var e, t;
            const i = null === (t = null === (e = window.VWO) || void 0 === e ? void 0 : e.data) || void 0 === t ? void 0 : t.vi;
            return (null == i ? void 0 : i.vt) || "new"
        },
        get oldVisitorType() {
            var e, t;
            const i = null === (t = null === (e = window.VWO) || void 0 === e ? void 0 : e.data) || void 0 === t ? void 0 : t.vi;
            return (null == i ? void 0 : i.vt) || "new"
        },
        get ip() {
            var e;
            return null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.IP
        },
        get country() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.GEO) || void 0 === t ? void 0 : t.cn
        },
        get countryCode() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.GEO) || void 0 === t ? void 0 : t.cc
        },
        get city() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.GEO) || void 0 === t ? void 0 : t.c
        },
        get region() {
            var e, t;
            return null === (t = null === (e = Oi.visitorDetails) || void 0 === e ? void 0 : e.GEO) || void 0 === t ? void 0 : t.r
        },
        get loc() {
            var e, t, i;
            const {
                visitorDetails: n
            } = Oi;
            return {
                countryCode: null === (e = null == n ? void 0 : n.GEO) || void 0 === e ? void 0 : e.cc,
                city: null === (t = null == n ? void 0 : n.GEO) || void 0 === t ? void 0 : t.c,
                region: null === (i = null == n ? void 0 : n.GEO) || void 0 === i ? void 0 : i.r
            }
        }
    };
    var Si;
    ! function(e) {
        e.LOCAL_STORAGE = "localStorage", e.LOCAL_STORAGE_SERVICE = "localStorageService"
    }(Si || (Si = {}));
    var Ti, Ii, Ci = new class extends class {} {
            constructor() {
                super(), this.storageName = Si.LOCAL_STORAGE
            }
            get() {
                return window.localStorage
            }
            getItem(e) {
                return window.localStorage.getItem(e)
            }
            set(e) {
                Object.keys(e).forEach((t => {
                    window.localStorage.setItem(t, e[t])
                }))
            }
            setItem(e, t) {
                window.localStorage.setItem(e, t)
            }
            deleteAll() {
                window.localStorage.clear()
            }
            deleteItem(e) {
                window.localStorage.removeItem(e)
            }
            includes() {
                return 0
            }
        },
        bi = Object.freeze({
            __proto__: null,
            localStorage: Ci
        });
    class Ni extends ii {
        constructor() {
            super(), this.pluginName = Pt.STORAGE, this.storages = {}, this.initialize()
        }
        add(e, t) {
            vt.debug(`Adding storage plugin '${t.storageName}' in StoragesManager`), this.storages[e] ? vt.error(ai.STORAGES.ALREADY_EXISTS, {
                storageName: e
            }) : this.storages[e] = t
        }
        update(e, t) {
            vt.debug(`Updating storage plugin '${e}' in StoragesManager`), this.storages[e] = t
        }
        get(e) {
            return vt.debug(`Getting storage plugin '${e}' in StoragesManager`), this.storages[e] ? this.storages[e] : (vt.error(ai.STORAGES.NOT_REGISTERED, {
                storageName: e
            }), null)
        }
        remove(e) {
            vt.debug(`Removing storage plugin '${e}' in StoragesManager`), this.storages[e] ? delete this.storages[e] : vt.warn(li.STORAGES.NO_STORAGE_TO_REMOVE, {
                storageName: e
            })
        }
        removeAll() {
            vt.debug("Removing all storage plugins in StoragesManager"), this.storages = {}
        }
        initialize() {
            Object.keys(bi).forEach((e => {
                this.add(e, bi[e])
            }))
        }
    }
    class Ai extends ii {
        constructor(e, {
            globals: t = {}
        } = {}) {
            super(), this.pluginName = Pt.EVENT, this.vwoEventsInstance = e, this.config = {
                domEventsDebounceTime: t.domEventsDebounceTime
            }, this.events = {}, this.initialize()
        }
        add(...e) {
            var t, i;
            let n, r, o, s;
            ht(e[0]) ? ([{
                eventName: n
            }] = e, r = e[0].on.bind(e[0]), o = null === (t = e[0].off) || void 0 === t ? void 0 : t.bind(e[0]), s = null === (i = e[0].eventConditionsUpdate) || void 0 === i ? void 0 : i.bind(e[0])) : [n, r, o, s] = e, vt.debug(`Adding event listener '${n}' in EventsManager`), this.events[n] ? vt.error(ai.EVENTS.ALREADY_EXISTS, {
                eventName: n
            }) : (this.events[n] = {
                on: r,
                off: o,
                eventConditionsUpdate: s
            }, r((e => this.triggerCustomEvent(n, e)), {
                vwoEvents: this.vwoEventsInstance
            }))
        }
        updateCustomEvents(...e) {
            var t;
            let i, n, r;
            ht(e[0]) ? ([{
                eventName: i
            }] = e, n = e[0].on.bind(e[0]), r = null === (t = e[0].off) || void 0 === t ? void 0 : t.bind(e[0])) : [i, n, r] = e, vt.debug(`Updating event listener '${i}' in EventsManager`), this.events[i] = {
                on: n,
                off: r
            }, n((e => this.triggerCustomEvent(i, e)), {
                vwoEvents: this.vwoEventsInstance
            })
        }
        update(e, t) {
            Object.keys(e).forEach((t => {
                this.updateCustomEvents(t, e[t].fn)
            })), Object.keys(t).forEach((e => {
                if (this.events[e]) {
                    const {
                        eventConditionsUpdate: i
                    } = this.events[e];
                    i && i(t[e])
                } else this.addDomEvent(e, t[e])
            }))
        }
        get(e) {
            return vt.debug(`Getting event listener '${e}' definition from EventsManager`), this.events[e] ? this.events[e] : (vt.error(ai.EVENTS.NOT_REGISTERED, {
                eventName: e
            }), null)
        }
        remove(e) {
            var t, i;
            vt.debug(`Removing event listener '${e}' from EventsManager`), this.events[e] ? (null === (i = (t = this.events[e]).off) || void 0 === i || i.call(t), delete this.events[e], Zt.remove(e)) : vt.warn(li.EVENTS.NO_EVENT_TO_REMOVE, {
                eventName: e
            })
        }
        removeAll() {
            vt.debug("Removing all event listeners from EventsManager"), Object.keys(this.events).forEach((e => {
                var t, i;
                null === (i = (t = this.events[e]).off) || void 0 === i || i.call(t)
            })), Zt.removeAll(), this.events = {}
        }
        addDomEvent(e, t) {
            const {
                preDefinedEvents: i
            } = this.vwoEventsInstance;
            !this.events[e] && e.toLowerCase().includes(rt.DOM + "_") && (e === rt.DOM + "_click" ? this.add(new i.ClickDomEvent(t)) : e === rt.DOM + "_submit" ? this.add(new i.SubmitDomEvent(t)) : this.add(new i.GenericDomEvent(e, t, this.config.domEventsDebounceTime)))
        }
        updateConditions(e, t) {
            if (this.events[e]) {
                if (e.toLowerCase().includes(rt.DOM + "_")) {
                    const {
                        eventConditionsUpdate: i
                    } = this.events[e];
                    i && Array.isArray(t) && i(t)
                }
            } else this.addDomEvent(e, t)
        }
        triggerCustomEvent(e, t) {
            Zt.trigger(e, t)
        }
        initialize() {
            const {
                preDefinedEvents: e
            } = this.vwoEventsInstance;
            Object.keys(e).forEach((t => {
                t.endsWith("DomEvent") || this.add(new e[t])
            }))
        }
    }! function(e) {
        e.EQUAL = "eq", e.NOT_EQUAL = "neq", e.EQUAL_CASE_SENSITIVE = "eqs", e.NOT_EQUAL_CASE_SENSITIVE = "neqs", e.REGEX = "reg", e.REGEX_CASE_SENSITIVE = "regs", e.CONTAINS = "cn", e.NOT_CONTAINS = "ncn", e.BLANK = "bl", e.NOT_BLANK = "nbl", e.GREATER_THAN = "gt", e.LESS_THAN = "lt", e.GREATER_THAN_EQUAL = "gte", e.LESS_THAN_EQUAL = "lte", e.IN = "in", e.NOT_IN = "nin", e.EXEC = "exec", e.IN_LOCATION = "inloc", e.NOT_IN_LOCATION = "ninloc", e.URL_REGEX = "urlReg", e.NOT_URL_REGEX = "nUrlReg", e.RANGE_COMPARISON = "rg", e.PAGE_CONFIG_EVALUATION = "pgc"
    }(Ti || (Ti = {})),
    function(e) {
        e.PAGE = "PAGE", e.EVENT = "EVENT", e.JS_VARIABLE = "JS_VARIABLE"
    }(Ii || (Ii = {}));
    const Ri = {
        [Ti.EQUAL]: (e, t) => String(e).toLowerCase() === String(t).toLowerCase(),
        [Ti.NOT_EQUAL]: (e, t) => !Ri[Ti.EQUAL](e, t),
        [Ti.EQUAL_CASE_SENSITIVE]: (e, t) => String(e) === String(t),
        [Ti.NOT_EQUAL_CASE_SENSITIVE]: (e, t) => !Ri[Ti.EQUAL_CASE_SENSITIVE](e, t),
        [Ti.REGEX](e, t) {
            try {
                return new RegExp(t, "i").test(String(e))
            } catch (e) {
                return !1
            }
        },
        [Ti.URL_REGEX](e, t, i) {
            const n = null == i ? void 0 : i.jsLibUtils;
            return n ? n.verifyUrl(e, t, null, null == i ? void 0 : i.pageUrl) : Ri[Ti.REGEX](e, t)
        },
        [Ti.NOT_URL_REGEX]: (e, t, i) => !Ri[Ti.URL_REGEX](e, t, i),
        [Ti.REGEX_CASE_SENSITIVE](e, t) {
            try {
                return new RegExp(t).test(String(e))
            } catch (e) {
                return !1
            }
        },
        [Ti.CONTAINS]: (e, t) => String(e).toLowerCase().includes(String(t).toLowerCase()),
        [Ti.NOT_CONTAINS]: (e, t) => !Ri[Ti.CONTAINS](e, t),
        [Ti.BLANK]: e => !e,
        [Ti.NOT_BLANK]: e => !Ri[Ti.BLANK](e),
        [Ti.GREATER_THAN]: (e, t) => e > t,
        [Ti.GREATER_THAN_EQUAL]: (e, t) => e >= t,
        [Ti.LESS_THAN]: (e, t) => e < t,
        [Ti.LESS_THAN_EQUAL]: (e, t) => e <= t,
        [Ti.EXEC](e, {
            triggerName: t = ""
        } = {}) {
            if (!e) return !1;
            for (let i = 0; i < e.length; i++) {
                const n = e[i];
                if (!n) break;
                window.VWO._.pageNo = window.VWO._.pageNo || 0;
                const {
                    pageNo: r
                } = window.VWO._, o = () => {
                    r === window.VWO._.pageNo && Zt.trigger(gi.getTriggerEventName(t))
                };
                try {
                    n(o, window.vwo_$)
                } catch (e) {
                    vt.warn("Issue with custom trigger " + (null == n ? void 0 : n.toString()))
                }
            }
            return !1
        },
        [Ti.NOT_IN_LOCATION](e, t) {
            let i = !1;
            if (!t || 0 === t.length) return !1;
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                if (r === e.countryCode || r === `${e.countryCode}-${e.region}` || r === `${e.countryCode}-${e.region}-${e.city}`) {
                    i = !1;
                    break
                }
                i = !0
            }
            return i
        },
        [Ti.IN_LOCATION](e, t) {
            let i = !1;
            if (!t || 0 === t.length) return !1;
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                if (r === e.countryCode || r === `${e.countryCode}-${e.region}` || r === `${e.countryCode}-${e.region}-${e.city}`) {
                    i = !0;
                    break
                }
            }
            return i
        },
        [Ti.IN]: (e, t) => t.map((e => String(e).toLowerCase())).includes(String(e).toLowerCase()),
        [Ti.NOT_IN]: (e, t) => !Ri[Ti.IN](e, t),
        [Ti.RANGE_COMPARISON](e, t) {
            try {
                const i = JSON.parse(e),
                    n = t.split("'")[1].split("-"),
                    r = n[0],
                    o = n[1];
                return Ri[Ti.GREATER_THAN_EQUAL](i[0], parseInt(r, 10)) && Ri[Ti.LESS_THAN_EQUAL](i[0], parseInt(o, 10))
            } catch (e) {
                return vt.info("RANGE OPERATOR ERROR: " + (e && e.stack)), !1
            }
        },
        [Ti.PAGE_CONFIG_EVALUATION]: (e, t) => Ft.validatePage(t, !1, e).didMatch
    };
    class Vi extends ii {
        constructor() {
            super(), this.pluginName = Pt.OPERATOR, this.operators = {}, this.initialize()
        }
        add(e, t) {
            vt.debug(`Adding operator '${e}' in OperatorsManager`), this.operators[e] ? vt.error(ai.OPERATORS.ALREADY_EXISTS, {
                operatorName: e
            }) : this.operators[e] = t
        }
        update(e, t) {
            vt.debug(`Updating operator '${e}' in OperatorsManager`), this.operators[e] = t
        }
        get(e) {
            return vt.debug(`Getting operator '${e}' in OperatorsManager`), "sel" === e ? null : this.operators[e] ? this.operators[e] : (vt.error(ai.OPERATORS.NOT_REGISTERED, {
                operatorName: e
            }), null)
        }
        remove(e) {
            vt.debug(`Removing operator '${e}' in OperatorsManager`), this.operators[e] ? delete this.operators[e] : vt.warn(li.OPERATORS.NO_OPERATOR_TO_REMOVE, {
                operatorName: e
            })
        }
        removeAll() {
            vt.debug("Removing all operators in OperatorsManager"), this.operators = {}
        }
        initialize() {
            Object.keys(Ri).forEach((e => {
                this.add(e, Ri[e])
            }))
        }
    }
    const xi = {};
    class Pi extends ii {
        constructor() {
            super(), this.pluginName = Pt.EVENT_PROPS, this.eventsProps = {}, this.initialize()
        }
        add(e, t, i) {
            vt.debug(`Adding computed prop '${t}' of event '${e}'.`), this.eventsProps[e] = this.eventsProps[e] || {}, this.eventsProps[e][t] ? vt.error(ai.EVENT_PROP.ALREADY_EXISTS, {
                propName: t,
                eventName: e
            }) : this.eventsProps[e][t] = i
        }
        update(e, t, i) {
            vt.debug(`Updating computed prop '${t}' of event '${e}'.`), this.eventsProps[e] = this.eventsProps[e] || {}, this.eventsProps[e][t] = i
        }
        get(e, t) {
            var i;
            return vt.debug(`Getting '${t||"all"}' computed prop of event '${e}'.`), t ? (null === (i = this.eventsProps[e]) || void 0 === i ? void 0 : i[t]) ? this.eventsProps[e][t] : (vt.error(ai.EVENT_PROP.NOT_REGISTERED, {
                eventName: e,
                propName: t
            }), null) : this.eventsProps[e] || {}
        }
        remove(e, t) {
            var i;
            vt.debug(`Removing '${t||"all"}' computed prop of event '${e}'.`), t ? (null === (i = this.eventsProps[e]) || void 0 === i ? void 0 : i[t]) ? delete this.eventsProps[e][t] : vt.warn(li.EVENT_PROP.NO_EVENT_PROP_TO_REMOVE, {
                eventName: e,
                propName: t
            }) : this.eventsProps[e] = {}
        }
        removeAll() {
            vt.debug("Removing all computed props of all events"), this.eventsProps = {}
        }
        initialize() {
            Object.keys(xi).forEach((e => {
                Object.keys(xi[e]).forEach((t => {
                    this.add(e, t, xi[e][t])
                }))
            }))
        }
    }
    var Di, Li, ki = new class {
        execute(e, t) {
            this.initializeStore(t.dataStore, t.storages, t.props), this.initializeOperators(t.operators), this.initializeFormulas(), this.initializeTags(t.tags), this.initializeEventsProps(t.eventsProps), this.initializeEvents(e, t.events, t.triggers, t.globals), this.initializeTriggers(t.triggers), this.initializePages(t.pages, t.pagesEval), this.initializeRules(e, t.rules)
        }
        clear() {
            Dt.unregisterAll(), gi.removeAll(), mi.removeAll(), Zt.removeAll(), Jt.clearAll()
        }
        initializeOperators(e) {
            vt.debug("Initializing Operators");
            const t = Dt.plugins[Pt.OPERATOR] || new Vi;
            Object.keys(e).forEach((i => {
                t.update(i, e[i])
            })), Dt.register(t)
        }
        initializeFormulas() {
            vt.debug("Initializing Formulas"), Dt.register(Dt.plugins[Pt.FORMULA] || new ci)
        }
        initializeStore(e, t, i) {
            vt.debug("Initializing Store");
            const n = Dt.plugins[Pt.STORAGE] || new Ni;
            Object.keys(t).forEach((e => {
                n.update(e, t[e]), Kt.setStoragePlugin(n.get(e))
            })), Jt.addValues(e, Ct.SETTINGS), Jt.set("storages", n, Ct.ROOT), class {
                static initialize(e) {
                    Jt.addValues(e, Ct.ROOT), Jt.addValues(Oi, Ct.ROOT)
                }
            }.initialize(i), Dt.register(n)
        }
        initializeEventsProps(e) {
            vt.debug("Initializing Events computed props");
            const t = Dt.plugins[Pt.EVENT_PROPS] || new Pi;
            Object.keys(e).forEach((i => {
                Object.keys(e[i]).forEach((n => {
                    t.update(i, n, e[i][n])
                }))
            })), Dt.register(t)
        }
        initializeEvents(e, t, i, n) {
            vt.debug("Initializing Events");
            const r = gi.extractDomEvents(i),
                o = Dt.plugins[Pt.EVENT] || new Ai(e, {
                    globals: n
                });
            o.update(t, r), Dt.register(o)
        }
        initializeTriggers(e) {
            vt.debug("Initializing Triggers"), gi.initialize(e)
        }
        initializePages(e, t) {
            vt.debug("Initializing Pages"), Ft.add(e, t)
        }
        initializeTags(e) {
            vt.debug("Initializing Tags");
            const t = Dt.plugins[Pt.TAG] || new hi;
            Object.keys(e).forEach((i => {
                const n = e[i];
                t.update(i, n.fn, {
                    occurrence: n.occurrence,
                    scope: n.scope,
                    sync: n.sync,
                    fireUniquelyForEveryEvent: n.fireUniquelyForEveryEvent
                })
            })), Dt.register(t)
        }
        initializeRules(e, t) {
            vt.debug("Initializing Rules", t), mi.initialize(e, t)
        }
    };
    ! function(e) {
        e.OR = "OR"
    }(Di || (Di = {})),
    function(e) {
        e.ALL = "*"
    }(Li || (Li = {}));
    class Ui {
        static or(...e) {
            return e._validationType = Di.OR, e
        }
        static validateJSON(e, t, i = "settings") {
            try {
                if (e) {
                    const n = e._validationType === Di.OR && wt(e) ? e : [e],
                        r = e._validationType === Di.OR && wt(e) ? e.find((e => It(e) === It(t))) : e;
                    if (!Ui.isSchemaMatching(n, t)) return Ui.logger.info(`Settings schema validation failed for '${i}'.`, {
                        expectedSchema: Ui.getStringifiedSchemaValues(e),
                        actualValue: t
                    }), Ui.getNewInitializedValue(e);
                    if (ht(r)) Object.keys(t).forEach((e => {
                        t[e] = Ui.validateJSON(r[e] || r[Li.ALL], t[e], `${i}.${e}`)
                    }));
                    else if (wt(r)) return t.map(((e, t) => Ui.validateJSON(r[0], e, `${i}.${t}`)))
                }
                return t
            } catch (e) {
                return Ui.logger.error("Got exception while validating settings schema", {
                    err: e
                }), t
            }
        }
        static isSchemaMatching(e, t) {
            return e.some((e => It(t) === It(e) || It(t) === (null == e ? void 0 : e.name)))
        }
        static getNewInitializedValue(e) {
            if (St(e)) return new e;
            let t = e;
            return e._validationType === Di.OR && wt(e) && (t = e.find((e => Ui.isArraySchema(e) || Ui.isObjectSchema(e))) || e[0]), Ui.isObjectSchema(t) ? {} : Ui.isArraySchema(t) ? [] : void 0
        }
        static isArraySchema(e) {
            return "Array" === e.name || wt(e)
        }
        static isObjectSchema(e) {
            return "Object" === e.name || ht(e)
        }
        static getStringifiedSchemaValues(e) {
            return St(e) ? e.name : wt(e) ? e.map((e => Ui.getStringifiedSchemaValues(e))) : ht(e) ? Object.keys(e).reduce(((t, i) => Object.assign(Object.assign({}, t), {
                [i]: Ui.getStringifiedSchemaValues(e[i])
            })), {}) : e
        }
    }
    Ui.logger = new ut("warn");
    class Mi {
        constructor(e, ...t) {
            var i;
            this.vwoEventsInstance = e, this.currentSettings = {}, this.baseSettings = {
                globals: {},
                dataStore: {},
                props: {},
                operators: {},
                eventsProps: {},
                events: {},
                triggers: {},
                pages: {
                    ec: [],
                    pc: []
                },
                pagesEval: {
                    ec: [],
                    pc: []
                },
                tags: {},
                rules: {},
                storages: {},
                jsLibUtils: {}
            }, this.replace(...t), kt.set("jsLibUtils", null === (i = this.currentSettings) || void 0 === i ? void 0 : i.jsLibUtils)
        }
        add(...e) {
            const t = this.preProcessSettings(e);
            return this.currentSettings.pagesEval = {}, this.currentSettings = Rt.mergeNestedObjects(this.currentSettings, ...t), this.initialize(), this.currentSettings
        }
        replace(...e) {
            return this.resetSettings(), this.add(...e)
        }
        remove() {
            this.resetSettings(), ki.clear()
        }
        initialize() {
            ki.execute(this.vwoEventsInstance, this.currentSettings)
        }
        resetSettings() {
            this.currentSettings = Object.assign({}, this.baseSettings)
        }
        preProcessSettings(e) {
            let t = this.preProcessRules(e);
            return t = this.preProcessTriggers(t), t = this.preProcessCampaigns(t), this.getValidatedSettings(t)
        }
        getValidatedSettings(e) {
            const t = {
                    id: Ui.or(String, Number),
                    type: String,
                    filters: [Ui.or(String, Array)],
                    args: Array,
                    fn: Function
                },
                i = [{
                    dataStore: Object,
                    props: Object,
                    operators: {
                        "*": Function
                    },
                    eventsProps: {
                        "*": {
                            "*": Function
                        }
                    },
                    events: {
                        "*": {
                            fn: Function
                        }
                    },
                    triggers: {
                        "*": {
                            cnds: [Ui.or(String, Boolean, null, {
                                id: Ui.or(String, Number),
                                event: String,
                                filters: [Ui.or(String, Array)],
                                formula: [t]
                            })],
                            formula: [t]
                        }
                    },
                    tags: {
                        "*": {
                            fn: Ui.or(Function, Object.getPrototypeOf((async function() {})).constructor),
                            occurrence: Number,
                            scope: String
                        }
                    },
                    rules: {
                        "*": {
                            triggers: Ui.or(String, [String]),
                            tags: [{
                                id: String,
                                priority: Number,
                                exitCondition: [Ui.or(String, Array)],
                                shouldConsiderParentExitCondition: Boolean
                            }],
                            exitCondition: [Ui.or(String, Array)],
                            shouldConsiderParentExitCondition: Boolean
                        }
                    },
                    storages: {
                        "*": Object
                    }
                }];
            return Ui.validateJSON(i, e)
        }
        preProcessRules(e) {
            const t = {},
                i = this;
            return Object.keys(this.currentSettings.rules).forEach((e => {
                const n = this.currentSettings.rules[e],
                    r = [];
                n.tags.forEach((e => {
                    r.push(JSON.stringify(i.sortTag(e)))
                })), t[n.triggers[0]] = r
            })), e.map((e => {
                let {
                    rules: n
                } = e;
                if (n = n || [], wt(n)) {
                    const e = {};
                    n.forEach((n => {
                        let r = !1;
                        const o = [],
                            s = mi.generateRandomRuleId(),
                            a = {
                                triggers: n.triggers,
                                tags: []
                            };
                        n.tags.forEach((e => {
                            const s = n.triggers[0],
                                a = JSON.stringify(i.sortTag(e));
                            t[s] = t[s] || [], t[s].includes(a) || (r = !0, t[s].push(a), o.push(e))
                        })), r && (a.tags = o, e[s] = a)
                    })), n = e
                }
                return Object.assign(Object.assign({}, e), {
                    rules: n
                })
            }))
        }
        sortTag(e) {
            return Object.keys(e).sort().reduce(((t, i) => (t[i] = e[i], t)), {})
        }
        preProcessCampaigns(e) {
            return e.map((e => {
                if (ht(e.triggers) && Et(e.triggers) && ht(e.dataStore) && Et(e.dataStore)) {
                    const {
                        triggers: t
                    } = e, {
                        campaigns: i
                    } = e.dataStore;
                    Object.keys(i).forEach((e => {
                        const n = i[e].triggers[0];
                        ht(t[n]) && Et(t[n]) && (t[n].occurrence = 1)
                    }))
                }
                return e
            }))
        }
        preProcessTriggers(e) {
            return e.forEach((e => {
                e.triggers && Object.keys(e.triggers).forEach((t => {
                    var i;
                    e.triggers[t] && e.triggers[t].cnds && e.triggers[t].cnds.length >= 0 && (null === (i = e.triggers[t].cnds) || void 0 === i || i.forEach((e => {
                        !e || yt(e) || Et(e.persistState) || ("pageView" === e.event ? e.persistState = !1 : "vwo_postInit" === e.event && (e.persistState = !0))
                    })))
                }))
            })), e
        }
    }
    class Wi {
        static tag(e, t) {
            var i;
            const n = wi.generateTagId(t),
                r = jt.tags[n],
                o = null === (i = Dt.plugins[Pt.TAG]) || void 0 === i ? void 0 : i.get(t),
                s = Object.values(e.currentSettings.rules).filter((e => e.tags.some((e => e.id === t)))).reduce(((e, t) => {
                    const i = wt(t.triggers) ? t.triggers : [t.triggers];
                    return e.push(...i), e
                }), []).reduce(((t, i) => {
                    const n = jt.triggers[i];
                    return Object.assign(Object.assign({}, t), {
                        [i]: {
                            areConditionsMet: n.state,
                            cndsState: e.currentSettings.triggers[i].cnds.map((e => ht(e) ? Object.assign(Object.assign({}, e), {
                                hasEventFired: ui.hasEventOccurred(i, e.event),
                                arePartialConditionsMet: ui.hasConditionMetBefore(i, e.id)
                            }) : e))
                        }
                    })
                }), {});
            return {
                hasExecuted: r.hasExecuted || !1,
                executionCount: r.executionCount || 0,
                fn: o.fn,
                occurrence: o.occurrence || null,
                scope: o.scope || null,
                stoppedByExitCondition: r.stoppedByExitCondition,
                lastExitConditions: r.lastExitConditions,
                dependentTriggers: s
            }
        }
        static trigger(e, t) {
            return {
                areConditionsMet: jt.triggers[t].state,
                cndsState: e.currentSettings.triggers[t].cnds.map((e => ht(e) ? Object.assign(Object.assign({}, e), {
                    hasEventFired: ui.hasEventOccurred(t, e.event),
                    arePartialConditionsMet: ui.hasConditionMetBefore(t, e.id)
                }) : e))
            }
        }
        static page(e, t, i) {
            const n = Ft.validatePage(e, t, i, !0);
            let r = t ? "pageConfig" : "experimentConfig";
            if (n) {
                switch (n.reason) {
                    case Mt.EXCLUDE_PASSED:
                        r = "Url matches the excludes of " + r;
                        break;
                    case Mt.INCLUDE_FAILED:
                        r = "Url does not match the includes of " + r;
                        break;
                    case Mt.INCLUDE_PASSED:
                        r = "Url matches the includes of " + r
                }
                return delete n.reason, Object.assign(Object.assign({}, n), {
                    brief: r
                })
            }
        }
    }
    class Gi {
        constructor(e, t) {
            this.toJSON = () => {
                const e = Object.assign({}, this);
                return delete e.preDefinedEvents, e
            }, this.store = {
                state: xt,
                getters: jt,
                mutations: Ht,
                actions: Jt
            }, this.eventBus = Zt, this.preDefinedEvents = null == t ? void 0 : t.preDefinedEvents, this.debug = {
                tag: e => Wi.tag(this.settings, e),
                trigger: e => Wi.trigger(this.settings, e),
                page: (e, t, i) => Wi.page(e, t, i)
            }, this.rules = mi, this.triggers = gi, this.pageGroup = Ft, Object.assign(this, this.getEventMethods()), _i.init(), this.activate(e)
        }
        get version() {
            return "1.1.22"
        }
        add(...e) {
            this.settings.add(...e), Zt.trigger(ot.POST_INIT)
        }
        replace(...e) {
            this.settings.replace(...e), Zt.trigger(ot.POST_INIT)
        }
        on(e, t, {
            before: i,
            after: n
        } = {}) {
            if (yt(e)) return Zt.on(e, t, {
                before: i,
                after: n
            });
            const r = Date.now() * Math.floor(1e3 * Math.random());
            return this.tags.add(r, t), this.rules.add({
                triggers: [r.toString()],
                tags: [{
                    id: r.toString()
                }]
            }, this.rules.generateRandomRuleId()), gi.add(r.toString(), e), r
        }
        async validateTrigger(e, t = {}, i, n) {
            return vt.info("Validating Trigger conditions through API", {
                trigger: e,
                event: t
            }), (await ui.validateTrigger(e, t, i, n)).isValid
        }
        validateTriggerFromHistory(e, t) {
            return gi.validateTriggerFromHistory(e, t)
        }
        destroy() {
            this.settings.remove()
        }
        async isValid(e, t, i) {
            await ui.isValid(e, t, {
                isCustomEvent: !0,
                fromLocalStorage: !0
            }, i)
        }
        activate(e) {
            vt.info("Activating Phoenix!"), this.settings = new Mi(this, ...e), this.initializeValues(), Zt.trigger(ot.POST_INIT)
        }
        getEventMethods() {
            return {
                on: this.on,
                off: Zt.off.bind(Zt),
                async trigger(e, t = {}, i) {
                    Object.defineProperty(t, lt.EXIT_CONDITIONS, {
                        value: this[lt.EXIT_CONDITIONS],
                        enumerable: !1,
                        writable: !0
                    }), await Zt.trigger(e, t), await wi.executeTagUniquelyForEveryEventAndFlushData(e), (St(i) || Tt(i)) && await i(t)
                },
                getEvent: Zt.event.bind(Zt)
            }
        }
        initializeValues() {
            this.operators = Dt.plugins[Pt.OPERATOR], this.formulas = Dt.plugins[Pt.FORMULA], this.events = Dt.plugins[Pt.EVENT], this.storages = Dt.plugins[Pt.STORAGE], this.tags = Dt.plugins[Pt.TAG], this.eventsProps = Dt.plugins[Pt.EVENT_PROPS]
        }
    }

    function Fi(e, t) {
        if (!window.workerThread) {
            window.parent, window.self;
            const e = !1;
            e && t.phoenix("getters.flags.cookieLessModeEnabled", t._.cLFE = e)
        }
    }
    Gi.version = "1.1.22";
    const ji = function(e, t) {
        var i, n, r, o, s, a, l, c, d, u;
        const g = e.settings.plugins;
        if (e.flags = e.flags || {}, !g) return;
        const v = g.DACDNCONFIG;
        t._.ac = t._.ac || {}, t.data.pc = t.data.pc || (null === (n = null === (i = t.data) || void 0 === i ? void 0 : i.accountJSInfo) || void 0 === n ? void 0 : n.pc), t.data.noSS = null === (r = t.data.accountJSInfo) || void 0 === r ? void 0 : r.noSS, t.DONT_IOS = null == v ? void 0 : v.DONT_IOS, t.data.sst = null == v ? void 0 : v.SST, t._.sstd = null === (o = null == v ? void 0 : v.SST) || void 0 === o ? void 0 : o.SSTD, t._.ac.it = null === (s = null == v ? void 0 : v.SD) || void 0 === s ? void 0 : s.it, t._.ac.uct = null === (a = null == v ? void 0 : v.SD) || void 0 === a ? void 0 : a.uct, t._.ac.rdbg = null == v ? void 0 : v.rdbg, t.data.fB = null == v ? void 0 : v.FB, e.vwoInternalProperties.SPA_SETTINGS_DELAY = +(null === (l = null == v ? void 0 : v.SD) || void 0 === l ? void 0 : l.it) || 0, e.vwoInternalProperties.SPA_NEW_PAGE_SETTINGS_DELAY = +(null === (c = null == v ? void 0 : v.SD) || void 0 === c ? void 0 : c.uct) || 0, e.vwoInternalProperties.isSpaEnabled = null == v ? void 0 : v.SPA, t._.ac.eNC = null == v ? void 0 : v.eNC, t._.ac.cInstJS = null == v ? void 0 : v.CINSTJS, t._.ac.bsECJ = null == v ? void 0 : v.BSECJ, t._.ast = null == v ? void 0 : v.AST, t.featureInfo = (null == v ? void 0 : v.jsConfig) || {}, window._vwo_clicks = window._vwo_clicks || (null == v ? void 0 : v.HEATMAPCLICKS), t.data.cj = {
            bc: null === (d = null == v ? void 0 : v.CJ) || void 0 === d ? void 0 : d.BC,
            s: null === (u = null == v ? void 0 : v.CJ) || void 0 === u ? void 0 : u.S
        }, t._.ac.eNC = null == v ? void 0 : v.eNC, Fi(null == v ? void 0 : v.CKLV, t)
    };
    class $i {
        constructor() {
            this.storageLookUpKey = "_vwo_store_content"
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.vwoUtils.contentSync." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    const Hi = {
            get: e => {
                try {
                    return window.localStorage.getItem(e)
                } catch (e) {
                    return !1
                }
            },
            set: (e, t) => {
                try {
                    const i = window.localStorage;
                    return window.VWO._.isWorkerThread ? i.setItem(e, t) : i._setItem(e, t)
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
        },
        Bi = {
            SET_COOKIE: "sC",
            GET_COOKIE: "gC",
            ERASE_COOKIE: "eC",
            SET_THIRD_PARTY_COOKIE: "sTPC",
            SET_THIRD_PARTY_COOKIE_ERROR: "sTPCE"
        },
        Ji = function(...e) {
            window.fetcher.getValue("VWO._.triggerEvent", e)
        };
    let Ki;

    function Yi(e) {
        Ki = e
    }

    function zi(e) {
        window.VWO = null != e ? e : Ki
    }
    const Xi = window.VWO._ && window.VWO._.customError || function() {},
        qi = window.encodeURIComponent,
        Qi = window.decodeURIComponent,
        Zi = function(e) {
            return btoa && Ki._.ac && Ki._.ac.bsECJ ? btoa(e) : qi(e)
        },
        en = function(e) {
            if (atob) try {
                return atob(e)
            } catch (e) {}
            return Qi(e)
        },
        tn = Hi.set,
        nn = Hi.get,
        rn = window.clearTimeout,
        on = window.setTimeout,
        sn = Math.floor,
        an = Math.pow,
        ln = "~",
        cn = "(",
        dn = ")",
        un = "_vis_opt_",
        gn = "_vwo_",
        vn = "_vis_",
        pn = 864e5,
        hn = {
            [un + "out"]: 0,
            [un + "exp_*_combi"]: 10,
            [un + "exp_*_combi_choose"]: 11,
            [un + "exp_*_goal_*"]: 12,
            [un + "exp_*_exclude"]: 13,
            [un + "exp_*_split"]: 14,
            [un + "test_cookie"]: 20,
            [un + "s"]: 21,
            [gn + "ds"]: 22,
            [gn + "sn"]: 23,
            [gn + "referrer"]: 24,
            [gn + "uuid"]: 30,
            [gn + "uuid_*"]: 31,
            [gn + "uuid_v2"]: 32,
            [gn + "app_version_*_*"]: 40,
            [vn + "preview_*"]: 41,
            [vn + "editor"]: 42,
            [vn + "heatmap_*"]: 43
        };
    let wn;
    for (const e in hn) hn[e] = Tn(hn[e]), hn["debug" + e] = "d" + hn[e];

    function fn() {
        for (var e = document.cookie.split(/; ?/), t = {}, i = 0; i < e.length; i++) {
            var n = e[i].split("=");
            try {
                const e = Qi(n[0]);
                let i;
                i = "_vwo" === e ? en(n[1]) : Qi(n[1]), t[e] = i
            } catch (e) {}
        }
        return t
    }

    function mn(e) {
        return ["_vis_opt_out", "_vwo_ssm", "_vwo_ss", "_vwo_global_opt_out"].indexOf(e) < 0 && (e.indexOf("_vis_opt_") > -1 || e.indexOf("_vwo_") > -1 || e.indexOf("_vis_") > -1)
    }

    function En(e) {
        let t, i;
        return () => (i = i || on((() => {
            i = t = void 0
        }), 1), t = t || e())
    }
    let _n = En(fn);

    function yn(e) {
        return _n()[Qi(e)]
    }

    function On(e, t, i, n = 4e12) {
        t = "_vwo" === e ? Zi(t) : qi(t);
        let r = qi(e) + "=" + t + "; ";
        i && (r += "domain=" + i + "; "), n && (r += "expires=" + new Date(n).toUTCString() + "; "), r += "path=/", window.VWO._ = window.VWO._ || {}, window.VWO._.ss && (r += "; secure; samesite=none"), document.cookie = r, _n = En(fn)
    }

    function Sn() {
        _n = En(fn)
    }

    function Tn(e) {
        "string" == typeof e && (e = +e), e < 0 && (e = 0);
        let t = "";
        for (; e;) {
            const i = e % 64;
            let n = i.toString(36);
            i >= 36 && (n = String.fromCharCode(i + 29)), 62 === i && (n = "_"), 63 === i && (n = "-"), t = n + t, e = sn(e / 64)
        }
        return t || e + ""
    }

    function In(e) {
        let t = 0,
            i = 0;
        for (; e;) {
            const n = e.slice(-1);
            let r = 26 * +/[A-Z]/.test(n) + parseInt(n, 36);
            "_" === n && (r = 62), "-" === n && (r = 63), t += r * an(64, i++), e = e.slice(0, -1)
        }
        return t
    }

    function Cn(e, t, i) {
        return `${e}${ln}${t}${cn}${Tn(sn(100*i))}`
    }

    function bn(e, t) {
        try {
            const t = e.split(ln),
                i = t[1].split(cn);
            return [t[0], i[0], In(i[1]) / 100]
        } catch (i) {
            const n = `Error occurred while decoding the cookie in cookieJar for strategy: ${t}. Cookie Value to be decoded: ${e}. ${i}`;
            return void Xi({
                msg: n,
                url: "cookie-jar.js",
                lineno: 257,
                colno: 26,
                source: qi(n)
            })
        }
    }

    function Nn(e, t) {
        return !e || "number" != typeof e[2] || Date.now() > t + e[2] * pn
    }
    class An {
        constructor(e, t, i = "cookie", n = !0, r, o, s) {
            this.threadInstanceSync = !1, this.backwardCompatible = n, this.cookieSyncUrl = r, this.jarName = e, this.cookieStorageStrategy = i, this.domain = t, this.syncingOff = o, this.strategyConfig = s, this.syncingOff ? this.cookies = this.syncFromTPCValue() : this.cookies = this.syncFromCookies(), this.strategyConfig && (this.strategyConfig.callback = this.strategyConfig.callback || function() {}, this.strategyConfig.cookieJarValue = this.strategyConfig.cookieJarValue || ""), wn = In(this.getInJar("ts") || "0") || Date.now(), this.setInJar("ts", Tn(wn), 2e3), this.backwardCompatible && this.getAll(!1, !0), this.backwardCompatible || this.syncingOff || "custom" === i || this.syncCookiesToJar(), this.threadInstanceSync = !0
        }
        syncCookiesToJar() {
            const e = document.cookie.split(/; ?/),
                t = this.getAll();
            for (var i = 0; i < e.length; i++) {
                const n = e[i].split("="),
                    r = t[n[0]];
                mn(n[0]) && !r && (this.setInJar(Qi(n[0]), Qi(n[1]), 100), window.VWO._.cookies.create(n[0], n[1], void 0, void 0, -1, !0))
            }
        }
        getInJar(e, t = !1) {
            if (e = this.mapKey(e), !this.cookies) return;
            const i = this.cookies[e];
            return Nn(i, wn) ? (delete this.cookies[e], void(this.syncingOff || this.syncToCookies())) : t ? i.slice(1) : i[1]
        }
        expired(e) {
            e = this.mapKey(e);
            const t = this.cookies[e];
            if (t) return Nn(t, wn)
        }
        setInJar(e, t, i) {
            return e = this.mapKey(e), this.cookies[e] = [e, t, i + (Date.now() - wn) / pn], this.threadInstanceSync && this.otherSide("updateJarMemory", [e, this.cookies[e]]), this.syncingOff || this.syncToCookies(), this.getInJar(e)
        }
        syncToCookies() {
            let e = "";
            for (const t in this.cookies) {
                const i = this.cookies[t];
                e += (e ? dn : "") + Cn.apply(!1, i)
            }
            if ("custom" === this.cookieStorageStrategy) return Sn(), e = Zi(e), void this.strategyConfig.callback(e);
            "ls" !== this.cookieStorageStrategy && "both" !== this.cookieStorageStrategy || tn(this.jarName, e), "cookie" !== this.cookieStorageStrategy && "both" !== this.cookieStorageStrategy || On(this.jarName, e, this.domain)
        }
        getStoredJarValue(e) {
            let t = "";
            for (const e in this.cookies) {
                const i = this.cookies[e];
                t += (t ? dn : "") + Cn.apply(!1, i)
            }
            return e ? Zi(t) : t
        }
        syncFromTPCValue() {
            let e = window.VWO.data.tpc ? window.VWO.data.tpc._vwo : void 0;
            const t = {};
            if (!e) return t;
            e = e.split(dn);
            for (let i = 0; i < e.length; i++) {
                const n = bn(e[i], this.cookieStorageStrategy);
                n && (t[n[0]] = n)
            }
            return t
        }
        syncFromCookies() {
            let e = "";
            this.cookies = {}, "custom" === this.cookieStorageStrategy ? e = en(this.strategyConfig.cookieJarValue) : "ls" === this.cookieStorageStrategy ? e = nn(this.jarName) : "cookie" === this.cookieStorageStrategy ? e = yn(this.jarName) : "both" === this.cookieStorageStrategy && (e = yn(this.jarName) || nn(this.jarName)), e = e || "";
            const t = e.split(dn);
            for (let i = 0; e && i < t.length; i++) {
                const e = bn(t[i], this.cookieStorageStrategy);
                e && (this.cookies[e[0]] = e)
            }
            return this.cookies
        }
        mapKey(e) {
            if (hn[e]) return hn[e];
            const t = /([0-9]+)/g,
                i = e.replace(t, "*");
            if (hn[i]) {
                const n = e.match(t) || [];
                return hn[i] + "*" + n.map(Tn).join("*")
            }
            return e
        }
        unmapKey(e) {
            const t = e.split("*"),
                i = t[0];
            let n = "";
            for (const e in hn)
                if (hn[e] === i) {
                    n = e;
                    break
                }
            for (let e = 1; e < t.length; e++) n = n.replace("*", "" + In(t[e]));
            return (n || "ts" === e) && n || e
        }
        getAll(e = !1, t = !1) {
            const i = {};
            for (const n in this.cookies) {
                const r = this.unmapKey(n);
                let o = this.cookies[n][1];
                "ts" !== n && (o = this.get(r, t)), !1 === this.expired(n) && (i[r] = e ? [o, new Date(this.cookies[n][2] * pn + wn)] : o)
            }
            return i
        }
        get(e, t = !1) {
            const i = this.expired(e),
                n = this.getInJar(e, !0);
            let r, o;
            n && ([r, o] = n);
            const s = "*" === r;
            if ("custom" !== this.cookieStorageStrategy && s) {
                const t = yn(e);
                return !t && r && this.setInJar(e, "", -1), t
            }
            if (this.backwardCompatible) {
                const n = yn(e);
                return n && i ? void On(e, "", this.domain, -1) : (!t || !r || "ts" === e || n && n !== r || On(e, r, this.domain, wn + o * pn), n || !r || t || "ts" === e ? (n && r && n !== r && this.setInJar(e, n, o - (Date.now() - wn) / pn), n || r) : void this.setInJar(e, "", -1))
            }
            return this.getInJar(e)
        }
        xmlSuccess() {
            window.VWO._.cookies.create("_vis_opt_test_cookie", 1, void 0, void 0, void 0, !0)
        }
        set(e, t, i) {
            if (t += "", "number" == typeof i ? this.setInJar(e, t, i) : this.setInJar(e, "*", 2e3), "custom" !== this.cookieStorageStrategy && (this.backwardCompatible || "number" != typeof i)) {
                let n;
                n = null === i ? null : Date.now() + i * pn, On(e, t, this.domain, n)
            }
            this.cookieSyncUrl && (rn(this.cookieSyncTimeout), this.cookieSyncTimeout = on((() => {
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
    const Rn = {
        primary: (e, t, i = !1, n, r) => new Proxy(t, {
            construct(t, o) {
                this.store = this.store || ["1"];
                const s = new t(...o),
                    a = this.store.length;
                this.store.push(s);
                let l = o;
                i && (l = n(s)), Object.defineProperty(s, "otherSideCreated", {
                    value: !1,
                    enumerable: !1,
                    writable: !0
                }), s.otherSide = (...e) => s.otherSideCreated.then((() => s.otherSide(...e).then((e => e))));
                const c = {
                    type: "vwoClassInstanceBridge",
                    id: a,
                    args: l,
                    path: e
                };
                return s.otherSideCreated = new Promise((t => {
                    window.fetcher.request(c).send().then((i => {
                        s.otherSide = (...t) => {
                            const n = e.dest + "." + i + "." + t[0];
                            return t[0] = n, window.fetcher.getValue(...t)
                        }, t(null), r && r(i)
                    }))
                })), s
            },
            get(e, t) {
                return "symbol" == typeof t || isNaN(+t) ? e : this.store[t]
            }
        }),
        secondary: (e, t, i) => new Proxy(t, {
            construct(e, t) {
                this.store = this.store || ["1"];
                const n = new e(...t),
                    r = this.store.length;
                return this.store.push(n), i && i(n), [r, n]
            },
            get(e, t) {
                return "symbol" == typeof t || isNaN(+t) ? e : this.store[t]
            }
        })
    };
    class Vn extends An {
        syncViaXML(e) {
            this.otherSide("syncViaXML", [e])
        }
    }
    const xn = Rn.primary({
        src: "VWO.modules.vwoUtils.cookies.CookieJar",
        dest: "VWO.modules.vwoUtils.cookies.CookieJar"
    }, Vn);

    function Pn(e) {
        var t = [];
        for (var i in e) e.hasOwnProperty(i) && t.push(i);
        return t
    }

    function Dn(e, t) {
        window.fetcher.getValue("VWO.modules.vwoUtils.urlUtils.customEvent", [e, t])
    }
    window.VWO.modules.vwoUtils.cookies.CookieJar = xn;
    var Ln = window._vis_opt_cookieDays,
        kn = window._vwo_exp || {},
        Un, Mn = window._vwo_acc_id,
        Wn = [],
        Gn = 0,
        Fn, jn = function() {
            for (var e = 0; e < Wn.length; e++) Wn[e].d || (Wn[e].c(), Wn[e].d = !0)
        };

    function $n() {
        return window._vis_debug
    }

    function Hn(e) {
        const t = window.VWO;
        return t._.cLFE || !t.data.cj || Object.values(t.data.cj).every((e => void 0 === e)) || (e.backwardCompatible = t.data.cj.bc || !1, e.strategy = e.strategy || t.data.cj.s), e
    }
    const Bn = {
        domain: void 0,
        _create: function(e, t, i, n, r, o, s) {
            $n() && 0 !== e.indexOf("debug") && (e = "debug" + e), window.VWO._.cLFE, "_vwo_sn" !== e && "_vwo_ds" !== e && "_vis_opt_test_cookie" !== e && !isNaN(Ln = parseFloat(Ln)) && isFinite(Ln) && (i = Ln);
            var a = "";
            r ? a += "; expires=" + new Date(r).toGMTString() : i ? a += "; expires=" + new Date((new Date).getTime() + 864e5 * i).toGMTString() : !1 === i && (a = "; expires=Thu, 01 Jan 1970 00:00:01 GMT"), n || (n = Bn.domain), void 0 !== n && (n = "; domain=." + n);
            const l = e + "=" + encodeURIComponent(t) + a + (n || "") + "; path=/";
            window.VWO._.ss && !s ? document.cookie = l + "; secure; samesite=none" : document.cookie = l
        },
        create: function(e, t, i, n, r, o, s) {
            this._create(e, t, i, n, r, o, s), Ji(Bi.SET_COOKIE, e, t, i, r), Dn("meta", {
                ckName: e,
                ckValue: t,
                ckDays: i,
                ckExpiryTs: r
            })
        },
        get: function(e, t, i) {
            var n;
            !i && $n() && (e = "debug" + e), window.VWO._.cLFE;
            var r = document.cookie.match(new RegExp("(?:^|;)\\s?" + e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=(.*?)(?:;|$)", "i"));
            return n = r && decodeURIComponent(r[1]), Ji(Bi.GET_COOKIE, e, n), n
        },
        erase: function(e, t, i) {
            this.create(e, "", !1, t, 1, i), Ji(Bi.ERASE_COOKIE, e)
        },
        mergeInFPJar: function() {
            if (window.VWO._.cLFE) return;
            const e = this.createThirdPartyJar().getAll(!0);
            for (const t in e) {
                if ("ts" === t) continue;
                const i = e[t][1],
                    n = e[t][0];
                window.VWO._.jar.set(t, n, (i - Date.now()) / 864e5)
            }
        },
        createThirdPartyJar: function() {
            return Un || (Un = new xn("_vwo_third_party", Bn.domain, void 0, !1, void 0, !0), window.VWO._.tpj = Un, Un)
        },
        setThirdPartyCookiesInJar: function(e, t, i, n) {
            const r = this.createThirdPartyJar(),
                o = n ? (n - Date.now()) / 864e5 : i;
            r.set(e, t, o)
        },
        getThirdPartyJarValue: function() {
            const e = Un.getStoredJarValue();
            return e.length ? e : null
        },
        createThirdParty: function(e, t, i, n, r, o, s) {
            if (!window.mainThread) return window.fetcher.getValue("VWO._.cookies.createThirdParty", [e, t, i, n, r, o, s]);
            var a, l, c, d;
            let u = !1;
            if (r && (u = s ? s.multiple_domains : kn[r].multiple_domains), "_vwo" !== e && this._create(e, t, i, n), $n() && 0 !== e.indexOf("debug") && (e = "debug" + e), !((d = window.vwo_$) && r && u || o || "_vwo" === e)) return void Ji(Bi.SET_THIRD_PARTY_COOKIE_ERROR, e, t, i, n);
            a = d("<iframe>").attr({
                height: "1px",
                width: "1px",
                border: "0",
                class: "vwo_iframe",
                name: "vwo_" + Math.random(),
                style: "position: absolute; left: -2000px; display: none"
            }).appendTo("head").load((function() {
                -1 !== e.indexOf("split") && this.parentNode.removeChild(this), --Gn || jn()
            })), Gn++;
            const g = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com";
            l = g + "/ping_tpc.php?account=" + Mn + "&name=" + encodeURIComponent(e) + "&value=" + encodeURIComponent(t) + "&days=" + i + "&random=" + Math.random(), /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? a.attr("src", l) : ((c = d("<form>").attr({
                action: g + "/ping_tpc.php",
                "accept-charset": "UTF-8",
                target: a.attr("name"),
                enctype: "application/x-www-form-urlencoded",
                method: "post",
                id: "vwo_form",
                style: "display:none"
            }).appendTo("head")).attr("action", l).submit(), c.remove()), Ji(Bi.SET_COOKIE, e, t, i, r, !0)
        },
        waitForThirdPartySync: function(e) {
            return i(this, void 0, void 0, (function*() {
                window.mainThread ? Wn.push({
                    c: e
                }) : yield window.fetcher.getValue('VWO._.cookies.waitForThirdPartySync("${{1}}")', null, {
                    captureGroups: [e]
                })
            }))
        },
        setJar(e) {
            window.VWO._.jar = Fn = e
        },
        init: function(e) {
            window.VWO._.jar = null
        },
        getAll: function() {
            const e = document.cookie.split(/; ?/),
                t = {};
            for (let i = 0; i < e.length; i++) {
                const n = e[i].split("="),
                    r = n[0],
                    o = n[1];
                try {
                    t[r] = o
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
                i = Object.keys(Bn.getAll());
            for (let e = 0; e < i.length; e++)
                if (t.test(i[e])) return 1;
            return 0
        }
    };
    window.VWO._.cookies = Bn;
    class Jn {
        constructor(e) {
            this.storageConfig = e
        }
        getValWithPref(e) {
            const {
                prefer: t,
                cookieExpDays: i
            } = this.storageConfig, n = Hi.get(e), r = Hi.get(e);
            return "cookie" == t ? Hi.set(e, n) : "ls" == t && Bn.create(e, r, i), {
                cookie: JSON.parse(n),
                ls: JSON.parse(r)
            }
        }
        getVal(e) {
            const {
                strategy: t,
                prefer: i
            } = this.storageConfig;
            for (const n of t) return "all" == n ? this.getValWithPref(e)[i] : "ls" == n ? JSON.parse(Hi.get(e)) : Bn.get(e)
        }
        setVal(e, t) {
            const {
                strategy: i,
                cookieExpDays: n
            } = this.storageConfig;
            for (const r of i) "all" == r ? (Hi.set(e, t), Bn.create(e, t, n)) : "cookie" == r ? Bn.create(e, t, n) : Hi.set(e, t)
        }
    }
    class Kn extends $i {
        constructor(e, t, i) {
            super(), this.contentSyncLocation = "VWO._.contentSyncService", this.url = t, this.globalLookupContext = i, this.storageObj = new Jn(e)
        }
        parseStorageInfo(e, t, i) {
            if (!e) return;
            const [n, r] = t.split(".");
            return e[n] = e[n] || {}, e[n][r] = e[n][r] || {}, e[n][r][i]
        }
        getInfoFromGlobalObject(e, t) {
            if (!e) return;
            const [i, n] = t.split(".");
            return e[i] = e[i] || {}, e[i][n] = e[i][n] || {}, {
                argVn: e[i][n].args || {},
                vn: e[i][n].vn
            }
        }
        fixResponse(e) {
            const t = {
                fns: {}
            };
            e.fns = e.fns || {};
            for (const i in e.fns)
                for (const n in e.fns[i]) {
                    const r = e.fns[i][n],
                        o = JSON.stringify(JSON.parse(n));
                    t.fns[i] = t.fns[i] || {}, t.fns[i][o] = r
                }
            return t
        }
        syncGet(e, t, i = !0) {
            if (!this.storageObj) return {
                dataPresent: !1
            };
            const n = this.storageObj.getVal(this.storageLookUpKey),
                r = JSON.stringify(t),
                o = this.getInfoFromGlobalObject(this.globalLookupContext, e),
                s = o && o.vn,
                a = o && o.argVn,
                l = this.parseStorageInfo(n, e, r);
            if (l && i) {
                const i = l;
                let n = !1;
                for (const o in a)
                    for (const s in a[o])
                        if (i.argVn[o] && i.argVn[o][s] && parseInt(i.argVn[o][s]) < parseInt(a[o][s])) {
                            n = !0, this.syncFromBackend(e, t, r, this.url);
                            break
                        }
                return s && parseInt(s) > parseInt(i.vn) && !n && this.syncFromBackend(e, t, r, this.url), {
                    dataPresent: !0,
                    val: i.val
                }
            }
            return this.syncFromBackend(e, t, r, this.url), {
                dataPresent: !1
            }
        }
        syncFromBackend(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                yield this.otherSide("syncFromBackend", [e, t, n, r])
            }))
        }
        updateStorage(e) {
            return i(this, void 0, void 0, (function*() {
                const t = window.VWO._.contentSyncService,
                    i = t.storageObj.getVal(t.storageLookUpKey);
                let n = {};
                (i || !1) && (n = i);
                const r = (e = t.fixResponse(e)).fns;
                for (const e in r) {
                    const t = r[e];
                    for (const i in t) {
                        n.fns = n.fns || {}, n.fns[e] = n.fns[e] || {};
                        const r = n.fns[e][i];
                        if (r)
                            if (parseInt(r.vn) == parseInt(t[i].vn)) {
                                const r = n.fns[e][i].argVn;
                                let o = !0;
                                for (const e in r) {
                                    if (!t[i].argVn[e] || !o) {
                                        o = !1;
                                        break
                                    }
                                    for (const n in r[e]) {
                                        const s = t[i].argVn[e][n],
                                            a = r[e][n];
                                        if (!s || parseInt(a) <= parseInt(s)) {
                                            o = !1;
                                            break
                                        }
                                    }
                                }!o && (n.fns[e][i] = t[i])
                            } else parseInt(r.vn) < parseInt(t[i].vn) && (n.fns[e][i] = t[i]);
                        else n.fns[e][i] = t[i]
                    }
                }
                t.storageObj.setVal(t.storageLookUpKey, JSON.stringify(n))
            }))
        }
    }
    window.VWO.modules.tags = {};
    class Yn {
        otherSide(...e) {
            e[0] = "VWO.modules.tags.checkEnvironment." + e[0], window.fetcher.getValue(...e)
        }
    }
    window.VWO.modules.tags.checkEnvironment = {};
    const zn = "lT",
        Xn = "sT",
        qn = "ivp",
        Qn = "gp",
        Zn = "ca",
        er = 10,
        tr = 2,
        ir = function() {},
        nr = "w",
        rr = window.VWO.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM || 1 / 48,
        or = "_vis_opt_",
        sr = "_vwo_",
        ar = {
            TRACK_GLOBAL_COOKIE_NAME: "_vwo_ds",
            TRACK_SESSION_COOKIE_NAME: "_vwo_sn",
            TRACK_SESSION_COOKIE_EXPIRY: rr,
            SESSION_TIMER_EXPIRE: 60 * rr * 60 * 1e3 * 24,
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

    function lr() {
        return Math.min(window.VWO.TRACK_GLOBAL_COOKIE_EXPIRY_CUSTOM || window.VWO.data.rp || 90, 90)
    }

    function cr() {
        return {
            [or + "test_cookie"]: 0,
            [sr + "ds"]: lr(),
            [sr + "sn"]: rr,
            [sr + "referrer"]: 18e-5,
            [sr + "uuid"]: 3650,
            [sr + "uuid_v2"]: 366,
            [ar.SAME_SITE]: 3650
        }
    }
    const dr = {
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
    class ur {
        otherSide(...e) {
            return e[0] = "window.VWO.modules.utils.campaignUtils." + e[0], window.fetcher.getValue(...e)
        }
    }
    let gr;

    function vr(e) {
        if (!e) return e;
        try {
            e = window.decodeURIComponent(e)
        } catch (e) {}
        return e
    }
    const pr = function() {
        if (void 0 !== gr) return gr;
        const e = [],
            t = window.VWO._.allSettings.dataStore.campaigns;
        let i, n;
        for (let i in t) e.push(i);
        return gr = !!(i = (window.location.search + window.location.hash).match(/.*_vis_test_id=(.*?)&.*_vis_opt_preview_combination=(.*)$/)) && (!(!e.includes(i[1]) || !t[i[1]] || void 0 === t[i[1]].combs[n = vr(i[2])]) && n), gr
    };
    class hr {
        constructor() {
            this.uuid = "", this.TPJarExpiry = 730, this.preview = pr
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
            return "SPLIT_URL" === e.type && e[qn]
        }
        shouldTrackUserForCampaign(e) {
            return !e || !window._vwo_code || !window._vwo_code[zn] && !window._vwo_code[Xn] || (this.isDomIndependentCampaign(e.type) || this.isSplitVariation(e))
        }
        getUUIDString(e) {
            return e ? "&u=" + e : ""
        }
        isAnalyzeCampaign(e) {
            return "ANALYZE_RECORDING" === e || "ANALYZE_HEATMAP" === e || "ANALYZE_FORM" === e
        }
        updateGoalsKind(e) {
            let t = {};
            Object.keys(e).forEach((i => {
                const n = e[i],
                    r = e[i].mt;
                r && Object.keys(n.goals).length && Object.entries(r).forEach((([e, n]) => {
                    const r = this.getGoalKind(n);
                    r && (t[i] = t[i] || {}, t[i][e] = r)
                }))
            })), window.VWO._.goalsToBeConvertedSynchronously = t
        }
        getGoalKind(e) {
            let t;
            const i = window.VWO._.allSettings.triggers[e];
            if (i)
                if ("object" == typeof i.cnds[0]) {
                    switch (i.cnds[0].event) {
                        case dr.DOM_CLICK:
                            t = "CLICK_ELEMENT";
                            break;
                        case dr.DOM_SUBMIT:
                            t = "FORM_SUBMIT"
                    }
                } else {
                    switch (i.cnds[1].event) {
                        case dr.DOM_SUBMIT:
                        case dr.DOM_CLICK:
                            t = "ENGAGEMENT"
                    }
                }
            return t
        }
    }

    function wr(e, t) {
        window.fetcher.getValue('VWO.modules.utils.helperFunctions.onUrlChange("${{1}}", "${{2}}")', null, {
            captureGroups: [e, t]
        })
    }

    function fr(e, t) {
        let i, n = !1;
        return function(...r) {
            n && (clearTimeout(i), i = null), i = setTimeout((function() {
                e.apply(null, r)
            }), t), n = !0
        }
    }
    class mr {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.dataSync." + e[0], window.fetcher.getValue(...e)
        }
    }
    var Er = {
            PARSE_TLD: "pTLD"
        },
        _r = ["co", "org", "com", "net", "edu", "au", "ac"],
        yr;

    function Or(e) {
        var t, i = e.split("."),
            n = i.length,
            r = i[n - 2];
        return r && _r.includes(r) ? (t = i[n - 3] + "." + r + "." + i[n - 1], Ji(Er.PARSE_TLD, e, t), t) : (t = r + "." + i[n - 1], Ji(Er.PARSE_TLD, e, t), t)
    }
    const Sr = {
        init: function() {
            yr = Bn.get("_vwo_referrer"), Bn.erase("_vwo_referrer"), "string" != typeof yr && (yr = document.referrer)
        },
        get: function() {
            return -1 !== location.search.search("_vwo_test_ref") ? document.referrer : yr
        },
        set: function() {
            Bn.create("_vwo_referrer", yr, 18e-5)
        }
    };
    window.VWO.modules.vwoUtils.referrer = Sr;
    const Tr = {
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
            return window._vis_opt_domain || window._vwo_cookieDomain || Or(location.host)
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
                title: Tr.pageTitle,
                url: Tr.currentUrl,
                referrerUrl: Sr.get()
            }
        },
        get timeSpentInASession() {
            var e, t, i, n, r, o;
            return +Date.now() - 1e3 * +(null === (i = null === (t = null === (e = window.VWO.phoenix) || void 0 === e ? void 0 : e.store) || void 0 === t ? void 0 : t.getters) || void 0 === i ? void 0 : i.sessionStart) ? (+Date.now() - 1e3 * +(null === (o = null === (r = null === (n = window.VWO.phoenix) || void 0 === n ? void 0 : n.store) || void 0 === r ? void 0 : r.getters) || void 0 === o ? void 0 : o.sessionStart)) / 1e3 : 0
        },
        get vwoUUID() {
            return window._vwo_uuid
        }
    };
    class Ir {
        constructor() {
            this.vwoEventsToBeSynced = {
                [dr.VARIATION_SHOWN]: {
                    ignoreMetricDataCheck: !0
                },
                [dr.PAGE_VIEW]: {},
                [dr.DOM_CLICK]: {},
                [dr.DOM_SUBMIT]: {},
                [dr.CUSTOM_CONVERSION]: {},
                [dr.SYNC_VISITOR_PROP]: {
                    ignoreMetricDataCheck: !0
                }
            }
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.dataSync.utils." + e[0], window.fetcher.getValue(...e)
        }
        shouldSendEventCall(e, t) {
            var i;
            const n = t.name;
            if (!n) return !1;
            const r = this.vwoEventsToBeSynced[t.name];
            if (void 0 === r && !t.props.isCustomEvent) return !1;
            if (t.props.isCustomEvent) return !0;
            if (!r || !r.ignoreMetricDataCheck) {
                const t = null === (i = e.eventDataConfig) || void 0 === i ? void 0 : i[n];
                if (!t || Object.keys(t).length <= 0) return !1
            }
            if (t.name !== dr.VARIATION_SHOWN) return !0;
            let o = "non-analytics";
            location.href.includes("jsMode=Any") && (o = "analytics");
            const s = null == t ? void 0 : t.props,
                a = null == s ? void 0 : s.id;
            if (!s || !a) return !1;
            const l = e.currentSettings.dataStore.campaigns[a] || window._vwo_exp[a],
                c = window.VWO.modules.utils.libUtils.isSessionBasedCampaign2(l),
                d = "SURVEY" === l.type;
            return !(!("analytics" === o || "non-analytics" === o && s.isFirst) || c || d)
        }
        evaluateDataForEventsCall(e, t, i) {
            let n = !0;
            this.syncAdditionalDataWithEventsData(e.eventDataConfig, i);
            const r = {
                d: {}
            };
            return r.d.msgId = `${t}-${+new Date}`, r.d.visId = t, r.d.event = {
                props: this.excludeEventPropsNotToBeSynced(e, i.name, i.props),
                name: i.name,
                time: i.time
            }, i.props.$visitor && (r.d.visitor = this.excludeVisitorPropsNotToBeSynced(e, i.props.$visitor), delete i.props.$visitor, Object.keys(r.d.visitor.props).length <= 0 && (n = !1)), r.d.event.props.page = i.page || this.getPageInfo(), {
                payload: r,
                shouldSyncCall: n
            }
        }
        getPageInfo() {
            return Tr.page
        }
        excludeVisitorPropsNotToBeSynced(e, t) {
            if (!t) return {
                props: {}
            };
            const i = t.props,
                n = e.currentSettings.dataStore.visitorProps || window.VWO._.allSettings.dataStore.visitorProps,
                r = {};
            for (const e in i)
                if (Object.prototype.hasOwnProperty.call(i, e)) {
                    const t = null == n ? void 0 : n[e];
                    t && !t.nS && (r[e] = i[e])
                }
            return t.props = r, t
        }
        syncAdditionalDataWithEventsData(e, t) {
            const i = null == e ? void 0 : e[t.name];
            if (i) {
                for (const e in i)
                    if (Object.prototype.hasOwnProperty.call(i, e) && "shouldSyncData" !== e) {
                        const n = i[e];
                        if (void 0 === n) continue;
                        t.props ? t.props[e] = n : t[e] = n
                    }
                this.resetDataForCurrentEvent(e, t.name)
            }
        }
        resetDataForCurrentEvent(e, t) {
            e && e[t] && (e[t] = {})
        }
        excludeEventPropsNotToBeSynced(e, t, i) {
            var n, r, o, s, a, l, c;
            const d = ["fireLinkedTagSync", "isTrusted", "page"];
            if (!i.isCustomEvent) {
                const i = (null === (s = null === (o = null === (r = null === (n = e.currentSettings) || void 0 === n ? void 0 : n.dataStore) || void 0 === r ? void 0 : r.events) || void 0 === o ? void 0 : o[t]) || void 0 === s ? void 0 : s.nS) || (null === (c = null === (l = null === (a = window.VWO._.allSettings.dataStore) || void 0 === a ? void 0 : a.events) || void 0 === l ? void 0 : l[t]) || void 0 === c ? void 0 : c.nS) || [];
                Array.prototype.push.apply(d, i)
            }
            if (!d || !d.length) return i;
            const u = {};
            for (const e in i) Object.prototype.hasOwnProperty.call(i, e) && (d.indexOf(e) > -1 ? delete u[e] : u[e] = i[e]);
            return u
        }
    }
    class Cr extends Ir {
        sendCall(e, t, i, n, r, o, s) {
            return this.otherSide("sendCall", [e, t, i, n, r, o, s])
        }
        addDataFromMTAndSend(e, t, i, n, r, o, s) {
            return this.otherSide("addDataFromMTAndSend", [e, t, i, n, r, o, s])
        }
        getDataForEventsCall(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                const i = window.VWO.modules.tags.sessionInfoService;
                let {
                    payload: r,
                    shouldSyncCall: o
                } = this.evaluateDataForEventsCall(e, t, n);
                return r.d.sessionId = yield i.getSessionId(), {
                    data: JSON.stringify(r),
                    shouldSyncCall: o
                }
            }))
        }
    }
    var br = new Cr;
    class Nr extends mr {
        execute({
            event: e,
            getters: t
        }, n, r, o, s) {
            return i(this, void 0, void 0, (function*() {
                if (r = r || ir, t.visDebug) r && r(o);
                else if (br.shouldSendEventCall(t, e)) {
                    s = s || (yield Gr.createUUIDCookie2(t, n));
                    const {
                        data: i,
                        shouldSyncCall: a
                    } = yield br.getDataForEventsCall(t, s, e);
                    a && (yield br.addDataFromMTAndSend(t, null, i, r, !0, o, e))
                } else r && r(o)
            }))
        }
    }
    const Ar = new Nr,
        Rr = Ar.execute.bind(Ar);
    class Vr {
        toAbsURL(e) {
            return new URL(e, document.baseURI).href
        }
        isHashPresent(e) {
            return -1 !== e.indexOf("#")
        }
        isQueryParamPresent(e, t) {
            var i = e.indexOf("#"),
                n = e.indexOf("?"),
                r = t ? -1 : e.indexOf("=");
            return -1 === i ? -1 !== n || -1 !== r : -1 !== n && i > n || -1 !== r && i > r
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.vwoUtils.urlUtils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class xr extends Vr {}
    const Pr = new xr;
    window.VWO.modules.vwoUtils.urlUtils = Pr;
    const Dr = {};

    function Lr({
        vwoEvents: e,
        getters: t,
        data: n,
        actions: r,
        event: o
    }, s, a = {}, l = null) {
        var c, d, u;
        return i(this, void 0, void 0, (function*() {
            if (o.name = s || o.name, null === (c = Dr[o.name]) || void 0 === c ? void 0 : c.shouldWaitForCallbackExecution) return;
            if ((null === (d = o.name) || void 0 === d ? void 0 : d.startsWith("trigger.vwo_convertRemanentGoals")) && (o.name = o.realName, delete o.realName), !o.props) {
                o.props = {};
                const e = ["name", "props"];
                for (const t in o) Object.prototype.hasOwnProperty.call(o, t) && (e.includes(t) || (o.props[t] = o[t]));
                Object.keys(a).forEach((e => {
                    o.props[e] = a[e]
                }))
            }
            let i;
            o.name === dr.DOM_SUBMIT || o.name === dr.DOM_CLICK && o.targetUrl ? o.props.targetUrl = o.targetUrl = Pr.toAbsURL(o.targetUrl) : o.name === dr.VARIATION_SHOWN && (i = t.settings.campaigns[o.props.id]), o.time = o.time || +new Date;
            let g = null === (u = t.eventDataConfig) || void 0 === u ? void 0 : u[o.name];
            if (g && g.splitAmongMultipleCalls) {
                const i = Object.keys(g);
                for (let s = i.length - 1; s >= 0; --s) {
                    const a = i[s];
                    if ("splitAmongMultipleCalls" === a) continue;
                    const c = g[a].uuid;
                    delete g[a].uuid, t.eventDataConfig[o.name] = g[a], yield Rr({
                        getters: t,
                        event: o,
                        data: n,
                        actions: r,
                        vwoEvents: e
                    }, t.settings.campaigns[a], l, null, c)
                }
            } else yield Rr({
                getters: t,
                event: o,
                data: n,
                actions: r,
                vwoEvents: e
            }, i, l)
        }))
    }

    function kr(e, t, n, r = null) {
        const o = window.phoenix;
        return n.name = n.name || t, Dr[t] = Dr[t] || {}, Dr[t].shouldWaitForCallbackExecution = !0, (e = e || o).trigger(t, n, (function(e) {
            return i(this, void 0, void 0, (function*() {
                const i = o.store,
                    n = i.getters;
                Dr[t].shouldWaitForCallbackExecution = !1, delete e._vwo, yield Lr({
                    getters: n,
                    actions: i.actions,
                    event: e,
                    vwoEvents: o,
                    data: {}
                }, t, {}, r)
            }))
        }))
    }

    function Ur(e, t, i, n = {}) {
        return kr(e, t, Object.assign({
            name: t,
            time: +new Date,
            props: i
        }, n))
    }
    const Mr = {
        variationShown(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                e = e || window.phoenix, n && void 0 === n.isFirst && (n.isFirst = t.isFirst), yield Ur(e, dr.VARIATION_SHOWN, t)
            }))
        },
        dimensionTagPushed(e, t) {
            Ur(e = e || window.phoenix, dr.DIMENSION_TAG_PUSHED, t)
        },
        unhideElement(e, t) {
            Ur(e, dr.UNHIDE_ELEMENT, void 0, t)
        }
    };
    window.VWO.modules.events = {
        syncEventsDataToDataLayer: Lr,
        fireEventAndSyncData: kr,
        events: Mr
    };
    class Wr extends hr {
        constructor() {
            super(...arguments), this.TPJarExpiry = 730, this.hideElExpression = "{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}"
        }
        isGloballyOptedOut(e) {
            return i(this, void 0, void 0, (function*() {
                return !!parseInt(yield e.storages.storages.cookies.get(ar.GLOBAL_OPT_OUT), 10)
            }))
        }
        getSettings(e, t) {
            return i(this, void 0, void 0, (function*() {
                if (window._vis_debug || pr()) return;
                const i = [],
                    n = t.vwoInternalProperties.experimentIds,
                    r = t.settings.campaigns,
                    o = t.serverUrl,
                    s = t.pageGroupPageConfig,
                    a = t.pageGroupExperimentConfig,
                    l = [],
                    c = [];
                for (const e in s) Object.hasOwnProperty.call(s, e) && l.push(e);
                for (const e in a) Object.hasOwnProperty.call(a, e) && c.push(e);
                const d = [];
                for (let e = 0; e < n.length; e++) r[n[e]] ? i.push(n[e]) : d.push(n[e]);
                let u = yield t.storages.storages.cookies.get("wgs_uuid");
                u = u || "";
                let g = o + "settings.js?a=" + t.accountId + "&settings_type=" + e + "&vn=&eventArch=1&uuid=" + u;
                if (2 !== e && 3 !== e || (g = g + "&u=" + encodeURIComponent(t.currentUrl)), c.length) {
                    g += "&ec=" + c.join("|")
                }
                if (l.length) {
                    g += "&pc=" + l.join("|")
                }
                if (t.smartCodeVersion >= 1.4) {
                    let e;
                    if (Ki._.jar) {
                        const t = Ki._.jar.getAll();
                        e = t && Object.keys(t).filter((function(e) {
                            return e.match(/(vis_opt_exp_\d*._combi+)/g)
                        })).map((function(e) {
                            return (e + "=" + t[e]).match(/([\d,]+)/g).join("-")
                        })).join("|")
                    } else e = yield window._vwo_code.getCombinationCookie();
                    e && (g += "&c=" + e)
                }
                if (i.length) {
                    const e = "&exc=" + i.join("|");
                    g.length + e.length < 2e3 && (g += e)
                }
                this.otherSide("loadScript", [g])
            }))
        }
        doNotTrack(e) {
            if (e.settings.vwoData.dntEnabled) return "yes" === e.navigator.doNotTrack || "1" == e.navigator.doNotTrack || "1" == e.navigator.msDoNotTrack || "1" == e.doNotTrack
        }
        _optOut(e, t) {
            return t.trigger(dr.OPT_OUT, {
                oldArgs: [!1]
            }), !1
        }
        isSSApp({
            getters: e,
            vwoEvents: t
        }) {
            var i;
            const n = Ki._.sstd;
            if (!n) return !1;
            if (e.vwoInternalProperties.ssdm) return Ki.data.sst && e.vwoInternalProperties.ssdm;
            try {
                let t = null === (i = e.document.domain) || void 0 === i ? void 0 : i.match(n);
                if (t = window.document.domain.match(n), t && t.length > 0) return Ki.data.sst
            } catch (e) {
                return t.trigger(dr.ERROR, {
                    msg: `Invalid regex for domain. sstd = ${Ki._.sstd}`,
                    source: encodeURIComponent(`Invalid regex for domain. VWO._.sstd = ${Ki._.sstd}`)
                }), !1
            }
        }
        shouldStopExecWhenSsmNotFound(e) {
            return "https:" !== e.location.protocol && this.otherSide("shouldStopExecWhenSsmNotFound()")
        }
        setTPCJarValue(e, t, n, r, o, s, a) {
            return i(this, void 0, void 0, (function*() {
                const i = e.storages.storages.cookies;
                yield i.setThirdPartyCookiesInJar(t, n, r, s), this.__vwoCookie = yield i.getThirdPartyJarValue(), this.dTP = this.dTP || fr((() => window.VWO.phoenix.storages.get("cookies").createThirdParty.call(window.VWO.phoenix.storages.get("cookies"), "_vwo", this.__vwoCookie, this.TPJarExpiry, void 0, void 0, void 0, a)), 50), this.__vwoCookie && this.dTP()
            }))
        }
        setCampaignIds(e) {
            return i(this, void 0, void 0, (function*() {
                this.otherSide('setCampaignIds("${{1}}", "${{2}}")', null, [e]);
                const {
                    actions: t,
                    getters: i
                } = Ki.phoenix.store, n = i.vwoInternalProperties.experimentIds || [];
                e.forEach((e => n.push(+e))), t.addValues({
                    experimentIds: n
                }, "vwoInternalProperties")
            }))
        }
        isCustomTrigger(e) {
            var t;
            return null === (t = e.cnds) || void 0 === t ? void 0 : t.some((function(e) {
                var t;
                return "object" == typeof e && null !== e && (null === (t = e.filters) || void 0 === t ? void 0 : t.some((function(e) {
                    return e instanceof Array && e.indexOf("exec") >= 0
                })))
            }))
        }
        addListener(e, t, i, n) {
            if (!i || !Object.keys(i).length) return;
            let r;
            const o = i.eventName,
                s = i.triggerID,
                a = i.trigger;
            if (s) {
                const t = e.currentSettings.triggers[s];
                r = t && this.isCustomTrigger(t) ? `trigger.${s}` : t
            }
            if (r = r || o || a, r) {
                return [r, t.on(r, n)]
            }
        }
        extraData2(e) {
            return i(this, void 0, void 0, (function*() {
                return this.otherSide('extraData2("${{1}}")', null, [e])
            }))
        }
        shouldTrackUserForCampaign(e) {
            return !e || !window._vwo_code || !window._vwo_code[zn] && !window._vwo_code[Xn] || (this.isDomIndependentCampaign(e.type) || this.isSplitVariation(e))
        }
        createCookie(e, t, n, r, o) {
            return i(this, void 0, void 0, (function*() {
                const i = (e = e || Ki.phoenix.store.getters).storages.storages.cookies;
                this.shouldTrackUserForCampaign(o) && (o && o.multiple_domains ? yield i.createThirdParty(t, n, r, void 0, o.id, void 0, o): yield i.create(t, n, r))
            }))
        }
        createUUIDCookie2(e, t) {
            return i(this, void 0, void 0, (function*() {
                e = e || window.VWO.phoenix.store.getters;
                const i = yield this.getUUID(e, t), n = t && t.id && t.multiple_domains ? "_" + t.id : "";
                return (yield e.storages.storages.cookies.get("_vwo_uuid" + n)) || (yield this.createCookie(e, "_vwo_uuid" + n, i, ar.UUID_COOKIE_EXPIRY, t)), Ki.data = Ki.data || {}, Ki.data.vin = Ki.data.vin || {}, Ki.data.vin.uuid = i, yield window.fetcher.setValue("VWO.data.vin", Ki.data.vin), i
            }))
        }
        getUUID(e, t) {
            return i(this, void 0, void 0, (function*() {
                e = e || Ki.phoenix.store.getters, t = t || {}, this.uuid = e.vwoUUID;
                const i = t && t.id && t.multiple_domains && (yield e.storages.storages.cookies.get("_vwo_uuid_" + t.id)) || (yield e.storages.storages.cookies.get("_vwo_uuid"));
                return this.uuid = i || this.uuid || this.generateUUID()
            }))
        }
        getSplitDecision(e, t) {
            return this.otherSide("getSplitDecision", [t])
        }
        loadWithDelay(e, t) {
            t ? setTimeout(e, t) : e()
        }
        loadScript(e, t, i) {
            window.fetcher.getValue('VWO.modules.utils.loadScript("${{1}}", "${{2}}", "${{3}}")', null, {
                captureGroups: [e, t, i]
            })
        }
        loadNonTestingLibraries(e, t, i) {
            var n, r, o, s, a, l, c;
            const d = e.serverUrl,
                u = null === (r = null === (n = e.settings) || void 0 === n ? void 0 : n.plugins) || void 0 === r ? void 0 : r.LIBINFO,
                g = e.vwoInternalProperties.dtcTimer,
                v = null === (o = null == u ? void 0 : u.TRACK) || void 0 === o ? void 0 : o.HASH,
                p = null === (s = null == u ? void 0 : u.OPA) || void 0 === s ? void 0 : s.HASH,
                h = null === (a = null == u ? void 0 : u.OPA) || void 0 === a ? void 0 : a.PATH,
                w = null === (l = null == u ? void 0 : u.SURVEY) || void 0 === l ? void 0 : l.HASH;
            let f = !1,
                m = !1;
            const E = null === (c = e.vwoInternalProperties) || void 0 === c ? void 0 : c.loadPC;
            let _ = !1;
            const y = [];
            for (const e in t)
                if (Object.prototype.hasOwnProperty.call(t, e)) {
                    const i = t[e];
                    if ("ANALYSIS" !== i.type && "ANALYZE_FORM" !== i.type && "ANALYZE_HEATMAP" !== i.type && "ANALYZE_RECORDING" !== i.type || (f = !0, m = !0), "FUNNEL" !== i.type && "TRACK" !== i.type || (m = !0), "SURVEY" === i.type || i.survey && i.survey.id)
                        for (var O in m = !0, _ = !0, i.survey) Object.prototype.hasOwnProperty.call(i.survey, O) && y.push(O)
                }
            E && this.loadWithDelay((() => {
                this.loadScript(`${d}web/djIkcGM6MS4w/tag-1a6cb79d9b921e9f733a3a9f91c43b90.js`, null, (function() {}))
            }), g), m && !Ki.v_t && this.loadWithDelay((() => {
                this.loadScript(`${d}7.0/track-${v}.js`)
            }), g), f && !Ki.nls && (Ki.v_t || this.loadWithDelay((() => {
                this.loadScript(`${d}7.0/track-${v}.js`)
            }), g), this.loadWithDelay((() => {
                this.loadScript(`${d}analysis${h}/opa-${p}.js`, null, (function() {}))
            }), g)), _ && !Ki.survey && (Ki.v_t || this.loadWithDelay((() => {
                this.loadScript(`${d}7.0/track-${v}.js`)
            }), g), Ki._.allSettings.dataStore.previewExtraSettings || this.loadWithDelay((() => {
                this.loadScript(`${d}va_survey-${w}.js`)
            }), g)), _ && i && Ki.phoenix.trigger(dr.NEW_SURVEY_FOUND, {
                oldArgs: [y]
            })
        }
        checkForWrongConsent({
            getters: e,
            vwoEvents: t
        }) {
            return this.isSSApp({
                getters: e,
                vwoEvents: t
            }) && "http:" === e.location.protocol
        }
        shouldExecuteLib({
            getters: e,
            actions: t,
            vwoEvents: n
        }) {
            return i(this, void 0, void 0, (function*() {
                const i = !e.flags.cookieLessModeEnabled,
                    r = this.otherSide("areCookiesDisabled", [i]);
                if (i) {
                    const i = this.checkForWrongConsent({
                        getters: e,
                        vwoEvents: n
                    });
                    let r;
                    if (i || (r = yield this.shouldStopExecWhenSsmNotFound(e)), i || r) {
                        e.vwoCode && e.vwoCode.finish(), kr(n, dr.SHOULD_EXECUTE_LIB_ERROR, i ? {
                            message: "SameSite;Secure enabled but visitor landed on HTTP page and thus cookies can't be created",
                            oldArgs: [void 0, void 0, void 0, void 0, void 0, void 0, 1]
                        } : {
                            message: "Visitor has been to HTTPS page when SameSite and Secure cookies were dropped",
                            oldArgs: [void 0, !0, void 0, void 0, void 0, void 0, 2]
                        });
                        const r = [{
                            shouldExecuteLib: !1,
                            destinationMT: "VWO._.shouldExecuteLib"
                        }];
                        return this.setPropertiesToBothThreads(t, r, "vwoInternalProperties")
                    }
                }
                if (this.isTrackingNotPossible) {
                    const e = [{
                        shouldExecuteLib: !this.isTrackingNotPossible,
                        destinationMT: "VWO._.shouldExecuteLib"
                    }];
                    return this.setPropertiesToBothThreads(t, e, "vwoInternalProperties")
                }
                const o = yield r;
                if (!o) {
                    if (this.preview() || e.visDebug) {
                        const e = [{
                            shouldExecuteLib: !0,
                            destinationMT: "VWO._.shouldExecuteLib"
                        }];
                        return this.setPropertiesToBothThreads(t, e, "vwoInternalProperties")
                    }
                    if (this.doNotTrack(e) || (yield this.isGloballyOptedOut(e)) || this._optOut(e, n)) {
                        e.vwoCode && e.vwoCode.finish(), kr(n, dr.SHOULD_EXECUTE_LIB_ERROR, {
                            message: "User has opted out"
                        }), this.isTrackingNotPossible = !0, t.addValues({
                            optOut: !0
                        }, "vwoInternalProperties");
                        const i = [{
                            shouldExecuteLib: !1,
                            destinationMT: "VWO._.shouldExecuteLib"
                        }];
                        return this.setPropertiesToBothThreads(t, i, "vwoInternalProperties")
                    }
                    const i = [{
                        shouldExecuteLib: !0,
                        destinationMT: "VWO._.shouldExecuteLib"
                    }];
                    return this.setPropertiesToBothThreads(t, i, "vwoInternalProperties")
                }
                t.addValues({
                    cookiesDisabled: !0
                }, "vwoInternalProperties"), kr(n, dr.SHOULD_EXECUTE_LIB_ERROR, {
                    message: "Cookies disabled",
                    oldArgs: [void 0, o]
                }), this.isTrackingNotPossible = !0;
                return this.setPropertiesToBothThreads(t, [{
                    shouldExecuteLib: !1,
                    destinationMT: "VWO._.shouldExecuteLib"
                }], "vwoInternalProperties")
            }))
        }
        getSelectorPath(e, t, i) {
            let n = i[1].variations[e];
            if ("string" == typeof n && (n = vwo_$.parseJSON(n)), n)
                for (let e = 0; e < n.length; e++) n[e].xpath && (t += n[e].xpath + ",");
            return t
        }
        getCampaignXPath(e) {
            let t = e.xPath;
            if (t) return t;
            if (!this.isDomDependent(e.type)) return "";
            t = "";
            let i = e.combination_chosen || e.cc;
            const n = e.sections;
            if ("VISUAL_AB" === e.type)
                if (i) 1 != i && (t = this.getSelectorPath(i, t, n));
                else
                    for (i in e.combs) e.combs.hasOwnProperty(i) && (t = this.getSelectorPath(i, t, n));
            else {
                const e = Pn(n);
                let i = e.length;
                for (; i--;) n[e[i]].path && (t += n[e[i]].path + ",")
            }
            return t ? (t = t.substr(0, t.length - 1), e.xPath = t, t) : ""
        }
        insertCSS(e, t) {
            this.otherSide("insertCSS", [e, t])
        }
        hideElements(e, t, i) {
            let n, r, o;
            const s = [e.id];
            if (e.id)
                for (r = s.length; r--;) {
                    o = s[r];
                    const t = this.getCampaignXPath(e) || i || "";
                    t.split(",").forEach((function(e) {
                        performance.mark(`el-${e}-hidden`)
                    })), n = t ? t + this.hideElExpression : "", n && this.insertCSS("_vis_opt_path_hides_" + o, n)
                } else n = t.vwoText || "", this.insertCSS("_vis_opt_path_hides", n)
        }
        setPropertiesToBothThreads(e, t, i) {
            let n = {};
            t.forEach((e => {
                const t = Object.keys(e)[0],
                    i = e[t];
                n = Object.assign(Object.assign({}, n), {
                    [t]: i
                }), window.fetcher.setValue(e.destinationMT, i)
            })), e.addValues(n, i)
        }
    }
    const Gr = new Wr;
    var Fr, jr, $r, Hr, Br, Jr, Kr;
    window.VWO.modules.utils.libUtils = Gr,
        function(e) {
            e.DOM = "vwo_dom"
        }(Fr || (Fr = {})),
        function(e) {
            e.WILD_CARD = "*", e.TRIGGER = "trigger", e.POST_INIT = "post-init", e.TIMER = "vwo_timer"
        }(jr || (jr = {})),
        function(e) {
            e.URL_CHANGE = "vwo_urlChange", e.LEAVE_INTENT = "vwo_leaveIntent", e.CLICK_EVENT = "vwo_dom_click", e.SUBMIT_EVENT = "vwo_dom_submit"
        }($r || ($r = {})),
        function(e) {
            e.PAGE_VIEW = "vwo_pageView"
        }(Hr || (Hr = {})),
        function(e) {
            e.EXIT_CONDITIONS = "__exitConditions"
        }(Br || (Br = {})),
        function(e) {
            e.DOM_CONTENT_LOADED = "DOMContentLoaded", e.SCROLL = "scroll", e.CLICK = "click", e.SUBMIT = "submit"
        }(Jr || (Jr = {})),
        function(e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARN = 2] = "WARN", e[e.ERROR = 3] = "ERROR"
        }(Kr || (Kr = {}));
    class Yr {
        constructor(e) {
            this.setLevel(e)
        }
        setLevel(e = "warn") {
            this.logLevel = Kr[e.toUpperCase()]
        }
        info(e, t = {}) {
            this.customLog(Kr.INFO, e, t)
        }
        debug(e, t = {}) {
            this.customLog(Kr.DEBUG, e, t)
        }
        warn(e, t = {}) {
            var i, n;
            this.customLog(Kr.WARN, e, t, null === (n = null === (i = window.VWO) || void 0 === i ? void 0 : i._) || void 0 === n ? void 0 : n.customError)
        }
        error(e, t = {}) {
            var i, n;
            this.customLog(Kr.ERROR, e, t, null === (n = null === (i = window.VWO) || void 0 === i ? void 0 : i._) || void 0 === n ? void 0 : n.customError)
        }
        customLog(e, t, i, n = null) {
            var r, o, s;
            if (e >= this.logLevel) {
                const a = this.formatMessage(e, t, i);
                null === (s = null === (o = null === (r = window.VWOEvents) || void 0 === r ? void 0 : r.store) || void 0 === o ? void 0 : o.actions) || void 0 === s || s.addLogsForDebugging(a), n ? n(a) : this.consoleLog(e, [a])
            }
        }
        consoleLog(e, t) {
            switch (e) {
                case Kr.INFO:
                    console.info(...t);
                    break;
                case Kr.WARN:
                    console.warn(...t);
                    break;
                case Kr.ERROR:
                    console.error(...t);
                    break;
                default:
                    console.log(...t)
            }
        }
        formatMessage(e, t, i) {
            var n, r;
            const o = Object.keys(i).reduce(((e, t) => e.replace(new RegExp(`{{${t}}}`, "g"), i[t])), t),
                s = `${Fr.DOM}_`;
            let a = i;
            const l = (null === (n = i.data) || void 0 === n ? void 0 : n.vwoEventName) || i.vwoEventName;
            return l !== s + Jr.CLICK && l !== s + Jr.SUBMIT || (a = i.data ? null === (r = i.data) || void 0 === r ? void 0 : r.props : a.props, a = a || {
                name: l
            }), `VWO: [${Kr[e].toUpperCase()}] [${(new Date).toUTCString()}] ${o} ${JSON.stringify(a)}`
        }
    }
    var zr = new Yr("warn"),
        Xr = function(e) {
            return e.replace(/^(https?:\/\/)(?:w{3}\.)?(.*?)(?:\/(?:home|default|index)\..{3,4}|\/$)?(?:\/)?([\?#].*)?$/i, "$1$2$3")
        },
        qr = function(e) {
            return e.replace(/^(https?:\/\/)(?:w{3}\.)?(.*?)(?:(?:home|default|index)\..{3,4})?([\?#].*)?$/i, "$1$2$3")
        },
        Qr = function(e) {
            return qr(e).replace(/\/\?/gi, "?")
        },
        Zr = window._vis_opt_url,
        eo;
    class to {
        constructor() {
            eo = this
        }
        regexEscape(e) {
            return e.replace(/[\-\[\]{}()*+?.,\/\\^$|#\s]/g, "\\$&")
        }
        cleanURL(e, t) {
            return Zr && !t ? Zr : e.replace(/^(.*[^\*])(\/(home|default|index)\..{3,4})((\?|#).*)*$/i, "$1$4")
        }
        removeWWW(e, t) {
            return e = e.replace(/^(https?:\/\/)(www\.)?(.*)$/i, "$1$3"), t && (e = e.replace(/(^\*?|\/\/)www\./i, "$1")), e
        }
        stripSlashes(e, t, i) {
            if (e = e.replace(/\/$/, ""), t) {
                var n = e.indexOf("/?");
                e.indexOf("?") - 1 === n && (e = e.replace(/\/\?([^\?]*)(.*)/, "?$1$2"))
            }
            if (i) {
                var r = e.indexOf("/#");
                e.indexOf("#") - 1 === r && (e = e.replace(/\/#([^#]*)(.*)/, "#$1$2"))
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
        matchRegex(e, t, i, n) {
            if ("string" != typeof e || "string" != typeof t) return !1;
            let r = "ig";
            if (n) {
                const {
                    regex: i,
                    flags: n
                } = eo.cleanPattern(t);
                r = n || "g";
                try {
                    return new RegExp(i, r).exec(e)
                } catch (e) {
                    const n = "Failed to create regex for the pattern: " + t + ", the cleaned regex derived from the pattern is: " + i + " and regexFlag is: " + r;
                    return zr.error(n), !1
                }
            }
            var o = function(i) {
                var n = new RegExp(t, r).exec(e) || new RegExp(t, r).exec(i(e));
                if (!n && 0 !== e.indexOf("http")) {
                    const o = (new Vr).toAbsURL(e);
                    n = new RegExp(t, r).exec(o) || new RegExp(t, r).exec(i(o))
                }
                return n
            };
            let s = Xr,
                a = !1;
            390187 == window._vwo_acc_id && (a = !0), a && (s = Qr);
            var l = o(s);
            return l && !a ? (s = qr, i && o(s) || l) : l
        }
        matchWildcard(e, t, i) {
            if ("string" != typeof e || "string" != typeof t) return !1;
            const n = new Vr;
            var r = n.isQueryParamPresent(t),
                o = n.isHashPresent(t),
                s = n.isQueryParamPresent(e),
                a = n.isHashPresent(e);
            r || (s && a ? e = e.replace(/^(.*?)(\?[^#]*)(#?.*)$/, "$1$3") : s && !a && (e = e.replace(/^(.*)(\?.*)$/, "$1"))), o || a && (e = e.replace(/^(.*?)(#.*)$/, "$1")), "/" !== e && (e = eo.stripSlashes(e, s, a)), "/" !== t && (t = eo.stripSlashes(t, r, o));
            var l, c, d = new RegExp("^" + eo.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi");
            return d.test(e) ? (d = new RegExp("^" + eo.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !i || d.exec(e)) : (e = eo.removeWWW(e), t = eo.removeWWW(t, !0), (d = new RegExp("^" + eo.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi")).test(e) ? (d = new RegExp("^" + eo.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !i || d.exec(e)) : (l = eo.cleanURL(t, !0), -1 === t.indexOf("*") && ((c = eo.removeWWW(n.toAbsURL(e)).replace(/\/$/, "").replace(/\/\?/, "?")) === t || c === l) || (e = eo.cleanURL(e), t = l, !!(d = new RegExp("^" + eo.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi")).test(e) && (d = new RegExp("^" + eo.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !i || d.exec(e)))))
        }
    }
    const io = new to;
    window.VWO.modules.vwoUtils.url = io, window.VWO._.matchRegex = io.matchRegex;
    class no {
        verifyUrl(e, t, i, n) {
            let r = !1;
            const o = n ? e : this.getCleanedUrl(e);
            if (t)
                if (n) r = !!io.matchRegex(o, t, null, n);
                else {
                    const i = this.getCleanedUrl(e, !0);
                    r = !(!io.matchRegex(o, t, null, n) && !io.matchRegex(i, t, !0, n))
                }
            else r = io.matchWildcard(o, i) || io.matchWildcard(e, i);
            return r
        }
        getCleanedUrl(e, t) {
            if (!e) return;
            let i;
            return -1 !== e.search(/_vis_(test_id|hash|opt_(preview_combination|random))=[a-z\.\d,]+&?/) ? (i = e.replace(/_vis_(test_id|hash|opt_(preview_combination|random))=[a-z\.\d,]+&?/g, ""), i = t ? i.replace(/(\??&?)$/, "") : i.replace(/(\/?\??&?)$/, "")) : i = t ? e : e.replace(/\/$/, ""), i
        }
        compareUrlWithIncludeExcludeRegex(e, t, i, n) {
            const r = {};
            return i && io.matchRegex(e, i) ? (r.didMatch = !1, r.reason = 1, r) : (r.didMatch = this.verifyUrl(e, t, n), r.reason = r.didMatch ? 2 : 3, r)
        }
    }
    const ro = new no;
    var oo;
    ! function(e) {
        e.ANALYSIS = "r", e.ANALYZE_FORM = "a", e.ANALYZE_HEATMAP = "a", e.ANALYZE_RECORDING = "a", e.FUNNEL = "t", e.SURVEY = "s", e.TRACK = "t"
    }(oo || (oo = {}));
    class so extends ur {
        constructor() {
            super(...arguments), this.campaignsInternalMap = window.VWO._.campaignsInternalMap = {}
        }
        markGoalTriggered(e, t, n) {
            var r, o;
            return i(this, void 0, void 0, (function*() {
                if ("TRACK" === e.type) yield null === (o = (r = window.tracklib).markGoalTriggered) || void 0 === o ? void 0 : o.call(r, e.id, t);
                else {
                    let i = n.storages.storages.cookies.get("_vis_opt_exp_" + e.id + "_goal_" + t);
                    e.goals[t].mca && i ? yield Gr.createCookie(n, "_vis_opt_exp_" + e.id + "_goal_" + t, String(+i + 1), 100, e): yield Gr.createCookie(n, "_vis_opt_exp_" + e.id + "_goal_" + t, "1", 100, e)
                }
            }))
        }
        isGoalTriggered(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                if ("TRACK" === e.type) {
                    return !(yield window.tracklib.shouldTriggerGoal(e.id, t))
                }
                return e.goals[t].mca ? null : n.storages.storages.cookies.get("_vis_opt_exp_" + e.id + "_goal_" + t)
            }))
        }
        clearTimeouts(e) {
            return i(this, void 0, void 0, (function*() {
                yield this.otherSide("clearTimeoutsHandler", [e]), delete e.timeout
            }))
        }
        clearTimerAfterTimeout(e, t) {
            return i(this, void 0, void 0, (function*() {
                clearTimeout(e[nr]), e[nr] = setTimeout((() => {
                    this.clearTimeouts(e)
                }), (yield t.vwoInternalProperties.SPA_ELEMENT_WAIT_TIMEOUT) || 2e3)
            }))
        }
        getTrackGoalIdFromExp(e, t) {
            return Pn(t.settings.campaigns[e].goals)[0]
        }
        isExcluded(e, t) {
            return i(this, void 0, void 0, (function*() {
                const i = window.tracklib;
                return "TRACK" === t.type ? i.isGoalExcluded(this.getTrackGoalIdFromExp(t.id, e)) : "FUNNEL" === t.type ? i.isFunnelExcluded(t.id) : Gr.isAnalyzeCampaign(t.type) ? i.isAnalyzeCampaignExcluded(t.id) : !!(yield e.storages.storages.cookies.get("_vis_opt_exp_" + t.id + "_exclude"))
            }))
        }
        getCombi(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                e = e || Ki.phoenix.store.getters;
                const i = window.tracklib;
                return "TRACK" === t.type ? (null == i ? void 0 : i.isGoalIncluded) ? yield i.isGoalIncluded(this.getTrackGoalIdFromExp(t.id, e)): void(n || (yield window.fetcher.getValue('VWO.push("${{1}}")', null, {
                    captureGroups: [
                        ["track.delayedGoalConversion", {
                            campaignId: t.id,
                            type: "TRACK",
                            goalId: this.getTrackGoalIdFromExp(t.id, e)
                        }]
                    ]
                }))): "FUNNEL" === t.type ? (null == i ? void 0 : i.isFunnelIncluded) ? yield i.isFunnelIncluded(t.id): void(n || (yield window.fetcher.getValue('VWO.push("${{1}}")', null, {
                    captureGroups: [
                        ["track.delayedGoalConversion", {
                            campaignId: t.id,
                            type: "FUNNEL"
                        }]
                    ]
                }))): (null == Gr ? void 0 : Gr.isAnalyzeCampaign(t.type)) ? i.isAnalyzeCampaignIncluded ? yield i.isAnalyzeCampaignIncluded(t.id): void(n || (yield window.fetcher.getValue('VWO.push("${{1}}")', null, {
                    captureGroups: [
                        ["track.delayedGoalConversion", {
                            campaignId: t.id,
                            type: t.type
                        }]
                    ]
                }))): this.getCombiCookie(e, t.id)
            }))
        }
        getCombiCookie(e, t) {
            return e.visDebug || pr() ? this.otherSide("getCombiCookie", [t]) : e.storages.storages.cookies.get("_vis_opt_exp_" + t + "_combi")
        }
        exclude(e, t) {
            return i(this, void 0, void 0, (function*() {
                const i = window.tracklib;
                "TRACK" === t.type ? yield i.excludeGoal(this.getTrackGoalIdFromExp(t.id, e)): "FUNNEL" === t.type ? yield i.excludeFunnel(t.id): Gr.isAnalyzeCampaign(t.type) ? yield i.excludeAnalyzeCampaign(t.id): yield Gr.createCookie(e, "_vis_opt_exp_" + t.id + "_exclude", "1", 100, t)
            }))
        }
        include(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                const i = window.tracklib;
                "TRACK" === r.type ? yield i.includeGoal(this.getTrackGoalIdFromExp(r.id, e)): "FUNNEL" === r.type ? yield i.includeFunnel(t): Gr.isAnalyzeCampaign(r.type) ? yield i.includeAnalyzeCampaign(t): yield Gr.createCookie(e, "_vis_opt_exp_" + t + "_combi", n, 100, r)
            }))
        }
        isLogged(e, t) {
            return i(this, void 0, void 0, (function*() {
                return yield e.storages.storages.cookies.get("_vis_opt_exp_" + t + "_combi_choose")
            }))
        }
        isBucketed(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                return !!(yield this.getCombi(e, t, n))
            }))
        }
        shouldBucket(e, t) {
            return i(this, void 0, void 0, (function*() {
                const e = self.Math,
                    i = t.type,
                    n = window.tracklib,
                    r = void 0 !== Ki.data.pc[oo[i]];
                let o, s = t.pc_traffic;
                if (s = void 0 === s ? 100 : s, !s) return !1;
                this.campaignsInternalMap[t.id] && this.campaignsInternalMap[t.id].r ? o = this.campaignsInternalMap[t.id].r : (this.campaignsInternalMap[t.id] = {}, o = this.campaignsInternalMap[t.id].r = e.random());
                const a = Gr.isSessionBasedCampaign2(t) ? yield Ki._.sessionInfoService.getPcTraffic(): 100 * o, l = n.isFeatureBucketed && Number(yield n.isFeatureBucketed(oo[i]));
                return (!r || l) && a <= s
            }))
        }
        chooseCombination(e, t, n) {
            var r, o;
            return i(this, void 0, void 0, (function*() {
                let i;
                const s = t && t.id && (t.combination_chosen || t.cc);
                if (s && "0" !== s) return s;
                if (window.chooseCombinationPersonalisation && window.vwoPersonalisationCampaigns && window.vwoPersonalisationCampaigns.indexOf && -1 !== window.vwoPersonalisationCampaigns.indexOf(+t.id) && (i = window.chooseCombinationPersonalisation(t.id), 0 != i)) {
                    return "" + (parseInt(i.split(":")[1], 10) + 1)
                }
                const a = n && n.scaleInfo || t.combs,
                    l = {},
                    c = {};
                let d, u, g, v = Math.random(),
                    p = Pn(a),
                    h = p.length,
                    w = 0,
                    f = !1,
                    m = !1;
                for (g = 0; g < h; g++) {
                    i = p[g];
                    const o = n ? i : t.id;
                    if (u = e.settings.campaigns[o].type, !isNaN(parseFloat(a[i])) && 0 != a[i])
                        if ("VISUAL_AB" === u || "SPLIT_URL" === u) {
                            d = n ? n.segmentInfo : t.sections[1].triggers;
                            const o = d[i];
                            0 === d.length || !1 === (null === (r = e.currentSettings.triggers[o]) || void 0 === r ? void 0 : r.cnds[0]) ? (m = !0, c[i] = a[i]) : (n ? yield window.VWO.phoenix.validateTrigger(e.currentSettings.triggers[d[i]], null, {
                                skipEventProps: !0,
                                skipValidationIfTimer: !0
                            }): yield window.VWO.phoenix.validateTrigger(e.currentSettings.triggers[o], null)) && (1 != d[i] && (f = !0), l[i] = w + a[i], w += a[i])
                        } else l[i] = w + a[i], w += a[i]
                }
                if (!f && m)
                    for (p = Pn(c), h = p.length, g = 0; g < h; g++) i = p[g], l[i] = w + c[i], w += c[i];
                let E = -1,
                    _ = null === (o = null == t ? void 0 : t.sections[1]) || void 0 === o ? void 0 : o.priority;
                if (_)
                    for (h = _.length, g = 0; g < h; g++)
                        if (l[_[g]]) {
                            E = g;
                            break
                        }
                if (E >= 0) return _[E] + "";
                for (0 < w && 1 !== w && (v *= w), p = Pn(l), h = p.length, g = 0; g < h; g++)
                    if (i = p[g], !isNaN(parseFloat(a[i])) && v <= l[i]) return i
            }))
        }
        getGroupBasedCampaigns({
            getters: e
        }) {
            var t, i;
            let n = [],
                r = null === (i = null === (t = e.settings.vwoData) || void 0 === t ? void 0 : t.gC) || void 0 === i ? void 0 : i.map((e => e.c));
            r = r || [];
            for (const e of r) n = n.concat(e);
            return n.map((e => "" + e))
        }
        doExperimentHere(e, t, i, n) {
            let r;
            const o = ro.getCleanedUrl(e.currentUrl);
            if (t.pg_config) {
                const e = t.pg_config[0];
                r = i.pageGroup.validatePage(e)
            } else r = ro.compareUrlWithIncludeExcludeRegex(e.currentUrl, t.urlRegex, t.exclude_url, t.url_pattern);
            return n || (1 === r.reason ? i.trigger(dr.EXCLUDE_URL, {
                oldArgs: [t.id]
            }) : i.trigger(dr.MATCH_WILDCARD, {
                oldArgs: [t.id, o, t.urlRegex || t.url_pattern, r.didMatch]
            })), r.didMatch
        }
        checkForVariationTargeting(e) {
            const t = e.sections[1].triggers;
            return !(!t || 0 === t.length)
        }
    }
    const ao = new so;
    window.VWO.modules.utils.campaignUtils = ao;
    class lo {
        otherSide(...e) {
            e[0] = "VWO.modules.tags.checkEnvironment.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class co extends lo {
        checkCookieJarMismatch({
            getters: e,
            vwoEvents: t
        }) {
            const i = e.storages.storages,
                n = i.localStorageService,
                r = i.cookies;
            let o;
            !(o = r.get(ar.COOKIE_JAR, !0)) && !(o = n.get(ar.COOKIE_JAR)) || e.vwoInternalProperties.jar || (r.create(ar.COOKIE_JAR, o, !1), n.remove(ar.COOKIE_JAR), t.trigger(dr.ERROR, {
                error: `_vwo(value = ${o}) cookie found but Cookie jar is not created. Deleting it.`
            }))
        }
        checkForTimeout({
            getters: e,
            actions: t,
            vwoEvents: i
        }) {
            e.vwoCode && window.vwoCodeEndBeforeVA && !e.vwoCode[Xn] && (i.trigger(dr.SHOULD_EXECUTE_LIB_ERROR, {
                message: "SSM cookie found",
                oldArgs: [null, void 0, void 0, void 0, !0]
            }), t.addValues({
                lT: 1
            }, "vwoCode"))
        }
        addDomListenerForTimeout(e) {
            this.otherSide('addDomListenerForTimeout("${{1}}")', null, {
                captureGroups: [function() {
                    window.VWO.phoenix.store.getters.vwoInternalProperties.willRedirectionOccur || window._vwo_code && window._vwo_code.finish();
                    for (const t in window.VWO.phoenix.store.getters.settings.campaigns) {
                        const i = window.VWO.phoenix.store.getters.settings.campaigns[t];
                        i.dontKillTimer ? ao.clearTimerAfterTimeout(i, e) : setTimeout((() => {
                            ao.clearTimeouts(i)
                        }), 500)
                    }
                    window.VWO._.coreLib.finished = 1
                }]
            })
        }
    }
    var uo = new co;
    class go {
        migrateCookiesToSSM({
            getters: e
        }) {
            const t = cr(),
                i = e.storages.storages.cookies,
                n = i.getAll();
            if (e.vwoInternalProperties.ss && !n[ar.SAME_SITE]) {
                for (const e in n) e !== sr + ar.UUID_V2 && (e.indexOf(or) >= 0 || e.indexOf(sr) >= 0) && (Object.prototype.hasOwnProperty.call(t, e) ? i.create(e, decodeURIComponent(n[e]), t[e], void 0, void 0, !0) : i.create(e, decodeURIComponent(n[e]), ar.DEFAULT_EXPIRY, void 0, void 0, !0));
                i.create(ar.SAME_SITE, 1, t[ar.SAME_SITE], void 0, void 0, !0)
            }
        }
        unhideIfNoCampaignsRunning({
            getters: e
        }) {
            const t = e.settings.campaigns;
            0 !== Object.keys(t).length || t.constructor
        }
        mergeThirdPartyCookiesInFirstPartyJar({
            getters: e,
            vwoEvents: t
        }) {
            e.settings.vwoData.tpc && e.settings.vwoData.tpc._vwo && (e.vwoInternalProperties.jar ? e.storages.storages.cookies.mergeInFPJar() : t.trigger(dr.ERROR, {
                data: `TPC._vwo (value = ${e.settings.vwoData.tpc._vwo}) value found but cookie jar not available. Value of CJ is ${e.settings.vwoData.cj}.`
            }))
        }
        setSameSiteVariables({
            getters: e,
            actions: t,
            vwoEvents: i
        }) {
            const n = Gr.isSSApp({
                getters: e,
                vwoEvents: i
            });
            n && t.addValues({
                ssdm: !0
            }, "vwoInternalProperties"), n && "https:" === e.location.protocol && !Ki.data.noSS && t.addValues({
                ss: !0
            }, "vwoInternalProperties")
        }
        setListenerForCustomAndDomEvents({
            vwoEvents: e,
            getters: t,
            data: i,
            actions: n
        }) {
            Gr.addListener(t, e, {
                eventName: "*"
            }, ((r, o) => {
                r.name = r.name || o, Lr({
                    vwoEvents: e,
                    getters: t,
                    data: i,
                    actions: n,
                    event: r
                }, o)
            }))
        }
        updateGlobalOptOutCookie(e, t) {
            const i = e.storages.storages.cookies;
            t ? i._create(ar.GLOBAL_OPT_OUT, 1, ar.DEFAULT_EXPIRY) : i.erase(ar.GLOBAL_OPT_OUT)
        }
    }
    var vo = new go;

    function po({
        event: e,
        data: t,
        getters: i,
        actions: n,
        vwoEvents: r
    }) {
        wr(!1, (function() {
            r.trigger("hashchange")
        }));
        const o = i.storages.get("cookies");
        if (!o.get("_vis_opt_test_cookie")) {
            const e = o.get("_vis_opt_s");
            e ? o.create("_vis_opt_s", parseInt(e.split("|")[0], 10) + 1 + "|", 100) : o.create("_vis_opt_s", "1|", 100)
        }
        o.create("_vis_opt_test_cookie", 1), vo.setSameSiteVariables({
            event: e,
            data: t,
            getters: i,
            actions: n,
            vwoEvents: r
        }), vo.migrateCookiesToSSM({
            event: e,
            data: t,
            getters: i,
            actions: n,
            vwoEvents: r
        }), vo.unhideIfNoCampaignsRunning({
            event: e,
            data: t,
            getters: i,
            actions: n,
            vwoEvents: r
        }), vo.mergeThirdPartyCookiesInFirstPartyJar({
            event: e,
            data: t,
            getters: i,
            actions: n,
            vwoEvents: r
        }), vo.setListenerForCustomAndDomEvents({
            event: e,
            data: t,
            getters: i,
            actions: n,
            vwoEvents: r
        });
        const s = Object.keys(i.settings.campaigns);
        Gr.setCampaignIds(s);
        Gr.setPropertiesToBothThreads(n, [{
            willRedirectionOccur: !1,
            destinationMT: "VWO._.willRedirectionOccur"
        }], "vwoInternalProperties"), n.addValues({
            waitingForThirdPartySync: !1
        }, "vwoInternalProperties")
    }
    class ho {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.setSession." + e[0], window.fetcher.getValue(...e)
        }
    }
    class wo {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.sessionInfoService." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    let fo;
    wo.LOCAL_STORAGE_SESSION_EXPIRY = 30, wo.LOCAL_STORAGE_NAME = window._vis_debug ? "debug_vwoSn" : "vwoSn", wo.ACCOUNT_ID = window._vwo_acc_id;
    class mo extends wo {
        constructor(e, t, n) {
            super(), fo = this, this.visitorInformation = window.VWO.data.vi = window.VWO.data.vi || {}, Gr.addListener(e, t, {
                eventName: dr.NEW_SESSION
            }, (function() {
                return i(this, void 0, void 0, (function*() {
                    yield fo.otherSide("eraseSessionCookie()", null, [])
                }))
            })), Gr.addListener(e, t, {
                eventName: dr.REDIRECT_DECISION
            }, (function(e) {
                return i(this, void 0, void 0, (function*() {
                    const t = e[2];
                    Gr.isSessionBasedCampaign2(t) && (yield fo.otherSide("markPageIdSessionExpiry()"))
                }))
            }))
        }
        getPageId() {
            return this.otherSide("getPageId()")
        }
        getSessionId() {
            return this.otherSide("getSessionId()")
        }
        shouldSendSessionInfoInCall() {
            return !0
        }
        setSNCookieValueByIndex2(e, t) {
            return this.otherSide("setSNCookieValueByIndex2", [e, t])
        }
        isSessionInfoSynced() {
            return this.otherSide("isSessionInfoSynced()")
        }
        getPcTraffic() {
            return this.otherSide("getPcTraffic()")
        }
        setPageIdValue(e) {
            window.phoenix.store.actions.addValues({
                pageId: e
            }, "vwoInternalProperties"), window.phoenix.store.actions.addValues({
                pageViewCount: e
            }, "root")
        }
    }
    class Eo extends ho {
        execute({
            getters: e,
            actions: t,
            vwoEvents: n
        }) {
            return i(this, void 0, void 0, (function*() {
                let i;
                window.VWO.modules.tags.sessionInfoService ? i = window.VWO.modules.tags.sessionInfoService : (i = new mo(e, n, t), window.VWO.modules.tags.sessionInfoService = i, t.addValues({
                    sessionInfoService: i
                }, "vwoInternalProperties"));
                let r = e.vwoUUID,
                    o = yield this.otherSide("execute", [{
                        vwoUUID: r
                    }]);
                i.setPageIdValue(o)
            }))
        }
    }
    const _o = new Eo,
        yo = _o.execute.bind(_o);
    window.VWO.modules.tags.setSession = yo;
    const Oo = window.performance || window.workerThread.performance,
        So = {
            mark: (e = "") => {
                e = "vwo-" + e, Oo.mark && Oo.mark(e)
            },
            measure: (e, t, i) => {
                t = "vwo-" + t, i = "vwo-" + i;
                try {
                    Oo.measure && Oo.measure(e, t, i)
                } catch (e) {
                    zr.debug(e)
                }
            }
        },
        To = Object.keys;

    function Io(e, t) {
        if (!(e instanceof Array)) return -1;
        for (var i = 0; i < e.length; i++)
            if (t === e[i]) return i;
        return -1
    }

    function Co(e, t, i) {
        var n, r, o, s = !1;
        return -1 === t || i ? (r = requestAnimationFrame, o = cancelAnimationFrame) : (r = setTimeout, o = clearTimeout),
            function() {
                s && (o(n), n = null), n = r((function() {
                    e.call()
                }), t), s = !0
            }
    }
    class bo {}
    class No extends bo {
        shouldFetchTestingCampaigns(e, t) {
            return 1 != e || !t.vwoInternalProperties.disableAutofetchSettings
        }
        fetchSettings(e, t, i) {
            this.shouldFetchTestingCampaigns(e, t) && Co((() => {
                this.shouldFetchTestingCampaigns(e, t) && Gr.getSettings(e, t)
            }), +i || 0)()
        }
        execute({
            getters: e
        }) {
            e.visDebug || pr() || !e.vwoInternalProperties.isSpaEnabled || (e.vwoCode ? this.fetchSettings(1, e, e.vwoInternalProperties.SPA_SETTINGS_DELAY) : this.fetchSettings(2, e, e.vwoInternalProperties.SPA_NEW_PAGE_SETTINGS_DELAY))
        }
    }
    const Ao = new No,
        Ro = Ao.execute.bind(Ao);
    class Vo extends Yn {
        constructor() {
            super(...arguments), this.checkEnvironmentInitialized = !1
        }
        execute({
            event: e,
            data: t,
            getters: n,
            actions: r,
            vwoEvents: o
        }) {
            return i(this, void 0, void 0, (function*() {
                if (this.checkEnvironmentInitialized) return;
                this.checkEnvironmentInitialized = !0;
                const i = yo({
                        event: e,
                        data: t,
                        getters: n,
                        actions: r,
                        vwoEvents: o
                    }),
                    s = Gr.shouldExecuteLib({
                        event: e,
                        data: t,
                        getters: n,
                        actions: r,
                        vwoEvents: o
                    });
                po({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), uo.checkCookieJarMismatch({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), uo.checkForTimeout({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), uo.addDomListenerForTimeout(n), yield Promise.all([s, i]), n.vwoInternalProperties.shouldExecuteLib && (So.mark("event-" + dr.PAGE_VIEW), kr(o, dr.PAGE_VIEW, {
                    name: dr.PAGE_VIEW,
                    time: +new Date,
                    props: {
                        url: n.currentUrl
                    }
                }), Ro({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), o.trigger(dr.UPDATE_SETTINGS_CALL))
            }))
        }
    }
    const xo = new Vo,
        Po = xo.execute.bind(xo);
    window.VWO.modules.tags.checkEnvironment.fn = xo;
    const Do = function(...e) {
        return e[0] = "VWO.modules.tags.visibilityService.utils." + e[0], window.fetcher.getValue(...e)
    };

    function Lo({
        getters: e,
        vwoEvents: t
    }) {
        Gr.addListener(e, t, {
            eventName: dr.UNHIDE_ELEMENT
        }, (function(e) {
            return i(this, void 0, void 0, (function*() {
                const {
                    ruleName: t,
                    campaignData: i
                } = e;
                yield window.fetcher.getValue("VWO.modules.utils.libUtils.delCSS", [{
                    ruleName: t,
                    campaignData: i
                }])
            }))
        }))
    }

    function ko({
        vwoEvents: e,
        getters: t
    }, i) {
        var n, r, o, s, a, l, c, d, u = Pn(i.sections),
            g = u.length,
            v = i.type;
        if ("VISUAL_AB" === v)
            for (; g--;)
                if (n = u[g], (r = i.sections[n]).variations)
                    for (s = (o = Pn(r.variations)).length, e.trigger(dr.UNHIDE_SECTION, {
                            id: i.id,
                            key: n
                        }, n); s--;)
                        if (a = o[s], c = r.variations[a], r.variations[a] = c = "string" == typeof c ? c && vwo_$.parseJSON(c) : c, c)
                            for (l = c.length, e.trigger(dr.UNHIDE_VARIATION, {
                                    id: i.id,
                                    key: n
                                }); l--;) d = c[l].xpath, Mr.unhideElement(e, {
                                getters: t,
                                ruleName: d,
                                campaignData: i
                            });
                        else e.trigger(dr.UNHIDE_VARIATION, {
                            id: i.id,
                            key: n
                        }, n);
        else e.trigger(dr.UNHIDE_SECTION, {
            id: i.id,
            key: n
        });
        else if ("VISUAL" === v)
            for (; g--;) n = u[g], d = i.sections[n].path, Mr.unhideElement(e, {
                getters: t,
                ruleName: d,
                campaignData: i
            });
        else "SPLIT_URL" === v && Mr.unhideElement(e, {
            getters: t,
            ruleName: "*",
            campaignData: i
        })
    }

    function Uo({
        vwoEvents: e
    }, t) {
        return t.forEach((t => {
            e.off.apply(t)
        })), Do("unhideElementsAfterTimer", [])
    }
    class Mo {
        isExitTriggerPresent(e) {
            return e.cnds.some((e => "object" == typeof e && null !== e && e.exitTrigger))
        }
        getExitTrigger(e) {
            const t = e.cnds.find((e => "object" == typeof e && null !== e && e.exitTrigger));
            return t && t.exitTrigger
        }
    }
    var Wo = new Mo;
    const Go = function(e) {
            return window.VWO.phoenix.validateTrigger(e, null, {
                skipEventProps: !0,
                skipValidationIfTimer: !0
            })
        },
        Fo = function(e) {
            return window.VWO.phoenix.validateTrigger(e, null, {
                skipEventProps: !0
            })
        },
        jo = function({
            event: e,
            data: t,
            getters: n,
            actions: r,
            vwoEvents: o
        }) {
            return i(this, void 0, void 0, (function*() {
                if (n.vwoCode && (n.vwoCode[zn] || n.vwoCode[Xn])) return void o.trigger(dr.VISIBILITY_TRIGGERED);
                const s = n.settings.campaigns;
                let a = !1;
                const l = [],
                    c = ao.getGroupBasedCampaigns({
                        event: e,
                        data: t,
                        getters: n,
                        actions: r,
                        vwoEvents: o
                    });
                yield Promise.all(Object.keys(s).map((t => i(this, void 0, void 0, (function*() {
                    var i;
                    const d = s[t],
                        u = s[t].type;
                    if ("FUNNEL" === u || d.ready) return;
                    const g = null === (i = d.triggers) || void 0 === i ? void 0 : i[0],
                        v = g && o.settings.currentSettings.triggers[g];
                    let p;
                    const h = "SPLIT_URL" === u,
                        w = ao.doExperimentHere(n, d, o, !0);
                    if (h && w && (a = !0, v && (p = yield Fo(v)) && l.push(t)), o.trigger(dr.CAMPAIGN_FLOW_START, {
                            oldArgs: [t]
                        }), !w) return void((pr() || window._vis_debug) && (h || o.trigger(dr.MATCH_WILDCARD, {
                        oldArgs: [d.id, ro.getCleanedUrl(n.currentUrl), d.urlRegex || d.url_pattern, !1]
                    }), v && ((null != p ? p : yield Go(v)) || o.trigger(dr.CHECK_SEGMENTATION, {
                        hideElementsTriggered: !1
                    }))));
                    h || o.trigger(dr.MATCH_WILDCARD, {
                        oldArgs: [d.id, ro.getCleanedUrl(n.currentUrl), d.urlRegex || d.url_pattern, !0]
                    });
                    const f = -1 === c.indexOf(t) || c.indexOf(t) >= 0 && d.shouldHideElement,
                        m = h ? "body" : void 0;
                    if (v && (null != p ? p : yield Go(v)) ? f && !d.manual && (Gr.hideElements(d, n, m), h || o.trigger(dr.HIDE_ELEMENTS, {
                            oldArgs: [d.id, d.cc]
                        })) : o.trigger(dr.CHECK_SEGMENTATION, {
                            hideElementsTriggered: !1
                        }), v && Wo.isExitTriggerPresent(v) && !h) {
                        const t = Wo.getExitTrigger(v);
                        o.trigger(dr.HIDE_ELEMENTS, {
                            oldArgs: [d.id, d.cc]
                        }), Gr.addListener(n, o, {
                            triggerID: t
                        }, (() => {
                            d.ready || ("SPLIT_URL" === u && o.trigger(dr.NOT_REDIRECTING), ko({
                                event: e,
                                data: d,
                                getters: n,
                                actions: r,
                                vwoEvents: o
                            }, d))
                        }))
                    }
                    d.debug && r.updateSettings({
                        cc: d.debug.v
                    }, `campaigns.${t}`), So.mark("tag-visibilityService")
                }))))), a && 0 !== l.length || o.trigger(dr.NOT_REDIRECTING), window.fetcher.getValue("VWO.modules.utils.libUtils.delCSS", [{
                    ruleName: "*",
                    campaignData: t
                }]), Lo({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                });
                const d = [];
                for (const i in s)
                    if (Object.prototype.hasOwnProperty.call(s, i) && s[i].sen) {
                        const a = Gr.addListener(n, o, {
                            triggerID: s[i].sen
                        }, (() => {
                            ko({
                                event: e,
                                data: t,
                                getters: n,
                                actions: r,
                                vwoEvents: o
                            }, s[i]), o.trigger(dr.CHECK_SEGMENTATION)
                        }));
                        a && d.push(a)
                    }
                Uo({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }, d), o.trigger(dr.VISIBILITY_TRIGGERED)
            }))
        };
    class $o {}
    class Ho extends no {
        compareUrlWithIncludeExcludeRegex(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                return window.fetcher.getValue('VWO.modules.utils.urlUtils.compareUrlWithIncludeExcludeRegex("${{1}}", "${{2}}", "${{3}}", "${{4}}")', null, {
                    captureGroups: [e, t, n, r]
                })
            }))
        }
    }
    const Bo = new Ho;
    window.VWO.modules.utils.urlUtils = Bo;
    class Jo {}
    class Ko extends Jo {
        constructor() {
            super(...arguments), this.preview = pr, this.noopFn = function() {}
        }
        isTimedOut(e) {
            return e.vwoCode && (e.vwoCode[zn] || e.vwoCode[Xn])
        }
        unhideElForCombinationsToNotUse(e, t, i, n) {
            if ("VISUAL_AB" !== i.type) return;
            const r = i.sections[1].variations,
                o = To(r);
            for (let s = 0; s < o.length; s++)
                if (o[s] !== t) {
                    let t = r[o[s]];
                    if ("object" != typeof t && (t = JSON.parse(t)), !t) continue;
                    for (let r = 0; r < t.length; r++) n.trigger(dr.UNHIDE_ELEMENT, {
                        ruleName: t[r].xpath,
                        campaignData: i,
                        getters: e
                    })
                }
        }
        unhideVariationIfNotSplit(e, t, i) {
            "SPLIT_URL" !== t.type && this.unhideVariation(e, t, i)
        }
        unhideVariation(e, t, i) {
            const n = To(t.sections);
            let r, o, s, a, l, c, d, u, g = n.length;
            const v = t.type;
            if ("VISUAL_AB" === v)
                for (; g--;)
                    if (r = n[g], o = t.sections[r], o.variations)
                        for (s = To(o.variations), a = s.length, i.trigger(dr.UNHIDE_SECTION, {
                                oldArgs: [t.id, r, !a]
                            }); a--;)
                            if (l = s[a], d = o.variations[l], o.variations[l] = d = "string" == typeof d ? d && JSON.parse(d) : d, d)
                                for (c = d.length, i.trigger(dr.UNHIDE_VARIATION, {
                                        oldArgs: [t.id, r, l, !c]
                                    }); c--;) u = d[c].xpath, i.trigger(dr.UNHIDE_ELEMENT, {
                                    ruleName: u,
                                    campaignData: t,
                                    getters: e,
                                    key: r,
                                    oldArgs: [t.id, r, l, u]
                                });
                            else i.trigger(dr.UNHIDE_VARIATION, {
                                oldArgs: [t.id, r, l, !d]
                            });
            else i.trigger(dr.UNHIDE_SECTION, {
                oldArgs: [t.id, r, !0]
            });
            else if ("VISUAL" === v)
                for (; g--;) r = n[g], u = t.sections[r].path, i.trigger(dr.UNHIDE_ELEMENT, {
                    ruleName: u,
                    campaignData: t,
                    getters: e,
                    key: r,
                    oldArgs: [t.id, r, void 0, u]
                });
            else "SPLIT_URL" === v && (i.trigger(dr.UNHIDE_ELEMENT, {
                ruleName: "*",
                campaignData: t,
                getters: e,
                oldArgs: [t.id, void 0, void 0, "*"]
            }), i.trigger(dr.UNHIDE_ELEMENT, {
                ruleName: "body",
                campaignData: t,
                getters: e,
                oldArgs: [t.id, void 0, void 0, "body"]
            }))
        }
        isSplit(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                if ("SPLIT_URL" === t.type && ("RUNNING" === t.status || this.preview() || window._vis_debug)) {
                    let i;
                    const r = yield Gr.getSplitDecision(e, t.id);
                    if (!r) return !1;
                    let o = "";
                    const s = Bo.getCleanedUrl(e.currentUrl);
                    let a = !1;
                    const l = t.sections;
                    if (l[1].variationsRegex ? (o = l[1].variationsRegex[r], a = Bo.verifyUrl(e.currentUrl, o, null)) : (o = l[1].variations[r], a = io.matchWildcard(s, o)), a) return n.trigger(dr.MATCH_WILDCARD, {
                        oldArgs: [t.id, s, o, !0]
                    }), i = yield ao.getCombi(e, t), t.combination_chosen = r, t[qn] = 1, n.trigger(dr.CHOOSE_COMBINATION, {
                        oldArgs: [t.id, r, !0]
                    }), i || this.preview() ? (this.preview() || (yield window.fetcher.getValue('VWO.push("${{1}}")', null, {
                        captureGroups: [
                            ["tag", t.id, r, "session", !0]
                        ]
                    }), kr(n, dr.CAMPAIGN_READY, {
                        id: t.id,
                        combination: i
                    })), n.trigger("goalVisit", {
                        id: t.id
                    })) : (i = r, t && void 0 === t.isFirst && (t.isFirst = 1), yield ao.include(e, t.id, i, t), yield window.fetcher.getValue('VWO.push("${{1}}")', null, {
                        captureGroups: [
                            ["tag", t.id, i, "session", !0]
                        ]
                    }), n.trigger(dr.REGISTER_HIT, {
                        oldArgs: ["" + t.id, i]
                    }), kr(n, dr.CAMPAIGN_READY, {
                        id: t.id,
                        combination: i
                    })), window.fetcher.getValue("VWO.modules.utils.collectAndSendDataForGA", [t.id, i]), !0;
                    n.trigger(dr.MATCH_WILDCARD, {
                        oldArgs: [t.id, s, o, !1]
                    })
                }
                return !1
            }))
        }
        checkSplitVariationAndMarkReady(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                if (yield this.isSplit(e, t, n)) return n.trigger(dr.NOT_REDIRECTING), Mr.unhideElement(n, {
                    ruleName: "*",
                    getters: e,
                    campaignData: t,
                    oldArgs: [t.id, void 0, void 0, "*"]
                }), this.unhideVariationIfNotSplit(e, t, n), t.ready = !0, !0
            }))
        }
        getCombination(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                let i = !1,
                    r = this.preview() || (yield ao.getCombi(e, t));
                return (r || t.combination_chosen) && (i = !0), r = r || (yield ao.isLogged(e, t.id)) || !n && (yield ao.chooseCombination(e, t)), {
                    alreadyChosen: i,
                    combi: r
                }
            }))
        }
        registerHit(e, t, n, r, o, s, a) {
            return i(this, void 0, void 0, (function*() {
                if (s = s || this.noopFn, (yield ao.isBucketed(e, n)) || Gr.isBot2() || !Gr.shouldTrackUserForCampaign(n)) return s(a);
                if ("TRACK" === n.type) {
                    var i = ao.getTrackGoalIdFromExp(n.id, e);
                    yield window.fetcher.getValue('VWO.push("${{1}}", "${{2}}")', null, {
                        captureGroups: [
                            ["tag", n.id, t, "session", !0],
                            ["tag", i, null, "eg"]
                        ]
                    })
                }
                r.trigger(dr.SEND_NEW_VISITOR_CALL, {
                    combination: t,
                    campaignData: n,
                    function() {}
                }), yield Rr({
                    getters: e,
                    event: {
                        time: +new Date,
                        name: dr.REGISTER_HIT,
                        props: {
                            id: "" + n.id,
                            combination: t
                        }
                    },
                    actions: {},
                    vwoEvents: {},
                    data: {}
                }, n, s, a), o || r.trigger(dr.REGISTER_HIT, {
                    oldArgs: ["" + n.id, t]
                }), kr(r, dr.CAMPAIGN_READY, {
                    id: n.id,
                    combination: t
                })
            }))
        }
        createTempCombiCookie(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                yield Gr.createCookie(e, "_vis_opt_exp_" + t.id + "_combi_choose", n, 100, t)
            }))
        }
        recordVisitor(e, t, n, r, o) {
            return i(this, void 0, void 0, (function*() {
                if (!t) return;
                const i = n.type;
                r && !(yield ao.isLogged(e, n.id)) ? (yield this.registerHit(e, t, n, o), Gr.isDomDependent(i) && (yield this.createTempCombiCookie(e, n, t))) : kr(o, dr.CAMPAIGN_READY, {
                    id: n.id,
                    combination: t
                }), (Gr.isDomDependent(i) || "SPLIT_URL" === i) && (yield window.fetcher.getValue('VWO.push("${{1}}")', null, {
                    captureGroups: [
                        ["tag", n.id, t, "session", !0]
                    ]
                })), window.fetcher.getValue("VWO.modules.utils.collectAndSendDataForGA", [n.id, t])
            }))
        }
        deleteCampaignParams(e) {
            delete e.ready, delete e.timedout, delete e[qn]
        }
        setMutsData(e) {
            e.muts = e.muts || {}, e.muts.pre = e.muts.pre || {}, e.muts.post = e.muts.post || {}, e.muts.pre.enabled && (e.manual = !0)
        }
        setThirdPartyCookies(e, t) {
            return i(this, void 0, void 0, (function*() {
                const i = e.settings.crossDomain && e.settings.crossDomain[t.id];
                let n;
                if (void 0 !== i && !e.flags.cookieLessModeEnabled) {
                    const r = [];
                    for (n = To(i).length - 1; n >= 0;) {
                        const o = i[n];
                        "_vwo_uuid_" === o.name.substring(0, 10) ? r.push(Gr.createCookie(e, o.name, o.value, ar.UUID_COOKIE_EXPIRY, t)) : r.push(Gr.createCookie(e, o.name, o.value, 100, t)), n--
                    }
                    yield Promise.all(r)
                }
            }))
        }
        handleDeployCampaign(e) {
            "DEPLOY" === e.type && (e.type = "VISUAL_AB")
        }
        handlePCTraffic(e) {
            e.pc_traffic = void 0 === e.pc_traffic ? 100 : e.pc_traffic
        }
        preProcessCampaignData({
            data: e,
            getters: t
        }) {
            return i(this, void 0, void 0, (function*() {
                this.setMutsData(e), yield this.setThirdPartyCookies(t, e), this.handleDeployCampaign(e), this.handlePCTraffic(e), e.globalCode = e.globalCode || {}, e.goals || (e.goals = {}), Gr.isDomIndependentCampaign(e.type) && (e.clickmap = 0), "FUNNEL" === e.type ? (e.g = e.g || e.goals, e.goals = {}, e.segment_code = void 0 === e.segment_code ? "true" : e.segment_code, e.manual = !0, e.v = e.v || 1) : e.manual = !!e.manual
            }))
        }
        processCampaign({
            data: e,
            event: t,
            actions: n,
            getters: r,
            vwoEvents: o
        }) {
            return i(this, void 0, void 0, (function*() {
                let i, s;
                const a = "SPLIT_URL" === e.type;
                if ((yield ao.isExcluded(r, e)) && !this.preview() && (o.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                        oldArgs: [e.id, !0, !0]
                    }), a && (o.trigger(dr.NOT_REDIRECTING), Mr.unhideElement(o, {
                        ruleName: "*",
                        campaignData: e,
                        getters: r
                    })), this.unhideVariationIfNotSplit(r, e, o)), this.deleteCampaignParams(e), yield this.checkSplitVariationAndMarkReady(r, e, o)) return void o.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                    oldArgs: [e.id, void 0, void 0, !0]
                });
                if (!Gr.shouldTrackUserForCampaign(e)) return e.timedout = !0, a && (o.trigger(dr.NOT_REDIRECTING), Mr.unhideElement(o, {
                    ruleName: "*",
                    campaignData: e,
                    getters: r
                })), void this.unhideVariation(r, e, o);
                const l = ao.doExperimentHere(r, e, o, !a);
                if (l) {
                    if (o.trigger(dr.WAIT_FOR_BEHAVIOR, {
                            oldArgs: [e.id]
                        }), o.trigger(dr.SEGMENTATION_EVALUATED, {
                            oldArgs: [e.id, l, !0]
                        }), Gr.isDomDependent(e.type) && (i = yield this.getCombination(r, e, !0), s = i.alreadyChosen, i.combi && (e.cc = i.combi)), !this.preview() && !(yield ao.isBucketed(r, e)) && !(yield ao.shouldBucket(r, e))) return o.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                        oldArgs: [e.id, !0, void 0, void 0, !0]
                    }), yield ao.exclude(r, e), "SPLIT_URL" === e.type && (o.trigger(dr.NOT_REDIRECTING), Mr.unhideElement(o, {
                        ruleName: "*",
                        campaignData: e,
                        getters: r
                    })), void this.unhideVariationIfNotSplit(r, e, o);
                    if (Gr.shouldTrackUserForCampaign(e) ? e.ready = !0 : e.timedout = !0, a)
                        if (this.isTimedOut(r)) o.trigger(dr.NOT_REDIRECTING), Mr.unhideElement(o, {
                            ruleName: "*",
                            campaignData: e,
                            getters: r
                        });
                        else {
                            i = yield this.getCombination(r, e), s = i.alreadyChosen, e.combination_chosen = i.combi;
                            const t = [{
                                willRedirectionOccur: !0,
                                destinationMT: "VWO._.willRedirectionOccur"
                            }];
                            "1" !== e.combination_chosen && Gr.setPropertiesToBothThreads(n, t, "vwoInternalProperties"), this.executeCampaignJS(e, "pre"), yield Mr.variationShown(o, {
                                id: e.id,
                                variation: e.combination_chosen,
                                isFirst: s ? 0 : 1,
                                fireLinkedTagSync: "FUNNEL" === e.type
                            }, e)
                        }
                    else {
                        i = yield this.getCombination(r, e);
                        const t = e.combination_chosen = i.combi;
                        if (s = i.alreadyChosen, delete e.cc, !t) return o.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                            oldArgs: [e.id, void 0, void 0, void 0, void 0, void 0, !0]
                        }), this.unhideVariationIfNotSplit(r, e, o), e.ready = !1, void(r.vwoInternalProperties.isSpaEnabled && o.trigger(dr.TEST_NOT_RUNNING, {
                            oldArgs: [e.id]
                        }));
                        Gr.shouldTrackUserForCampaign(e) && o.trigger("goalVisit", {
                            id: e.id,
                            isUrlMatching: l
                        }), o.trigger(dr.CHOOSE_COMBINATION, {
                            oldArgs: [e.id, t, s]
                        }), this.recordVisitor(r, t, e, !s, o), this.unhideElForCombinationsToNotUse(r, t, e, o), "VISUAL_AB" === e.type && 1 == t && (o.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                            oldArgs: [e.id, void 0, void 0, void 0, void 0, void 0, void 0, !0]
                        }), this.unhideVariationIfNotSplit(r, e, o)), this.executeCampaignJS(e, "pre"), yield Mr.variationShown(o, {
                            id: e.id,
                            variation: i.combi,
                            isFirst: s ? 0 : 1,
                            fireLinkedTagSync: "FUNNEL" === e.type
                        }, e)
                    }
                } else r.vwoInternalProperties.isSpaEnabled && o.trigger(dr.TEST_NOT_RUNNING, {
                    oldArgs: [e.id]
                }), Gr.shouldTrackUserForCampaign(e) && o.trigger("goalVisit", {
                    id: e.id,
                    isUrlMatching: l
                }), ko({
                    data: e,
                    event: t,
                    getters: r,
                    actions: n,
                    vwoEvents: o
                }, e), this.unhideVariationIfNotSplit(r, e, o)
            }))
        }
        executeCampaignJS(e, t) {
            const i = e.id,
                n = e.combination_chosen || e.cc;
            if (e.globalCode[t]) try {
                Ki.phoenix.settings.currentSettings.tags[e.globalCode[t]].fn(i, n)
            } catch (e) {}
        }
    }
    var Yo = new Ko;
    class zo extends $o {
        constructor() {
            super(...arguments), this.listenerAdded = !1
        }
        execute({
            event: e,
            data: t,
            actions: n,
            getters: r,
            vwoEvents: o
        }, s) {
            return i(this, void 0, void 0, (function*() {
                if (t.ready) return;
                if (r = r || Ki.phoenix.store.getters, n = n || Ki.phoenix.store.actions, t.isTriggerValidated = !0, !s && "FUNNEL" === t.type) return;
                if (So.mark(`runCampaignStart-${t.id}`), !r.vwoInternalProperties.shouldExecuteLib) return "SPLIT_URL" === t.type && o.trigger(dr.NOT_REDIRECTING), void Mr.unhideElement(o, {
                    ruleName: "*",
                    campaignData: t,
                    getters: r
                });
                if (r.vwoInternalProperties.willRedirectionOccur) return;
                "TRACK" === t.type && (yield this.processFunnelCampaign({
                    getters: r,
                    actions: n,
                    vwoEvents: o,
                    data: t,
                    event: e
                })), this.listenerAdded || (o.on(dr.EXECUTE_FUNNEL_FOR_GOAL_CAMPAIGN, (t => i(this, void 0, void 0, (function*() {
                    yield this.processFunnelCampaign({
                        getters: r,
                        actions: n,
                        vwoEvents: o,
                        data: t.campaign,
                        event: e
                    })
                })))), this.listenerAdded = !0), yield Yo.preProcessCampaignData({
                    event: e,
                    data: t,
                    actions: n,
                    getters: r,
                    vwoEvents: o
                });
                const a = yield ao.getCombiCookie(window.VWO.phoenix.store.getters, t.id);
                yield Yo.processCampaign({
                    event: e,
                    data: t,
                    actions: n,
                    getters: r,
                    vwoEvents: o
                }), t.ready && !a && (e._vwo = e._vwo || {
                    campaignsConverted: []
                }, e._vwo.campaignsConverted.push(t.id)), o.trigger(dr.CAMPAIGN_FLOW_END)
            }))
        }
        processFunnelCampaign({
            getters: e,
            actions: t,
            vwoEvents: n,
            data: r,
            event: o
        }) {
            return i(this, void 0, void 0, (function*() {
                if (!r.funnel) return;
                const s = yield window.fetcher.getValue("VWO._.commonCookieHandler.getDataStore()"), a = r.funnel.map((a => i(this, void 0, void 0, (function*() {
                    const i = s.split(":")[tr].split(",");
                    let l, c, d, u = i.length;
                    const g = e.settings.campaigns[a.id].g[0].id === parseInt(Object.keys(r.goals)[0], er),
                        v = a.triggers[0],
                        p = yield window.VWO.phoenix.validateTrigger(window.VWO.phoenix.settings.currentSettings.triggers[v], null, {
                            triggerName: v
                        });
                    for (; u--;) l = i[u].split("_"), c = l[0], parseInt(c, er) === parseInt(a.id, er) && (d = !0);
                    p && g && !d && (yield this.execute({
                        event: o,
                        data: e.settings.campaigns[a.id],
                        actions: t,
                        getters: e,
                        vwoEvents: n
                    }, !0))
                }))));
                yield Promise.all(a)
            }))
        }
    }
    const Xo = new zo,
        qo = Xo.execute.bind(Xo);
    class Qo extends Ko {
        constructor() {
            super(...arguments), this.preview = pr, this.currentCombinationXPaths = {}
        }
        checkAndApplyChanges(e, t, n, r, o) {
            return i(this, void 0, void 0, (function*() {
                if (!t || !t.ready) return;
                let i, s = !1;
                if (i = "", "SPLIT_URL" === t.type) this.runSplitCampaign(t, e, r, n);
                else {
                    if (i = this.preview() || (yield ao.getCombi(e, t)), !i && (s = !0, i = yield ao.chooseCombination(e, t), !i)) return;
                    n.trigger(dr.ELEMENT_LOAD_TIMER_STOP, {
                        oldArgs: [t.id, i]
                    }), e.vwoInternalProperties.isSpaEnabled && void 0 === t.dontKillTimer && (t.dontKillTimer = !0), this.otherSide("tryApplyingChanges", [e, i, t, null, o]), yield this.record(e, i, t, s), Gr.isDomIndependentCampaign(t.type) && n.trigger("goalVisit", {
                        id: t.id,
                        isUrlMatching: !0
                    });
                    for (const e in this.currentCombinationXPaths) Object.prototype.hasOwnProperty.call(this.currentCombinationXPaths, e) && n.trigger(dr.ELEMENT_NOT_LOADED, {
                        oldArgs: [t.id, this.currentCombinationXPaths[e][0], this.currentCombinationXPaths[e][1], e]
                    })
                }
            }))
        }
        record(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                r && t && (yield ao.include(e, n.id, t, n), e.storages.storages.cookies.erase("_vis_opt_exp_" + n.id + "_combi_choose"), n.id && n.multiple_domains)
            }))
        }
        runSplitCampaign(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                let o;
                window._vis_debug || (o = pr() || (yield ao.getCombi(t, e)) || (yield Gr.getSplitDecision(t, e.id)));
                const s = e.sections[1].variations,
                    a = t.storages.storages.cookies;
                if (o = parseInt(o, er), o) 1 === o ? (Mr.unhideElement(r, {
                    getters: t,
                    ruleName: "*",
                    campaignData: e,
                    oldArgs: [e.id, void 0, void 0, "*"]
                }), r.trigger(dr.NOT_REDIRECTING), r.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                    oldArgs: [e.id, void 0, void 0, void 0, !0]
                }), r.trigger("goalVisit", {
                    id: e.id
                }), e.combination_chosen = o, r.trigger(dr.CHOOSE_COMBINATION, {
                    oldArgs: [e.id, o, !0]
                }), this.recordVisitor(t, o, e, !1, r)) : (Gr.createCookie(t, "_vis_opt_exp_" + e.id + "_split", o, 100, e), Sr.set(), r.trigger(dr.SPLIT_URL, {
                    oldArgs: [e.id]
                }), this.redirectToURL(t, n, e, s[o], o, r));
                else {
                    if (isNaN(o = parseInt(yield ao.chooseCombination(t, e), er))) return r.trigger(dr.CHOOSE_COMBINATION, {
                        oldArgs: [e.id, void 0, !1]
                    }), void r.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                        oldArgs: [e.id, void 0, void 0, void 0, !0]
                    });
                    if (e.multiple_domains && 1 !== o) {
                        Gr.createCookie(t, "_vis_opt_exp_" + e.id + "_split", o, 100, e), Sr.set(), r.trigger(dr.SPLIT_URL, {
                            oldArgs: [e.id]
                        });
                        const l = [{
                            willRedirectionOccur: !0,
                            destinationMT: "VWO._.willRedirectionOccur"
                        }];
                        Gr.setPropertiesToBothThreads(n, l, "vwoInternalProperties"), n.addValues({
                            waitingForThirdPartySync: !0
                        }, "vwoInternalProperties"), a.waitForThirdPartySync((() => i(this, void 0, void 0, (function*() {
                            n.addValues({
                                waitingForThirdPartySync: !1
                            }, "vwoInternalProperties"), this.redirectToURL(t, n, e, s[o], o, r, !0)
                        }))))
                    } else 1 !== o ? (Gr.createCookie(t, "_vis_opt_exp_" + e.id + "_split", o, 100, e), Sr.set(), r.trigger(dr.SPLIT_URL, {
                        oldArgs: [e.id]
                    }), this.redirectToURL(t, n, e, s[o], o, r, !0)) : (r.trigger(dr.NOT_REDIRECTING), Mr.unhideElement(r, {
                        getters: t,
                        ruleName: "*",
                        campaignData: e,
                        oldArgs: [e.id, void 0, void 0, "*"]
                    }), e.combination_chosen = o, r.trigger(dr.CHOOSE_COMBINATION, {
                        oldArgs: [e.id, o, !1]
                    }), r.trigger(dr.UNHIDE_ALL_VARIATIONS, {
                        oldArgs: [e.id, void 0, void 0, void 0, !0]
                    }), yield this.recordVisitor(t, "1", e, !0, r), this.record(t, "1", e, !0))
                }
            }))
        }
        redirectToURL(e, t, i, n, r, o, s) {
            if (this.isTimedOut(e)) return;
            Gr.setPropertiesToBothThreads(t, [{
                willRedirectionOccur: !0,
                destinationMT: "VWO._.willRedirectionOccur"
            }], "vwoInternalProperties"), s ? this.registerHit(e, r, i, o, !0, this.processRedirect.bind(this), {
                getters: e,
                campaignData: i,
                redirectURL: n,
                context: this
            }) : this.processRedirect({
                getters: e,
                campaignData: i,
                redirectURL: n,
                context: this
            })
        }
        processRedirect({
            getters: e,
            campaignData: t,
            redirectURL: i
        }) {
            this.otherSide("processRedirect", [{
                getters: e,
                campaignData: t,
                redirectURL: i
            }])
        }
        otherSide(...e) {
            e[0] = "VWO.modules.tags.runTestCampaign.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    var Zo = new Qo;
    const es = function({
        event: e,
        getters: t,
        actions: n,
        vwoEvents: r
    }) {
        return i(this, void 0, void 0, (function*() {
            So.mark(`runTestCampaignStart-${e.props.id}`), So.measure(`runCampaignMinusRunTestCampaignStart-${e.props.id}`, `runCampaignStart-${e.props.id}`, `runTestCampaignStart-${e.props.id}`), So.measure(`vwo-campaign-execution-${e.props.id}`, "tag-visibilityService", `runTestCampaignStart-${e.props.id}`);
            const i = t.settings.campaigns[e.props.id];
            r.trigger(dr.START_APPLY_CHANGES, {
                id: e.props.id
            }), yield Zo.checkAndApplyChanges(t, i, r, n), Zo.executeCampaignJS(i, "post"), r.trigger(dr.END_APPLY_CHANGES, {
                campaign: i
            })
        }))
    };

    function ts(e, t) {
        return !pr() && !t.visDebug && Gr.shouldTrackUserForCampaign(e) && t.vwoInternalProperties.shouldExecuteLib
    }
    class is {
        serializeNonGoalData(e) {
            Gr.isDomIndependentCampaign(e.type) && (e.clickmap = 0), ("ANALYSIS" === e.type || Gr.isAnalyzeCampaign(e.type)) && (e.goals = {})
        }
        serializeData(e) {
            this.serializeNonGoalData(e);
            const t = e.goals;
            for (const e in t) Gr.isPageBasedGoal(t[e].type) ? (t[e].pUrl = t[e].pUrl || t[e].urlRegex, t[e].pExcludeUrl = t[e].pExcludeUrl || t[e].excludeUrl) : t[e].pUrl = t[e].pUrl || ".*"
        }
        isGoalEligible(e, t, i) {
            i = i || window.VWO.phoenix;
            const n = (t = t || i.store.getters).currentUrl;
            return e.pExcludeUrl && io.matchRegex(n, e.pExcludeUrl) ? (i.trigger(dr.EXCLUDE_GOAL_URL), !1) : e.pUrl ? Bo.verifyUrl(n, e.pUrl, null) : Bo.verifyUrl(n, null, e.urlRegex)
        }
        registerConversion(e, t, n, r, o, s, a, l) {
            return i(this, void 0, void 0, (function*() {
                t = t || 1;
                const i = window.VWO.phoenix;
                e = e || i.store.getters, yield this._triggerGoalConversion(i, e, t, n, r, o, Object.assign(Object.assign({}, l || {}), {
                    combination: (null == l ? void 0 : l.combination) || (yield ao.getCombi(e, n, a)),
                    markCGif: s,
                    markCGifContext: {
                        cId: n.id,
                        gId: t
                    }
                }))
            }))
        }
        getImgUrlForConversion(e, t, n, r, o, s) {
            return i(this, void 0, void 0, (function*() {
                var i, a;
                const l = e.id;
                if (a = "c.gif?account_id=" + r.accountId + "&experiment_id=" + l + "&goal_id=" + t + "&ru=" + encodeURIComponent(yield Sr.get()) + (void 0 === o ? "" : "&r=" + o) + Gr.getUUIDString((null == s ? void 0 : s.uuid) || (yield Gr.getUUID(r, e))), "TRACK" === e.type) {
                    i = (null == s ? void 0 : s.sId) || (yield r.vwoInternalProperties.sessionInfoService.getSessionId()), yield window.VWO.phoenix.trigger(dr.EXECUTE_FUNNEL_FOR_GOAL_CAMPAIGN, {
                        campaign: e
                    });
                    let n = null == s ? void 0 : s.gtAndF;
                    if (n || (n = yield window.tracklib.getGtAndF(t)), n) {
                        return a + "&s=" + i + "&ifs=" + +(i === ((null == s ? void 0 : s.sId) || (yield r.vwoInternalProperties.sessionInfoService.getSessionId()))) + "&t=1&cu=" + encodeURIComponent((null == s ? void 0 : s.pageUrl) || r.currentUrl) + n
                    }
                    return ""
                }
                return (yield r.vwoInternalProperties.sessionInfoService.shouldSendSessionInfoInCall()) && (i = yield r.vwoInternalProperties.sessionInfoService.getSessionId()), a + "&combination=" + n + (i = i ? "&sId=" + i : "")
            }))
        }
        _triggerGoalConversion(e, t, n, r, o, s, a) {
            return i(this, void 0, void 0, (function*() {
                const i = a.combination;
                if (!s && (!i || (yield ao.isGoalTriggered(r, n, t)) || Gr.isBot2())) return void(yield e.trigger(dr.REGISTER_CONVERSION, {
                    oldArgs: [r.id, n, o, !1],
                    campaignId: r.id,
                    goalId: n
                }));
                "REVENUE_TRACKING" !== r.goals[n].type && (o = void 0);
                const l = yield this.getImgUrlForConversion(r, n, i, t, o, {
                    uuid: a.uuid,
                    gtAndF: a.gtAndF,
                    sId: a.sId,
                    pageUrl: a.pageUrl
                });
                l && ((yield ts(r.id, t)) && (yield br.sendCall(t, {
                    url: l
                }, null, a.markCGif, null, a.markCGifContext)), yield ao.markGoalTriggered(r, n, t)), yield e.trigger(dr.REGISTER_CONVERSION, {
                    oldArgs: [r.id, n, o, !!l],
                    campaignId: r.id,
                    goalId: n
                })
            }))
        }
    }
    const ns = new is;
    class rs {}
    class os extends rs {
        shouldWeTriggerMetric(e, t, i, n, r) {
            const o = n.isFirst,
                {
                    excludeUrl: s,
                    pExcludeUrl: a,
                    urlRegex: l,
                    pUrl: c
                } = r;
            let d;
            d = !(s || a || l || c) || ns.isGoalEligible(r, e, t);
            return !(!Gr.isSessionBasedCampaign2(n) && o && i.name === dr.PAGE_VIEW && "CUSTOM_GOAL" === r.type) && d
        }
        isItCustomConversionEvent(e) {
            return e.name === dr.CUSTOM_CONVERSION
        }
    }
    var ss = new os;
    class as {}
    class ls extends as {
        execute({
            data: e,
            vwoEvents: t,
            getters: n,
            event: r
        }) {
            var o, s, a, l, c;
            return i(this, void 0, void 0, (function*() {
                if ([dr.DOM_CLICK, dr.DOM_SUBMIT].includes(r.name)) return;
                if (n.vwoInternalProperties.willRedirectionOccur) return;
                if (Gr.isBot2()) return;
                let i;
                r.markCGif && (i = r.markCGif, delete r.markCGif);
                let d = {};
                r.vwo_goalsAlreadyMarkedForConv && (d = r.vwo_goalsAlreadyMarkedForConv, delete r.vwo_goalsAlreadyMarkedForConv);
                const u = {},
                    g = {};
                for (const c of e)
                    for (const e of c.campaigns) {
                        const c = e.c,
                            p = e.g;
                        let h, w = c && n.currentSettings.dataStore.campaigns[c],
                            f = !1;
                        if (e.wasSupposedToBeSyncedInPrevSession && (e.url && (h = {
                                type: "CLICK_ELEMENT",
                                url: e.url
                            }), f = !!e.sess), !c || !p || (null === (s = null === (o = r._vwo) || void 0 === o ? void 0 : o.campaignsConverted) || void 0 === s ? void 0 : s.includes(c)) || !e.wasSupposedToBeSyncedInPrevSession && (!w || !Gr.isSessionBasedCampaign2(w) && (yield ao.isGoalTriggered(w, p, n)))) continue;
                        if (null === (a = d[c]) || void 0 === a ? void 0 : a[p]) return;
                        if (e.wasSupposedToBeSyncedInPrevSession) w || (w = {
                            id: c,
                            goals: {
                                [p]: {}
                            },
                            type: e.sess
                        });
                        else {
                            if (h = w.goals[p], !h) continue;
                            if (f = Gr.isSessionBasedCampaign2(w), f) {
                                if ("CLICK_ELEMENT" !== h.type && "ENGAGEMENT" !== h.type && "ON_PAGE" !== h.type && "FORM_SUBMIT" !== h.type) continue;
                                if (r.trackLibraryNotLoaded) continue
                            }
                            const e = w.triggers[0];
                            if ((null === (l = null == w ? void 0 : w.ss) || void 0 === l ? void 0 : l.csa) && !(yield t.validateTrigger(n.currentSettings.triggers[e], null, {
                                    triggerName: e
                                }))) continue;
                            if (!Gr.shouldTrackUserForCampaign(w) || !(yield ao.isBucketed(n, w, !0)) || !ss.shouldWeTriggerMetric(n, t, r, w, h)) continue
                        }
                        const m = e.uuid || (yield Gr.createUUIDCookie2(n, w));
                        if (!f) {
                            if ("CUSTOM_GOAL" === (null == h ? void 0 : h.type) && (null == h ? void 0 : h.url)) {
                                const e = h.url;
                                u[m] = u[m] || [], u[m].indexOf(e) < 0 && u[m].push(e)
                            }
                            g[m] = g[m] || {};
                            const e = "id_" + c;
                            g[m].metrics = g[m].metrics || {}, g[m].metrics[e] = g[m].metrics[e] || [], g[m].metrics[e].push("g_" + p), w.isEventMigrated && (g[m].comb = g[m].comb || {}, g[m].comb[e] = yield ao.getCombi(n, w, !0))
                        }
                        if (!e.wasCGifSent) {
                            var v = !0;
                            window.VWO._.isBeaconAvailable = r.isBeaconAvailable, window.VWO._.isLinkRedirecting = r.isLinkRedirecting;
                            const t = !0;
                            yield ns.registerConversion(n, p, w, r.revenue, t, i, !0, {
                                combination: e.combination,
                                uuid: m,
                                gtAndF: e.gtAndF,
                                sId: e.sId,
                                pageUrl: e.pageUrl
                            }), window.VWO._.isLinkRedirecting = !1, v = v && window.VWO._.isBeaconAvailable
                        }
                    }
                const p = {};
                if (Object.keys(g).length <= 0) return;
                Object.keys(g).forEach((e => {
                    var t;
                    const i = Object.keys(g[e])[0].slice(3);
                    p[i] = {
                        vwoMeta: {
                            metric: g[e].metrics
                        },
                        uuid: e
                    }, g[e].comb && (p[i].vwoMeta.vS = g[e].comb), (null === (t = u[e]) || void 0 === t ? void 0 : t.length) > 0 && (p[i].matchedSelectors = u[e])
                })), p.splitAmongMultipleCalls = !0, n.eventDataConfig = n.eventDataConfig || {};
                let h = r.name;
                (null === (c = r.name) || void 0 === c ? void 0 : c.startsWith("trigger.vwo_convertRemanentGoals")) && (h = r.realName), n.eventDataConfig[h] = p
            }))
        }
    }
    const cs = new ls,
        ds = cs.execute;
    window.VWO.modules.tags.metric = ds;
    class us {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.prePostMutation.fn." + e[0], window.fetcher.getValue(...e)
        }
    }
    window.VWO.modules.tags.prePostMutation = {};
    class gs {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.prePostMutation.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class vs extends gs {
        isMonitorPageChangesRequired(e) {
            for (const t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    const i = e[t];
                    if (i.muts && i.muts.post && i.muts.post.enabled) return !0
                }
            return !1
        }
        getWaitForDOMRenderingConfigAndHideElements(e) {
            let t = !1,
                i = 10,
                n = 1e3;
            for (const r in e)
                if (Object.prototype.hasOwnProperty.call(e, r)) {
                    const o = e[r],
                        s = o.muts && o.muts.pre;
                    s && s.enabled && (t = !0, s.timer && s.timer > i && (i = s.timer), s.timeout && s.timeout > n && (n = s.timeout))
                }
            return {
                enabled: t,
                timer: i,
                timeout: n
            }
        }
        waitForDOMRenderingAndExecuteCampaign(e) {
            return this.otherSide("waitForDOMRenderingAndExecuteCampaign", [e])
        }
        monitorPageForChanges() {
            return this.otherSide("monitorPageForChanges")
        }
    }
    const ps = new vs;

    function hs() {
        ws("attachEditorChangeObserverEvents")
    }

    function ws(...e) {
        return e[0] = "VWO.modules.tags.prePostMutation.editorChangesObserver." + e[0], window.fetcher.getValue(...e)
    }
    window.VWO.modules.tags.prePostMutation.utils = ps;
    class fs extends us {
        execute({
            data: e,
            getters: t,
            vwoEvents: n
        }) {
            return i(this, void 0, void 0, (function*() {
                e = t.settings.campaigns;
                let i, r;
                if (t.MutationObserver) {
                    const t = ps.getWaitForDOMRenderingConfigAndHideElements(e);
                    t.enabled ? i = ps.waitForDOMRenderingAndExecuteCampaign(t) : (t.timeout = 0, i = ps.waitForDOMRenderingAndExecuteCampaign(t), zr.warn("Framework Rendering Complete option not enabled, but still configurator asked to fire prePostMutation. Automatically fixed the situation."))
                }
                ps.isMonitorPageChangesRequired(e) && (this.addListenerForMutationFound(e, t, n), r = ps.monitorPageForChanges(), hs()), yield Promise.all([i, r])
            }))
        }
        addListenerForMutationFound(e, t, n) {
            const r = e;
            Gr.addListener(t, n, {
                eventName: dr.MUTATION_FOUND
            }, (function() {
                var e, o, s;
                return i(this, void 0, void 0, (function*() {
                    for (const i in r) r[i].xPath && "head" !== (null === (e = r[i]) || void 0 === e ? void 0 : e.xPath.toLowerCase()) && (null === (s = null === (o = r[i].muts) || void 0 === o ? void 0 : o.post) || void 0 === s ? void 0 : s.enabled) && r[i].combination_chosen && (yield window.fetcher.getValue('VWO.modules.tags.runTestCampaign.utils.applyChanges("${{1}}","${{2}}", "${{3}}", "${{4}}")', null, {
                        captureGroups: [t, r[i].combination_chosen, r[i], null]
                    }));
                    n.trigger(dr.EDITOR_APPLY_CHANGES_COMPLETE)
                }))
            }))
        }
    }
    const ms = new fs,
        Es = ms.execute.bind(ms);
    window.VWO.modules.tags.prePostMutation.fn = ms;
    class _s {
        formatErrorObject(e) {
            return "string" == typeof e && (e = {
                msg: e
            }), e
        }
        setCustomError(e) {
            const t = this;
            window.VWO._.customError = function(i) {
                i = t.formatErrorObject(i), e(i)
            }
        }
    }
    class ys extends _s {
        errorTracking({
            getters: e
        }) {
            return i(this, void 0, void 0, (function*() {
                const t = yield window.fetcher.getValue('VWO.modules.tags.errorTrackingCallback("${{1}}")', null, {
                    captureGroups: [e]
                });
                this.setCustomError(t)
            }))
        }
    }
    const Os = new ys,
        Ss = Os.errorTracking;
    class Ts {}
    class Is extends Ts {
        constructor(e, t) {
            super(), this.flattenedGroup = [], this.groupsConfig = e, this.campaigns = t, this.expPossibleToRunMap = {}
        }
        flattenGroupsData() {
            if (this.groupsConfig)
                for (let e = 0; e < this.groupsConfig.length; e++) {
                    if (this.groupsConfig[e].c instanceof Array)
                        for (let t = 0; t < this.groupsConfig[e].c.length; t++) this.groupsConfig[e].c[t] = this.groupsConfig[e].c[t].toString();
                    this.flattenedGroup = this.flattenedGroup.concat(this.groupsConfig[e].c)
                }
        }
        isExperimentReadyToRun(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                const i = t.triggers[0];
                return ao.doExperimentHere(e, t, n, !0) && (yield window.VWO.phoenix.validateTrigger(i, null, {
                    skipEventProps: !0,
                    skipValidationIfTimer: !0,
                    triggerName: i
                }, null, {
                    triggerName: i
                }))
            }))
        }
        checkForExistingWinner(e, t) {
            return i(this, void 0, void 0, (function*() {
                return e = e || window.phoenix.store.getters, (yield ao.getCombiCookie(e, t)) || (yield ao.isLogged(e, t)) || "SPLIT_URL" === this.campaigns[t].type && (yield Gr.getSplitDecision(e, t)) || 1 === this.expPossibleToRunMap[t]
            }))
        }
        checkWinnerAlreadyExists(e) {
            for (let t = 0; t < e.length; t++) {
                const i = parseInt(e[t], 10);
                if (1 === this.expPossibleToRunMap[i]) return i
            }
        }
        processExperimentsOnBasisOfRandomness(e, t) {
            return i(this, void 0, void 0, (function*() {
                const n = {},
                    r = {},
                    o = t.c;
                let s = 0,
                    a = this.checkWinnerAlreadyExists(o);
                if (!a) {
                    for (let e = 0; e < o.length; e++) 2 === this.expPossibleToRunMap[o[e]] && (s += 1, r[o[e]] = this.campaigns[o[e]].triggers);
                    if (!s) {
                        const t = o.map((t => i(this, void 0, void 0, (function*() {
                            4 === this.expPossibleToRunMap[t] && (yield ao.exclude(e, this.campaigns[t]))
                        }))));
                        return void(yield Promise.all(t))
                    }
                    for (const e in r) Object.prototype.hasOwnProperty.call(r, e) && (n[e] = +(100 / s).toFixed(2));
                    a = yield ao.chooseCombination(e, null, {
                        scaleInfo: n,
                        segmentInfo: r
                    }), this.expPossibleToRunMap[a] = 1
                }
            }))
        }
        updateExperiments(e) {
            return i(this, void 0, void 0, (function*() {
                let t, n = !1,
                    r = !1,
                    o = !1;
                const s = Object.keys(this.campaigns).map((s => i(this, void 0, void 0, (function*() {
                    if (Object.prototype.hasOwnProperty.call(this.campaigns, s)) {
                        const i = e.settings.currentSettings.triggers[window._vwo_exp[s].triggers[0]],
                            a = "SPLIT_URL" === this.campaigns[s].type;
                        let l;
                        0 !== this.expPossibleToRunMap[s] && 1 !== this.expPossibleToRunMap[s] && 3 !== this.expPossibleToRunMap[s] || (this.campaigns[s].shouldHideElement = 1), 1 === this.expPossibleToRunMap[s] && (e.trigger(dr.GROUP_WINNER_CHOOSEN, {
                            groupWinner: parseInt(s, er)
                        }), a && (n = !0, (l = yield window.VWO.phoenix.validateTrigger(i, null, {
                            skipEventProps: !0
                        })) && (o = !0))), !a || r && t || (this.flattenedGroup.indexOf(s) < 0 ? l && ao.doExperimentHere(e.store.getters, window._vwo_exp[s], e) && (t = !0) : r = !0)
                    }
                }))));
                yield Promise.all(s), n && o || !r || t || e.trigger(dr.NOT_REDIRECTING)
            }))
        }
        filterByGroupType(e) {
            const t = this.groupsConfig.map((t => this.processExperimentsOnBasisOfRandomness(e, t)));
            return Promise.all(t)
        }
        filterExperimentsFromGroups({
            getters: e,
            vwoEvents: t
        }) {
            var n;
            return i(this, void 0, void 0, (function*() {
                if (!(null === (n = this.groupsConfig) || void 0 === n ? void 0 : n.length)) {
                    for (const e in this.campaigns) Object.prototype.hasOwnProperty.call(this.campaigns, e) && t.trigger(dr.GROUP_WINNER_CHOOSEN, {
                        groupWinner: parseInt(e, er)
                    });
                    return
                }
                let r = !1;
                const o = Object.keys(this.campaigns).map((n => i(this, void 0, void 0, (function*() {
                    n = n.toString();
                    const i = this.campaigns[n];
                    if (Io(this.flattenedGroup, n) < 0) this.expPossibleToRunMap[n] = 0;
                    else if (yield ao.isExcluded(e, i)) this.expPossibleToRunMap[n] = 3;
                    else {
                        r = !0;
                        const o = this.checkForExistingWinner(e, i.id),
                            s = this.isExperimentReadyToRun(e, i, t);
                        (yield o) ? this.expPossibleToRunMap[n] = 1: 1 !== this.expPossibleToRunMap[n] && (yield s) && ((yield ao.shouldBucket(e, i)) ? this.expPossibleToRunMap[n] = 2 : this.expPossibleToRunMap[n] = 4)
                    }
                }))));
                return yield Promise.all(o), r && (yield this.filterByGroupType(e)), this.updateExperiments(t)
            }))
        }
    }
    class Cs {}
    class bs extends Cs {
        constructor() {
            super(), this.campaignsData = {}
        }
        processCampaigns({
            event: e,
            getters: t,
            actions: i,
            vwoEvents: n,
            data: r
        }) {
            const o = t.settings.vwoData.gC,
                s = t.settings.campaigns,
                a = new Is(o, s);
            return a.flattenGroupsData(), a.filterExperimentsFromGroups({
                actions: i,
                getters: t,
                event: e,
                vwoEvents: n,
                data: r
            })
        }
        processGroupCampaigns({
            event: e,
            data: t,
            getters: i,
            actions: n,
            vwoEvents: r
        }) {
            if (window.VWO._.pageData = window.VWO._.pageData || {}, window.fetcher.setValue("VWO._.pageData", window.VWO._.pageData), window.VWO._.pageData._grp_campaign_called) return void r.trigger("vwo_groupCampTriggered");
            window.VWO._.pageData._grp_campaign_called = !0, window.fetcher.setValue("VWO._.pageData._grp_campaign_called", !0);
            const o = ao.getGroupBasedCampaigns({
                event: e,
                data: t,
                getters: i,
                actions: n,
                vwoEvents: r
            });
            if (o.length) {
                for (const e of o) this.campaignsData[e] = i.settings.campaigns[e];
                return this.processCampaigns({
                    event: e,
                    getters: i,
                    actions: n,
                    vwoEvents: r,
                    data: this.campaignsData
                }).then((() => {
                    r.trigger("vwo_groupCampTriggered")
                }))
            }
            r.trigger("vwo_groupCampTriggered")
        }
    }
    const Ns = new bs,
        As = Ns.processGroupCampaigns.bind(Ns);
    window.VWO.modules.tags.groupCampaigns = As;
    class Rs {}
    class Vs {}
    const {
        toString: xs
    } = Object.prototype;
    class Ps extends Vs {
        debounceGetSettings({
            getters: e
        }) {
            Co(Gr.getSettings(2, e), e.vwoInternalProperties.SPA_NEW_PAGE_SETTINGS_DELAY)
        }
        resetTriggerStates() {
            var e, t, i, n;
            const r = Ki.phoenix;
            Ki._.pageNo = "number" == typeof Ki._.pageNo ? Ki._.pageNo + 1 : 0;
            const o = "vwo_timer",
                s = null === (i = null === (t = null === (e = r.store) || void 0 === e ? void 0 : e.state) || void 0 === t ? void 0 : t.values) || void 0 === i ? void 0 : i.triggers,
                a = r.settings.currentSettings.triggers,
                l = r.triggers.triggerEventListeners;
            kr(r, dr.POST_INIT, {}), r.eventBus.remove(o);
            for (const e in a)
                if (Object.prototype.hasOwnProperty.call(a, e)) {
                    const t = null === (n = a[e]) || void 0 === n ? void 0 : n.cnds;
                    let i, c;
                    s[e] && (i = s[e].event, c = s[e].trigger);
                    let d, u = !1;
                    if (t)
                        for (const e of t)
                            if ("[object Object]" === xs.call(e)) {
                                c && (c[e.id].state = !1);
                                e.event === o && (u = !0, d = e.exitTrigger)
                            }
                    if (i) {
                        s[e].state = !1;
                        for (const e in i) Object.prototype.hasOwnProperty.call(i, e) && delete i[e]
                    }
                    u && (d && (r.eventBus.remove(r.triggers.getTriggerEventName(d)), d = null), delete l[e].vwo_timer, r.triggers.add(e, a[e]), u = !1)
                }
            r.events.events.vwo_timer.eventConditionsUpdate()
        }
        resetExpParams(e, t) {
            const i = e.currentSettings.dataStore.campaigns;
            for (const e in i)
                if (Object.prototype.hasOwnProperty.call(i, e)) {
                    const t = i[e];
                    t[Zn] = 0, delete t[qn], delete t[Qn], delete t.clicks, delete t.combination_chosen, delete t.segment_eligble, delete t.isFirst, delete t.ready, delete t.timedout, delete t[qn], ao.checkForVariationTargeting(t) && delete t.xPath, clearTimeout(t[nr]), delete t[nr], delete t.globalCode.preExecuted;
                    for (var n = To(t.sections), r = 0; r < n.length; r++) delete t.sections[n[r]].loaded
                }
            if (window._vis_debug) {
                e.getValue("tags.segmentEligibilityTest") && t.addValues({
                    executionCount: 0
                }, "tags.segmentEligibilityTest")
            }
        }
        resetTriggerExecutionCount(e) {
            const t = e.triggers;
            Object.keys(t).forEach((e => {
                t[e].executionCount = 0
            }))
        }
    }
    var Ds = new Ps;
    class Ls extends Rs {
        execute({
            event: e,
            data: t,
            getters: n,
            actions: r,
            vwoEvents: o
        }) {
            return i(this, void 0, void 0, (function*() {
                if (Ds.resetTriggerStates(), window.location = yield window.fetcher.getValue("location"), n.vwoInternalProperties.willRedirectionOccur) return;
                const i = e.oldUrl,
                    s = n.currentUrl;
                if (s === i || n.vwoInternalProperties.waitingForThirdPartySync) return;
                Ds.resetExpParams(o.store.getters, r), Ds.resetTriggerExecutionCount(o.store.getters), o.trigger(dr.URL_CHANGED);
                Gr.setPropertiesToBothThreads(r, [{
                    willRedirectionOccur: !1,
                    destinationMT: "VWO._.willRedirectionOccur"
                }], "vwoInternalProperties"), r.addValues({
                    pageId: void 0
                }, "vwoInternalProperties"), yield yo({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), n.accountId, window.VWO._.campaignsInternalMap = {}, window.VWO._.pageData = window.VWO._.pageData || {}, delete window.VWO._.pageData._grp_campaign_called, yield Gr.shouldExecuteLib({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), n.vwoInternalProperties.shouldExecuteLib && (n.vwoCode && (n.vwoCode[zn] = !1, n.vwoCode[Xn] = !1), (n.visDebug || pr()) && kr(o, dr.PAGE_VIEW, {
                    url: s
                }), Ds.debounceGetSettings({
                    event: e,
                    data: t,
                    getters: n,
                    actions: r,
                    vwoEvents: o
                }), o.trigger(dr.POST_URL_CHANGE, {
                    oldArgs: [Bo.getCleanedUrl(s), n.vwoInternalProperties.willRedirectionOccur]
                }))
            }))
        }
    }
    const ks = new Ls,
        Us = ks.execute;

    function Ms({
        data: e,
        event: t,
        getters: i,
        vwoEvents: n
    }) {
        var r;
        const o = e.triggers[0],
            s = null === (r = i.triggers[o]) || void 0 === r ? void 0 : r.state;
        s || (n.trigger(dr.WAIT_FOR_BEHAVIOR, {
            oldArgs: [e.id]
        }), n.trigger(dr.SEGMENTATION_EVALUATED, {
            oldArgs: [e.id, s, !0]
        }), !1 !== t.hideElementsTriggered && n.trigger(dr.ELEMENTS_SHOWN_WITHOUT_CHANGES, {
            oldArgs: [e.id]
        }))
    }
    const Ws = {
        get: e => {
            try {
                return window.localStorage.getItem(e)
            } catch (e) {
                return ""
            }
        },
        set: (e, t) => {
            try {
                const i = window.localStorage;
                return window.VWO._.isWorkerThread ? i.setItem(e, t) : i._setItem(e, t)
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
    window.VWO._.localStorageService = Ws;
    const Gs = {
        init: function(e, t) {
            window.fetcher.getValue("VWO._.vwoLib.initTrack", [e, t])
        },
        processEvent: function(e, t, i, n, r) {
            if ("[object Array]" !== Object.prototype.toString.call(e)) return 0;
            try {
                var o, s, a, l = e[0],
                    c = e.slice(1),
                    d = -1 !== l.indexOf(".");
                return d && 0 === l.indexOf(t) || !d ? (d ? (o = i[(s = l.split("."))[0]][s[1]], a = i[s[0]]) : (o = i[l], a = i), o ? (window.VWO._.prVWO = window.VWO._.prVWO.concat(r.queue ? r.splice(n, 1) : r.queue), o.apply(a, c), 1) : 0) : 0
            } catch (t) {
                return console.log("Error occured in VWO Process Event (" + (e && e[0]) + "): ", t), 0
            }
        }
    };
    class Fs {
        constructor() {
            this.noOp = function() {}
        }
        getPhoenixConfig() {
            const e = {
                tags: {
                    checkEnvironment: {
                        fn: Po,
                        sync: !0
                    },
                    prePostMutation: {
                        fn: Es,
                        sync: !0
                    },
                    visibilityService: {
                        fn: jo,
                        sync: !0
                    },
                    groupCampaigns: {
                        fn: As,
                        sync: !0
                    },
                    runCampaign: {
                        fn: qo,
                        sync: !0
                    },
                    metric: {
                        fn: ds,
                        sync: !0,
                        fireUniquelyForEveryEvent: !0
                    },
                    runTestCampaign: {
                        fn: es,
                        sync: !0
                    },
                    errorTracking: {
                        fn: Ss,
                        sync: !0
                    },
                    urlChange: {
                        fn: Us,
                        sync: !0
                    }
                },
                storages: {
                    localStorageService: Ws,
                    cookies: Bn
                },
                jsLibUtils: {
                    verifyUrl: function() {
                        return Bo.verifyUrl.apply(Bo, arguments)
                    },
                    getCleanedUrl: function() {
                        return Bo.getCleanedUrl.apply(Bo, arguments)
                    }
                }
            };
            return window._vis_debug && (e.tags.segmentEligibilityTest = {
                fn: Ms,
                sync: !1,
                occurrence: 1
            }), e
        }
        setFunnelExps(e) {
            var t, i;
            const n = null === (t = null == e ? void 0 : e.settings) || void 0 === t ? void 0 : t.campaigns,
                r = [];
            for (const e in window._vwo_exp)
                if (window._vwo_exp[e].funnel)
                    for (const t of window._vwo_exp[e].funnel) {
                        const e = t;
                        (null === (i = window._vwo_exp[e.id]) || void 0 === i ? void 0 : i.g) || (window._vwo_exp[e.id] = e, window._vwo_exp[e.id].g = e.goals, window._vwo_exp[e.id].goals = {}, r.push(e.id + ""), n && (n[e.id] = window._vwo_exp[e.id]))
                    }
            return r
        }
        sendMessageToParentFrame(e) {
            return window.fetcher.getValue("VWO.modules.utils.initUtils.sendMessageToParentFrame", [e])
        }
        initializeCookieJar(e = "ignoreCustomConfig") {
            for (var t, i = Array.prototype.slice.apply(Ki).length, n = 0; n < i; n++)
                if ("config" === Ki[n][0]) {
                    t = n;
                    break
                }
            "number" == typeof t && Gs.processEvent(["config", Ki[t][1]], "jslib", Ki, t, Ki);
            var r = Ki.config();
            "ignoreCustomConfig" !== e && ((r = r || {}).storage = {
                strategy: "custom",
                backwardCompatible: !1,
                strategyConfig: {
                    callback: this.sendMessageToParentFrame,
                    cookieJarValue: this.getCookieJarValidValue(e)
                }
            }), Bn.init(r && r.storage)
        }
        getCookieJarValidValue(e) {
            return ["null", null, void 0, "undefined"].indexOf(e) > -1 ? "" : e
        }
        setupCookieJar(e) {
            let t;
            e && (t = location.search.match(/.*_vwo_store=([^&]*)/), t = t ? t[1] : ""), this.initializeCookieJar(t)
        }
    }
    var js = new Fs;
    const {
        toString: $s
    } = Object.prototype;

    function Hs(e) {
        return "[object Object]" === $s.call(e)
    }
    class Bs {
        mergeNestedObjects(...e) {
            return e.reduce(((e, t) => this.recursivelyMerge(e, t)))
        }
        createNestedObjects(e, t) {
            let i = e;
            return t && t.split(".").forEach((e => {
                Object.prototype.hasOwnProperty.call(i, e) || (i[e] = {}), i = i[e]
            })), i
        }
        clearNestedObject(e, t) {
            let i = e;
            const n = t.split("."),
                r = n[n.length - 1];
            for (let e = 0; e < n.length - 1; e++) i = i[n[e]];
            Hs(i[r]) ? i[r] = {} : delete i[r]
        }
        recursivelyMerge(e, t, i = {}) {
            if (Hs(e) && Hs(t)) {
                const n = {};
                Object.keys(e).concat(Object.keys(t)).forEach((e => {
                    n[e] = 1
                }));
                const r = Object.getOwnPropertyDescriptors(e),
                    o = Object.getOwnPropertyDescriptors(t);
                return Object.keys(n).forEach((n => {
                    o[n] ? Object.defineProperty(i, n, o[n]) : Object.defineProperty(i, n, r[n]), this.recursivelyMerge(e[n], t[n], i[n])
                })), i
            }
            return t || e
        }
    }
    var Js = new Bs,
        Ks, Ys, zs;

    function Xs(...e) {
        return e[0] = "VWO.modules.otherLibDeps." + e[0], window.fetcher.getValue(...e)
    }

    function qs(e) {
        return Xs('storeSurveyDataInVWOSurveySettings("${{1}}")', null, {
            captureGroups: [e]
        })
    }

    function Qs(e) {
        return Xs(`setOtherLibrariesDeps("${e.store.getters.vwoUUID}")`)
    }! function(e) {
        e.SUM = "sum", e.COUNT = "count", e.AVG = "avg", e.MIN = "min", e.MAX = "max", e.FIRST_VALUE = "first", e.LAST_VALUE = "last", e.MEAN = "mean", e.MEDIAN = "median"
    }(Ks || (Ks = {})),
    function(e) {
        e.SINCE = "s", e.WITHIN = "w", e.FROM = "f"
    }(Ys || (Ys = {})),
    function(e) {
        e.DAYS = "d", e.WEEKS = "w", e.MONTHS = "m", e.YEARS = "y"
    }(zs || (zs = {}));
    class Zs {
        setItem(e, t) {
            e = this.getKeyBasedOnMode(e), Ws.set(e, JSON.stringify(t))
        }
        getItem(e) {
            return e = this.getKeyBasedOnMode(e), Ws.get(e)
        }
        removeItem(e) {
            e = this.getKeyBasedOnMode(e), Ws.remove(e)
        }
        getKeyBasedOnMode(e) {
            if (!window._vis_debug) return e;
            return "debug" + e + "_" + Object.keys(window._vwo_exp || {}).join("_")
        }
    }
    class ea extends Zs {
        initialize() {
            this.eventHist = JSON.parse(this.getItem("_vwo_eventHist") || "{}"), this.syncEvents = window.VWO._.allSettings.dataStore.syE || {}, this.syncEventsConfig = window.VWO._.allSettings.dataStore.syncEvent || "sessionCreated", this.triggerEvents = [], pr() || window._vis_heatmap || !Object.keys(this.syncEvents).length ? ia.clearHistoricalDataOfType(na.Events) : this.shouldSyncEvents = !0
        }
        addEventHistListeners() {
            pr() || window._vis_heatmap || !Object.keys(this.syncEvents).length || (window.VWO.phoenix.on(dr.URL_CHANGED, (() => {
                this.triggerEvents.forEach((e => i(this, void 0, void 0, (function*() {
                    this.eventHist[e.eventName] && (yield window.VWO.phoenix.isValid(e.triggerName, e.trigger, e.eventName))
                })))), this.shouldSyncEvents = !0
            })), window.VWO.modules.utils.storageSyncer.add(this.getKeyBasedOnMode("_vwo_eventHist"), (e => {
                try {
                    this.eventHist = JSON.parse(e) || {}
                } catch (e) {}
            })), window._vis_debug ? this.addListenerForSyEUpdation() : "pageView" === this.syncEventsConfig ? window.VWO.phoenix.on(dr.PAGE_VIEW, (() => {
                this.syncEvents = window.VWO._.allSettings.dataStore.syE || {}, this.shouldSyncEvents && (this.syncEventsData(), this.shouldSyncEvents = !1)
            })) : "sessionCreated" === this.syncEventsConfig && (window.VWO.phoenix.on(dr.NEW_SESSION_CREATED, (() => {
                this.syncEvents = window.VWO._.allSettings.dataStore.syE || {}, this.shouldSyncEvents && (this.syncEventsData(), this.shouldSyncEvents = !1)
            })), window.VWO.phoenix.on(dr.TRACK_NEW_SESSION_CREATED, (() => {
                this.syncEvents = window.VWO._.allSettings.dataStore.syE || {}, this.shouldSyncEvents && (this.syncEventsData(), this.shouldSyncEvents = !1)
            })), this.addListenerForSyEUpdation()))
        }
        addListenerForSyEUpdation() {
            const e = window.VWO.phoenix.on(dr.PAGE_VIEW, (() => {
                this.syncEvents = window.VWO._.allSettings.dataStore.syE || {}, JSON.stringify(this.syncEvents) !== this.getItem("_vwo_syE") && (Object.keys(this.syncEvents).length && this.setItem("_vwo_syE", this.syncEvents), this.shouldSyncEvents && (this.syncEventsData(), this.shouldSyncEvents = !1)), window._vis_debug && window.VWO.phoenix.off(dr.PAGE_VIEW, e)
            }))
        }
        updateEventHist(e, t) {
            if (!pr() && !window._vis_heatmap && Object.keys(this.syncEvents).length) {
                if (this.eventHist[e] = this.eventHist[e] || [], Object.prototype.hasOwnProperty.call(this.syncEvents, "*")) {
                    const i = Object.assign({}, t);
                    delete i.name, delete i.props, delete i._meta, delete i.time, delete i.page, delete i.isCustomEvent, i.ts = t.time, this.eventHist[e].push(i)
                } else if (Object.prototype.hasOwnProperty.call(this.syncEvents, e)) {
                    const i = {};
                    if (Array.isArray(this.syncEvents[e]))
                        for (let n of this.syncEvents[e]) void 0 !== t[n] && (i[n] = t[n]);
                    i.ts = t.time, this.eventHist[e].push(i)
                }
                this.eventHist[e].length ? this.setItem("_vwo_eventHist", this.eventHist) : delete this.eventHist[e]
            }
        }
        syncEventsData() {
            return i(this, void 0, void 0, (function*() {
                if (pr() || window._vis_heatmap || !Object.keys(this.syncEvents).length) return;
                let e = yield Gr.getUUID(window.VWO.phoenix.store.getters), t = "";
                if (window._vis_debug) {
                    const i = Bn.get("_vwo_uuid", !1, !0);
                    if (!i) return;
                    window._vwo_exp && Object.keys(window._vwo_exp).length && (e = i, t = "&cId=" + Object.keys(window._vwo_exp).join("|"))
                }
                const i = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/",
                    n = "sync/events?a=" + window._vwo_acc_id + "&uuid=" + e + t;
                try {
                    const e = yield fetch(i + n), t = yield e.json();
                    this.eventHist = t, this.eventHist && Object.keys(this.eventHist).length ? this.setItem("_vwo_eventHist", this.eventHist) : this.removeItem("_vwo_eventHist")
                } catch (e) {
                    zr.warn("Error in syncing historical Events Data.")
                }
            }))
        }
        getEventsByDate(e, t, i) {
            const n = Object.assign({}, i);
            delete n.page, delete n.isCustomEvent, delete n.name;
            let r = [...this.eventHist[e] || [], Object.assign(Object.assign({}, n), {
                ts: +new Date
            })];
            n.fromLocalStorage && (r = [...this.eventHist[e] || []]);
            let {
                firstDate: o,
                lastDate: s
            } = this.getDateRange(t, r);
            const a = this.binSearchFirstIndex(o, r),
                l = this.binSearchLastIndex(s, r);
            return -1 === a || -1 === l ? [] : r.slice(a, l + 1)
        }
        getDateRange(e, t) {
            let i, n;
            const r = e.split("-"),
                o = r[0],
                s = r[1];
            return o === Ys.SINCE ? (n = new Date, i = new Date, s[s.length - 1] === zs.DAYS ? i.setDate(i.getDate() - Number(s.slice(0, s.length - 1))) : s[s.length - 1] === zs.WEEKS ? i.setDate(i.getDate() - 7 * Number(s.slice(0, s.length - 1))) : s[s.length - 1] === zs.MONTHS ? i.setMonth(i.getMonth() - Number(s.slice(0, s.length - 1))) : s[s.length - 1] === zs.YEARS ? i.setFullYear(i.getFullYear() - Number(s.slice(0, s.length - 1))) : i = new Date(s)) : o === Ys.FROM ? (i = new Date(r[1]), n = new Date(r[2])) : o === Ys.WITHIN && (i = new Date(t[0].ts), n = new Date(i), s[s.length - 1] === zs.DAYS ? n.setDate(i.getDate() + Number(s.slice(0, s.length - 1))) : s[s.length - 1] === zs.WEEKS ? n.setDate(i.getDate() + 7 * Number(s.slice(0, s.length - 1))) : s[s.length - 1] === zs.MONTHS ? n.setMonth(i.getMonth() + Number(s.slice(0, s.length - 1))) : s[s.length - 1] === zs.YEARS ? n.setFullYear(i.getFullYear() + Number(s.slice(0, s.length - 1))) : n = new Date(s)), i.setHours(0, 0, 0, 0), n.setHours(23, 59, 59, 59), i = +i, n = +n, {
                firstDate: i,
                lastDate: n
            }
        }
        binSearchFirstIndex(e, t) {
            let i, n, r = 0,
                o = t.length - 1;
            for (; r <= o;) i = Math.floor((r - o) / 2 + o), n = t[i].ts, n >= e ? o = i - 1 : r = i + 1;
            return r >= t.length ? -1 : r
        }
        binSearchLastIndex(e, t) {
            let i, n, r = 0,
                o = t.length - 1;
            for (; r <= o;) i = Math.floor((r - o) / 2 + o), n = t[i].ts, n > e ? o = i - 1 : r = i + 1;
            return o < 0 ? -1 : o
        }
        getCumulativeData(e, t) {
            const i = {};
            for (let n in t) {
                for (let r of e) i[n] = i[n] || {}, "*" === n ? (i[n].count = i[n].count || 0, i["*"].count++) : Object.prototype.hasOwnProperty.call(r, n) && this.handleOps(r[n], t[n], i[n]);
                if (t[n].includes(Ks.AVG) && (i[n].avg = i[n].avg.sum / i[n].avg.count), t[n].includes(Ks.MEDIAN)) {
                    const e = i[n][Ks.MEDIAN],
                        t = Math.floor(e.length / 2),
                        r = [...e].sort(((e, t) => e - t));
                    i[n][Ks.MEDIAN] = e.length % 2 != 0 ? r[t] : (r[t - 1] + r[t]) / 2
                }
            }
            return i
        }
        handleOps(e, t, i) {
            for (let n of t) switch (n) {
                case Ks.COUNT:
                    i.count = i.count || 0, i.count++;
                    break;
                case Ks.SUM:
                    i.sum = i.sum || 0, i.sum += e;
                    break;
                case Ks.MIN:
                    i.min = Math.min(e, i.min || e);
                    break;
                case Ks.MAX:
                    i.max = Math.max(e, i.max || e);
                    break;
                case Ks.FIRST_VALUE:
                    void 0 === i.first && (i.first = e);
                    break;
                case Ks.LAST_VALUE:
                    i.last = e;
                    break;
                case Ks.AVG:
                    i.avg = i.avg || {}, i.avg.sum = i.avg.sum || 0, i.avg.sum += e, i.avg.count = i.avg.count || 0, i.avg.count++;
                    break;
                case Ks.MEDIAN:
                    i.median = i.median || [], i.median.push(e)
            }
        }
    }
    const ta = new ea,
        ia = {
            get syncEvents() {
                return ta.syncEvents
            },
            get syncAttributes() {
                return oa.syncVisAttrs
            },
            get eventHistory() {
                return ta.eventHist
            },
            get visitorProperties() {
                return oa.visitorAttrs
            },
            clearHistoricalDataOfType(e) {
                e === na.Attributes ? (Ws.remove(oa.getKeyBasedOnMode("_vwo_syV")), Ws.remove(oa.getKeyBasedOnMode("_vwo_visProps"))) : e === na.Events && (Ws.remove(ta.getKeyBasedOnMode("_vwo_syE")), Ws.remove(ta.getKeyBasedOnMode("_vwo_eventHist")))
            },
            clearHistoricalData(e, t) {
                Object.keys(t).length || (Ws.remove(ta.getKeyBasedOnMode("_vwo_syE")), Ws.remove(ta.getKeyBasedOnMode("_vwo_eventHist"))), Array.isArray(e) && (null == e ? void 0 : e.length) || (Ws.remove(oa.getKeyBasedOnMode("_vwo_syV")), Ws.remove(oa.getKeyBasedOnMode("_vwo_visProps")))
            }
        };
    var na;
    ! function(e) {
        e[e.Attributes = 0] = "Attributes", e[e.Events = 1] = "Events"
    }(na || (na = {}));
    class ra extends Zs {
        initialize() {
            var e;
            this.visitorAttrs = JSON.parse(this.getItem("_vwo_visProps") || "{}"), this.syncVisAttrs = window.VWO._.allSettings.dataStore.syV || {}, this.syncAttrConfig = window.VWO._.allSettings.dataStore.syncAttr || "sessionCreated", !pr() && !window._vis_heatmap && Array.isArray(this.syncVisAttrs) && (null === (e = this.syncVisAttrs) || void 0 === e ? void 0 : e.length) ? (this.shouldSyncAttr = !0, this.addVisAttrListeners(), this.visitorAttrs && Object.keys(this.visitorAttrs).length && this.addAttrToGetters()) : ia.clearHistoricalDataOfType(na.Attributes)
        }
        addVisAttrListeners() {
            window.VWO.modules.utils.storageSyncer.add(this.getKeyBasedOnMode("_vwo_visProps"), (e => {
                try {
                    this.visitorAttrs = JSON.parse(e) || {}
                } catch (e) {}
            })), window._vis_debug ? this.addListenerForSyVUpdation() : ("pageView" === this.syncAttrConfig ? window.VWO.phoenix.on(dr.PAGE_VIEW, (() => {
                this.syncVisAttrs = window.VWO._.allSettings.dataStore.syV, this.shouldSyncAttr && (this.syncVisData(), this.shouldSyncAttr = !1)
            })) : "sessionCreated" === this.syncAttrConfig && (window.VWO.phoenix.on(dr.NEW_SESSION_CREATED, (() => {
                this.syncVisAttrs = window.VWO._.allSettings.dataStore.syV, this.shouldSyncAttr && (this.syncVisData(), this.shouldSyncAttr = !1)
            })), window.VWO.phoenix.on(dr.TRACK_NEW_SESSION_CREATED, (() => {
                this.syncVisAttrs = window.VWO._.allSettings.dataStore.syV, this.shouldSyncAttr && (this.syncVisData(), this.shouldSyncAttr = !1)
            })), this.addListenerForSyVUpdation()), window.VWO.phoenix.on(dr.URL_CHANGED, (() => {
                this.shouldSyncAttr = !0
            })))
        }
        addListenerForSyVUpdation() {
            const e = window.VWO.phoenix.on(dr.PAGE_VIEW, (() => {
                this.syncVisAttrs = window.VWO._.allSettings.dataStore.syV, JSON.stringify(this.syncVisAttrs) !== this.getItem("_vwo_syV") && (Array.isArray(this.syncVisAttrs) && this.syncVisAttrs.length && this.setItem("_vwo_syV", this.syncVisAttrs), this.shouldSyncAttr && (this.syncVisData(), this.shouldSyncAttr = !1)), window._vis_debug && window.VWO.phoenix.off(dr.PAGE_VIEW, e)
            }))
        }
        updateVisAttr(e) {
            var t;
            if (!pr() && !window._vis_heatmap && Array.isArray(this.syncVisAttrs) && (null === (t = this.syncVisAttrs) || void 0 === t ? void 0 : t.length)) {
                for (const t in e) Object.prototype.hasOwnProperty.call(e, t) && (this.syncVisAttrs.includes("*") || this.syncVisAttrs.includes(t)) && (this.visitorAttrs[t] = e[t]);
                try {
                    Object.keys(this.visitorAttrs).length && this.setItem("_vwo_visProps", this.visitorAttrs)
                } catch (e) {}
            }
        }
        syncVisData() {
            var e;
            return i(this, void 0, void 0, (function*() {
                if (pr() || window._vis_heatmap || !Array.isArray(this.syncVisAttrs) || !(null === (e = this.syncVisAttrs) || void 0 === e ? void 0 : e.length)) return;
                let t = yield Gr.getUUID(window.VWO.phoenix.store.getters), i = "";
                if (window._vis_debug) {
                    const e = Bn.get("_vwo_uuid", !1, !0);
                    if (!e) return;
                    Object.keys(window._vwo_exp || {}).length && (t = e, i = "&cId=" + Object.keys(window._vwo_exp).join("|"))
                }
                const n = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/",
                    r = "sync/attributes?a=" + window._vwo_acc_id + "&uuid=" + t + i;
                try {
                    const e = yield fetch(n + r), t = yield e.json();
                    this.visitorAttrs = t, this.visitorAttrs && Object.keys(this.visitorAttrs).length ? (this.setItem("_vwo_visProps", this.visitorAttrs), this.addAttrToGetters()) : this.removeItem("_vwo_visProps")
                } catch (e) {
                    zr.warn("Error in syncing Historical Attributes Data.")
                }
            }))
        }
        addAttrToGetters() {
            for (const e in this.visitorAttrs) Object.prototype.hasOwnProperty.call(this.visitorAttrs, e) && window.VWO.phoenix.store.actions.set(e, this.visitorAttrs[e], "")
        }
    }
    const oa = new ra;

    function sa(e, t, i) {
        const n = window.VWO;
        switch (e.toLowerCase()) {
            case "tags":
                n.phoenix.tags.add(t, i.fn);
                break;
            case "operators":
                n.phoenix.operators.add(i.fn);
                break;
            case "storages":
                n.phoenix.storages.add(i);
                break;
            case "store":
                n.phoenix.store.actions.addValues(i)
        }
    }
    class aa {
        constructor(e) {
            this.toJSON = function() {
                const e = Object.assign({}, this);
                return delete e.modules, e
            }, Object.keys(e).forEach((t => {
                this[t] = e[t]
            }))
        }
        config(e) {
            return e && (this.configSettings = e), this.configSettings
        }
        definePlugin(e, t = {}) {
            const i = e.split(".")[0],
                n = e.split(".")[1],
                r = window.VWO;
            r.phoenix ? sa(i, n, t) : (r.pluginStorage = r.pluginStorage || {}, r.pluginStorage[i] = r.pluginStorage[i] || {}, n ? (r.pluginStorage[i][n] = r.pluginStorage[i][n] || {}, r.pluginStorage[i][n] = Js.mergeNestedObjects(r.pluginStorage[i][n], t)) : r.pluginStorage[i] = Js.mergeNestedObjects(r.pluginStorage[i], t))
        }
        updateSettings(e, t, n) {
            var r, o, s;
            return i(this, void 0, void 0, (function*() {
                const i = window.VWO._.allSettings.dataStore.campaigns,
                    a = null === (r = t.dataStore) || void 0 === r ? void 0 : r.campaigns;
                if (a)
                    for (const e in a) i[e] && delete a[e];
                const l = JSON.parse(JSON.stringify(a)),
                    c = JSON.parse(JSON.stringify((null === (o = t.dataStore) || void 0 === o ? void 0 : o.syE) || {})),
                    d = JSON.parse(JSON.stringify((null === (s = t.dataStore) || void 0 === s ? void 0 : s.syV) || {})),
                    u = Object.keys(l);
                for (var g in a) window.VWO._.allSettings.dataStore.campaigns[g] = a[g], a[g] = window.VWO._.allSettings.dataStore.campaigns[g];
                this.phoenix.add(t), this.phoenix.store.actions.addValues({
                    currentSettings: this.phoenix.settings.currentSettings
                }, "root"), window.VWO._.allSettings.dataStore.syE = c, window.VWO._.allSettings.dataStore.syV = d, ia.clearHistoricalData(d, c), qs(l);
                const v = js.setFunnelExps(this.phoenix.store.getters);
                u.push(...v), Gr.setCampaignIds(u);
                for (const e in window.VWO._.allSettings.dataStore.campaigns) Object.prototype.hasOwnProperty.call(window.VWO._.allSettings.dataStore.campaigns, e) && ns.serializeData(window.VWO._.allSettings.dataStore.campaigns[e]);
                if (Gr.loadNonTestingLibraries(this.phoenix.store.getters, l, n), 2 === parseInt(n, er) && (kr(this.phoenix, dr.PAGE_VIEW, {
                        url: this.phoenix.store.getters.currentUrl
                    }), this.phoenix.trigger("vwo_dom_DOMContentLoaded")), 2 == n && e)
                    for (var g in l) Gr.isSessionBasedCampaign2(l[g]) && (yield kr(this.phoenix, dr._ACTIVATED, {
                        id: g
                    }));
                window.VWO.push(["setVariation"])
            }))
        }
        addPhoenix(e) {
            this.event = function(t, i) {
                (i = i || {}).isCustomEvent = !0, i.page = Tr.page, kr(e, t, i, (() => {
                    window.VWO.modules.eventHistHandler.updateEventHist(t, i)
                }))
            }, this.phoenix = e
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
        visitor(e) {
            if (e) {
                for (const t in e) Object.prototype.hasOwnProperty.call(e, t) && this.phoenix.store.actions.set(t, e[t], "");
                kr(this.phoenix, dr.SYNC_VISITOR_PROP, {
                    $visitor: {
                        props: e
                    },
                    isCustomEvent: !0
                }, (() => {
                    oa.updateVisAttr(e)
                }))
            }
        }
        syncAttributes() {
            oa.syncVisData()
        }
        syncEvents() {
            window.VWO.modules.eventHistHandler.syncEventsData()
        }
    }
    class la {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.backwardCompatibilityUtils." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    class ca {}

    function da(e) {
        const t = [];
        return e.forEach((e => {
            var i;
            null === (i = e.filters) || void 0 === i || i.forEach(((i, n) => {
                const r = i[0].substring(0, i[0].indexOf("."));
                if ("event" === r || "page" === r) {
                    const r = JSON.parse(JSON.stringify(i));
                    t.push({
                        condition: r,
                        triggerName: e.triggerName,
                        condId: e.id,
                        filterId: n
                    })
                }
            }))
        })), t
    }
    let ua, ga = {
        promise: new Promise((function(e) {
            ua = e
        })),
        resolve: ua
    };
    class va extends ca {
        constructor(e) {
            super(), this.eventName = $r.CLICK_EVENT, this.attachedFilters = da(e)
        }
        initializeMT() {
            return [this.attachedFilters]
        }
        eventConditionsUpdate(e) {
            e && (this.attachedFilters = [...this.attachedFilters, ...da(e)], this.otherSide("eventConditionsUpdate", [this.attachedFilters]))
        }
        isGoalEligible(e, t, i) {
            return ns.isGoalEligible(e, window.VWO.phoenix.store.getters, window.VWO.phoenix)
        }
        registerConversion(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                yield ns.registerConversion(window.VWO.phoenix.store.getters, t, n)
            }))
        }
        on(e) {
            ga.promise.then((t => {
                this.otherSide("on", [e, {
                    serverUrl: t.serverUrl,
                    vwoUUID: t.vwoUUID
                }])
            }))
        }
        off() {}
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    const pa = Rn.primary({
        src: "VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent",
        dest: "VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent"
    }, va, !0, (e => e.initializeMT()));
    let ha;
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent = pa;
    let wa = {
        promise: new Promise((e => {
            ha = e
        })),
        resolve: ha
    };
    class fa extends ca {
        constructor(e) {
            super(), this.eventName = dr.DOM_SUBMIT, this.attachedFilters = da(e)
        }
        initializeMT() {
            return [this.attachedFilters]
        }
        eventConditionsUpdate(e) {
            e && (this.attachedFilters = [...this.attachedFilters, ...da(e)], this.otherSide("eventConditionsUpdate", [this.attachedFilters]))
        }
        isGoalEligible(e, t, i) {
            return ns.isGoalEligible(e, window.VWO.phoenix.store.getters, window.VWO.phoenix)
        }
        registerConversion(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                yield ns.registerConversion(window.VWO.phoenix.store.getters, t, n)
            }))
        }
        on(e) {
            wa.promise.then((t => {
                this.otherSide("on", [e, {
                    vwoUUID: t.vwoUUID
                }])
            }))
        }
        off() {}
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    const ma = Rn.primary({
        src: "VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent",
        dest: "VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent"
    }, fa, !0, (e => e.initializeMT()));
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent = ma;
    const Ea = function() {};
    class _a extends la {
        sendRegisterCall(e, t, n, r, o) {
            return i(this, void 0, void 0, (function*() {
                if (r = r || Ea, o.visDebug || pr()) return r(), !0;
                var i, s, a = yield Gr.createUUIDCookie2(o, n), l = yield Gr.extraData2(), c = "";
                (yield o.vwoInternalProperties.sessionInfoService.shouldSendSessionInfoInCall()) && (c = "&sId=" + (yield o.vwoInternalProperties.sessionInfoService.getSessionId()), yield o.vwoInternalProperties.sessionInfoService.setSNCookieValueByIndex2(ar.SESSION_SYNCED_STATE_INDEX, 1)), l = n.ps || void 0 === n.ps ? "&ed=" + encodeURIComponent(l) : "", i = "&s=" + (n.version >= 4 ? Ki.data.vi && "new" === Ki.data.vi.vt ? 1 : 2 : parseInt(((yield o.storages.storages.cookies.get("_vis_opt_s")) || "").split("|")[0], 10)), s = e + "?experiment_id=" + n.id + "&account_id=" + o.accountId + "&cu=" + encodeURIComponent(o.currentUrl) + "&combination=" + t + i + c + Gr.getUUIDString(a) + l, Gr.isSessionBasedCampaign2(n) || "SURVEY" === n.type || (yield this.otherSide('sendRegisterCall("${{1}}", "${{2}}", "${{3}}")', null, [o, s, r]))
            }))
        }
        setGoalPageFlag(e, t) {
            for (var i = To(e.goals), n = 0; n < i.length; n++) {
                var r = e.goals[i[n]];
                if (("SEPARATE_PAGE" === r.type || "REVENUE_TRACKING" === r.type || "CUSTOM_GOAL" === r.type) && ns.isGoalEligible(r, t, null)) {
                    e[Qn] = !0;
                    break
                }
            }
        }
        goalVisit(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                if (Gr.isSessionBasedCampaign2(e))
                    for (var i, r, o = To(e.goals), s = o.length; s--;) i = o[s], isNaN(parseInt(i, 10)) ? n.trigger(dr.CONVERT_VISIT_GOAL_FOR_EXPERIMENT, {
                        oldArgs: [e.id, void 0, ro.getCleanedUrl(t.currentUrl)]
                    }) : "SEPARATE_PAGE" === (r = e.goals[i]).type && ns.isGoalEligible(r, t, null) && (n.trigger(dr.CONVERT_VISIT_GOAL_FOR_EXPERIMENT, {
                        oldArgs: [e.id, i, ro.getCleanedUrl(t.currentUrl)]
                    }), yield ns.registerConversion(t, i, e))
            }))
        }
        goalVisitExceptSplit(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                if ((yield ao.isBucketed(n, e)) || e.combination_chosen) {
                    if (t || this.setGoalPageFlag(e, n), "SPLIT_URL" === e.type && t) return;
                    (t || e.gp) && (r.trigger(dr.CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT, {
                        oldArgs: [e.id, void 0, !1]
                    }), (yield ao.isBucketed(n, e)) && (yield this.goalVisit(e, n, r)))
                }
            }))
        }
        checkGoalVisit(e, t, n, r) {
            return i(this, void 0, void 0, (function*() {
                "SPLIT_URL" === e.type ? yield this.goalVisit(e, n, r): yield this.goalVisitExceptSplit(e, t, n, r)
            }))
        }
        markRevenueGoal(e, t, n) {
            return i(this, void 0, void 0, (function*() {
                if (void 0 !== (yield window.fetcher.getValue("_vis_opt_revenue"))) {
                    n.trigger(dr.CONVERT_REVENUE_GOALS_FOR_EXPERIMENT, {
                        oldArgs: [e.id, window._vis_opt_revenue]
                    });
                    const i = To(e.goals);
                    let r, o = i.length;
                    for (; o--;) r = i[o], "REVENUE_TRACKING" === e.goals[r].type && ns.isGoalEligible(e.goals[r], t, n) && (yield ns.registerConversion(t, r, e, window._vis_opt_revenue))
                }
            }))
        }
        goalVisitPoll({
            vwoEvents: e,
            getters: t
        }) {
            const n = this;
            Gr.addListener(t, e, {
                eventName: "goalVisit"
            }, (function(r) {
                return i(this, void 0, void 0, (function*() {
                    const {
                        isUrlMatching: i,
                        id: o
                    } = r;
                    yield n.checkGoalVisit(t.settings.campaigns[o], i, t, e)
                }))
            }))
        }
        pollForNewVisitor({
            vwoEvents: e,
            getters: t
        }) {
            const n = this;
            Gr.addListener(t, e, {
                eventName: dr.SEND_NEW_VISITOR_CALL
            }, (function(e) {
                return i(this, void 0, void 0, (function*() {
                    const {
                        combination: i,
                        campaignData: r,
                        callbackFn: o
                    } = e;
                    yield n.sendRegisterCall("l.gif", i, r, o, t)
                }))
            }))
        }
        goalRevenuePoll({
            vwoEvents: e,
            getters: t
        }) {
            const n = this;
            Gr.addListener(t, e, {
                eventName: dr.END_APPLY_CHANGES
            }, (function(r) {
                return i(this, void 0, void 0, (function*() {
                    yield n.markRevenueGoal(r.campaign, t, e)
                }))
            }))
        }
        customGoalConversion(e, t) {
            return i(this, void 0, void 0, (function*() {
                const i = Ki.phoenix.store.getters;
                if (isNaN(parseInt(e, 10))) return;
                Ki.phoenix.trigger(dr.CONVERT_GOAL_FOR_ALL_EXPERIMENTS, {
                    oldArgs: [e]
                });
                var n, r = To(i.settings.campaigns);
                let o = r.length;
                for (; o--;) n = r[o], "object" == typeof i.settings.campaigns[n].goals[e] && "TRACK" === i.settings.campaigns[n].type === t && ns.isGoalEligible(i.settings.campaigns[n].goals[e], Ki.phoenix.store.getters, Ki.phoenix) && (yield ns.registerConversion(Ki.phoenix.store.getters, e, i.settings.campaigns[n]))
            }))
        }
        customRevenueConversion(e, t) {
            return i(this, void 0, void 0, (function*() {
                const i = Ki.phoenix.store.getters;
                if (isNaN(parseFloat(e))) return;
                var n, r, o;
                Ki.phoenix.trigger(dr.CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT, {
                    oldArgs: [e]
                });
                var s, a = To(i.settings.campaigns);
                let l = a.length;
                for (; l--;)
                    if (s = a[l], "TRACK" === i.settings.campaigns[s].type === t)
                        for (o = (r = To(i.settings.campaigns[s].goals)).length; o--;) n = r[o], "REVENUE_TRACKING" === i.settings.campaigns[s].goals[n].type && ns.isGoalEligible(i.settings.campaigns[s].goals[n], window.VWO.phoenix.store.getters, window.VWO.phoenix) && (yield ns.registerConversion(window.VWO.phoenix.store.getters, n, i.settings.campaigns[s], e))
            }))
        }
        delayedGoalConversion(e) {
            return i(this, void 0, void 0, (function*() {
                let t;
                const i = Ki.phoenix,
                    n = i.store.getters,
                    r = n.settings.campaigns[e.campaignId];
                e = e || {};
                const o = window.tracklib;
                "TRACK" === e.type ? t = o.isGoalIncluded(e.goalId) : "FUNNEL" === e.type ? t = o.isFunnelIncluded(e.campaignId) : Gr.isAnalyzeCampaign(e.type) && (t = o.isAnalyzeCampaignIncluded(e.campaignId)), ns._triggerGoalConversion(i, n, e.goalId, r, e.revenue, !1, {
                    combination: t
                })
            }))
        }
        makeSessionAndTagCall(e, t) {
            const n = this;
            Gr.addListener(e, t, {
                eventName: dr.NEW_SESSION_CREATED
            }, (function(e) {
                return i(this, void 0, void 0, (function*() {
                    const {
                        props: t
                    } = e;
                    t.cq = 0, window._vis_debug || pr() || (yield n.otherSide('makeCallForTagsAndSession("${{1}}", "${{2}}")', null, [t, "newSession"]))
                }))
            })), Gr.addListener(e, t, {
                eventName: dr.DIMENSION_TAG_PUSHED
            }, (function(e) {
                return i(this, void 0, void 0, (function*() {
                    const {
                        props: t
                    } = e;
                    yield n.otherSide('makeCallForTagsAndSession("${{1}}", "${{2}}")', null, [t, "sessionUpdate"])
                }))
            }))
        }
        initialise({
            event: e,
            actions: t,
            vwoEvents: n,
            data: r,
            getters: o
        }) {
            return i(this, void 0, void 0, (function*() {
                for (const e in o.settings.campaigns) Object.prototype.hasOwnProperty.call(o.settings.campaigns, e) && ns.serializeData(o.settings.campaigns[e]);
                this.goalVisitPoll({
                    event: e,
                    actions: t,
                    vwoEvents: n,
                    data: r,
                    getters: o
                }), this.attachEventListeners(o), this.pollForNewVisitor({
                    event: e,
                    actions: t,
                    vwoEvents: n,
                    data: r,
                    getters: o
                }), this.goalRevenuePoll({
                    event: e,
                    actions: t,
                    vwoEvents: n,
                    data: r,
                    getters: o
                }), yield this.declareVWOAPI(), this.makeSessionAndTagCall(o, n)
            }))
        }
        attachEventListeners(e) {
            ga.resolve(e), wa.resolve(e)
        }
        declareVWOAPI() {
            return i(this, void 0, void 0, (function*() {
                yield this.otherSide("declareVWOAPI()", null, [])
            }))
        }
    }
    window.VWO.modules.tags.activate = function({
        campaignId: e
    }) {
        return i(this, void 0, void 0, (function*() {
            let t = Ki.phoenix.store.getters.settings.campaigns[e];
            yield qo({
                event: null,
                data: t,
                actions: null,
                getters: null,
                vwoEvents: Ki.phoenix
            })
        }))
    };
    const ya = new _a;
    window.VWO.modules.tags.backwardCompatibilityUtils = ya;
    class Oa {}

    function Sa(...e) {
        return e[0] = "VWO.modules.tags." + e[0], e[2] && (e[2] = {
            captureGroups: e[2]
        }), window.fetcher.getValue(...e)
    }
    class Ta extends Oa {
        execute({
            event: e,
            actions: t,
            vwoEvents: n,
            data: r,
            getters: o
        }) {
            return i(this, void 0, void 0, (function*() {
                Gr.addListener(o, n, {
                    eventName: "*"
                }, (function(e, t) {
                    Sa('wildCardCallback("${{1}}", "${{2}}")', null, [e, t])
                }));
                const i = ya.initialise({
                        event: e,
                        actions: t,
                        vwoEvents: n,
                        data: r,
                        getters: o
                    }),
                    s = window.fetcher.getValue('VWO.modules.tags.backwardCompatibility("${{1}}")', null, {
                        captureGroups: [o]
                    });
                yield Promise.all([i, s])
            }))
        }
    }
    const Ia = new Ta,
        Ca = Ia.execute;
    window.VWO.modules.tags.backwardCompatibility = Ca;
    class ba extends ca {
        constructor(e, t, i) {
            super();
            const n = `${Fr.DOM}_`;
            this.eventName = e, this.domEventsDebounceTime = i, this.domEventName = e.includes(n) ? e.substr(n.length) : e, this.attachedFilters = da(t)
        }
        initializeMT() {
            return [this.eventName, this.domEventName, this.domEventsDebounceTime, this.attachedFilters]
        }
        eventConditionsUpdate(e) {
            e && (this.attachedFilters = [...this.attachedFilters, ...da(e)], this.otherSide("eventConditionsUpdate", [this.attachedFilters]))
        }
        on(e) {
            this.otherSide("on", [e])
        }
        off() {
            this.otherSide("off", [null])
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    const Na = Rn.primary({
        src: "VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent",
        dest: "VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent"
    }, ba, !0, (e => e.initializeMT()));
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent = Na;
    class Aa extends ca {
        constructor({
            occurrence: e = 1e3
        } = {}) {
            super(), this.eventName = jr.TIMER, this.occurrence = e, this.start = Date.now()
        }
        eventConditionsUpdate() {
            this.start = Date.now()
        }
        on(e) {
            this.interval = window.setInterval((() => {
                const t = {
                    time: Date.now(),
                    timeSpent: Math.floor((Date.now() - this.start) / 1e3)
                };
                e(t)
            }), this.occurrence)
        }
        off() {
            window.clearInterval(this.interval)
        }
    }
    class Ra extends ca {
        constructor(e) {
            super(), this.eventName = $r.URL_CHANGE, this.events = e || ["pushState", "replaceState", "hashchange", "popstate"]
        }
        on(e) {
            this.otherSide("on", [e])
        }
        off() {
            this.otherSide("off", [null])
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    const Va = Rn.primary({
        src: "VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent",
        dest: "VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent"
    }, Ra);
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent = Va;
    class xa extends ca {
        constructor() {
            super(...arguments), this.eventName = $r.LEAVE_INTENT
        }
        on(e) {
            this.otherSide("on", [e])
        }
        off() {
            this.otherSide("off", [null])
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    const Pa = Rn.primary({
        src: "VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent",
        dest: "VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent"
    }, xa);
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent = Pa;
    var Da = Object.freeze({
        __proto__: null,
        GenericDomEvent: Na,
        TimeEvent: Aa,
        UrlChangeEvent: Va,
        LeaveIntentEvent: Pa,
        ClickDomEvent: pa,
        SubmitDomEvent: ma
    });
    const La = e => !!e,
        ka = function(e, t, i) {
            if (e && t) {
                const n = e.countryCode,
                    r = e.city,
                    o = e.region;
                return Ga.f_in_list(n, t, i) || Ga.f_in_list(`${n}-${o}`, t, i) || Ga.f_in_list(`${n}-${o}-${r}`, t, i)
            }
        },
        Ua = function(e, t, i) {
            if (e && t) {
                const n = e.countryCode,
                    r = e.city,
                    o = e.region;
                return Ga.f_nin_list(n, t, i) && Ga.f_nin_list(`${n}-${o}`, t, i) && Ga.f_nin_list(`${n}-${o}-${r}`, t, i)
            }
        },
        Ma = (e, t, i) => {
            if (!La(e)) return !1;
            "string" == typeof e && (e = e.toLowerCase());
            const n = i.syncGet("fns.list", [e, t]);
            return !!n.dataPresent && n.val
        },
        Wa = (e, t, i) => {
            if ("" === e) return !0;
            if (!La(e)) return !1;
            "string" == typeof e && (e = e.toLowerCase());
            const n = i.syncGet("fns.list", [e, t]);
            return !!n.dataPresent && !n.val
        },
        Ga = {
            f_in_list: Ma,
            f_nin_list: Wa,
            f_in_loc: ka,
            f_nin_loc: Ua
        };
    class Fa {
        constructor(e) {
            window.VWO._.contentSyncService = new Kn({
                strategy: ["ls"]
            }, e, window.VWO.data.content)
        }
    }

    function ja() {
        var e, t;
        const i = null === (t = null === (e = Ki.phoenix.store.getters.settings.plugins) || void 0 === e ? void 0 : e.DACDNCONFIG) || void 0 === t ? void 0 : t.DT;
        if (i) {
            const e = {
                    mobile: ["mobile"],
                    desktop: ["desktop"],
                    both: ["desktop", "mobile"]
                },
                t = Ki.phoenix.store.getters.deviceType + "";
            e[i.DEVICE].includes(t) && Ki.phoenix.store.actions.addValues({
                dtcTimer: i.DELAYAFTERTRIGGER
            }, "vwoInternalProperties")
        }
    }
    class $a {
        constructor() {
            this.queue = {}
        }
        add(e, t) {
            this.queue[e] = this.queue[e] || [], this.queue[e].push(t), this.otherSide("addListener", [e])
        }
        processQueue(e, t) {
            this.queue[e] && this.queue[e].length && this.queue[e].forEach((e => {
                e(t)
            }))
        }
        otherSide(...e) {
            e[0] = "VWO.modules.utils.storageSyncer." + e[0], window.fetcher.getValue(...e)
        }
    }
    const Ha = new $a;
    window.VWO.modules.utils.storageSyncer = Ha, window.functionWrapper = new R, window.fetcher.init();
    const Ba = new _,
        Ja = window.VWO;
    window.phoenixInstantiate = () => {
        var e;
        try {
            window = Object.assign(window, window.fakeWindow), delete window.fakeWindow, window.window = window, document = window.document, window.VWO.modules = Ja.modules, Object.assign(window.VWO._, Ja._);
            const t = new aa(window.VWO);
            Yi(t), zi(t), window.VWO._.isWorkerThread = !0;
            const i = window.VWOSettings;
            i[1] = Object.assign(i[1], js.getPhoenixConfig()), i[1].storages.cookies = Bn;
            const n = new _;
            window._vwo_exp = window.VWO._.allSettings.dataStore.campaigns, window._vwo_exp = n.register(g.Object, "_vwo_exp", window._vwo_exp), window.VWO._.allSettings.dataStore.campaigns = window._vwo_exp, n.register(g.Document, "cookie"), window._vwo_surveySettings = n.register(g.Object, "_vwo_surveySettings", window._vwo_surveySettings), window.tracklib = n.register(g.Object, "", {}, "", !1), n.register("custom", "localStorage"), i[0] = window.VWO._.allSettings, t.definePlugin("props", Tr), i[2] = t.pluginStorage, window.VWO.modules.eventHistHandler = ta, window.VWO.modules.eventHistHandler.initialize(), window.phoenix = new Gi(i, {
                preDefinedEvents: Da
            });
            new Fa(window.phoenix.store.getters.serverUrl);
            window.phoenix.store.actions.addValues({
                currentSettings: window.phoenix.settings.currentSettings
            }, "root"), window.VWO.addPhoenix(window.phoenix), oa.initialize(), window.VWO.modules.eventHistHandler.addEventHistListeners(), ji(window.phoenix.store.getters, window.VWO), Ca({
                event: void 0,
                data: void 0,
                getters: window.phoenix.store.getters,
                actions: window.phoenix.store.actions,
                vwoEvents: window.phoenix
            }), t.phoenix.operators.add("inlist", (function(e, t) {
                return !!Ga.f_in_list(e, t, window.VWO._.contentSyncService)
            })), t.phoenix.operators.add("ninlist", (function(e, t) {
                return !!Ga.f_nin_list(e, t, window.VWO._.contentSyncService)
            })), t.phoenix.operators.add("inloclist", (function(e, t) {
                return !!Ga.f_in_loc(e, t, window.VWO._.contentSyncService)
            })), t.phoenix.operators.add("ninloclist", (function(e, t) {
                return !Ga.f_nin_loc(e, t, window.VWO._.contentSyncService)
            })), ja(), Gr.loadNonTestingLibraries(window.phoenix.store.getters, window.phoenix.store.getters.settings.campaigns), window.VWO.phoenix.store.getters.settings.campaigns = window._vwo_exp, i[1].storages.cookies.domain = window.VWO.phoenix.store.getters.cookieDomain;
            const r = window.phoenix.store.getters;
            0;
            const o = r.settings.plugins,
                s = {
                    vwoData: {
                        accountJSInfo: null === (e = r.settings.vwoData) || void 0 === e ? void 0 : e.accountJSInfo
                    }
                };
            return o && (s.plugins = {
                DACDNCONFIG: o.DACDNCONFIG
            }), queueMicrotask((() => {
                kr(t.phoenix, dr.POST_INIT, {}).then((() => {
                    Qs(t.phoenix)
                }))
            })), {
                cookieDomain: r.cookieDomain,
                accountId: r.accountId,
                flags: r.flags,
                vwoInternalProperties: {},
                settings: s
            }
        } catch (e) {
            console.error(e)
        }
    }
})();