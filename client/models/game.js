var _ = require("lodash");
var AmpersandModel = require("ampersand-model");
var GameResultModel = require("./game-result");
var PlayerModel = require("./player");
var PlayersCollection = require("ampersand-rest-collection").extend({
    model: PlayerModel
});
var LeaderBoardResultsCollection = require("../models/game-results");

var shapes = ["o", "x"];

module.exports = AmpersandModel.extend({
    type: "game",

    props: {
        result: ["any", true, false],
        tiles: ["number", true, 3],
        results: ["any", false]
    },

    session: {
        moves: ["array", false, function() {
            return [];
        }],
        players: ["any", true],
        ready: ["boolean", true, false],
        over: ["boolean", true, false]
    },

    derived: {
        playerSign: {

            deps: ["movesCount"],

            cache: false,

            fn: function() {
                return shapes[this.movesCount % 2];
            }
        },
        movesCount: {
            deps: ["moves"],

            cache: false,

            fn: function() {
                return this.moves.length && _.compact(this.moves).length;
            }
        }
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    initialize: function() {

        this.reset();

        this.players.on("reset", function() {
            this.ready = this.players.length > 1;
            this.updateActivePlayer(this.playerSign);
        }, this);

        //Make sure "tiles" value is within a reasonable range
        this.on("change:tiles", this.validateTiles, this);

        this.on("change:over", this.saveResult, this);
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    makeMove: function(row, col) {

        //make sure row and col are numbers
        row *= 1;
        col *= 1;

        var tiles = this.tiles;
        var playerSign = this.playerSign;
        var currentPlayer = this.players.findWhere({
            sign: playerSign
        });
        var moves = this.moves;
        var currentIndex = col * tiles + row;

        moves[currentIndex] = playerSign;

        if (this.checkResult(row, col, moves)) {
            this.result.winner = currentPlayer;
        } else if (this.movesCount > Math.pow(tiles, 2) - 1) {
            //all moves are exausted, the game is a tie
            this.result.winner = null;
        }

        //Update the active player
        this.updateActivePlayer(this.playerSign);

        this.over = this.result.hasResult;

    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    checkResult: function(row, col, moves) {
        var tiles = this.tiles;
        //check row
        return this.checkArrayOfIndexes(moves, function(i) {
                return i * tiles + row;
            }) ||
            //check column
            this.checkArrayOfIndexes(moves, function(i) {
                return col * tiles + i;
            }) ||
            //check top left to bottom right diagonal
            this.checkArrayOfIndexes(moves, function(i) {
                return i * tiles + i;
            }) ||
            //check top right to bottom left diagonal
            this.checkArrayOfIndexes(moves, function(i) {
                return (tiles - i) * (tiles - 1);
            });
    },

    /**
     * Checks an
     * @param    {type}    arrayOfIndexes - description
     * @param    {Function}    currentIndexCreator - a function that returns the current index in a loop
     * @return   {type}    description
     */
    checkArrayOfIndexes: function(moves, currentIndexCreator) {
        var tiles = this.tiles;
        var values = [];
        //collect all values in the arrays
        for (var i = 0; i < tiles; ++i) {
            values.push(moves[currentIndexCreator(i)]);
        }

        values = _.unique(values);

        return values.length === 1 && void 0 !== values[0];
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    reset: function() {

        this.players = this.players || new PlayersCollection();
        this.results = this.results || new LeaderBoardResultsCollection();

        this.ready = false;

        this.over = false;

        this.result = new GameResultModel({
            game: this
        });

        this.moves = [];
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    updateActivePlayer: function(playerSign) {
        this.players.each(function (player) {
            player.active = player.sign === playerSign;
        });
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    validateTiles: function(model, tiles) {
        var prevTiles = model._previousAttributes.tiles;
        this.set("tiles", Math.max(prevTiles, Math.min(10, tiles)), {
            silent: true
        });
        this.reset();
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    saveResult: function(model, gameIsOver) {
        var result = model.result;
        var resultsList = model.results;
        if (gameIsOver) {
            resultsList.create(result, {
                wait: true
            });
        }
    }
});