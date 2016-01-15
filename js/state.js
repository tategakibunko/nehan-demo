var _ = require("lodash");

module.exports = (function(){
  function State(initial_state){
    for(var prop in initial_state){
      this[prop] = initial_state[prop];
    }
  }

  State.prototype = {
    getElement : function(flow){
      return this.elements[flow];
    },
    getBodyStyle : function(flow){
      var page_size = this.pageWidth - 40;
      return {
	flow:flow,
	width:page_size,
	height:page_size,
	fontSize:16
      };
    }
  };

  return State;
})();
