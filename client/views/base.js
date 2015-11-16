/*global $*/
// base view for pages and views
var View = require("ampersand-view");
var _ = require("lodash");

module.exports = View.extend({

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    initialize: function(options) {
        this.bindEventsFor("model");
        this.bindEventsFor("collection");
        return View.prototype.initialize.call(this, options);
    },

    /**
     * Binds event handlers to a "state" instance contained in "prop"
     * @param    {String}    prop - the property of "this" which events we should listen for, e.g. "model"
     * @return   {View}      the current view instance
     */
    bindEventsFor: function(prop, events) {
        events =  events || _.result(this, prop + "Events");
        prop = this[prop];

        if (prop && _.isFunction(prop.on) && _.isObject(events)) {
            _.each(events, function (handler, ev) {
                
                if (_.isString(handler)) {
                    handler = this[handler];
                }

                if (_.isFunction(handler)) {
                    prop.on(ev, handler, this);
                }
            }, this);
        }
        return this;
    }
});
