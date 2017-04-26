(function () {
    $(function () {

        function portfolio_init() {

            console.log(1111);
            var getDirection = function (ev, obj) {
                var offset=$(obj).offset();
                console.log(offset);
                var width=$(obj).width();
                var height=$(obj).height();
                var darr=[
                    Math.abs(ev.pageY - offset.top),
                    Math.abs(ev.pageX - offset.left - width),
                    Math.abs(ev.pageY - offset.top - height),
                    Math.abs(ev.pageX - offset.left)
                ];
                var d=darr.indexOf(Math.min.apply(Math, darr));

                console.log(d);
                return d;
            };

            var addClass = function ( ev, obj, state ) {
                var direction = getDirection( ev, obj ),
                    class_suffix = "";

                obj.className = "";

                switch ( direction ) {
                    case 0 : class_suffix = '-top';    break;
                    case 1 : class_suffix = '-right';  break;
                    case 2 : class_suffix = '-bottom'; break;
                    case 3 : class_suffix = '-left';   break;
                }

                obj.classList.add( state + class_suffix );
            };

            var hoverInit=function(elems) {
                $(elems).find('a').each(function () {
                    $(this).mouseenter( function (ev) {
                        addClass( ev, this, 'in' );
                    });

                    $(this).mouseleave( function (ev) {
                        addClass( ev, this, 'out' );
                    });
                });
            }

            $('.portfolio').each(function(){

                var $container=$(this);

                var callbacks=$container.data('appenedElemsCallbacks');
                if(!callbacks)
                    callbacks=[];

                var $nodes  = $container.find('.portfolio__item');

                hoverInit($nodes);

                callbacks.push(hoverInit);

            });

        }

        portfolio_init();
    })
})();