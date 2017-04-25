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
                    new google.maps.Size(38, 53),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(19, 53)
                );

                var shadow = new google.maps.MarkerImage(
                    'img/marker-shadow.png',
                    new google.maps.Size(69, 53),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(19, 53)
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
                var value = Math.floor( ( _maxCount - _count )*percent );

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
            },
            _onEvents = function () {

                $(window).on({
                    'mousemove': function (e) {
                        var curX = e.pageX,
                            curY = e.pageY,
                            deltaX = curX - _oldX,
                            deltaY = curY - _oldY;

                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            if (deltaX > 0) {
                                _direction = 'right';
                            }
                            if (deltaX < 0) {
                                _direction = 'left';
                            }
                        }

                        if (Math.abs(deltaX) < Math.abs(deltaY)) {
                            if (deltaY > 0) {
                                _direction = 'bottom';
                            }
                            if (deltaY < 0) {
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

                        switch (_direction) {
                            case 'top':
                                curElem.find('a').attr('class', 'in-bottom');
                                break;
                            case 'right':
                                curElem.find('a').attr('class', 'in-left');
                                break;
                            case 'bottom':
                                curElem.find('a').attr('class', 'in-top');
                                break;
                            case 'left':
                                curElem.find('a').attr('class', 'in-right');
                                break;
                            default:
                                break;
                        }
                    },
                    'mouseleave': function () {
                        var curElem = $(this);

                        curElem.find('a').attr('class', 'out-' + _direction);
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

//
// SmoothScroll for websites v1.4.0 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
!function () {
    function e() {
        z.keyboardSupport && m("keydown", a)
    }

    function t() {
        if (!A && document.body) {
            A = !0;
            var t = document.body, o = document.documentElement, n = window.innerHeight, r = t.scrollHeight;
            if (B = document.compatMode.indexOf("CSS") >= 0 ? o : t, D = t, e(), top != self) X = !0; else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + B.scrollHeight + "px", document.body.appendChild(a);
                var i;
                T = function () {
                    i || (i = setTimeout(function () {
                        L || (a.style.height = "0", a.style.height = B.scrollHeight + "px", i = null)
                    }, 500))
                }, setTimeout(T, 10), m("resize", T);
                var l = {attributes: !0, childList: !0, characterData: !1};
                if (M = new V(T), M.observe(t, l), B.offsetHeight <= n) {
                    var c = document.createElement("div");
                    c.style.clear = "both", t.appendChild(c)
                }
            }
            z.fixedBackground || L || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o() {
        M && M.disconnect(), h(I, r), h("mousedown", i), h("keydown", a), h("resize", T), h("load", t)
    }

    function n(e, t, o) {
        if (p(t, o), 1 != z.accelerationMax) {
            var n = Date.now(), r = n - R;
            if (r < z.accelerationDelta) {
                var a = (1 + 50 / r) / 2;
                a > 1 && (a = Math.min(a, z.accelerationMax), t *= a, o *= a)
            }
            R = Date.now()
        }
        if (q.push({x: t, y: o, lastX: 0 > t ? .99 : -.99, lastY: 0 > o ? .99 : -.99, start: Date.now()}), !P) {
            var i = e === document.body, l = function (n) {
                for (var r = Date.now(), a = 0, c = 0, u = 0; u < q.length; u++) {
                    var d = q[u], s = r - d.start, f = s >= z.animationTime, m = f ? 1 : s / z.animationTime;
                    z.pulseAlgorithm && (m = x(m));
                    var h = d.x * m - d.lastX >> 0, w = d.y * m - d.lastY >> 0;
                    a += h, c += w, d.lastX += h, d.lastY += w, f && (q.splice(u, 1), u--)
                }
                i ? window.scrollBy(a, c) : (a && (e.scrollLeft += a), c && (e.scrollTop += c)), t || o || (q = []), q.length ? _(l, e, 1e3 / z.frameRate + 1) : P = !1
            };
            _(l, e, 0), P = !0
        }
    }

    function r(e) {
        A || t();
        var o = e.target, r = u(o);
        if (!r || e.defaultPrevented || e.ctrlKey)return !0;
        if (w(D, "embed") || w(o, "embed") && /\.pdf/i.test(o.src) || w(D, "object"))return !0;
        var a = -e.wheelDeltaX || e.deltaX || 0, i = -e.wheelDeltaY || e.deltaY || 0;
        return K && (e.wheelDeltaX && b(e.wheelDeltaX, 120) && (a = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && b(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), a || i || (i = -e.wheelDelta || 0), 1 === e.deltaMode && (a *= 40, i *= 40), !z.touchpadSupport && v(i) ? !0 : (Math.abs(a) > 1.2 && (a *= z.stepSize / 120), Math.abs(i) > 1.2 && (i *= z.stepSize / 120), n(r, a, i), e.preventDefault(), void l())
    }

    function a(e) {
        var t = e.target, o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== N.spacebar;
        document.contains(D) || (D = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i, a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (r.test(t.nodeName) || w(t, "input") && !a.test(t.type) || w(D, "video") || y(e) || t.isContentEditable || e.defaultPrevented || o)return !0;
        if ((w(t, "button") || w(t, "input") && a.test(t.type)) && e.keyCode === N.spacebar)return !0;
        var i, c = 0, d = 0, s = u(D), f = s.clientHeight;
        switch (s == document.body && (f = window.innerHeight), e.keyCode) {
            case N.up:
                d = -z.arrowScroll;
                break;
            case N.down:
                d = z.arrowScroll;
                break;
            case N.spacebar:
                i = e.shiftKey ? 1 : -1, d = -i * f * .9;
                break;
            case N.pageup:
                d = .9 * -f;
                break;
            case N.pagedown:
                d = .9 * f;
                break;
            case N.home:
                d = -s.scrollTop;
                break;
            case N.end:
                var m = s.scrollHeight - s.scrollTop - f;
                d = m > 0 ? m + 10 : 0;
                break;
            case N.left:
                c = -z.arrowScroll;
                break;
            case N.right:
                c = z.arrowScroll;
                break;
            default:
                return !0
        }
        n(s, c, d), e.preventDefault(), l()
    }

    function i(e) {
        D = e.target
    }

    function l() {
        clearTimeout(E), E = setInterval(function () {
            F = {}
        }, 1e3)
    }

    function c(e, t) {
        for (var o = e.length; o--;)F[j(e[o])] = t;
        return t
    }

    function u(e) {
        var t = [], o = document.body, n = B.scrollHeight;
        do {
            var r = F[j(e)];
            if (r)return c(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = s(B) && s(o), i = a || f(B);
                if (X && d(B) || !X && i)return c(t, $())
            } else if (d(e) && f(e))return c(t, e)
        } while (e = e.parentElement)
    }

    function d(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function s(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "hidden" !== t
    }

    function f(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function m(e, t) {
        window.addEventListener(e, t, !1)
    }

    function h(e, t) {
        window.removeEventListener(e, t, !1)
    }

    function w(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function p(e, t) {
        e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (Y.x !== e || Y.y !== t) && (Y.x = e, Y.y = t, q = [], R = 0)
    }

    function v(e) {
        return e ? (O.length || (O = [e, e, e]), e = Math.abs(e), O.push(e), O.shift(), clearTimeout(H), H = setTimeout(function () {
            window.localStorage && (localStorage.SS_deltaBuffer = O.join(","))
        }, 1e3), !g(120) && !g(100)) : void 0
    }

    function b(e, t) {
        return Math.floor(e / t) == e / t
    }

    function g(e) {
        return b(O[0], e) && b(O[1], e) && b(O[2], e)
    }

    function y(e) {
        var t = e.target, o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch"))do if (o = t.classList && t.classList.contains("html5-video-controls"))break; while (t = t.parentNode);
        return o
    }

    function S(e) {
        var t, o, n;
        return e *= z.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * z.pulseNormalize
    }

    function x(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == z.pulseNormalize && (z.pulseNormalize /= S(1)), S(e))
    }

    function k(e) {
        for (var t in e)C.hasOwnProperty(t) && (z[t] = e[t])
    }

    var D, M, T, E, H, C = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !1,
            fixedBackground: !0,
            excluded: ""
        }, z = C, L = !1, X = !1, Y = {x: 0, y: 0}, A = !1, B = document.documentElement, O = [],
        K = /^Mac/.test(navigator.platform),
        N = {left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36}, q = [],
        P = !1, R = Date.now(), j = function () {
            var e = 0;
            return function (t) {
                return t.uniqueID || (t.uniqueID = e++)
            }
        }(), F = {};
    window.localStorage && localStorage.SS_deltaBuffer && (O = localStorage.SS_deltaBuffer.split(","));
    var I, _ = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) {
                    window.setTimeout(e, o || 1e3 / 60)
                }
        }(), V = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, $ = function () {
            var e;
            return function () {
                if (!e) {
                    var t = document.createElement("div");
                    t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
                    var o = document.body.scrollTop;
                    document.documentElement.scrollTop;
                    window.scrollBy(0, 1), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -1), document.body.removeChild(t)
                }
                return e
            }
        }(), U = window.navigator.userAgent, W = /Edge/.test(U), G = /chrome/i.test(U) && !W, J = /safari/i.test(U) && !W,
        Q = /mobile/i.test(U), Z = (G || J) && !Q;
    "onwheel" in document.createElement("div") ? I = "wheel" : "onmousewheel" in document.createElement("div") && (I = "mousewheel"), I && Z && (m(I, r), m("mousedown", i), m("load", t)), k.destroy = o, window.SmoothScrollOptions && k(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
        return k
    }) : "object" == typeof exports ? module.exports = k : window.SmoothScroll = k
}();