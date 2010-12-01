(function($) {
	$.fn.flakes=function(o) {
		o=$.extend({"type":"snow","duration":20,"opacityStart":1,"opacityEnd":0}, o||{});
		var t="";
        function createFlake(el,prop) {
            var sizeclass="",sizecss={"z-index":50};
            switch(Math.floor(Math.random()*10)) {
            	case 8: case 9: sizeclass="jqflake_large"; sizecss={"z-index":90}; break;
            	case 0: case 1: sizeclass="jqflake_small"; sizecss={"z-index":10}; break;
            }
	    var icon="&#10052;"
            if(o.type==="rain"){
		icon="&#9748;";
	    }
            var flake=$("<div>").addClass("jqflake "+sizeclass).css(sizecss).html(icon).appendTo(el).fadeIn("fast"),fh=flake.outerHeight(true),left=Math.floor(Math.random()*(prop.w-flake.width()));
            flake.css({"top":-1/2*fh+"px","left":left,"opacity":o.opacityStart,"position":"absolute","overflow":"hidden"}).animate({"top":prop.h-fh+"px","opacity":o.opacityEnd}, o.duration*prop.h, "linear", function(){$(this).fadeOut("fast",function(){$(this).remove()});});
            t = setTimeout(function(){createFlake(el,prop);}, left);
        };
		return this.each(function() {
			var $this=$(this);
			$this.addClass("jqflakewrap jqflake_"+o.type).css("position","relative");
			createFlake(this,{"h":$this.height(),"w":$this.width()});
		});
	};
})(jQuery);
