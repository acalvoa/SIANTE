(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	LAYERS = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			KML: [{
				LINK: "kml/Sicogen_Presupuesto_Area_Educacion.kml",
				NAME: "Sicogen - Presupu. Area Educacion",
				DOC : null
			},{
				LINK: "kml/Sicogen_Prespuesto_Salud.kml",
				NAME: "Sicogen - Presupu. Area Salud",
				DOC: null
			},{
				LINK: "kml/Sicogen_Presupuesto_Area_Cementerio.kml",
				NAME: "Sicogen - Presupu. Area Cementerio",
				DOC: null
			},{
				LINK: "kml/Sicogen_Presupuesto_Gestion_Municipal.kml",
				NAME: "Sicogen - Presupu. Gestion Municipal",
				DOC: null
			},{
				LINK: "kml/Sicogen_Presupuesto_Rea_Cementerio.kml",
				NAME: "Sicogen - Presupu. Rea Cementerio",
				DOC: null
			},{
				LINK: "kml/Sica_Informe_de_Seguimiento.kml",
				NAME: "Sica - Informe de Seguimiento",
				DOC: null
			},{
				LINK: "kml/Sica_Informe_Final_auditoria.kml",
				NAME: "Sica - Informe Final de Auditoria",
				DOC: null
			},{
				LINK: "kml/Sica_Informe_Inspeccion_obra_publica.kml",
				NAME: "Sica - Informe de Insp. de obra publica.",
				DOC: null
			},{
				LINK: "kml/Sica_Informe_Investigacion_especial.kml",
				NAME: "Sica - Informe de Investigacion especial",
				DOC: null
			},{
				LINK: "kml/Sica_Reconsideracion_a_informe.kml",
				NAME: "Sica - Reconsideración a informe",
				DOC: null
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
							element.DOC = MAP.load_kml(element.LINK,{
								map:$("div[layers]").attr("map-target")
							});	
						}
						else
						{
							element.DOC.hideDocument();
						}
						
					});
					// $.getJSON('cartography/'+element+'.json', function(data){
					// 	_SETTINGS.LAYERS[element] = [];
					// 	var new_layer = prototype.clone().appendTo(body);
					// 	new_layer.children("div[label]").html(element.capitalizeFirstLetter());
					// 	new_layer.children("input[type=checkbox]").on('click', function(e){
					// 		if($(this).is(':checked')){
					// 			for(i=0;i<data.length;i++){
					// 				var SPATIAL = JSON.parse(data[i].SPATIAL_OBJECT);
					// 				for(l=0;l<SPATIAL.length;l++){
					// 					var poligono = [];
					// 					for(k=0; k<SPATIAL[l].length; k+=2){
					// 						poligono.push(new google.maps.LatLng(SPATIAL[l][k],SPATIAL[l][k+1]));
					// 					}
					// 					_SETTINGS.LAYERS[element].push(MAP.load_polygon(poligono,{
					// 						map:$("div[cartography]").attr("map-target")
					// 					}));
					// 				}
									
					// 			}
					// 		}
					// 		else
					// 		{
					// 			for(i=0;i<_SETTINGS.LAYERS[element].length;i++){
					// 				_SETTINGS.LAYERS[element][i].setMap(null);
					// 			}
					// 		}
							
					// 	});
					// });
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
