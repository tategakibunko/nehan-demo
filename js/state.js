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
    getPageSize : function(){
      return this.pageWidth - 40;
    }
  };

  return State;
})();
