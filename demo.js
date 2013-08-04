$(function() {
    var obj = $('#canvas')
    .contextual({
        iconSize: 40,
        iconSpacing: 5
    });


    (function() {
        var btn = $('<div>')
        .attr({
            title: 'hello world!',
            draggable: false,
            class: 'icon icon1'

        })
        .on('click', function(event) {
            $("#canvas").toggleClass('grid');

            return false;
        });

        obj.contextual('register', 'click', 'click', btn);
    })();

    (function() {
        var tpl = _.template($('#background-image-template').html());
        var grid = function(width, height, hgutter, vgutter) {
            return {
                'background-size': (width + hgutter) + 'px ' + (height + vgutter) + 'px ',
                'background-image': tpl({
                    width: width, 
                    hgutter: hgutter, 
                    height: height, 
                    vgutter: vgutter
                })
            };
        };

        var btn = $('<div>')
        .attr({
            title: 'hello world!',
            draggable: false,
            class: 'icon icon2'

        })
        .on('mousedown', function(event) {
            var that = this;
            var obj = $("#canvas");
            var bgSize = obj.css("background-size");
            var oy = parseInt(bgSize.split(', ')[0]);
            var ox = parseInt(bgSize.split(', ')[1]);

            console.log(ox, oy);

            slider(event, function(x, y) {
                var y = (oy + y);
                var x = (ox + x);
                obj.css(grid(x, y, 5, 5));
            }, function(x, y) {
            });

            return false;
        });

        obj.contextual('register', 'click', 'click', btn);
    })();

    (function() {
        var btn = $('<div>')
        .attr({
            title: 'hello world!',
            draggable: false,
            class: 'icon icon3'

        })
        .on('mousedown', function(event) {
            var that = this;
            console.log(that);
            var obj = $("#object");
            var fontSize = parseInt(obj.css("font-size")); 

            slider(event, function(x, y) {
                //$(that).text(x + '/' + y);
                $("#object").css({
                    'font-size': (fontSize + x) + 'px'
                });
            }, function(x, y) {
                //$(that).text(x + '/' + y);
            });

            return false;
        });

        obj.contextual('register', 'click', 'click', btn);
    })();

    (function() {
        var btn = $('<div>')
        .attr({
            title: 'hello world!',
            draggable: false,
            class: 'icon icon4'

        })
        .on('mousedown', function(event) {
            var that = this;
            console.log(that);
            var obj = $("#object");
            var fontSize = parseInt(obj.css("font-size")); 

            slider(event, function(x, y) {
                //$(that).text(x + '/' + y);
                $("#object").css({
                    'font-size': (fontSize + x) + 'px'
                });
            }, function(x, y) {
                //$(that).text(x + '/' + y);
            });

            return false;
        });

        obj.contextual('register', 'click', 'click', btn);
    })();


    var obj = $('#object')
    .contextual({
        iconSize: 40,
        iconSpacing: 5
    });


    (function() {
        var btn = $('<div>')
        .attr({
            title: 'hello world!',
            draggable: false,
            class: 'icon icon1'

        })
        .on('mousedown', function(event) {
            var that = this;
            console.log(that);
            var obj = $("#object");
            var fontSize = parseInt(obj.css("font-size")); 

            slider(event, function(x, y) {
                //$(that).text(x + '/' + y);
                $("#object").css({
                    'font-size': (fontSize + x) + 'px'
                });
            }, function(x, y) {
                //$(that).text(x + '/' + y);
            });

            return false;
        });

        obj.contextual('register', 'click', 'top', btn);
    })();

    (function() {
        var btn = $('<div>')
        .attr('title', 'hello world!')
        .attr('draggable', 'false')
        .addClass('icon')
        .addClass('icon2')
        .on('mousedown', function(event) {
            var that = this;
            var obj = $("#object");
            var paddingTop = parseInt(obj.css("padding-top")); 
            var paddingLeft = parseInt(obj.css("padding-left")); 

            slider(event, function(x, y) {
                //$(that).text(x + '/' + y);
                $("#object").css({
                    padding: (paddingTop + y) + 'px ' + (paddingLeft + x) + 'px'
                });
            }, function(x, y) {
                //$(that).text(x + '/' + y);
            });
            
            return false;
        });

        obj.contextual('register', 'click', 'top', btn);
    })();


    (function() {
        var index = 0,
            fonts = [
            'mono', 
            'serif', 
            'sans'
        ];


        var btn = $('<div>')
        .attr({
            title: 'click to change font',
            draggable: false,
            class: 'icon icon3'

        })
        .on('click', function(event) {
            $("#object").css('font-family', fonts[++index % fonts.length]);

            return false;
        });

        obj.contextual('register', 'click', 'left', btn);
    })();


    (function() {
        var btn = $('<div>')
        .attr({
            title: 'click to change color',
            draggable: false,
            class: 'icon icon4'

        })
        .on('click', function(event) {
            $("#object").css('background-color', '#' + Math.floor(Math.random() * 16777215).toString(16));

            return false;
        });

        obj.contextual('register', 'click', 'left', btn);
    })();


    /* Taken from hotglue, GPL License*/
    var slider = function(event, change, stop) {
        var oldEvent = event;
        var mousemove = function(event) {
            if (typeof change == 'function') {
                change(event.pageX - oldEvent.pageX, event.pageY - oldEvent.pageY, event);
            }
            return false;
        };
        var mouseup = function(event) {
            $('html')
            .unbind('mousemove', mousemove)
            .unbind('mouseup', mouseup);

            if (typeof change == 'function') {
                change(event.pageX - oldEvent.pageX, event.pageY - oldEvent.pageY, event);
            }
            if (typeof stop == 'function') {
                stop(event.pageX - oldEvent.pageX, event.pageY-oldEvent.pageY, event);
            }
            return false;
        };

        $('html')
        .bind('mousemove', mousemove)
        .bind('mouseup', mouseup);	
    };
});

// vim: set foldmethod=indent :
