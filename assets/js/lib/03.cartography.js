(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	CARTOGRAPHY = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			FILES: ["regional", "provincial", "comunal"],
			LAYERS: {},
			STATUS: false,
			stack: []

		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			MAP.wait_maps(_PRIVATE.INIT);
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			INIT: function(){
				var body = $("div[cartography] div[body]");
				var prototype = $("div[cartography] div[prototype]").remove().children("div[element]");
				var loaded = 0;
				_SETTINGS.FILES.forEach(function(element){
					$.getJSON('cartography/'+element+'.json', function(data){
						_SETTINGS.LAYERS[element] = [];
						var new_layer = prototype.clone().appendTo(body);
						new_layer.children("div[label]").html(element.capitalizeFirstLetter());
						for(i=0;i<data.length;i++){
							var call = function(num){
								var LAYERS = {
									name: data[num].name,
									metadata: data[num].metadata,
									SPATIAL_OBJECT: [],
									LAYER_VIEW: [],
									hide: function(){
										for(l=0;l<_SETTINGS.LAYERS[element][num].LAYER_VIEW.length;l++){
											_SETTINGS.LAYERS[element][num].LAYER_VIEW[l].setMap(null);
											_SETTINGS.LAYERS[element][num].LAYER_VIEW[l].geocgr.status = false;
										}
									},
									show: function(){
										for(l=0; l<_SETTINGS.LAYERS[element][num].SPATIAL_OBJECT.length;l++){
											if(!_SETTINGS.LAYERS[element][num].LAYER_VIEW[l].geocgr.status){
												_SETTINGS.LAYERS[element][num].LAYER_VIEW[l] = MAP.load_polygon(_SETTINGS.LAYERS[element][num].SPATIAL_OBJECT[l],{
													map:$("div[cartography]").attr("map-target")
												});
											}											
										}
									},
									fillColor: function(color){
										for(l=0; l<_SETTINGS.LAYERS[element][num].SPATIAL_OBJECT.length;l++){
											_SETTINGS.LAYERS[element][num].LAYER_VIEW[l].setOptions({
												fillColor: color
											});											
										}
									},
									borderColor: function(color){
										for(l=0; l<_SETTINGS.LAYERS[element][num].SPATIAL_OBJECT.length;l++){
											_SETTINGS.LAYERS[element][num].LAYER_VIEW[l].setOptions({
												strokeColor: color
											});											
										}
									}
								}
								var SPATIAL = data[num].SPATIAL_DATA;
								for(l=0;l<SPATIAL.length;l++){
									var poligono = [];
									for(k=0; k<SPATIAL[l].length; k+=2){
										poligono.push(new google.maps.LatLng(SPATIAL[l][k],SPATIAL[l][k+1]));
									}
									LAYERS.SPATIAL_OBJECT.push(poligono);
								}
								_SETTINGS.LAYERS[element].push(LAYERS);
							}
							call(i);
						}
						new_layer.children("input[type=checkbox]").on('click', function(e){
							if($(this).is(':checked')){
								_PUBLIC.add_cartography(element);
							}
							else
							{
								_PUBLIC.remove_cartography(element);
							}
							
						});
						//VERIFICAMOS QUE SEA LA ULTIMA CAPA EN CARGAR
						if(++loaded == _SETTINGS.FILES.length){
							_PRIVATE.CARTOGRAPHY_LOADED();
						}
					});
				});
			},
			CARTOGRAPHY_LOADED: function(){
				_SETTINGS.STATUS = true;
				for(var i=0;i<_SETTINGS.stack.length;i++){
					var callback = _SETTINGS.stack[i];
					callback();
				}
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			add_cartography: function(element){
				for(k=0;k<_SETTINGS.LAYERS[element].length;k++){
					for(l=0; l<_SETTINGS.LAYERS[element][k].SPATIAL_OBJECT.length;l++){
						_SETTINGS.LAYERS[element][k].LAYER_VIEW.push(MAP.load_polygon(_SETTINGS.LAYERS[element][k].SPATIAL_OBJECT[l],{
							map:$("div[cartography]").attr("map-target")
						}));
					}
				}
				VIEWS.add_cartography(_SETTINGS.LAYERS[element], element);
			},
			remove_cartography: function(element){
				for(k=0;k<_SETTINGS.LAYERS[element].length;k++){
					for(i=0;i<_SETTINGS.LAYERS[element][k].LAYER_VIEW.length;i++){
						_SETTINGS.LAYERS[element][k].LAYER_VIEW[i].setMap(null);
						_SETTINGS.LAYERS[element][k].LAYER_VIEW[i].geocgr.status = false;
					}
				}
				VIEWS.remove(element);
			},
			get_layers: function(type){
				if(typeof type == "undefined") return _SETTINGS.LAYERS;
				if(typeof _SETTINGS.LAYERS[type] != "undefined"){
					return _SETTINGS.LAYERS[type];
				}
				return null;
			},
			cartography_load: function(callback){
				if(!_SETTINGS.STATUS){
					_SETTINGS.stack.push(callback);
				}
				else
				{
					callback();
				}
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
