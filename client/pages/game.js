/**
 * A game page 
 * 
 * @author    dimitar.apostolov
 */
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

    session: {
        msg: "string"
    },

    bindings: {
        //Show any user messages 
        "msg": {
            type: "text",
            hook: "game-msg"
        },
        //Hide the user names form and show the board and players list
        //This can be achieved using a "booleanClass" binding too
        "model.ready": {
            type: "toggle",
            yes: ".ttt-players-list-container, .ttt-board-container",
            no:  ".ttt-players-form-container"
        },
        //Game over - show the "New Game" link and the game result message
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
        //"Nav" is a bit popmpous for what this subview is but ...
        //Contains the "New Game" link
        nav: {
            hook: "game-nav",
            
            //wait for `this.model.ready` to be truthy
            waitFor: "model.ready",

            prepareView: function(el) {
                return new NavView({
                    el: el,
                    model: this.model,
                    parent: this
                });
            }
        },
        //A subview showing the form where players enter their names
        playersForm: {
            hook: "game-players-form",
            //wait for `this.model`
            waitFor: "model",

            prepareView: function(el) {
                return new PlayersFormView({
                    el: el,
                    model: this.model,
                    parent: this
                });
            }
        },
        //Contains the players list and highlights the player whose turn it is to play
        playersList: {
            hook: "game-players-list-container",
            //wait for `this.model.ready` to be truthy
            waitFor: "model.ready",

            prepareView: function(el) {
                return new PlayersListView({
                    el: el,
                    collection: this.model.players,
                    parent: this
                });
            }
        },
        //The game board
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