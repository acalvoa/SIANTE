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
				_SETTINGS.BOX = $("div[leyenda] div[prototypeleyend]").remove().children("div[leyend-box]");
				_SETTINGS.PROTOTYPE = $("div[leyenda] div[prototype]").remove().children("div[itemleyed]");
				_SETTINGS.PROTOTYPECOLUMN = $("div[leyenda] div[prototypecolumn]").remove().children("div[itemleyedcolumn]");
				_SETTINGS.CONTAINER = $("div[leyenda]");
				_SETTINGS.CONTAINER.empty();
				//BUSCAMOS LAS APP CON BUTTON LAYERS
				//INGRESAMOS POR CADA APP UN BOTTON DE LAYERS
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			load: function(title){
				var box = _SETTINGS.BOX.clone();
				box.children("div[title]").html(title);
				box.children("div[body]").empty();
				var container = {
					self_box: box,
					show: function() {
						this.self_box.appendTo($("div[leyenda]"));
					},
					remove: function() {
						this.self_box.remove();
					},
					set: function(object) {
						for (var key in object) {
							var leyend = _SETTINGS.PROTOTYPE.clone();

							if(object[key].color != undefined) {
								leyend.children("div[itemcolor]").css('background', object[key].color);
							} else if(object[key].img != undefined) {
								leyend.children("div[itemcolor]").css('background-image', 'url('+object[key].img+')');
							}
							
							leyend.children("div[itemnumber]").html(key);
							leyend.appendTo(this.self_box.children("div[body]"));
						}
					}
				};
				return container;
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
