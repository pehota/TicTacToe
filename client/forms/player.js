var FormView = require("ampersand-form-view");
var templates = require("../templates");
// var InputView = require("ampersand-array-input-view");
var InputView = require("ampersand-input-view");

module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: "Player O: ",
                name: "o",
                type: "text",
                fieldTemplate: templates.includes.formInput(),
                required: true,
                placeholder: "Player O",
                parent: this
            }),
            new InputView({
                label: "Player X: ",
                name: "x",
                type: "text",
                fieldTemplate: templates.includes.formInput(),
                required: true,
                placeholder: "Player X",
                parent: this
            })
        ];
    }
});