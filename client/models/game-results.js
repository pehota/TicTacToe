var Collection = require("ampersand-rest-collection");
var Result = require("./game-result");


module.exports = Collection.extend({
    model: Result,
    url: "/api/results"
});