(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	INFO = new function(ARGS){
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
				_SETTINGS.CONTAINER = $("div[info]").remove();
				//BUSCAMOS LAS APP CON BUTTON LAYERS
				//INGRESAMOS POR CADA APP UN BOTTON DE LAYERS
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			load: function(title,data){
				_SETTINGS.CONTAINER.children("div[title]").html(title);
				_SETTINGS.CONTAINER.children("div[body]").empty();
				
				if(typeof data != "undefined" && data.length > 0){
					var tabla = $("<table></table>");
					var cabecera = $("<tr></tr>");
					for(i=0;i<Object.keys(data[0]).length;i++){
						$("<th></th>").appendTo(cabecera).html(Object.keys(data[0])[i]);
					}
					cabecera.appendTo(tabla);
					for(i=0;i<data.length;i++){
						var fila = $("<tr></tr>").appendTo(tabla);
						for(l=0;l<Object.keys(data[i]).length;l++){
							$("<td></td>").appendTo(fila).html(data[i][Object.keys(data[i])[l]]);
						}
					}
					tabla.appendTo(_SETTINGS.CONTAINER.children("div[body]"));
				}
			},
			show: function(x,y){
				_SETTINGS.CONTAINER.css({
					top:y,
					left:x+50
				});
				_SETTINGS.CONTAINER.appendTo($("body"));
				_SETTINGS.CONTAINER.show();
			},
			hide: function(){
				_SETTINGS.CONTAINER.remove();
				_SETTINGS.CONTAINER.hide();
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
