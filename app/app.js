"use strict";

angular
    .module('draggableBoxes', ['ngDragDrop', 'LocalStorageModule','btford.socket-io', 'Services', 'underscore', 'config'])
    .config(['configSettings', function(configSettings){
        var myLayout;

        var socket = io.connect(configSettings.io_location);

        var panelHandlers = {
            onopen: function(panel){
                if( ! window.inControl )
                    return;

                socket.emit('panel-open', panel);
            },
            onclose: function(panel){
                if( ! window.inControl )
                    return;

                socket.emit('panel-close', panel);
            }
        }

        socket.on('open-panel', function(panel){
            myLayout.open(panel);
        });

        socket.on('close-panel', function(panel){
            myLayout.close(panel);
        });

        var handleDragStart = function (evt) {
            evt.stopPropagation();
            var el = $(this);
            var objectType = el.data('object-type');
            $('body').addClass('dragging-' + objectType);
        };

        var handleDragStop = function (evt) {
            evt.stopPropagation();
            $('body').removeClass();
        };

        jQuery(document).on('dragstart', '.boat, .barge, .unit, .workspace-container', handleDragStart);

        jQuery(document).on('drop', handleDragStop);

        $(function(){
            // NOW create the layout
            myLayout = $('#container').layout({
                defaults: {
                    fxName: "slide",
                    fxSpeed: "slow",
                    spacing_closed: 14,
                    spacing_open: 14
                },
                west: panelHandlers,
                east: panelHandlers,
                south: panelHandlers,
                east__initClosed: true,
                west__initClosed: true,
                south__initClosed: true,
                togglerLength_open: 150,
                togglerLength_closed: 150,
                onload_end: function(){
                    var minHeight = parseInt($('.ui-layout-center').height() * 0.95);
                    $('#content .span4.workspace-column').css('min-height', minHeight + 'px');
                }
            });

            myLayout.sizePane('east', 250);
            myLayout.sizePane('west', 350);
            myLayout.sizePane('south', 350);

            // first set a 'fixed height' on the container so it does not collapse...
            var $Container = $('#container');
            $Container.height($(window).height() - $Container.offset().top);
        });

        setTimeout(function(){
            $('.ui-draggable').draggable('disable');
            myLayout.resizeAll();
        },1500);
    }]);
