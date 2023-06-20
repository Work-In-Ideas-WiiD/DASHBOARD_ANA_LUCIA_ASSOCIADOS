
export function Clicksign(o: string) {
    "use strict";

    function n(n: any) {
        var t;//@ts-ignore
        (e[(t = n).name || t] || []).forEach(function (t: any) {
            t(n.data)
        })
    }//@ts-ignore
    var r, u, t = window.location.protocol + "//" + window.location.host,
        e = {},
        a = function (t: any) {
            n(t.data)
        };
    return {
        endpoint: "https://app.clicksign.com",
        origin: t,
        mount: function (t: any) {
            var n = "/sign/" + o,
                e = "?embedded=true&origin=" + this.origin,
                i = this.endpoint + n + e;//@ts-ignore
            return u = document.getElementById(t), (r = document.createElement("iframe")).setAttribute("src", i), r.setAttribute("style", "width: 100%; height: 100%;"), r.setAttribute("allow", "camera;geolocation"), window.addEventListener("message", a), u.appendChild(r)
        },
        unmount: function () {//@ts-ignore
            return r && (u.removeChild(r), r = u = null, window.removeEventListener("message", a)), !0
        },//@ts-ignore
        on: function (t, n) {//@ts-ignore
            return e[t] || (e[t] = []), e[t].push(n)
        },
        trigger: n
    }
}