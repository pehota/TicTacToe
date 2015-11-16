var View = require("ampersand-view");
var playerSignMixin = require("./player-signs");
var templates = require("../templates");


module.exports = View.extend(playerSignMixin, {
    template: templates.includes.gamePlayerDisplayRow,

    bindings: {
        "model.name": "[data-hook~=name]",
        "model.sign": {
            type: function(el, sign) {
                this.addClass(el, this.getSignClass(sign));
            }
        },

        "model.active": {
            hook: "game-player",
            type: "booleanClass",
            name: "non-active"
        }
    }
});