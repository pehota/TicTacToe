var View = require("ampersand-view");
var templates = require("../templates");
var playerSignMixin = require("./player-signs");

module.exports = View.extend(playerSignMixin, {
    template: templates.includes.gameResultRow,
    bindings: {
        "model.winner.sign": {
            hook: "winner-sign",
            type: function(el, sign) {
                this.addClass(el, this.getSignClass(sign));
            }
        }
    }
});