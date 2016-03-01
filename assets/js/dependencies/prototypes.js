(function(){
	//FILE FOR ADD PROTOTYPES ABOUT EXISTS METHODS
	// GENERATE CAPITALIZER FUNCTION
	String.prototype.capitalizeFirstLetter = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
})();
