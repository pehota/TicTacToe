var View = require("./base");
var PlayerView = require("./game-player");
var templates = require("../templates");

module.exports = View.extend({
    template: templates.includes.gamePlayerDisplay,

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
        this.renderCollection(this.collection, PlayerView, this.queryByHook("game-players-list"));
    }
});