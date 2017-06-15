(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	LAYERS = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			KML: [
			//{
			// 	LINK: "layers/sicogen.json",
			// 	NAME: "Sicogen - Presupuesto y Ejecución",
			// 	LOGIC : "SICOGEN_L"
			// },{
			// 	LINK: "layers/siaper.json",
			// 	NAME: "Siaper - Distribución de Personal",
			// 	LOGIC: "SIAPER_L"
			// },{
			// 	LINK: "layers/sica.json",
			// 	NAME: "Sica - Auditorias",
			// 	LOGIC: "SICA_L"
			// },{
			//	LINK: "layers/servicios.kml",
			//	NAME: "Servicios Publicos",
			//	LOGIC: "SERVICES_L"
			//},
			//{	
			//	LINK: "layers/final_archivo.kml",
			//	NAME: "Servicios Publicos",
			//	LOGIC: "FINAL_ARCHIVO"
			//}
			// {	
			// 	LINK: "layers/capa_azul.kml",
			// 	NAME: "Sector Municipal",
			// 	LOGIC: "CAPA_AZUL"
			// },
			// {	
			// 	LINK: "layers/capa_roja.kml",
			// 	NAME: "Universidades",
			// 	LOGIC: "CAPA_ROJA"
			// },
			// {	
			// 	LINK: "layers/capa_verde.kml",
			// 	NAME: "Sector Público",
			// 	LOGIC: "CAPA_VERDE"
			// },
			{	
				LINK: "layers/Colegios.kml",
				NAME: "Colegios Independencía, Lo Prado",
				LOGIC: "COLEGIOS"
			},
			{	
				LINK: "layers/CONPATENTE.kml",
				NAME: "Local - Con patente",
				LOGIC: "CONPATENTE"
			},
			{	
				LINK: "layers/SINPATENTE.kml",
				NAME: "Local - Sin patente",
				LOGIC: "SINPATENTE"
			},
			{	
				LINK: "layers/SININFO.kml",
				NAME: "Local - Sin Información",
				LOGIC: "SININFO"
			},
			{	
				LINK: "layers/salud.kml",
				NAME: "Centros de Salud",
				LOGIC: "SALUD"
			},
			{	
				LINK: "layers/comisarias.kml",
				NAME: "Comisarias",
				LOGIC: "COMISARIAS"
			},
			{	
				LINK: "layers/colegios_lo_prado.kml",
				NAME: "Colegios de Lo Prado",
				LOGIC: "COLEGIOS_LO_PRADO"
			},
			{	
				LINK: "layers/locales_patentes.kml",
				NAME: "Locales con Patente - Lo Prado",
				LOGIC: "LOCALES_LO_PRADO"
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
