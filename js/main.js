/**
 * Created by dave on 7月26 026.
 */
var sly;
jQuery(function ($) {
    'use strict';
// $("#demo").
    // ==========================================================================
    //   Header example
    // ==========================================================================
    var $example = $('#example');
    var $frame = $example.find('.frame');
    sly = new Sly($frame, {
        horizontal: 1,
        itemNav: 'centered',
        activateMiddle: 1,
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: null,
        swingSpeed:    0,   // Swing synchronization speed, where: 1 = instant, 0 = infinite.
        scrollBar: $example.find('.scrollBar'),
        scrollBy: 1,
        scrollTrap:   true,
        activatePageOn: 'click',
        speed: 200,
        moveBy: 600,
        elasticBounds: 1,
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,

        //自动循环
        cycleBy: "items",
        cycleInterval: 1000,
        pauseOnHover: true,
        startPaused: false,

        // Buttons
        forward: $example.find('.forward'),
        backward: $example.find('.backward'),
        prev: $example.find('.prev'),
        next: $example.find('.next'),
        prevPage: $example.find('.prevPage'),
        nextPage: $example.find('.nextPage')
    }).init();



    // Method calling buttons
    $example.on('click', 'button[data-action]', function () {
        var action = $(this).data('action');

        switch (action) {
            case 'add':
                sly.add('<li>' + sly.items.length + '</li>');
                break;
            case 'remove':
                sly.remove(-1);
                break;
            default:
                sly[action]();
        }
    });

    sly.on('active', function (eventName,itemIndex) {
        console.log(eventName+"="+itemIndex);
    });
});