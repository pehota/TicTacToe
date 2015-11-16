var app = require('ampersand-app');
var Router = require('ampersand-router');
var GamePage = require('./pages/game');

module.exports = Router.extend({
    routes: {
        '': 'game',
        '(*path)': 'catchAll'
    },

    game: function () {
        app.trigger('page', new GamePage({
            model: app.game
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
