var View = require("./base");
var ResultView = require("./game-leaderboard-row");
var templates = require("../templates");

module.exports = View.extend({
    template: templates.includes.gameleaderboard,

    collectionEvents: {
        "add": "render",
        "reset": "render",
        "remove": "render"
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    render: function() {
        this.renderWithTemplate();
        
        if (!this.collection.length) {
            this.collection.fetch();
        }
        
        this.renderCollection(this.collection, ResultView, this.queryByHook("results-list"));
    }
});