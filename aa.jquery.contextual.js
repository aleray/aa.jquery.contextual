// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    /**
     * function relativeOffset (e [, currentTarget])
     *
     * Computes the relative offset of an event.
     *
     * By default, it is relative to the element the event is
     * bound to, but one can pass an arbitrary target element.
     *
     * Returns an object with top and left attributes.
     */
    var relativeOffset = function (e, currentTarget) {
        var $currentTarget = $(currentTarget || e.currentTarget);
        
        return {
            top: e.offsetY + $currentTarget.offset().top,
            left: e.offsetX + $currentTarget.offset().left,
        };
    };

    // Create the defaults once
    var pluginName = "contextual",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin (element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this._is_visible = false;
        this._buttonsClick = [];
        this._buttonsDblClick = [];

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).


            var DELAY = 300, clicks = 0, timer = null;
            var that = this;

            $(this.element).on("click", function(event){
                clicks++;  //count clicks
                if(clicks === 1) {
                    timer = setTimeout(function() {
                        that.onClick.call(that, event);
                        clicks = 0;             //after action performed, reset counter

                    }, DELAY);

                } else {
                    clearTimeout(timer);    //prevent single-click action
                    that.onDblClick.call(that, event);
                    clicks = 0;             //after action performed, reset counter
                }
            })
            .on("dblclick", function(e){
                e.preventDefault();  //cancel system double-click event
            });
        },
        _createElement: function(options) {
            var that = this;

            var elt = $('<div>')
            .addClass(options.class)
            .attr('title', options.title)
            .on('click', function(event) {
                options.onclick(event);
                that.hide();
            });

            return elt;
        },
        registerClick: function(options) {
            this._buttonsClick.push(this._createElement(options));
        },
        registerDblClick: function(options) {
            this._buttonsDblClick.push(this._createElement(options));
        },
        onClick: function(event) {
            var x = event.offsetX,
                y = event.offsetY;

            if (this._is_visible) {
                this.hide();
            } else {
                this.show({
                    x: relativeOffset(event).left, 
                    y: relativeOffset(event).top
                }, this._buttonsClick);   
            };
        },
        onDblClick: function(event) {
            var x = event.offsetX,
                y = event.offsetY;

            if (this._is_visible) {
                this.hide();
            } else {
                this.show({
                    x: relativeOffset(event).left, 
                    y: relativeOffset(event).top
                }, this._buttonsDblClick);   
            };
        },
        show: function(options, register) {
            var number = register.length,  // the number of menu entries to show 
                cols = Math.ceil(Math.sqrt(number));

            var left = options.x - (cols * 45) / 2;
            var top = options.y - (Math.floor(Math.sqrt(number)) * 45) / 2

            this._is_visible = true;

            console.log('show', options);

            for (var i=0; i<number; i++) {
                var elt = register[i];
                elt.css({
                    position: 'absolute',
                    left: options.x - 20, 
                    top: options.y - 20
                }).animate({
                    left: left + (45 * (i % cols)), 
                    top: top + (45 * parseInt(i / cols))
                }, 200).appendTo('body');
            };
        },
        hide: function() {
            // some logic
            console.log('hide');
            this._is_visible = false;
            $('.icon').detach();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    //$.fn[pluginName] = function (options) {
        //return this.each(function () {
            //if (!$.data(this, "plugin_" + pluginName)) {
                //$.data(this, "plugin_" + pluginName, new Plugin(this, options));
            //}
        //});
    //};




    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };




})(jQuery, window, document);
