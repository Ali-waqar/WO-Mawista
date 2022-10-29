/*!!
 * Matomo - free/libre analytics platform
 *
 * JavaScript tracking client
 *
 * @link https://piwik.org
 * @source https://github.com/matomo-org/matomo/blob/master/js/piwik.js
 * @license https://piwik.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 * @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt BSD-3-Clause
 */
;
if (typeof _paq !== "object") {
    _paq = []
}
if (typeof window.Matomo !== "object") {
    window.Matomo = window.Piwik = (function() {
        var r, b = {},
            z = {},
            J = document,
            g = navigator,
            ab = screen,
            W = window,
            h = W.performance || W.mozPerformance || W.msPerformance || W.webkitPerformance,
            t = W.encodeURIComponent,
            V = W.decodeURIComponent,
            k = unescape,
            L = [],
            H, u, al = [],
            y = 0,
            af = 0,
            X = 0,
            m = false;

        function p(at) {
            try {
                return V(at)
            } catch (au) {
                return unescape(at)
            }
        }

        function M(au) {
            var at = typeof au;
            return at !== "undefined"
        }

        function C(at) {
            return typeof at === "function"
        }

        function Z(at) {
            return typeof at === "object"
        }

        function x(at) {
            return typeof at === "string" || at instanceof String
        }

        function ak(at) {
            return typeof at === "number" || at instanceof Number
        }

        function ac(at) {
            return M(at) && (ak(at) || (x(at) && at.length))
        }

        function D(au) {
            if (!au) {
                return true
            }
            var at;
            for (at in au) {
                if (Object.prototype.hasOwnProperty.call(au, at)) {
                    return false
                }
            }
            return true
        }

        function ao(at) {
            var au = typeof console;
            if (au !== "undefined" && console && console.error) {
                console.error(at)
            }
        }

        function aj() {
            var ay, ax, aA, au, at;
            for (ay = 0; ay < arguments.length; ay += 1) {
                at = null;
                if (arguments[ay] && arguments[ay].slice) {
                    at = arguments[ay].slice()
                }
                au = arguments[ay];
                aA = au.shift();
                var az, av;
                var aw = x(aA) && aA.indexOf("::") > 0;
                if (aw) {
                    az = aA.split("::");
                    av = az[0];
                    aA = az[1];
                    if ("object" === typeof u[av] && "function" === typeof u[av][aA]) {
                        u[av][aA].apply(u[av], au)
                    } else {
                        if (at) {
                            al.push(at)
                        }
                    }
                } else {
                    for (ax = 0; ax < L.length; ax++) {
                        if (x(aA)) {
                            av = L[ax];
                            var aB = aA.indexOf(".") > 0;
                            if (aB) {
                                az = aA.split(".");
                                if (av && "object" === typeof av[az[0]]) {
                                    av = av[az[0]];
                                    aA = az[1]
                                } else {
                                    if (at) {
                                        al.push(at);
                                        break
                                    }
                                }
                            }
                            if (av[aA]) {
                                av[aA].apply(av, au)
                            } else {
                                var aC = "The method '" + aA + '\' was not found in "_paq" variable.  Please have a look at the Matomo tracker documentation: https://developer.matomo.org/api-reference/tracking-javascript';
                                ao(aC);
                                if (!aB) {
                                    throw new TypeError(aC)
                                }
                            }
                            if (aA === "addTracker") {
                                break
                            }
                            if (aA === "setTrackerUrl" || aA === "setSiteId") {
                                break
                            }
                        } else {
                            aA.apply(L[ax], au)
                        }
                    }
                }
            }
        }

        function ar(aw, av, au, at) {
            if (aw.addEventListener) {
                aw.addEventListener(av, au, at);
                return true
            }
            if (aw.attachEvent) {
                return aw.attachEvent("on" + av, au)
            }
            aw["on" + av] = au
        }

        function n(at) {
            if (J.readyState === "complete") {
                at()
            } else {
                if (W.addEventListener) {
                    W.addEventListener("load", at, false)
                } else {
                    if (W.attachEvent) {
                        W.attachEvent("onload", at)
                    }
                }
            }
        }

        function q(aw) {
            var at = false;
            if (J.attachEvent) {
                at = J.readyState === "complete"
            } else {
                at = J.readyState !== "loading"
            }
            if (at) {
                aw();
                return
            }
            var av;
            if (J.addEventListener) {
                ar(J, "DOMContentLoaded", function au() {
                    J.removeEventListener("DOMContentLoaded", au, false);
                    if (!at) {
                        at = true;
                        aw()
                    }
                })
            } else {
                if (J.attachEvent) {
                    J.attachEvent("onreadystatechange", function au() {
                        if (J.readyState === "complete") {
                            J.detachEvent("onreadystatechange", au);
                            if (!at) {
                                at = true;
                                aw()
                            }
                        }
                    });
                    if (J.documentElement.doScroll && W === W.top) {
                        (function au() {
                            if (!at) {
                                try {
                                    J.documentElement.doScroll("left")
                                } catch (ax) {
                                    setTimeout(au, 0);
                                    return
                                }
                                at = true;
                                aw()
                            }
                        }())
                    }
                }
            }
            ar(W, "load", function() {
                if (!at) {
                    at = true;
                    aw()
                }
            }, false)
        }

        function ag(au, az, aA) {
            if (!au) {
                return ""
            }
            var at = "",
                aw, av, ax, ay;
            for (aw in b) {
                if (Object.prototype.hasOwnProperty.call(b, aw)) {
                    ay = b[aw] && "function" === typeof b[aw][au];
                    if (ay) {
                        av = b[aw][au];
                        ax = av(az || {}, aA);
                        if (ax) {
                            at += ax
                        }
                    }
                }
            }
            return at
        }

        function am(au) {
            var at;
            m = true;
            ag("unload");
            at = new Date();
            var av = at.getTimeAlias();
            if ((r - av) > 3000) {
                r = av + 3000
            }
            if (r) {
                do {
                    at = new Date()
                } while (at.getTimeAlias() < r)
            }
        }

        function o(av, au) {
            var at = J.createElement("script");
            at.type = "text/javascript";
            at.src = av;
            if (at.readyState) {
                at.onreadystatechange = function() {
                    var aw = this.readyState;
                    if (aw === "loaded" || aw === "complete") {
                        at.onreadystatechange = null;
                        au()
                    }
                }
            } else {
                at.onload = au
            }
            J.getElementsByTagName("head")[0].appendChild(at)
        }

        function N() {
            var at = "";
            try {
                at = W.top.document.referrer
            } catch (av) {
                if (W.parent) {
                    try {
                        at = W.parent.document.referrer
                    } catch (au) {
                        at = ""
                    }
                }
            }
            if (at === "") {
                at = J.referrer
            }
            return at
        }

        function s(at) {
            var av = new RegExp("^([a-z]+):"),
                au = av.exec(at);
            return au ? au[1] : null
        }

        function d(at) {
            var av = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
                au = av.exec(at);
            return au ? au[1] : at
        }

        function G(at) {
            return (/^[0-9][0-9]*(\.[0-9]+)?$/).test(at)
        }

        function Q(av, aw) {
            var at = {},
                au;
            for (au in av) {
                if (av.hasOwnProperty(au) && aw(av[au])) {
                    at[au] = av[au]
                }
            }
            return at
        }

        function B(av) {
            var at = {},
                au;
            for (au in av) {
                if (av.hasOwnProperty(au)) {
                    if (G(av[au])) {
                        at[au] = Math.round(av[au])
                    } else {
                        throw new Error('Parameter "' + au + '" provided value "' + av[au] + '" is not valid. Please provide a numeric value.')
                    }
                }
            }
            return at
        }

        function l(au) {
            var av = "",
                at;
            for (at in au) {
                if (au.hasOwnProperty(at)) {
                    av += "&" + t(at) + "=" + t(au[at])
                }
            }
            return av
        }

        function an(au, at) {
            au = String(au);
            return au.lastIndexOf(at, 0) === 0
        }

        function U(au, at) {
            au = String(au);
            return au.indexOf(at, au.length - at.length) !== -1
        }

        function A(au, at) {
            au = String(au);
            return au.indexOf(at) !== -1
        }

        function f(au, at) {
            au = String(au);
            return au.substr(0, au.length - at)
        }

        function I(aw, av, ay) {
            aw = String(aw);
            if (!ay) {
                ay = ""
            }
            var at = aw.indexOf("#");
            var az = aw.length;
            if (at === -1) {
                at = az
            }
            var ax = aw.substr(0, at);
            var au = aw.substr(at, az - at);
            if (ax.indexOf("?") === -1) {
                ax += "?"
            } else {
                if (!U(ax, "?")) {
                    ax += "&"
                }
            }
            return ax + t(av) + "=" + t(ay) + au
        }

        function j(au, av) {
            au = String(au);
            if (au.indexOf("?" + av + "=") === -1 && au.indexOf("&" + av + "=") === -1) {
                return au
            }
            var aw = au.indexOf("?");
            if (aw === -1) {
                return au
            }
            var at = au.substr(aw + 1);
            var aA = au.substr(0, aw);
            if (at) {
                var aB = "";
                var aD = at.indexOf("#");
                if (aD !== -1) {
                    aB = at.substr(aD + 1);
                    at = at.substr(0, aD)
                }
                var ax;
                var az = at.split("&");
                var ay = az.length - 1;
                for (ay; ay >= 0; ay--) {
                    ax = az[ay].split("=")[0];
                    if (ax === av) {
                        az.splice(ay, 1)
                    }
                }
                var aC = az.join("&");
                if (aC) {
                    aA = aA + "?" + aC
                }
                if (aB) {
                    aA += "#" + aB
                }
            }
            return aA
        }

        function e(av, au) {
            var at = "[\\?&#]" + au + "=([^&#]*)";
            var ax = new RegExp(at);
            var aw = ax.exec(av);
            return aw ? p(aw[1]) : ""
        }

        function a(at) {
            if (at && String(at) === at) {
                return at.replace(/^\s+|\s+$/g, "")
            }
            return at
        }

        function F(at) {
            return unescape(t(at))
        }

        function aq(aI) {
            var av = function(aO, aN) {
                    return (aO << aN) | (aO >>> (32 - aN))
                },
                aJ = function(aQ) {
                    var aO = "",
                        aP, aN;
                    for (aP = 7; aP >= 0; aP--) {
                        aN = (aQ >>> (aP * 4)) & 15;
                        aO += aN.toString(16)
                    }
                    return aO
                },
                ay, aL, aK, au = [],
                aC = 1732584193,
                aA = 4023233417,
                az = 2562383102,
                ax = 271733878,
                aw = 3285377520,
                aH, aG, aF, aE, aD, aM, at, aB = [];
            aI = F(aI);
            at = aI.length;
            for (aL = 0; aL < at - 3; aL += 4) {
                aK = aI.charCodeAt(aL) << 24 | aI.charCodeAt(aL + 1) << 16 | aI.charCodeAt(aL + 2) << 8 | aI.charCodeAt(aL + 3);
                aB.push(aK)
            }
            switch (at & 3) {
                case 0:
                    aL = 2147483648;
                    break;
                case 1:
                    aL = aI.charCodeAt(at - 1) << 24 | 8388608;
                    break;
                case 2:
                    aL = aI.charCodeAt(at - 2) << 24 | aI.charCodeAt(at - 1) << 16 | 32768;
                    break;
                case 3:
                    aL = aI.charCodeAt(at - 3) << 24 | aI.charCodeAt(at - 2) << 16 | aI.charCodeAt(at - 1) << 8 | 128;
                    break
            }
            aB.push(aL);
            while ((aB.length & 15) !== 14) {
                aB.push(0)
            }
            aB.push(at >>> 29);
            aB.push((at << 3) & 4294967295);
            for (ay = 0; ay < aB.length; ay += 16) {
                for (aL = 0; aL < 16; aL++) {
                    au[aL] = aB[ay + aL]
                }
                for (aL = 16; aL <= 79; aL++) {
                    au[aL] = av(au[aL - 3] ^ au[aL - 8] ^ au[aL - 14] ^ au[aL - 16], 1)
                }
                aH = aC;
                aG = aA;
                aF = az;
                aE = ax;
                aD = aw;
                for (aL = 0; aL <= 19; aL++) {
                    aM = (av(aH, 5) + ((aG & aF) | (~aG & aE)) + aD + au[aL] + 1518500249) & 4294967295;
                    aD = aE;
                    aE = aF;
                    aF = av(aG, 30);
                    aG = aH;
                    aH = aM
                }
                for (aL = 20; aL <= 39; aL++) {
                    aM = (av(aH, 5) + (aG ^ aF ^ aE) + aD + au[aL] + 1859775393) & 4294967295;
                    aD = aE;
                    aE = aF;
                    aF = av(aG, 30);
                    aG = aH;
                    aH = aM
                }
                for (aL = 40; aL <= 59; aL++) {
                    aM = (av(aH, 5) + ((aG & aF) | (aG & aE) | (aF & aE)) + aD + au[aL] + 2400959708) & 4294967295;
                    aD = aE;
                    aE = aF;
                    aF = av(aG, 30);
                    aG = aH;
                    aH = aM
                }
                for (aL = 60; aL <= 79; aL++) {
                    aM = (av(aH, 5) + (aG ^ aF ^ aE) + aD + au[aL] + 3395469782) & 4294967295;
                    aD = aE;
                    aE = aF;
                    aF = av(aG, 30);
                    aG = aH;
                    aH = aM
                }
                aC = (aC + aH) & 4294967295;
                aA = (aA + aG) & 4294967295;
                az = (az + aF) & 4294967295;
                ax = (ax + aE) & 4294967295;
                aw = (aw + aD) & 4294967295
            }
            aM = aJ(aC) + aJ(aA) + aJ(az) + aJ(ax) + aJ(aw);
            return aM.toLowerCase()
        }

        function ae(av, at, au) {
            if (!av) {
                av = ""
            }
            if (!at) {
                at = ""
            }
            if (av === "translate.googleusercontent.com") {
                if (au === "") {
                    au = at
                }
                at = e(at, "u");
                av = d(at)
            } else {
                if (av === "cc.bingj.com" || av === "webcache.googleusercontent.com" || av.slice(0, 5) === "74.6.") {
                    at = J.links[0].href;
                    av = d(at)
                }
            }
            return [av, at, au]
        }

        function O(au) {
            var at = au.length;
            if (au.charAt(--at) === ".") {
                au = au.slice(0, at)
            }
            if (au.slice(0, 2) === "*.") {
                au = au.slice(1)
            }
            if (au.indexOf("/") !== -1) {
                au = au.substr(0, au.indexOf("/"))
            }
            return au
        }

        function ap(au) {
            au = au && au.text ? au.text : au;
            if (!x(au)) {
                var at = J.getElementsByTagName("title");
                if (at && M(at[0])) {
                    au = at[0].text
                }
            }
            return au
        }

        function S(at) {
            if (!at) {
                return []
            }
            if (!M(at.children) && M(at.childNodes)) {
                return at.children
            }
            if (M(at.children)) {
                return at.children
            }
            return []
        }

        function Y(au, at) {
            if (!au || !at) {
                return false
            }
            if (au.contains) {
                return au.contains(at)
            }
            if (au === at) {
                return true
            }
            if (au.compareDocumentPosition) {
                return !!(au.compareDocumentPosition(at) & 16)
            }
            return false
        }

        function P(av, aw) {
            if (av && av.indexOf) {
                return av.indexOf(aw)
            }
            if (!M(av) || av === null) {
                return -1
            }
            if (!av.length) {
                return -1
            }
            var at = av.length;
            if (at === 0) {
                return -1
            }
            var au = 0;
            while (au < at) {
                if (av[au] === aw) {
                    return au
                }
                au++
            }
            return -1
        }

        function i(av) {
            if (!av) {
                return false
            }

            function at(ax, ay) {
                if (W.getComputedStyle) {
                    return J.defaultView.getComputedStyle(ax, null)[ay]
                }
                if (ax.currentStyle) {
                    return ax.currentStyle[ay]
                }
            }

            function aw(ax) {
                ax = ax.parentNode;
                while (ax) {
                    if (ax === J) {
                        return true
                    }
                    ax = ax.parentNode
                }
                return false
            }

            function au(az, aF, ax, aC, aA, aD, aB) {
                var ay = az.parentNode,
                    aE = 1;
                if (!aw(az)) {
                    return false
                }
                if (9 === ay.nodeType) {
                    return true
                }
                if ("0" === at(az, "opacity") || "none" === at(az, "display") || "hidden" === at(az, "visibility")) {
                    return false
                }
                if (!M(aF) || !M(ax) || !M(aC) || !M(aA) || !M(aD) || !M(aB)) {
                    aF = az.offsetTop;
                    aA = az.offsetLeft;
                    aC = aF + az.offsetHeight;
                    ax = aA + az.offsetWidth;
                    aD = az.offsetWidth;
                    aB = az.offsetHeight
                }
                if (av === az && (0 === aB || 0 === aD) && "hidden" === at(az, "overflow")) {
                    return false
                }
                if (ay) {
                    if (("hidden" === at(ay, "overflow") || "scroll" === at(ay, "overflow"))) {
                        if (aA + aE > ay.offsetWidth + ay.scrollLeft || aA + aD - aE < ay.scrollLeft || aF + aE > ay.offsetHeight + ay.scrollTop || aF + aB - aE < ay.scrollTop) {
                            return false
                        }
                    }
                    if (az.offsetParent === ay) {
                        aA += ay.offsetLeft;
                        aF += ay.offsetTop
                    }
                    return au(ay, aF, ax, aC, aA, aD, aB)
                }
                return true
            }
            return au(av)
        }
        var ai = {
            htmlCollectionToArray: function(av) {
                var at = [],
                    au;
                if (!av || !av.length) {
                    return at
                }
                for (au = 0; au < av.length; au++) {
                    at.push(av[au])
                }
                return at
            },
            find: function(at) {
                if (!document.querySelectorAll || !at) {
                    return []
                }
                var au = document.querySelectorAll(at);
                return this.htmlCollectionToArray(au)
            },
            findMultiple: function(av) {
                if (!av || !av.length) {
                    return []
                }
                var au, aw;
                var at = [];
                for (au = 0; au < av.length; au++) {
                    aw = this.find(av[au]);
                    at = at.concat(aw)
                }
                at = this.makeNodesUnique(at);
                return at
            },
            findNodesByTagName: function(au, at) {
                if (!au || !at || !au.getElementsByTagName) {
                    return []
                }
                var av = au.getElementsByTagName(at);
                return this.htmlCollectionToArray(av)
            },
            makeNodesUnique: function(at) {
                var ay = [].concat(at);
                at.sort(function(aA, az) {
                    if (aA === az) {
                        return 0
                    }
                    var aC = P(ay, aA);
                    var aB = P(ay, az);
                    if (aC === aB) {
                        return 0
                    }
                    return aC > aB ? -1 : 1
                });
                if (at.length <= 1) {
                    return at
                }
                var au = 0;
                var aw = 0;
                var ax = [];
                var av;
                av = at[au++];
                while (av) {
                    if (av === at[au]) {
                        aw = ax.push(au)
                    }
                    av = at[au++] || null
                }
                while (aw--) {
                    at.splice(ax[aw], 1)
                }
                return at
            },
            getAttributeValueFromNode: function(ax, av) {
                if (!this.hasNodeAttribute(ax, av)) {
                    return
                }
                if (ax && ax.getAttribute) {
                    return ax.getAttribute(av)
                }
                if (!ax || !ax.attributes) {
                    return
                }
                var aw = (typeof ax.attributes[av]);
                if ("undefined" === aw) {
                    return
                }
                if (ax.attributes[av].value) {
                    return ax.attributes[av].value
                }
                if (ax.attributes[av].nodeValue) {
                    return ax.attributes[av].nodeValue
                }
                var au;
                var at = ax.attributes;
                if (!at) {
                    return
                }
                for (au = 0; au < at.length; au++) {
                    if (at[au].nodeName === av) {
                        return at[au].nodeValue
                    }
                }
                return null
            },
            hasNodeAttributeWithValue: function(au, at) {
                var av = this.getAttributeValueFromNode(au, at);
                return !!av
            },
            hasNodeAttribute: function(av, at) {
                if (av && av.hasAttribute) {
                    return av.hasAttribute(at)
                }
                if (av && av.attributes) {
                    var au = (typeof av.attributes[at]);
                    return "undefined" !== au
                }
                return false
            },
            hasNodeCssClass: function(av, at) {
                if (av && at && av.className) {
                    var au = typeof av.className === "string" ? av.className.split(" ") : [];
                    if (-1 !== P(au, at)) {
                        return true
                    }
                }
                return false
            },
            findNodesHavingAttribute: function(ax, av, at) {
                if (!at) {
                    at = []
                }
                if (!ax || !av) {
                    return at
                }
                var aw = S(ax);
                if (!aw || !aw.length) {
                    return at
                }
                var au, ay;
                for (au = 0; au < aw.length; au++) {
                    ay = aw[au];
                    if (this.hasNodeAttribute(ay, av)) {
                        at.push(ay)
                    }
                    at = this.findNodesHavingAttribute(ay, av, at)
                }
                return at
            },
            findFirstNodeHavingAttribute: function(av, au) {
                if (!av || !au) {
                    return
                }
                if (this.hasNodeAttribute(av, au)) {
                    return av
                }
                var at = this.findNodesHavingAttribute(av, au);
                if (at && at.length) {
                    return at[0]
                }
            },
            findFirstNodeHavingAttributeWithValue: function(aw, av) {
                if (!aw || !av) {
                    return
                }
                if (this.hasNodeAttributeWithValue(aw, av)) {
                    return aw
                }
                var at = this.findNodesHavingAttribute(aw, av);
                if (!at || !at.length) {
                    return
                }
                var au;
                for (au = 0; au < at.length; au++) {
                    if (this.getAttributeValueFromNode(at[au], av)) {
                        return at[au]
                    }
                }
            },
            findNodesHavingCssClass: function(ax, aw, at) {
                if (!at) {
                    at = []
                }
                if (!ax || !aw) {
                    return at
                }
                if (ax.getElementsByClassName) {
                    var ay = ax.getElementsByClassName(aw);
                    return this.htmlCollectionToArray(ay)
                }
                var av = S(ax);
                if (!av || !av.length) {
                    return []
                }
                var au, az;
                for (au = 0; au < av.length; au++) {
                    az = av[au];
                    if (this.hasNodeCssClass(az, aw)) {
                        at.push(az)
                    }
                    at = this.findNodesHavingCssClass(az, aw, at)
                }
                return at
            },
            findFirstNodeHavingClass: function(av, au) {
                if (!av || !au) {
                    return
                }
                if (this.hasNodeCssClass(av, au)) {
                    return av
                }
                var at = this.findNodesHavingCssClass(av, au);
                if (at && at.length) {
                    return at[0]
                }
            },
            isLinkElement: function(au) {
                if (!au) {
                    return false
                }
                var at = String(au.nodeName).toLowerCase();
                var aw = ["a", "area"];
                var av = P(aw, at);
                return av !== -1
            },
            setAnyAttribute: function(au, at, av) {
                if (!au || !at) {
                    return
                }
                if (au.setAttribute) {
                    au.setAttribute(at, av)
                } else {
                    au[at] = av
                }
            }
        };
        var w = {
            CONTENT_ATTR: "data-track-content",
            CONTENT_CLASS: "matomoTrackContent",
            LEGACY_CONTENT_CLASS: "piwikTrackContent",
            CONTENT_NAME_ATTR: "data-content-name",
            CONTENT_PIECE_ATTR: "data-content-piece",
            CONTENT_PIECE_CLASS: "matomoContentPiece",
            LEGACY_CONTENT_PIECE_CLASS: "piwikContentPiece",
            CONTENT_TARGET_ATTR: "data-content-target",
            CONTENT_TARGET_CLASS: "matomoContentTarget",
            LEGACY_CONTENT_TARGET_CLASS: "piwikContentTarget",
            CONTENT_IGNOREINTERACTION_ATTR: "data-content-ignoreinteraction",
            CONTENT_IGNOREINTERACTION_CLASS: "matomoContentIgnoreInteraction",
            LEGACY_CONTENT_IGNOREINTERACTION_CLASS: "piwikContentIgnoreInteraction",
            location: undefined,
            findContentNodes: function() {
                var au = "." + this.CONTENT_CLASS;
                var av = "." + this.LEGACY_CONTENT_CLASS;
                var at = "[" + this.CONTENT_ATTR + "]";
                var aw = ai.findMultiple([au, av, at]);
                return aw
            },
            findContentNodesWithinNode: function(aw) {
                if (!aw) {
                    return []
                }
                var au = ai.findNodesHavingCssClass(aw, this.CONTENT_CLASS);
                au = ai.findNodesHavingCssClass(aw, this.LEGACY_CONTENT_CLASS, au);
                var at = ai.findNodesHavingAttribute(aw, this.CONTENT_ATTR);
                if (at && at.length) {
                    var av;
                    for (av = 0; av < at.length; av++) {
                        au.push(at[av])
                    }
                }
                if (ai.hasNodeAttribute(aw, this.CONTENT_ATTR)) {
                    au.push(aw)
                } else {
                    if (ai.hasNodeCssClass(aw, this.CONTENT_CLASS)) {
                        au.push(aw)
                    } else {
                        if (ai.hasNodeCssClass(aw, this.LEGACY_CONTENT_CLASS)) {
                            au.push(aw)
                        }
                    }
                }
                au = ai.makeNodesUnique(au);
                return au
            },
            findParentContentNode: function(au) {
                if (!au) {
                    return
                }
                var av = au;
                var at = 0;
                while (av && av !== J && av.parentNode) {
                    if (ai.hasNodeAttribute(av, this.CONTENT_ATTR)) {
                        return av
                    }
                    if (ai.hasNodeCssClass(av, this.CONTENT_CLASS)) {
                        return av
                    }
                    if (ai.hasNodeCssClass(av, this.LEGACY_CONTENT_CLASS)) {
                        return av
                    }
                    av = av.parentNode;
                    if (at > 1000) {
                        break
                    }
                    at++
                }
            },
            findPieceNode: function(au) {
                var at;
                at = ai.findFirstNodeHavingAttribute(au, this.CONTENT_PIECE_ATTR);
                if (!at) {
                    at = ai.findFirstNodeHavingClass(au, this.CONTENT_PIECE_CLASS)
                }
                if (!at) {
                    at = ai.findFirstNodeHavingClass(au, this.LEGACY_CONTENT_PIECE_CLASS)
                }
                if (at) {
                    return at
                }
                return au
            },
            findTargetNodeNoDefault: function(at) {
                if (!at) {
                    return
                }
                var au = ai.findFirstNodeHavingAttributeWithValue(at, this.CONTENT_TARGET_ATTR);
                if (au) {
                    return au
                }
                au = ai.findFirstNodeHavingAttribute(at, this.CONTENT_TARGET_ATTR);
                if (au) {
                    return au
                }
                au = ai.findFirstNodeHavingClass(at, this.CONTENT_TARGET_CLASS);
                if (au) {
                    return au
                }
                au = ai.findFirstNodeHavingClass(at, this.LEGACY_CONTENT_TARGET_CLASS);
                if (au) {
                    return au
                }
            },
            findTargetNode: function(at) {
                var au = this.findTargetNodeNoDefault(at);
                if (au) {
                    return au
                }
                return at
            },
            findContentName: function(au) {
                if (!au) {
                    return
                }
                var ax = ai.findFirstNodeHavingAttributeWithValue(au, this.CONTENT_NAME_ATTR);
                if (ax) {
                    return ai.getAttributeValueFromNode(ax, this.CONTENT_NAME_ATTR)
                }
                var at = this.findContentPiece(au);
                if (at) {
                    return this.removeDomainIfIsInLink(at)
                }
                if (ai.hasNodeAttributeWithValue(au, "title")) {
                    return ai.getAttributeValueFromNode(au, "title")
                }
                var av = this.findPieceNode(au);
                if (ai.hasNodeAttributeWithValue(av, "title")) {
                    return ai.getAttributeValueFromNode(av, "title")
                }
                var aw = this.findTargetNode(au);
                if (ai.hasNodeAttributeWithValue(aw, "title")) {
                    return ai.getAttributeValueFromNode(aw, "title")
                }
            },
            findContentPiece: function(au) {
                if (!au) {
                    return
                }
                var aw = ai.findFirstNodeHavingAttributeWithValue(au, this.CONTENT_PIECE_ATTR);
                if (aw) {
                    return ai.getAttributeValueFromNode(aw, this.CONTENT_PIECE_ATTR)
                }
                var at = this.findPieceNode(au);
                var av = this.findMediaUrlInNode(at);
                if (av) {
                    return this.toAbsoluteUrl(av)
                }
            },
            findContentTarget: function(av) {
                if (!av) {
                    return
                }
                var aw = this.findTargetNode(av);
                if (ai.hasNodeAttributeWithValue(aw, this.CONTENT_TARGET_ATTR)) {
                    return ai.getAttributeValueFromNode(aw, this.CONTENT_TARGET_ATTR)
                }
                var au;
                if (ai.hasNodeAttributeWithValue(aw, "href")) {
                    au = ai.getAttributeValueFromNode(aw, "href");
                    return this.toAbsoluteUrl(au)
                }
                var at = this.findPieceNode(av);
                if (ai.hasNodeAttributeWithValue(at, "href")) {
                    au = ai.getAttributeValueFromNode(at, "href");
                    return this.toAbsoluteUrl(au)
                }
            },
            isSameDomain: function(at) {
                if (!at || !at.indexOf) {
                    return false
                }
                if (0 === at.indexOf(this.getLocation().origin)) {
                    return true
                }
                var au = at.indexOf(this.getLocation().host);
                if (8 >= au && 0 <= au) {
                    return true
                }
                return false
            },
            removeDomainIfIsInLink: function(av) {
                var au = "^https?://[^/]+";
                var at = "^.*//[^/]+";
                if (av && av.search && -1 !== av.search(new RegExp(au)) && this.isSameDomain(av)) {
                    av = av.replace(new RegExp(at), "");
                    if (!av) {
                        av = "/"
                    }
                }
                return av
            },
            findMediaUrlInNode: function(ax) {
                if (!ax) {
                    return
                }
                var av = ["img", "embed", "video", "audio"];
                var at = ax.nodeName.toLowerCase();
                if (-1 !== P(av, at) && ai.findFirstNodeHavingAttributeWithValue(ax, "src")) {
                    var aw = ai.findFirstNodeHavingAttributeWithValue(ax, "src");
                    return ai.getAttributeValueFromNode(aw, "src")
                }
                if (at === "object" && ai.hasNodeAttributeWithValue(ax, "data")) {
                    return ai.getAttributeValueFromNode(ax, "data")
                }
                if (at === "object") {
                    var ay = ai.findNodesByTagName(ax, "param");
                    if (ay && ay.length) {
                        var au;
                        for (au = 0; au < ay.length; au++) {
                            if ("movie" === ai.getAttributeValueFromNode(ay[au], "name") && ai.hasNodeAttributeWithValue(ay[au], "value")) {
                                return ai.getAttributeValueFromNode(ay[au], "value")
                            }
                        }
                    }
                    var az = ai.findNodesByTagName(ax, "embed");
                    if (az && az.length) {
                        return this.findMediaUrlInNode(az[0])
                    }
                }
            },
            trim: function(at) {
                return a(at)
            },
            isOrWasNodeInViewport: function(ay) {
                if (!ay || !ay.getBoundingClientRect || ay.nodeType !== 1) {
                    return true
                }
                var ax = ay.getBoundingClientRect();
                var aw = J.documentElement || {};
                var av = ax.top < 0;
                if (av && ay.offsetTop) {
                    av = (ay.offsetTop + ax.height) > 0
                }
                var au = aw.clientWidth;
                if (W.innerWidth && au > W.innerWidth) {
                    au = W.innerWidth
                }
                var at = aw.clientHeight;
                if (W.innerHeight && at > W.innerHeight) {
                    at = W.innerHeight
                }
                return ((ax.bottom > 0 || av) && ax.right > 0 && ax.left < au && ((ax.top < at) || av))
            },
            isNodeVisible: function(au) {
                var at = i(au);
                var av = this.isOrWasNodeInViewport(au);
                return at && av
            },
            buildInteractionRequestParams: function(at, au, av, aw) {
                var ax = "";
                if (at) {
                    ax += "c_i=" + t(at)
                }
                if (au) {
                    if (ax) {
                        ax += "&"
                    }
                    ax += "c_n=" + t(au)
                }
                if (av) {
                    if (ax) {
                        ax += "&"
                    }
                    ax += "c_p=" + t(av)
                }
                if (aw) {
                    if (ax) {
                        ax += "&"
                    }
                    ax += "c_t=" + t(aw)
                }
                if (ax) {
                    ax += "&ca=1"
                }
                return ax
            },
            buildImpressionRequestParams: function(at, au, av) {
                var aw = "c_n=" + t(at) + "&c_p=" + t(au);
                if (av) {
                    aw += "&c_t=" + t(av)
                }
                if (aw) {
                    aw += "&ca=1"
                }
                return aw
            },
            buildContentBlock: function(av) {
                if (!av) {
                    return
                }
                var at = this.findContentName(av);
                var au = this.findContentPiece(av);
                var aw = this.findContentTarget(av);
                at = this.trim(at);
                au = this.trim(au);
                aw = this.trim(aw);
                return {
                    name: at || "Unknown",
                    piece: au || "Unknown",
                    target: aw || ""
                }
            },
            collectContent: function(aw) {
                if (!aw || !aw.length) {
                    return []
                }
                var av = [];
                var at, au;
                for (at = 0; at < aw.length; at++) {
                    au = this.buildContentBlock(aw[at]);
                    if (M(au)) {
                        av.push(au)
                    }
                }
                return av
            },
            setLocation: function(at) {
                this.location = at
            },
            getLocation: function() {
                var at = this.location || W.location;
                if (!at.origin) {
                    at.origin = at.protocol + "//" + at.hostname + (at.port ? ":" + at.port : "")
                }
                return at
            },
            toAbsoluteUrl: function(au) {
                if ((!au || String(au) !== au) && au !== "") {
                    return au
                }
                if ("" === au) {
                    return this.getLocation().href
                }
                if (au.search(/^\/\//) !== -1) {
                    return this.getLocation().protocol + au
                }
                if (au.search(/:\/\//) !== -1) {
                    return au
                }
                if (0 === au.indexOf("#")) {
                    return this.getLocation().origin + this.getLocation().pathname + au
                }
                if (0 === au.indexOf("?")) {
                    return this.getLocation().origin + this.getLocation().pathname + au
                }
                if (0 === au.search("^[a-zA-Z]{2,11}:")) {
                    return au
                }
                if (au.search(/^\//) !== -1) {
                    return this.getLocation().origin + au
                }
                var at = "(.*/)";
                var av = this.getLocation().origin + this.getLocation().pathname.match(new RegExp(at))[0];
                return av + au
            },
            isUrlToCurrentDomain: function(au) {
                var av = this.toAbsoluteUrl(au);
                if (!av) {
                    return false
                }
                var at = this.getLocation().origin;
                if (at === av) {
                    return true
                }
                if (0 === String(av).indexOf(at)) {
                    if (":" === String(av).substr(at.length, 1)) {
                        return false
                    }
                    return true
                }
                return false
            },
            setHrefAttribute: function(au, at) {
                if (!au || !at) {
                    return
                }
                ai.setAnyAttribute(au, "href", at)
            },
            shouldIgnoreInteraction: function(at) {
                if (ai.hasNodeAttribute(at, this.CONTENT_IGNOREINTERACTION_ATTR)) {
                    return true
                }
                if (ai.hasNodeCssClass(at, this.CONTENT_IGNOREINTERACTION_CLASS)) {
                    return true
                }
                if (ai.hasNodeCssClass(at, this.LEGACY_CONTENT_IGNOREINTERACTION_CLASS)) {
                    return true
                }
                return false
            }
        };

        function aa(au, ax) {
            if (ax) {
                return ax
            }
            au = w.toAbsoluteUrl(au);
            if (A(au, "?")) {
                var aw = au.indexOf("?");
                au = au.slice(0, aw)
            }
            if (U(au, "matomo.php")) {
                au = f(au, "matomo.php".length)
            } else {
                if (U(au, "piwik.php")) {
                    au = f(au, "piwik.php".length)
                } else {
                    if (U(au, ".php")) {
                        var at = au.lastIndexOf("/");
                        var av = 1;
                        au = au.slice(0, at + av)
                    }
                }
            }
            if (U(au, "/js/")) {
                au = f(au, "js/".length)
            }
            return au
        }

        function R(az) {
            var aB = "Matomo_Overlay";
            var au = new RegExp("index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)(&segment=[^&]*)?");
            var av = au.exec(J.referrer);
            if (av) {
                var ax = av[1];
                if (ax !== String(az)) {
                    return false
                }
                var ay = av[2],
                    at = av[3],
                    aw = av[4];
                if (!aw) {
                    aw = ""
                } else {
                    if (aw.indexOf("&segment=") === 0) {
                        aw = aw.substr("&segment=".length)
                    }
                }
                W.name = aB + "###" + ay + "###" + at + "###" + aw
            }
            var aA = W.name.split("###");
            return aA.length === 4 && aA[0] === aB
        }

        function ad(au, az, av) {
            var ay = W.name.split("###"),
                ax = ay[1],
                at = ay[2],
                aw = ay[3],
                aA = aa(au, az);
            o(aA + "plugins/Overlay/client/client.js?v=1", function() {
                Matomo_Overlay_Client.initialize(aA, av, ax, at, aw)
            })
        }

        function v() {
            var av;
            try {
                av = W.frameElement
            } catch (au) {
                return true
            }
            if (M(av)) {
                return (av && String(av.nodeName).toLowerCase() === "iframe") ? true : false
            }
            try {
                return W.self !== W.top
            } catch (at) {
                return true
            }
        }

        function T(co, ci) {
            var bR = this,
                bk = "mtm_consent",
                cT = "mtm_cookie_consent",
                c2 = "mtm_consent_removed",
                cd = ae(J.domain, W.location.href, N()),
                da = O(cd[0]),
                bW = p(cd[1]),
                bw = p(cd[2]),
                c8 = false,
                cs = "GET",
                dt = cs,
                aM = "application/x-www-form-urlencoded; charset=UTF-8",
                cL = aM,
                aI = co || "",
                bQ = "",
                dh = "",
                cy = "",
                cf = ci || "",
                bH = "",
                bX = "",
                bb, bq = "",
                dp = ["7z", "aac", "apk", "arc", "arj", "asf", "asx", "avi", "azw3", "bin", "csv", "deb", "dmg", "doc", "docx", "epub", "exe", "flv", "gif", "gz", "gzip", "hqx", "ibooks", "jar", "jpg", "jpeg", "js", "mobi", "mp2", "mp3", "mp4", "mpg", "mpeg", "mov", "movie", "msi", "msp", "odb", "odf", "odg", "ods", "odt", "ogg", "ogv", "pdf", "phps", "png", "ppt", "pptx", "qt", "qtm", "ra", "ram", "rar", "rpm", "rtf", "sea", "sit", "tar", "tbz", "tbz2", "bz", "bz2", "tgz", "torrent", "txt", "wav", "wma", "wmv", "wpd", "xls", "xlsx", "xml", "z", "zip"],
                aC = [da],
                bI = [],
                cM = [".paypal.com"],
                ct = [],
                bU = [],
                bf = [],
                bS = 500,
                dd = true,
                cZ, bc, b0, bY, at, cC = ["pk_campaign", "mtm_campaign", "piwik_campaign", "matomo_campaign", "utm_campaign", "utm_source", "utm_medium"],
                bP = ["pk_kwd", "mtm_kwd", "piwik_kwd", "matomo_kwd", "utm_term"],
                br = "_pk_",
                az = "pk_vid",
                a6 = 180,
                df, by, b1 = false,
                aN = "Lax",
                bt = false,
                c6, bl, bE, c0 = 33955200000,
                cz = 1800000,
                dn = 15768000000,
                a9 = true,
                bN = false,
                bo = false,
                bZ = false,
                aV = false,
                cl, b5 = {},
                cx = {},
                bv = {},
                bC = 200,
                cH = {},
                di = {},
                dq = {},
                aZ = {},
                cj = [],
                bu = false,
                ck = [],
                cp = false,
                cR = false,
                au = false,
                dr = false,
                c3 = false,
                aS = false,
                bj = v(),
                cN = null,
                dg = null,
                aW, bK, cg = aq,
                bx, aQ, bJ = false,
                cE = 0,
                bD = ["id", "ses", "cvar", "ref"],
                cQ = false,
                bL = null,
                c1 = [],
                cG = [],
                aB = X++,
                aA = false,
                de = true;
            try {
                bq = J.title
            } catch (cO) {
                bq = ""
            }

            function aH(dE) {
                if (bt && dE !== c2) {
                    return 0
                }
                var dC = new RegExp("(^|;)[ ]*" + dE + "=([^;]*)"),
                    dD = dC.exec(J.cookie);
                return dD ? V(dD[2]) : 0
            }
            bL = !aH(c2);

            function dx(dG, dH, dK, dJ, dE, dF, dI) {
                if (bt && dG !== c2) {
                    return
                }
                var dD;
                if (dK) {
                    dD = new Date();
                    dD.setTime(dD.getTime() + dK)
                }
                if (!dI) {
                    dI = "Lax"
                }
                J.cookie = dG + "=" + t(dH) + (dK ? ";expires=" + dD.toGMTString() : "") + ";path=" + (dJ || "/") + (dE ? ";domain=" + dE : "") + (dF ? ";secure" : "") + ";SameSite=" + dI;
                if ((!dK || dK >= 0) && aH(dG) !== String(dH)) {
                    var dC = "There was an error setting cookie `" + dG + "`. Please check domain and path.";
                    ao(dC)
                }
            }

            function cb(dC) {
                var dE, dD;
                dC = j(dC, az);
                dC = j(dC, "ignore_referrer");
                dC = j(dC, "ignore_referer");
                for (dD = 0; dD < ct.length; dD++) {
                    dC = j(dC, ct[dD])
                }
                if (bY) {
                    dE = new RegExp("#.*");
                    return dC.replace(dE, "")
                }
                return dC
            }

            function b4(dE, dC) {
                var dF = s(dC),
                    dD;
                if (dF) {
                    return dC
                }
                if (dC.slice(0, 1) === "/") {
                    return s(dE) + "://" + d(dE) + dC
                }
                dE = cb(dE);
                dD = dE.indexOf("?");
                if (dD >= 0) {
                    dE = dE.slice(0, dD)
                }
                dD = dE.lastIndexOf("/");
                if (dD !== dE.length - 1) {
                    dE = dE.slice(0, dD + 1)
                }
                return dE + dC
            }

            function cX(dE, dC) {
                var dD;
                dE = String(dE).toLowerCase();
                dC = String(dC).toLowerCase();
                if (dE === dC) {
                    return true
                }
                if (dC.slice(0, 1) === ".") {
                    if (dE === dC.slice(1)) {
                        return true
                    }
                    dD = dE.length - dC.length;
                    if ((dD > 0) && (dE.slice(dD) === dC)) {
                        return true
                    }
                }
                return false
            }

            function cw(dC) {
                var dD = document.createElement("a");
                if (dC.indexOf("//") !== 0 && dC.indexOf("http") !== 0) {
                    if (dC.indexOf("*") === 0) {
                        dC = dC.substr(1)
                    }
                    if (dC.indexOf(".") === 0) {
                        dC = dC.substr(1)
                    }
                    dC = "http://" + dC
                }
                dD.href = w.toAbsoluteUrl(dC);
                if (dD.pathname) {
                    return dD.pathname
                }
                return ""
            }

            function ba(dD, dC) {
                if (!an(dC, "/")) {
                    dC = "/" + dC
                }
                if (!an(dD, "/")) {
                    dD = "/" + dD
                }
                var dE = (dC === "/" || dC === "/*");
                if (dE) {
                    return true
                }
                if (dD === dC) {
                    return true
                }
                dC = String(dC).toLowerCase();
                dD = String(dD).toLowerCase();
                if (U(dC, "*")) {
                    dC = dC.slice(0, -1);
                    dE = (!dC || dC === "/");
                    if (dE) {
                        return true
                    }
                    if (dD === dC) {
                        return true
                    }
                    return dD.indexOf(dC) === 0
                }
                if (!U(dD, "/")) {
                    dD += "/"
                }
                if (!U(dC, "/")) {
                    dC += "/"
                }
                return dD.indexOf(dC) === 0
            }

            function aw(dG, dI) {
                var dD, dC, dE, dF, dH;
                for (dD = 0; dD < aC.length; dD++) {
                    dF = O(aC[dD]);
                    dH = cw(aC[dD]);
                    if (cX(dG, dF) && ba(dI, dH)) {
                        return true
                    }
                }
                return false
            }

            function a2(dF) {
                var dD, dC, dE;
                for (dD = 0; dD < aC.length; dD++) {
                    dC = O(aC[dD].toLowerCase());
                    if (dF === dC) {
                        return true
                    }
                    if (dC.slice(0, 1) === ".") {
                        if (dF === dC.slice(1)) {
                            return true
                        }
                        dE = dF.length - dC.length;
                        if ((dE > 0) && (dF.slice(dE) === dC)) {
                            return true
                        }
                    }
                }
                return false
            }

            function cD(dC) {
                var dD, dF, dH, dE, dG;
                if (!dC.length || !cM.length) {
                    return false
                }
                dF = d(dC);
                dH = cw(dC);
                if (dF.indexOf("www.") === 0) {
                    dF = dF.substr(4)
                }
                for (dD = 0; dD < cM.length; dD++) {
                    dE = O(cM[dD]);
                    dG = cw(cM[dD]);
                    if (dE.indexOf("www.") === 0) {
                        dE = dE.substr(4)
                    }
                    if (cX(dF, dE) && ba(dH, dG)) {
                        return true
                    }
                }
                return false
            }

            function cA(dC, dE) {
                dC = dC.replace("send_image=0", "send_image=1");
                var dD = new Image(1, 1);
                dD.onload = function() {
                    H = 0;
                    if (typeof dE === "function") {
                        dE({
                            request: dC,
                            trackerUrl: aI,
                            success: true
                        })
                    }
                };
                dD.onerror = function() {
                    if (typeof dE === "function") {
                        dE({
                            request: dC,
                            trackerUrl: aI,
                            success: false
                        })
                    }
                };
                dD.src = aI + (aI.indexOf("?") < 0 ? "?" : "&") + dC
            }

            function cU(dC) {
                if (dt === "POST") {
                    return true
                }
                return dC && (dC.length > 2000 || dC.indexOf('{"requests"') === 0)
            }

            function aP() {
                return "object" === typeof g && "function" === typeof g.sendBeacon && "function" === typeof Blob
            }

            function bd(dG, dJ, dI) {
                var dE = aP();
                if (!dE) {
                    return false
                }
                var dF = {
                    type: "application/x-www-form-urlencoded; charset=UTF-8"
                };
                var dK = false;
                var dD = aI;
                try {
                    var dC = new Blob([dG], dF);
                    if (dI && !cU(dG)) {
                        dC = new Blob([], dF);
                        dD = dD + (dD.indexOf("?") < 0 ? "?" : "&") + dG
                    }
                    dK = g.sendBeacon(dD, dC)
                } catch (dH) {
                    return false
                }
                if (dK && typeof dJ === "function") {
                    dJ({
                        request: dG,
                        trackerUrl: aI,
                        success: true,
                        isSendBeacon: true
                    })
                }
                return dK
            }

            function dm(dD, dE, dC) {
                if (!M(dC) || null === dC) {
                    dC = true
                }
                if (m && bd(dD, dE, dC)) {
                    return
                }
                setTimeout(function() {
                    if (m && bd(dD, dE, dC)) {
                        return
                    }
                    var dH;
                    try {
                        var dG = W.XMLHttpRequest ? new W.XMLHttpRequest() : W.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null;
                        dG.open("POST", aI, true);
                        dG.onreadystatechange = function() {
                            if (this.readyState === 4 && !(this.status >= 200 && this.status < 300)) {
                                var dI = m && bd(dD, dE, dC);
                                if (!dI && dC) {
                                    cA(dD, dE)
                                } else {
                                    if (typeof dE === "function") {
                                        dE({
                                            request: dD,
                                            trackerUrl: aI,
                                            success: false,
                                            xhr: this
                                        })
                                    }
                                }
                            } else {
                                if (this.readyState === 4 && (typeof dE === "function")) {
                                    dE({
                                        request: dD,
                                        trackerUrl: aI,
                                        success: true,
                                        xhr: this
                                    })
                                }
                            }
                        };
                        dG.setRequestHeader("Content-Type", cL);
                        dG.withCredentials = true;
                        dG.send(dD)
                    } catch (dF) {
                        dH = m && bd(dD, dE, dC);
                        if (!dH && dC) {
                            cA(dD, dE)
                        } else {
                            if (typeof dE === "function") {
                                dE({
                                    request: dD,
                                    trackerUrl: aI,
                                    success: false
                                })
                            }
                        }
                    }
                }, 50)
            }

            function cq(dD) {
                var dC = new Date();
                var dE = dC.getTime() + dD;
                if (!r || dE > r) {
                    r = dE
                }
            }

            function bh() {
                bj = true;
                cN = new Date().getTime()
            }

            function dw() {
                var dC = new Date().getTime();
                return !cN || (dC - cN) > bc
            }

            function aD() {
                if (dw()) {
                    b0()
                }
            }

            function a1() {
                if (J.visibilityState === "hidden" && dw()) {
                    b0()
                } else {
                    if (J.visibilityState === "visible") {
                        cN = new Date().getTime()
                    }
                }
            }

            function dz() {
                if (aS || !bc) {
                    return
                }
                aS = true;
                ar(W, "focus", bh);
                ar(W, "blur", aD);
                ar(W, "visibilitychange", a1);
                af++;
                u.addPlugin("HeartBeat" + af, {
                    unload: function() {
                        if (aS && dw()) {
                            b0()
                        }
                    }
                })
            }

            function cS(dG) {
                var dD = new Date();
                var dC = dD.getTime();
                dg = dC;
                if (cR && dC < cR) {
                    var dE = cR - dC;
                    setTimeout(dG, dE);
                    cq(dE + 50);
                    cR += 50;
                    return
                }
                if (cR === false) {
                    var dF = 800;
                    cR = dC + dF
                }
                dG()
            }

            function aT() {
                if (aH(c2)) {
                    bL = false
                } else {
                    if (aH(bk)) {
                        bL = true
                    }
                }
            }

            function bT(dE) {
                if (!aZ) {
                    return dE
                }
                var dD, dC = "&uadata=" + t(W.JSON.stringify(aZ));
                if (dE instanceof Array) {
                    for (dD = 0; dD < dE.length; dD++) {
                        dE[dD] += dC
                    }
                } else {
                    dE += dC
                }
                return dE
            }

            function cB(dC) {
                if (!de || !M(g.userAgentData) || !C(g.userAgentData.getHighEntropyValues)) {
                    dC();
                    return
                }
                aZ = {
                    brands: g.userAgentData.brands,
                    platform: g.userAgentData.platform
                };
                g.userAgentData.getHighEntropyValues(["brands", "model", "platform", "platformVersion", "uaFullVersion", "fullVersionList"]).then(function(dE) {
                    var dD;
                    if (dE.fullVersionList) {
                        delete dE.brands;
                        delete dE.uaFullVersion
                    }
                    aZ = dE;
                    dC()
                }, function(dD) {
                    dC()
                })
            }

            function bO(dD, dC, dE) {
                if (!bu) {
                    cj.push(dD);
                    return
                }
                aT();
                if (!bL) {
                    c1.push(dD);
                    return
                }
                aA = true;
                if (!c6 && dD) {
                    if (cQ && bL) {
                        dD += "&consent=1"
                    }
                    dD = bT(dD);
                    cS(function() {
                        if (dd && bd(dD, dE, true)) {
                            cq(100);
                            return
                        }
                        if (cU(dD)) {
                            dm(dD, dE)
                        } else {
                            cA(dD, dE)
                        }
                        cq(dC)
                    })
                }
                if (!aS) {
                    dz()
                }
            }

            function cv(dC) {
                if (c6) {
                    return false
                }
                return (dC && dC.length)
            }

            function dl(dC, dG) {
                if (!dG || dG >= dC.length) {
                    return [dC]
                }
                var dD = 0;
                var dE = dC.length;
                var dF = [];
                for (dD; dD < dE; dD += dG) {
                    dF.push(dC.slice(dD, dD + dG))
                }
                return dF
            }

            function dy(dD, dC) {
                if (!cv(dD)) {
                    return
                }
                if (!bu) {
                    cj.push(dD);
                    return
                }
                if (!bL) {
                    c1.push(dD);
                    return
                }
                aA = true;
                cS(function() {
                    var dG = dl(dD, 50);
                    var dE = 0,
                        dF;
                    for (dE; dE < dG.length; dE++) {
                        dF = '{"requests":["?' + bT(dG[dE]).join('","?') + '"],"send_image":0}';
                        if (dd && bd(dF, null, false)) {
                            cq(100)
                        } else {
                            dm(dF, null, false)
                        }
                    }
                    cq(dC)
                })
            }

            function aY(dC) {
                return br + dC + "." + cf + "." + bx
            }

            function b8(dE, dD, dC) {
                dx(dE, "", -129600000, dD, dC)
            }

            function ce() {
                if (bt) {
                    return "0"
                }
                if (!M(W.showModalDialog) && M(g.cookieEnabled)) {
                    return g.cookieEnabled ? "1" : "0"
                }
                var dC = br + "testcookie";
                dx(dC, "1", undefined, by, df, b1, aN);
                var dD = aH(dC) === "1" ? "1" : "0";
                b8(dC);
                return dD
            }

            function bp() {
                bx = cg((df || da) + (by || "/")).slice(0, 4)
            }

            function cY() {
                cB(function() {
                    var dI, dH;
                    bu = true;
                    for (dI = 0; dI < cj.length; dI++) {
                        dH = typeof cj[dI];
                        if (dH === "string") {
                            bO(cj[dI], bS)
                        } else {
                            if (dH === "object") {
                                dy(cj[dI], bS)
                            }
                        }
                    }
                    cj = []
                });
                if (!de) {
                    return {}
                }
                if (M(dq.res)) {
                    return dq
                }
                var dD, dF, dG = {
                    pdf: "application/pdf",
                    qt: "video/quicktime",
                    realp: "audio/x-pn-realaudio-plugin",
                    wma: "application/x-mplayer2",
                    fla: "application/x-shockwave-flash",
                    java: "application/x-java-vm",
                    ag: "application/x-silverlight"
                };
                if (!((new RegExp("MSIE")).test(g.userAgent))) {
                    if (g.mimeTypes && g.mimeTypes.length) {
                        for (dD in dG) {
                            if (Object.prototype.hasOwnProperty.call(dG, dD)) {
                                dF = g.mimeTypes[dG[dD]];
                                dq[dD] = (dF && dF.enabledPlugin) ? "1" : "0"
                            }
                        }
                    }
                    if (!((new RegExp("Edge[ /](\\d+[\\.\\d]+)")).test(g.userAgent)) && typeof navigator.javaEnabled !== "unknown" && M(g.javaEnabled) && g.javaEnabled()) {
                        dq.java = "1"
                    }
                    if (!M(W.showModalDialog) && M(g.cookieEnabled)) {
                        dq.cookie = g.cookieEnabled ? "1" : "0"
                    } else {
                        dq.cookie = ce()
                    }
                }
                var dE = parseInt(ab.width, 10);
                var dC = parseInt(ab.height, 10);
                dq.res = parseInt(dE, 10) + "x" + parseInt(dC, 10);
                return dq
            }

            function b6() {
                var dD = aY("cvar"),
                    dC = aH(dD);
                if (dC && dC.length) {
                    dC = W.JSON.parse(dC);
                    if (Z(dC)) {
                        return dC
                    }
                }
                return {}
            }

            function cV() {
                if (aV === false) {
                    aV = b6()
                }
            }

            function c7() {
                var dC = cY();
                return cg((g.userAgent || "") + (g.platform || "") + W.JSON.stringify(dC) + (new Date()).getTime() + Math.random()).slice(0, 16)
            }

            function aF() {
                var dC = cY();
                return cg((g.userAgent || "") + (g.platform || "") + W.JSON.stringify(dC)).slice(0, 6)
            }

            function bm() {
                return Math.floor((new Date()).getTime() / 1000)
            }

            function aO() {
                var dD = bm();
                var dE = aF();
                var dC = String(dD) + dE;
                return dC
            }

            function dk(dE) {
                dE = String(dE);
                var dH = aF();
                var dF = dH.length;
                var dG = dE.substr(-1 * dF, dF);
                var dD = parseInt(dE.substr(0, dE.length - dF), 10);
                if (dD && dG && dG === dH) {
                    var dC = bm();
                    if (a6 <= 0) {
                        return true
                    }
                    if (dC >= dD && dC <= (dD + a6)) {
                        return true
                    }
                }
                return false
            }

            function dA(dC) {
                if (!c3) {
                    return ""
                }
                var dG = e(dC, az);
                if (!dG) {
                    return ""
                }
                dG = String(dG);
                var dE = new RegExp("^[a-zA-Z0-9]+$");
                if (dG.length === 32 && dE.test(dG)) {
                    var dD = dG.substr(16, 32);
                    if (dk(dD)) {
                        var dF = dG.substr(0, 16);
                        return dF
                    }
                }
                return ""
            }

            function c4() {
                if (!bX) {
                    bX = dA(bW)
                }
                var dE = new Date(),
                    dC = Math.round(dE.getTime() / 1000),
                    dD = aY("id"),
                    dH = aH(dD),
                    dG, dF;
                if (dH) {
                    dG = dH.split(".");
                    dG.unshift("0");
                    if (bX.length) {
                        dG[1] = bX
                    }
                    return dG
                }
                if (bX.length) {
                    dF = bX
                } else {
                    if ("0" === ce()) {
                        dF = ""
                    } else {
                        dF = c7()
                    }
                }
                dG = ["1", dF, dC];
                return dG
            }

            function a5() {
                var dF = c4(),
                    dD = dF[0],
                    dE = dF[1],
                    dC = dF[2];
                return {
                    newVisitor: dD,
                    uuid: dE,
                    createTs: dC
                }
            }

            function aL() {
                var dF = new Date(),
                    dD = dF.getTime(),
                    dG = a5().createTs;
                var dC = parseInt(dG, 10);
                var dE = (dC * 1000) + c0 - dD;
                return dE
            }

            function aR(dC) {
                if (!cf) {
                    return
                }
                var dE = new Date(),
                    dD = Math.round(dE.getTime() / 1000);
                if (!M(dC)) {
                    dC = a5()
                }
                var dF = dC.uuid + "." + dC.createTs + ".";
                dx(aY("id"), dF, aL(), by, df, b1, aN)
            }

            function bV() {
                var dC = aH(aY("ref"));
                if (dC.length) {
                    try {
                        dC = W.JSON.parse(dC);
                        if (Z(dC)) {
                            return dC
                        }
                    } catch (dD) {}
                }
                return ["", "", 0, ""]
            }

            function bF(dE) {
                var dD = br + "testcookie_domain";
                var dC = "testvalue";
                dx(dD, dC, 10000, null, dE, b1, aN);
                if (aH(dD) === dC) {
                    b8(dD, null, dE);
                    return true
                }
                return false
            }

            function aJ() {
                var dD = bt;
                bt = false;
                var dC, dE;
                for (dC = 0; dC < bD.length; dC++) {
                    dE = aY(bD[dC]);
                    if (dE !== c2 && dE !== bk && 0 !== aH(dE)) {
                        b8(dE, by, df)
                    }
                }
                bt = dD
            }

            function cc(dC) {
                cf = dC
            }

            function dB(dG) {
                if (!dG || !Z(dG)) {
                    return
                }
                var dF = [];
                var dE;
                for (dE in dG) {
                    if (Object.prototype.hasOwnProperty.call(dG, dE)) {
                        dF.push(dE)
                    }
                }
                var dH = {};
                dF.sort();
                var dC = dF.length;
                var dD;
                for (dD = 0; dD < dC; dD++) {
                    dH[dF[dD]] = dG[dF[dD]]
                }
                return dH
            }

            function cn() {
                dx(aY("ses"), "1", cz, by, df, b1, aN)
            }

            function bn() {
                var dF = "";
                var dD = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var dE = dD.length;
                var dC;
                for (dC = 0; dC < 6; dC++) {
                    dF += dD.charAt(Math.floor(Math.random() * dE))
                }
                return dF
            }

            function aE(dD) {
                if (cy !== "") {
                    dD += cy;
                    bo = true;
                    return dD
                }
                if (!h) {
                    return dD
                }
                var dE = (typeof h.timing === "object") && h.timing ? h.timing : undefined;
                if (!dE) {
                    dE = (typeof h.getEntriesByType === "function") && h.getEntriesByType("navigation") ? h.getEntriesByType("navigation")[0] : undefined
                }
                if (!dE) {
                    return dD
                }
                var dC = "";
                if (dE.connectEnd && dE.fetchStart) {
                    if (dE.connectEnd < dE.fetchStart) {
                        return dD
                    }
                    dC += "&pf_net=" + Math.round(dE.connectEnd - dE.fetchStart)
                }
                if (dE.responseStart && dE.requestStart) {
                    if (dE.responseStart < dE.requestStart) {
                        return dD
                    }
                    dC += "&pf_srv=" + Math.round(dE.responseStart - dE.requestStart)
                }
                if (dE.responseStart && dE.responseEnd) {
                    if (dE.responseEnd < dE.responseStart) {
                        return dD
                    }
                    dC += "&pf_tfr=" + Math.round(dE.responseEnd - dE.responseStart)
                }
                if (M(dE.domLoading)) {
                    if (dE.domInteractive && dE.domLoading) {
                        if (dE.domInteractive < dE.domLoading) {
                            return dD
                        }
                        dC += "&pf_dm1=" + Math.round(dE.domInteractive - dE.domLoading)
                    }
                } else {
                    if (dE.domInteractive && dE.responseEnd) {
                        if (dE.domInteractive < dE.responseEnd) {
                            return dD
                        }
                        dC += "&pf_dm1=" + Math.round(dE.domInteractive - dE.responseEnd)
                    }
                }
                if (dE.domComplete && dE.domInteractive) {
                    if (dE.domComplete < dE.domInteractive) {
                        return dD
                    }
                    dC += "&pf_dm2=" + Math.round(dE.domComplete - dE.domInteractive)
                }
                if (dE.loadEventEnd && dE.loadEventStart) {
                    if (dE.loadEventEnd < dE.loadEventStart) {
                        return dD
                    }
                    dC += "&pf_onl=" + Math.round(dE.loadEventEnd - dE.loadEventStart)
                }
                return dD + dC
            }

            function cm(dC) {
                return e(dC, "ignore_referrer") === "1" || e(dC, "ignore_referer") === "1"
            }

            function ds() {
                var dM, dF = new Date(),
                    dG = Math.round(dF.getTime() / 1000),
                    dR, dE, dH = 1024,
                    dO, dI, dD = aY("ses"),
                    dL = aY("ref"),
                    dK = aH(dD),
                    dC = bV(),
                    dQ = bb || bW,
                    dN, dJ, dP = {};
                dN = dC[0];
                dJ = dC[1];
                dR = dC[2];
                dE = dC[3];
                if (!cm(dQ) && !dK) {
                    if (!bE || !dN.length) {
                        for (dM in cC) {
                            if (Object.prototype.hasOwnProperty.call(cC, dM)) {
                                dN = e(dQ, cC[dM]);
                                if (dN.length) {
                                    break
                                }
                            }
                        }
                        for (dM in bP) {
                            if (Object.prototype.hasOwnProperty.call(bP, dM)) {
                                dJ = e(dQ, bP[dM]);
                                if (dJ.length) {
                                    break
                                }
                            }
                        }
                    }
                    dO = d(bw);
                    dI = dE.length ? d(dE) : "";
                    if (dO.length && !a2(dO) && !cD(bw) && (!bE || !dI.length || a2(dI) || cD(dE))) {
                        dE = bw
                    }
                    if (dE.length || dN.length) {
                        dR = dG;
                        dC = [dN, dJ, dR, cb(dE.slice(0, dH))];
                        dx(dL, W.JSON.stringify(dC), dn, by, df, b1, aN)
                    }
                }
                if (dN.length) {
                    dP._rcn = t(dN)
                }
                if (dJ.length) {
                    dP._rck = t(dJ)
                }
                dP._refts = dR;
                if (String(dE).length) {
                    dP._ref = t(cb(dE.slice(0, dH)))
                }
                return dP
            }

            function cF(dD, dP, dQ) {
                var dO, dC = new Date(),
                    dN = aV,
                    dJ = aY("cvar"),
                    dR = bb || bW,
                    dE = cm(dR);
                if (bt) {
                    aJ()
                }
                if (c6) {
                    return ""
                }
                var dK = a5();
                var dH = J.characterSet || J.charset;
                if (!dH || dH.toLowerCase() === "utf-8") {
                    dH = null
                }
                dD += "&idsite=" + cf + "&rec=1&r=" + String(Math.random()).slice(2, 8) + "&h=" + dC.getHours() + "&m=" + dC.getMinutes() + "&s=" + dC.getSeconds() + "&url=" + t(cb(dR)) + (bw.length && !cD(bw) && !dE ? "&urlref=" + t(cb(bw)) : "") + (ac(bH) ? "&uid=" + t(bH) : "") + "&_id=" + dK.uuid + "&_idn=" + dK.newVisitor + (dH ? "&cs=" + t(dH) : "") + "&send_image=0";
                var dM = ds();
                for (dO in dM) {
                    if (Object.prototype.hasOwnProperty.call(dM, dO)) {
                        dD += "&" + dO + "=" + dM[dO]
                    }
                }
                var dT = cY();
                for (dO in dT) {
                    if (Object.prototype.hasOwnProperty.call(dT, dO)) {
                        dD += "&" + dO + "=" + dT[dO]
                    }
                }
                var dU = [];
                if (dP) {
                    for (dO in dP) {
                        if (Object.prototype.hasOwnProperty.call(dP, dO) && /^dimension\d+$/.test(dO)) {
                            var dF = dO.replace("dimension", "");
                            dU.push(parseInt(dF, 10));
                            dU.push(String(dF));
                            dD += "&" + dO + "=" + t(dP[dO]);
                            delete dP[dO]
                        }
                    }
                }
                if (dP && D(dP)) {
                    dP = null
                }
                for (dO in cH) {
                    if (Object.prototype.hasOwnProperty.call(cH, dO)) {
                        dD += "&" + dO + "=" + t(cH[dO])
                    }
                }
                for (dO in bv) {
                    if (Object.prototype.hasOwnProperty.call(bv, dO)) {
                        var dI = (-1 === P(dU, dO));
                        if (dI) {
                            dD += "&dimension" + dO + "=" + t(bv[dO])
                        }
                    }
                }
                if (dP) {
                    dD += "&data=" + t(W.JSON.stringify(dP))
                } else {
                    if (at) {
                        dD += "&data=" + t(W.JSON.stringify(at))
                    }
                }

                function dG(dV, dW) {
                    var dX = W.JSON.stringify(dV);
                    if (dX.length > 2) {
                        return "&" + dW + "=" + t(dX)
                    }
                    return ""
                }
                var dS = dB(b5);
                var dL = dB(cx);
                dD += dG(dS, "cvar");
                dD += dG(dL, "e_cvar");
                if (aV) {
                    dD += dG(aV, "_cvar");
                    for (dO in dN) {
                        if (Object.prototype.hasOwnProperty.call(dN, dO)) {
                            if (aV[dO][0] === "" || aV[dO][1] === "") {
                                delete aV[dO]
                            }
                        }
                    }
                    if (bZ) {
                        dx(dJ, W.JSON.stringify(aV), cz, by, df, b1, aN)
                    }
                }
                if (a9 && bN && !bo) {
                    dD = aE(dD);
                    bo = true
                }
                if (aQ) {
                    dD += "&pv_id=" + aQ
                }
                aR(dK);
                cn();
                dD += ag(dQ, {
                    tracker: bR,
                    request: dD
                });
                if (dh.length) {
                    dD += "&" + dh
                }
                if (C(cl)) {
                    dD = cl(dD)
                }
                return dD
            }
            b0 = function be() {
                var dC = new Date();
                dC = dC.getTime();
                if (!dg) {
                    return false
                }
                if (dg + bc <= dC) {
                    bR.ping();
                    return true
                }
                return false
            };

            function bz(dF, dE, dJ, dG, dC, dM) {
                var dI = "idgoal=0",
                    dD = new Date(),
                    dK = [],
                    dL, dH = String(dF).length;
                if (dH) {
                    dI += "&ec_id=" + t(dF)
                }
                dI += "&revenue=" + dE;
                if (String(dJ).length) {
                    dI += "&ec_st=" + dJ
                }
                if (String(dG).length) {
                    dI += "&ec_tx=" + dG
                }
                if (String(dC).length) {
                    dI += "&ec_sh=" + dC
                }
                if (String(dM).length) {
                    dI += "&ec_dt=" + dM
                }
                if (di) {
                    for (dL in di) {
                        if (Object.prototype.hasOwnProperty.call(di, dL)) {
                            if (!M(di[dL][1])) {
                                di[dL][1] = ""
                            }
                            if (!M(di[dL][2])) {
                                di[dL][2] = ""
                            }
                            if (!M(di[dL][3]) || String(di[dL][3]).length === 0) {
                                di[dL][3] = 0
                            }
                            if (!M(di[dL][4]) || String(di[dL][4]).length === 0) {
                                di[dL][4] = 1
                            }
                            dK.push(di[dL])
                        }
                    }
                    dI += "&ec_items=" + t(W.JSON.stringify(dK))
                }
                dI = cF(dI, at, "ecommerce");
                bO(dI, bS);
                if (dH) {
                    di = {}
                }
            }

            function b7(dC, dG, dF, dE, dD, dH) {
                if (String(dC).length && M(dG)) {
                    bz(dC, dG, dF, dE, dD, dH)
                }
            }

            function bB(dC) {
                if (M(dC)) {
                    bz("", dC, "", "", "", "")
                }
            }

            function b9(dD, dF, dE) {
                if (!bJ) {
                    aQ = bn()
                }
                var dC = cF("action_name=" + t(ap(dD || bq)), dF, "log");
                if (a9 && !bo) {
                    dC = aE(dC)
                }
                bO(dC, bS, dE)
            }

            function a7(dE, dD) {
                var dF, dC = "(^| )(piwik[_-]" + dD + "|matomo[_-]" + dD;
                if (dE) {
                    for (dF = 0; dF < dE.length; dF++) {
                        dC += "|" + dE[dF]
                    }
                }
                dC += ")( |$)";
                return new RegExp(dC)
            }

            function a0(dC) {
                return (aI && dC && 0 === String(dC).indexOf(aI))
            }

            function cJ(dG, dC, dH, dD) {
                if (a0(dC)) {
                    return 0
                }
                var dF = a7(bU, "download"),
                    dE = a7(bf, "link"),
                    dI = new RegExp("\\.(" + dp.join("|") + ")([?&#]|$)", "i");
                if (dE.test(dG)) {
                    return "link"
                }
                if (dD || dF.test(dG) || dI.test(dC)) {
                    return "download"
                }
                if (dH) {
                    return 0
                }
                return "link"
            }

            function ay(dD) {
                var dC;
                dC = dD.parentNode;
                while (dC !== null && M(dC)) {
                    if (ai.isLinkElement(dD)) {
                        break
                    }
                    dD = dC;
                    dC = dD.parentNode
                }
                return dD
            }

            function dv(dH) {
                dH = ay(dH);
                if (!ai.hasNodeAttribute(dH, "href")) {
                    return
                }
                if (!M(dH.href)) {
                    return
                }
                var dG = ai.getAttributeValueFromNode(dH, "href");
                var dD = dH.pathname || cw(dH.href);
                var dI = dH.hostname || d(dH.href);
                var dJ = dI.toLowerCase();
                var dE = dH.href.replace(dI, dJ);
                var dF = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):", "i");
                if (!dF.test(dE)) {
                    var dC = cJ(dH.className, dE, aw(dJ, dD), ai.hasNodeAttribute(dH, "download"));
                    if (dC) {
                        return {
                            type: dC,
                            href: dE
                        }
                    }
                }
            }

            function aU(dC, dD, dE, dF) {
                var dG = w.buildInteractionRequestParams(dC, dD, dE, dF);
                if (!dG) {
                    return
                }
                return cF(dG, null, "contentInteraction")
            }

            function bi(dC, dD) {
                if (!dC || !dD) {
                    return false
                }
                var dE = w.findTargetNode(dC);
                if (w.shouldIgnoreInteraction(dE)) {
                    return false
                }
                dE = w.findTargetNodeNoDefault(dC);
                if (dE && !Y(dE, dD)) {
                    return false
                }
                return true
            }

            function cI(dE, dD, dG) {
                if (!dE) {
                    return
                }
                var dC = w.findParentContentNode(dE);
                if (!dC) {
                    return
                }
                if (!bi(dC, dE)) {
                    return
                }
                var dF = w.buildContentBlock(dC);
                if (!dF) {
                    return
                }
                if (!dF.target && dG) {
                    dF.target = dG
                }
                return w.buildInteractionRequestParams(dD, dF.name, dF.piece, dF.target)
            }

            function a3(dD) {
                if (!ck || !ck.length) {
                    return false
                }
                var dC, dE;
                for (dC = 0; dC < ck.length; dC++) {
                    dE = ck[dC];
                    if (dE && dE.name === dD.name && dE.piece === dD.piece && dE.target === dD.target) {
                        return true
                    }
                }
                return false
            }

            function a4(dC) {
                return function(dG) {
                    if (!dC) {
                        return
                    }
                    var dE = w.findParentContentNode(dC);
                    var dD;
                    if (dG) {
                        dD = dG.target || dG.srcElement
                    }
                    if (!dD) {
                        dD = dC
                    }
                    if (!bi(dE, dD)) {
                        return
                    }
                    if (!dE) {
                        return false
                    }
                    var dH = w.findTargetNode(dE);
                    if (!dH || w.shouldIgnoreInteraction(dH)) {
                        return false
                    }
                    var dF = dv(dH);
                    if (dr && dF && dF.type) {
                        return dF.type
                    }
                    return bR.trackContentInteractionNode(dD, "click")
                }
            }

            function ca(dE) {
                if (!dE || !dE.length) {
                    return
                }
                var dC, dD;
                for (dC = 0; dC < dE.length; dC++) {
                    dD = w.findTargetNode(dE[dC]);
                    if (dD && !dD.contentInteractionTrackingSetupDone) {
                        dD.contentInteractionTrackingSetupDone = true;
                        ar(dD, "click", a4(dD))
                    }
                }
            }

            function bG(dE, dF) {
                if (!dE || !dE.length) {
                    return []
                }
                var dC, dD;
                for (dC = 0; dC < dE.length; dC++) {
                    if (a3(dE[dC])) {
                        dE.splice(dC, 1);
                        dC--
                    } else {
                        ck.push(dE[dC])
                    }
                }
                if (!dE || !dE.length) {
                    return []
                }
                ca(dF);
                var dG = [];
                for (dC = 0; dC < dE.length; dC++) {
                    dD = cF(w.buildImpressionRequestParams(dE[dC].name, dE[dC].piece, dE[dC].target), undefined, "contentImpressions");
                    if (dD) {
                        dG.push(dD)
                    }
                }
                return dG
            }

            function cP(dD) {
                var dC = w.collectContent(dD);
                return bG(dC, dD)
            }

            function bg(dD) {
                if (!dD || !dD.length) {
                    return []
                }
                var dC;
                for (dC = 0; dC < dD.length; dC++) {
                    if (!w.isNodeVisible(dD[dC])) {
                        dD.splice(dC, 1);
                        dC--
                    }
                }
                if (!dD || !dD.length) {
                    return []
                }
                return cP(dD)
            }

            function aK(dE, dC, dD) {
                var dF = w.buildImpressionRequestParams(dE, dC, dD);
                return cF(dF, null, "contentImpression")
            }

            function du(dF, dD) {
                if (!dF) {
                    return
                }
                var dC = w.findParentContentNode(dF);
                var dE = w.buildContentBlock(dC);
                if (!dE) {
                    return
                }
                if (!dD) {
                    dD = "Unknown"
                }
                return aU(dD, dE.name, dE.piece, dE.target)
            }

            function c5(dD, dF, dC, dE) {
                return "e_c=" + t(dD) + "&e_a=" + t(dF) + (M(dC) ? "&e_n=" + t(dC) : "") + (M(dE) ? "&e_v=" + t(dE) : "") + "&ca=1"
            }

            function ax(dE, dG, dC, dF, dI, dH) {
                if (!ac(dE) || !ac(dG)) {
                    ao("Error while logging event: Parameters `category` and `action` must not be empty or filled with whitespaces");
                    return false
                }
                var dD = cF(c5(dE, dG, dC, dF), dI, "event");
                bO(dD, bS, dH)
            }

            function ch(dC, dF, dD, dG) {
                var dE = cF("search=" + t(dC) + (dF ? "&search_cat=" + t(dF) : "") + (M(dD) ? "&search_count=" + dD : ""), dG, "sitesearch");
                bO(dE, bS)
            }

            function c9(dC, dG, dF, dE) {
                var dD = cF("idgoal=" + dC + (dG ? "&revenue=" + dG : ""), dF, "goal");
                bO(dD, bS, dE)
            }

            function dj(dF, dC, dJ, dI, dE) {
                var dH = dC + "=" + t(cb(dF));
                var dD = cI(dE, "click", dF);
                if (dD) {
                    dH += "&" + dD
                }
                var dG = cF(dH, dJ, "link");
                bO(dG, bS, dI)
            }

            function b3(dD, dC) {
                if (dD !== "") {
                    return dD + dC.charAt(0).toUpperCase() + dC.slice(1)
                }
                return dC
            }

            function cr(dH) {
                var dG, dC, dF = ["", "webkit", "ms", "moz"],
                    dE;
                if (!bl) {
                    for (dC = 0; dC < dF.length; dC++) {
                        dE = dF[dC];
                        if (Object.prototype.hasOwnProperty.call(J, b3(dE, "hidden"))) {
                            if (J[b3(dE, "visibilityState")] === "prerender") {
                                dG = true
                            }
                            break
                        }
                    }
                }
                if (dG) {
                    ar(J, dE + "visibilitychange", function dD() {
                        J.removeEventListener(dE + "visibilitychange", dD, false);
                        dH()
                    });
                    return
                }
                dH()
            }

            function bA() {
                var dD = bR.getVisitorId();
                var dC = aO();
                return dD + dC
            }

            function cu(dC) {
                if (!dC) {
                    return
                }
                if (!ai.hasNodeAttribute(dC, "href")) {
                    return
                }
                var dD = ai.getAttributeValueFromNode(dC, "href");
                if (!dD || a0(dD)) {
                    return
                }
                if (!bR.getVisitorId()) {
                    return
                }
                dD = j(dD, az);
                var dE = bA();
                dD = I(dD, az, dE);
                ai.setAnyAttribute(dC, "href", dD)
            }

            function bs(dF) {
                var dG = ai.getAttributeValueFromNode(dF, "href");
                if (!dG) {
                    return false
                }
                dG = String(dG);
                var dD = dG.indexOf("//") === 0 || dG.indexOf("http://") === 0 || dG.indexOf("https://") === 0;
                if (!dD) {
                    return false
                }
                var dC = dF.pathname || cw(dF.href);
                var dE = (dF.hostname || d(dF.href)).toLowerCase();
                if (aw(dE, dC)) {
                    if (!cX(da, O(dE))) {
                        return true
                    }
                    return false
                }
                return false
            }

            function cW(dC) {
                var dD = dv(dC);
                if (dD && dD.type) {
                    dD.href = p(dD.href);
                    dj(dD.href, dD.type, undefined, null, dC);
                    return
                }
                if (c3) {
                    dC = ay(dC);
                    if (bs(dC)) {
                        cu(dC)
                    }
                }
            }

            function cK() {
                return J.all && !J.addEventListener
            }

            function db(dC) {
                var dE = dC.which;
                var dD = (typeof dC.button);
                if (!dE && dD !== "undefined") {
                    if (cK()) {
                        if (dC.button & 1) {
                            dE = 1
                        } else {
                            if (dC.button & 2) {
                                dE = 3
                            } else {
                                if (dC.button & 4) {
                                    dE = 2
                                }
                            }
                        }
                    } else {
                        if (dC.button === 0 || dC.button === "0") {
                            dE = 1
                        } else {
                            if (dC.button & 1) {
                                dE = 2
                            } else {
                                if (dC.button & 2) {
                                    dE = 3
                                }
                            }
                        }
                    }
                }
                return dE
            }

            function b2(dC) {
                switch (db(dC)) {
                    case 1:
                        return "left";
                    case 2:
                        return "middle";
                    case 3:
                        return "right"
                }
            }

            function a8(dC) {
                return dC.target || dC.srcElement
            }

            function dc(dC) {
                return dC === "A" || dC === "AREA"
            }

            function aG(dC) {
                function dD(dF) {
                    var dG = a8(dF);
                    var dH = dG.nodeName;
                    var dE = a7(bI, "ignore");
                    while (!dc(dH) && dG && dG.parentNode) {
                        dG = dG.parentNode;
                        dH = dG.nodeName
                    }
                    if (dG && dc(dH) && !dE.test(dG.className)) {
                        return dG
                    }
                }
                return function(dG) {
                    dG = dG || W.event;
                    var dH = dD(dG);
                    if (!dH) {
                        return
                    }
                    var dF = b2(dG);
                    if (dG.type === "click") {
                        var dE = false;
                        if (dC && dF === "middle") {
                            dE = true
                        }
                        if (dH && !dE) {
                            cW(dH)
                        }
                    } else {
                        if (dG.type === "mousedown") {
                            if (dF === "middle" && dH) {
                                aW = dF;
                                bK = dH
                            } else {
                                aW = bK = null
                            }
                        } else {
                            if (dG.type === "mouseup") {
                                if (dF === aW && dH === bK) {
                                    cW(dH)
                                }
                                aW = bK = null
                            } else {
                                if (dG.type === "contextmenu") {
                                    cW(dH)
                                }
                            }
                        }
                    }
                }
            }

            function av(dF, dE, dC) {
                var dD = typeof dE;
                if (dD === "undefined") {
                    dE = true
                }
                ar(dF, "click", aG(dE), dC);
                if (dE) {
                    ar(dF, "mouseup", aG(dE), dC);
                    ar(dF, "mousedown", aG(dE), dC);
                    ar(dF, "contextmenu", aG(dE), dC)
                }
            }

            function aX(dD, dG, dH) {
                if (cp) {
                    return true
                }
                cp = true;
                var dI = false;
                var dF, dE;

                function dC() {
                    dI = true
                }
                n(function() {
                    function dJ(dL) {
                        setTimeout(function() {
                            if (!cp) {
                                return
                            }
                            dI = false;
                            dH.trackVisibleContentImpressions();
                            dJ(dL)
                        }, dL)
                    }

                    function dK(dL) {
                        setTimeout(function() {
                            if (!cp) {
                                return
                            }
                            if (dI) {
                                dI = false;
                                dH.trackVisibleContentImpressions()
                            }
                            dK(dL)
                        }, dL)
                    }
                    if (dD) {
                        dF = ["scroll", "resize"];
                        for (dE = 0; dE < dF.length; dE++) {
                            if (J.addEventListener) {
                                J.addEventListener(dF[dE], dC, false)
                            } else {
                                W.attachEvent("on" + dF[dE], dC)
                            }
                        }
                        dK(100)
                    }
                    if (dG && dG > 0) {
                        dG = parseInt(dG, 10);
                        dJ(dG)
                    }
                })
            }
            var bM = {
                enabled: true,
                requests: [],
                timeout: null,
                interval: 2500,
                sendRequests: function() {
                    var dC = this.requests;
                    this.requests = [];
                    if (dC.length === 1) {
                        bO(dC[0], bS)
                    } else {
                        dy(dC, bS)
                    }
                },
                canQueue: function() {
                    return !m && this.enabled
                },
                pushMultiple: function(dD) {
                    if (!this.canQueue()) {
                        dy(dD, bS);
                        return
                    }
                    var dC;
                    for (dC = 0; dC < dD.length; dC++) {
                        this.push(dD[dC])
                    }
                },
                push: function(dC) {
                    if (!dC) {
                        return
                    }
                    if (!this.canQueue()) {
                        bO(dC, bS);
                        return
                    }
                    bM.requests.push(dC);
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                        this.timeout = null
                    }
                    this.timeout = setTimeout(function() {
                        bM.timeout = null;
                        bM.sendRequests()
                    }, bM.interval);
                    var dD = "RequestQueue" + aB;
                    if (!Object.prototype.hasOwnProperty.call(b, dD)) {
                        b[dD] = {
                            unload: function() {
                                if (bM.timeout) {
                                    clearTimeout(bM.timeout)
                                }
                                bM.sendRequests()
                            }
                        }
                    }
                }
            };
            bp();
            this.hasConsent = function() {
                return bL
            };
            this.getVisitorInfo = function() {
                if (!aH(aY("id"))) {
                    aR()
                }
                return c4()
            };
            this.getVisitorId = function() {
                return this.getVisitorInfo()[1]
            };
            this.getAttributionInfo = function() {
                return bV()
            };
            this.getAttributionCampaignName = function() {
                return bV()[0]
            };
            this.getAttributionCampaignKeyword = function() {
                return bV()[1]
            };
            this.getAttributionReferrerTimestamp = function() {
                return bV()[2]
            };
            this.getAttributionReferrerUrl = function() {
                return bV()[3]
            };
            this.setTrackerUrl = function(dC) {
                aI = dC
            };
            this.getTrackerUrl = function() {
                return aI
            };
            this.getMatomoUrl = function() {
                return aa(this.getTrackerUrl(), bQ)
            };
            this.getPiwikUrl = function() {
                return this.getMatomoUrl()
            };
            this.addTracker = function(dE, dD) {
                if (!M(dE) || null === dE) {
                    dE = this.getTrackerUrl()
                }
                var dC = new T(dE, dD);
                L.push(dC);
                u.trigger("TrackerAdded", [this]);
                return dC
            };
            this.getSiteId = function() {
                return cf
            };
            this.setSiteId = function(dC) {
                cc(dC)
            };
            this.resetUserId = function() {
                bH = ""
            };
            this.setUserId = function(dC) {
                if (ac(dC)) {
                    bH = dC
                }
            };
            this.setVisitorId = function(dD) {
                var dC = /[0-9A-Fa-f]{16}/g;
                if (x(dD) && dC.test(dD)) {
                    bX = dD
                } else {
                    ao("Invalid visitorId set" + dD)
                }
            };
            this.getUserId = function() {
                return bH
            };
            this.setCustomData = function(dC, dD) {
                if (Z(dC)) {
                    at = dC
                } else {
                    if (!at) {
                        at = {}
                    }
                    at[dC] = dD
                }
            };
            this.getCustomData = function() {
                return at
            };
            this.setCustomRequestProcessing = function(dC) {
                cl = dC
            };
            this.appendToTrackingUrl = function(dC) {
                dh = dC
            };
            this.getRequest = function(dC) {
                return cF(dC)
            };
            this.addPlugin = function(dC, dD) {
                b[dC] = dD
            };
            this.setCustomDimension = function(dC, dD) {
                dC = parseInt(dC, 10);
                if (dC > 0) {
                    if (!M(dD)) {
                        dD = ""
                    }
                    if (!x(dD)) {
                        dD = String(dD)
                    }
                    bv[dC] = dD
                }
            };
            this.getCustomDimension = function(dC) {
                dC = parseInt(dC, 10);
                if (dC > 0 && Object.prototype.hasOwnProperty.call(bv, dC)) {
                    return bv[dC]
                }
            };
            this.deleteCustomDimension = function(dC) {
                dC = parseInt(dC, 10);
                if (dC > 0) {
                    delete bv[dC]
                }
            };
            this.setCustomVariable = function(dD, dC, dG, dE) {
                var dF;
                if (!M(dE)) {
                    dE = "visit"
                }
                if (!M(dC)) {
                    return
                }
                if (!M(dG)) {
                    dG = ""
                }
                if (dD > 0) {
                    dC = !x(dC) ? String(dC) : dC;
                    dG = !x(dG) ? String(dG) : dG;
                    dF = [dC.slice(0, bC), dG.slice(0, bC)];
                    if (dE === "visit" || dE === 2) {
                        cV();
                        aV[dD] = dF
                    } else {
                        if (dE === "page" || dE === 3) {
                            b5[dD] = dF
                        } else {
                            if (dE === "event") {
                                cx[dD] = dF
                            }
                        }
                    }
                }
            };
            this.getCustomVariable = function(dD, dE) {
                var dC;
                if (!M(dE)) {
                    dE = "visit"
                }
                if (dE === "page" || dE === 3) {
                    dC = b5[dD]
                } else {
                    if (dE === "event") {
                        dC = cx[dD]
                    } else {
                        if (dE === "visit" || dE === 2) {
                            cV();
                            dC = aV[dD]
                        }
                    }
                }
                if (!M(dC) || (dC && dC[0] === "")) {
                    return false
                }
                return dC
            };
            this.deleteCustomVariable = function(dC, dD) {
                if (this.getCustomVariable(dC, dD)) {
                    this.setCustomVariable(dC, "", "", dD)
                }
            };
            this.deleteCustomVariables = function(dC) {
                if (dC === "page" || dC === 3) {
                    b5 = {}
                } else {
                    if (dC === "event") {
                        cx = {}
                    } else {
                        if (dC === "visit" || dC === 2) {
                            aV = {}
                        }
                    }
                }
            };
            this.storeCustomVariablesInCookie = function() {
                bZ = true
            };
            this.setLinkTrackingTimer = function(dC) {
                bS = dC
            };
            this.getLinkTrackingTimer = function() {
                return bS
            };
            this.setDownloadExtensions = function(dC) {
                if (x(dC)) {
                    dC = dC.split("|")
                }
                dp = dC
            };
            this.addDownloadExtensions = function(dD) {
                var dC;
                if (x(dD)) {
                    dD = dD.split("|")
                }
                for (dC = 0; dC < dD.length; dC++) {
                    dp.push(dD[dC])
                }
            };
            this.removeDownloadExtensions = function(dE) {
                var dD, dC = [];
                if (x(dE)) {
                    dE = dE.split("|")
                }
                for (dD = 0; dD < dp.length; dD++) {
                    if (P(dE, dp[dD]) === -1) {
                        dC.push(dp[dD])
                    }
                }
                dp = dC
            };
            this.setDomains = function(dC) {
                aC = x(dC) ? [dC] : dC;
                var dG = false,
                    dE = 0,
                    dD;
                for (dE; dE < aC.length; dE++) {
                    dD = String(aC[dE]);
                    if (cX(da, O(dD))) {
                        dG = true;
                        break
                    }
                    var dF = cw(dD);
                    if (dF && dF !== "/" && dF !== "/*") {
                        dG = true;
                        break
                    }
                }
                if (!dG) {
                    aC.push(da)
                }
            };
            this.setExcludedReferrers = function(dC) {
                cM = x(dC) ? [dC] : dC
            };
            this.enableCrossDomainLinking = function() {
                c3 = true
            };
            this.disableCrossDomainLinking = function() {
                c3 = false
            };
            this.isCrossDomainLinkingEnabled = function() {
                return c3
            };
            this.setCrossDomainLinkingTimeout = function(dC) {
                a6 = dC
            };
            this.getCrossDomainLinkingUrlParameter = function() {
                return t(az) + "=" + t(bA())
            };
            this.setIgnoreClasses = function(dC) {
                bI = x(dC) ? [dC] : dC
            };
            this.setRequestMethod = function(dC) {
                if (dC) {
                    dt = String(dC).toUpperCase()
                } else {
                    dt = cs
                }
                if (dt === "GET") {
                    this.disableAlwaysUseSendBeacon()
                }
            };
            this.setRequestContentType = function(dC) {
                cL = dC || aM
            };
            this.setGenerationTimeMs = function(dC) {
                ao("setGenerationTimeMs is no longer supported since Matomo 4. The call will be ignored. The replacement is setPagePerformanceTiming.")
            };
            this.setPagePerformanceTiming = function(dG, dI, dH, dD, dJ, dE) {
                var dF = {
                    pf_net: dG,
                    pf_srv: dI,
                    pf_tfr: dH,
                    pf_dm1: dD,
                    pf_dm2: dJ,
                    pf_onl: dE
                };
                try {
                    dF = Q(dF, M);
                    dF = B(dF);
                    cy = l(dF);
                    if (cy === "") {
                        ao("setPagePerformanceTiming() called without parameters. This function needs to be called with at least one performance parameter.");
                        return
                    }
                    bo = false;
                    bN = true
                } catch (dC) {
                    ao("setPagePerformanceTiming: " + dC.toString())
                }
            };
            this.setReferrerUrl = function(dC) {
                bw = dC
            };
            this.setCustomUrl = function(dC) {
                bb = b4(bW, dC)
            };
            this.getCurrentUrl = function() {
                return bb || bW
            };
            this.setDocumentTitle = function(dC) {
                bq = dC
            };
            this.setPageViewId = function(dC) {
                aQ = dC;
                bJ = true
            };
            this.setAPIUrl = function(dC) {
                bQ = dC
            };
            this.setDownloadClasses = function(dC) {
                bU = x(dC) ? [dC] : dC
            };
            this.setLinkClasses = function(dC) {
                bf = x(dC) ? [dC] : dC
            };
            this.setCampaignNameKey = function(dC) {
                cC = x(dC) ? [dC] : dC
            };
            this.setCampaignKeywordKey = function(dC) {
                bP = x(dC) ? [dC] : dC
            };
            this.discardHashTag = function(dC) {
                bY = dC
            };
            this.setCookieNamePrefix = function(dC) {
                br = dC;
                if (aV) {
                    aV = b6()
                }
            };
            this.setCookieDomain = function(dC) {
                var dD = O(dC);
                if (!bt && !bF(dD)) {
                    ao("Can't write cookie on domain " + dC)
                } else {
                    df = dD;
                    bp()
                }
            };
            this.setExcludedQueryParams = function(dC) {
                ct = x(dC) ? [dC] : dC
            };
            this.getCookieDomain = function() {
                return df
            };
            this.hasCookies = function() {
                return "1" === ce()
            };
            this.setSessionCookie = function(dE, dD, dC) {
                if (!dE) {
                    throw new Error("Missing cookie name")
                }
                if (!M(dC)) {
                    dC = cz
                }
                bD.push(dE);
                dx(aY(dE), dD, dC, by, df, b1, aN)
            };
            this.getCookie = function(dD) {
                var dC = aH(aY(dD));
                if (dC === 0) {
                    return null
                }
                return dC
            };
            this.setCookiePath = function(dC) {
                by = dC;
                bp()
            };
            this.getCookiePath = function(dC) {
                return by
            };
            this.setVisitorCookieTimeout = function(dC) {
                c0 = dC * 1000
            };
            this.setSessionCookieTimeout = function(dC) {
                cz = dC * 1000
            };
            this.getSessionCookieTimeout = function() {
                return cz
            };
            this.setReferralCookieTimeout = function(dC) {
                dn = dC * 1000
            };
            this.setConversionAttributionFirstReferrer = function(dC) {
                bE = dC
            };
            this.setSecureCookie = function(dC) {
                if (dC && location.protocol !== "https:") {
                    ao("Error in setSecureCookie: You cannot use `Secure` on http.");
                    return
                }
                b1 = dC
            };
            this.setCookieSameSite = function(dC) {
                dC = String(dC);
                dC = dC.charAt(0).toUpperCase() + dC.toLowerCase().slice(1);
                if (dC !== "None" && dC !== "Lax" && dC !== "Strict") {
                    ao("Ignored value for sameSite. Please use either Lax, None, or Strict.");
                    return
                }
                if (dC === "None") {
                    if (location.protocol === "https:") {
                        this.setSecureCookie(true)
                    } else {
                        ao("sameSite=None cannot be used on http, reverted to sameSite=Lax.");
                        dC = "Lax"
                    }
                }
                aN = dC
            };
            this.disableCookies = function() {
                bt = true;
                if (cf) {
                    aJ()
                }
            };
            this.areCookiesEnabled = function() {
                return !bt
            };
            this.setCookieConsentGiven = function() {
                if (bt && !c6) {
                    bt = false;
                    de = true;
                    if (cf && aA) {
                        aR();
                        var dC = cF("ping=1", null, "ping");
                        bO(dC, bS)
                    }
                }
            };
            this.requireCookieConsent = function() {
                if (this.getRememberedCookieConsent()) {
                    return false
                }
                this.disableCookies();
                return true
            };
            this.getRememberedCookieConsent = function() {
                return aH(cT)
            };
            this.forgetCookieConsentGiven = function() {
                b8(cT, by, df);
                this.disableCookies()
            };
            this.rememberCookieConsentGiven = function(dD) {
                if (dD) {
                    dD = dD * 60 * 60 * 1000
                } else {
                    dD = 30 * 365 * 24 * 60 * 60 * 1000
                }
                this.setCookieConsentGiven();
                var dC = new Date().getTime();
                dx(cT, dC, dD, by, df, b1, aN)
            };
            this.deleteCookies = function() {
                aJ()
            };
            this.setDoNotTrack = function(dD) {
                var dC = g.doNotTrack || g.msDoNotTrack;
                c6 = dD && (dC === "yes" || dC === "1");
                if (c6) {
                    this.disableCookies()
                }
            };
            this.alwaysUseSendBeacon = function() {
                dd = true
            };
            this.disableAlwaysUseSendBeacon = function() {
                dd = false
            };
            this.addListener = function(dD, dC) {
                av(dD, dC, false)
            };
            this.enableLinkTracking = function(dD) {
                if (dr) {
                    return
                }
                dr = true;
                var dC = this;
                q(function() {
                    au = true;
                    var dE = J.body;
                    av(dE, dD, true)
                })
            };
            this.enableJSErrorTracking = function() {
                if (c8) {
                    return
                }
                c8 = true;
                var dC = W.onerror;
                W.onerror = function(dH, dF, dE, dG, dD) {
                    cr(function() {
                        var dI = "JavaScript Errors";
                        var dJ = dF + ":" + dE;
                        if (dG) {
                            dJ += ":" + dG
                        }
                        if (P(cG, dI + dJ + dH) === -1) {
                            cG.push(dI + dJ + dH);
                            ax(dI, dJ, dH)
                        }
                    });
                    if (dC) {
                        return dC(dH, dF, dE, dG, dD)
                    }
                    return false
                }
            };
            this.disablePerformanceTracking = function() {
                a9 = false
            };
            this.enableHeartBeatTimer = function(dC) {
                dC = Math.max(dC || 15, 5);
                bc = dC * 1000;
                if (dg !== null) {
                    dz()
                }
            };
            this.disableHeartBeatTimer = function() {
                if (bc || aS) {
                    if (W.removeEventListener) {
                        W.removeEventListener("focus", bh);
                        W.removeEventListener("blur", aD);
                        W.removeEventListener("visibilitychange", a1)
                    } else {
                        if (W.detachEvent) {
                            W.detachEvent("onfocus", bh);
                            W.detachEvent("onblur", aD);
                            W.detachEvent("visibilitychange", a1)
                        }
                    }
                }
                bc = null;
                aS = false
            };
            this.killFrame = function() {
                if (W.location !== W.top.location) {
                    W.top.location = W.location
                }
            };
            this.redirectFile = function(dC) {
                if (W.location.protocol === "file:") {
                    W.location = dC
                }
            };
            this.setCountPreRendered = function(dC) {
                bl = dC
            };
            this.trackGoal = function(dC, dF, dE, dD) {
                cr(function() {
                    c9(dC, dF, dE, dD)
                })
            };
            this.trackLink = function(dD, dC, dF, dE) {
                cr(function() {
                    dj(dD, dC, dF, dE)
                })
            };
            this.getNumTrackedPageViews = function() {
                return cE
            };
            this.trackPageView = function(dC, dE, dD) {
                ck = [];
                c1 = [];
                cG = [];
                if (R(cf)) {
                    cr(function() {
                        ad(aI, bQ, cf)
                    })
                } else {
                    cr(function() {
                        cE++;
                        b9(dC, dE, dD)
                    })
                }
            };
            this.disableBrowserFeatureDetection = function() {
                de = false
            };
            this.enableBrowserFeatureDetection = function() {
                de = true
            };
            this.trackAllContentImpressions = function() {
                if (R(cf)) {
                    return
                }
                cr(function() {
                    q(function() {
                        var dC = w.findContentNodes();
                        var dD = cP(dC);
                        bM.pushMultiple(dD)
                    })
                })
            };
            this.trackVisibleContentImpressions = function(dC, dD) {
                if (R(cf)) {
                    return
                }
                if (!M(dC)) {
                    dC = true
                }
                if (!M(dD)) {
                    dD = 750
                }
                aX(dC, dD, this);
                cr(function() {
                    n(function() {
                        var dE = w.findContentNodes();
                        var dF = bg(dE);
                        bM.pushMultiple(dF)
                    })
                })
            };
            this.trackContentImpression = function(dE, dC, dD) {
                if (R(cf)) {
                    return
                }
                dE = a(dE);
                dC = a(dC);
                dD = a(dD);
                if (!dE) {
                    return
                }
                dC = dC || "Unknown";
                cr(function() {
                    var dF = aK(dE, dC, dD);
                    bM.push(dF)
                })
            };
            this.trackContentImpressionsWithinNode = function(dC) {
                if (R(cf) || !dC) {
                    return
                }
                cr(function() {
                    if (cp) {
                        n(function() {
                            var dD = w.findContentNodesWithinNode(dC);
                            var dE = bg(dD);
                            bM.pushMultiple(dE)
                        })
                    } else {
                        q(function() {
                            var dD = w.findContentNodesWithinNode(dC);
                            var dE = cP(dD);
                            bM.pushMultiple(dE)
                        })
                    }
                })
            };
            this.trackContentInteraction = function(dE, dF, dC, dD) {
                if (R(cf)) {
                    return
                }
                dE = a(dE);
                dF = a(dF);
                dC = a(dC);
                dD = a(dD);
                if (!dE || !dF) {
                    return
                }
                dC = dC || "Unknown";
                cr(function() {
                    var dG = aU(dE, dF, dC, dD);
                    if (dG) {
                        bM.push(dG)
                    }
                })
            };
            this.trackContentInteractionNode = function(dE, dD) {
                if (R(cf) || !dE) {
                    return
                }
                var dC = null;
                cr(function() {
                    dC = du(dE, dD);
                    if (dC) {
                        bM.push(dC)
                    }
                });
                return dC
            };
            this.logAllContentBlocksOnPage = function() {
                var dE = w.findContentNodes();
                var dC = w.collectContent(dE);
                var dD = typeof console;
                if (dD !== "undefined" && console && console.log) {
                    console.log(dC)
                }
            };
            this.trackEvent = function(dD, dF, dC, dE, dH, dG) {
                cr(function() {
                    ax(dD, dF, dC, dE, dH, dG)
                })
            };
            this.trackSiteSearch = function(dC, dE, dD, dF) {
                ck = [];
                cr(function() {
                    ch(dC, dE, dD, dF)
                })
            };
            this.setEcommerceView = function(dG, dC, dE, dD) {
                cH = {};
                if (ac(dE)) {
                    dE = String(dE)
                }
                if (!M(dE) || dE === null || dE === false || !dE.length) {
                    dE = ""
                } else {
                    if (dE instanceof Array) {
                        dE = W.JSON.stringify(dE)
                    }
                }
                var dF = "_pkc";
                cH[dF] = dE;
                if (M(dD) && dD !== null && dD !== false && String(dD).length) {
                    dF = "_pkp";
                    cH[dF] = dD
                }
                if (!ac(dG) && !ac(dC)) {
                    return
                }
                if (ac(dG)) {
                    dF = "_pks";
                    cH[dF] = dG
                }
                if (!ac(dC)) {
                    dC = ""
                }
                dF = "_pkn";
                cH[dF] = dC
            };
            this.getEcommerceItems = function() {
                return JSON.parse(JSON.stringify(di))
            };
            this.addEcommerceItem = function(dG, dC, dE, dD, dF) {
                if (ac(dG)) {
                    di[dG] = [String(dG), dC, dE, dD, dF]
                }
            };
            this.removeEcommerceItem = function(dC) {
                if (ac(dC)) {
                    dC = String(dC);
                    delete di[dC]
                }
            };
            this.clearEcommerceCart = function() {
                di = {}
            };
            this.trackEcommerceOrder = function(dC, dG, dF, dE, dD, dH) {
                b7(dC, dG, dF, dE, dD, dH)
            };
            this.trackEcommerceCartUpdate = function(dC) {
                bB(dC)
            };
            this.trackRequest = function(dD, dF, dE, dC) {
                cr(function() {
                    var dG = cF(dD, dF, dC);
                    bO(dG, bS, dE)
                })
            };
            this.ping = function() {
                this.trackRequest("ping=1", null, null, "ping")
            };
            this.disableQueueRequest = function() {
                bM.enabled = false
            };
            this.setRequestQueueInterval = function(dC) {
                if (dC < 1000) {
                    throw new Error("Request queue interval needs to be at least 1000ms")
                }
                bM.interval = dC
            };
            this.queueRequest = function(dC) {
                cr(function() {
                    var dD = cF(dC);
                    bM.push(dD)
                })
            };
            this.isConsentRequired = function() {
                return cQ
            };
            this.getRememberedConsent = function() {
                var dC = aH(bk);
                if (aH(c2)) {
                    if (dC) {
                        b8(bk, by, df)
                    }
                    return null
                }
                if (!dC || dC === 0) {
                    return null
                }
                return dC
            };
            this.hasRememberedConsent = function() {
                return !!this.getRememberedConsent()
            };
            this.requireConsent = function() {
                cQ = true;
                bL = this.hasRememberedConsent();
                if (!bL) {
                    bt = true
                }
                y++;
                b["CoreConsent" + y] = {
                    unload: function() {
                        if (!bL) {
                            aJ()
                        }
                    }
                }
            };
            this.setConsentGiven = function(dD) {
                bL = true;
                de = true;
                b8(c2, by, df);
                var dE, dC;
                for (dE = 0; dE < c1.length; dE++) {
                    dC = typeof c1[dE];
                    if (dC === "string") {
                        bO(c1[dE], bS)
                    } else {
                        if (dC === "object") {
                            dy(c1[dE], bS)
                        }
                    }
                }
                c1 = [];
                if (!M(dD) || dD) {
                    this.setCookieConsentGiven()
                }
            };
            this.rememberConsentGiven = function(dE) {
                if (dE) {
                    dE = dE * 60 * 60 * 1000
                } else {
                    dE = 30 * 365 * 24 * 60 * 60 * 1000
                }
                var dC = true;
                this.setConsentGiven(dC);
                var dD = new Date().getTime();
                dx(bk, dD, dE, by, df, b1, aN)
            };
            this.forgetConsentGiven = function(dC) {
                if (dC) {
                    dC = dC * 60 * 60 * 1000
                } else {
                    dC = 30 * 365 * 24 * 60 * 60 * 1000
                }
                b8(bk, by, df);
                dx(c2, new Date().getTime(), dC, by, df, b1, aN);
                this.forgetCookieConsentGiven();
                this.requireConsent()
            };
            this.isUserOptedOut = function() {
                return !bL
            };
            this.optUserOut = this.forgetConsentGiven;
            this.forgetUserOptOut = function() {
                this.setConsentGiven(false)
            };
            n(function() {
                setTimeout(function() {
                    bN = true
                }, 0)
            });
            u.trigger("TrackerSetup", [this]);
            u.addPlugin("TrackerVisitorIdCookie" + aB, {
                unload: function() {
                    if (!aA) {
                        aR();
                        ds()
                    }
                }
            })
        }

        function K() {
            return {
                push: aj
            }
        }

        function c(ay, ax) {
            var az = {};
            var av, aw;
            for (av = 0; av < ax.length; av++) {
                var at = ax[av];
                az[at] = 1;
                for (aw = 0; aw < ay.length; aw++) {
                    if (ay[aw] && ay[aw][0]) {
                        var au = ay[aw][0];
                        if (at === au) {
                            aj(ay[aw]);
                            delete ay[aw];
                            if (az[au] > 1 && au !== "addTracker" && au !== "enableLinkTracking") {
                                ao("The method " + au + ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Matomo trackers documentation: https://developer.matomo.org/guides/tracking-javascript-guide#multiple-piwik-trackers')
                            }
                            az[au]++
                        }
                    }
                }
            }
            return ay
        }
        var E = ["addTracker", "forgetCookieConsentGiven", "requireCookieConsent", "disableBrowserFeatureDetection", "disableCookies", "setTrackerUrl", "setAPIUrl", "enableCrossDomainLinking", "setCrossDomainLinkingTimeout", "setSessionCookieTimeout", "setVisitorCookieTimeout", "setCookieNamePrefix", "setCookieSameSite", "setSecureCookie", "setCookiePath", "setCookieDomain", "setDomains", "setUserId", "setVisitorId", "setSiteId", "alwaysUseSendBeacon", "disableAlwaysUseSendBeacon", "enableLinkTracking", "setCookieConsentGiven", "requireConsent", "setConsentGiven", "disablePerformanceTracking", "setPagePerformanceTiming", "setExcludedQueryParams", "setExcludedReferrers"];

        function ah(av, au) {
            var at = new T(av, au);
            L.push(at);
            _paq = c(_paq, E);
            for (H = 0; H < _paq.length; H++) {
                if (_paq[H]) {
                    aj(_paq[H])
                }
            }
            _paq = new K();
            u.trigger("TrackerAdded", [at]);
            return at
        }
        ar(W, "beforeunload", am, false);
        ar(W, "visibilitychange", function() {
            if (m) {
                return
            }
            if (J.visibilityState === "hidden") {
                ag("unload")
            }
        }, false);
        ar(W, "online", function() {
            if (M(g.serviceWorker)) {
                g.serviceWorker.ready.then(function(at) {
                    if (at && at.sync) {
                        return at.sync.register("matomoSync")
                    }
                }, function() {})
            }
        }, false);
        ar(W, "message", function(ay) {
            if (!ay || !ay.origin) {
                return
            }
            var aA, aw, au;
            var aB = d(ay.origin);
            var ax = u.getAsyncTrackers();
            for (aw = 0; aw < ax.length; aw++) {
                au = d(ax[aw].getMatomoUrl());
                if (au === aB) {
                    aA = ax[aw];
                    break
                }
            }
            if (!aA) {
                return
            }
            var av = null;
            try {
                av = JSON.parse(ay.data)
            } catch (az) {
                return
            }
            if (!av) {
                return
            }

            function at(aE) {
                var aG = J.getElementsByTagName("iframe");
                for (aw = 0; aw < aG.length; aw++) {
                    var aF = aG[aw];
                    var aC = d(aF.src);
                    if (aF.contentWindow && M(aF.contentWindow.postMessage) && aC === aB) {
                        var aD = JSON.stringify(aE);
                        aF.contentWindow.postMessage(aD, ay.origin)
                    }
                }
            }
            if (M(av.maq_initial_value)) {
                at({
                    maq_opted_in: av.maq_initial_value && aA.hasConsent(),
                    maq_url: aA.getMatomoUrl(),
                    maq_optout_by_default: aA.isConsentRequired()
                })
            } else {
                if (M(av.maq_opted_in)) {
                    ax = u.getAsyncTrackers();
                    for (aw = 0; aw < ax.length; aw++) {
                        aA = ax[aw];
                        if (av.maq_opted_in) {
                            aA.rememberConsentGiven()
                        } else {
                            aA.forgetConsentGiven()
                        }
                    }
                    at({
                        maq_confirm_opted_in: aA.hasConsent(),
                        maq_url: aA.getMatomoUrl(),
                        maq_optout_by_default: aA.isConsentRequired()
                    })
                }
            }
        }, false);
        Date.prototype.getTimeAlias = Date.prototype.getTime;
        u = {
            initialized: false,
            JSON: W.JSON,
            DOM: {
                addEventListener: function(aw, av, au, at) {
                    var ax = typeof at;
                    if (ax === "undefined") {
                        at = false
                    }
                    ar(aw, av, au, at)
                },
                onLoad: n,
                onReady: q,
                isNodeVisible: i,
                isOrWasNodeVisible: w.isNodeVisible
            },
            on: function(au, at) {
                if (!z[au]) {
                    z[au] = []
                }
                z[au].push(at)
            },
            off: function(av, au) {
                if (!z[av]) {
                    return
                }
                var at = 0;
                for (at; at < z[av].length; at++) {
                    if (z[av][at] === au) {
                        z[av].splice(at, 1)
                    }
                }
            },
            trigger: function(av, aw, au) {
                if (!z[av]) {
                    return
                }
                var at = 0;
                for (at; at < z[av].length; at++) {
                    z[av][at].apply(au || W, aw)
                }
            },
            addPlugin: function(at, au) {
                b[at] = au
            },
            getTracker: function(au, at) {
                if (!M(at)) {
                    at = this.getAsyncTracker().getSiteId()
                }
                if (!M(au)) {
                    au = this.getAsyncTracker().getTrackerUrl()
                }
                return new T(au, at)
            },
            getAsyncTrackers: function() {
                return L
            },
            addTracker: function(av, au) {
                var at;
                if (!L.length) {
                    at = ah(av, au)
                } else {
                    at = L[0].addTracker(av, au)
                }
                return at
            },
            getAsyncTracker: function(ax, aw) {
                var av;
                if (L && L.length && L[0]) {
                    av = L[0]
                } else {
                    return ah(ax, aw)
                }
                if (!aw && !ax) {
                    return av
                }
                if ((!M(aw) || null === aw) && av) {
                    aw = av.getSiteId()
                }
                if ((!M(ax) || null === ax) && av) {
                    ax = av.getTrackerUrl()
                }
                var au, at = 0;
                for (at; at < L.length; at++) {
                    au = L[at];
                    if (au && String(au.getSiteId()) === String(aw) && au.getTrackerUrl() === ax) {
                        return au
                    }
                }
            },
            retryMissedPluginCalls: function() {
                var au = al;
                al = [];
                var at = 0;
                for (at; at < au.length; at++) {
                    aj(au[at])
                }
            }
        };
        if (typeof define === "function" && define.amd) {
            define("piwik", [], function() {
                return u
            });
            define("matomo", [], function() {
                return u
            })
        }
        return u
    }())
}
/*!!! pluginTrackerHook */

/* GENERATED: tracker.min.js */
/*!!
 * Copyright (C) InnoCraft Ltd - All rights reserved.
 *
 * All information contained herein is, and remains the property of InnoCraft Ltd.
 *
 * @link https://www.innocraft.com/
 * @license For license details see https://www.innocraft.com/license
 */
(function() {
    var x = new Date().getTime();
    var D = null;
    var U = false;
    var F = 10;
    var O = false;
    var a = true;
    var A = null;
    var I = 1000 * 60 * 60 * 3;
    var t = document;
    var G = window;
    var i = 0;
    var o = 0;
    var E = false;
    var d = {
        play: 50,
        pause: 25,
        resume: 25,
        finish: 50,
        seek: 50
    };
    var M = function() {
        return {
            play: 0,
            pause: 0,
            resume: 0,
            finish: 0,
            seek: 0
        }
    };
    var m = {
        play: 50,
        pause: 100,
        resume: 100,
        finish: 50,
        seek: 100
    };
    var j = 25;
    var y = true;
    var u = function() {
        return ""
    };
    var K = [];

    function q() {
        if (typeof Piwik === "object" && typeof Piwik.JSON === "object") {
            return Piwik.JSON
        } else {
            if (G.JSON && G.JSON.parse && G.JSON.stringify) {
                return G.JSON
            } else {
                if (typeof G.JSON2 === "object" && G.JSON2.parse && G.JSON2.stringify) {
                    return G.JSON2
                } else {
                    return {
                        parse: function() {
                            return {}
                        },
                        stringify: function() {
                            return ""
                        }
                    }
                }
            }
        }
    }
    var e = true;

    function f() {
        if (U && "undefined" !== typeof console && console && console.debug) {
            console.debug.apply(console, arguments)
        }
    }

    function v(W) {
        return typeof W === "object" && typeof W.length === "number"
    }

    function N() {
        return t.getElementById("engage_video") && t.getElementById("videoDisplay1_wrapper")
    }

    function b() {
        return "function" === typeof jwplayer
    }

    function n() {
        return "function" === typeof flowplayer
    }

    function r(Y, X) {
        if (!X.getMediaTitle() && "function" === typeof u) {
            var W = u(Y);
            if (W) {
                X.setMediaTitle(W)
            }
        }
    }
    var g = {
        AUDIO: "Audio",
        VIDEO: "Video"
    };
    var J = {
        getLocation: function() {
            var W = this.location || G.location;
            if (!W.origin) {
                W.origin = W.protocol + "//" + W.hostname + (W.port ? ":" + W.port : "")
            }
            return W
        },
        setLocation: function(W) {
            this.location = W
        },
        makeUrlAbsolute: function(X) {
            if ((!X || String(X) !== X) && X !== "") {
                return X
            }
            if (X.indexOf("//") === 0) {
                return this.getLocation().protocol + X
            }
            if (X.indexOf("://") !== -1) {
                return X
            }
            if (X.indexOf("/") === 0) {
                return this.getLocation().origin + X
            }
            if (X.indexOf("#") === 0 || X.indexOf("?") === 0) {
                return this.getLocation().origin + this.getLocation().pathname + X
            }
            if ("" === X) {
                return this.getLocation().href
            }
            var W = "(.*/)";
            var Y = this.getLocation().origin + this.getLocation().pathname.match(new RegExp(W))[0];
            return Y + X
        }
    };
    var T = {
        getCurrentTime: function() {
            return new Date().getTime()
        },
        roundTimeToSeconds: function(W) {
            return Math.round(W / 1000)
        },
        isNumber: function(W) {
            return !isNaN(W)
        },
        isArray: function(W) {
            return typeof W === "object" && W !== null && typeof W.length === "number"
        },
        indexOfArray: function(Y, X) {
            if (!Y) {
                return -1
            }
            if (Y.indexOf) {
                return Y.indexOf(X)
            }
            if (!this.isArray(Y)) {
                return -1
            }
            for (var W = 0; W < Y.length; W++) {
                if (Y[W] === X) {
                    return W
                }
            }
            return -1
        },
        getTimeScriptLoaded: function(W) {
            return x
        },
        generateUniqueId: function() {
            var Z = "";
            var X = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var Y = X.length;
            for (var W = 0; W < 6; W++) {
                Z += X.charAt(Math.floor(Math.random() * Y))
            }
            return Z
        },
        trim: function(W) {
            if (W && String(W) === W) {
                return W.replace(/^\s+|\s+$/g, "")
            }
            return W
        },
        getQueryParameter: function(W, aa) {
            var Z = new RegExp("[?&]" + aa + "(=([^&#]*)|&|#|$)");
            var Y = Z.exec(W);
            if (!Y) {
                return null
            }
            if (!Y[2]) {
                return ""
            }
            var X = Y[2].replace(/\+/g, " ");
            return decodeURIComponent(X)
        },
        isDocumentOffScreen: function() {
            return t && "undefined" !== t.hidden && t.hidden
        },
        roundUp: function(X, W) {
            if (X !== null && X !== false && this.isNumber(X)) {
                return Math.ceil(X / W) * W
            }
        }
    };
    var p = {
        getAttribute: function(X, W) {
            if (X && X.getAttribute && W) {
                return X.getAttribute(W)
            }
            return null
        },
        setAttribute: function(Y, W, X) {
            if (Y && Y.setAttribute) {
                Y.setAttribute(W, X)
            }
        },
        isMediaIgnored: function(W) {
            var X = p.getAttribute(W, "data-piwik-ignore");
            if (!!X || X === "") {
                return true
            }
            X = p.getAttribute(W, "data-matomo-ignore");
            if (!!X || X === "") {
                return true
            }
            return false
        },
        getMediaResource: function(W, X) {
            var Y = p.getAttribute(W, "data-matomo-resource");
            if (Y) {
                return Y
            }
            Y = p.getAttribute(W, "data-piwik-resource");
            if (Y) {
                return Y
            }
            Y = p.getAttribute(W, "src");
            if (Y) {
                return Y
            }
            return X
        },
        getMediaTitle: function(W) {
            var X = p.getAttribute(W, "data-matomo-title");
            if (!X) {
                X = p.getAttribute(W, "data-piwik-title")
            }
            if (!X) {
                X = p.getAttribute(W, "title")
            }
            if (!X) {
                X = p.getAttribute(W, "alt")
            }
            return X
        },
        hasCssClass: function(Y, Z) {
            if (Y && Y.className) {
                var X = ("" + Y.className).split(" ");
                for (var W = 0; W < X.length; W++) {
                    if (X[W] === Z) {
                        return true
                    }
                }
            }
            return false
        },
        getFirstParentWithClass: function(Y, Z, W) {
            if (W <= 0 || !Y || !Y.parentNode) {
                return null
            }
            var X = Y.parentNode;
            if (this.hasCssClass(X, Z)) {
                return X
            } else {
                return this.getFirstParentWithClass(X, Z, --W)
            }
        },
        isFullscreen: function(W) {
            if (W && t.fullScreenElement === W || t.mozFullScreenElement === W || t.webkitFullscreenElement === W || t.msFullscreenElement === W) {
                return true
            }
            return false
        }
    };

    function V() {
        if (null === A) {
            if ("object" === typeof Piwik && Piwik.getAsyncTrackers) {
                return Piwik.getAsyncTrackers()
            }
        }
        if (v(A)) {
            return A
        }
        return []
    }

    function l(X, W, Y) {
        this.playerName = X;
        this.type = W;
        this.resource = Y;
        this.disabled = false;
        this.reset()
    }
    l.piwikTrackers = [];
    l.prototype.disable = function() {
        this.disabled = true
    };
    l.prototype.reset = function() {
        this.id = T.generateUniqueId();
        this.mediaTitle = null;
        this.timeToInitialPlay = null;
        this.width = null;
        this.height = null;
        this.fullscreen = false;
        this.timeout = null;
        this.watchedTime = 0;
        this.lastTimeCheck = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.mediaProgressInSeconds = 0;
        this.mediaLengthInSeconds = 0;
        this.disabled = false;
        this.numPlaysSameMedia = 0;
        this.numPlaysSameMediaOffScreen = 0;
        this.viewedSegments = [];
        this.trackedSegments = [];
        this.lastSentProgressRequestUrl = ""
    };
    l.prototype.setResource = function(W) {
        this.resource = W
    };
    l.prototype.getResource = function() {
        return this.resource
    };
    l.prototype.makeRequestUrlFromParams = function(Y) {
        var X = "";
        for (var W in Y) {
            if (Object.prototype.hasOwnProperty.call(Y, W)) {
                X += W + "=" + encodeURIComponent(Y[W]) + "&"
            }
        }
        return X
    };
    l.prototype.trackEvent = function(ac) {
        if (this.disabled) {
            return
        }
        if (!D) {
            D = T.getCurrentTime()
        } else {
            if ((T.getCurrentTime() - D) > I) {
                this.disable();
                return
            }
        }
        var W = V();
        var X = "Media" + this.type;
        var Z = this.mediaTitle || this.resource;
        var aa = this.makeRequestUrlFromParams({
            e_c: X,
            e_a: ac,
            e_n: Z,
            e_v: parseInt(Math.round(this.mediaProgressInSeconds), 10),
            ca: "1"
        });
        if (W && W.length) {
            var Y = 0,
                ab;
            for (Y; Y < W.length; Y++) {
                ab = W[Y];
                if (ab && ab.MediaAnalytics && ab.MediaAnalytics.isTrackEventsEnabled()) {
                    if (L.isEventsLimitReached(ab, Z, ac, this.mediaLengthInSeconds)) {
                        f("Event limit reached for event: " + ac);
                        continue
                    }
                    if ("function" === typeof ab.queueRequest && "function" === typeof ab.disableQueueRequest) {
                        ab.queueRequest(aa)
                    } else {
                        ab.trackRequest(aa)
                    }
                    L.incrLimitPerTrackerPerMediaResource(ab, Z, ac)
                }
            }
        } else {
            if (typeof G._paq === "undefined") {
                G._paq = []
            }
            G._paq.push(["trackRequest", aa]);
            f("piwikWasNotYetInitialized. This means players were scanning too early for media or there are no async trackers")
        }
        f("trackEvent", X, Z, ac)
    };
    l.prototype.trackProgress = function(aa, ac, ab, X, Y, ae, an, af, ak, ag, ad, W, ai) {
        if (this.disabled) {
            return
        }
        if (!D) {
            D = T.getCurrentTime()
        } else {
            if ((T.getCurrentTime() - D) > I) {
                this.disable();
                return
            }
        }
        if (this.isPlaying && !ae) {
            ae = 1
        }
        var am = {
            ma_id: aa,
            ma_ti: ac !== null ? ac : "",
            ma_pn: ab,
            ma_mt: X,
            ma_re: Y,
            ma_st: parseInt(Math.floor(ae), 10),
            ma_ps: parseInt(an, 10),
            ma_le: af,
            ma_ttp: ak !== null ? ak : "",
            ma_w: ag ? ag : "",
            ma_h: ad ? ad : "",
            ma_fs: W ? "1" : "0",
            ma_se: ai.join(","),
            ca: "1"
        };
        var ah = this.makeRequestUrlFromParams(am);
        if (ah === this.lastSentProgressRequestUrl) {
            return
        }
        this.lastSentProgressRequestUrl = ah;
        var al = V();
        if (al && al.length) {
            var aj = 0,
                Z;
            for (aj; aj < al.length; aj++) {
                Z = al[aj];
                if (Z && Z.MediaAnalytics && Z.MediaAnalytics.isTrackProgressEnabled()) {
                    if ("function" === typeof Z.queueRequest && "function" === typeof Z.disableQueueRequest) {
                        Z.queueRequest(ah)
                    } else {
                        Z.trackRequest(ah)
                    }
                }
            }
        } else {
            if (typeof G._paq === "undefined") {
                G._paq = []
            }
            G._paq.push(["trackRequest", ah]);
            f("piwikWasNotYetInitialized. This means players were scanning too early for media or there are no async trackers")
        }
        if (U) {
            f("trackProgress", q().stringify(am))
        }
    };
    l.prototype.setFullscreen = function(W) {
        if (!this.fullscreen) {
            this.fullscreen = !!W
        }
    };
    l.prototype.setWidth = function(W) {
        if (T.isNumber(W)) {
            this.width = parseInt(W, 10)
        }
    };
    l.prototype.setHeight = function(W) {
        if (T.isNumber(W)) {
            this.height = parseInt(W, 10)
        }
    };
    l.prototype.setMediaTitle = function(W) {
        this.mediaTitle = W
    };
    l.prototype.getMediaTitle = function() {
        return this.mediaTitle
    };
    l.prototype.setMediaProgressInSeconds = function(W) {
        this.mediaProgressInSeconds = W;
        if (this.isPlaying) {
            this.viewedSegments.push(W)
        }
    };
    l.prototype.getMediaProgressInSeconds = function() {
        return this.mediaProgressInSeconds
    };
    l.prototype.setMediaTotalLengthInSeconds = function(W) {
        this.mediaLengthInSeconds = W
    };
    l.prototype.getMediaTotalLengthInSeconds = function() {
        return this.mediaLengthInSeconds
    };
    l.prototype.play = function() {
        if (this.isPlaying) {
            return
        }
        this.isPlaying = true;
        this.setMediaProgressInSeconds(this.getMediaProgressInSeconds());
        this.startWatchedTime();
        if (e && this.timeToInitialPlay === null) {
            this.timeToInitialPlay = T.roundTimeToSeconds(T.getCurrentTime() - T.getTimeScriptLoaded())
        }
        e = false;
        if (this.isPaused) {
            this.isPaused = false;
            this.trackEvent("resume")
        } else {
            this.trackEvent("play");
            var W = T.isDocumentOffScreen();
            this.numPlaysSameMedia++;
            i++;
            if (W) {
                this.numPlaysSameMediaOffScreen++;
                o++
            }
            if (this.numPlaysSameMedia > 25 || i > 50) {
                this.disable()
            } else {
                if (this.numPlaysSameMediaOffScreen > 10 || o > 15) {
                    this.disable()
                }
            }
        }
        this.trackUpdate()
    };
    l.prototype.startWatchedTime = function() {
        this.lastTimeCheck = T.getCurrentTime()
    };
    l.prototype.stopWatchedTime = function() {
        if (this.lastTimeCheck) {
            this.watchedTime += T.getCurrentTime() - this.lastTimeCheck;
            this.lastTimeCheck = null
        }
    };
    l.prototype.seekStart = function() {
        if (this.isPlaying) {
            this.stopWatchedTime()
        }
    };
    l.prototype.seekFinish = function() {
        if (this.isPlaying) {
            this.startWatchedTime()
        }
    };
    l.prototype.pause = function() {
        if (this.isPlaying) {
            this.isPaused = true;
            this.isPlaying = false;
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null
            }
            this.stopWatchedTime();
            this.trackUpdate();
            this.trackEvent("pause")
        }
    };
    l.prototype.finish = function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null
        }
        this.stopWatchedTime();
        this.trackUpdate();
        this.trackEvent("finish");
        this.id = T.generateUniqueId();
        this.timeToInitialPlay = null;
        this.lastTimeCheck = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.watchedTime = 0;
        this.mediaProgressInSeconds = 0
    };
    l.prototype.trackUpdate = function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null
        }
        var W = T.getCurrentTime();
        if (this.lastTimeCheck) {
            this.watchedTime += (W - this.lastTimeCheck);
            this.lastTimeCheck = W
        }
        var ac = this.mediaLengthInSeconds;
        if (!ac || !T.isNumber(ac)) {
            ac = ""
        } else {
            ac = parseInt(this.mediaLengthInSeconds, 10)
        }
        var Z = T.roundTimeToSeconds(this.watchedTime);
        var aa = this.mediaProgressInSeconds;
        if (aa > ac && ac) {
            aa = ac
        }
        var X = [];
        var Y, ab;
        for (Y = 0; Y < this.viewedSegments.length; Y++) {
            ab = this.viewedSegments[Y];
            if (ab >= 0 && ab <= ac) {
                if (ab <= 300) {
                    ab = T.roundUp(ab, 15)
                } else {
                    ab = T.roundUp(ab, 30)
                }
                if (ab >= 0 && ab < 1) {
                    ab = 15
                }
                if (-1 === T.indexOfArray(X, ab) && -1 === T.indexOfArray(this.trackedSegments, ab)) {
                    X.push(ab);
                    this.trackedSegments.push(ab)
                }
            }
        }
        this.viewedSegments = [];
        this.trackProgress(this.id, this.mediaTitle, this.playerName, this.type, this.resource, Z, aa, ac, this.timeToInitialPlay, this.width, this.height, this.fullscreen, X)
    };
    l.prototype.update = function() {
        if (this.timeout) {
            return
        }
        var Y = T.roundTimeToSeconds(this.watchedTime);
        var X = F;
        if (!O && (Y >= 1800 || i > 10)) {
            X = 300
        } else {
            if (!O && (Y >= 600 || i > 4)) {
                X = 240
            } else {
                if (!O && (Y >= 300 || i > 2)) {
                    X = 120
                } else {
                    if (!O && Y >= 60) {
                        X = 60
                    }
                }
            }
        }
        X = X * 1000;
        var W = this;
        this.timeout = setTimeout(function() {
            W.trackUpdate();
            W.timeout = null
        }, X)
    };
    var L = {
        isEventsLimitReached: function(Z, X, Y, W) {
            if (!y) {
                return false
            }
            if (L.getTotalEventsOnTracker(Z, Y) >= L.getTotalAllowedEventsPerTracker(Y)) {
                f("blocked due to max tracker limit reached for action: " + Y);
                return true
            }
            var aa = (W && W > 900 && (Y === "pause" || Y === "resume")) ? 2 : 1;
            L.initializeLimitPerTrackerPerMediaResource(Z, X, Y);
            return (Z.MediaAnalytics.quotaEventRequests[X][Y] > (d[Y] * aa))
        },
        getTotalEventsOnTracker: function(Z, Y) {
            var X = 0;
            if (typeof Z.MediaAnalytics.quotaEventRequests === "undefined") {
                Z.MediaAnalytics.quotaEventRequests = {};
                return X
            }
            if (Object.keys(Z.MediaAnalytics.quotaEventRequests).length) {
                for (var W in Z.MediaAnalytics.quotaEventRequests) {
                    X = X + (Z.MediaAnalytics.quotaEventRequests[W][Y] || 0)
                }
            }
            return X
        },
        getTotalAllowedEventsPerTracker: function(W) {
            return (m[W] || j)
        },
        initializeLimitPerTrackerPerMediaResource: function(Y, W, X) {
            if (typeof Y.MediaAnalytics.quotaEventRequests === "undefined") {
                Y.MediaAnalytics.quotaEventRequests = {}
            }
            if (typeof Y.MediaAnalytics.quotaEventRequests[W] === "undefined") {
                Y.MediaAnalytics.quotaEventRequests[W] = M()
            }
            if (typeof Y.MediaAnalytics.quotaEventRequests[W][X] === "undefined") {
                Y.MediaAnalytics.quotaEventRequests[W][X] = 0
            }
        },
        incrLimitPerTrackerPerMediaResource: function(Y, W, X) {
            if (!y) {
                return
            }
            L.initializeLimitPerTrackerPerMediaResource(Y, W, X);
            Y.MediaAnalytics.quotaEventRequests[W][X]++
        }
    };
    var c = {
        players: {},
        registerPlayer: function(W, X) {
            if (!X || !X.scanForMedia || "function" !== typeof X.scanForMedia) {
                throw new Error("A registered player does not implement the scanForMedia function")
            }
            W = W.toLowerCase();
            this.players[W] = X
        },
        removePlayer: function(W) {
            W = W.toLowerCase();
            delete this.players[W]
        },
        getPlayer: function(W) {
            W = W.toLowerCase();
            if (W in this.players) {
                return this.players[W]
            }
            return null
        },
        getPlayers: function() {
            return this.players
        },
        scanForMedia: function(X) {
            if (!a) {
                return
            }
            if ("undefined" === typeof X || !X) {
                X = document
            }
            var W;
            for (W in this.players) {
                if (Object.prototype.hasOwnProperty.call(this.players, W)) {
                    this.players[W].scanForMedia(X)
                }
            }
        }
    };
    var S = function(ah, Y) {
        if (!ah) {
            return
        }
        if (!G.addEventListener) {
            return
        }
        if (ah.hasPlayerInstance) {
            return
        }
        ah.hasPlayerInstance = true;
        var am = g.VIDEO === Y;
        var ab = J.makeUrlAbsolute(ah.currentSrc);
        var W = p.getMediaResource(ah, ab);
        var ac = "html5" + Y.toLowerCase();
        if (typeof paella === "object" && typeof paella.opencast === "object") {
            ac = "paella-opencast"
        } else {
            if (p.getFirstParentWithClass(ah, "video-js", 1)) {
                ac = "video.js"
            } else {
                if (p.hasCssClass(ah, "jw-video")) {
                    ac = "jwplayer"
                } else {
                    if (p.getFirstParentWithClass(ah, "flowplayer", 3)) {
                        ac = "flowplayer"
                    }
                }
            }
        }
        var aa = new l(ac, Y, W);
        K.push(aa);

        function X() {
            if (ah.duration) {
                aa.setMediaTotalLengthInSeconds(ah.duration)
            }
        }

        function ad() {
            if (am) {
                var at = ah;
                if (ac === "jwplayer") {
                    var ar = p.getFirstParentWithClass(at, "jwplayer");
                    if (ar) {
                        at = ar
                    }
                }
                if ("undefined" !== typeof at.videoWidth && at.videoWidth) {
                    aa.setWidth(at.videoWidth)
                } else {
                    if ("undefined" !== typeof at.clientWidth && at.clientWidth) {
                        aa.setWidth(at.clientWidth)
                    }
                }
                if ("undefined" !== typeof at.videoHeight && at.videoHeight) {
                    aa.setHeight(at.videoHeight)
                } else {
                    if ("undefined" !== typeof at.clientHeight && at.clientHeight) {
                        aa.setHeight(at.clientHeight)
                    }
                }
                aa.setFullscreen(p.isFullscreen(at))
            }
        }

        function ae() {
            aa.setMediaProgressInSeconds(ah.currentTime)
        }

        function an() {
            var ar = p.getMediaTitle(ah);
            if (ar) {
                aa.setMediaTitle(ar)
            } else {
                aj(ah, aa)
            }
        }
        aq(ah, aa);
        ad();
        an();
        X();
        ae();
        var Z = false;
        var af = false;
        var ag = null;
        if (ah.currentSrc) {
            ag = ah.currentSrc
        }

        function aj(au, ay) {
            if (b() && !ay.getMediaTitle()) {
                var aw = p.getFirstParentWithClass(au, "jwplayer", 3);
                if (!aw) {
                    aw = p.getFirstParentWithClass(au, "jwplayer-video", 3);
                    if (aw && "undefined" !== typeof aw.children && aw.children && aw.children.length && aw.children[0]) {
                        aw = aw.children[0]
                    }
                }
                if (aw) {
                    try {
                        var az = jwplayer(aw);
                        if (az && az.getPlaylistItem) {
                            var aA = az.getPlaylistItem();
                            if (aA && aA.matomoTitle) {
                                ay.setMediaTitle(aA.matomoTitle)
                            } else {
                                if (aA && aA.piwikTitle) {
                                    ay.setMediaTitle(aA.piwikTitle)
                                } else {
                                    if (aA && aA.title) {
                                        ay.setMediaTitle(aA.title)
                                    }
                                }
                            }
                        }
                    } catch (av) {
                        f(av)
                    }
                }
            }
            if (n() && !ay.getMediaTitle()) {
                var ar = p.getFirstParentWithClass(au, "flowplayer", 4);
                if (ar) {
                    var az = flowplayer(ar);
                    if (az && az.video && az.video.matomoTitle) {
                        ay.setMediaTitle(az.video.matomoTitle)
                    } else {
                        if (az && az.video && az.video.piwikTitle) {
                            ay.setMediaTitle(az.video.piwikTitle)
                        } else {
                            if (az && az.video && az.video.title) {
                                ay.setMediaTitle(az.video.title)
                            } else {
                                if (az && az.video && az.video.fv_title) {
                                    ay.setMediaTitle(az.video.fv_title)
                                }
                            }
                        }
                    }
                }
            }
            if (!ay.getMediaTitle()) {
                var at = t.getElementById("engage_basic_description_title");
                if (at && at.innerText) {
                    var ax = T.trim(at.innerText);
                    if (ax) {
                        ay.setMediaTitle(ax)
                    }
                } else {
                    if (typeof paella === "object" && typeof paella.opencast === "object" && typeof paella.opencast._episode === "object" && paella.opencast._episode.dcTitle) {
                        var ax = T.trim(paella.opencast._episode.dcTitle);
                        if (ax) {
                            ay.setMediaTitle(ax)
                        }
                    }
                }
            }
            r(au, ay)
        }

        function aq(aw, av) {
            if (b()) {
                var ay = p.getFirstParentWithClass(aw, "jwplayer", 3);
                if (!ay) {
                    ay = p.getFirstParentWithClass(aw, "jwplayer-video", 3);
                    if (ay && "undefined" !== typeof ay.children && ay.children && ay.children.length && ay.children[0]) {
                        ay = ay.children[0]
                    }
                }
                if (ay) {
                    try {
                        var at = jwplayer(ay);
                        if (at && at.getPlaylistItem) {
                            var au = at.getPlaylistItem();
                            if (au && "undefined" !== typeof au.matomoResource && au.matomoResource) {
                                av.setResource(au.matomoResource)
                            } else {
                                if (au && "undefined" !== typeof au.piwikResource && au.piwikResource) {
                                    av.setResource(au.piwikResource)
                                }
                            }
                        }
                    } catch (ax) {
                        f(ax)
                    }
                }
            }
            if (n()) {
                var ar = p.getFirstParentWithClass(aw, "flowplayer", 4);
                if (ar) {
                    var at = flowplayer(ar);
                    if (at && at.video && "undefined" !== typeof at.video.matomoResource && at.video.matomoResource) {
                        av.setResource(at.video.matomoResource)
                    } else {
                        if (at && at.video && "undefined" !== typeof at.video.piwikResource && at.video.piwikResource) {
                            av.setResource(at.video.piwikResource)
                        }
                    }
                }
            }
        }

        function ai() {
            if (!ag && ah.currentSrc) {
                ag = ah.currentSrc
            } else {
                if (ag && ah.currentSrc && ag != ah.currentSrc) {
                    ag = ah.currentSrc;
                    var at = J.makeUrlAbsolute(ag);
                    var ar = aa.getMediaTitle();
                    Z = false;
                    aa.reset();
                    aa.setResource(at);
                    aa.setMediaTitle("");
                    var au = p.getMediaTitle(ah);
                    if (au && au !== ar) {
                        aa.setMediaTitle(au)
                    } else {
                        aj(ah, aa)
                    }
                    aq(ah, aa);
                    X()
                }
            }
        }

        function ap() {
            if (!af && (aa.getResource() || aa.getMediaTitle())) {
                af = true;
                an(ah, aa);
                aq(ah, aa);
                aa.trackUpdate()
            }
        }

        function ak() {
            ai();
            ad();
            X();
            ae();
            ap()
        }
        var al = null;
        if (ah.loop) {
            al = 0
        }
        var ao = false;
        if (ah.loop && ah.autoplay && ah.muted) {
            ao = true
        }
        ah.addEventListener("playing", function() {
            ai();
            if ("undefined" !== typeof ah.paused && ah.paused) {
                return
            }
            if ("undefined" !== typeof ah.ended && ah.ended) {
                return
            }
            if (!Z) {
                ae();
                Z = true;
                aa.play()
            }
        }, true);
        ah.addEventListener("durationchange", X, true);
        ah.addEventListener("loadedmetadata", ak, true);
        ah.addEventListener("loadeddata", ak, true);
        ah.addEventListener("pause", function() {
            if (ah.currentTime && ah.duration && ah.currentTime === ah.duration) {
                return
            }
            if (ah.seeking) {
                return
            }
            ae();
            Z = false;
            aa.pause()
        }, true);
        ah.addEventListener("seeking", function() {
            if (ah.seeking) {
                ae();
                var ar = parseInt(aa.getMediaProgressInSeconds(), 10);
                if (al === null || al !== ar) {
                    al = ar;
                    aa.trackEvent("seek")
                }
            }
        }, true);
        ah.addEventListener("ended", function() {
            Z = false;
            aa.finish()
        }, true);
        ah.addEventListener("timeupdate", function() {
            ae();
            X();
            if (am && !aa.width) {
                ad()
            }
            if ("undefined" !== typeof ah.paused && ah.paused) {
                return
            }
            if ("undefined" !== typeof ah.ended && ah.ended) {
                return
            }
            if (ao) {
                var ar = T.roundTimeToSeconds(aa.watchedTime);
                var at = aa.getMediaTotalLengthInSeconds();
                if (ar >= 30 && at >= 1 && at < 30 && (ar / at) >= 3) {
                    aa.disable()
                }
            }
            af = true;
            if (!Z) {
                Z = true;
                aa.play()
            } else {
                aa.update()
            }
        }, true);
        ah.addEventListener("seeking", function() {
            aa.seekStart()
        }, true);
        ah.addEventListener("seeked", function() {
            ae();
            X();
            aa.seekFinish()
        }, true);
        if (am) {
            ah.addEventListener("resize", ak, true);
            G.addEventListener("resize", function() {
                ad()
            }, false)
        }
        aa.timeout = setTimeout(function() {
            ak();
            aa.timeout = null
        }, 1500)
    };
    S.scanForMedia = function(Z) {
        if (!G.addEventListener) {
            return
        }
        var aa = N();
        var ad = Z.getElementsByTagName("video");
        var X;
        for (var Y = 0; Y < ad.length; Y++) {
            if (!p.isMediaIgnored(ad[Y])) {
                X = p.getAttribute(ad[Y], "id");
                if (aa) {
                    var ab = Z.querySelector("#videoDisplay1_wrapper");
                    if (ab && ("function" === typeof ab.contains) && !ab.contains(ad[Y])) {
                        continue
                    }
                }
                if (X !== "video_0" && Z.querySelector("#videoPlayerWrapper_0") && Z.querySelector("#video_0")) {
                    continue
                }
                new S(ad[Y], g.VIDEO)
            }
        }
        ad = null;
        var W = Z.getElementsByTagName("audio");
        for (var Y = 0; Y < W.length; Y++) {
            if (!p.isMediaIgnored(W[Y])) {
                new S(W[Y], g.AUDIO)
            }
        }
        W = null;
        if ("undefined" !== typeof soundManager && soundManager && "undefined" !== typeof soundManager.sounds) {
            for (var Y in soundManager.sounds) {
                if (Object.prototype.hasOwnProperty.call(soundManager.sounds, Y)) {
                    var ac = soundManager.sounds[Y];
                    if (ac && ac.isHTML5 && ac._a) {
                        if (!p.isMediaIgnored(ac._a)) {
                            new S(ac._a, g.AUDIO)
                        }
                    }
                }
            }
        }
    };
    var P = function(Y, ae) {
        if (!Y || !G.addEventListener) {
            return
        }
        if (Y.hasPlayerInstance || !b()) {
            return
        }
        var af = p.getFirstParentWithClass(Y, "jwplayer", 3);
        if (!af) {
            return
        }
        var aj = jwplayer(af);
        if (!aj || !aj.getItem || "undefined" === (typeof aj.getItem())) {
            return
        }
        Y.hasPlayerInstance = true;

        function ag(al) {
            var am = al.getPlaylistItem();
            if (am && am.matomoResource) {
                return am.matomoResource
            }
            if (am && am.piwikResource) {
                return am.piwikResource
            }
            if (am && am.file) {
                return am.file
            }
            return ""
        }

        function X(am) {
            var an = am.getPlaylistItem();
            if (an && an.matomoTitle) {
                return an.matomoTitle
            }
            if (an && an.piwikTitle) {
                return an.piwikTitle
            }
            if (an && an.title) {
                return an.title
            }
            if ("function" === typeof u) {
                var al = u(Y);
                if (al) {
                    return al
                }
            }
            return null
        }

        function ad(al, am, ao) {
            var an = ag(al);
            if (ao && an && ao != an) {
                ao = an;
                am.reset();
                am.setResource(J.makeUrlAbsolute(ao));
                am.setMediaTitle(X(al));
                am.setWidth(al.getWidth());
                am.setHeight(al.getHeight());
                am.setFullscreen(al.getFullscreen());
                return true
            }
            return false
        }
        var ai = ag(aj);
        var W = J.makeUrlAbsolute(ai);
        var Z = p.getMediaResource(Y, W);
        var ah = new l("jwplayer", ae, Z);
        ah.setMediaTitle(X(aj));
        ah.setWidth(aj.getWidth());
        ah.setHeight(aj.getHeight());
        ah.setFullscreen(aj.getFullscreen());
        K.push(ah);
        var aa = aj.getDuration();
        if (aa) {
            ah.setMediaTotalLengthInSeconds(aa)
        }
        var ab = false,
            ac = ai;
        var ak = null;
        aj.on("play", function() {
            ad(aj, ah, ac);
            ab = true;
            ah.play()
        }, true);
        aj.on("playlistItem", function() {
            ad(aj, ah, ac);
            if (aj.getState() !== "playing") {
                ab = false
            }
        }, true);
        aj.on("pause", function() {
            if (aj.getPosition() && aj.getDuration() && aj.getPosition() === aj.getDuration()) {
                return
            }
            ah.pause()
        }, true);
        aj.on("complete", function() {
            ah.finish()
        }, true);
        aj.on("time", function() {
            var al = aj.getPosition();
            if (al) {
                ah.setMediaProgressInSeconds(al)
            }
            var am = aj.getDuration();
            if (am) {
                ah.setMediaTotalLengthInSeconds(am)
            }
            if (ab) {
                ah.update()
            } else {
                ab = true;
                ah.play()
            }
        }, true);
        aj.on("seek", function() {
            ah.seekStart()
        }, true);
        aj.on("seeked", function() {
            var al = aj.getPosition();
            if (al) {
                ah.setMediaProgressInSeconds(al)
            }
            var an = aj.getDuration();
            if (an) {
                ah.setMediaTotalLengthInSeconds(an)
            }
            ah.seekFinish();
            var am = parseInt(ah.getMediaProgressInSeconds(), 10);
            if (ak === null || ak !== am) {
                ak = am;
                ah.trackEvent("seek")
            }
        }, true);
        aj.on("resize", function() {
            ah.setWidth(aj.getWidth());
            ah.setHeight(aj.getHeight());
            ah.setFullscreen(aj.getFullscreen())
        }, true);
        aj.on("fullscreen", function() {
            ah.setWidth(aj.getWidth());
            ah.setHeight(aj.getHeight());
            ah.setFullscreen(aj.getFullscreen())
        }, false);
        ah.trackUpdate()
    };
    P.scanForMedia = function(X) {
        if (!G.addEventListener || !b()) {
            return
        }
        var Y = X.getElementsByTagName("object");
        for (var W = 0; W < Y.length; W++) {
            if (!p.isMediaIgnored(Y[W]) && p.hasCssClass(Y[W], "jw-swf")) {
                new P(Y[W], g.VIDEO)
            }
        }
        Y = null
    };
    var s = function(Z, ac) {
        if (!Z) {
            return
        }
        if (!G.addEventListener) {
            return
        }
        if (Z.playerInstance) {
            return
        }
        Z.playerInstance = true;
        var W = p.getAttribute(Z, "src");
        var Y = p.getMediaResource(Z, null);
        var af = new l("vimeo", ac, Y);
        af.setWidth(Z.clientWidth);
        af.setHeight(Z.clientHeight);
        af.setFullscreen(p.isFullscreen(Z));
        K.push(af);
        G.addEventListener("resize", function() {
            af.setWidth(Z.clientWidth);
            af.setHeight(Z.clientHeight);
            af.setFullscreen(p.isFullscreen(Z))
        }, false);
        var ae = p.getMediaTitle(Z);
        var aa = !p.getAttribute(Z, "data-piwik-title") && !p.getAttribute(Z, "data-matomo-title");
        if (ae) {
            af.setMediaTitle(ae)
        }
        Z.matomoSeekLastTime = null;
        var X = function(ai) {
            if (!(/^(https?:)?\/\/(player.)?vimeo.com(?=$|\/)/).test(ai.origin)) {
                return false
            }
            if (!ai || !ai.data) {
                return
            }
            if (Z.contentWindow && ai.source && Z.contentWindow !== ai.source) {
                return
            }
            var aj = ai.data;
            if ("string" === typeof aj) {
                aj = q().parse(ai.data)
            }
            if (("event" in aj && aj.event === "ready") || ("method" in aj && aj.method === "ping")) {
                if (ab === "*") {
                    ab = ai.origin
                }
                if (!Z.isVimeoReady) {
                    Z.isVimeoReady = true;
                    ad("addEventListener", "play");
                    ad("addEventListener", "pause");
                    ad("addEventListener", "finish");
                    ad("addEventListener", "seek");
                    ad("addEventListener", "seeked");
                    ad("addEventListener", "playProgress");
                    ad("getVideoTitle")
                }
                return
            }
            if ("method" in aj) {
                f("vimeoMethod", aj.method);
                switch (aj.method) {
                    case "getVideoTitle":
                        if (aj.value && aa) {
                            af.setMediaTitle(aj.value)
                        } else {
                            if (aa) {
                                r(Z, af)
                            }
                        }
                        aa = true;
                        af.trackUpdate();
                        break;
                    case "getPaused":
                        if (aj.value) {
                            af.pause()
                        }
                }
                return
            }
            if ("event" in aj) {
                var ag = aj.event;
                f("vimeoEvent", ag);
                if (aj && aj.data) {
                    aj = aj.data
                }
                if (af && aj && aj.seconds) {
                    if (af.getMediaProgressInSeconds() === aj.seconds && (ag === "playProgress" || ag === "timeupdate")) {
                        return
                    }
                    af.setMediaProgressInSeconds(aj.seconds)
                }
                if (af && aj && aj.duration) {
                    af.setMediaTotalLengthInSeconds(aj.duration)
                }
                switch (ag) {
                    case "play":
                        af.play();
                        break;
                    case "timeupdate":
                    case "playProgress":
                        if (af._isSeeking) {
                            af._isSeeking = false;
                            af.seekFinish()
                        }
                        af.update();
                        break;
                    case "seek":
                        af.seekStart();
                        af._isSeeking = true;
                        break;
                    case "seeked":
                        var ah = parseInt(af.getMediaProgressInSeconds(), 10);
                        if (Z.matomoSeekLastTime === null || Z.matomoSeekLastTime !== ah) {
                            Z.matomoSeekLastTime = ah;
                            af.trackEvent("seek")
                        }
                        break;
                    case "pause":
                        if (aj && aj.seconds && aj && aj.duration && aj.seconds === aj.duration) {
                            f("ignoring pause event because video is finished");
                            break
                        }
                        setTimeout(function() {
                            ad("getPaused")
                        }, 700);
                        break;
                    case "finish":
                        af.finish();
                        break
                }
            }
        };
        G.addEventListener("message", X, true);
        var ab = "*";
        af._isSeeking = false;

        function ad(aj, ah) {
            var ag = {
                method: aj
            };
            if (ah !== undefined) {
                ag.value = ah
            }
            if (Z && Z.contentWindow) {
                if (navigator && navigator.userAgent) {
                    var ai = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
                    if (ai >= 8 && ai < 10) {
                        ag = q().stringify(ag)
                    }
                }
                Z.contentWindow.postMessage(ag, ab)
            }
        }
        ad("ping")
    };
    s.scanForMedia = function(Y) {
        if (!G.addEventListener) {
            return
        }
        var X = Y.getElementsByTagName("iframe");
        for (var W = 0; W < X.length; W++) {
            if (p.isMediaIgnored(X[W])) {
                continue
            }
            var Z = p.getAttribute(X[W], "src");
            if (Z && (Z.indexOf("player.vimeo.com") > 0 || (Z.indexOf("vimeo.com") > 0 && Z.indexOf("embed") > 0))) {
                new s(X[W], g.VIDEO)
            }
        }
        X = null
    };
    var w = function(ab, ae) {
        if (!ab) {
            return
        }
        if (!G.addEventListener) {
            return
        }
        if (ab.playerInstance) {
            return
        }
        if (typeof Plyr === "function" && p.getFirstParentWithClass(ab, "plyr", 2)) {
            return
        }
        var X = p.getMediaResource(ab, null);
        var ah = new l("youtube", ae, X);
        ah.setWidth(ab.clientWidth);
        ah.setHeight(ab.clientHeight);
        ah.setFullscreen(p.isFullscreen(ab));
        K.push(ah);
        G.addEventListener("resize", function() {
            ah.setWidth(ab.clientWidth);
            ah.setHeight(ab.clientHeight);
            ah.setFullscreen(p.isFullscreen(ab))
        }, false);
        var ag = p.getMediaTitle(ab);
        if (ag) {
            ah.setMediaTitle(ag)
        }
        var Y = false;
        var aa = null;
        var ad = !p.getAttribute(ab, "data-piwik-title") && !p.getAttribute(ab, "data-matomo-title");
        var W = false;
        var ac = false;
        var af = null;

        function Z(ai) {
            if (!ai || !ai.target) {
                return
            }
            var am = ai.target;
            var al;
            if (ai && "undefined" !== typeof ai.data && null !== ai.data) {
                al = ai.data
            } else {
                if (!am.getPlayerState) {
                    f("youtubeMissingPlayerState");
                    return
                }
                al = am.getPlayerState()
            }
            f("youtubeStateChange", al);
            switch (al) {
                case YT.PlayerState.ENDED:
                    if (am.getCurrentTime) {
                        ah.setMediaProgressInSeconds(am.getCurrentTime())
                    }
                    if (am.getDuration) {
                        ah.setMediaTotalLengthInSeconds(am.getDuration())
                    }
                    ah.finish();
                    if (aa) {
                        clearInterval(aa);
                        aa = null
                    }
                    break;
                case YT.PlayerState.PLAYING:
                    var aj = null;
                    if (am.getVideoData) {
                        aj = am.getVideoData()
                    }
                    if (!af && aj && aj.video_id) {
                        af = aj.video_id
                    } else {
                        if (af && aj && aj.video_id && af != aj.video_id) {
                            af = aj.video_id;
                            ah.reset();
                            if (am.getVideoUrl) {
                                ah.setResource(am.getVideoUrl())
                            }
                            ad = true;
                            W = false;
                            Y = false;
                            f("currentVideoId has changed to " + af)
                        }
                    }
                    if (am.getCurrentTime) {
                        ah.setMediaProgressInSeconds(am.getCurrentTime())
                    }
                    if (am.getDuration) {
                        ah.setMediaTotalLengthInSeconds(am.getDuration())
                    }
                    if (ad) {
                        if (aj && aj.title) {
                            ah.setMediaTitle(aj.title)
                        }
                        ad = false
                    }
                    if (!W || ac) {
                        W = true;
                        ac = false;
                        Y = false;
                        ah.play()
                    } else {
                        if (Y) {
                            Y = false;
                            ah.seekFinish()
                        }
                    }
                    ah.update();
                    if (!aa) {
                        var ak = [];
                        aa = setInterval(function() {
                            if (ah.isPlaying) {
                                if (am && am.getCurrentTime) {
                                    var an = am.getCurrentTime();
                                    ah.setMediaProgressInSeconds(an);
                                    ak.push(an);
                                    if (ak.length > 60) {
                                        ak.shift();
                                        var ao = 0;
                                        var ap = true;
                                        for (ao = 0; ao < ak.length; ao++) {
                                            if (ak[ao] !== ak[0]) {
                                                ap = false
                                            }
                                        }
                                        if (ap) {
                                            ac = true;
                                            ah.pause();
                                            ak = [];
                                            return
                                        }
                                    }
                                }
                                ah.update()
                            }
                        }, 1 * 1000)
                    }
                    break;
                case -1:
                case YT.PlayerState.PAUSED:
                    setTimeout(function() {
                        if (am && am.getPlayerState && am.getPlayerState() == YT.PlayerState.PAUSED) {
                            if (am && am.getCurrentTime) {
                                ah.setMediaProgressInSeconds(am.getCurrentTime())
                            }
                            ah.pause();
                            ac = true;
                            if (aa) {
                                clearInterval(aa);
                                aa = null
                            }
                        } else {
                            f("target not found in YT paused state")
                        }
                    }, 1000);
                    break;
                case YT.PlayerState.BUFFERING:
                    ah.seekStart();
                    Y = true;
                    if (aa) {
                        clearInterval(aa);
                        aa = null
                    }
                    break
            }
        }
        ab.playerInstance = new YT.Player(ab, {
            events: {
                onReady: function(ai) {
                    if (!ai || !ai.target) {
                        return
                    }
                    if (ad && ai.target && ai.target.getVideoData) {
                        var aj = ai.target.getVideoData();
                        if (aj && aj.title) {
                            ah.setMediaTitle(aj.title)
                        } else {
                            r(ab, ah)
                        }
                    }
                    ah.trackUpdate();
                    if (ai.target.getPlayerState && ai.target.getPlayerState() == YT.PlayerState.PLAYING) {
                        Z(ai)
                    }
                },
                onError: function(ai) {
                    if (!ai || !ai.data) {
                        return
                    }
                    if (ah.isPlaying) {
                        ac = true;
                        ah.pause()
                    }
                    f("YT onError event happened")
                },
                onStateChange: Z
            }
        })
    };
    w.scanForMedia = function(ae) {
        if (!G.addEventListener) {
            return
        }
        var Y = [];
        var ad = ae.getElementsByTagName("iframe");
        for (var aa = 0; aa < ad.length; aa++) {
            if (p.isMediaIgnored(ad[aa])) {
                continue
            }
            var W = p.getAttribute(ad[aa], "src");
            if (W && (W.indexOf("youtube.com") > 0 || W.indexOf("youtube-nocookie.com") > 0)) {
                p.setAttribute(ad[aa], "enablejsapi", "true");
                Y.push(ad[aa])
            }
        }
        ad = null;

        function X(ai, ah) {
            if (!(ai in window)) {
                return
            }
            var aj = window[ai];
            if ("function" !== typeof aj) {
                return
            }
            try {
                if (aj.toString && aj.toString().indexOf("function replaceMe") === 0) {
                    return
                }
            } catch (ag) {}

            function af() {
                try {
                    aj.apply(window, [].slice.call(arguments, 0));
                    ah()
                } catch (ak) {
                    ah();
                    throw ak
                }
            }
            window[ai] = af
        }

        function ac() {
            return "object" === typeof YT && YT && YT.Player
        }

        function Z() {
            if (!ac()) {
                return
            }
            var af = ae.getElementsByTagName("iframe");
            for (var ag = 0; ag < af.length; ag++) {
                if (p.isMediaIgnored(af[ag])) {
                    continue
                }
                var ah = p.getAttribute(af[ag], "src");
                if (ah && (ah.indexOf("youtube.com") > 0 || ah.indexOf("youtube-nocookie.com") > 0)) {
                    if (af[ag].setAttribute) {
                        af[ag].setAttribute("enablejsapi", "true")
                    }
                    new w(af[ag], g.VIDEO)
                }
            }
        }
        if (Y && Y.length) {
            if (ac()) {
                Z()
            } else {
                if (G.onYouTubeIframeAPIReady) {
                    X("onYouTubeIframeAPIReady", Z);
                    ab(false)
                } else {
                    if (G.onYouTubePlayerAPIReady) {
                        X("onYouTubePlayerAPIReady", Z);
                        ab(false)
                    } else {
                        G.onYouTubeIframeAPIReady = Z;
                        ab(true)
                    }
                }
            }
        }

        function ab(ah) {
            if (!ah && (typeof G.YT === "object" || t.querySelectorAll('script[src="https://www.youtube.com/iframe_api"]').length > 0)) {
                return
            }
            var ag = t.createElement("script");
            ag.src = "https://www.youtube.com/iframe_api";
            var af = t.getElementsByTagName("script");
            if (af && af.length) {
                var ai = af[0];
                ai.parentNode.insertBefore(ag, ai)
            } else {
                if (t.body) {
                    t.body.appendChild(ag)
                }
            }
        }
        Y = null
    };
    var H = function(Z, aj) {
        if (!Z) {
            return
        }
        if (Z.playerInstance) {
            return
        }
        var am = new SC.Widget(Z);
        Z.playerInstance = am;
        var W = p.getAttribute(Z, "data-matomo-resource");
        if (!W) {
            W = p.getAttribute(Z, "data-piwik-resource")
        }
        var al = new l("soundcloud", aj, W);
        K.push(al);
        var ak = p.getMediaTitle(Z);
        if (ak) {
            al.setMediaTitle(ak)
        }
        var X = false;
        var Y = null;
        var ae = !p.getAttribute(Z, "data-piwik-title") && !p.getAttribute(Z, "data-matomo-title");

        function ab() {
            return al.getMediaTitle() && al.getResource()
        }
        var ai = null;

        function ah(an) {
            am.getCurrentSound(function(ao) {
                if (ao === null) {
                    am.getCurrentSoundIndex(function(ap) {
                        if (ap >= 0) {
                            am.getSounds(function(aq) {
                                if (ap in aq && aq[ap]) {
                                    an(aq[ap])
                                }
                            })
                        }
                    })
                } else {
                    an(ao)
                }
            })
        }

        function ag(an) {
            if (!an) {
                return
            }
            ai = an.id;
            if (ae && !al.getMediaTitle() && an.title) {
                al.setMediaTitle(an.title)
            }
            if (an.uri && !al.getResource()) {
                al.setResource(an.uri)
            }
            if (an.duration) {
                al.setMediaTotalLengthInSeconds(parseInt(Math.floor(an.duration / 1000)))
            }
            al.trackUpdate()
        }

        function ad(an) {
            if (an && an.soundId && ai !== an.soundId) {
                ai = an.soundId;
                al.reset();
                al.setResource("");
                al.setMediaTitle("");
                ae = true;
                X = false;
                ah(ag);
                f("currentId has changed to " + ai);
                return true
            }
            return false
        }

        function aa() {
            am.getDuration(function(an) {
                al.setMediaTotalLengthInSeconds(parseInt(Math.floor(an / 1000)))
            })
        }

        function af(an) {
            if ("object" === typeof an && "undefined" !== typeof an.currentPosition) {
                al.setMediaProgressInSeconds(parseInt(Math.floor(an.currentPosition / 1000)))
            }
        }
        var ac = false;
        am.bind(SC.Widget.Events.READY, function(an) {
            ah(ag);
            am.bind(SC.Widget.Events.PLAY, function(ao) {
                if (!ab()) {
                    return
                }
                if (ad(ao)) {
                    return
                }
                aa();
                af(ao);
                al.play()
            });
            am.bind(SC.Widget.Events.PLAY_PROGRESS, function(ao) {
                if (!ab()) {
                    return
                }
                if (ad(ao)) {
                    return
                }
                aa();
                af(ao);
                if (ac) {
                    return
                }
                if (al.isPaused) {
                    al.play();
                    return
                }
                if (!al.isPlaying) {
                    return
                }
                if (X) {
                    X = false;
                    al.seekFinish()
                }
                al.update()
            });
            am.bind(SC.Widget.Events.PAUSE, function(ao) {
                if (!ab()) {
                    return
                }
                if (ad(ao)) {
                    return
                }
                aa();
                af(ao);
                if (al.getMediaProgressInSeconds() && al.getMediaTotalLengthInSeconds() === al.getMediaProgressInSeconds()) {
                    f("ignoring pause event because video is finished");
                    return
                }
                al.pause();
                ac = true;
                setTimeout(function() {
                    ac = false
                }, 1000)
            });
            am.bind(SC.Widget.Events.FINISH, function(ao) {
                if (!ab()) {
                    return
                }
                if (ad(ao)) {
                    return
                }
                aa();
                af(ao);
                al.finish()
            });
            am.bind(SC.Widget.Events.SEEK, function(ao) {
                if (!ab()) {
                    return
                }
                if (ad(ao)) {
                    return
                }
                aa();
                af(ao);
                al.seekStart();
                X = true
            })
        })
    };
    H.scanForMedia = function(ab) {
        function Z() {
            var ag = [];
            var ae = ab.getElementsByTagName("iframe");
            for (var af = 0; af < ae.length; af++) {
                if (p.isMediaIgnored(ae[af])) {
                    continue
                }
                var ah = p.getAttribute(ae[af], "src");
                if (ah && ah.indexOf("w.soundcloud.com") > 0) {
                    ag.push(ae[af])
                }
            }
            return ag
        }

        function aa() {
            return "object" === typeof SC && SC && SC.Widget
        }

        function ad() {
            if (!aa()) {
                return
            }
            var af = Z();
            for (var ae = 0; ae < af.length; ae++) {
                var ag = p.getAttribute(af[ae], "src");
                if (ag && ag.indexOf("w.soundcloud.com") > 0) {
                    new H(af[ae], g.AUDIO)
                }
            }
        }
        var Y = Z();
        if (Y && Y.length) {
            if (aa()) {
                ad()
            } else {
                var X = t.createElement("script");
                X.src = "https://w.soundcloud.com/player/api.js";
                X.onload = ad;
                var W = t.getElementsByTagName("script");
                if (W && W.length) {
                    var ac = W[0];
                    ac.parentNode.insertBefore(X, ac)
                } else {
                    if (t.body) {
                        t.body.appendChild(X)
                    }
                }
            }
        }
        Y = null
    };
    c.registerPlayer("html5", S);
    c.registerPlayer("vimeo", s);
    c.registerPlayer("youtube", w);
    c.registerPlayer("jwplayer", P);
    c.registerPlayer("soundcloud", H);

    function C(W) {
        if ("undefined" !== typeof W.MediaAnalytics) {
            return
        }
        W.MediaAnalytics = {
            enableEvents: true,
            enableProgress: true,
            quotaEventRequests: {},
            disableTrackEvents: function() {
                this.enableEvents = false
            },
            enableTrackEvents: function() {
                this.enableEvents = true
            },
            isTrackEventsEnabled: function() {
                return a && this.enableEvents
            },
            disableTrackProgress: function() {
                this.enableProgress = false
            },
            enableTrackProgress: function() {
                this.enableProgress = true
            },
            isTrackProgressEnabled: function() {
                return a && this.enableProgress
            }
        };

        ;
        Piwik.trigger("MediaAnalytics.TrackerInitialized", [W])
    }

    function z() {
        if (typeof window === "object" && "function" === typeof G.piwikMediaAnalyticsAsyncInit) {
            G.piwikMediaAnalyticsAsyncInit()
        }
        if (typeof window === "object" && "function" === typeof G.matomoMediaAnalyticsAsyncInit) {
            G.matomoMediaAnalyticsAsyncInit()
        }
        E = true
    }
    var B = false;
    var k = false;

    function h() {
        if (!B && b()) {
            B = true;
            var X = jwplayer();
            if ("object" === typeof X && "function" === typeof X.on) {
                X.on("ready", function(Y) {
                    c.scanForMedia(document)
                })
            }
        }
        if (!k && n()) {
            k = true;
            flowplayer(function(Z, Y) {
                if (Z) {
                    Z.on("ready", function() {
                        c.scanForMedia(document)
                    });
                    Z.on("load", function() {
                        c.scanForMedia(document)
                    })
                }
            });
            var W = flowplayer();
            if ("object" === typeof W && "function" === typeof W.on) {
                W.on("ready", function() {
                    c.scanForMedia(document)
                });
                W.on("load", function() {
                    c.scanForMedia(document)
                })
            }
        }
    }

    function Q() {
        Piwik.DOM.onReady(function() {
            var W = V();
            if (!W || !v(W) || !W.length) {
                return
            }
            c.scanForMedia(document);
            h()
        });
        Piwik.DOM.onLoad(function() {
            var W = V();
            if (!W || !v(W) || !W.length) {
                return
            }
            c.scanForMedia(document);
            h()
        })
    }

    function R() {
        if ("object" === typeof G && "object" === typeof G.Piwik && "object" === typeof G.Piwik.MediaAnalytics) {
            return
        }
        if ("object" === typeof G && !G.Piwik) {
            return
        }
        Piwik.MediaAnalytics = {
            utils: T,
            url: J,
            element: p,
            players: c,
            rateLimit: L,
            MediaTracker: l,
            mediaType: g,
            scanForMedia: function(Y) {
                c.scanForMedia(Y || document)
            },
            setPingInterval: function(Y) {
                if (10 > Y) {
                    throw new Error("Ping interval needs to be at least ten seconds")
                }
                O = true;
                F = parseInt(Y, 10)
            },
            removePlayer: function(Y) {
                c.removePlayer(Y)
            },
            addPlayer: function(Z, Y) {
                c.registerPlayer(Z, Y)
            },
            disableMediaAnalytics: function() {
                a = false
            },
            enableMediaAnalytics: function() {
                a = true
            },
            setMatomoTrackers: function(Y) {
                this.setPiwikTrackers(Y)
            },
            setPiwikTrackers: function(Y) {
                if (Y === null) {
                    A = null;
                    return
                }
                if (!v(Y)) {
                    Y = [Y]
                }
                A = Y;
                if (E) {
                    Q()
                }
            },
            setMediaTitleFallback: function(Y) {
                if ("function" !== typeof Y) {
                    throw new Error("The mediaTitleFallback needs to be callback function")
                }
                u = Y
            },
            getMatomoTrackers: function() {
                return V()
            },
            getPiwikTrackers: function() {
                return V()
            },
            isMediaAnalyticsEnabled: function() {
                return a
            },
            setMaxTrackingTime: function(Y) {
                I = parseInt(Y, 10) * 1000
            },
            enableDebugMode: function() {
                U = true
            },
            enableRateLimit: function() {
                y = true
            },
            disableRateLimit: function() {
                y = false
            }
        };
        Piwik.addPlugin("MediaAnalytics", {
            unload: function() {
                var Z;
                f("tracker intances mediaTrackerInstances");
                for (var Y = 0; Y < K.length; Y++) {
                    Z = K[Y];
                    if (Z && Z.timeout) {
                        f("before unload");
                        Z.trackUpdate()
                    }
                }
            },
            log: function(aa) {
                var Y = V();
                if (Y && Y.length) {
                    for (var Z = 0; Z < Y.length; Z++) {
                        if (typeof Y[Z].MediaAnalytics.quotaEventRequests !== "undefined" && Object.keys(Y[Z].MediaAnalytics.quotaEventRequests).length > 0) {
                            Y[Z].MediaAnalytics.quotaEventRequests = {}
                        }
                    }
                }
                return ""
            }
        });
        if (G.Piwik.initialized) {
            var W = Piwik.getAsyncTrackers();
            var X = 0;
            for (X; X < W.length; X++) {
                C(W[X])
            }
            Piwik.on("TrackerSetup", C);
            Piwik.retryMissedPluginCalls();
            z();
            Q();
            Piwik.on("TrackerAdded", Q)
        } else {
            Piwik.on("TrackerSetup", C);
            Piwik.on("MatomoInitialized", function() {
                z();
                Q();
                Piwik.on("TrackerAdded", Q)
            })
        }
    }
    if ("object" === typeof G.Piwik) {
        R()
    } else {
        if ("object" !== typeof G.matomoPluginAsyncInit) {
            G.matomoPluginAsyncInit = []
        }
        G.matomoPluginAsyncInit.push(R)
    }
})();
/* END GENERATED: tracker.min.js */


/* GENERATED: tracker.min.js */
/*!!
 * Copyright (C) InnoCraft Ltd - All rights reserved.
 *
 * All information contained herein is, and remains the property of InnoCraft Ltd.
 *
 * @link https://www.innocraft.com/
 * @license For license details see https://www.innocraft.com/license
 */
(function() {
    var l = false;
    var r = true;
    var q = null;
    var k = false;
    var j = "FIELD_CHECKABLE";
    var y = "FIELD_SELECTABLE";
    var h = "FIELD_TEXT";
    var n = ["password", "text", "url", "tel", "email", "search", "", null];
    var a = ["color", "date", "datetime", "datetime-local", "month", "number", "range", "time", "week"];
    var b = ["radio", "checkbox"];
    var p = ["button", "submit", "hidden", "reset"];
    var u = 30000;
    var z = [];
    var o = 500;

    function e() {
        if (l && "undefined" !== typeof console && console && console.debug) {
            console.debug.apply(console, arguments)
        }
    }
    var c = {
        getAttribute: function(B, A) {
            if (B && B.getAttribute && A) {
                return B.getAttribute(A)
            }
            return null
        },
        hasClass: function(B, A) {
            if (!B || !B.className) {
                return false
            }
            return (" " + B.className + " ").indexOf(" " + A + " ") > -1
        },
        hasNodeAttribute: function(B, A) {
            if (B && B.hasAttribute) {
                return B.hasAttribute(A)
            }
            if (B && B.attributes) {
                var C = (typeof B.attributes[A]);
                return C !== "undefined"
            }
            return false
        },
        isIgnored: function(A) {
            if (this.hasNodeAttribute(A, "data-matomo-ignore")) {
                return true
            }
            if (this.hasNodeAttribute(A, "data-piwik-ignore")) {
                return true
            }
            return false
        },
        getTagName: function(A) {
            if (A && A.tagName) {
                return ("" + A.tagName).toLowerCase()
            }
            return null
        },
        findAllFormElements: function(A) {
            if (A && A.querySelectorAll) {
                return A.querySelectorAll("form, [data-piwik-form], [data-matomo-form]")
            }
            return []
        },
        findAllFieldElements: function(A) {
            if (A && A.querySelectorAll) {
                return A.querySelectorAll("input,select,textarea,button,textarea")
            }
            return []
        },
        findFormTrackerInstance: function(B, A) {
            if ("undefined" === typeof A) {
                A = 100
            }
            if (A <= 0 || !B) {
                return null
            }
            if (B.formTrackerInstance) {
                return B.formTrackerInstance
            }
            if (B.parentNode) {
                return this.findFormTrackerInstance(B.parentNode, --A)
            }
        }
    };
    var v = {
        isArray: function(A) {
            return typeof A === "object" && A !== null && typeof A.length === "number"
        },
        indexOfArray: function(C, B) {
            if (!C) {
                return -1
            }
            if (C.indexOf) {
                return C.indexOf(B)
            }
            if (!this.isArray(C)) {
                return -1
            }
            for (var A = 0; A < C.length; A++) {
                if (C[A] === B) {
                    return A
                }
            }
            return -1
        },
        getCurrentTime: function() {
            return new Date().getTime()
        },
        isNumber: function(A) {
            return !isNaN(A)
        },
        generateUniqueId: function() {
            var D = "";
            var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var C = B.length;
            for (var A = 0; A < 6; A++) {
                D += B.charAt(Math.floor(Math.random() * C))
            }
            return D
        },
        paramsToQueryString: function(C) {
            if (!C) {
                C = {}
            }
            var B = "";
            for (var A in C) {
                if (Object.prototype.hasOwnProperty.call(C, A)) {
                    if (C[A] === null) {
                        continue
                    }
                    B += A + "=" + encodeURIComponent(C[A]) + "&"
                }
            }
            return B
        }
    };
    var g = {
        getPiwikTrackers: function() {
            if (null === q) {
                if ("object" === typeof Piwik && Piwik.getAsyncTrackers) {
                    return Piwik.getAsyncTrackers()
                }
            }
            if (v.isArray(q)) {
                return q
            }
            return []
        },
        trackParams: function(F, E) {
            if (!r) {
                return
            }
            var C = v.paramsToQueryString(F);
            if (C) {
                if (C.substr(-1) !== "&") {
                    C += "&"
                }
                C += "ca=1"
            }
            if (!C || C === "") {
                return
            }
            var A = this.getPiwikTrackers();
            if (A && A.length) {
                var B = 0,
                    D;
                for (B; B < A.length; B++) {
                    D = A[B];
                    if (!D.noOfFormRequestsSent) {
                        D.noOfFormRequestsSent = 0
                    }
                    if (D.noOfFormRequestsSent > o) {
                        e("maximum number of form request allowed for a tracker reached");
                        continue
                    }
                    if (E && 500 === D.getLinkTrackingTimer() && D.setLinkTrackingTimer) {
                        D.setLinkTrackingTimer(650)
                    }
                    if (D && (!D.FormAnalytics || D.FormAnalytics.isEnabled())) {
                        D.queueRequest(C);
                        D.noOfFormRequestsSent++
                    }
                }
            }
            if (l) {
                e("trackProgress: " + Piwik.JSON.stringify(F))
            }
        }
    };

    function f() {
        Matomo.FormAnalytics.setMaxNoOfFormRequestsAllowed(500);;
        if (typeof window === "object" && "function" === typeof window.piwikFormAnalyticsAsyncInit) {
            window.piwikFormAnalyticsAsyncInit()
        }
        if (typeof window === "object" && "function" === typeof window.matomoFormAnalyticsAsyncInit) {
            window.matomoFormAnalyticsAsyncInit()
        }
        k = true
    }

    function t(A) {
        this.reset();
        this.fields = [];
        this.firstFieldEngagementDate = null;
        this.lastFieldEngagementDate = null;
        this.hesitationTimeTracked = false;
        this.formStartTracked = false;
        this.node = A;
        this.formId = c.getAttribute(A, "id");
        this.formName = c.getAttribute(A, "data-matomo-name");
        if (!this.formName) {
            this.formName = c.getAttribute(A, "data-piwik-name")
        }
        if (!this.formName) {
            this.formName = c.getAttribute(A, "name")
        }
        this.entryFieldName = "";
        this.exitFieldName = "";
        this.lastFocusedFieldName = "";
        this.fieldsWithUpdates = [];
        this.fieldNodes = [];
        this.initialFormViewLoggedWithTrackers = [];
        this.trackingTimeout = null;
        this.timeLastTrackingRequest = 0;
        this.timeOffWindowBeforeEngagement = 0;
        this.timeOffWindowSinceEngagement = 0;
        Piwik.DOM.addEventListener(window, "focus", (function(B) {
            return function() {
                if (!B.timeWindowBlur) {
                    return
                }
                var C = v.getCurrentTime() - B.timeWindowBlur;
                B.timeWindowBlur = null;
                if (C < 0) {
                    C = 0
                }
                if (B.timeLastTrackingRequest) {
                    B.timeLastTrackingRequest = B.timeLastTrackingRequest + C
                }
                if (B.firstFieldEngagementDate) {
                    B.timeOffWindowSinceEngagement += C;
                    e("time off engaged " + B.timeOffWindowSinceEngagement)
                } else {
                    B.timeOffWindowBeforeEngagement += C;
                    e("time off not engaged " + B.timeOffWindowBeforeEngagement)
                }
            }
        })(this));
        Piwik.DOM.addEventListener(window, "blur", (function(B) {
            return function() {
                B.timeWindowBlur = v.getCurrentTime();
                e("window blur")
            }
        })(this));
        Piwik.DOM.addEventListener(A, "submit", (function(B) {
            return function() {
                e("form submit");
                B.trackFormSubmit()
            }
        })(this))
    }
    t.prototype.reset = function() {
        this.detectionDate = v.getCurrentTime();
        this.formViewId = v.generateUniqueId();
        this.fieldsWithUpdates = [];
        this.firstFieldEngagementDate = null;
        this.lastFieldEngagementDate = null;
        this.timeOffWindowSinceEngagement = 0;
        this.timeOffWindowBeforeEngagement = 0;
        this.formStartTracked = false;
        if (this.fields && this.fields.length) {
            for (var A = 0; A < this.fields.length; A++) {
                this.fields[A].resetOnFormSubmit()
            }
        }
    };
    t.prototype.trackFormSubmit = function() {
        this.setEngagedWithForm();
        var A = this.lastFieldEngagementDate - this.firstFieldEngagementDate - this.timeOffWindowSinceEngagement;
        if (A < 0) {
            A = 0
        }
        var B = {
            fa_su: 1,
            fa_tts: A
        };
        this.sendUpdate(this.fields, B, true);
        this.reset()
    };
    t.prototype.trackFormConversion = function() {
        if (!this.timeLastTrackingRequest) {
            this.sendUpdate([], {
                fa_co: 1
            });
            return
        }
        var A = (v.getCurrentTime() - this.timeLastTrackingRequest) / 1000;
        if (A < 2) {
            var B = this;
            setTimeout(function() {
                B.sendUpdate([], {
                    fa_co: 1
                })
            }, 800)
        } else {
            this.sendUpdate([], {
                fa_co: 1
            })
        }
    };
    t.prototype.shouldBeTracked = function() {
        return !!this.fields && !!this.fields.length
    };
    t.prototype.trackInitialFormView = function() {
        if (!this.initialFormViewLoggedWithTrackers || !this.initialFormViewLoggedWithTrackers.length) {
            this.initialFormViewLoggedWithTrackers = g.getPiwikTrackers();
            this.sendUpdate([], {
                fa_fv: "1"
            })
        }
    };
    t.prototype.setEngagedWithForm = function(A) {
        this.lastFieldEngagementDate = v.getCurrentTime();
        if (!this.firstFieldEngagementDate) {
            this.firstFieldEngagementDate = this.lastFieldEngagementDate
        }
    };
    t.prototype.trackFieldUpdate = function(A) {
        if (v.indexOfArray(this.fieldsWithUpdates, A) === -1) {
            this.fieldsWithUpdates.push(A)
        }
        this.scheduleSendUpdate()
    };
    t.prototype.scheduleSendUpdate = function() {
        if (this.trackingTimeout) {
            clearTimeout(this.trackingTimeout);
            this.trackingTimeout = null
        }
        var A = this;
        this.trackingTimeout = setTimeout(function() {
            var B = A.fieldsWithUpdates;
            A.fieldsWithUpdates = [];
            A.sendUpdate(B)
        }, u)
    };
    t.prototype.sendUpdate = function(D, G, F) {
        if (!this.shouldBeTracked()) {
            return
        }
        if (this.trackingTimeout) {
            clearTimeout(this.trackingTimeout);
            this.trackingTimeout = null
        }
        if (!D) {
            D = []
        }
        var A = [];
        for (var C = 0; C < D.length; C++) {
            A.push(D[C].getTrackingParams())
        }
        var E = {
            fa_vid: this.formViewId,
            fa_id: this.formId,
            fa_name: this.formName
        };
        if (this.entryFieldName) {
            E.fa_ef = this.entryFieldName
        }
        if (this.exitFieldName) {
            E.fa_lf = this.exitFieldName
        }
        if (A.length) {
            E.fa_fields = Piwik.JSON.stringify(A)
        }
        if (this.firstFieldEngagementDate) {
            if (!this.formStartTracked) {
                E.fa_st = "1";
                this.formStartTracked = true
            }
            if (!this.hesitationTimeTracked) {
                E.fa_ht = this.firstFieldEngagementDate - this.detectionDate - this.timeOffWindowBeforeEngagement;
                this.hesitationTimeTracked = true
            }
            if (this.lastFieldEngagementDate && this.timeLastTrackingRequest) {
                E.fa_ts = this.lastFieldEngagementDate - this.timeLastTrackingRequest;
                if (E.fa_ts < 0) {
                    E.fa_ts = 0
                }
            } else {
                if (this.lastFieldEngagementDate && !this.timeLastTrackingRequest) {
                    E.fa_ts = this.lastFieldEngagementDate - this.firstFieldEngagementDate - this.timeOffWindowSinceEngagement;
                    if (E.fa_ts < 0) {
                        E.fa_ts = 0
                    }
                }
            }
            this.timeLastTrackingRequest = v.getCurrentTime()
        }
        if (G) {
            for (var B in G) {
                if (Object.prototype.hasOwnProperty.call(G, B)) {
                    E[B] = G[B]
                }
            }
        }
        if ("undefined" === typeof F) {
            F = false
        }
        g.trackParams(E, F)
    };
    t.prototype.scanForFields = function() {
        var D, C = 0,
            G, F, B;
        F = c.findAllFieldElements(this.node);
        for (D = 0; D < F.length; D++) {
            if (!F[D]) {
                continue
            }
            if (this.fields && this.fields.length && this.fields.length > 2500) {
                continue
            }
            B = F[D];
            if (c.isIgnored(B) || v.indexOfArray(this.fieldNodes, B) > -1) {
                continue
            }
            var A = c.getTagName(B);
            var E = c.getAttribute(B, "type");
            if (v.indexOfArray(p, E) !== -1) {
                continue
            } else {
                if ("button" === A) {
                    continue
                }
            }
            if (A === "input" && !E) {
                E = "text"
            }
            var H = c.getAttribute(B, "data-matomo-name");
            if (!H) {
                H = c.getAttribute(B, "data-piwik-name");
                if (!H) {
                    H = c.getAttribute(B, "name");
                    if (!H) {
                        H = c.getAttribute(B, "id");
                        if (!H) {
                            continue
                        }
                    }
                }
            }
            this.fieldNodes.push(B);
            var I = false;
            for (C = 0; C < this.fields.length; C++) {
                if (this.fields[C] && this.fields[C].fieldName === H) {
                    I = true;
                    this.fields[C].addNode(B);
                    break
                }
            }
            if (!I) {
                G = new w(this, F[D], A, E, H);
                this.addFormField(G)
            }
        }
    };
    t.prototype.addFormField = function(A) {
        this.fields.push(A)
    };

    function w(E, D, C, B, F) {
        this.discoveredDate = v.getCurrentTime();
        this.tracker = E;
        this.timespent = 0;
        this.hesitationtime = 0;
        this.nodes = [];
        this.tagName = C;
        this.fieldName = F;
        this.fieldType = B;
        this.startFocus = null;
        this.timeLastChange = null;
        this.numChanges = 0;
        this.numFocus = 0;
        this.numDeletes = 0;
        this.numCursor = 0;
        this.canCountChange = true;
        this.isFocusedCausedAuto = c.hasNodeAttribute(D, "autofocus");
        if (this.tagName === "select") {
            this.category = y
        } else {
            if (this.tagName === "textarea") {
                this.category = h
            } else {
                if (v.indexOfArray(b, this.fieldType) !== -1) {
                    this.category = j
                } else {
                    if (v.indexOfArray(a, this.fieldType) !== -1) {
                        this.category = y
                    } else {
                        this.category = h
                    }
                }
            }
        }
        this.addNode(D);
        var A = (D === document.activeElement);
        if (A) {
            this.onFocus()
        }
    }
    w.prototype.addNode = function(B) {
        this.nodes.push(B);

        function A(E, C, G) {
            if (E && "object" === typeof tinymce && "function" === typeof tinymce.get && c.getTagName(E) === "textarea" && c.getAttribute(E, "id")) {
                var F = c.getAttribute(E, "id");
                var D = tinymce.get(F);
                if (D) {
                    D.on(C, G);
                    return
                }
            } else {
                if (E && "function" === typeof jQuery && c.getTagName(E) === "select" && c.hasClass(E, "select2-hidden-accessible") && E.nextSibling) {
                    if (C === "focus") {
                        C = "select2:open"
                    } else {
                        if (C === "blur") {
                            C = "select2:close"
                        }
                    }
                    jQuery(E).on(C, G);
                    return
                }
            }
            Piwik.DOM.addEventListener(E, C, G)
        }
        A(B, "focus", (function(C) {
            return function(D) {
                if (C.isAutoFocus()) {
                    e("field autofocus " + C.fieldName)
                } else {
                    e("field focus " + C.fieldName)
                }
                C.onFocus()
            }
        })(this));
        A(B, "blur", (function(C) {
            return function() {
                e("field blur " + C.fieldName);
                C.onBlur()
            }
        })(this));
        if (this.category === h) {
            A(B, "keyup", (function(C) {
                return function(F) {
                    var E = F.which || F.keyCode;
                    var D = [9, 16, 17, 18, 20, 27, 91];
                    if ((E && v.indexOfArray(D, E) !== -1) || F.isCtrlKey) {
                        return
                    }
                    if (E >= 37 && E <= 40) {
                        if (!C.isBlank()) {
                            C.numCursor++;
                            C.tracker.trackFieldUpdate(C)
                        }
                        return
                    }
                    if (E == 8 || E == 46) {
                        if (!C.isBlank()) {
                            C.numDeletes++;
                            C.tracker.trackFieldUpdate(C)
                        }
                        return
                    }
                    e("field text keyup " + C.fieldName);
                    C.onChange()
                }
            })(this));
            A(B, "paste", (function(C) {
                return function() {
                    e("field text paste " + C.fieldName);
                    C.onChange()
                }
            })(this))
        } else {
            A(B, "change", (function(C) {
                return function() {
                    e("field change " + C.fieldName);
                    C.onChange()
                }
            })(this))
        }
    };
    w.prototype.resetOnFormSubmit = function() {
        this.hesitationtime = 0;
        this.timespent = 0;
        this.numFocus = 0;
        this.numDeletes = 0;
        this.numCursor = 0;
        this.numChanges = 0;
        this.startFocus = null;
        this.timeLastChange = null;
        this.canCountChange = true;
        this.hasChangedValueSinceFocus = false;
        this.isFocusedCausedAuto = false
    };
    w.prototype.isAutoFocus = function() {
        if (!this.isFocusedCausedAuto) {
            return false
        }
        if (this.tracker.entryFieldName && this.tracker.entryFieldName !== this.fieldName) {
            this.isFocusedCausedAuto = false
        }
        if (this.tracker.exitFieldName && this.tracker.exitFieldName !== this.fieldName) {
            this.isFocusedCausedAuto = false
        }
        return this.isFocusedCausedAuto
    };
    w.prototype.getTrackingParams = function() {
        return {
            fa_fts: this.getTimeSpent(),
            fa_fht: this.getHesitationTime(),
            fa_fb: this.isBlank(),
            fa_fn: this.fieldName,
            fa_fch: this.numChanges,
            fa_ff: this.numFocus,
            fa_fd: this.numDeletes,
            fa_fcu: this.numCursor,
            fa_ft: this.fieldType || this.tagName,
            fa_fs: this.getFieldSize()
        }
    };
    w.prototype.isBlank = function() {
        if (this.category === j) {
            for (var A = 0; A < this.nodes.length; A++) {
                if (this.nodes[A] && this.nodes[A].checked) {
                    return false
                }
            }
            return true
        }
        if (!this.nodes[0]) {
            return false
        }
        var B = this.nodes[0];
        if ("undefined" === typeof B.value) {
            return true
        }
        var C = B.value;
        if (null === C || false === C || "" === C) {
            return true
        }
        return String(C).length === 0
    };
    w.prototype.getFieldSize = function() {
        if (this.category === h) {
            if (this.nodes[0] && this.nodes[0].value) {
                return String(this.nodes[0].value).length
            } else {
                return 0
            }
        } else {
            return -1
        }
    };
    w.prototype.getTimeSpent = function() {
        if (this.numChanges && !this.timeSpent) {
            this.timeSpent = 1
        }
        if (!this.startFocus || this.isAutoFocus()) {
            return this.timespent
        }
        if (this.timeLastChange) {
            var A = this.timeLastChange - this.startFocus;
            if (A < 0) {
                A = 0
            }
            return this.timespent + A
        }
        return this.timespent + v.getCurrentTime() - this.startFocus
    };
    w.prototype.getHesitationTime = function() {
        if (this.numChanges || !this.startFocus || this.isAutoFocus()) {
            return this.hesitationtime
        }
        var A = v.getCurrentTime();
        return this.hesitationtime + (A - this.startFocus)
    };
    w.prototype.onFocus = function() {
        this.startFocus = v.getCurrentTime();
        var A = this.fieldName !== this.tracker.lastFocusedFieldName;
        if (A && this.tracker.lastFocusedFieldName) {
            this.isFocusedCausedAuto = false
        }
        this.timeLastChange = null;
        this.hasChangedValueSinceFocus = false;
        this.tracker.lastFocusedFieldName = this.fieldName;
        if (A) {
            this.canCountChange = true
        }
        if (A && !this.isAutoFocus()) {
            this.numFocus++;
            this.tracker.setEngagedWithForm();
            this.tracker.trackFieldUpdate(this);
            this.tracker.exitFieldName = this.fieldName;
            this.tracker.scheduleSendUpdate()
        }
    };
    w.prototype.onBlur = function() {
        if (!this.startFocus) {
            return
        }
        if (this.hasChangedValueSinceFocus) {
            if (this.timeLastChange && this.startFocus) {
                this.timespent += (this.timeLastChange - this.startFocus)
            }
            this.timeLastChange = null;
            this.startFocus = null;
            return
        }
        if (!this.isAutoFocus()) {
            var A = v.getCurrentTime();
            this.timespent += A - this.startFocus;
            if (!this.numChanges) {
                this.hesitationtime += A - this.startFocus
            }
            this.tracker.setEngagedWithForm();
            this.tracker.trackFieldUpdate(this)
        }
        this.startFocus = null
    };
    w.prototype.onChange = function() {
        this.timeLastChange = v.getCurrentTime();
        if (this.isAutoFocus()) {
            this.startFocus = this.timeLastChange
        } else {
            if (!this.startFocus) {
                return
            }
        }
        this.isFocusedCausedAuto = false;
        this.hasChangedValueSinceFocus = true;
        if (!this.numChanges) {
            this.hesitationtime += this.timeLastChange - this.startFocus
        }
        if (this.canCountChange) {
            this.numChanges++;
            this.canCountChange = false
        }
        if (!this.tracker.entryFieldName) {
            this.tracker.entryFieldName = this.fieldName
        }
        this.tracker.setEngagedWithForm();
        this.tracker.trackFieldUpdate(this)
    };

    function x(C, A) {
        if (!r) {
            return
        }
        if (!document.querySelectorAll) {
            return
        }
        var B;
        if (C && C.formTrackerInstance) {
            B = C.formTrackerInstance;
            B.scanForFields()
        } else {
            if (!c.isIgnored(C)) {
                B = new t(C);
                B.scanForFields();
                z.push(B);
                C.formTrackerInstance = B
            }
        }
        if (A && B && B.shouldBeTracked()) {
            B.trackInitialFormView()
        }
        return B
    }

    function d(C) {
        if ("undefined" === typeof C) {
            C = document
        }
        var A = c.findAllFormElements(C);
        for (var B = 0; B < A.length; B++) {
            x(A[B], true)
        }
    }

    function i() {
        Piwik.DOM.onReady(function() {
            var A = g.getPiwikTrackers();
            if (!A || !v.isArray(A) || !A.length) {
                return
            }
            d(document)
        });
        Piwik.DOM.onLoad(function() {
            var A = g.getPiwikTrackers();
            if (!A || !v.isArray(A) || !A.length) {
                return
            }
            d(document)
        })
    }

    function m(A) {
        if ("undefined" !== typeof A.FormAnalytics) {
            return
        }
        A.FormAnalytics = {
            enabled: true,
            enable: function() {
                this.enabled = true
            },
            disable: function() {
                this.enabled = false
            },
            isEnabled: function() {
                return r && this.enabled
            }
        }
    }

    function s() {
        if ("object" === typeof window && "object" === typeof window.Piwik && "object" === typeof window.Piwik.FormAnalytics) {
            return
        }
        if ("object" === typeof window && !window.Piwik) {
            return
        }
        Piwik.FormAnalytics = {
            element: c,
            utils: v,
            tracking: g,
            FormField: w,
            FormTracker: t,
            disableFormAnalytics: function() {
                r = false
            },
            enableFormAnalytics: function() {
                r = true
            },
            isFormAnalyticsEnabled: function() {
                return r
            },
            setMatomoTrackers: function(A) {
                this.setPiwikTrackers(A)
            },
            setPiwikTrackers: function(A) {
                if (A === null) {
                    q = null;
                    return
                }
                if (!v.isArray(A)) {
                    A = [A]
                }
                q = A;
                if (k) {
                    i()
                }
            },
            setTrackingTimer: function(A) {
                if (A < 5) {
                    throw new Error("Delay needs to be at least five")
                }
                u = parseInt(A, 10)
            },
            enableDebugMode: function() {
                l = true
            },
            scanForForms: d,
            trackFormSubmit: function(B) {
                var A = c.findFormTrackerInstance(B);
                if (A) {
                    A.trackFormSubmit()
                }
            },
            trackFormConversion: function(A, C) {
                if ("string" === typeof A || "string" === typeof C) {
                    g.trackParams({
                        fa_vid: v.generateUniqueId(),
                        fa_id: C,
                        fa_name: A,
                        fa_co: 1
                    });
                    return
                }
                var B = c.findFormTrackerInstance(A);
                if (B) {
                    B.trackFormConversion()
                }
            },
            trackForm: function(A) {
                return x(A, true)
            },
            setMaxNoOfFormRequestsAllowed: function(A) {
                if (A == parseInt(A)) {
                    o = A
                }
            }
        };
        Piwik.addPlugin("FormAnalytics", {
            log: function(F) {
                if (!r || !F || !F.tracker) {
                    return ""
                }
                var C = F.tracker;
                if (C.FormAnalytics && !C.FormAnalytics.isEnabled()) {
                    return ""
                }
                var A = c.findAllFormElements(document);
                var E = "";
                for (var B = 0; B < A.length; B++) {
                    var D = x(A[B], false);
                    if (D && D.shouldBeTracked() && v.indexOfArray(D.initialFormViewLoggedWithTrackers, C) === -1) {
                        D.initialFormViewLoggedWithTrackers.push(C);
                        if (D.formViewId !== null) {
                            E += "&fa_fp[" + B + "][fa_vid]=" + encodeURIComponent(D.formViewId)
                        }
                        if (D.formId !== null) {
                            E += "&fa_fp[" + B + "][fa_id]=" + encodeURIComponent(D.formId)
                        }
                        if (D.formName !== null) {
                            E += "&fa_fp[" + B + "][fa_name]=" + encodeURIComponent(D.formName)
                        }
                        E += "&fa_fp[" + B + "][fa_fv]=1"
                    }
                }
                if (E) {
                    e("sending request with pageview" + E);
                    return "&fa_pv=1" + E
                }
                return ""
            },
            unload: function() {
                var B;
                for (var A = 0; A < z.length; A++) {
                    B = z[A];
                    if (B && B.trackingTimeout) {
                        e("before unload");
                        clearTimeout(B.trackingTimeout);
                        B.sendUpdate(B.fieldsWithUpdates, {}, true)
                    }
                }
            }
        });
        if (window.Piwik.initialized) {
            Piwik.on("TrackerSetup", m);
            Piwik.retryMissedPluginCalls();
            f();
            i();
            Piwik.on("TrackerAdded", function() {
                setTimeout(i, 700)
            })
        } else {
            Piwik.on("TrackerSetup", m);
            Piwik.on("MatomoInitialized", function() {
                f();
                i();
                Piwik.on("TrackerAdded", function() {
                    setTimeout(i, 700)
                })
            })
        }
    }
    if ("object" === typeof window.Piwik) {
        s()
    } else {
        if ("object" !== typeof window.matomoPluginAsyncInit) {
            window.matomoPluginAsyncInit = []
        }
        window.matomoPluginAsyncInit.push(s)
    }
})();
/* END GENERATED: tracker.min.js */


/* GENERATED: tracker.min.js */
/*!!
 * Copyright (C) InnoCraft Ltd - All rights reserved.
 *
 * All information contained herein is, and remains the property of InnoCraft Ltd.
 *
 * @link https://www.innocraft.com/
 * @license For license details see https://www.innocraft.com/license
 */
(function() {
    var a = "original";
    var n = false;
    var i = true;
    var h = "PiwikAbTesting";

    function m() {
        if (n && "undefined" !== typeof console && console && console.debug) {
            console.debug.apply(console, arguments)
        }
    }

    function b(o) {
        m(o);
        if (typeof k !== "undefined" && k && k.THROW_ERRORS) {
            throw new Error(o)
        }
    }
    var j = {
        isItpBrowser: function() {
            return navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && navigator.userAgent && navigator.userAgent.indexOf("CriOS") === -1 && navigator.userAgent.indexOf("FxiOS") === -1
        },
        getRandomNumber: function(p, o) {
            return parseInt(Math.round(Math.random() * (o - p) + p, 10))
        },
        hasLocalStorage: function() {
            if (typeof localStorage === "undefined") {
                return false
            }
            var p = new Date();
            var o;
            try {
                localStorage.setItem(p, p);
                o = localStorage.getItem(p) == p;
                localStorage.removeItem(p);
                return o && localStorage && typeof JSON === "object" && typeof JSON.parse === "function"
            } catch (q) {
                return false
            }
        },
        decodeSafe: function(p) {
            try {
                return window.decodeURIComponent(p)
            } catch (o) {
                return window.unescape(p)
            }
        },
        getQueryParameter: function(o, s) {
            o = ("" + o).toLowerCase();
            s = ("" + s).toLowerCase();
            var r = new RegExp("[?&]" + s + "(=([^&#]*)|&|#|$)", "i");
            var q = r.exec(o);
            if (!q) {
                return null
            }
            if (!q[2]) {
                return ""
            }
            var p = q[2].replace(/\+/g, " ");
            return this.decodeSafe(p)
        },
        removeQueryAndHashFromUrl: function(p) {
            var o = p.indexOf("#");
            if (o !== -1) {
                p = p.substr(0, o)
            }
            var q = p.indexOf("?");
            if (q !== -1) {
                p = p.substr(0, q)
            }
            return p
        },
        removeProtocol: function(p) {
            var o = ("" + p).indexOf("://");
            if (o !== -1 && o < 9) {
                return p.substr(o)
            }
            return p
        },
        removeWwwSubdomain: function(o) {
            return ("" + o).replace("://www.", "://")
        },
        getVariationTest: function(o) {
            if (o && o.search) {
                var p = j.getQueryParameter(o.search, "pk_ab_test");
                if (p) {
                    m("requested variation test " + p);
                    return String(p).split(",")
                }
            }
            return []
        }
    };
    var d = {
        local: function() {
            var p = localStorage.getItem(h) || "{}";
            if (p && p !== "{}") {
                localStorage.setItem(h, p)
            }
            var o = JSON.parse(p) || {};
            this.set = function(s, q, r) {
                q = s + ":" + q;
                o[q] = r;
                localStorage.setItem(h, JSON.stringify(o))
            };
            this.get = function(r, q) {
                q = r + ":" + q;
                if (o && q in o) {
                    return o[q]
                }
            };
            this.clearAll = function() {
                o = {};
                localStorage.setItem(h, JSON.stringify({}))
            }
        },
        cookies: function() {
            this.set = function(s, q, r) {
                q = h + ":" + s + ":" + q;
                var t = 365;
                var p = new Date();
                p.setTime(p.getTime() + (t * 24 * 60 * 60 * 1000));
                var o = "; expires=" + p.toGMTString();
                document.cookie = q + "=" + encodeURIComponent(r) + "; expires=" + o + "; path=/;SameSite=Lax"
            };
            this.get = function(q, p) {
                p = h + ":" + q + ":" + p;
                var r = p + "=";
                var t = document.cookie.split(";");
                for (var o = 0; o < t.length; o++) {
                    var s = t[o];
                    s = ("" + s).replace(/^\s+/, "");
                    if (s.indexOf(r) == 0) {
                        return decodeURIComponent(s.substring(r.length, s.length))
                    }
                }
            };
            this.clearAll = function() {}
        }
    };
    var e = {
        location: window.location,
        matchesTarget: function(o) {
            if (!o || !o.type || !o.attribute) {
                return true
            }
            var p = e._getValueForAttribute(o);
            return e._matchesAttribute(o, p)
        },
        matchesTargets: function(s, q) {
            if (q && q.length) {
                var o;
                for (var p = 0; p < q.length; p++) {
                    o = q[p];
                    if (this.matchesTarget(o)) {
                        return false
                    }
                }
            }
            if (s && s.length) {
                var r;
                for (var p = 0; p < s.length; p++) {
                    r = s[p];
                    if (this.matchesTarget(r)) {
                        return true
                    }
                }
                return false
            }
            return true
        },
        matchesDate: function(q, p, r) {
            var s = q.getTime() + (q.getTimezoneOffset() * 60000);
            try {
                var u = new Date(p)
            } catch (t) {
                if (p) {
                    b("Invalid startDateTime given")
                }
            }
            try {
                var o = new Date(r)
            } catch (t) {
                if (r) {
                    b("Invalid startDateTime given")
                }
            }
            if (p && isNaN && isNaN(u.getTime())) {
                b("Invalid startDateTime given")
            }
            if (r && isNaN && isNaN(o.getTime())) {
                b("Invalid endDateTime given")
            }
            if (p && s < (u.getTime() + (u.getTimezoneOffset() * 60000))) {
                return false
            }
            if (r && s > (o.getTime() + (o.getTimezoneOffset() * 60000))) {
                return false
            }
            return true
        },
        _getValueForAttribute: function(p) {
            var o = ("" + p.attribute).toLowerCase();
            switch (o) {
                case k.TARGET_ATTRIBUTE_URL:
                    return j.decodeSafe(this.location.href);
                case k.TARGET_ATTRIBUTE_PATH:
                    return j.decodeSafe(this.location.pathname);
                case k.TARGET_ATTRIBUTE_URLPARAM:
                    return j.getQueryParameter(this.location.search, p.value)
            }
        },
        _matchesAttribute: function(q, o) {
            var p = ("" + q.attribute).toLowerCase();
            switch (p) {
                case k.TARGET_ATTRIBUTE_URL:
                case k.TARGET_ATTRIBUTE_PATH:
                    return this._matchesTargetValue(o, q.type, q.inverted, q.value);
                case k.TARGET_ATTRIBUTE_URLPARAM:
                    return this._matchesTargetValue(o, q.type, q.inverted, q.value2);
                default:
                    b("Invalid target attribute")
            }
            return false
        },
        _matchesTargetValue: function(q, p, s, o) {
            var r = false;
            var s = !!s && s !== "0";
            if ("string" === typeof q) {
                q = q.toLowerCase()
            }
            if ("string" === typeof o && p !== "regexp") {
                o = o.toLowerCase()
            }
            switch (p) {
                case k.TARGET_TYPE_ANY:
                    r = true;
                    break;
                case k.TARGET_TYPE_EXISTS:
                    if (typeof q !== "undefined" && q !== null) {
                        r = true
                    }
                    break;
                case k.TARGET_TYPE_EQUALS_SIMPLE:
                    if (q && q === String(o)) {
                        r = true
                    }
                    q = j.removeQueryAndHashFromUrl(q);
                    q = j.removeProtocol(q);
                    o = j.removeProtocol(o);
                    q = j.removeWwwSubdomain(q);
                    o = j.removeWwwSubdomain(o);
                    if (q && (q === String(o) || q + "/" === String(o) || q === "/" + o || q === o + "/" || q === "/" + o + "/")) {
                        r = true
                    }
                    break;
                case k.TARGET_TYPE_EQUALS_EXACTLY:
                    if (q && q === String(o)) {
                        r = true
                    }
                    if (q && q.indexOf("://") > 0 && q.charAt(q.length - 1) === "/" && 3 === (q.split("/").length - 1) && q === (o + "/")) {
                        r = true
                    }
                    if (o && o.indexOf("://") > 0 && o.charAt(o.length - 1) === "/" && 3 === (o.split("/").length - 1) && o === (q + "/")) {
                        r = true
                    }
                    break;
                case k.TARGET_TYPE_CONTAINS:
                    if (q && q.indexOf(String(o)) !== -1) {
                        r = true
                    }
                    break;
                case k.TARGET_TYPE_STARTS_WITH:
                    if (q && q.indexOf(String(o)) === 0) {
                        r = true
                    }
                    break;
                case k.TARGET_TYPE_REGEXP:
                    if (new RegExp(o).test(q)) {
                        r = true
                    }
                    break;
                default:
                    b("Invalid target type given")
            }
            if (s) {
                return !r
            }
            return r
        }
    };
    var k = function(p) {
        this.options = p ? p : {};
        m("creating experiment with options", p);
        if (!this.options.name) {
            b('Missing experiment name in options. Use eg: new PiwikAbTesting.Experiment({name: "MyName"})')
        }
        if (!this.options.variations) {
            b('Missing "variations" option. Use eg: new PiwikAbTesting.Experiment({variations: [{...}, {...}]})')
        }
        if (typeof this.options.variations !== "object" || !this.options.variations.length) {
            b('"variations" has to be an array')
        }
        var q;
        for (q = 0; q < this.options.variations.length; q++) {
            if (typeof this.options.variations[q] !== "object") {
                b("Each variation has to be an object")
            }
            if (!this.options.variations[q].name) {
                b("Missing variation name")
            }
            if (typeof this.options.variations[q].activate !== "function") {
                b('A variation does not implement the "activate" method' + JSON.stringify(p))
            }
        }
        if (this.options.trigger && typeof this.options.trigger !== "function") {
            b('The "trigger" option is not a function')
        }
        if (this.options.matomoTracker && !this.options.piwikTracker) {
            this.options.piwikTracker = this.options.matomoTracker
        }
        if (this.options.piwikTracker) {
            if (typeof this.options.piwikTracker !== "object") {
                b("The Matomo tracker must be an instance of Piwik")
            }
            if (!this.options.piwikTracker.trackEvent) {
                b("The Matomo instance does not implement the trackEvent method. Maybe a wrong Matomo instance is based as option?")
            }
            if (!this.options.piwikTracker.trackGoal) {
                b("The Matomo instance does not implement the trackGoal method. Maybe a wrong Matomo instance is based as option?")
            }
        }
        if (this.options.percentage && this.options.percentage < 0 || this.options.percentage > 100) {
            b("percentage has to be between 0 and 100")
        }
        this.name = null;
        this.variations = null;
        this.includedTargets = null;
        this.excludedTargets = null;
        this.startDateTime = null;
        this.endDateTime = null;
        this.percentage = 100;
        this.piwikTracker = null;
        this.trigger = function() {
            return true
        };
        this._cacheForcedVariationName = null;
        if (j.hasLocalStorage()) {
            m("using local storage");
            this.storage = new d.local()
        } else {
            m("using cookies storage");
            this.storage = new d.cookies()
        }
        var o;
        for (o in this.options) {
            if (Object.prototype.hasOwnProperty.call(this.options, o)) {
                this[o] = this.options[o]
            }
        }
        this._track = function(u, t) {
            if (this.piwikTracker) {
                this.piwikTracker[u].apply(this.piwikTracker, t)
            } else {
                if (typeof window._paq === "undefined") {
                    window._paq = []
                }
                t.unshift(u);
                window._paq.push(t)
            }
            m("sent tracking request", u, t)
        };
        this.trackUsedVariation = function(t) {
            this._track("trackEvent", ["abtesting", this.name, t])
        };
        this.trackGoal = function(t) {
            if (t) {
                this._track("trackGoal", [t])
            }
        };
        this._getVariationByName = function(u) {
            u = ("" + u).toLowerCase();
            for (var t = 0; t < this.variations.length; t++) {
                if (("" + this.variations[t].name).toLowerCase() === u) {
                    return this.variations[t]
                }
            }
        };
        this._makeEvent = function(u) {
            var t = this;
            var v = function(w) {
                w()
            };
            if ("undefined" !== typeof Piwik && "undefined" !== typeof Piwik.DOM && Piwik.DOM.onReady) {
                v = Piwik.DOM.onReady
            }
            return {
                type: "activate",
                experiment: this,
                onReady: v,
                redirect: function(x) {
                    var w = "pk_abe=" + encodeURIComponent(t.name) + "&pk_abv=" + encodeURIComponent(u.name);
                    if (x && (x.indexOf("?") !== -1)) {
                        x += "&" + w
                    } else {
                        x += "?" + w
                    }
                    var z = Piwik.getAsyncTrackers();
                    for (var y = 0; y < z.length; y++) {
                        z[y].trackPageView = function() {};
                        z[y].trackEvent = function() {};
                        z[y].trackGoal = function() {}
                    }
                    if (window.location.href === x) {
                        return
                    }
                    window.location.replace(x)
                }
            }
        };
        this.forceVariation = function(w) {
            this._cacheForcedVariationName = w;
            m(this.name, "forcing variation", w);
            var u = this._getVariationByName(w);
            var t = this.storage.set("variation", this.name, w);
            if (u && u.activate) {
                var v = this._makeEvent(u);
                u.activate.apply(u, [v])
            }
            this.trackUsedVariation(w);
            return t
        };
        this.getActivatedVariationName = function() {
            var t;
            if (this._cacheForcedVariationName) {
                t = this._cacheForcedVariationName
            } else {
                t = this.storage.get("variation", this.name)
            }
            if (this._getVariationByName(t)) {
                return t
            }
        };
        this._doVariationsIncludeOriginal = function() {
            for (var u = 0; u < this.variations.length; u++) {
                var t = this.variations[u];
                if (t && t.name && t.name === a) {
                    return true
                }
            }
            return false
        };
        this._getVariationDefaultPercentage = function() {
            var u = 100;
            var x = this.variations.length;
            for (var w = 0; w < this.variations.length; w++) {
                var v = this.variations[w];
                if (v && (v.percentage || v.percentage === 0 || v.percentage === "0")) {
                    u = u - parseInt(v.percentage, 10);
                    x--
                }
            }
            var t = Math.round(u / x);
            if (t > 100) {
                t = 100
            }
            if (t < 0) {
                t = 0
            }
            return t
        };
        this.getRandomVariationName = function() {
            var z = this._getVariationDefaultPercentage();
            var w = [];
            for (var x = 0; x < this.variations.length; x++) {
                var t = z;
                if (this.variations[x].percentage || this.variations[x].percentage === 0 || this.variations[x].percentage === "0") {
                    t = this.variations[x].percentage
                }
                for (var v = 0; v < t; v++) {
                    w.push(x)
                }
            }
            var u = j.getRandomNumber(0, w.length - 1);
            var y = w[u];
            return this.variations[y].name
        };
        this._isInTestGroup = function() {
            var t = this.storage.get("isInTestGroup", this.name);
            if (typeof t !== "undefined" && t !== null) {
                return t === "1" ? true : false
            }
            t = j.getRandomNumber(1, 100) <= this.percentage;
            this.storage.set("isInTestGroup", this.name, t ? "1" : "0");
            return t
        };
        this.selectRandomVariation = function() {
            m(this.name, "select random variation");
            var t = this.getRandomVariationName();
            this.forceVariation(t);
            return t
        };
        this.shouldTrigger = function() {
            if (!i) {
                m(this.name, "wont run because feature is disabled");
                return false
            }
            if (!e.matchesDate(new Date(), this.startDateTime, this.endDateTime)) {
                m(this.name, "wont run, scheduled date does not match");
                return false
            }
            if (!e.matchesTargets(this.includedTargets, this.excludedTargets)) {
                m(this.name, "wont run, targets do not match");
                return false
            }
            if (!this.trigger()) {
                m(this.name, "wont run, disabled by trigger method");
                return false
            }
            if (!this._isInTestGroup()) {
                m(this.name, "wont run, not in test group");
                return false
            }
            return true
        };
        if (!this._doVariationsIncludeOriginal()) {
            this.variations.push({
                name: a,
                activate: function() {}
            })
        }
        var r = j.getVariationTest(window.location || null);
        if (r && r.length) {
            for (var q = 0; q < r.length; q++) {
                if (this._getVariationByName(r[q])) {
                    m("going to test variation and disable tracking " + r[q]);
                    this.trackUsedVariation = function() {};
                    this.forceVariation(r[q]);
                    return
                }
            }
        }
        if (!this.shouldTrigger()) {
            m(this.name, "experiment should not trigger");
            return
        }
        m(this.name, "should trigger");
        var s = this.getActivatedVariationName();
        if (s) {
            this.forceVariation(s)
        } else {
            m(this.name, "no existing variation found");
            this.selectRandomVariation()
        }
    };
    k.NAME_ORIGINAL_VARIATION = a;
    k.TARGET_ATTRIBUTE_URL = "url";
    k.TARGET_ATTRIBUTE_PATH = "path";
    k.TARGET_ATTRIBUTE_URLPARAM = "urlparam";
    k.TARGET_TYPE_ANY = "any";
    k.TARGET_TYPE_EXISTS = "exists";
    k.TARGET_TYPE_EQUALS_SIMPLE = "equals_simple";
    k.TARGET_TYPE_EQUALS_EXACTLY = "equals_exactly";
    k.TARGET_TYPE_CONTAINS = "contains";
    k.TARGET_TYPE_STARTS_WITH = "starts_with";
    k.TARGET_TYPE_REGEXP = "regexp";
    k.THROW_ERRORS = true;

    function f() {
        if (typeof window === "object" && "function" === typeof window.piwikAbTestingAsyncInit) {
            window.piwikAbTestingAsyncInit()
        }
        if (typeof window === "object" && "function" === typeof window.matomoAbTestingAsyncInit) {
            window.matomoAbTestingAsyncInit()
        }
    }
    var c = false;

    function g() {
        function o() {
            if (c) {
                return
            }
            if ("object" !== typeof Piwik) {
                return
            }
            var r = Piwik.getAsyncTrackers();
            if (!r || !r.length) {
                return
            }
            if (window.location && j.getQueryParameter(window.location.search, "pk_abe")) {
                c = true;
                var q = j.getQueryParameter(window.location.search, "pk_abe");
                var p = j.getQueryParameter(window.location.search, "pk_abv");
                Piwik.AbTesting.enter({
                    experiment: q,
                    variation: p
                });
                m("entered experiment from url parameters")
            }
        }
        Piwik.DOM.onReady(o);
        Piwik.DOM.onLoad(o)
    }

    function l() {
        if ("object" === typeof window && "object" === typeof window.Piwik && "object" === typeof window.Piwik.AbTesting) {
            m("wont initialize, AbTesting already loaded");
            return
        }
        if ("object" === typeof window && "object" !== typeof window.Piwik) {
            m("wont initialize, Matomo is not yet loaded");
            return
        }
        Piwik.AbTesting = {
            utils: j,
            target: e,
            storage: d,
            Experiment: k,
            disableWhenItp: function() {
                if (j.isItpBrowser()) {
                    this.disable();
                    m("disabled because itp browser")
                }
            },
            isEnabled: function() {
                return i
            },
            disable: function() {
                i = false
            },
            enable: function() {
                i = true
            },
            enter: function(o) {
                if (o && o.experiment) {
                    window._paq = window._paq || [];
                    window._paq.push(["trackEvent", "abtesting", o.experiment, o.variation || a]);
                    m("entering user into an experiment", o)
                } else {
                    m("not entering user into an experiment, missing parameter experiment")
                }
            },
            create: function(o) {
                return new k(o)
            },
            enableDebugMode: function() {
                n = true
            }
        };
        if (window.Piwik.initialized) {
            Piwik.retryMissedPluginCalls();
            f();
            g()
        } else {
            Piwik.on("MatomoInitialized", function() {
                f();
                g()
            })
        }
        if (j.isItpBrowser() && j.hasLocalStorage()) {
            new d.local()
        }
    }
    if (typeof piwikExposeAbTestingTarget !== "undefined" && piwikExposeAbTestingTarget) {
        window.piwikAbTestingTarget = e
    }
    if ("object" === typeof window.Piwik) {
        m("matomo was already loaded, initializing abTesting now");
        l()
    } else {
        if ("object" !== typeof window.matomoPluginAsyncInit) {
            window.matomoPluginAsyncInit = []
        }
        window.matomoPluginAsyncInit.push(l);
        m("matomo not loaded yet, waiting for it to be loaded")
    }
})();

/* END GENERATED: tracker.min.js */

(function() {
    function b() {
        if ("object" !== typeof _paq) {
            return false
        }
        var c = typeof _paq.length;
        if ("undefined" === c) {
            return false
        }
        return !!_paq.length
    }
    if (window && "object" === typeof window.matomoPluginAsyncInit && window.matomoPluginAsyncInit.length) {
        var a = 0;
        for (a; a < window.matomoPluginAsyncInit.length; a++) {
            if (typeof window.matomoPluginAsyncInit[a] === "function") {
                window.matomoPluginAsyncInit[a]()
            }
        }
    }
    if (window && window.piwikAsyncInit) {
        window.piwikAsyncInit()
    }
    if (window && window.matomoAsyncInit) {
        window.matomoAsyncInit()
    }
    if (!window.Matomo.getAsyncTrackers().length) {
        if (b()) {
            window.Matomo.addTracker()
        } else {
            _paq = {
                push: function(c) {
                    var d = typeof console;
                    if (d !== "undefined" && console && console.error) {
                        console.error("_paq.push() was used but Matomo tracker was not initialized before the matomo.js file was loaded. Make sure to configure the tracker via _paq.push before loading matomo.js. Alternatively, you can create a tracker via Matomo.addTracker() manually and then use _paq.push but it may not fully work as tracker methods may not be executed in the correct order.", c)
                    }
                }
            }
        }
    }
    window.Matomo.trigger("MatomoInitialized", []);
    window.Matomo.initialized = true
}());
(function() {
    var a = (typeof window.AnalyticsTracker);
    if (a === "undefined") {
        window.AnalyticsTracker = window.Matomo
    }
}());
if (typeof window.piwik_log !== "function") {
    window.piwik_log = function(c, e, g, f) {
        function b(h) {
            try {
                if (window["piwik_" + h]) {
                    return window["piwik_" + h]
                }
            } catch (i) {}
            return
        }
        var d, a = window.Matomo.getTracker(g, e);
        a.setDocumentTitle(c);
        a.setCustomData(f);
        d = b("tracker_pause");
        if (d) {
            a.setLinkTrackingTimer(d)
        }
        d = b("download_extensions");
        if (d) {
            a.setDownloadExtensions(d)
        }
        d = b("hosts_alias");
        if (d) {
            a.setDomains(d)
        }
        d = b("ignore_classes");
        if (d) {
            a.setIgnoreClasses(d)
        }
        a.trackPageView();
        if (b("install_tracker")) {
            piwik_track = function(i, j, k, h) {
                a.setSiteId(j);
                a.setTrackerUrl(k);
                a.trackLink(i, h)
            };
            a.enableLinkTracking()
        }
    }
}
/*!! @license-end */
;