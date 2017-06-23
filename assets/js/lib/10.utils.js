(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	GEOUTILS = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
		};
		//DEPENDENCIES
		var _DEPENDENCIES = ["MAP","CARTOGRAPHY", "LAYERS"]
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			//ESPERAMOS LAS DEPENDENCIAS
			_AUX.WAIT_DEP(0, function(){
				MAP.wait_maps(_PRIVATE.INIT);
			});
		}
		// AUXILIARIA METHOD
		var _AUX = {
			WAIT_DEP: function(DEP,callback){
				if(typeof window[_DEPENDENCIES[DEP]] != "undefined"){
					if((DEP+1) == _DEPENDENCIES.length){
						callback();
					}
					else
					{
						_AUX.WAIT_DEP(++DEP,callback);
					}
				}
				else
				{
					setTimeout(function(){
						_AUX.WAIT_DEP(DEP,callback);
					},500);
				}
			}
		};
		// PRIVATE METHODS
		var _PRIVATE = {
			INIT: function(){
				
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			convert_folder: function(layer){
				$.ajax({
					url: "layers/"+layer,
					success: function(result){
						var folder = result.getElementsByTagName("Folder");
						for(k=0;k<folder.length;k++){
							var placemarks = folder[k].getElementsByTagName("Placemark");
							for(i=0;i<placemarks.length;i++){
								var place = placemarks[i].getElementsByTagName("address")[0].innerHTML
								$.ajax({
								  	dataType: "json",
								  	url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+place,
								  	async: false,
								  	success: function(result2){
										var coord = result2["results"][0]["geometry"]["location"];
										var point = result.createElement("Point");
										var coords = result.createElement("coordinates");
										var coo = result.createTextNode(coord["lng"]+","+coord["lat"]);
										coords.appendChild(coo);
										point.appendChild(coords);
										placemarks[i].appendChild(point);
										console.log("Codificación exitosa");
									}
								});
							}
						}
						console.log((new XMLSerializer()).serializeToString(result));
					}
				});
			},
			convert_single: function(layer){
				$.ajax({
					url: "layers/"+layer,
					success: function(result){
						var placemarks = result.getElementsByTagName("Placemark");
						for(i=0;i<placemarks.length;i++){
							console.log(placemarks[i]);
							var place = placemarks[i].getElementsByTagName("address")[0].innerHTML;
							$.ajax({
							  	dataType: "json",
							  	url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+place,
							  	async: false,
							  	success: function(result2){
									var coord = result2["results"][0]["geometry"]["location"];
									var point = result.createElement("Point");
									var coords = result.createElement("coordinates");
									var coo = result.createTextNode(coord["lng"]+","+coord["lat"]);
									coords.appendChild(coo);
									point.appendChild(coords);
									placemarks[i].appendChild(point);
									console.log("Codificación exitosa");
								}
							});
						}
						console.log((new XMLSerializer()).serializeToString(result));
					}
				});
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
