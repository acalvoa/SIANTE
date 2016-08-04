(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	SICA_L = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			STATUS: false,
			STACK: [],
			CATEGORY:[],
			METADATA: {
				MAX_AUDITORIAS:0,
				MIN_AUDITORIAS:0
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
				$.getJSON('layers/sica.json', function(data){
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
					if(_SETTINGS.CATEGORY.indexOf(_SETTINGS.DB[i].TIPO) == -1) _SETTINGS.CATEGORY.push(_SETTINGS.DB[i].TIPO);
					if(typeof _SETTINGS.DATA[_SETTINGS.DB[i].COMUNA] != "undefined"){
						_SETTINGS.DATA[_SETTINGS.DB[i].COMUNA].ELEMENT.push({
							SERVICIO: _SETTINGS.DB[i].SERVICIO,
							TIPO: _SETTINGS.DB[i].TIPO,
							"AÑO": _SETTINGS.DB[i].ANIO,
							NOMBRE: _SETTINGS.DB[i].NOMBRE,
							FICHA: "<a target='_blank' href='"+_SETTINGS.DB[i].FICHA+"' >Link</a>",
							PDF: "<a target='_blank' href='"+_SETTINGS.DB[i].PDF+"' >Link</a>"
						});
					}
				}
				for(l=0;l<Object.keys(_SETTINGS.DATA).length;l++){
					var key = Object.keys(_SETTINGS.DATA)[l];
					var AUDITORIAS = 0;
					var CATEGORIA = {};
					var CATEGORIAINFO = [];
					for(k=0;k<_SETTINGS.CATEGORY.length;k++){
						CATEGORIA[_SETTINGS.CATEGORY[k]] = 0;
					}
					for(i=0;i<_SETTINGS.DATA[key].ELEMENT.length;i++){
						AUDITORIAS++;
						CATEGORIA[_SETTINGS.DATA[key].ELEMENT[i].TIPO]++;
					}
					for(i=0;i<Object.keys(CATEGORIA).length;i++){
						CATEGORIAINFO.push({
							TIPO: Object.keys(CATEGORIA)[i],
							CANTIDAD: CATEGORIA[Object.keys(CATEGORIA)[i]]
						});
					}
					_SETTINGS.DATA[key].AUDITORIAS = AUDITORIAS;
					_SETTINGS.DATA[key].CATEGORIA = CATEGORIAINFO;
					if(AUDITORIAS < _SETTINGS.METADATA.MIN_AUDITORIAS || _SETTINGS.METADATA.MIN_AUDITORIAS == 0) _SETTINGS.METADATA.MIN_AUDITORIAS = AUDITORIAS;
					if(AUDITORIAS > _SETTINGS.METADATA.MAX_AUDITORIAS || _SETTINGS.METADATA.MAX_AUDITORIAS == 0) _SETTINGS.METADATA.MAX_AUDITORIAS = AUDITORIAS;
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
								rellenocolor: _SETTINGS.SCALE[Math.ceil((_SETTINGS.DATA[_SETTINGS.LAYERS[num].name].AUDITORIAS/ (_SETTINGS.METADATA.MAX_AUDITORIAS-_SETTINGS.METADATA.MIN_AUDITORIAS))*10)]
							});
							_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('mouseover', function(e) {
								INFO.load(_SETTINGS.LAYERS[num].name+" - AUDITORIAS", _SETTINGS.DATA[_SETTINGS.LAYERS[num].name].CATEGORIA);
								if(typeof e.Ob != "undefined"){
									INFO.show(e.Ob.clientX, e.Ob.clientY);
								}
								else if(typeof e.Pb != "undefined"){
									INFO.show(e.Pb.clientX, e.Pb.clientY);
								}
							});	
							_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('mouseout', function(e) {
								INFO.hide();
							});
							_SETTINGS.LAYERS[num].LAYER_VIEW[l].addListener('click', function(e) {
								METADATA.load(_SETTINGS.LAYERS[num].name+" - Auditoias", _SETTINGS.DATA[_SETTINGS.LAYERS[num].name].ELEMENT);
								METADATA.show();
							});	
						}
						call(num,l);			
					}
				}
				LEYENDA.load("Leyenda - SICA Deciles N° Auditorias");
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
