/**
 * A model representing a game of Tic Tac Toe
 * The model is based on a frame of tiles consisting of rows and columns
 * Each tile has a column index and a row index (both zero based)
 * E.g. the tile with the "O" below can be represended as 1,1 (row index 1 and column index 1)
 * In order to calculate a result we just need to check the row/column/diagonal a tile belongs to (@see checkResult method)
 *         _____________
 *         |___|___|___|
 *         |___|_O_|___|
 *         |___|___|___|
 *
 *
 * @author    dimitar.apostolov
 */
var _ = require("lodash");
var AmpersandModel = require("ampersand-model");
var GameResultModel = require("./game-result");
var PlayerModel = require("./player");
var PlayersCollection = require("ampersand-rest-collection").extend({
    model: PlayerModel
});
var LeaderBoardResultsCollection = require("../models/game-results");
//the "shapes" which will be ised in the game
var shapes = ["o", "x"];

module.exports = AmpersandModel.extend({
    type: "game",

    props: {
        result: ["any", true, false],
        tiles: ["number", true, 3],
        results: ["any", false]
    },

    session: {
        //An one dimensional array for storing the moves in a game
        //The "moves" could have been enclosed in a model of its own (e.g. MovesModel)
        //but I think it'd be an overkill in this case (same goes for no having a "tiles" collection set)
        //The array represents a this.tiles x this.tiles frame and the index of a move 
        //can be calculated using the formula COLUMN * TILES_NUMBER + ROW
        //The index of the "O" below will be 1 * 2 + 1
        //         _____________
        //         |___|___|___|
        //         |___|_O_|___|
        //         |___|___|___|
        moves: ["array", false, function() {
            return [];
        }],
        //The players of the game
        players: ["any", true],
        //Whether the game is ready to start, i.e. alll players are in place
        ready: ["boolean", true, false],
        //Shows whether the game has finished
        over: ["boolean", true, false]
    },

    derived: {
        playerSign: {

            deps: ["movesCount"],

            cache: false,

            fn: function() {
                //Get the current player sign based on the moves made
                //First move will get shapes[0], the second - shapes[1], etc
                return shapes[this.movesCount % shapes.length];
            }
        },
        movesCount: {
            deps: ["moves"],

            cache: false,
            /**
             * Since we're storing the moves in a one dimensional array
             * and we cannot guarantee that the length of the array will be 
             * co-responding to the moves made 
             * E.g. the first move can have an index of 3 
             * then the length of the "moves" array will be 4 while just a single move was made
             *
             * @see   "moves" description on how indexes are being calculated
             * @return   {Number}    description
             */
            fn: function() {
                //Only get the non-falsy values of a non-empty array
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

        //Make sure "tiles" value is within a reasonable range
        this.on("change:tiles", this.validateTiles, this);
        //Save the resukt when the game is over
        this.on("change:over", this.saveResult, this);

        //Listen for the "reset" event of the players collection 
        this.players.on("reset", function() {
            //Game can start when there are more than one players
            this.ready = this.players.length > 1;
            //Set the active player
            this.setActivePlayer(this.playerSign);
        }, this);
    },

    /**
     * Registers a move and calculates the game result afterwards
     * @param    {Number}    row - the row index of the current move
     * @param    {Number}    col - the column index of the current move
     */
    makeMove: function(row, col) {

        //make sure row and col are numbers
        row *= 1;
        col *= 1;

        var tiles = this.tiles;
        var playerSign = this.playerSign;
        var currentIndex = col * tiles + row;

        this.moves[currentIndex] = playerSign;

        if (this.checkResult(row, col)) {
            //The winner is the player that plays with the currently selected sign
            this.result.winner = this.players.findWhere({
                sign: playerSign
            });
        } else if (this.movesCount > Math.pow(tiles, 2) - 1) {
            //all moves are exausted and there is no winner, the game is a tie
            this.result.winner = null;
        }

        //Update the active player
        this.setActivePlayer(this.playerSign);

        //If there is a result - the game is over
        this.over = this.result.hasResult;
    },

    /**
     * Checks the row/column/diagonal for the tile at "row" x "column"
     * @param    {Number}    row - the row index of the current move
     * @param    {Number}    col - the column index of the current move
     * @return   {type}    description
     */
    checkResult: function(row, col) {
        var tiles = this.tiles;
        //check row
        return this.checkArrayOfIndexes(function(i) {
                return i * tiles + row;
            }) ||
            //check column
            this.checkArrayOfIndexes(function(i) {
                return col * tiles + i;
            }) ||
            //check top left to bottom right diagonal
            this.checkArrayOfIndexes(function(i) {
                return i * tiles + i;
            }) ||
            //check top right to bottom left diagonal
            this.checkArrayOfIndexes(function(i) {
                return (tiles - i) * (tiles - 1);
            });
    },

    /**
     * Checks whether a set of elements within the this.moves array have the same value
     * Indexes of the elements are calculated usign the currentIndexCreator parameter
     *
     * @param    {Function}    currentIndexCreator - a function that returns the current index in a loop
     * @return   {Boolean}     true if all values in the set of elements are the same, false otherwise
     */
    checkArrayOfIndexes: function(currentIndexCreator) {
        var tiles = this.tiles;
        var values = [];
        
        //collect all values from the calculated indexs into one array
        for (var i = 0; i < tiles; ++i) {
            values.push(this.moves[currentIndexCreator(i)]);
        }

        //we only need to count the unique values
        values = _.unique(values);
        //                            only non-empty values count 
        return values.length === 1 && void 0 !== values[0];
    },

    /**
     * Resets/sets the game parameters
     */
    reset: function() {

        this.players = this.players || new PlayersCollection();
        this.results = this.results || new LeaderBoardResultsCollection();

        this.ready = false;

        this.over = false;

        this.result = new GameResultModel();

        this.moves = [];
    },

    /**
     * Sets a player that plays with "playerSign" as active, i.e. he's currently playing
     * @param    {String}    playerSign - sign used that player plays with
     */
    setActivePlayer: function(playerSign) {
        this.players.each(function(player) {
            player.active = player.sign === playerSign;
        });
    },

    /**
     * Makes sure the "tiles" parameter si within correct and reasonable range
     * The number of tiles represents how many tiles in a row/coulmn should there be
     * E.g. setting the tiles to 4 will result in a 4x4 frame
     * 
     * @param    {Game}    model - the current model
     * @param    {Number}    tiles - the number of tiles to use in the game
     */
    validateTiles: function(model, tiles) {
        var prevTiles = model._previousAttributes.tiles;
        var newTilesNum = Math.max(3, Math.min(10, tiles));

        if (tiles !== newTilesNum) {
            this.tiles = newTilesNum;
            this.reset();
        }
    },

    /**
     * Saves the current result
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