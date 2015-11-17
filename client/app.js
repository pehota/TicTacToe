var app = require("ampersand-app");
var _ = require("lodash");
var config = require("clientconfig");
var Router = require("./router");
var MainView = require("./views/main");
var Game = require("./models/game");
var domReady = require("domready");

// Extends the main app singleton
app.extend({
    router: new Router(),

    game: new Game(),

    // This is where it all starts
    init: function() {
        // Create and attach our main view
        this.mainView = new MainView({
            el: document.body
        });

        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({ pushState: true });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));