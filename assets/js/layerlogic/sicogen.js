(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	SICOGEN_L = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			STATUS: false,
			STACK: [],
			CATEGORY:[],
			METADATA: {
				MIN_PRESUPUESTO:0,
				MAX_PRESUPUESTO:0,
				MIN_EJECUCION:0,
				MAX_EJECUCION:0
			},
			SCALE: ["#ffff00","#ffff00","#66ccff","#9966ff","#3366ff","#0000cc","#248f24","#cc0000","#0099cc","#006666","#993366"],
			DATA: {}
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
			},
			LOAD_DB: function(){
				$.getJSON('layers/sicogen.json', function(data){
					_SETTINGS.DB = data;
					_AUX.LOADED_DB();
				});
			},
			LOADED_DB: function(){
				_SETTINGS.STATUS = true;
				for(i=0;i<_SETTINGS.STACK.length;i++){
					var callback = _SETTINGS.STACK[i];
					callback();
				}
			}
		};
		// PRIVATE METHODS
		var _PRIVATE = {
			INIT: function(){
				//CARGAMOS LA CARTOGRAFIA
				CARTOGRAPHY.cartography_load(function(){
					_SETTINGS.LAYERS = CARTOGRAPHY.get_layers("comunal");
					for(i=0; i<_SETTINGS.LAYERS.length;i++){
						if(typeof _SETTINGS.DATA[_SETTINGS.LAYERS[i].name] == "undefined"){
							_SETTINGS.DATA[_SETTINGS.LAYERS[i].name] = {
								ELEMENT: []
							};
						}
					}
					_AUX.LOAD_DB();
					// ESPERAMOS LA CARGA DE CARTOGRAFIA Y APLICAMOS EL ANALISIS
					_PUBLIC.DB_LOAD(_PRIVATE.ANALISIS);
				});
				
			},
			ANALISIS: function(){
				//PIVOTEAMOS LAS CATEGORIAS
				for(i=0;i<_SETTINGS.DB.length;i++){
					if(_SETTINGS.CATEGORY.indexOf(_SETTINGS.DB[i].AREA) == -1) _SETTINGS.CATEGORY.push(_SETTINGS.DB[i].AREA);
					if(typeof _SETTINGS.DATA[_SETTINGS.DB[i].MUNICIPALIDAD] != "undefined"){
						_SETTINGS.DATA[_SETTINGS.DB[i].MUNICIPALIDAD].ELEMENT.push({
							AREA:_SETTINGS.DB[i].AREA,
							PRESUPUESTO: _SETTINGS.DB[i].PRESUPUESTO,
							EJECUCION: _SETTINGS.DB[i].EJECUTADO,
							PORCENTAJE: ((_SETTINGS.DB[i].EJECUTADO/_SETTINGS.DB[i].PRESUPUESTO)*100).toString().substring(0,6)+"%"
						});
					}
				}
				for(l=0;l<Object.keys(_SETTINGS.DATA).length;l++){
					var key = Object.keys(_SETTINGS.DATA)[l];
					var PRESUPUESTO = 0;
					var EJECUTADO = 0;
					var GRAPH = [];
					for(i=0;i<_SETTINGS.DATA[key].ELEMENT.length;i++){
						GRAPH.push({
							value: _SETTINGS.DATA[key].ELEMENT[i].PRESUPUESTO,
							color:_SETTINGS.SCALE[i+1],
							highlight:_SETTINGS.SCALE[i+1],
							label: _SETTINGS.DATA[key].ELEMENT[i].AREA
						});
						PRESUPUESTO += parseInt(_SETTINGS.DATA[key].ELEMENT[i].PRESUPUESTO);
						EJECUTADO += parseInt(_SETTINGS.DATA[key].ELEMENT[i].EJECUCION);
					}
					_SETTINGS.DATA[key].PRESUPUESTO = PRESUPUESTO;
					_SETTINGS.DATA[key].GRAPH = GRAPH;
					_SETTINGS.DATA[key].EJECUTADO = EJECUTADO;
					if(PRESUPUESTO < _SETTINGS.METADATA.MIN_PRESUPUESTO || _SETTINGS.METADATA.MIN_PRESUPUESTO == 0) _SETTINGS.METADATA.MIN_PRESUPUESTO = PRESUPUESTO;
					if(PRESUPUESTO > _SETTINGS.METADATA.MAX_PRESUPUESTO || _SETTINGS.METADATA.MAX_PRESUPUESTO == 0) _SETTINGS.METADATA.MAX_PRESUPUESTO =  PRESUPUESTO;
					if(EJECUTADO < _SETTINGS.METADATA.MIN_EJECUCION|| _SETTINGS.METADATA.MIN_EJECUCION == 0) _SETTINGS.METADATA.MIN_EJECUCION = EJECUTADO;
					if(EJECUTADO > _SETTINGS.METADATA.MAX_EJECUCION || _SETTINGS.METADATA.MAX_EJECUCION == 0) _SETTINGS.METADATA.MAX_EJECUCION = EJECUTADO;
				}
				_PRIVATE.MAKE();
			},
			MAKE: function(){

			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			DB_LOAD: function(callback){
				if(!_SETTINGS.STATUS){
					_SETTINGS.STACK.push(callback);
				}
				else
				{
					callback();
				}
			},
			show: function(){
				for(num=0; num<_SETTINGS.LAYERS.length;num++){
					for(l=0; l<_SETTINGS.LAYERS[num].SPATIAL_OBJECT.length;l++){
						var call = function(num,l){
							_SETTINGS.LAYERS[num].LAYER_VIEW[l] = MAP.load_polygon(_SETTINGS.LAYERS[num].SPATIAL_OBJECT[l],{
								map:$("div[cartography]").attr("map-target"),
								rellenocolor: _SETTINGS.SCALE[Math.ceil((_SETTINGS.DATA[_SETTINGS.LAYERS[num].name].PRESUPUESTO/ (_SETTINGS.METADATA.MAX_PRESUPUESTO-_SETTINGS.METADATA.MIN_EJECUCION))*10)]
							});
							_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('mouseover', function(e) {
								INFO.load(_SETTINGS.LAYERS[num].name+" - PRESUPUESTO", _SETTINGS.DATA[_SETTINGS.LAYERS[num].name].ELEMENT);
								INFO.show(e.Ob.clientX, e.Ob.clientY);
								var ctx = document.getElementById("chart-area").getContext("2d");
								window.myPie = new Chart(ctx).Pie(_SETTINGS.DATA[_SETTINGS.LAYERS[num].name].GRAPH);
							});	
							_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('mouseout', function(e) {
								INFO.hide();
							});	
						}
						call(num,l);			
					}
				}
				LEYENDA.load("Leyenda - SICOGEN Deciles de Inversión");
				LEYENDA.set(_SETTINGS.SCALE);
			},
			hide: function(){
				for(num=0; num<_SETTINGS.LAYERS.length;num++){
					for(l=0; l<_SETTINGS.LAYERS[num].SPATIAL_OBJECT.length;l++){
						_SETTINGS.LAYERS[num].LAYER_VIEW[l].setMap(null);
					}
				}
				LEYENDA.load("Leyenda - Sin capa de analisis");
				LEYENDA.clear();
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
