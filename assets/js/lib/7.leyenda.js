(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	LEYENDA = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			CONTAINER: null
		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			_PRIVATE.MAKE();
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			MAKE: function(){
				_SETTINGS.PROTOTYPE = $("div[leyenda] div[prototype]").remove().children("div[itemleyed]");
				_SETTINGS.PROTOTYPECOLUMN = $("div[leyenda] div[prototypecolumn]").remove().children("div[itemleyedcolumn]");
				_SETTINGS.CONTAINER = $("div[leyenda]");
				//BUSCAMOS LAS APP CON BUTTON LAYERS
				//INGRESAMOS POR CADA APP UN BOTTON DE LAYERS
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			load: function(title){
				_SETTINGS.CONTAINER.children("div[title]").html(title);
				_SETTINGS.CONTAINER.children("div[body]").empty();
			},
			set: function(color){	
				for(h=1;h < color.length ;h++){
					var colores = _SETTINGS.PROTOTYPE.clone();
					colores.children("div[itemcolor]").css('background', color[h]);
					colores.children("div[itemnumber]").html(h);
					colores.appendTo(_SETTINGS.CONTAINER.children("div[body]"));
				}
			},
			setColumn: function(leyenda){	
				for(key in leyenda){
					var colores = _SETTINGS.PROTOTYPECOLUMN.clone();
					if(leyenda[key].TYPE == "IMG"){
						colores.children("div[itemcolor]").css('background', 'url('+leyenda[key].IMG+')');
					}
					else{
						colores.children("div[itemcolor]").css('background', leyenda[key].COLOR);
					}
					colores.children("div[itemnumber]").html(key);
					colores.appendTo(_SETTINGS.CONTAINER.children("div[body]"));
				}
			},
			clear: function(){
				_SETTINGS.CONTAINER.children("div[body]").empty();
			}
		};
		//CALL THE CONSTRUCTOR
		_CONSTRUCTOR(ARGS);
		//WE GENERATE THE INTERACTIONS
		for(key in _PUBLIC){
			this[key] = _PUBLIC[key];
		}
	};
})(jQuery);
