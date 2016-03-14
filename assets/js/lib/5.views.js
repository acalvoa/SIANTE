(function($){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	VIEWS = new function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE		
		// SETTINGS
		var _SETTINGS = {
			BODY: null,
			PROTOTYPE: null,
			VIEWS:{}
		};
		// CONSTRUCTOR
		var _CONSTRUCTOR = function(){
			_PRIVATE.MAKE();
		}
		// PRIVATE METHODS
		var _PRIVATE = {
			MAKE: function(){
				_SETTINGS.BODY = $("div[views] div[body]");
				_SETTINGS.PROTOTYPE = $("div[views] div[prototype]").remove().children("div[element]");
				_SETTINGS.OPTIONPROTOTYPE = _SETTINGS.PROTOTYPE.children("div[option-prototype]").remove();
				_SETTINGS.BODY.css('max-height',$('body').height()-300+"px");
				//BUSCAMOS LAS APP CON BUTTON LAYERS
				//INGRESAMOS POR CADA APP UN BOTTON DE LAYERS
			}
		};
		//PUBLIC METHODS
		var _PUBLIC = {
			add_cartography: function(layer,layer_name){
				var new_layer = _SETTINGS.PROTOTYPE.clone().appendTo(_SETTINGS.BODY);
				new_layer.children("input[view-layer]").prop("checked", true).attr('active',true).on('click', function(){
					if($(this).attr("active") == "true"){
						$(this).attr("active", false);
						for(j=0;j<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;j++){
							_SETTINGS.VIEWS[layer_name].LAYER_ARRAY[j].children("input[view-cartography]").prop("checked", false).attr('active',false);
							layer[j].hide();
						}
					}
					else
					{
						$(this).attr("active", true);
						for(j=0;j<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;j++){
							_SETTINGS.VIEWS[layer_name].LAYER_ARRAY[j].children("input[view-cartography]").prop("checked", true).attr('active',true);
							layer[j].show();
						}
					}
				});
				///////////////////////////////////////
				/**************************************
				CAPAS GENERAL
				*///////////////////////////////////////
				//PROPIEDADES DE LA CARTOGRAFIA GENERAL
				var optprotgen = _SETTINGS.OPTIONPROTOTYPE.clone();
				optprotgen.children("div[option-relleno]").children("input[fill-color]").on('change', function(){
					for(j=0;j<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;j++){
						layer[j].fillColor($(this).val());
					}
				});
				optprotgen.children("div[option-borde]").children("input[border-color]").on('change', function(){
					for(j=0;j<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;j++){
						layer[j].borderColor($(this).val());
					}
				});
				optprotgen.children("div[option-metadata]").children("input[metadata-check]").on('click', function(){
					layer[num].borderColor($(this).val());
				});
				//CREAMOS LA CAPA DE OPCIONES POR SECTOR
				new_layer.children("div[layer-options]").popover({
					content: optprotgen,
					html: true,
					placement: "right",
					container: 'body'
				});
				//CARGAMOS EL EVENTO CLICK
				new_layer.children("div[layer-options]").on('click', function(){
					if($(this).attr('active-status') != "true"){
						$(this).attr("active-status", true);
						$(this).popover('show');
					}
					else
					{
						$(this).attr("active-status", false);
						$(this).popover('hide');
					}
					
				});
				///////////////////////////////////////
				/**************************************
				CAPAS POR SEGMENTO DENTRO DE LA CAPA
				*///////////////////////////////////////

				//CREAMOS LA CAPA DE OPCIONES POR SECTOR

				new_layer.children("div[label]").html(layer_name.capitalizeFirstLetter());
				_SETTINGS.VIEWS[layer_name] = {
					LAYER: layer,
					LAYER_CAP: new_layer,
					LAYER_ARRAY: []
				};
				//ASIGNAMOS EL ALTO MAXIMO A LA VENTANA SUBBODY
				new_layer.children("div[subbody]").css('max-height',parseInt(_SETTINGS.BODY.css('max-height').replace('px',''))-50-(20*Object.keys(_SETTINGS.VIEWS).length)+"px");
				var SUBPROTOTYPE = new_layer.children("div[subbody]").children("div[subprototype]").remove().children("div[subelement]");
				for(i=0;i<layer.length;i++){
					var op = function(num){
						var layer_act = layer[i];
						var cap_layer = SUBPROTOTYPE.clone().appendTo(new_layer.children("div[subbody]"));
						cap_layer.children("div[label]").html(layer[i].name.capitalizeFirstLetter());
						cap_layer.children("input[view-cartography]").prop("checked", true);
						cap_layer.children("input[view-cartography]").attr('active',true).on('click', function(){
							if($(this).attr("active") == "true"){
								$(this).attr("active", false);
								layer[num].hide();
							}
							else
							{
								$(this).attr("active", true);
								layer[num].show();
							}
						});
						//CREAMOS LA CAPA DE PROPIEDADES ASIGNANDO TODOS SUS EVENTOS CORRESPONDIENTES
						var optprot = _SETTINGS.OPTIONPROTOTYPE.clone();
						optprot.children("div[option-relleno]").children("input[fill-color]").on('change', function(){
							layer[num].fillColor($(this).val());
						});
						optprot.children("div[option-borde]").children("input[border-color]").on('change', function(){
							layer[num].borderColor($(this).val());
						});
						optprot.children("div[option-metadata]").children("input[metadata-check]").on('change', function(){
							layer[num].borderColor($(this).val());
						});
						//CREAMOS LA CAPA DE OPCIONES POR SECTOR
						cap_layer.children("div[view-options]").popover({
							content: optprot,
							html: true,
							placement: "right",
							container: 'body'
						});
						cap_layer.children("div[view-options]").on('click', function(){
							if($(this).attr('active-status') != "true"){
								$(this).attr("active-status", true);
								$(this).popover('show');
							}
							else
							{
								$(this).attr("active-status", false);
								$(this).popover('hide');
							}
							
						});
						_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.push(cap_layer);
					};
					op(i);
				}
				//ASIGNAMOS EL EVENTO DE APERTURA
				new_layer.children("div[icon]").on('click', function(){
					if(new_layer.children("div[subbody]").css('display') == "none"){
						$.each(_SETTINGS.VIEWS, function(key,value){
							for(i=0;i<value.LAYER_ARRAY.length;i++){
								value.LAYER_ARRAY[i].children("div[view-options]").popover('hide');
							}	
						});
						new_layer.children("div[subbody]").show();
						$(this).html('<i class="fa fa-minus-square-o"></i>');
					}
					else{
						for(i=0;i<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;i++){
							_SETTINGS.VIEWS[layer_name].LAYER_ARRAY[i].children("div[view-options]").popover('hide');
						}
						new_layer.children("div[subbody]").hide();
						$(this).html('<i class="fa fa-plus-square-o"></i>');
					}
					
				});
			},
			remove: function(layer_name){
				_SETTINGS.VIEWS[layer_name].LAYER_CAP.remove();
			    delete _SETTINGS.VIEWS[layer_name];
			},
			/*add_layer: function(layer,layer_name){
				var new_layer = _SETTINGS.PROTOTYPE.clone().appendTo(_SETTINGS.BODY);
				new_layer.children("input[view-layer]").prop("checked", true).attr('active',true).on('click', function(){
					if($(this).attr("active") == "true"){
						$(this).attr("active", false);
						for(j=0;j<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;j++){
							_SETTINGS.VIEWS[layer_name].LAYER_ARRAY[j].children("input[view-cartography]").prop("checked", false).attr('active',false);
							layer[j].hide();
						}
					}
					else
					{
						$(this).attr("active", true);
						for(j=0;j<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;j++){
							_SETTINGS.VIEWS[layer_name].LAYER_ARRAY[j].children("input[view-cartography]").prop("checked", true).attr('active',true);
							layer[j].show();
						}
					}
				});
				///////////////////////////////////////
				/**************************************
				CAPAS POR SEGMENTO DENTRO DE LA CAPA
				*///////////////////////////////////////

				//CREAMOS LA CAPA DE OPCIONES POR SECTOR

				/*new_layer.children("div[label]").html(layer_name.capitalizeFirstLetter());
				_SETTINGS.VIEWS[layer_name] = {
					LAYER: layer,
					LAYER_CAP: new_layer,
					LAYER_ARRAY: []
				};
				//ASIGNAMOS EL ALTO MAXIMO A LA VENTANA SUBBODY
				new_layer.children("div[subbody]").css('max-height',parseInt(_SETTINGS.BODY.css('max-height').replace('px',''))-50-(20*Object.keys(_SETTINGS.VIEWS).length)+"px");
				var SUBPROTOTYPE = new_layer.children("div[subbody]").children("div[subprototype]").remove().children("div[subelement]");
				for(i=0;i<layer.length;i++){
					var op = function(num){
						var layer_act = layer[i];
						var cap_layer = SUBPROTOTYPE.clone().appendTo(new_layer.children("div[subbody]"));
						cap_layer.children("div[label]").html(layer[i].name.capitalizeFirstLetter());
						cap_layer.children("input[view-cartography]").prop("checked", true);
						cap_layer.children("input[view-cartography]").attr('active',true).on('click', function(){
							if($(this).attr("active") == "true"){
								$(this).attr("active", false);
								layer[num].hide();
							}
							else
							{
								$(this).attr("active", true);
								layer[num].show();
							}
						});
						//CREAMOS LA CAPA DE PROPIEDADES ASIGNANDO TODOS SUS EVENTOS CORRESPONDIENTES
						var optprot = _SETTINGS.OPTIONPROTOTYPE.clone();
						optprot.children("div[option-relleno]").children("input[fill-color]").on('change', function(){
							layer[num].fillColor($(this).val());
						});
						optprot.children("div[option-borde]").children("input[border-color]").on('change', function(){
							layer[num].borderColor($(this).val());
						});
						optprot.children("div[option-metadata]").children("input[metadata-check]").on('change', function(){
							layer[num].borderColor($(this).val());
						});
						//CREAMOS LA CAPA DE OPCIONES POR SECTOR
						cap_layer.children("div[view-options]").popover({
							content: optprot,
							html: true,
							placement: "right",
							container: 'body'
						});
						cap_layer.children("div[view-options]").on('click', function(){
							if($(this).attr('active-status') != "true"){
								$(this).attr("active-status", true);
								$(this).popover('show');
							}
							else
							{
								$(this).attr("active-status", false);
								$(this).popover('hide');
							}
							
						});
						_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.push(cap_layer);
					};
					op(i);
				}
				//ASIGNAMOS EL EVENTO DE APERTURA
				new_layer.children("div[icon]").on('click', function(){
					if(new_layer.children("div[subbody]").css('display') == "none"){
						$.each(_SETTINGS.VIEWS, function(key,value){
							for(i=0;i<value.LAYER_ARRAY.length;i++){
								value.LAYER_ARRAY[i].children("div[view-options]").popover('hide');
							}	
						});
						new_layer.children("div[subbody]").show();
						$(this).html('<i class="fa fa-minus-square-o"></i>');
					}
					else{
						for(i=0;i<_SETTINGS.VIEWS[layer_name].LAYER_ARRAY.length;i++){
							_SETTINGS.VIEWS[layer_name].LAYER_ARRAY[i].children("div[view-options]").popover('hide');
						}
						new_layer.children("div[subbody]").hide();
						$(this).html('<i class="fa fa-plus-square-o"></i>');
					}
					
				});
			}*/
		};
		//CALL THE CONSTRUCTOR
		_CONSTRUCTOR(ARGS);
		//WE GENERATE THE INTERACTIONS
		for(key in _PUBLIC){
			this[key] = _PUBLIC[key];
		}
	};
})(jQuery);
