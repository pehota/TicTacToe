var app = require("ampersand-app");
var Router = require("ampersand-router");
var GamePage = require("./pages/game");

module.exports = Router.extend({
    routes: {
        "": "game",
        "(*path)": "catchAll"
    },

    //The game page
    game: function () {
        app.trigger("page", new GamePage({
            model: app.game
        }));
    },
    //All unknown routes will be redirected to the start page
    catchAll: function () {
        this.redirectTo("");
    }
});
