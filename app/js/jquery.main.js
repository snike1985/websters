"use strict";
(function () {
    var transformFactor = 0.1;

    var scale = function scale(n, min, max) {
        return n * (max - min) + min;
    };

    var $square = $('.square');

    var squareW = $square.width();
    var squareH = $square.height();

    $square.on('mousemove', function (e) {
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;

        var scaledX = scale(x / squareW, -1, 1);
        var scaledY = scale(y / squareH, -1, 1);

        $(this).css({
            'transform': 'matrix3d(\n      1, 0, ' + -scaledX * transformFactor + ', 0,\n      0, 1, ' + -scaledY * transformFactor + ', 0,\n      0, 0, 1, 0,\n      0, 0, 0, 1\n    )'
        });
    });

    $square.on('mouseleave', function (e) {
        $(this).css({
            'transform': 'matrix3d(\n      1, 0, 0, 0,\n      0, 1, 0, 0,\n      0, 0, 1, 0,\n      0, 0, 0, 1\n    )'
        });
    });

})();