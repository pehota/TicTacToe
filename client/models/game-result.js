/**
 * A model representing a game results
 * 
 * @author    dimitar.apostolov
 */
var AmpersandModel = require("ampersand-model");


module.exports = AmpersandModel.extend({
    type: "game_result",
    
    props: {
        winner: ["any", false]
    },

    derived: {
        //shows whether there is actually a result 
        hasResult: {
            deps: ["isTie", "winner"],
            fn: function () {
                //The result should either be a tie or have a winner
                return this.isTie || !!this.winner;
            }
        },
        isTie: {
            deps: ["winner"],
            
            fn: function () {
                //when there's no winner the result is a tie
                return this.winner === null;
            }
        }
    }
});
