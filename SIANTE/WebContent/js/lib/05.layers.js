(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	LAYERS = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE
		// SETTINGS
		var _SETTINGS = {
			APP: {}
		};

		var _VARS = {
			LAYERS: []
		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			_PRIVATE.LOAD();
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			MAKE: function(){
				var body = $("div[layers] div[body]");
				var prototype = $("div[layers] div[prototype]").remove().children("div[element]");
				_VARS.LAYERS.forEach(function(element){
					var new_layer = prototype.clone().appendTo(body);
					new_layer.children("div[label]").html(element.PROPS.NAME.capitalizeFirstLetter());
					new_layer.children("input[type=checkbox]").on('click', function(e){
						if($(this).is(':checked')){
							_VARS.LAYERS[element.PROPS.ID].show();
						}
						else
						{
							_VARS.LAYERS[element.PROPS.ID].hide();
						}
					});
				});
			},
			LOAD: function() {
				$.getJSON('cartography/layers.json', function(data){
					for(i=0; i<data.length; i++) {
						data[i].ID = _VARS.LAYERS.length;
						_VARS.LAYERS.push(new BaseLayer(data[i]));
					}
					
					_PRIVATE.MAKE();
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
