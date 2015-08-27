var _ = require("lodash");
var Pages = require("./pages");

module.exports = (function(){
  function State(initial_state){
    for(var prop in initial_state){
      this[prop] = initial_state[prop];
    }
  }

  State.prototype = {
    createPages : function(ctx){
      if(ctx.state.mainText){
	this.pages.vert = new Pages(ctx, "tb-rl");
	this.pages.hori = new Pages(ctx, "lr-tb");
      }
    }
  };

  return State;
})();
