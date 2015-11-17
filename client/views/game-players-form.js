var _ = require("lodash");
var View = require("./base");
var FormView = require("../forms/player");
var PlayerModel = require("../models/player");
var templates = require("../templates");

module.exports = View.extend({
    template: templates.includes.gameplayersform,

    modelEvents: {
        "change:ready": function (model) {
            this.form.el.reset();
        }
    },

    subviews: {
        form: {
            container: "form",
            prepareView: function(el) {
                var model = this.model;
                var form = new FormView({
                    el: el,
                    submitCallback: function(data) {
                        var players = [];
                        var playersNames = _.omit(data, "tiles");
                        
                        for (var sign in playersNames) {
                            players.push({
                                name: playersNames[sign],
                                sign: sign
                            });
                        }
                        model.tiles = data.tiles * 1;
                        //add the players to the game model
                        model.players.reset(players);
                        return false;
                    }
                });

                return form;
            }
        }
    }
});