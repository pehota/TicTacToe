var View = require("./base");
var addClass = require("amp-add-class");
var faClasses = {
    "o": "circle-o",
    "x": "times"
};

module.exports = {

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    getSignClass: function(sign) {
        sign = !(String(sign) in faClasses) ? this.playerSign : sign;
        return "fa fa-" + faClasses[sign];
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    addClass: addClass
    
};