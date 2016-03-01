(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	MAP = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE
		// MAPS SETTINGS DEFAULT
		var _MAP = {
			LAT: -43.43778,
			LNG: -70.65028,
			ZOOM: 4,
			MINZOOM: 4,
			MAXZOOM: 17
		};		
		// SETTINGS
		var _SETTINGS = {
			MAPS: {}
		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			if(typeof google != "undefined"){
				_PRIVATE.CHECK_GOOGLEMAPS();
			}
			else
			{
				setTimeout(_CONSTRUCTOR,500);
			}
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			MAKE: function(){
				// DEFINIMOS LA BUSQUEDA DE ELEMENTO CON MATCH HTML
				var maps = $("div[map]").toArray();
				// ITERAMOS LOS RESULTADOS
				maps.forEach(function(e){
					val = $(e).attr("map");
					_SETTINGS.MAPS[val] = {
						element:$(e),
						htmlelement: e
					}
				});
				for(key in _SETTINGS.MAPS){
					var mapOptions = {
						center: new google.maps.LatLng(_MAP.LAT, _MAP.LNG),
			          	zoom: _MAP.ZOOM,
			          	minZoom: _MAP.MINZOOM,
			          	maxZoom: _MAP.MAXZOOM,
			          	disableDefaultUI: true,
			          	draggable:true,
			          	disableDoubleClickZoom: true,
			          	scrollwheel: true,
			          	mapTypeControl:true,
			          	mapTypeControlOptions : {
								position:google.maps.ControlPosition.TOP_LEFT,
						},
						mapTypeId : google.maps.MapTypeId.ROADMAP
					}
					_SETTINGS.MAPS[key].map = new google.maps.Map(_SETTINGS.MAPS[key].htmlelement, mapOptions);
				}
			},
			CHECK_GOOGLEMAPS:function(){
				var status = false;
				$("script").each(function(key,value){
					if(typeof $(value).attr('src') != "undefined" && $(value).attr('src').search('https://maps.googleapis.com/maps/api/js') != -1){
						status = true;
					}
				});
				if(!status){
					console.log("Se requiere GoogleMaps para ejecutar MAP")
					
				}else{
					//SI LA LIBRERIA ES CORRECTA LLAMAMOS AL MAPA
					_PRIVATE.MAKE();
				}
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			load_polygon: function(poli, obj){
				var poligon = new google.maps.Polygon({
				    paths: poli,
				    strokeColor: (typeof obj.bordecolor != "undefined")? obj.bordecolor :"#333333",
				    strokeOpacity: (typeof obj.bordeopa != "undefined")? obj.bordeopa :0.8,
				    strokeWeight: 1,
				    fillColor: (typeof obj.rellenocolor != "undefined")? obj.rellenocolor :"#333333",
				    fillOpacity: (typeof obj.rellenopa != "undefined")? obj.rellenopa :0.5
				});
				poligon.setMap(_SETTINGS.MAPS[obj.map].map);
				if(typeof obj.infowindow != "undefined"){
					google.maps.event.addDomListener(poligon,'click', function(){
						obj.infowindow.open(settings.mapObj,poligon,"polygon");
					});
				}
				if(typeof obj.events != "undefined"){
					$.each(obj.events, function(key,value){
						google.maps.event.addDomListener(poligon, key, value);
					})
				}
			 	return poligon;
			},
			load_kml: function(file,opt){
				var myParser = new geoXML3.parser({map: _SETTINGS.MAPS[opt.map].map});
				myParser.parse(file);
				return myParser;
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
