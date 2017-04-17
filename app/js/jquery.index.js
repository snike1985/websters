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

        $( '.pages' ).each( function() {
            new Pages( $( this ) );
        } );

        $( '.typistText' ).each( function() {
            new TypistText( $( this ) );
        } );
    } );

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _page = 1,
            _pages = $( '.pages' )[ 0 ],
            _levels = _obj.find( '.menu__level' ),
            _items = _obj.find( '.menu__item' ),
            _preItems = _obj.find( '.menu__pre-item' ),
            _timer = setTimeout( function(){}, 0),
            _lastSubMenu = _obj.find('.menu__submenu').eq(-1),
            _siteBtnLink = $('.site__link'),
            _canHover = true;

        //private methods
        var _addEvents = function () {

                $( 'body' ).on( {
                    touchmove: function(){
                        _removeCloneItem();
                        _items.removeClass( 'visible' );
                    }
                } );

                $( '.site__header' ).on( {
                    scroll: function(){
                        _removeCloneItem();
                        _items.removeClass( 'visible' );
                    }
                } );

                _items.on( {
                    click: function(){
                        var curElem = $( this),
                            subMenu = curElem.parent( '.menu__submenu');

                        _items.removeClass( 'visible' );

                        if ( subMenu.length) {
                            if ( subMenu.hasClass( 'open' )) {
                                subMenu.removeClass( 'open' );
                            } else {
                                $( '.menu__submenu').removeClass( 'open' );
                                _preItems.parents('.menu__submenu-wrap').find( '.menu__submenu').removeClass( 'open' );
                                subMenu.addClass( 'open' );
                            }
                        }

                        _route( curElem );

                        _canHover = false;

                        _removeCloneItem();

                        return false;
                    },
                    'mouseout': function(){
                        _removeCloneItem();
                        _items.removeClass( 'visible' );
                        _canHover = true;
                    },
                    'mousemove': function(){
                        var curElem = $(this);

                        if ( ( $( window).width() > 767 ) && ( _canHover ) && ( !$( '.site__header').hasClass( 'open' ) ) ) {
                            _cloneItem( curElem );
                        }
                    }
                } );

                _preItems.on( {
                    click: function(){
                        var curElem = $( this ),
                            subMenu = curElem.parent( '.menu__submenu');

                        _preItems.removeClass( 'visible' );

                        if ( subMenu.length) {
                            if ( subMenu.hasClass( 'open' )) {
                                subMenu.removeClass( 'open' );
                            } else {
                                $( '.menu__submenu').removeClass( 'open' );
                                _preItems.parents('.menu__submenu-wrap').find( '.menu__submenu').removeClass( 'open' );
                                subMenu.addClass( 'open' );
                            }
                        }

                        _route( curElem.next().find( '.menu__item').eq(0) );

                        _canHover = false;

                        _removeCloneItem();

                        return false;
                    },
                    'mouseout': function(){
                        _removeCloneItem();
                        _preItems.removeClass( 'visible' );
                        _canHover = true;
                    },
                    'mousemove': function(){
                        var curElem = $(this);

                        if ( ( $( window).width() > 767 ) && ( _canHover ) && ( !$( '.site__header').hasClass( 'open' ) ) ) {
                            _cloneItem( curElem );
                        }
                    }
                } );

                _siteBtnLink.on( {
                    click: function(){

                        _route( $( this ) );

                        return false;
                    }
                } );

            },
            _init = function () {
                _lastSubMenu.addClass('menu__submenu_last');
                _addEvents();
                _obj[0].obj = _self;
            },
            _closeItem = function(){
                var curItem = _items.filter( '.active' );

                curItem.removeClass( 'active' );

            },
            _cloneItem = function( item ){
                var elemTop = item.offset().top,
                    elemLeft = item.offset().left,
                    elemWidth = item.find('span').outerWidth(),
                    elemFontFamily = item.css('font-family'),
                    elemFontSize = item.css('font-size');

                _removeCloneItem();

                $('body').append('<div class="menu-item-clone">' + item.text() + '</div>');

                $('.menu-item-clone').css({
                    top: elemTop,
                    left: elemLeft,
                    width: elemWidth + 5,
                    'font-family': elemFontFamily,
                    'font-size': elemFontSize
                });

            },
            _openItem = function( item ) {

                item.addClass( 'active' );

            },
            _removeCloneItem = function( ) {

                $( '.menu-item-clone' ).remove();

            },
            _route = function( item ){
                var path = location.hash,
                    pageNumber,
                    page,
                    subPage,
                    data = item.data( 'page' ).split( ':' ),
                    newPage = data[ 0 ],
                    newSubPage = data[ 1 ],
                    direction;

                if( path == '' ){
                    path = 'page__0_1';
                    location.hash = 'page__0_1';
                }

                pageNumber = path.split( '__' );
                page = pageNumber[ 1 ].split( '_' )[ 0 ];
                subPage = pageNumber[ 1 ].split( '_' )[ 1 ];

                direction = parseInt( newPage + '' + newSubPage ) - parseInt( page + '' + subPage );

                location.hash = 'page__' + newPage + '_' + newSubPage;

                if( direction > 0 ) {
                    _pages.obj.route( 1 );
                } else if( direction < 0 ) {
                    _pages.obj.route( -1 );
                }

            },
            _setActiveItem = function( item ){
                var subMenuElem = item.parents( '.menu__submenu' );

                _removeCloneItem();
                _items.removeClass( 'visible' );
                _closeItem();

                if ( subMenuElem.length && !subMenuElem.hasClass( 'open' ) ) {
                    $( '.menu__submenu').removeClass( 'open' );
                    subMenuElem.addClass( 'open' );
                }

                item.parents( '.menu__submenu-wrap').find( '.menu__submenu').removeClass( 'open' );
                item.parents('.menu__submenu').addClass( 'open' );

                _openItem( item );
            };

        //public properties

        //public vars
        _self._lastItems = _items.eq(-1).attr('data-page').split(':');
        _self._menuItems = _items;

        //public methods
        _self.updateMenu = function( page, subPage ) {

            if( _page != page ){
                _levels.removeClass( 'active' );
            }

            if( page ){
                var level = _levels.eq( page - 1 ),
                    item = level.find( '.menu__item' ).eq( subPage - 1 );

                _page = page;

                _setActiveItem( item );

            }
        };

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