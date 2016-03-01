(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	CARTOGRAPHY = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			FILES: ["regional"],
			LAYERS: {

			}

		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			_PRIVATE.INIT();
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			INIT: function(){
				var body = $("div[cartography] div[body]");
				var prototype = $("div[cartography] div[prototype]").remove().children("div[element]");
				_SETTINGS.FILES.forEach(function(element){
					// var new_layer = prototype.clone().appendTo(body);
					// new_layer.children("div[label]").html(e.capitalizeFirstLetter());
					// new_layer.children("input[type=checkbox]").on('click', function(e){
					// 	if($(this).is(':checked')){
					// 		MAP.load_kml(e+'.',{
					// 			map:$("div[cartography]").attr("map-target")
					// 		});	
					// 	}
					// 	else
					// 	{
					// 		alert(2);
					// 	}
						
					// });
					$.getJSON('cartography/'+element+'.json', function(data){
						_SETTINGS.LAYERS[element] = [];
						var new_layer = prototype.clone().appendTo(body);
						new_layer.children("div[label]").html(element.capitalizeFirstLetter());
						new_layer.children("input[type=checkbox]").on('click', function(e){
							if($(this).is(':checked')){
								for(i=0;i<data.length;i++){
									var SPATIAL = JSON.parse(data[i].SPATIAL_OBJECT);
									for(l=0;l<SPATIAL.length;l++){
										var poligono = [];
										for(k=0; k<SPATIAL[l].length; k+=2){
											poligono.push(new google.maps.LatLng(SPATIAL[l][k],SPATIAL[l][k+1]));
										}
										_SETTINGS.LAYERS[element].push(MAP.load_polygon(poligono,{
											map:$("div[cartography]").attr("map-target")
										}));
									}
									
								}
							}
							else
							{
								for(i=0;i<_SETTINGS.LAYERS[element].length;i++){
									_SETTINGS.LAYERS[element][i].setMap(null);
								}
							}
							
						});
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
