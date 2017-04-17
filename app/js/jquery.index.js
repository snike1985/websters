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

        $( '.menu' ).each( function() {
            new Menu( $( this ) );
        } );

        $( '.hero' ).each( function() {
            new Hero( $( this ) );
        } );

        // $( '.pages' ).each( function() {
        //     new Pages( $( this ) );
        // } );

        $( '.typistText' ).each( function() {
            new TypistText( $( this ) );
        } );
    } );

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _pages = $( '.pages__item' ),
            _items = _obj.find( '.menu__item' ),
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
                        }

                        return false;
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

    var Pages = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find( '.pages__item' ),
            _page = 1,
            _subPage = 0,
            _duration = 1000,
            _menu = $( '.menu' )[ 0 ].obj,
            _active = false;

        //private methods
        var _addEvents = function () {

                $(window).on( {
                    'keyup': function(e) {
                        var keyCode = e.keyCode;

                        console.log(keyCode)
                        switch (keyCode) {
                            case 38:
                                if( !_active ){
                                    _prevPage();
                                }
                                break;
                            case 40:
                                if( !_active ){
                                    _nextPage();
                                }
                                break;
                        }
                    }
                } );

            },
            _init = function () {
                _addEvents();
                _route( 0 );
                _obj[0].obj = _self;
            },
            _nextPage = function(){
                var nextPage = _items.filter( '.pages__item_' + _page + '-' + _subPage ).next();

                if ( nextPage.length ) {
                    var nextPageClass = nextPage.attr( 'class'),
                        pages = nextPageClass.substr( nextPageClass.indexOf( 'pages__item_' ) + 12, 3).split( '-' );

                    _active = true;
                    location.hash = 'page__'+  pages[ 0 ] +'_' +pages[ 1 ];
                    _route( 1 );
                }

            },
            _prevPage = function(){
                var prevPage = _items.filter( '.pages__item_' + _page + '-' + _subPage ).prev();

                if ( prevPage.length ) {
                    var prevPageClass = prevPage.attr( 'class'),
                        pages = prevPageClass.substr( prevPageClass.indexOf( 'pages__item_' ) + 12, 3 ).split( '-' );

                    _active = true;

                    location.hash = 'page__'+  pages[ 0 ] +'_' +pages[ 1 ];
                    _route( -1 );
                }
            },
            _route = function( direction ){

                var path = location.hash.substr( 1 ),
                    pageNumber;

                if( path == '' ){
                    path = 'page__1_1';
                    location.hash = 'page__1_1';
                }

                pageNumber = path.split( '__' );
                _page = pageNumber[ 1 ].split( '_' )[ 0 ];
                _subPage = pageNumber[ 1 ].split( '_' )[ 1 ];

                var curPage = _items.filter( ':not( .hidden )'),
                    nextPage = _items.filter( '.pages__item_' + _page + '-' + _subPage );

                if( !direction ){

                    curPage = _items.filter( '.pages__item_' + _page + '-' + _subPage );

                    _items.addClass( 'hidden' );
                    curPage.removeClass( 'hidden' );

                } else if( direction > 0 ) {

                    _items.addClass( 'hidden' );
                    curPage.removeClass( 'hidden' );
                    nextPage.removeClass( 'hidden' );

                    curPage.addClass( 'to-top' );
                    nextPage.addClass( 'from-bottom' );

                    setTimeout( function(){
                        curPage.removeClass( 'to-top' );
                        nextPage.removeClass( 'from-bottom' );
                        curPage.addClass( 'hidden' );
                        _active = false;

                    }, _duration + 500 );

                } else if( direction < 0 ) {

                    _items.addClass( 'hidden' );
                    curPage.removeClass( 'hidden' );
                    nextPage.removeClass( 'hidden' );

                    curPage.addClass( 'to-bottom' );
                    nextPage.addClass( 'from-top' );

                    setTimeout( function(){
                        curPage.removeClass( 'to-bottom' );
                        nextPage.removeClass( 'from-top' );
                        curPage.addClass( 'hidden' );
                        _active = false;

                    }, _duration + 500 );

                }

                _menu.updateMenu( parseInt( _page ), parseInt( _subPage ) );

            };

        //public properties

        //public methods
        _self.route = function( direction ){
            _route( direction )
        };


        _init();
    };

    var Hero = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _video = _obj.find( 'video' );

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
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