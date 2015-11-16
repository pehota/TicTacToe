var _ = require("lodash");
var View = require("./base");
var playerSignMixin = require("./player-signs");
var templates = require("../templates");

module.exports = View.extend(playerSignMixin, {
    template: templates.includes.board,
    
    events: {
        "click [data-hook=makemove]": "handleTileClick"
    },

    modelEvents: {
        "change:tiles": "render",
        "change:ready": "render",
        "change:over": "handleGameOver"
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    render: function() {
        this.tiles = _.range(0, this.model.tiles);
        this.renderWithTemplate();
        delete this.tiles;
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    handleGameOver: function(model) {
        var result = model.result;

        if (false === result) {
            //there is no result - reset the tiles
            this.render();
        } else {//game is complete - clean all data-hook attributes so no more gaming is allowed
            _.forEach(this.queryAllByHook("makemove"), function(tile) {
                tile.removeAttribute("data-hook");
            });
        }
    },
    
    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    handleTileClick: function(ev) {
        var tile = ev.srcElement || ev.target;
        var model = this.model;
        //requirements state that testing browser is Chrome, so there should be support for dataset
        var tileIndex = tile.dataset.index.split(",");
        var playerSign = model.playerSign;
        //remove the hook attribute to prevent further play with this tile 
        tile.removeAttribute("data-hook");
        this.addClass(tile, ["ttt-played", this.getSignClass(playerSign)]);
        model.makeMove(tileIndex[0], tileIndex[1]);
    }
});