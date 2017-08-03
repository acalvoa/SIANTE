(function($){
    BaseLayer = function(ARGS){
        // WE DEFINE THE STANDARD PROTOTYPE
        // SETTINGS
        var _SETTINGS = {
            STATUS: false,
            STACK: [],
            CATEGORY:[],
            SCALE: ["#ffff00","#ffff00","#66ccff","#9966ff","#3366ff","#0000cc","#248f24","#cc0000","#0099cc","#006666","#993366"],
            DATA: null
        };

        var _VARS = {};
        //DEPENDENCIES
        var _DEPENDENCIES = ["MAP","CARTOGRAPHY", "LAYERS"]
        // CONSTRUCTOR
        var _CONSTRUCTOR = function(ARGS){
            //ESPERAMOS LAS DEPENDENCIAS
            _AUX.WAIT_DEP(0, function(){
                MAP.wait_maps(_PRIVATE.INIT);
            });

            _PUBLIC.PROPS.NAME = ARGS.NAME;
            _PUBLIC.PROPS.LINK = ARGS.LINK;
            _PUBLIC.PROPS.ID = ARGS.ID;
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
                _SETTINGS.DATA = MAP.load_kml(_PUBLIC.PROPS.LINK, {
                    map:$("div[cartography]").attr("map-target")
                });
                //LEYENDA.load("Leyenda - Servicios Publicos");
                //LEYENDA.set(_SETTINGS.SCALE);
            },
            hide: function(){
                var placemarks = _SETTINGS.DATA.docs[0].markers
                for(k=0;k<placemarks.length;k++){
                    placemarks[k].setMap(null);
                }
            },
            PROPS: {
                NAME: null,
                LINK: null,
                ID: null
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