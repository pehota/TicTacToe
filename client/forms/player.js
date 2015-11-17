/**
 * A form used for entering the players names 
 * 
 * @author    dimitar.apostolov
 */
var _ = require("lodash");
var FormView = require("ampersand-form-view");
var templates = require("../templates");
var InputView = require("ampersand-input-view");
var SelectView = require("ampersand-select-view");
var selectOptions = _.range(3, 11).map(function (num) {
    return String(num);
});

module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: "Player O: ",
                name: "o",
                type: "text",
                required: true,
                placeholder: "Player O",
                parent: this
            }),
            new InputView({
                label: "Player X: ",
                name: "x",
                type: "text",
                required: true,
                placeholder: "Player X",
                parent: this
            }),
            new SelectView({
                label: "Number of tiles: ",
                name: "tiles",
                required: true,
                options: selectOptions,
                parent: this
            })
        ];
    }
});