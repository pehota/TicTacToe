/**
 * A model representing a player in a game
 * A player has a name and a "sign" (either "o" or "x") which he will be playing with
 * 
 * @author    dimitar.apostolov
 */
 var AmpersandModel = require("ampersand-model");


module.exports = AmpersandModel.extend({
    type: "player",

    props: {
        name: ["string", true, ""],
        sign: ["string", true, ""]
    },

    session: {
        //shows whether the player is the current player in the game
        active: ["boolean", true, false]
    }
});