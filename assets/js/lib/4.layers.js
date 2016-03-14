(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	LAYERS = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			KML: [{
				LINK: "layers/sicogen.json",
				NAME: "Sicogen - Presupuesto y Ejecución",
				LOGIC : "SICOGEN_L"
			},{
				LINK: "layers/siaper.json",
				NAME: "Siaper - Distribución de Personal",
				LOGIC: "SIAPER_L"
			},{
				LINK: "layers/sica.json",
				NAME: "Sica - Audiorias",
				LOGIC: "SICA_L"
			}
			],
			APP: {}
		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			_PRIVATE.MAKE();
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			MAKE: function(){
				var body = $("div[layers] div[body]");
				var prototype = $("div[layers] div[prototype]").remove().children("div[element]");
				_SETTINGS.KML.forEach(function(element){
					var new_layer = prototype.clone().appendTo(body);
					new_layer.children("div[label]").html(element.NAME.capitalizeFirstLetter());
					new_layer.children("input[type=checkbox]").on('click', function(e){
						if($(this).is(':checked')){
							window[element.LOGIC].show();
						}
						else
						{
							window[element.LOGIC].hide();
						}
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
