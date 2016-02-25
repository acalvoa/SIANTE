(function(){
	// CLASS PROGRAMING IN JAVASCRIPT ES5
	var MAP = function(ARGS){
		// WE DEFINE THE STANDARD PROTOTYPE
		//SETTINGS
		_SETTINGS = {};
		//
		//CONSTRUCTOR
		_CONSTRUCTOR = function(){}
		//PRIVATE METHODS
		_PRIVATE = {
			MAKE: function(){
				
			}
		};
		//PUBLIC METHODS
		_PUBLIC = {
		};
		//CALL THE CONSTRUCTOR
		_CONSTRUCTOR(ARGS);
		//WE GENERATE THE INTERACTIONS
		for(key in _PUBLIC){
			this[key] = _PUBLIC[key];
		}
	};
	var mp = new GEOMAP();
})();
