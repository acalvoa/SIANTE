(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	BUTTON = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			APP: {}
		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			_PRIVATE.MAKE();
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			MAKE: function(){
				var apps = $("app[button]").toArray();
				var prototype = $("div[buttons] div[prototype]").remove().children("div[button]");
				var buttons = $("div[buttons]");
				//BUSCAMOS LAS APP CON BUTTON LAYERS
				//INGRESAMOS POR CADA APP UN BOTTON DE LAYERS
				apps.forEach(function(e){
					var element = $(e);
					_SETTINGS.APP[element.attr("name")] = $(e).parent(); 
					_SETTINGS.APP[element.attr("name")].hide();
					element.remove();
					//EXTRAEMOS EL PROTOTIPO
					var new_button = prototype.clone();
					//ASIGNAMOS EL ICONO AL PROTOTIPO
					element.children().appendTo(new_button.children("div[icon]"));
					new_button.appendTo(buttons);
					new_button.on('click', function(){
						_SETTINGS.APP[element.attr("name")].toggle();
					});
					new_button.popover({
						content: element.attr("leyend"),
						placement: "top"
					});
					new_button.on('mouseenter', function(){
						new_button.popover('show');
					});
					new_button.on('mouseleave', function(){
						new_button.popover('hide');
					});
				});
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
		};
		//CALL THE CONSTRUCTOR
		_CONSTRUCTOR(ARGS);
		//WE GENERATE THE INTERACTIONS
		for(key in _PUBLIC){
			this[key] = _PUBLIC[key];
		}
	};
})(jQuery);
