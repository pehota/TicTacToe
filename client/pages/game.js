var _ = require("lodash");
var PageView = require("./base");
var NavView = require("../views/game-nav");
var PlayersFormView = require("../views/game-players-form");
var PlayersListView = require("../views/game-players-display");
var BoardView = require("../views/board");
var LeaderBoardView = require("../views/game-leaderboard");
var templates = require("../templates");

module.exports = PageView.extend({
    pageTitle: "Game",

    template: templates.pages.game,

    props: {
        msg: "string"
    },

    bindings: {
        "msg": {
            type: "text",
            hook: "game-msg"
        },
        // "model.ready": {
        //     type: "booleanClass",
        //     name: "ttt-game-on",
        //     hook: "game-container"
        // },
        "model.ready": {
            type: "toggle",
            yes: ".ttt-players-list-container, .ttt-board-container",
            no:  ".ttt-players-form-container"
        },
        "model.over": {
            type: "booleanClass",
            name: "ttt-game-over",
            hook: "game-container"
        }
    },

    modelEvents: {
        "change:over": "handleGameOver",
        "change:result": "handleChangeResult"
    },

    subviews: {
        nav: {
            hook: "game-nav",
            
            // this says we'll wait for `this.model.ready` to be truthy
            waitFor: "model.ready",

            prepareView: function(el) {
                return new NavView({
                    el: el,
                    model: this.model,
                    parent: this
                });
            }
        },
        playersForm: {
            hook: "game-players-form",
            
            waitFor: "model",

            prepareView: function(el) {
                return new PlayersFormView({
                    el: el,
                    model: this.model,
                    parent: this
                });
            }
        },
        playersDisplay: {
            hook: "game-players-list-container",
            
            waitFor: "model.ready",

            prepareView: function(el) {
                return new PlayersListView({
                    el: el,
                    collection: this.model.players,
                    parent: this
                });
            }
        },
        board: {
            hook: "game-board",
            
            waitFor: "model.ready",

            prepareView: function(el) {
                return new BoardView({
                    el: el,
                    model: this.model,
                    parent: this
                });
            }
        },
        leaderBoard: {
            hook: "game-leaderboard",
            
            waitFor: "model.results",

            prepareView: function(el) {
                return new LeaderBoardView({
                    el: el,
                    collection: this.model.results,
                    parent: this
                });
            }
        }
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    handleChangeResult: function() {
        this.msg = "";
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    handleGameOver: function(model) {
        var result = model.result;
        var msg = "";
        //game is complete - clean all data-hook attributes so no more gaming is allowed
        if (result.hasResult) {//we have a Player who won
            msg = result.winner ? result.winner.name + " wins!" : "It's a tie";
        }
        
        this.msg = msg;
    }
});