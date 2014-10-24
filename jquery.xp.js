;(function ( $, window, document, undefined ) {

	$.exitsplash = function(options){
		this.element = window;
		defaults = {
			message:"It Works!",
			exitpage:"http://www.example.com",
			blockforever:false,
			bypassforms:true
		}
		this.settings = $.extend({},defaults,options);

		if( this.settings.bypassforms == true ){
			$("form").on("submit",this.settings,function(event){
				$(window).off("beforeunload");
			});
		}
				
		$(window).on("beforeunload", this.settings ,function(event){

				// create exit splash window

				var exit_window_html = '<div id="ExitSplashMainOuterLayer" style="position:absolute;width:100%;height:100%;z-index:99;left:0;top:0;background-color:#fff"><div style="display:block; width:100%; height:100%; position:absolute; background:#FFFFFF; margin-top:0px; margin-left:0px;" align="center"><iframe src="'+event.data.exitpage+'" width="100%" height="100%" align="middle" frameborder="0"></iframe></div></div>';				

				$('body').css({
					"top-margin":"0",
					"right-margin":"0",
					"bottom-margin":"0",
					"left-margin":"0",
					"overflow":"hidden"
				}).append(exit_window_html);

				// handle messages
				var button_message = "\n=====================\nPlease click 'Stay on Page' now!\n=====================";

				if (/Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4 && new Number(RegExp.$1) < 32) {
        			alert(event.data.message + button_message);
    			}
    			if (/MSIE[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 7) {
        		var button_message = "\n\n========================\nPlease click 'Stay on this page' now!\n========================";	
    			}
    			if(!event.data.blockforever){
    				$(window).off("beforeunload");
    			}
				var message = event.data.message + button_message;
			    return message;
		});		

	}

})( jQuery, window, document );
