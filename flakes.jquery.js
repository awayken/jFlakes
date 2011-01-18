/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
/*global $: false, jQuery: false, window: false */

(function ($) {
	"use strict";

	$.fn.flakes = function (options) {		
		var o = $.extend({'type': 'snow', 'duration': 20, 'opacityStart': 1, 'opacityEnd': 0}, options || {}), t = '';
		
        function createFlake(el, prop) {
            var sizeclass = '', sizecss = { 'z-index': 50 }, icon = '&#10052;', flake = $('<div />').addClass('flake'), fh = '', fl = '';
			
            switch (Math.floor(Math.random() * 10)) {
			case 8:
			case 9:
				sizeclass = 'flake_large';
				sizecss = { 'z-index': 90 };
				break;
			case 0:
			case 1:
				sizeclass = 'flake_small';
				sizecss = { 'z-index': 10 };
				break;
            }
			
			if (o.type === 'rain') {
				icon = '&#9748;';
			}
			
            flake.addClass(sizeclass).css(sizecss).html(icon).appendTo(el).fadeIn("fast");

			fh = flake.outerHeight(true);
			fl = Math.floor(Math.random() * (prop.w - flake.width()));
			
            flake
				.css({
					'position': 'absolute',
					'overflow': 'hidden',
					'top': (-1 / 2 * fh) + 'px',
					'left': fl,
					'opacity': o.opacityStart
				})
				.animate({
					'top': (prop.h - fh) + 'px',
					'opacity': o.opacityEnd
					},
					o.duration * prop.h,
					'linear',
					function () {
						$(this).fadeOut('fast',
							function () {
								$(this).remove();
							}
						);
					}
				);
			
            t = setTimeout(function () {
				createFlake(el, prop);
			}, fl);
        }
		
		return this.each(function () {
			var el = $(this);
			
			el.addClass('flakes flake_' + o.type).css('position', 'relative');
			
			createFlake(this, { 'h': el.height(), 'w': el.width() });
		});
	};
}(jQuery));