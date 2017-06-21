(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	L_CON_PATENTE_INDEPENDENCIA = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			STATUS: false,
			STACK: [],
			CATEGORY:[],
			SCALE: ["#ffff00","#ffff00","#66ccff","#9966ff","#3366ff","#0000cc","#248f24","#cc0000","#0099cc","#006666","#993366"],
			DATA: null
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
				//CARGAMOS LA CARTOGRAFIA
				// CARTOGRAPHY.cartography_load(function(){
				// 	_SETTINGS.LAYERS = CARTOGRAPHY.get_layers("comunal");
				// 	for(i=0; i<_SETTINGS.LAYERS.length;i++){
				// 		if(typeof _SETTINGS.DATA[_SETTINGS.LAYERS[i].name] == "undefined"){
				// 			_SETTINGS.DATA[_SETTINGS.LAYERS[i].name] = {
				// 				ELEMENT: []
				// 			};
				// 		}
				// 	}
				// 	// _AUX.LOAD_DB();
				// 	// ESPERAMOS LA CARGA DE CARTOGRAFIA Y APLICAMOS EL ANALISIS
				// 	// _PUBLIC.DB_LOAD(_PRIVATE.ANALISIS);
				// });
				
			},
			ANALISIS: function(){
			},
			MAKE: function(){

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
				
				// var ctaLayer = new google.maps.KmlLayer({
			 //    	url: ,
			 //    	map: map
			 //  	});
				// for(num=0; num<_SETTINGS.LAYERS.length;num++){
				// 	for(l=0; l<_SETTINGS.LAYERS[num].SPATIAL_OBJECT.length;l++){
				// 		var call = function(num,l){
				// 			_SETTINGS.LAYERS[num].LAYER_VIEW[l] = MAP.load_polygon(_SETTINGS.LAYERS[num].SPATIAL_OBJECT[l],{
				// 				map:$("div[cartography]").attr("map-target"),
				// 				rellenocolor: _SETTINGS.SCALE[Math.ceil((_SETTINGS.DATA[_SETTINGS.LAYERS[num].name].PRESUPUESTO/ (_SETTINGS.METADATA.MAX_PRESUPUESTO-_SETTINGS.METADATA.MIN_EJECUCION))*10)]
				// 			});
				// 			_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('mouseover', function(e) {
				// 				INFO.load(_SETTINGS.LAYERS[num].name+" - PRESUPUESTO", _SETTINGS.DATA[_SETTINGS.LAYERS[num].name].ELEMENT);
				// 				if(typeof e.Ob != "undefined"){
				// 					INFO.show(e.Ob.clientX, e.Ob.clientY);
				// 				}
				// 				else if(typeof e.Pb != "undefined"){
				// 					INFO.show(e.Pb.clientX, e.Pb.clientY);
				// 				}
				// 				else if(typeof e.Qb != "undefined"){
				// 					INFO.show(e.Qb.clientX, e.Qb.clientY);
				// 				}
				// 				var ctx = document.getElementById("chart-area").getContext("2d");
				// 				window.myPie = new Chart(ctx).Pie(_SETTINGS.DATA[_SETTINGS.LAYERS[num].name].GRAPH);
				// 			});	
				// 			_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('mouseout', function(e) {
				// 				INFO.hide();
				// 			});	
				// 		}
				// 		call(num,l);			
				// 	}
				// }
				// LEYENDA.load("Leyenda - SICOGEN Deciles de Inversión");
				// LEYENDA.set(_SETTINGS.SCALE);
			},
			convert_single: function(layer){
				$.ajax({
					url: "layers/"+layer,
					success: function(result){
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
						console.log((new XMLSerializer()).serializeToString(result));
					}
				});
			},
			show: function(){
				_SETTINGS.DATA = MAP.load_kml('/layers/locales_con_patentes_independencia.kml',{
					map:$("div[cartography]").attr("map-target")
				});
				LEYENDA.load("Locales con Patentes - Independencia");
				LEYENDA.set(_SETTINGS.SCALE);
			},
			hide: function(){
				var placemarks = _SETTINGS.DATA.docs[0].markers
				for(k=0;k<placemarks.length;k++){
					placemarks[k].setMap(null);
				}
				// for(num=0; num<_SETTINGS.LAYERS.length;num++){
				// 	for(l=0; l<_SETTINGS.LAYERS[num].SPATIAL_OBJECT.length;l++){
				// 		_SETTINGS.LAYERS[num].LAYER_VIEW[l].setMap(null);
				// 	}
				// }
				// LEYENDA.load("Leyenda - Sin capa de analisis");
				// LEYENDA.clear();
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
