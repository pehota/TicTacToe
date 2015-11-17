/**
 * A collection of game results
 * Uses the backend API to retrieve and store game results
 * 
 * @author    dimitar.apostolov
 */
var Collection = require("ampersand-rest-collection");
var Result = require("./game-result");


module.exports = Collection.extend({
    model: Result,
    url: "/api/results"
});