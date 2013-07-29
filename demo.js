$(function() {
    $('#object')
    .contextual({
        iconSize: 40,
        iconSpacing: 5
    })
    .contextual('register', 'click', 'top', {
        class: 'icon icon4',
        title: 'hello, World!',
        onclick: function(event) {
            $(this.element)
            .css('padding', Math.floor(Math.random() * 100));

            this.hide();
        }
    })
    .contextual('register', 'click', 'top', {
        location: top,
        class: 'icon icon3',
        title: 'hello, World!',
        onclick: function(event) {
            $(this.element)
            .css('background-color', '#' + Math.floor(Math.random() * 16777215).toString(16));

            this.hide();
        }
    })
    .contextual('register', 'click', 'top', {
        location: top,
        class: 'icon icon2',
        title: 'hello, World!',
        onclick: function(event) {
            $(this.element)
            .css('background-color', '#' + Math.floor(Math.random() * 16777215).toString(16));

            this.hide();
        }
    })
    .contextual('register', 'click', 'top', {
        location: top,
        class: 'icon icon1',
        title: 'hello, World!',
        onclick: function(event) {
            $(this.element)
            .css('background-color', '#' + Math.floor(Math.random() * 16777215).toString(16));

            this.hide();
        }
    })
    //.contextual('register', 'click', 'click', {
        //class: 'icon icon1',
        //title: 'hello, World!',
        //onclick: function(event) {
            //alert('ok');
            //console.log('clicked!!!');
        //}
    //})
    //.contextual('register', 'click', 'click', {
        //class: 'icon icon2',
        //title: 'hello, World!',
        //onclick: function(event) {
            //alert('ok');
            //console.log('clicked!!!');
        //}
    //})
    //.contextual('register', 'click', 'click', {
        //class: 'icon icon3',
        //title: 'hello, World!',
        //onclick: function(event) {
            //alert('ok');
            //console.log('clicked!!!');
        //}
    //})
    .contextual('register', 'click', 'left', {
        class: 'icon icon1',
        title: 'hello, World!',
        onclick: function(event) {
            alert('ok');
            console.log('clicked!!!');
        }
    })
    .contextual('register', 'click', 'left', {
        class: 'icon icon2',
        title: 'hello, World!',
        onclick: function(event) {
            alert('ok');
            console.log('clicked!!!');
        }
    })
    .contextual('register', 'click', 'left', {
        class: 'icon icon3',
        title: 'hello, World!',
        onclick: function(event) {
            alert('ok');
            console.log('clicked!!!');
        }
    });


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
            $('html').unbind('mousemove', mousemove);
            $('html').unbind('mouseup', mouseup);
            if (typeof change == 'function') {
                change(event.pageX - oldEvent.pageX, event.pageY - oldEvent.pageY, event);
            }
            if (typeof stop == 'function') {
                stop(event.pageX - oldEvent.pageX, event.pageY-oldEvent.pageY, event);
            }
            return false;
        };
        $('html').bind('mousemove', mousemove);
        $('html').bind('mouseup', mouseup);	
    };

    var origin = {};

    $("#paddingBtn")
    .on('mousedown', function(event) {
        var that = this;
        var obj = $("#object");
        var paddingTop = parseInt(obj.css("padding-top")); 
        var paddingLeft = parseInt(obj.css("padding-left")); 

        slider(event, function(x, y) {
            $(that).text(x + '/' + y);
            $("#object").css({
                padding: (paddingTop + y) + 'px ' + (paddingLeft + x) + 'px'
            });
        }, function(x, y) {
            $(that).text(x + '/' + y);
        });
    });


    $("#fontSizeBtn")
    .on('mousedown', function(event) {
        var that = this;
        var obj = $("#object");
        var fontSize = parseInt(obj.css("font-size")); 

        slider(event, function(x, y) {
            $(that).text(x + '/' + y);
            $("#object").css({
                'font-size': (fontSize + x) + 'px'
            });
        }, function(x, y) {
            $(that).text(x + '/' + y);
        });
    });

});
