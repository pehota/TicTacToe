(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">Tic Tac Toe</a></div></div></nav><div class="container"><main data-hook="page-container"></main><footer class="footer-main"></footer></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes/board.jade compiled template
    templatizer["includes"]["board"] = function tmpl_includes_board(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(center, tiles, undefined) {
            buf.push('<table border="1" align="center" class="ttt-board">');
            (function() {
                var $obj = tiles;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var row = $obj[$index];
                        buf.push("<tr>");
                        (function() {
                            var $obj = tiles;
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var cell = $obj[$index];
                                    buf.push("<td" + jade.attr("align", center, true, false) + ' data-hook="makemove"' + jade.attr("data-index", [ row, cell ].join(","), true, false) + ' class="ttt-tile"></td>');
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var cell = $obj[$index];
                                    buf.push("<td" + jade.attr("align", center, true, false) + ' data-hook="makemove"' + jade.attr("data-index", [ row, cell ].join(","), true, false) + ' class="ttt-tile"></td>');
                                }
                            }
                        }).call(this);
                        buf.push("</tr>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var row = $obj[$index];
                        buf.push("<tr>");
                        (function() {
                            var $obj = tiles;
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var cell = $obj[$index];
                                    buf.push("<td" + jade.attr("align", center, true, false) + ' data-hook="makemove"' + jade.attr("data-index", [ row, cell ].join(","), true, false) + ' class="ttt-tile"></td>');
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var cell = $obj[$index];
                                    buf.push("<td" + jade.attr("align", center, true, false) + ' data-hook="makemove"' + jade.attr("data-index", [ row, cell ].join(","), true, false) + ' class="ttt-tile"></td>');
                                }
                            }
                        }).call(this);
                        buf.push("</tr>");
                    }
                }
            }).call(this);
            buf.push("</table>");
        }).call(this, "center" in locals_for_with ? locals_for_with.center : typeof center !== "undefined" ? center : undefined, "tiles" in locals_for_with ? locals_for_with.tiles : typeof tiles !== "undefined" ? tiles : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/gamePlayerDisplay.jade compiled template
    templatizer["includes"]["gamePlayerDisplay"] = function tmpl_includes_gamePlayerDisplay() {
        return '<div><h4>Players Turns</h4><ul data-hook="game-players-list"></ul></div>';
    };

    // includes/gamePlayerDisplayRow.jade compiled template
    templatizer["includes"]["gamePlayerDisplayRow"] = function tmpl_includes_gamePlayerDisplayRow() {
        return '<li data-hook="game-player" class="player list-group-item"><div data-hook="sign"></div><div data-hook="name"></div></li>';
    };

    // includes/gameResultRow.jade compiled template
    templatizer["includes"]["gameResultRow"] = function tmpl_includes_gameResultRow(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
            buf.push('<li class="result list-group-item">');
            if (model.winner) {
                buf.push('<div class="ttt-leaderboard-cell ttt-leaderboard-name">' + jade.escape(null == (jade_interp = model.winner.name) ? "" : jade_interp) + '</div><div class="ttt-leaderboard-cell ttt-leaderboard-sign"><div data-hook="winner-sign"></div></div>');
            } else {
                buf.push('<div class="ttt-leaderboard-cell ttt-leaderboard-name">It\'s a tie</div><div class="ttt-leaderboard-cell ttt-leaderboard-sign">---</div>');
            }
            buf.push("</li>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // includes/gameleaderboard.jade compiled template
    templatizer["includes"]["gameleaderboard"] = function tmpl_includes_gameleaderboard() {
        return '<div class="ttt-leaderboard"><h4>Leaderboard</h4><ul><li class="result list-group-item"><div class="ttt-leaderboard-header ttt-leaderboard-name">Winner</div><div class="ttt-leaderboard-header ttt-leaderboard-sign">Played With</div></li></ul><ul data-hook="results-list"></ul></div>';
    };

    // includes/gamenav.jade compiled template
    templatizer["includes"]["gamenav"] = function tmpl_includes_gamenav() {
        return '<div class="ttt-nav"><a href="#" data-hook="game-reset" class="ttt-link ttt-reset">Start a New Game</a></div>';
    };

    // includes/gameplayersform.jade compiled template
    templatizer["includes"]["gameplayersform"] = function tmpl_includes_gameplayersform() {
        return '<div><form data-hook="game-players"><fieldset><legend>Enter Players Names</legend><div data-hook="field-container"></div><div class="buttons"><button data-hook="reset" type="submit" class="btn">Play</button></div></fieldset></form></div>';
    };

    // pages/game.jade compiled template
    templatizer["pages"]["game"] = function tmpl_pages_game(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        buf.push('<section class="page game"><h2>' + jade.escape(null == (jade_interp = "Tic Tac Toe") ? "" : jade_interp) + '</h2><div data-hook="game-container" class="ttt-game-container"><div data-hook="game-nav" class="ttt-nav-contaier"></div><div data-hook="game-msg" class="ttt-result">' + jade.escape(null == (jade_interp = "") ? "" : jade_interp) + '</div><div class="ttt-cols row-fluid"><div class="span8"><div class="ttt-section ttt-players-form-container"><div data-hook="game-players-form"></div></div><div class="ttt-section span4 ttt-players-list-container"><div data-hook="game-players-list-container"></div></div><div class="ttt-section span8 ttt-board-container"><div data-hook="game-board"></div></div></div><div class="ttt-section span4 ttt-leaderboard-container"><div data-hook="game-leaderboard"></div></div></div></div></section>');
        return buf.join("");
    };

    return templatizer;
}));
