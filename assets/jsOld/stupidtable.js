(function (c) {
    c.fn.stupidtable = function (b) {
        return this.each(function () {
            var a = c(this);
            b = b || {};
            b = c.extend({}, c.fn.stupidtable.default_sort_fns, b);
            a.on("click.stupidtable", "th", function () {
                var d = c(this),
                    f = 0,
                    g = c.fn.stupidtable.dir;
                a.find("th").slice(0, d.index()).each(function () {
                    var a = c(this).attr("colspan") || 1;
                    f += parseInt(a, 10)
                });
                var e = d.data("sort-default") || g.ASC;
                d.data("sort-dir") && (e = d.data("sort-dir") === g.ASC ? g.DESC : g.ASC);
                var l = d.data("sort") || null;
                null !== l && (a.trigger("beforetablesort", {
                    column: f,
                    direction: e
                }), a.css("display"), setTimeout(function () {
                    var h = [],
                        m = b[l],
                        k = a.children("tbody").children("tr");
                    k.each(function (a, b) {
                        var d = c(b).children().eq(f),
                            e = d.data("sort-value"),
                            d = "undefined" !== typeof e ? e : d.text();
                        h.push([d, b])
                    });
                    h.sort(function (a, b) {
                        return m(a[0], b[0])
                    });
                    e != g.ASC && h.reverse();
                    k = c.map(h, function (a) {
                        return a[1]
                    });
                    a.children("tbody").append(k);
                    a.find("th").data("sort-dir", null).removeClass("sorting-desc sorting-asc");
                    d.data("sort-dir", e).addClass("sorting-" + e);
                    a.trigger("aftertablesort", {
                        column: f,
                        direction: e
                    });
                    a.css("display")
                }, 10))
            })
        })
    };
    c.fn.stupidtable.dir = {
        ASC: "asc",
        DESC: "desc"
    };
    c.fn.stupidtable.default_sort_fns = {
        "int": function (b, a) {
            return parseInt(b, 10) - parseInt(a, 10)
        },
        "float": function (b, a) {
            return parseFloat(b) - parseFloat(a)
        },
        string: function (b, a) {
            return b < a ? -1 : b > a ? 1 : 0
        },
        "string-ins": function (b, a) {
            b = b.toLowerCase();
            a = a.toLowerCase();
            return b < a ? -1 : b > a ? 1 : 0
        }
    }
})(jQuery);