window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout( callback, 1000 / 60 );
        };
})();
( function(){

    $( function () {
        
        $( '.contacts' ).each( function() {
            new Contacts( $( this ) );
        } );

        $( '.menu' ).each( function() {
            new Menu( $( this ) );
        } );

        $( '.hero' ).each( function() {
            new Hero( $( this ) );
        } );

        $( '.portfolio' ).each( function() {
            new Portfolio( $( this ) );
        } );

        $( '.typistText' ).each( function() {
            new TypistText( $( this ) );
        } );
    } );

    var Contacts = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _map = _obj.find( '.contacts__map' ),
            _googleMap,
            _mapZoom = parseInt(_map.data( 'zoom' )),
            _mapCenter = _map.data( 'center' );

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
                    new google.maps.Size(38,53),
                    new google.maps.Point(0,0),
                    new google.maps.Point(19,53)
                );

                var shadow = new google.maps.MarkerImage(
                    'img/marker-shadow.png',
                    new google.maps.Size(69,53),
                    new google.maps.Point(0,0),
                    new google.maps.Point(19,53)
                );

                var shape = {
                    coord: [18, 0, 17, 1, 17, 2, 16, 3, 16, 4, 16, 5, 24, 6, 26, 7, 27, 8, 34, 9, 34, 10, 34, 11, 33,
                        12, 33, 13, 35, 14, 37, 15, 37, 16, 35, 17, 33, 18, 34, 19, 34, 20, 34, 21, 34, 22, 34, 23, 34,
                        24, 34, 25, 34, 26, 33, 27, 32, 28, 31, 29, 29, 30, 27, 31, 27, 32, 25, 33, 24, 34, 23, 35, 23,
                        36, 23, 37, 23, 38, 23, 39, 25, 40, 25, 41, 26, 42, 26, 43, 28, 44, 29, 45, 31, 46, 32, 47, 33,
                        48, 34, 49, 35, 50, 37, 51, 37, 52, 3, 52, 3, 51, 4, 50, 5, 49, 5, 48, 7, 47, 7, 46, 8, 45, 8,
                        44, 9, 43, 9, 42, 8, 41, 7, 40, 6, 39, 1, 38, 0, 37, 0, 36, 0, 35, 1, 34, 2, 33, 3, 32, 2, 31,
                        2, 30, 2, 29, 3, 28, 3, 27, 3, 26, 2, 25, 2, 24, 3, 23, 3, 22, 4, 21, 5, 20, 5, 19, 7, 18, 5,
                        17, 4, 16, 3, 15, 3, 14, 3, 13, 3, 12, 3, 11, 3, 10, 4, 9, 4, 8, 4, 7, 5, 6, 6, 5, 6, 4, 7, 3,
                        8, 2, 9, 1, 11, 0, 18, 0],
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

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _pages = $( '.pages__item' ),
            _items = _obj.find( '.menu__item' ),
            _btn = _obj.find( '.menu__btn' ),
            _site = $( '.site' ),
            _activeIndex = 0,
            _canClickMenuItem = true;

        //private methods
        var _addEvents = function () {

                _items.on( {
                    click: function(){
                        var curElem = $( this);

                        if ( !curElem.hasClass( 'active' ) && _canClickMenuItem ) {
                            _items.removeClass( 'active' );
                            curElem.addClass( 'active' );
                            _canClickMenuItem = false;
                            _route( curElem );
                            _site.removeClass( 'menu-open' );
                        }

                        return false;
                    }
                } );

                _btn.on( {
                    click: function(){

                        _site.toggleClass( 'menu-open' );
                    }
                } );

            },
            _setActiveItem = function () {
                var startHash = location.hash;

                _items.each(function () {
                    var curElem = $( this ),
                        curHash = curElem.data( 'page' );

                    if ( startHash == ('#' + curHash) ) {
                        _activeIndex = curElem.index();
                    }
                });

                _pages.addClass( 'hidden' );

                if ( _activeIndex < 0 ) {
                    _activeIndex = 0;
                }

                _items.eq(_activeIndex).addClass( 'active' );
                _pages.eq(_activeIndex).removeClass( 'hidden' );

                // _route( _items.eq(_activeItem) );
            },
            _init = function () {
                _addEvents();
                _setActiveItem();
                _obj[0].obj = _self;
            },
            _route = function( clickedItem ){
                var newHash = clickedItem.data( 'page' ),
                    newIndex = clickedItem.index(),
                    direction;

                direction = parseInt( newIndex ) > parseInt( _activeIndex  ) ? 'bottom' : 'top';

                var activePage = _pages.eq( _activeIndex ),
                    newPage = _pages.eq( newIndex );

                switch ( direction ) {
                    case 'top':
                        activePage.removeClass( 'hidden' );
                        newPage.removeClass( 'hidden' );

                        activePage.addClass( 'to-bottom' );
                        newPage.addClass( 'from-top' );

                        setTimeout( function(){
                            activePage.removeClass( 'to-bottom' );
                            newPage.removeClass( 'from-top' );
                            activePage.addClass( 'hidden' );
                            _canClickMenuItem = true;
                        }, 500 );
                        break;
                    case 'bottom':
                        activePage.removeClass( 'hidden' );
                        newPage.removeClass( 'hidden' );

                        activePage.addClass( 'to-top' );
                        newPage.addClass( 'from-bottom' );

                        setTimeout( function(){
                            activePage.removeClass( 'to-top' );
                            newPage.removeClass( 'from-bottom' );
                            activePage.addClass( 'hidden' );
                            _canClickMenuItem = true;
                        }, 500 );
                        break;
                    default:
                        // activePage = _items.eq(0);
                        //
                        // _items.addClass( 'hidden' );
                        // activePage.removeClass( 'hidden' );
                        break;
                }
                _activeIndex = newIndex;

                location.hash = newHash;
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
            _items = _obj.find( '.portfolio__item' ),
            _oldX = null,
            _oldY = null,
            _direction = null;
    
        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _onEvents = function () {

                $( window ).on({
                    'mousemove': function (e) {
                        var curX = e.pageX,
                        curY = e.pageY,
                        deltaX = curX - _oldX,
                        deltaY = curY - _oldY;

                        if ( Math.abs(deltaX) > Math.abs(deltaY) ) {
                            if ( deltaX > 0 ) {
                                _direction = 'right';
                            }
                            if ( deltaX < 0 ) {
                                _direction = 'left';
                            }
                        }

                        if ( Math.abs(deltaX) < Math.abs(deltaY) ) {
                            if ( deltaY > 0 ) {
                                _direction = 'bottom';
                            }
                            if ( deltaY < 0 ) {
                                _direction = 'top';
                            }
                        }

                        _oldX = curX;
                        _oldY = curY;
                    },
                    'mouseenter': function (e) {

                    },
                    'mouseleave': function (e) {
                    }
                });

                _items.on({
                    'mouseenter': function () {
                        var curElem = $(this);

                        switch ( _direction ) {
                            case 'top':
                                curElem.find( 'a' ).attr( 'class', 'in-bottom' );
                                break;
                            case 'right':
                                curElem.find( 'a' ).attr( 'class', 'in-left' );
                                break;
                            case 'bottom':
                                curElem.find( 'a' ).attr( 'class', 'in-top' );
                                break;
                            case 'left':
                                curElem.find( 'a' ).attr( 'class', 'in-right' );
                                break;
                            default:
                                break;
                        }
                    },
                    'mouseleave': function () {
                        var curElem = $(this);

                        curElem.find( 'a' ).attr( 'class', 'out-' + _direction );
                    }
                });
            };
    
        //public properties
    
        //public methods
    
        _constructor();
    };
    
    var Hero = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _text = _obj.find( '.phrases' ),
            _window = $(window),
            _video = _obj.find( 'video' ),
            _parentPage = _obj.parents( '.pages__item' ),
            _winTop = _parentPage.scrollTop();

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _onEvents = function () {
                _parentPage.on({
                    'scroll': function() {

                        var direct = _parentPage.scrollTop() > _winTop ? 'bottom' : 'top',
                            maxScrollTop = _obj.height() - _parentPage.height();

                        if ( _parentPage.scrollTop() > 0 ) {
                            _winTop = _parentPage.scrollTop();
                        } else if ( _parentPage.scrollTop() >= maxScrollTop ) {
                            _winTop = maxScrollTop;
                        } else {
                            _winTop = 0;
                        }

                        _text.css( { 'opacity': 1 - _parentPage.scrollTop()/_obj.height() } );
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
            _texts = JSON.parse(_obj.attr( 'data-texts' )),
            _letterInterval = _obj.attr( 'data-letterInterval' ),
            _textInterval = _obj.attr( 'data-textInterval' ),
            _startTime = -1,
            _textCounter = 0,
            _symbolCounter = 0,
            _tmp = 'Alex!',
            _canShowSymbol = true;

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
                _step(0);
            },
            _step = function( time ) {

                var progress;

                if ( _startTime < 0 ) {
                    _startTime = time;
                }

                progress = ( time - _startTime ) / _letterInterval;

                if ( progress > 1 ) {
                    progress = 1;
                    _startTime = time;

                    if ( _canShowSymbol ) {
                        _showLetter();
                    } else {
                        _hideLetter();
                    }
                } else {
                    requestAnimationFrame( _step );
                }

            },
            _showLetter = function () {
                var tmp = _texts[_textCounter];
                _obj.text( _obj.text() + tmp.substr(_symbolCounter,1) );
                if ( _symbolCounter < tmp.length ) {
                    _symbolCounter++;
                    requestAnimationFrame( _step );
                } else {
                    setTimeout( function () {
                        _canShowSymbol = false;
                        _symbolCounter = 0;
                        if ( _textCounter < (_texts.length - 1) ) {
                            _textCounter++;
                        } else {
                            _textCounter = 0;
                        }
                        requestAnimationFrame( _step );
                    }, 1000 );
                }
            },
            _hideLetter = function () {
                var text = _obj.text(),
                    textLength = text.length;

                if ( textLength > 0 ) {
                    _obj.text( text.substr(0,textLength - 1) );
                    requestAnimationFrame( _step );
                } else {
                    setTimeout(function () {
                        _canShowSymbol = true;
                        requestAnimationFrame( _step );
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
} )();