var View = require("./base");
var FormView = require("../forms/player");
var PersonForm = require("../forms/person");
var PlayerModel = require("../models/player");
var templates = require("../templates");

module.exports = View.extend({
    template: templates.includes.gameplayersform,

    modelEvents: {
        "change:result": function (model) {
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
                        for (var sign in data) {
                            players.push({
                                name: data[sign],
                                sign: sign
                            });
                        }
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