window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
(function () {

    $(function () {

        $('.contacts').each(function () {
            new Contacts($(this));
        });

        $('.facts__count').each(function () {
            new Facts($(this));
        });

        $('.menu').each(function () {
            new Menu($(this));
        });

        $('.hero').each(function () {
            new Hero($(this));
        });

        $('.portfolio').each(function () {
            new Portfolio($(this));
        });

        $('.typistText').each(function () {
            new TypistText($(this));
        });
    });

    var Contacts = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _map = _obj.find('.contacts__map'),
            _googleMap,
            _mapZoom = parseInt(_map.data('zoom')),
            _mapCenter = _map.data('center');

        //private methods
        var _constructor = function () {
                _onEvents();
                _initMap();
                _obj[0].obj = _self;
            },
            _addMarker = function () {

                var point = new google.maps.LatLng(_mapCenter[0], _mapCenter[1]);

                var image = new google.maps.MarkerImage(
                    'img/marker.png',
                    new google.maps.Size(56,84),
                    new google.maps.Point(0,0),
                    new google.maps.Point(28,84)
                );

                var shadow = new google.maps.MarkerImage(
                    'img/marker-shadow.png',
                    new google.maps.Size(102,84),
                    new google.maps.Point(0,0),
                    new google.maps.Point(28,84)
                );

                var shape = {
                    coord: [34, 0, 37, 1, 39, 2, 41, 3, 43, 4, 44, 5, 45, 6, 46, 7, 47, 8, 48, 9, 49, 10, 50, 11, 51,
                        12, 51, 13, 52, 14, 52, 15, 53, 16, 53, 17, 53, 18, 54, 19, 54, 20, 54, 21, 54, 22, 55, 23, 55,
                        24, 55, 25, 55, 26, 55, 27, 55, 28, 55, 29, 55, 30, 54, 31, 54, 32, 54, 33, 54, 34, 53, 35, 53,
                        36, 53, 37, 52, 38, 52, 39, 52, 40, 51, 41, 51, 42, 51, 43, 50, 44, 50, 45, 49, 46, 49, 47, 48,
                        48, 48, 49, 47, 50, 47, 51, 47, 52, 46, 53, 46, 54, 45, 55, 45, 56, 44, 57, 43, 58, 43, 59, 42,
                        60, 42, 61, 42, 62, 41, 63, 40, 64, 40, 65, 39, 66, 39, 67, 38, 68, 38, 69, 37, 70, 37, 71, 36,
                        72, 35, 73, 35, 74, 34, 75, 34, 76, 33, 77, 33, 78, 32, 79, 31, 80, 31, 81, 30, 82, 29, 83, 26,
                        83, 25, 82, 25, 81, 24, 80, 23, 79, 23, 78, 22, 77, 21, 76, 21, 75, 20, 74, 20, 73, 19, 72, 19,
                        71, 18, 70, 17, 69, 17, 68, 17, 67, 16, 66, 15, 65, 15, 64, 14, 63, 14, 62, 13, 61, 13, 60, 12,
                        59, 12, 58, 11, 57, 11, 56, 10, 55, 10, 54, 9, 53, 9, 52, 8, 51, 8, 50, 7, 49, 7, 48, 6, 47, 6,
                        46, 6, 45, 5, 44, 5, 43, 4, 42, 4, 41, 4, 40, 3, 39, 3, 38, 3, 37, 2, 36, 2, 35, 2, 34, 1, 33,
                        1, 32, 1, 31, 1, 30, 0, 29, 0, 28, 0, 27, 0, 26, 0, 25, 0, 24, 1, 23, 1, 22, 1, 21, 1, 20, 1,
                        19, 2, 18, 2, 17, 3, 16, 3, 15, 4, 14, 4, 13, 5, 12, 5, 11, 6, 10, 7, 9, 8, 8, 9, 7, 10, 6, 11,
                        5, 12, 4, 14, 3, 16, 2, 18, 1, 21, 0, 34, 0],
                    type: 'poly'
                };

                var marker = new google.maps.Marker({
                    draggable: true,
                    raiseOnDrag: false,
                    icon: image,
                    shadow: shadow,
                    shape: shape,
                    map: _googleMap,
                    position: point
                });
            },
            _initMap = function () {
                _googleMap = new google.maps.Map(_map[0], {
                    center: {lat: _mapCenter[0], lng: _mapCenter[1]},
                    zoom: _mapZoom,
                    disableDefaultUI: true,
                    styles: [{
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [{"hue": "#ff0000"}, {"saturation": -100}, {"lightness": -30}]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [{"color": "#ffffff"}]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [{"color": "#353535"}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#656565"}]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#505050"}]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#808080"}]
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{"color": "#454545"}]
                    }, {
                        "featureType": "transit",
                        "elementType": "labels",
                        "stylers": [{"hue": "#000000"}, {"saturation": 100}, {"lightness": -40},
                            {"invert_lightness": true}, {"gamma": 1.5}]
                    }]
                });

                _addMarker();
            },
            _onEvents = function () {

            };

        //public properties

        //public methods

        _constructor();
    };

    var Facts = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _count = _obj.data( 'start' ),
            _maxCount = _obj.data( 'end' ),
            _interval = _obj.data( 'interval' ),
            _startTime = -1,
            _window = $( window ),
            _canStart = false,
            _objPosition = _obj.position().top;

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
                _addCount( 0 );
                _step( 0 );

            },
            _addCount = function ( percent ) {
                var value = Math.floor( ( _maxCount - _count )*percent + _count );

                _obj.text( _valueFormating( value ) );

            },
            _canStartAnimation = function ( position ) {

                if ( _objPosition < ( position + $( window ).height() ) ) {
                    _canStart = true;
                }
            },
            _valueFormating = function ( value ) {
                var str = value.toString();

                return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, ' ');
            },
            _step = function (time) {

                if ( _canStart ) {
                    var progress;

                    if (_startTime < 0) {
                        _startTime = time;
                    }

                    progress = ( time - _startTime ) / _interval;

                    if (progress <= 1) {
                        requestAnimationFrame(_step);
                    } else {
                        progress = 1;
                    }
                    _addCount( progress );
                } else {
                    requestAnimationFrame(_step);
                }
            },
            _onEvents = function () {

                _window.on({
                    'load': function () {
                        var scrollTop = $(  this ).scrollTop();
                        _canStartAnimation( scrollTop );
                    }
                });

                $( '.pages__item' ).on({
                    'scroll': function () {
                        var scrollTop = $(  this ).scrollTop();
                        _canStartAnimation( scrollTop );
                    }
                });

            };

        //public properties

        //public methods

        _constructor();
    };

    // var Facts = function (obj) {
    //
    //     //private properties
    //     var _self = this,
    //         _obj = obj,
    //         _start = _obj.data( 'start' ),
    //         _end = _obj.data( 'end' ),
    //         _interval = _obj.data( 'interval' ),
    //         _slider = _obj.find( '.facts__count-slider' );
    //
    //     //private methods
    //     var _constructor = function () {
    //             _onEvents();
    //             _createSliderElements();
    //             _obj[0].obj = _self;
    //         },
    //         _createSliderElements = function () {
    //
    //             for ( var i = _start; i <= (_end + 1); i++ ) {
    //                 var elem = '<li>' + i + '</li>';
    //                 _slider.prepend( elem );
    //             }
    //
    //         },
    //         _onEvents = function () {
    //
    //             $( window ).on({
    //                 'load': function () {
    //                     _obj.addClass( 'active' );
    //                 }
    //             });
    //
    //         };
    //
    //     //public properties
    //
    //     //public methods
    //
    //     _constructor();
    // };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _pages = $('.pages__item'),
            _items = _obj.find('.menu__item'),
            _btn = _obj.find('.menu__btn'),
            _site = $('.site'),
            _activeIndex = 0,
            _canClickMenuItem = true;

        //private methods
        var _addEvents = function () {

                _items.on({
                    click: function () {
                        var curElem = $(this);

                        if (!curElem.hasClass('active') && _canClickMenuItem) {
                            _items.removeClass('active');
                            curElem.addClass('active');
                            _canClickMenuItem = false;
                            _route(curElem);
                            _site.removeClass('menu-open');
                        }

                        return false;
                    }
                });

                _btn.on({
                    click: function () {

                        _site.toggleClass('menu-open');
                    }
                });

                $(window).on({
                    'load': function () {
                        console.log(location.hash.length);
                    }
                });

            },
            _setActiveItem = function () {
                var startHash = location.hash;

                _items.each(function () {
                    var curElem = $(this),
                        curHash = curElem.data('page');

                    if (startHash == ('#' + curHash)) {
                        _activeIndex = curElem.index();
                    }
                });

                _pages.addClass('hidden');

                if (_activeIndex < 0) {
                    _activeIndex = 0;
                }

                _items.eq(_activeIndex).addClass('active');
                _pages.eq(_activeIndex).removeClass('hidden');

                // _route( _items.eq(_activeItem) );
            },
            _init = function () {
                _addEvents();
                _setActiveItem();
                _obj[0].obj = _self;
            },
            _route = function (clickedItem) {
                var newHash = clickedItem.data('page'),
                    newIndex = clickedItem.index(),
                    direction;

                direction = parseInt(newIndex) > parseInt(_activeIndex) ? 'bottom' : 'top';

                var activePage = _pages.eq(_activeIndex),
                    newPage = _pages.eq(newIndex);

                switch (direction) {
                    case 'top':
                        activePage.removeClass('hidden');
                        newPage.removeClass('hidden');

                        activePage.addClass('to-bottom');
                        newPage.addClass('from-top');

                        setTimeout(function () {
                            activePage.removeClass('to-bottom');
                            newPage.removeClass('from-top');
                            activePage.addClass('hidden');
                            _canClickMenuItem = true;
                        }, 500);
                        break;
                    case 'bottom':
                        activePage.removeClass('hidden');
                        newPage.removeClass('hidden');

                        activePage.addClass('to-top');
                        newPage.addClass('from-bottom');

                        setTimeout(function () {
                            activePage.removeClass('to-top');
                            newPage.removeClass('from-bottom');
                            activePage.addClass('hidden');
                            _canClickMenuItem = true;
                        }, 500);
                        break;
                    default:
                        break;
                }
                _activeIndex = newIndex;

                location.hash = newHash;
                // window.history.pushState(null, newHash, newHash)
            };

        //public properties

        //public vars

        //public methods

        _init();
    };

    var Portfolio = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.portfolio__item'),
            _oldX = null,
            _oldY = null,
            _direction = null;

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;

                _items.each(function () {
                    var elem = $( this ),
                        elemInfo = elem.find( '.portfolio__item-info' );

                    elemInfo.css( { 'background-image': elem.css( 'background-image' ) } )
                })
            },
            _onEvents = function () {

                // $(window).on({
                //     'mousemove': function (e) {
                //         var curX = e.pageX,
                //             curY = e.pageY,
                //             deltaX = curX - _oldX,
                //             deltaY = curY - _oldY;
                //
                //         if (Math.abs(deltaX) > Math.abs(deltaY)) {
                //             if (deltaX > 0) {
                //                 _direction = 'right';
                //             }
                //             if (deltaX < 0) {
                //                 _direction = 'left';
                //             }
                //         }
                //
                //         if (Math.abs(deltaX) < Math.abs(deltaY)) {
                //             if (deltaY > 0) {
                //                 _direction = 'bottom';
                //             }
                //             if (deltaY < 0) {
                //                 _direction = 'top';
                //             }
                //         }
                //
                //         _oldX = curX;
                //         _oldY = curY;
                //     },
                //     'mouseenter': function (e) {
                //
                //     },
                //     'mouseleave': function (e) {
                //     }
                // });
                //
                // _items.on({
                //     'mouseenter': function () {
                //         var curElem = $(this);
                //
                //         switch (_direction) {
                //             case 'top':
                //                 curElem.find('a').attr('class', 'in-bottom');
                //                 break;
                //             case 'right':
                //                 curElem.find('a').attr('class', 'in-left');
                //                 break;
                //             case 'bottom':
                //                 curElem.find('a').attr('class', 'in-top');
                //                 break;
                //             case 'left':
                //                 curElem.find('a').attr('class', 'in-right');
                //                 break;
                //             default:
                //                 break;
                //         }
                //     },
                //     'mouseleave': function () {
                //         var curElem = $(this);
                //
                //         curElem.find('a').attr('class', 'out-' + _direction);
                //     }
                // });
            };

        //public properties

        //public methods

        _constructor();
    };

    var Hero = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _text = _obj.find('.phrases'),
            _window = $(window),
            _video = _obj.find('video'),
            _parentPage = _obj.parents('.pages__item'),
            _winTop = _parentPage.scrollTop();

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _onEvents = function () {
                _parentPage.on({
                    'scroll': function () {

                        var direct = _parentPage.scrollTop() > _winTop ? 'bottom' : 'top',
                            maxScrollTop = _obj.height() - _parentPage.height();

                        if (_parentPage.scrollTop() > 0) {
                            _winTop = _parentPage.scrollTop();
                        } else if (_parentPage.scrollTop() >= maxScrollTop) {
                            _winTop = maxScrollTop;
                        } else {
                            _winTop = 0;
                        }

                        _text.css({'opacity': 1 - _parentPage.scrollTop() / _obj.height()});
                    }
                });
            };

        //public properties

        //public methods

        _constructor();
    };

    var TypistText = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _texts = JSON.parse(_obj.attr('data-texts')),
            _letterInterval = _obj.attr('data-letterInterval'),
            _textInterval = _obj.attr('data-textInterval'),
            _startTime = -1,
            _textCounter = 0,
            _symbolCounter = 0,
            _canShowSymbol = true;

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
                _step(0);
            },
            _step = function (time) {

                var progress;

                if (_startTime < 0) {
                    _startTime = time;
                }

                progress = ( time - _startTime ) / _letterInterval;

                if (progress > 1) {
                    progress = 1;
                    _startTime = time;

                    if (_canShowSymbol) {
                        _showLetter();
                    } else {
                        _hideLetter();
                    }
                } else {
                    requestAnimationFrame(_step);
                }

            },
            _showLetter = function () {
                var tmp = _texts[_textCounter];
                _obj.text(_obj.text() + tmp.substr(_symbolCounter, 1));
                if (_symbolCounter < tmp.length) {
                    _symbolCounter++;
                    requestAnimationFrame(_step);
                } else {
                    setTimeout(function () {
                        _canShowSymbol = false;
                        _symbolCounter = 0;
                        if (_textCounter < (_texts.length - 1)) {
                            _textCounter++;
                        } else {
                            _textCounter = 0;
                        }
                        requestAnimationFrame(_step);
                    }, 1000);
                }
            },
            _hideLetter = function () {
                var text = _obj.text(),
                    textLength = text.length;

                if (textLength > 0) {
                    _obj.text(text.substr(0, textLength - 1));
                    requestAnimationFrame(_step);
                } else {
                    setTimeout(function () {
                        _canShowSymbol = true;
                        requestAnimationFrame(_step);
                    }, 500);
                }
            },
            _onEvents = function () {
                $(window).on({
                    'load': function () {

                    }
                });
            };

        //public properties

        //public methods

        _constructor();
    };
})();