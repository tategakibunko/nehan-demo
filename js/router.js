module.exports = (function(){
  function SimpleRouter(opt){
    opt = opt || {};
    this.elements = [];
    for(var key in opt){
      this.elements.push({pat:key, rex:new RegExp(key), handler:opt[key]});
    }
  }

  SimpleRouter.prototype = {
    match : function(location, onerror){
      for(var i = 0; i < this.elements.length; i++){
	var element = this.elements[i];
	if(element.pat === location){
	  return element.handler.apply(this);
	}
	var match = location.match(element.rex);
	if(match){
	  match.shift();
	  return element.handler.apply(this, match);
	}
      }
      if(onerror){
	return onerror(this);
      }
      console.error("undefined resource:", location);
      throw new Error("location not defined");
    }
  };

  return SimpleRouter;
})();
